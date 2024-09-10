import React,{useState,useEffect} from "react"
import Label from '@nokia-csf-uxr/ccfk/Label';
import TextInput, {TextInputErrorMessage } from '@nokia-csf-uxr/ccfk/TextInput';

export default function TextInputCCFK({label="label",disabled=false,error=false,value="",required=false,errorMsg="",placeholder="",id=`textInput_${label}`,onChange,onChangeArgs=[],style={}}){

    const [text,setText]=useState(value)

    useEffect(()=>{
        onChange(text,...onChangeArgs)
    },[text])

    useEffect(()=>{
        setText(value)
    },[value])

    return (
        <div style={style}>
            {label!==""?<Label verticalLayout maxWidth>
                <div style={{display:"flex",marginBottom: "-4px"}}>
                    <span style={{color:"#737373",fontSize:"12px",fontFamily:"NokiaPureHeadline, sans-serif"}}>{label}</span>
                    {required?<span style={{color:"red"}}>*</span>:""}
                </div>            
            </Label>:null}
            <TextInput
                error={error}
                errorMessage={error?<TextInputErrorMessage>{errorMsg}</TextInputErrorMessage>:""}
                onChange={(event) => setText(event.target.value)}
                value={text}
                disabled={disabled}
                placeholder={placeholder}
                inputProps={{
                    id: {id}
                }}
            />
        </div>
    )
}