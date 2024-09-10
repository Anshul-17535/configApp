import React, { useState,useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import KEY_CODES from '@nokia-csf-uxr/ccfk/common/KeyCodes';
import MoreButton, {
  MoreButtonItem,
  MoreButtonItemText,
  MoreButtonItemIcon,
  MoreButtonItemDivider
} from '@nokia-csf-uxr/ccfk/MoreButton';
import CheckIcon from '@nokia-csf-uxr/ccfk-assets/legacy/CheckIcon';
import { toggleCompactMode } from '@nokia-csf-uxr/ccfk/DataGrid/GridHelpers';

import _cloneDeep from 'lodash/cloneDeep';
import PinCheckIcon from '@nokia-csf-uxr/ccfk-assets/legacy/PinCheckIcon';
import { useCombinedRefs } from '@nokia-csf-uxr/ccfk/common';
import Button from '@nokia-csf-uxr/ccfk/Button';
import Dialog, { DialogContent, DialogFooter } from '@nokia-csf-uxr/ccfk/Dialog';
import MultiSelectSmartList, {
  MultiSelectSmartListHeader,
  MultiSelectSmartCheckboxList,
  MultiSelectSmartListCheckbox,
  MultiSelectSmartListDivider
} from '@nokia-csf-uxr/ccfk/MultiSelectSmartList';
import FilterField, { FilterFieldIcon, FilterFieldClearButton } from '@nokia-csf-uxr/ccfk/FilterField';
import { ListItemText } from '@nokia-csf-uxr/ccfk/List';
import Typography from '@nokia-csf-uxr/ccfk/Typography';
import SortDescendingIcon from '@nokia-csf-uxr/ccfk-assets/legacy/SortDescendingIcon';
import SortByAlphaIcon from '@nokia-csf-uxr/ccfk-assets/legacy/SortByAlphaIcon';
import _ from 'underscore';

const { ENTER_KEY, SPACE_KEY } = KEY_CODES;
const HIGHLIGHT_MARK_START = '<span style="font-family:NokiaPureBold">';
const HIGHLIGHT_MARK_END ='</span>';
const MARK_LENGTH = 47; // length of marking strings

const TEXT_TRUNCATE_STYLE = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

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

const isSelectionKeyPressed = key => key && (key === ENTER_KEY || key === SPACE_KEY);
/** Header component used to provide grid related actions.
 * The forwarded ref returns reference to the button as 'buttonRef' and menu as 'menuRef'.
 */
const DefaultGridActions = React.forwardRef((props, ref) => {
  const { menuProps, listProps, isEnterprise } = props;
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showColumnDialog, setShowColumnDialog] = useState(false);
  const modifiedMenuProps = {
    ref: menuRef,
    ...menuProps
  };
  const onCompactModeClick = () => {
    toggleCompactMode({ api: props.api, columnApi: props.columnApi });
    // Toggle compact mode for open master details grid.
    props.api.forEachDetailGridInfo((detailGridInfo) => {
      toggleCompactMode({ api: detailGridInfo.api, columnApi: props.columnApi });
    });
  };

  const triggerButtonStyle = props.api.context.compactMode ? { minWidth: '1.75rem', width: '1.75rem', height: '1.75rem' } : {};
  return (
    <div>
      <MoreButton
        isOpen={showMenu}
        ref={ref}
        rippleStyle={triggerButtonStyle}
        style={triggerButtonStyle}
        aria-label="DataGrid More actions"
        onOpen={() => {
          setShowMenu(true);
        }}
        onClose={() => {
          setShowMenu(false);
        }}
        onBlur={(event) => {
          if (menuRef.current && menuRef.current.menuRef && !menuRef.current.menuRef.contains(event.relatedTarget)) {
            setShowMenu(false);
          }
        }}
        menuProps={modifiedMenuProps}
        listProps={listProps}
      >
        <MoreButtonItem
          onClick={() => {
            props.columnApi.applyColumnState({
              defaultState: { sort: null }
            });
          }}
          onKeyDown={(e) => {
            if (isSelectionKeyPressed(e.key)) {
              e.stopPropagation();
              props.columnApi.applyColumnState({
                defaultState: { sort: null }
              });
            }
          }}
          aria-label="Clear Sorting"
        >
          <MoreButtonItemText>Clear Sorting</MoreButtonItemText>
        </MoreButtonItem>
        <MoreButtonItem
          onClick={() => {
            props.api.setFilterModel(null);
            props.api.onFilterChanged();
          }}
          onKeyDown={(e) => {
            if (isSelectionKeyPressed(e.key)) {
              e.stopPropagation();
              props.api.setFilterModel(null);
              props.api.onFilterChanged();
            }
          }}
          aria-label="Clear Filters"
        >
          <MoreButtonItemText>Clear Filters</MoreButtonItemText>
        </MoreButtonItem>
        <MoreButtonItem
          onClick={() => {
            setShowColumnDialog(true);
          }}
          onKeyDown={(e) => {
            if (isSelectionKeyPressed(e.key)) {
              e.stopPropagation();
              setShowColumnDialog(true);
            }
          }}
          aria-label="Manage Columns"
        >
          <MoreButtonItemText>Manage Columns...</MoreButtonItemText>
        </MoreButtonItem>
        <MoreButtonItem
          onClick={() => {
            const allColumnIds = [];
            props.columnApi.getAllColumns().forEach((columnDef) => {
              allColumnIds.push(columnDef.colId);
            });
            props.columnApi.autoSizeColumns(allColumnIds);
          }}
          onKeyDown={(e) => {
            if (isSelectionKeyPressed(e.key)) {
              e.stopPropagation();
              const allColumnIds = [];
              props.columnApi.getAllColumns().forEach((columnDef) => {
                allColumnIds.push(columnDef.colId);
              });
              props.columnApi.autoSizeColumns(allColumnIds);
            }
          }}
          aria-label="Autosize all Columns"
        >
          <MoreButtonItemText>Autosize all Columns</MoreButtonItemText>
        </MoreButtonItem>
        <MoreButtonItemDivider />
        <MoreButtonItem
          onClick={() => {
            props.columnApi.resetColumnState();
          }}
          onKeyDown={(e) => {
            if (isSelectionKeyPressed(e.key)) {
              e.stopPropagation();
              props.columnApi.resetColumnState();
            }
          }}
          aria-label="Reset all Columns"
        >
          <MoreButtonItemText>Reset all Columns</MoreButtonItemText>
        </MoreButtonItem>
        {/* <MoreButtonItem
          onClick={() => {
            props.api.exportDataAsCsv();
          }}
          onKeyDown={(e) => {
            if (isSelectionKeyPressed(e.key)) {
              e.stopPropagation();
              props.api.exportDataAsCsv();
            }
          }}
          aria-label="Export to CSV"
        >
          <MoreButtonItemText>Export to CSV</MoreButtonItemText>
        </MoreButtonItem> */}
        {isEnterprise && (
          <MoreButtonItem
            onClick={() => {
              props.api.exportDataAsExcel();
            }}
            onKeyDown={(e) => {
              if (isSelectionKeyPressed(e.key)) {
                e.stopPropagation();
                props.api.exportDataAsExcel();
              }
            }}
            aria-label="Export to XLSX"
          >
            <MoreButtonItemText>Export to XLSX</MoreButtonItemText>
          </MoreButtonItem>
        )}
        {props.enableCompactMode !== false && (
          <div>
            <MoreButtonItemDivider />
            <MoreButtonItem
              onClick={onCompactModeClick}
              onKeyDown={(e) => {
                if (isSelectionKeyPressed(e.key)) {
                  e.stopPropagation();
                  console.log('Clicked Compact Rows');
                }
              }}
              aria-label="Compact Rows"
            >
              {props.api.context.compactMode && (
                <MoreButtonItemIcon>
                  <CheckIcon />
                </MoreButtonItemIcon>
              )}
              <MoreButtonItemText>Compact Rows</MoreButtonItemText>
            </MoreButtonItem>
          </div>
        )}
      </MoreButton>
      <ColumnManagementDialog
        columnApi={props.columnApi}
        isOpen={showColumnDialog}
        hasColumnDescription={false}
        isSelectAllEnabled
        sortBy="alphabetic"
        onApply={() => {
          setShowColumnDialog(false);
        }}
        onCancel={() => {
          setShowColumnDialog(false);
        }}
      />
    </div>
  );
});
DefaultGridActions.displayName = 'DefaultGridActions';
DefaultGridActions.propTypes = {
  menuProps: PropTypes.shape({
    /** Have `menu` render in portal. */
    usePortal: PropTypes.bool,
    /** Specify container in which `menu` is rendered in portal. */
    portalContainer: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ]),
    /** Override `menu` positioning options based on popper (https://popper.js.org/docs/v2/). */
    positioningOptions: PropTypes.shape({})
  }),
  /** Override `List` props that act as a container for the menu items inside menu. */
  listProps: PropTypes.shape({}),
  /** Determine whether grid is enterprise to show enterprise specific actions. */
  isEnterprise: PropTypes.bool
};
DefaultGridActions.defaultProps = {
  menuProps: {},
  listProps: {},
  isEnterprise: false
};
export default DefaultGridActions;
/****** ColumnManagementDialog *****/

