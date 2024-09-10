import React, { useRef, useState, useEffect } from 'react';
import Hyperlink from '@nokia-csf-uxr/ccfk/Hyperlink'
import Typography from '@nokia-csf-uxr/ccfk/Typography'
import FileUpload, { FileUploadSection, FileUploadIcon, FileUploadList, FileUploadListItem } from '@nokia-csf-uxr/ccfk/FileUpload';
import HorizontalDivider from '@nokia-csf-uxr/ccfk/HorizontalDivider';
import InlineFeedbackMessage from '@nokia-csf-uxr/ccfk/InlineFeedbackMessage';
import { getAdvancedThemeContext, getComponentAdvancedTheme, getValueFromVar } from '@nokia-csf-uxr/ccfk/AdvancedTheme';
import TOKENS from '@nokia-csf-uxr/nokia-design-system-tokens/js/tokens.es6';
import Label from '@nokia-csf-uxr/ccfk/Label';
import {
  getEasing,
  getDuration
} from '@nokia-csf-uxr/ccfk/common/parse-tokens';
import { getContext } from '@nokia-csf-uxr/ccfk/common/index.js';
const INLINEFEEDBACK_STYLE = {
  border: 'none',
  margin: TOKENS.SPACING_XX_SMALL,
  position: 'absolute',
  top: 0,
  width: 'calc(100% - 0.5rem)',
  zIndex: 3
};
const INLINEFEEDBACK_ANIMATION = {
  from: { opacity: 0, ...INLINEFEEDBACK_STYLE },
  enter: { opacity: 1, ...INLINEFEEDBACK_STYLE },
  leave: { opacity: 0, ...INLINEFEEDBACK_STYLE },
  config: {
    duration: getDuration(TOKENS.DURATION_MODERATE),
    easing: getEasing(TOKENS.TRANSITION_ACCELERATE)
  }
};
const sizeFormatter = (size) => `${(size / 1000).toFixed(1)} KB`;
const MAXIMUM_ALLOWED_FILES = 1;

