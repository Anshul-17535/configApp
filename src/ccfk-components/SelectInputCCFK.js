import React, { useState, useRef, useEffect } from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import Label from '@nokia-csf-uxr/ccfk/Label';
import SelectItem, {
  SelectItemLabelContent,
  SelectListItem,
  SelectItemInput,
  SelectItemText,
} from '@nokia-csf-uxr/ccfk/SelectItem';
const HIGHLIGHT_MARK_START = '<span style="font-family:NokiaPureBold">';
const HIGHLIGHT_MARK_END ='</span>';
const MARK_LENGTH = 47; // length of marking strings
const ENTER_KEY = 'Enter';
const SPACE_KEY = ' ';
const ESCAPE = 'Escape';
const TAB = 'Tab';

const isSelectionKeyPressed = key => key && (key === ENTER_KEY || key === SPACE_KEY);
const TEXT_TRUNCATE_STYLE = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
// case insensitive matching all occurrences
const isMatched = (item, searchPattern) => {
  const itemIsIncluded = item.toLowerCase().indexOf(searchPattern.toLowerCase()) >= 0;
  return _.isEmpty(searchPattern) || itemIsIncluded;
};
const markItem = (item, searchPattern, truncateListText=true) => {
  if (!item) {
    return null;
  }
  if (!searchPattern || searchPattern.length === 0) {
    return item;
  }
  let endingIndex = 0;
  const searchPatternLength = searchPattern.length;
  let markedText = item;
  while (true) {
    const startIndex = markedText.toLowerCase().indexOf(searchPattern.toLowerCase(), endingIndex);
    if (startIndex === -1) {
       break;
    }
    const actualText = markedText.substr(startIndex, searchPatternLength);
    const replacementText = `${HIGHLIGHT_MARK_START}${actualText}${HIGHLIGHT_MARK_END}`;
    const beginningText = startIndex > 0 ?  markedText.slice(0,startIndex) : '';
    const endingText = markedText.slice(startIndex + searchPatternLength);
    markedText = beginningText + replacementText + endingText;
    endingIndex = startIndex + searchPatternLength + MARK_LENGTH;
  }
  return <div style={truncateListText ? TEXT_TRUNCATE_STYLE : {}} dangerouslySetInnerHTML={{ __html: markedText }}></div>;
};

const markItemExactly = (item, searchPattern, truncateListText=true) => {
  if (!item) {
    return null;
  }
  const markedText = item.replace( new RegExp(searchPattern, 'g'), `${HIGHLIGHT_MARK_START}${searchPattern}${HIGHLIGHT_MARK_END}`);
  return <div style={truncateListText ? TEXT_TRUNCATE_STYLE : {}} dangerouslySetInnerHTML={{ __html: markedText }}></div>;
};



