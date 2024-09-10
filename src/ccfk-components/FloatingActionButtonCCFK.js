import React from "react"
import FloatingActionButton, { FloatingActionButtonIcon,FloatingActionButtonText } from '@nokia-csf-uxr/ccfk/FloatingActionButton';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';

export default function FloatingActionButtonCCFK({onClick,style,text}){

    return (
            <FloatingActionButton
                aria-label="Fly out Floating Action"
                onClick={onClick}
                style={style}
            >
                <FloatingActionButtonIcon>
                    <AddIcon/>
                </FloatingActionButtonIcon>
                {text&&<FloatingActionButtonText>{text}</FloatingActionButtonText>}
            </FloatingActionButton>
    )
}