const MIN_SELECTED = 1;
const SORT_BY_VALUES = ['alphabetic', 'visible'];
const sortColumnsByVisibility = (cols) => {
  const selectedData = [];
  const unSelectedData = [];
  cols.forEach((item) => {
    if (item.selected) {
      selectedData.push(item);
    } else {
      unSelectedData.push(item);
    }
  });
  return selectedData.concat(unSelectedData);
};
const sortColumnsAlphabetically = (cols) => {
  const columnsCopy = _cloneDeep(cols);
  columnsCopy.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
  return columnsCopy;
};
const ColumnManagementDialog = React.forwardRef((props, ref) => {
  const {
    columnApi,
    isOpen,
    hasColumnDescription,
    sortBy,
    title,
    columnListTitle,
    applyBtnText,
    cancelBtnText,
    onApply,
    onCancel,
    ...otherProps
  } = props;
  const dialogHeaderRef = useRef();
  const footerRef = useRef();
  const filterFieldRef = useRef();
  const smartListHeaderRef = useRef();
  const checkboxListRef = useRef();
  const dialogRef = useRef();
  const combinedRef = useCombinedRefs(ref, dialogRef);
  const hasRef = () =>
    combinedRef.current &&
    footerRef.current &&
    filterFieldRef.current &&
    smartListHeaderRef.current &&
    checkboxListRef.current &&
    dialogHeaderRef.current;
  // calculate list height after dialog is open
  const afterOpenModal = () => {
    // Use setTimeout to ensure checkboxListRef is not null.
    setTimeout(() => {
      if (hasRef()) {
        const newHeight =
          combinedRef.current.clientHeight -
          footerRef.current.clientHeight -
          filterFieldRef.current.clientHeight -
          smartListHeaderRef.current.clientHeight -
          dialogHeaderRef.current.clientHeight -
          3;
        checkboxListRef.current.style.height = `${newHeight}px`;
      }
    });
  };
  const getAllGridColumns = () => {
    const cols = [];
    const allColumns = props.columnApi.getAllGridColumns();
    allColumns.forEach((col) => {
      if (
        col.userProvidedColDef &&
        col.userProvidedColDef.type !== 'actionColumn' &&
        col.colDef.cellRenderer !== 'agGroupCellRenderer' &&
        !col.colDef.checkboxSelection
      ) {
        cols.push({
          label: col.colDef.headerName || col.colDef.field,
          icon: col.pinned === 'left' || col.pinned === 'right' ? <PinCheckIcon /> : undefined,
          id: col.colId,
          selected: col.visible,
          disabled: col.pinned === 'left' || col.pinned === 'right',
          subLabel: col.parent ? props.columnApi.getDisplayNameForColumnGroup(col.parent) : undefined
        });
      }
    });
    return cols;
  };
  const columns = getAllGridColumns();
  const isSortByAlphabetic = sort => sort === SORT_BY_VALUES[0];
  const areAllColumnsSelected = cols => cols.filter(item => item.selected).length === columns.length;
  const isThereAnySelectedColumn = cols => !areAllColumnsSelected(cols) && cols.some(item => item.selected);
  const [sortedColumns, setSortedColumns] = useState(isSortByAlphabetic(sortBy) ? sortColumnsAlphabetically(columns) : sortColumnsByVisibility(columns));
  const [columnState, setColumnState] = useState(columnApi.getColumnState());
  const [selectAllSelected, setSelectAllSelected] = useState(areAllColumnsSelected(columns));
  const [selectAllIndeterminate, setSelectAllIndeterminate] = useState(isThereAnySelectedColumn(columns));
  const [sort, setSort] = useState(sortBy);
  const [applyEnabled, setApplyEnabled] = useState(false);
  const [filterValue, setFilterValue] = React.useState('');
  const [shouldMarkItems, setShouldMarkItems] = useState(false);
  useEffect(() => {
    if (isOpen) {
      const gridColumns = isSortByAlphabetic(sortBy)
        ? sortColumnsAlphabetically(getAllGridColumns())
        : sortColumnsByVisibility(getAllGridColumns());
      setSortedColumns(gridColumns);
      setShouldMarkItems(false);
      setFilterValue('');
    }
  }, [isOpen]);
  const handleSortChanged = (newSortBy) => {
    setSort(newSortBy);
    if (isSortByAlphabetic(newSortBy)) {
      setSortedColumns(sortColumnsAlphabetically(sortedColumns));
    } else {
      setSortedColumns(sortColumnsByVisibility(sortedColumns));
    }
  };
  const handleOnChange = (id) => {
    let resolvedColumns = _cloneDeep(sortedColumns);
    resolvedColumns.forEach((item) => {
      if (item.id === id) {
        item.selected = !item.selected; // eslint-disable-line no-param-reassign
      }
    });
    // Sort Columns
    if (isSortByAlphabetic(sort)) {
      resolvedColumns = sortColumnsAlphabetically(resolvedColumns);
    } else {
      resolvedColumns = sortColumnsByVisibility(resolvedColumns);
    }
    // Update select all and columns in list
    const selectedData = resolvedColumns.map(item => item.selected);
    if (selectedData.length >= MIN_SELECTED) {
      setSortedColumns(resolvedColumns);
      if (areAllColumnsSelected(resolvedColumns)) {
        setSelectAllSelected(true);
      } else {
        if (isThereAnySelectedColumn(resolvedColumns)) {
          setSelectAllIndeterminate(true);
        }
        setSelectAllSelected(false);
      }
      // Update column state
      const currentColState = _cloneDeep(columnState);
      currentColState.forEach((item) => {
        if (item.colId === id) {
          item.hide = !item.hide; // eslint-disable-line no-param-reassign
        }
      });
      // change grid columns
      currentColState.push(currentColState.splice(
        currentColState.findIndex(item => item.colId === id),
        1
      )[0]);
      setColumnState(currentColState);
      setApplyEnabled(true);
    }
  };
  // return any columns containing `filterValue`.
  const getFilteredColumns = (filterValue) => {
    if (filterValue === '') {
      return isSortByAlphabetic(sortBy) ? sortColumnsAlphabetically(columns) : sortColumnsByVisibility(columns);
    }
    return columns.filter(item => isMatched(item.label, filterValue));
  };
  const handleSelectAllOnChange = () => {
    const data = _cloneDeep(sortedColumns);
    if (!selectAllSelected) {
      data.forEach((item) => {
        item.selected = true; // eslint-disable-line no-param-reassign
      });
      setApplyEnabled(true);
    } else {
      data.forEach((item) => {
        item.selected = false; // eslint-disable-line no-param-reassign
      });
      setApplyEnabled(false);
    }
    setSortedColumns(data);
    setSelectAllIndeterminate(false);
    setSelectAllSelected(!selectAllSelected);
    const currentColState = _cloneDeep(columnState);
    currentColState.forEach((item) => {
      if (!selectAllSelected || item.pinned === 'right' || item.pinned === 'left') {
        item.hide = false; // eslint-disable-line no-param-reassign
      } else {
        item.hide = true; // eslint-disable-line no-param-reassign
      }
    });
    // Change grid columns
    setColumnState(currentColState);
  };
  return (
    <Dialog
      contentRef={(ref) => {
        combinedRef.current = ref;
      }}
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      {...otherProps}
    >
      <ColumnManagementDialogHeader
        title={title}
        sortBy={sort}
        onSortChanged={handleSortChanged}
      />
      <DialogContent style={{ padding: '0 1.25rem' }}>
        <MultiSelectSmartList style={{ height: '100%' }} elevationProps={{ elevationIndex: 0 }}>
          <>
            <FilterField
              value={filterValue}
              onChange={(e) => {
                  setFilterValue(e.target.value);
                  setSortedColumns(getFilteredColumns(e.target.value));
                  setShouldMarkItems(true);
              }}
              textInputProps={{
                placeholder: 'Placeholder',
                showClearButton: true,
                clearButtonProps: {
                  onClick: () => {
                    setFilterValue('');
                    setSortedColumns(getFilteredColumns(''));
                  }
                },
                inputProps: {
                  'aria-label': 'Search',
                }
              }}
              renderIcon={
                <FilterFieldIcon />
              }
            />
            <MultiSelectSmartListHeader
              ref={smartListHeaderRef}
              title={columnListTitle}
              selectAllCheckbox={{
                isEnabled: sortedColumns.length > 0,
                checked: selectAllSelected,
                indeterminate: selectAllIndeterminate,
                onChange: handleSelectAllOnChange,
                checkboxProps: {
                  inputProps: {
                    id: 'selectAllChkBoxId',
                    height: 'calc(100% - 78px)'
                  }
                },
                labelProps: {
                  htmlFor: 'selectAllChkBoxId',
                  height: '100%'
                }
              }}
              style={{
                borderTop: 0
              }}
            />
            <MultiSelectSmartCheckboxList ref={checkboxListRef}>
              {sortedColumns.map((data, index) => {
                if (
                  sort === SORT_BY_VALUES[1] &&
                  index + 1 < sortedColumns.length &&
                  !sortedColumns[index + 1].selected &&
                  sortedColumns[index].selected
                ) {
                  return (
                    <React.Fragment key={`listItem-${index}`}>
                      <MultiSelectSmartListCheckbox
                        label={shouldMarkItems ? markItem(data.label, filterValue) : data.label}
                        subLabel={data.subLabel}
                        selected={data.selected || false}
                        disabled={data.disabled || false}
                        icon={data.icon}
                        checkboxProps={{
                          inputProps: {
                            id: `listItem-${index}`
                          }
                        }}
                        onChange={() => handleOnChange(data.id)}
                        onKeyDown={(event) => {
                          if (isSelectionKeyPressed(event.key)) {
                            handleOnChange(data.id);
                          }
                        }}
                      />
                      <MultiSelectSmartListDivider />
                    </React.Fragment>
                  );
                }
                return (
                  <MultiSelectSmartListCheckbox
                    key={`listItem-${index}`}
                    label={shouldMarkItems ? markItem(data.label, filterValue) : data.label}
                    subLabel={data.subLabel}
                    selected={data.selected || false}
                    disabled={data.disabled || false}
                    icon={data.icon}
                    checkboxProps={{
                      inputProps: {
                        id: `listItem-${index}`
                      }
                    }}
                    onChange={() => handleOnChange(data.id)}
                    onKeyDown={(event) => {
                      if (isSelectionKeyPressed(event.key)) {
                        handleOnChange(data.id);
                      }
                    }}
                  />
                );
              })}
              {sortedColumns.length === 0 && <ListItemText disabled>No matching items</ListItemText>}
            </MultiSelectSmartCheckboxList>
          </>
        </MultiSelectSmartList>
      </DialogContent>
      <DialogFooter ref={footerRef}>
        <Button onClick={onCancel}>{cancelBtnText}</Button>
        <Button
          disabled={!applyEnabled}
          onClick={() => {
            columnApi.applyColumnState({
              state: columnState,
              applyOrder: true
            });
            setApplyEnabled(false);
            onApply();
          }}
        >
          {applyBtnText}
        </Button>
      </DialogFooter>
    </Dialog>
  );
});
ColumnManagementDialog.displayName = 'ColumnManagementDialog';
ColumnManagementDialog.propTypes = {
  columnApi: PropTypes.shape({}).isRequired,
  isOpen: PropTypes.bool,
  hasColumnDescription: PropTypes.bool,
  sortBy: PropTypes.oneOf(SORT_BY_VALUES),
  title: PropTypes.string,
  columnListTitle: PropTypes.string,
  applyBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
ColumnManagementDialog.defaultProps = {
  isOpen: false,
  hasColumnDescription: false,
  sortBy: 'visible',
  title: 'Manage Columns',
  columnListTitle: 'Available Columns',
  applyBtnText: 'APPLY',
  cancelBtnText: 'CANCEL'
};
// export default ColumnManagementDialog;

const TYPOGRAPHY_CONFIG = {
  variant: 'TITLE_16',
  style: {
    flex: 1
  }
};
const getButtonContent = (sortBy) => {
  if (sortBy === SORT_BY_VALUES[0]) {
    return <SortByAlphaIcon />;
  }
  return <SortDescendingIcon />;
};
/** All other props will be provided to the wrapper element. */
const ColumnManagementDialogHeader = (props) => {
    const {
      title, typographyProps: givenTypographyProps, sortBy, onSortChanged, ...otherProps
    } = props;
    const typographyProps = {
      ...TYPOGRAPHY_CONFIG,
      ...givenTypographyProps
    };
    const [visible, setVisibility] = useState(false);
    const [buttonContent, setButtonContent] = useState(getButtonContent(sortBy));
    const [selectedIndex, setSelectedIndex] = useState(SORT_BY_VALUES.indexOf(sortBy));
    const isValidKey = event => event.key === KEY_CODES.ENTER_KEY || event.key === KEY_CODES.SPACE_KEY;
    const handleSortChanged = (sort) => {
      onSortChanged && onSortChanged(sort);
    };
    const handleKeyDown = (event) => {
      isValidKey(event) && handleSortChanged();
    };
    useEffect(() => {
      setButtonContent(getButtonContent(sortBy));
      setSelectedIndex(SORT_BY_VALUES.indexOf(sortBy));
    }, [sortBy]);
    return (
      <div {...otherProps}>
        <Typography maxLines={2} {...typographyProps}>
          {title}
        </Typography>
        <MoreButton
          isOpen={visible}
          aria-label="Sort order"
          onOpen={() => setVisibility(true)}
          onClose={() => setVisibility(false)}
          buttonContent={buttonContent}
        >
          <MoreButtonItem
            selected={selectedIndex === 0}
            onClick={() => handleSortChanged(SORT_BY_VALUES[0])}
            onKeyDown={handleKeyDown}
            aria-label="Alphabetic"
          >
            <MoreButtonItemIcon>
              <SortByAlphaIcon />
            </MoreButtonItemIcon>
            <MoreButtonItemText>Alphabetic</MoreButtonItemText>
          </MoreButtonItem>
          <MoreButtonItem
            selected={selectedIndex === 1}
            onClick={() => handleSortChanged(SORT_BY_VALUES[1])}
            onKeyDown={handleKeyDown}
            aria-label="Visible"
          >
            <MoreButtonItemIcon>
              <SortDescendingIcon />
            </MoreButtonItemIcon>
            <MoreButtonItemText>Visible</MoreButtonItemText>
          </MoreButtonItem>
        </MoreButton>
      </div>
    );
  };
ColumnManagementDialogHeader.displayName = 'ColumnManagementDialogHeader';
ColumnManagementDialogHeader.propTypes = {
  /** The content of the title. */
  title: PropTypes.node.isRequired,
  /** The title typography props. */
  typographyProps: PropTypes.shape({}),
  /** sort type */
  sortBy: PropTypes.oneOf(SORT_BY_VALUES),
  /** Callback when sort icon is clicked */
  onSortChanged: PropTypes.func
};
ColumnManagementDialogHeader.defaultProps = {
  typographyProps: {},
  sortBy: 'visible',
  onSortChanged: undefined
};
// export default ColumnManagementDialogHeader;