/** Example of SelectItem that is searchabe and optionally allows creation of new items. */
const SelectInputCCFK = ({
    label,
    onChange,
    value="",
    onChangeArgs=[],
    disabled,
    required, 
    variant,
    maxWidth,
    error,
    errorMessage,
    data,
    caseInsentiveMatching,
    placeholder,
    creatable,
    truncateListText,
    elevationIndex,
    dark}) => {
  const selectItemRef = useRef(null);
  const selectInputRef = useRef(null);
  const [newSearch, setNewSearch] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [shouldMarkItems, setShouldMarkItems] = useState(false);
  const [dataOptions, setDataOptions] = useState(data); // list of ALL options
  const [selectItems, setSelectItems] = useState(data); // filtered options
  const stopEvents = (event) => { 
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(()=>{
    onChange(selected,...onChangeArgs)
  },[selected])

  useEffect(()=>{
    setSelected(value)
    setInputText(value)
  },[value])

  useEffect(()=>{
    setDataOptions(data)
  },[data])

  const haveSelectedItems = () => selectItems && selectItems.length > 0;
  
  const updateSelection = (item) => {
    setSelected(item);
    setInputText(item);
    setIsOpen(false);
  };
  const shouldUpdateSelection = (event) => {
    const { key, type} = event;
    // if ESCAPE or TAB or click (outside) event closed the menu keep current value of `selected`
    if ((key === ESCAPE) || (key === TAB) || (type === 'mousedown')) {
      updateSelection(selected);
    }
  }
  // on SelectListItem, handle Menu item selection and close dropdown Menu after item is selected
  const handleEvent = (item) => (event) => {
    const { type, key } = event;
    switch (type) {
      case 'keydown':
        if (isSelectionKeyPressed(key)) {
            console.log("121",key,item)
          updateSelection(item);
        }
      break;
      case 'click':
        updateSelection(item);
      break;
      default:
    }
  };

  // return any selectitems containing `filterValue`.
  const getFilteredValues = (filterValue) => {
    let filteredItems;
    filteredItems = dataOptions.filter((item) => isMatched(item, filterValue));
    return filteredItems;
  };
  const handleInputChange = (event) => {
    let newText = event.target.value;
    if (newSearch) {
      // remove the unnecessary text
      newText = newText.replace(inputText,'');
    }
    setNewSearch(false);
    if (newText === ' ') {
      // space entered to open the List
      newText = '';
      setSelectItems(dataOptions); // use entire list for new searches
    } else {
      setSelectItems(getFilteredValues(newText));
      setShouldMarkItems(true);
    }
    setInputText(newText);
    setIsOpen(true);
  };
  const handleInputSubmit = (event) => {
      console.log("160",inputText,selected)
    if (!haveSelectedItems()) {
      // no item to select, leave menu open
      setIsOpen(true);
      return;
    }
    if (inputText === '') {
      // if inputText is empty, keep latest selected value
      setInputText(selected);
      setSelected(selected);
    } else if (inputText !== selected) {
      // select the 1st item from the filtered list
      setInputText(selectItems[0]);
      setSelected(selectItems[0]);
    }
    setIsOpen(false);
  }
  const handleInputKeyDown = (event) => {
    const { key } = event;
    if (key === TAB) {
      // prevent tabbing off SelectItem when not done selecting (e.g. no matching items in search)
      if (!haveSelectedItems()) {
        stopEvents(event);
      } else {
        const isTypedTextInData = dataOptions.includes(inputText);
        // prevent tabbing when the search text entered is not in the list
        if (!isTypedTextInData && inputText.length > 0) {
          stopEvents(event);
        } else {
          // if user pressed TAB w/o entering data, keep the original selected data
          if (inputText.length > 0) {
            setSelected(inputText);
          } else {
            setInputText(selected);
          }
          setIsOpen(false);
        }
      }
    }
  };
 

  // searchable base component
  const renderSelectItemInput = (props) => {
    // always show ClearButton when there is a value selected
    return (
      <SelectItemInput
        id="selectitem-component-input"
        ref={selectInputRef}
        autoComplete="off"
        placeholder={inputText !== '' ? undefined : placeholder}
        maxWidth={maxWidth}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
        onFocus={() => { setNewSearch(true); }}
        onKeyDown={handleInputKeyDown}
        value={inputText}
        {...props}
      />
    )
  };
  return (
    <div>
      <Label htmlFor="selectitem-component-input" verticalLayout maxWidth={maxWidth}>
        <div style={{display:"flex",marginBottom: "-4px"}}>
        <span style={{color:"#737373",fontSize:"12px",fontFamily:"NokiaPureHeadline, sans-serif"}}>{label}</span>
          {required?<span style={{color:"red"}}>*</span>:""}
        </div>
      </Label>
      <SelectItem
        ref={selectItemRef}
        aria-label={inputText !== '' ? undefined : placeholder}
        renderSelectItemBase={renderSelectItemInput}
        variant={variant}
        disabled={disabled}
        searchable
        truncateListText={truncateListText}
        maxWidth={maxWidth}
        isOpen={isOpen}
        onOpen={() => { setSelectItems(dataOptions); setIsOpen(true); setShouldMarkItems(false); }}
        onClose={(event) => { if (haveSelectedItems()) {setIsOpen(false)} ; shouldUpdateSelection(event); }}
        error={error}
        errorMessage={errorMessage}
        listProps={{ 
          ulProps: { role: 'listbox' },
          elevationProps: {
            elevationIndex: elevationIndex,
            dark: dark,
          }
        }}
      >
      {haveSelectedItems() && selectItems.map((item) => {
        return (
          <SelectListItem
            role="option"
            key={`${item}`}
            selected={selected === item}
            disabled={item.disabled}
            onClick={handleEvent(item)}
            onKeyDown={handleEvent(item)}
          >
              {shouldMarkItems && caseInsentiveMatching && <SelectItemText>{markItem(item, inputText, truncateListText)}</SelectItemText>}
              {shouldMarkItems && !caseInsentiveMatching && <SelectItemText>{markItemExactly(item, inputText, truncateListText)}</SelectItemText>}
              {!shouldMarkItems && <SelectItemText>{item}</SelectItemText>}
          </SelectListItem>
        );
      })}
      {!creatable && !haveSelectedItems() && <SelectListItem disabled>No matching items</SelectListItem>}
      </SelectItem>
    </div>
  );
};
SelectInputCCFK.propTypes = {
  disabled: PropTypes.bool,
  label:PropTypes.string,
  required: PropTypes.bool,
  variant: PropTypes.string,
  maxWidth: PropTypes.bool,
  placeholder: PropTypes.string,
  data: PropTypes.array,
  searchabale: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  caseInsentiveMatching: PropTypes.bool,
  creatable: PropTypes.bool,
  truncateListText: PropTypes.bool,
  elevationIndex: PropTypes.number,
  dark: PropTypes.bool,
};
SelectInputCCFK.defaultProps = {
  disabled: false,
  label:"label",
  required: false,
  variant: 'outlined',
  maxWidth: false,
  placeholder: "Select",
  error: false,
  errorMessage: undefined,
  data: [],
  caseInsentiveMatching: false,
  creatable: false,
  truncateListText: false,
  elevationIndex: 8,
  dark: false,
}
export default SelectInputCCFK;