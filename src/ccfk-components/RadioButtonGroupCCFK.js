import React, { useEffect, useState } from "react";
import RadioButton, { RadioButtonLabelContent } from '@nokia-csf-uxr/ccfk/RadioButton';
import FieldSet, { FieldSetContent,Legend } from '@nokia-csf-uxr/ccfk/FieldSet'


const RadioButtonGroupCCFK = ({isHorizontal=false,disabled=false,label="Label",value="",radioButtons=[],style={},onChange,onChangeArgs=[]}) => {
    const [selected,setSelected]=useState(value)
    
    useEffect(()=>{
        onChange(selected,...onChangeArgs)
    },[selected])

    useEffect(()=>{
        setSelected(value)
    },[value])

    return (
        <>
            <FieldSet>
                <Legend>{label}</Legend>
                <FieldSetContent style={style} isHorizontal={isHorizontal} >
                    {radioButtons.map((radioButton,Index)=>{
                        return (
                            <div style={{display:"flex"}} key={`${radioButton.label}_${Index}`}>
                                <RadioButton autoFocus={false} checked={radioButton.value===selected} disabled={disabled} inputProps={{ value: radioButton.value }} onChange={(event)=>setSelected(event.target.value)} />
                                <RadioButtonLabelContent >{radioButton.label}</RadioButtonLabelContent>
                            </div>
                        )
                    })}
                </FieldSetContent>
            </FieldSet>
        </>
    );
};
export default RadioButtonGroupCCFK;