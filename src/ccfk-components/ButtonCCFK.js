import React from "react"
import Button from "@nokia-csf-uxr/ccfk/Button/Button";
import ButtonText from "@nokia-csf-uxr/ccfk/Button/ButtonText"
import ButtonIcon from "@nokia-csf-uxr/ccfk/Button/ButtonIcon";

export default function ButtonCCFK({text,variant,onClick,disabled=false,disabledRipple=false,fullWidth=false,Icon,iconDirection="left"}){
    return (
        <Button 
            variant={variant}
            aria-label={variant}
            onClick={()=>onClick()}
            disabled={disabled}
            disabledRipple={disabledRipple}
            fullWidth={fullWidth}>
            <div style={{display:"flex",alignItems:"center",flexDirection:iconDirection==="left"?"row":"row-reverse"}}>
                {!!Icon?<ButtonIcon>  
                        {Icon}
                    </ButtonIcon>:<></>}
                <ButtonText>{text}</ButtonText>
            </div>
        </Button>
    )
}