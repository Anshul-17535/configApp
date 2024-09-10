import React, { useEffect, useState } from 'react';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
  import MultiSelectSmartList, { MultiSelectSmartListHeader, MultiSelectSmartCheckboxList, MultiSelectSmartListCheckbox, MultiSelectSmartListDivider } from '@nokia-csf-uxr/ccfk/MultiSelectSmartList';
  import _cloneDeep from 'lodash/cloneDeep';
  const ENTER_KEY =  'Enter';
  const SPACE_KEY =  ' ';
  const isSelectionKeyPressed = key => key && (key === ENTER_KEY || key === SPACE_KEY);
  const SAMPLE_DATA = [
    { id: 'athlete', label: 'Athlete', subLabel: 'This is athlete description', selected: true },
    { id: 'year', label: 'Year' },
    { id: 'age', label: 'Age', subLabel: 'This is age description' },
    { id: 'total', label: 'Total', subLabel: 'This is total description' },
    { id: 'sport', label: 'Sport', subLabel: 'This is sport description' },
    { id: 'silver', label: 'Silver', subLabel: 'This is silver description' },
    { id: 'gold', label: 'Gold', subLabel: 'This is gold description' },
    { id: 'country', label: 'Country' },
    { id: 'bronze', label: 'Bronze', subLabel: 'This is bronze description' },
  ];
  
  const MultiSelectCCFK = ({dataList,title,onChange}) => {
    const sortDataBySelection = () => {
      const selectedData = [];
      const unSelectedData = [];
      dataList.forEach((item) => {
        if (item.selected) {
          selectedData.push(item);
        } else {
          unSelectedData.push(item);
        }
      });
      return selectedData.concat(unSelectedData);
    };
    const [sortedData, setSortedData] = useState(sortDataBySelection());
    const [selectAllSelected, setSelectAllSelected] = useState(false);
    const isThereAnySelectedItem = sortedData.some(item => item.selected);
    const minSelected = 0;
    const doesListItemRequireDivider = (index, items) => {
      return ((index + 1) < items.length) && !items[index + 1].selected && items[index].selected;
    };
    useEffect(()=>{
      onChange(sortedData)
    },[sortedData])  
  
    const handleOnChange = (event,id) => {
      event.preventDefault();
      event.stopPropagation();
      const data = _cloneDeep(sortedData);
      data.forEach(item => {
        if (item.id === id) {
          item.selected = !item.selected;
        }
      });
      const selectedData = [];
      const unSelectedData = [];
      data.forEach((item) => {
        if (item.selected) {
          selectedData.push(item);
        } else {
          unSelectedData.push(item);
        }
      });
      if (selectedData.length >= minSelected) {
        setSortedData(selectedData.concat(unSelectedData));
        if (selectedData.length === sortedData.length) {
          setSelectAllSelected(true);
        } else {
          setSelectAllSelected(false);
        }
      }
    };
    const handleKeyDown = (event, id) => {
      if (isSelectionKeyPressed(event.key)) {
        event.preventDefault();
        event.stopPropagation();
        handleOnChange(id);
      }
    };
    const handleselectAllOnChange = () => {
      const data = _cloneDeep(sortedData);
      if (!selectAllSelected) {
        data.forEach(item => {
            item.selected = true;
        });
      } else {
        data.forEach(item => {
            item.selected = false;
        });
      }
      setSortedData(data);
      setSelectAllSelected(!selectAllSelected);
    };
    return (
      <div style={{ padding: '1rem 1rem' }}>
        <MultiSelectSmartList>
          <>
            <Tooltip key="nfConfig_Lis" closeOnOutOfBoundaries={false} placement="top" modifiers={{offset: {offset: "[0, 10]"}}} trigger="hover"
                tooltip="Please Click To Select All">
            <MultiSelectSmartListHeader
              title={selectAllSelected?`ALL SELECTED ${title}`:title}
              selectAllCheckbox={{
                isEnabled: true,
                checked: selectAllSelected,
                indeterminate: isThereAnySelectedItem,
                onChange: handleselectAllOnChange,
                checkboxProps: {
                  inputProps: {
                    id: 'selectAllChkBoxId'
                  }
                },
                labelProps: {
                  htmlFor: 'selectAllChkBoxId'
                }
              }}
            />
            </Tooltip>
            <MultiSelectSmartCheckboxList style={{ height: 'auto' }}>
            {
              sortedData.map((data, index) => {
                if (doesListItemRequireDivider(index, sortedData)) {
                  return (
                    <React.Fragment key={`listItem-${index}`}>
                    <div style={data.selected?{borderStyle:"outset",border:"2px solid #EE872A"}:{}}>                                     
                      <MultiSelectSmartListCheckbox
                        label={data.label}
                        subLabel={data.subLabel}
                        selected={data.selected || false}
                        disabled={data.disabled || false}
                        icon={data.icon}
                        checkboxProps={{
                          inputProps: {
                            id: `listItem-${index}`
                          }
                        }}
                        labelProps={{
                          htmlFor: `listItem-${index}`
                        }}
                        onChange={(event) => handleOnChange(event,data.id)}
                        onKeyDown={(event) => handleKeyDown(event, data.id)}
                      />
                    </div>       

                    </React.Fragment>
                  );
                }
                return (
                  <div style={data.selected?{borderStyle:"outset",border:"2px solid #EE872A"}:{}}>                                     
                  <MultiSelectSmartListCheckbox
                    key={`listItem-${index}`}
                    label={data.label}
                    subLabel={data.subLabel}
                    selected={data.selected || false}
                    disabled={data.disabled || false}
                    icon={data.icon}
                    checkboxProps={{
                      inputProps: {
                        id: `listItem-${index}`
                      }
                    }}
                    labelProps={{
                      htmlFor: `listItem-${index}`
                    }}
                    onChange={(event) => handleOnChange(event,data.id)}
                    onKeyDown={(event) => handleKeyDown(event, data.id)}
                  />
                  </div>
                );
              })
            }
            </MultiSelectSmartCheckboxList>
          </>
        </MultiSelectSmartList>
      </div>
    )
  };

  export default MultiSelectCCFK