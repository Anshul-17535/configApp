import React, { useEffect, useState } from "react"
import Spinner,{ SpinnerLabelContent } from '@nokia-csf-uxr/ccfk/Spinner';
import Label from '@nokia-csf-uxr/ccfk/Label';

export default function SpinnerCCFK({
    label="label",
    id=`spinner_${label}`,
    required=false,
    disabled=false,
    readOnly=false,
    variant="outline",
    min=0,
    value=0,
    max=65535,
    step,
    onChange,
    onChangeArgs=[]
}){

    const [spinnerValue,setSpinnerValue]=useState(value)

    const handleChange=(event)=>{
        setSpinnerValue(event.value)
    }

    useEffect(()=>{
        onChange(spinnerValue,...onChangeArgs)
    },[spinnerValue])

    return (
        <div>
            <Label
                disabled={disabled}
                htmlFor={id}
            >
                <SpinnerLabelContent>{label}</SpinnerLabelContent>
            </Label>
            <Spinner
                inputProps={{
                    id:{id},
                    inputProps: {
                        'aria-label': `Spinner ${spinnerValue}`
                      }
                }}
                variant="outlined"
                size="medium"    
                min={min}
                max={max}
                step={step}
                incrementButtonProps={{ 'aria-label': `Value ${spinnerValue}. Increment` }}
                decrementButtonProps={{ 'aria-label': `Value ${spinnerValue}. Decrement` }}
                readOnly={readOnly}
                disabled={disabled}
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}