import React from "react"
import Dialog from '@nokia-csf-uxr/ccfk/Dialog';
import {DialogTitle,DialogContent} from '@nokia-csf-uxr/ccfk/Dialog';
import ButtonsRow from '@nokia-csf-uxr/ccfk/ButtonsRow/ButtonsRow';

export default function DialogCCFK({title="TITLE",isMaskLight=false,onClose,children,renderFooter,dialogStyle,footerStyle}){
    return (
        <div style={{width: "100%", height: "100vh"}} >
            <Dialog 
                appElement={{current: null}} 
                isOpen 
                isMaskLight={isMaskLight} 
                style={dialogStyle}
            >
                <DialogTitle title={title} buttonProps={{autoFocus: false, onClick: ()=>onClose()}}/>
                <DialogContent>
                    {children}
                </DialogContent>
                <ButtonsRow style={footerStyle}>{renderFooter()}</ButtonsRow>
            </Dialog>
        </div>
    )
}