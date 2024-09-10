import React from "react"
import Button from "@nokia-csf-uxr/ccfk/Button/Button";
import ButtonText from "@nokia-csf-uxr/ccfk/Button/ButtonText"
import Snackbar, { SnackbarContent, SnackbarAction } from '@nokia-csf-uxr/ccfk/Snackbar';


export default function SnackbarCCFK({onClick,isOpen=false,disabledRipple = false,snackBarMessage=""}) {
    return (
        <Snackbar
            open={isOpen}
            autoClose={true}
            onClose={()=>onClick()}
        >
            <SnackbarContent>{snackBarMessage}</SnackbarContent>
            <SnackbarAction>
                <Button onClick={() => {onClick()}} disabledRipple={disabledRipple} >
                    <ButtonText style={{color:"#0086e7"}}>
                        CLOSE
                    </ButtonText>
                </Button>
            </SnackbarAction>
        </Snackbar>
    )
} 