import React from "react"
import IconButton from "@nokia-csf-uxr/ccfk/IconButton/IconButton";
export default function IconButtonCCFK({onClick,children,variant="secondary",disabled=false,disabledRipple=false}){
    return (
        <IconButton 
            size="large"
            aria-label="settings" 
            onClick={()=>onClick()}
            variant={variant}
            disabled={disabled}
            disabledRipple={disabledRipple}
            >
            {children}
        </IconButton>
    )
}