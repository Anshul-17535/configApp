
import React, { useEffect, useState } from 'react';

const CheckBoxCCFK = ({ value, label, disabled, onChange, isHorizontal }) => {
    const [checked,setChecked]=useState(value)
    useEffect(()=>{
        onChange(checked)
    },[checked])
    return (
        <div className={isHorizontal ? 'horizontal-checkbox' : 'vertical-checkbox'}>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                disabled={disabled}
                onChange={()=>setChecked(!checked)}
            />
            <label>{label}</label>
        </div>
    );
};

export default CheckBoxCCFK;