import React, { useState, useEffect } from 'react';
import { v4 as getUUID } from 'uuid';
import {
  SearchwChips,
} from '@nokia-csf-uxr/ccfk';
import _ from 'underscore';
import AdvancedTheme from '@nokia-csf-uxr/ccfk/AdvancedTheme';
const EMPTY_STRING = '';
const COPY_LABEL = 'Copy';
const PASTE_LABEL = 'Paste';
const GET_EMPTY_FIELD = () => ({
  type: 'field',
  id: getUUID(), // make sure to generate unique ids
  value: EMPTY_STRING,
});
const joinValues = (valueArray) => {
  let jointValue = '';
  valueArray.forEach((valueItem, index) => {
    jointValue += valueItem.value;
    jointValue = index === valueArray.length - 1 ? jointValue : jointValue += valueItem.separator;
  });
  return jointValue;
};
const getLabel = value => typeof value === 'string' ? value : joinValues(value);

const convertItemToChip=(Item)=>{
  return {
    type: 'chip',
    id: getUUID(),
    selected: false,
    value: Item
  }
}

const convertArrayToChipsData=(Arr)=>{
  let result=[GET_EMPTY_FIELD()]
  Arr.map((item)=>{
    return result=[...result,convertItemToChip(item),GET_EMPTY_FIELD()]
  })
  return result
}

