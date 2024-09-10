import React, { useEffect, useRef, useState } from 'react';
import Label from '@nokia-csf-uxr/ccfk/Label';
import TextArea, { TextAreaLabelContent } from '@nokia-csf-uxr/ccfk/TextArea';
import { KEY_CODES } from '@nokia-csf-uxr/ccfk/common';
const TextAreaCCFK = ({
    disabled,
    required,
    cols,
    rows,
    placeholder,
    resize,
    errorMessage,
    maxWidth,
    labelContent,
    showClearButton,
    textareaProps,
    autoFocus,
    textValue=""
  }) => { 
  const inputRef = useRef();
  const [value, setValue] = useState(textValue);
  const handleClear = () => { setValue(''); inputRef.current.focus();};
  const handleClearKeyDown = (e) => {
    e.preventDefault();
    if (KEY_CODES.ENTER_KEY === e.key || KEY_CODES.SPACE_KEY === e.key) {
      handleClear();
    }
  }

  useEffect(()=>{
    setValue(textValue)
  },[textValue])
  return (
    <>
      <Label disabled={disabled} verticalLayout maxWidth={maxWidth}>
        <TextAreaLabelContent required={required}>{labelContent}</TextAreaLabelContent>
      </Label>
      <TextArea
        cols={cols}
        rows={rows}
        variant="outlined"
        resize={resize}
        disabled={disabled}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
        textareaProps={{ref: inputRef, ...textareaProps }}
        errorMessage={errorMessage}
        showClearButton={showClearButton}
        clearButtonProps={{ 
          onClick: handleClear,
          onKeyDown: handleClearKeyDown,
          "aria-label": 'Clear contents'
        }}
      />
    </>
  )
};
export default TextAreaCCFK;