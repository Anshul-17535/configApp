import React,{useState} from "react"
import Dialog from '@nokia-csf-uxr/ccfk/Dialog';
import Button from "@nokia-csf-uxr/ccfk/Button/Button";
import {AlertBar,AlertMessage,AlertDetails} from '@nokia-csf-uxr/ccfk/Alert';
import {DialogTitle,DialogContent,DialogFooter} from '@nokia-csf-uxr/ccfk/Dialog';

const EXPANDED_HEIGHT_SHORT = '15.9rem';
const EXPANDED_HEIGHT_LONG = '19.1rem';
const COLLAPSED_HEIGHT = '11rem';
const DIALOG_WIDTH = '26.75rem';

const EXAMPLE_ALERT_STYLE = (expanded, longMessage) => {
    const resolvedHeight = expanded ? longMessage ? EXPANDED_HEIGHT_LONG : EXPANDED_HEIGHT_SHORT : COLLAPSED_HEIGHT;
    return ({
      height: resolvedHeight,
      top: `calc((100vh - ${resolvedHeight}) / 2)`,
      left: `calc((100vw - ${DIALOG_WIDTH}) / 2)`,
      right: `calc((100vw - ${DIALOG_WIDTH}) / 2)`,
      width: DIALOG_WIDTH,
    });
  };

export default function ErrorDialogCCFK({detailsText="details",title="title",variant,message,onClose,onConfirm,confirmationButtonLabel="OK"}){
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = () => {
        setExpanded(!expanded);
    };

    const footerButtonsArrayForError=[<Button autoFocus onClick={onClose} key="button-2">OK</Button>]

    const returnValue=(value)=>{
      console.log('THi is error',value)
      if(value !== 'MESSAGE'){
        return (<DialogFooter>
          <Button onClick={onClose}>CANCEL</Button>
          <Button onClick={onConfirm} autoFocus>{confirmationButtonLabel}</Button>
        </DialogFooter>)
        }
      if(value === 'MESSAGE'){
        return (
          <DialogFooter>
            <Button onClick={onConfirm} autoFocus>{confirmationButtonLabel}</Button>
          </DialogFooter>
        )
        }
    }

    return (
        <>
        <Dialog
        isOpen={true}
        ariaHideApp={false}
        isMaskLight={false}
        style={{content: { ...EXAMPLE_ALERT_STYLE(expanded, false) } }}
      >
        <AlertBar variant={variant} />
        <DialogTitle style={{overflow: undefined}} title={title} />
        <DialogContent style={{flex: undefined}}>
          <AlertMessage 
            message={message}
            variant={variant}
          />
        </DialogContent>
        {variant==="ERROR"?<AlertDetails
          expanded={expanded}
          expansionButtonProps={{
            onExpansionChange: handleExpansion,
          }}
          expandedMessage={detailsText}
          buttons={footerButtonsArrayForError}
        />:returnValue(variant)}
      </Dialog>
      </>
    )
}