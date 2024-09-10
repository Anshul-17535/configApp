import React from "react"
import SimpleCard from '@nokia-csf-uxr/ccfk/Card/SimpleCard';


export default function CardCCFK({children,cardStyle={},variant,hoverEffect=false,focusEffect=false,autoResize=false}){
    return (
        <div style={{width: "100%"}} >
            <SimpleCard style={cardStyle} variant={variant} hoverEffect={hoverEffect} focusEffect={focusEffect} autoResize={autoResize}>
                {children}    
            </SimpleCard>    
        </div>
    )
}