const uploadTimeComparator = (a, b) => {
  if ( a.lastModified < b.lastModified ){
    return -1;
  }
  if ( a.lastModified > b.lastModified ){
    return 1;
  }
  return 0;
};
const ImportRSVCCFK = (props) => getContext(({}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [showGeneralErrorMessage, setShowGeneralErrorMessage] = useState(false);
  const [data ,setData]=useState([]);
  const [delbug,setDelbug] = useState(true)
  const generalErrorMessage = useRef();
  const acceptedFilesRef = useRef(acceptedFiles);
  const rejectedFilesRef = useRef([]);
  const openDialog = useRef();
  const allFiles = acceptedFiles.concat(rejectedFiles).sort(uploadTimeComparator);
  const error = isDragActive && acceptedFiles.length >= MAXIMUM_ALLOWED_FILES;
  const $AT = getAdvancedThemeContext(({ advancedTheme }) => advancedTheme);
  const resolvedFileUploadAT = getComponentAdvancedTheme($AT, 'FileUpload', 'default');
  const PRIMARYTEXT_COLOR = getValueFromVar({ ...$AT['GLOBAL-VARIABLES'], ...TOKENS }, resolvedFileUploadAT.text.primaryContent);
  const SUBTEXT_COLOR = getValueFromVar({ ...$AT['GLOBAL-VARIABLES'], ...TOKENS }, resolvedFileUploadAT.text.secondaryContent);
  const DRAG_AND_DROP_TEXT_COLOR = getValueFromVar({ ...$AT['GLOBAL-VARIABLES'], ...TOKENS }, resolvedFileUploadAT.text.dragAndDropContent);
  const file = new Blob ([data],{type:"text/plain"});  
  /** 1. acceptedFilesCallback
   * The callback method to FileUpload. It is called when a new data has been added to FileUpload.
   * This calls simulateUploading.
  */
  const acceptedFilesCallback = (data) => {
    if (acceptedFiles.length >= MAXIMUM_ALLOWED_FILES) return;
    setShowGeneralErrorMessage(false);
    const newData = data.map(file => {
        console.log('accepted ::>',file)
        setData(file)
        setDelbug(true)
      // if uploaded file name exists, set error message to inline notification.
      if (acceptedFilesRef.current.findIndex(({ file: acceptedFile }) => acceptedFile.name === file.name) !== -1) {
          generalErrorMessage.current = 'Some files have been already uploaded.';
          setShowGeneralErrorMessage(true);
      } else {
        file.status = 'pending';
        return { file };
      }
    }).filter((element) =>  element != null);
    if (newData.length > 0) {
      acceptedFilesRef.current = newData.concat(acceptedFilesRef.current);
      setAcceptedFiles(acceptedFilesRef.current);
      simulateUploading();
    }
  };

  const DragAndDropTextBlock = (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography typography="BODY" style={{ color: PRIMARYTEXT_COLOR }}>Drag and drop files here, or <Hyperlink aria-label='Browse' href="" style={{ cursor:'pointer' }} onClick={(e) => { e.preventDefault(); openDialog.current && openDialog.current(); }}>browse</Hyperlink> </Typography>
    </div>
  );
  useEffect(()=>{
    console.log("changed file")
    props.onChange(file)
  },[data]);

  useEffect(()=>{
    props.onChange2(delbug)
  },[delbug]);

  /** 2. simulateUploading
   * Called by 1. acceptedFilesCallback method.
   * This calls updateProgress method.
   * simulate the upload processing
   * 
  */
  const simulateUploading = () => {
    acceptedFilesRef.current.forEach(({ file }) => {
      if (file.status === 'pending') {
        file.status = 'uploading';
        file.progress = 0;
        setAcceptedFiles([...acceptedFilesRef.current]);
        setTimeout(() => { updateProgress(file); }, Math.floor(Math.random() * 2000));
      }
    });
  };
  /** 3. updateProgress
   * Called by 2. simulateUploading method.
   * This updates the status of the file.
   */
  const updateProgress = (file) => {
    let percentage = 0;
    let delay = 0
    for (percentage = 0, delay = 0; percentage <= 100; percentage += 2, delay += 50) {
      const p = percentage;
      setTimeout(() => {
        if (file != null && file.status === 'uploading') {
          file.progress = p;
          if( p === 100 ) {
            // set error randomly to files
            if (Math.floor(Math.random() * 10) % 2 === 1) {
              file.errorMessage = 'Unknown error while file was uploading.';
            }
            file.status = 'complete';
          }
          setAcceptedFiles([...acceptedFilesRef.current]);
        }
      }, delay);
    }
  };
  const fileRejections = (data) => {
    console.log('fileRejections: ', data);
    if (data[0] && data[0].errors) {
      generalErrorMessage.current = data[0].errors[0].message;
      setShowGeneralErrorMessage(true);
    }
  };
  const handleFeedbackClose = () => {
    setShowGeneralErrorMessage(false);
  };
  const handleDelete = (deleteFile) => {
    if (deleteFile.error) {
      const files = [...rejectedFiles];
      const indexToDelete = files.findIndex(({ file }) => file.name === deleteFile.name);
      files.splice(indexToDelete, 1);
      rejectedFilesRef.current = files;
      setRejectedFiles(files);
    } else {
      console.log("CHECK!!!!!")
      setDelbug(false)
      const files = [...acceptedFiles];
      const indexToDelete = files.findIndex(({ file }) => file.name === deleteFile.name);
      files.splice(indexToDelete, 1);
      acceptedFilesRef.current = files;
      setAcceptedFiles(acceptedFilesRef.current);
    };
  };
  const handleRetry = (retryFile) => {
    if (retryFile.errorMessage) {
      acceptedFilesRef.current.forEach(({ file }) => {
        if (file.name === retryFile.name) {     
          file.status = 'pending';
          file.errorMessage = undefined;
          file.progress = 0;
        }
      });
      setAcceptedFiles([...acceptedFilesRef.current]);
      simulateUploading();
    }
  }
  return (
    <div style={{ width: '100%'}}>
      <Label htmlFor="selectitem-component-input" verticalLayout >
        <div style={{display:"flex",marginBottom: "-4px"}}>
        <span style={{color:"#737373",fontSize:"12px",fontFamily:"NokiaPureHeadline, sans-serif"}}>{props.label}</span>
          {props.required?<span style={{color:"red"}}>*</span>:""}
        </div>
      </Label>
      <FileUpload
        dragStatus={(status) => { setIsDragActive(status.isDragActive); }}
        acceptedFiles={acceptedFilesCallback}
        fileRejections={fileRejections}
        open={(open) => { openDialog.current = open}}
        maxFiles={MAXIMUM_ALLOWED_FILES}
        error={error}
        {...props}
      >
        <InlineFeedbackMessage
          variant="error"
          show={showGeneralErrorMessage}
          onClose={handleFeedbackClose}
          animation={INLINEFEEDBACK_ANIMATION}
          closeButton
        >
          {generalErrorMessage.current}
        </InlineFeedbackMessage>
        {allFiles.length > 0 && (
          !isDragActive && (
            <FileUploadList>
              {acceptedFiles.map(({ file }, index) =>
                <React.Fragment key={`${file.name}-${index}`}>
                  <FileUploadListItem
                    file={file}
                    id={`${file.name}-${index}`}
                    key={`${file.name}-${index}`}
                    index={index}
                    fileName={file.name}
                    errorMessage={""}
                    secondaryContent={sizeFormatter(file.size)}
                    progress={file.progress}
                    status={file.status}
                    onDelete={() => handleDelete(file)}
                    allowDownLoad={false}
                    onDownload={() => console.log(`Download file: ${file.name}.`)}
                    onRetry={() => file.errorMessage && handleRetry(file)}
                  />
                  {acceptedFiles.length > 1 && index !== acceptedFiles.length-1 && 
                    <HorizontalDivider />
                  }
                </React.Fragment>
              )}
            </FileUploadList>
          )
        )}
        <FileUploadSection>
          { (acceptedFiles.length === 0 || isDragActive || error) && <FileUploadIcon/> }
          { !isDragActive && (
            <>
            {acceptedFiles.length === MAXIMUM_ALLOWED_FILES && 
              <Typography typography="BODY" style={{ color: PRIMARYTEXT_COLOR }}>
                'Maximum number of files reached'
                </Typography>
            }
            {acceptedFiles.length !== MAXIMUM_ALLOWED_FILES && DragAndDropTextBlock}
            {acceptedFiles.length < MAXIMUM_ALLOWED_FILES && <Typography typography="CAPTION" style={{ color: SUBTEXT_COLOR }}>Maximum 1 file</Typography>}
            </>
          )}
          { isDragActive && <Typography typography="TITLE_16" style={{ color: DRAG_AND_DROP_TEXT_COLOR, fontSize: '0.875rem' }}>{error ? 'Maximum files reached' : 'Drop to add files(s)'}</Typography> }
        </FileUploadSection>
      </FileUpload>
    </div >)
});
export default ImportRSVCCFK;
