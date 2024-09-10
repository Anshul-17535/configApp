import React, { useRef, useState, useEffect } from 'react';
import { isFirefox } from 'react-device-detect';
import Hyperlink from '@nokia-csf-uxr/ccfk/Hyperlink'
import Typography from '@nokia-csf-uxr/ccfk/Typography'
import FileUpload, { FileUploadSection, FileUploadIcon, FileUploadList, FileUploadLabelContainer } from '@nokia-csf-uxr/ccfk/FileUpload';
import InlineFeedbackMessage from '@nokia-csf-uxr/ccfk/InlineFeedbackMessage';
import Label from '@nokia-csf-uxr/ccfk/Label';
import {
  TextInputLabelContent
} from '@nokia-csf-uxr/ccfk/TextInput';
import FileUploadListItemCCFK from './FileUploadListItemCCFK';
const uploadTimeComparator = (a, b) => {
  if ( a.lastModified < b.lastModified ){
    return -1;
  }
  if ( a.lastModified > b.lastModified ){
    return 1;

  }
  return 0;
};

export default function ImportButtonCCFK({label="IMPORT",onChange,onChange2,required=false,style={}}){
  const [isDragActive, setIsDragActive] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [delbug,setDelbug] = useState(true)
  const [showGeneralErrorMessage, setShowGeneralErrorMessage] = useState(false);
  const [data ,setData]=useState([]);
  const generalErrorMessage = useRef();
  const acceptedFilesRef = useRef(acceptedFiles);
  const rejectedFilesRef = useRef([]);
  const openDialog = useRef();
  const allFiles = acceptedFiles.concat(rejectedFiles).sort(uploadTimeComparator);
  const file = new Blob ([data],{type:"text/plain"});
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

  useEffect(()=>{
    onChange(file)
  },[data]);

  useEffect(()=>{
    onChange2(delbug)
  },[delbug]);
  
  // useEffect(()=>{
  //   onChange2(acceptedFilesRef)
  // },[acceptedFilesRef]);
  

  /** simulate the upload processing */
  const simulateUploading = () => {
    acceptedFilesRef.current.forEach(({ file }) => {
      console.log(file);
      if (file.status === 'pending') {
        file.status = 'uploading';
        file.progress = 0;
        setAcceptedFiles([...acceptedFilesRef.current]);
        // setTimeout(() => { updateProgress(file); }, Math.floor(Math.random() * 2000));
      }
    });
  };
  const acceptedFilesCallback = (data) => {
;
    console.log('acceptedFiles: ', data);
    const newData = data.map(file => {
      setData(file)
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
  const FilenameLabel = (
    <Label htmlFor="id-1" verticalLayout style={{ width: !isFirefox ? 'fit-content' : '-moz-fit-content' }}>
      <TextInputLabelContent>
        FileName
      </TextInputLabelContent>
    </Label>
  );
  const UploadedLabel = (
    <Label htmlFor="id-1" verticalLayout style={{ width: !isFirefox ? 'fit-content' : '-moz-fit-content' }}>
      <TextInputLabelContent>
        Uploaded
      </TextInputLabelContent>
    </Label>
  );
  return (<>
     <Label htmlFor="selectitem-component-input" verticalLayout >
        <div style={{display:"flex",marginBottom: "-4px"}}>
        <span style={{color:"#737373",fontSize:"12px",fontFamily:"NokiaPureHeadline, sans-serif"}}>{label}</span>
          {required?<span style={{color:"red"}}>*</span>:""}
        </div>
      </Label>
      <FileUpload
        dragStatus={(status) => { setIsDragActive(status.isDragActive); }}
        acceptedFiles={acceptedFilesCallback}
        fileRejections={fileRejections}
        open={(open) => { openDialog.current = open}}
      >
        <InlineFeedbackMessage
          variant="error"
          show={showGeneralErrorMessage}
          onClose={handleFeedbackClose}
          closeButton
        >
          {generalErrorMessage.current}
        </InlineFeedbackMessage>
        {allFiles.length > 0 && (
          <>
            {!isDragActive && (<FileUploadLabelContainer>
              {UploadedLabel}
              {FilenameLabel}
            </FileUploadLabelContainer>)}
            {!isDragActive && (<FileUploadList>
              {allFiles.map(({ file }, index) =>
                <FileUploadListItemCCFK
                  allowDownLoad
                  id={`${file.name}-${index}`}
                  key={`${file.name}-${index}`}
                  index={index}
                  fileName={file.name}
                  errorMessage={file.errorMessage}
                  progress={file.progress}
                  status={file.status}
                  onDelete={() => handleDelete(file)}
                  onRetry={() => file.errorMessage && handleRetry(file)}
                  onDownload={() => console.log(`Download file: ${file.name}.`)}
                />
              )}
            </FileUploadList>)}
          </>
        )}
        <FileUploadSection>
          { (acceptedFiles.length === 0 || isDragActive) && <FileUploadIcon/> }
          { !isDragActive && (
            <>
              <Typography variant="BODY" style={{ color: 'black' }}>Drag and drop files here, or <Hyperlink aria-label='Browse' href="" style={{ cursor:'pointer' }} onClick={(e) => { e.preventDefault(); openDialog.current && openDialog.current(); }}>browse</Hyperlink> </Typography>
              <Typography variant="CAPTION" style={{ color: 'black' }}>Secondary text line outlining file requirements</Typography>
            </>
          )}
          { isDragActive && <Typography variant="TITLE_16" style={{ fontSize: '0.875rem' }}>Drop to add files(s)</Typography> }
        </FileUploadSection>
      </FileUpload>
  </>)
};