const ChipsInputCCFK=({checkError=false,checkMessage='',value=[],placeHolder="Placeholder",size="medium",ErrorMsg="Duplicate Values Found",ErrConditionRegex="",onChange,onChangeArgs=[],style={}}) => {
  const [data, setData] = useState(convertArrayToChipsData((value === null ||value === undefined )?[]:value ));
  const [clipboard, setClipboard] = useState(undefined);


  useEffect(()=>{
       onChange(chipsDataToArray(data),...onChangeArgs)
  },[data])


  useEffect(() => {
    document.addEventListener("contextmenu", addCopyPasteMenu);
    return () => {
      document.removeEventListener("contextmenu", addCopyPasteMenu);
    };
  }, [data.map(item => item.value)]);

  useEffect(() => {
    document.addEventListener("click", closeChipContextMenu);
    return () => {
      document.removeEventListener("click", closeChipContextMenu);
    };
  }, [data.some(item => item.contextMenu)]);

  const chipsDataToArray=()=>{
    const chipsArr=data.filter((item)=>item.type==="chip")
    const ArrValues=_.pluck(chipsArr,"value")
    return ArrValues
  }

  const closeChipContextMenu = () => {
    if (data.some(item => item.contextMenu)) {
      const newData = [...data].map((item) => ({ ...item, contextMenu: undefined }));
      setData(newData);
    }
  }
  const addCopyMenu = (chipIndex, event) => {
    const newData = [...data].map((item, index) => {
      if(index === chipIndex) {
        return({
          ...item,
          contextMenu: {
            event,
            items: [{
              id: 'copy',
              key: 'copy',
              content: item.selected ? COPY_LABEL : `${COPY_LABEL} "${getLabel(item.value)}"`,
              onClick: () => {
                const selectedChips = data.filter(item => item.selected);
                if (selectedChips.length === 0 || item.selected !== true) {
                  copyChips([item]);
                } else {
                  copyChips(selectedChips);
                }
              }}
            ]}
        });
      }
      return ({ ...item, contextMenu: undefined });
    });
    setData(newData);
  }
  const addPasteMenu = (fieldIndex, event) => {
    const newData = [...data].map((item, index) => {
      if(index === fieldIndex) {
        return({
          ...item,
          contextMenu: {
            event,
            items: [{
              id: 'paste',
              key: 'paste',
              content: PASTE_LABEL,
              onClick: () => {
                pasteChips(fieldIndex);
              }}
            ]
          }
        });
      }
      return ({ ...item, contextMenu: undefined });
    });
    setData(newData);
  }
  const addCopyPasteMenu = event => {
    const path = event.path || event.composedPath && event.composedPath() || [];
    const chipIndex = data.findIndex(item => {
      return path.findIndex(el => item.type === 'chip' && item.id === el.id) > -1;
    });
    const fieldIndex = data.findIndex(item => {
      return path.findIndex(el => item.type === 'field' && item.id === el.id) > -1;
    });
    const aChipIsRightClicked = chipIndex > -1;
    const aFieldIsRightClicked = fieldIndex > -1;
    if (aChipIsRightClicked) {
      // Hide the context menu
      event.preventDefault();
      event.stopPropagation();
      addCopyMenu(chipIndex, event);
    }
    // TODO: Show the context menu if the browser clipboard is changed
    if (aFieldIsRightClicked && clipboard && data[fieldIndex].value === EMPTY_STRING) {
      // Hide the context menu
      event.preventDefault();
      event.stopPropagation();
      addPasteMenu(fieldIndex, event);
    }
  };
  const copyChips = items => {
    const clonedSelectedChips = items.map(item => ({
      ...item,
      selected: undefined
    }));
    // copy to navigator clipboard
    if (navigator.clipboard) {
      const jointValue = items.map(item => item.value).join(', ');
      navigator.clipboard.writeText(jointValue);
    }
    
    // copy to state clipboard
    const newClipboard = clonedSelectedChips
      .map((item) => [item, GET_EMPTY_FIELD()]).reduce((a, b) => a.concat(b));
    setClipboard(newClipboard);
  }
  const pasteChips = targetIndex => {
    const newData = data.map(item => ({ ...item, focused: false }));
    newData.splice(targetIndex + 1, 0, ...clipboard.map((item, index) => ({ ...item, id: getUUID(), focused: index === clipboard.length - 1 })));
    setData(newData);
  }
  
  /** To copy chips with keyboard. */
  const handleChipKeyDown = (event, item, data) => {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 67) { // ctrl + c
      const selectedChips = data.filter(item => item.selected);
      if (selectedChips.length === 0 || item.selected !== true) {
        copyChips([item]);
        return;
      }
      copyChips(selectedChips);
      return;
    }
  };
  const addContextMenu = event => {
    if (!clipboard || event.target.value !== EMPTY_STRING ) {
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 86) { // ctrl + v
      event.nativeEvent.preventDefault();
      const targetField = event.target.getAttribute('id');
      const targetIndex = data.findIndex(item => item.id === targetField);
      pasteChips(targetIndex);
    }
  }
  const addPlaceHolder = (newData) => {
    if (newData.length === 1) {
      return newData.map(item => ({ ...item, placeholder: placeHolder }))
    }
    return(newData.map(item => ({ ...item, placeholder: undefined })));
  }
  const addEventHandlers = data =>
    data.map(item => item.type === 'field'
      ? {...item, onKeyDown: addContextMenu }
      : {...item, onKeyDown: (event) => { handleChipKeyDown(event, item, data); }});

  const RegCond=new RegExp(ErrConditionRegex)
  const validate = data =>
    data.map(item => item.type === 'chip' && !RegCond.test(item.value)
      ? {...item, error: true }
      : {...item, error: item.type === 'chip' && data.filter(dataItem => dataItem.type === 'chip' && item.value === dataItem.value).length > 1});
  const validateSearchwChips = data => data.some(item => item.error);

  const errMsgStyle={
    userSelect: "text",
    fontFamily: "Nokia Pure Text Regular,Arial,sans-serif",
    fontSize: "11px",
    lineHeight: "11px",
    marginTop: "3px",
    color: "#d9070a"
  }
    
  return (
    <div>
	<AdvancedTheme advancedTheme="CCFK Legacy - Light">
        <SearchwChips
            error={validateSearchwChips(data)||checkError}
            data={addPlaceHolder(validate(addEventHandlers(data)))}
            onChange={setData}
            size= 'small'
	    variant={'outlined'}
            SIcon={()=>{}}
            style={{...style}}
        />
        {checkError?<p style={errMsgStyle}>{checkMessage}</p>:<></>}
        {validateSearchwChips(data)?<p style={errMsgStyle}>{ErrorMsg}</p>:<></>}
	</AdvancedTheme>
    </div> 
    );
};

export default ChipsInputCCFK;