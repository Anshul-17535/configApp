import React, { useState, useRef, useEffect ,useCallback} from 'react';
import DataGrid from '@nokia-csf-uxr/ccfk/DataGrid';
import SearchwChips from '@nokia-csf-uxr/ccfk/SearchwChips';
import DefaultGridActions from "./DefaultGridActionsCCFK";
import _ from 'underscore';

/** These imports are not valid for implementation. Please check storybook Code panel for source code examples  */
// import inlineRowActionsColumnDefs from '@nokia-csf-uxr/ccfk/DataGrid/stories/utils/columnDefs/inlineRowActionsColumnDefs';
// import data from '@nokia-csf-uxr/ccfk/DataGrid/FrameworkComponents/';


const DataGridCCFK = ({gridData,gridOption,returnRowActionColumn,defaultGridActionsPosition="right",frameworkObj={}}) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState({});
  const [filterValue, setFilterValue] = useState([
    {
      type: 'field',
      id: 'field-1',
      value: ''
    }
  ]);

  const onGridSizeChanged = useCallback(() => {
    if (gridRef.current.api) {
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  useEffect(()=>{
    setRowData(gridData)
  },[gridData])

  const filterValueRef = useRef([]);

  const onGridReady = useCallback(
    (params) => {
      setGridApi(params.api);
      setRowData(gridData);
      params.api.sizeColumnsToFit();
      window.addEventListener("resize", function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit();
        });
      });
      gridRef.current.api.sizeColumnsToFit();
    },
    [gridRef]
  );

  const showOrHideOverlay = () => {
    if (gridApi && gridApi.getModel().rowsToDisplay) {
      if (gridApi.getModel().rowsToDisplay.length === 0) {
        gridApi.showNoRowsOverlay();
      } else {
        gridApi.hideOverlay();
      }
    }
  };

  const onFilterChanged = () => {
    showOrHideOverlay();
  };

  const isExternalFilterPresent = () => filterValueRef.current.filter(item => item.type === 'chip').length > 0;

  const externalFilterChanged = (newValue) => {
    filterValueRef.current = newValue;
    setFilterValue(newValue);
    gridApi && gridApi.onFilterChanged && gridApi.onFilterChanged();
  };

  const doesExternalFilterPass = ({ data }) => {
    let pass = true;
    if (!isExternalFilterPresent()) {
      return pass;
    }
    const terms = filterValueRef.current
      .filter(chipsItem => chipsItem.type === 'chip')
        .map(chip => chip.value.toString().toLowerCase());
    terms.forEach(term => {
      let isTermMatchedWithACol = false;
      _.map(data, columnValue => {
        const stringColValue = !!columnValue?columnValue.toString().toLowerCase():""
        isTermMatchedWithACol = isTermMatchedWithACol || stringColValue.indexOf(term) > -1;
      });
      pass = pass && isTermMatchedWithACol;
    });
    return pass;
  };

  const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };


  return (
    <>
    <SearchwChips 
      data={filterValue} 
      variant={'outlined'} 
      onChange={externalFilterChanged} 
      size= 'small'
      style={{ margin: 'var(--spacing-xx-small) var(--spacing-medium)', height: '2rem', paddingTop: 'var(--spacing-xx-small)' }} 
      />
    <DataGrid
      wrapperProps={{
        style: {
          height: '100vh',
          width: '100%'
        }
      }}
      ref={gridRef}
      onFirstDataRendered={onFirstDataRendered}
      suppressRowClickSelection={true}
      rowData={rowData}
      suppressContextMenu
      defaultColDef={{
        menuTabs: ['filterMenuTab']
      }}
      columnDefs={[...gridOption.columnDefs,
        returnRowActionColumn(),
        {
        type: 'actionColumn',
        width:'3rem',
        pinned: defaultGridActionsPosition,
        headerComponent: 'DefaultGridActions'
    }]}
      frameworkComponents={{
        DefaultGridActions,...frameworkObj
      }}
      onGridReady={onGridReady}
      onGridSizeChanged={onGridSizeChanged}
      onFilterChanged={onFilterChanged}
      isExternalFilterPresent={isExternalFilterPresent}
      doesExternalFilterPass={doesExternalFilterPass}
      // When the data set is huge, it takes too long to wait Ag-grid run shouldComponentUpdate after setting a new state in a component which contains a grid.
      // In this situation, the iconButton clicking ripple will be blocked and stuck. Because ag-grid use deepValueCheck in shouldComponentUpdate hook by default,
      // and it will take lots of time.
      // Set this property to be `IdentityCheck` could speed up the checking process in shouldComponentUpdate.
      // Please find more details in: https://www.ag-grid.com/react-grid/fine-tuning/#row-data--column-def-control
    />
    </>
  );
};
export default DataGridCCFK;

