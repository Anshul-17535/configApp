import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _cloneDeep from 'lodash/cloneDeep';
import {
    TreeBranch,
    TreeNode,
    TreeIcon,
    TreeText,
    TreeDropDownButton,
    TreeContainer
  } from '@nokia-csf-uxr/ccfk/Tree';
import Tree from '@nokia-csf-uxr/ccfk/Tree';
import Icon from '@nokia-csf-uxr/ccfk/Icon';
import _ from 'underscore';

// in rem units
const TITLE_HEIGHT = 1.5;
const FOOTER_HEIGHT = 4;
const FILTER_HEIGHT = 3.375;
const FILTER_MATCHES_HEIGHT = 2.3125; 
const DIV_PADDING_HEIGHT = 1;
const FOOTER_DIVIDER_HEIGHT = 0.0625;
const ROW_HEIGHT = 2;

const ENTER_KEY = 'Enter';
const SPACE_KEY = ' ';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const isSelectionKeyPressed = key => key && (key === ENTER_KEY || key === SPACE_KEY);
const isLeftRightArrowPressed = key => key &&( key === ARROW_LEFT || key === ARROW_RIGHT);

const TreeCCFK = (props) => {
  const { useFilter,TreeData,onClick} = props;
  const [treeData, setTreeData] = useState(TreeData);  // complete Tree
  const [branchOpenStates, setBranchOpenStates] = useState([]); // open state of each TreeBranch
  const [selectedNodeId, setSelectedNodeId] = useState(undefined); // selected Tree item id
  const treeMatchedCount = useRef(0); // number of matches when filtering
  const listRef = useRef();
  // initialize array to hold tree branchs open/close state
  const initializeStates = (data, dataArray = []) => {
    for (let treeIndex = 0; treeIndex < data.length; treeIndex += 1) {
      const treeItem = data[treeIndex];
      if (treeItem.isBranch) {
        dataArray.push({
          id: treeItem.id,
          isOpen: treeItem.isOpen !== undefined ? treeItem.isOpen : false,
        });
        if (treeItem.nodes && treeItem.nodes.length > 0) {
          initializeStates(treeItem.nodes, dataArray);
        }
      }
    }
    setBranchOpenStates(dataArray);
  }
  useEffect(() => {
    // array to hold branch open state
    initializeStates(TreeData);
  }, []); // on mount only

  useEffect(()=>{
    onClick(selectedNodeId)
  },[selectedNodeId])

  const isBranchOpen = (id) => {
    const currentIndex = _.findIndex(branchOpenStates, elem => elem.id === id);
    return currentIndex >= 0 && branchOpenStates[currentIndex].isOpen;
  }
  // update the isOpen branch state
  const updateBranchState = (id, isBranchOpen) => {
    const newStates = _cloneDeep(branchOpenStates);
    const currentIndex = _.findIndex(newStates, elem => elem.id === id);
    newStates[currentIndex].isOpen = isBranchOpen;
    setBranchOpenStates(newStates);
  };
  // toggle the isOpen branch state
  const toggle = (id) => {
    const newStates = _cloneDeep(branchOpenStates);
    const currentIndex = _.findIndex(newStates, elem => elem.id === id);
    const currentOpenState = newStates[currentIndex].isOpen;
    newStates[currentIndex].isOpen = !currentOpenState;
    setBranchOpenStates(newStates);
  }
  const toggleIsOpen = (id) => (event) => {
    const { type, key } = event;
    switch (type) {
      case 'keydown':
        if (isSelectionKeyPressed(key)) {
          event.stopPropagation();
          event.preventDefault();
          toggle(id);
          setSelectedNodeId(id);
        } else if (isLeftRightArrowPressed(key)) {
          event.preventDefault();
          key === ARROW_LEFT && event.stopPropagation();
          if (isBranchOpen(id) && key === ARROW_LEFT) {
            // open and left arrow, close node
            event.stopPropagation();
            updateBranchState(id, false);
          } else if (!isBranchOpen(id) && key === ARROW_RIGHT) {
            // closed and right arrow, open node
            event.stopPropagation();
            updateBranchState(id, true);
          }
        }
      break;
      case 'dblclick':
        toggle(id);
      break;
      case 'click':
        event.stopPropagation();
        toggle(id);
      break;
      default:
    }
  };
  const handleClickEvent = (id) => (e) => {
    setSelectedNodeId(id);
    e.stopPropagation();
  };
  const handleNodeKeyDownEvent = (id) => (event) => {
    const { key, type } = event;
    if (type === 'keydown') {
      if (isSelectionKeyPressed(key)) {
        setSelectedNodeId(id);
        event.stopPropagation();
        event.preventDefault();
      } else if (isLeftRightArrowPressed(key)) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };

  const renderBranchContent = (id, text, collapsedIcon, expandedIcon) => () => {
    return (
      <>
        <TreeDropDownButton
          iconButtonProps={{
            'aria-label': `Toggle ${text}`,
            onClick: toggleIsOpen(id),
          }}
        />
        <TreeIcon><Icon src={ isBranchOpen(id) ? expandedIcon : collapsedIcon } aria-label={null} /></TreeIcon>
        <TreeText>{text}</TreeText>
      </>
    );
  };
  const renderTreeData = (data) => {
    const treeNodes = [];
    let treeNode = undefined;
    for (let treeIndex = 0; treeIndex < data.length; treeIndex += 1) {
      const node = data[treeIndex];
      if (node.isBranch) {
        treeNode = (
          <TreeBranch
            key={node.id}
            id={node.id}
            level={node.level}
            disabled={node.disabled}
            selected={selectedNodeId === node.id}
            error={node.error}
            errorMessage={node.errorMessage}
            onClick={handleClickEvent(node.id)}
            onDoubleClick={toggleIsOpen(node.id)}
            onKeyDown={toggleIsOpen(node.id)}
            isOpen={isBranchOpen(node.id)}
            dndDropIsOverCallback={()=>{}}
            role="presentation"
            treeBranchContentProps={{
              'aria-label': selectedNodeId === node.id ? `${node.text} selected` : `${node.text}`,
              'aria-posinset': node.posinset,
              'aria-setsize': node.setsize,
              'aria-selected': selectedNodeId === node.id,
            }}
            renderBranchContent={renderBranchContent(node.id, node.text, node.collapsedIcon, node.expandedIcon)}
          >
            {node.nodes && node.nodes.length > 0 && renderTreeData(node.nodes)}
          </TreeBranch>
        );
      } else {
        treeNode = (
          <TreeNode
            key={node.id}
            id={node.id}
            aria-posinset={node.posinset}
            aria-setsize={node.setsize}
            aria-selected={selectedNodeId === node.id}
            aria-label={selectedNodeId === node.id ? `${node.text} selected` : `${node.text}`}
            onClick={handleClickEvent(node.id)}
            onKeyDown={handleNodeKeyDownEvent(node.id)}
            selected={selectedNodeId === node.id}
            disabled={node.disabled}
            >
            <TreeIcon><Icon src={node.icon} aria-label={null}/></TreeIcon>
                <TreeText>{node.text}</TreeText>
            </TreeNode>
        );
      }
      treeNodes.push(treeNode);
    }
    return treeNodes;
  }
  // listProps maxHeight is 100vh - (title height + footer height + filter height + filter matches height + padding top + padding bottom)
  const haveFilterMatches = useFilter ? treeMatchedCount.current > 0 : false;
  const treeContainerPartsHeight = TITLE_HEIGHT + FOOTER_HEIGHT + (useFilter ? FILTER_HEIGHT : 0) +
        (haveFilterMatches ? FILTER_MATCHES_HEIGHT : 0) + DIV_PADDING_HEIGHT + FOOTER_DIVIDER_HEIGHT + 0.625;
  const treeContainerPartsHeightInRem = `${treeContainerPartsHeight}rem`;
  const windowInnerHeightInRem = window.innerHeight * 0.0625;
  const treeitemsPerPage = Math.floor( (windowInnerHeightInRem - treeContainerPartsHeight) / ROW_HEIGHT) - 1;
  return (
    <div style={{ width: '33vw', height: '100vh', padding: '.5rem', boxSizing: 'border-box' }}>
      <TreeContainer
        style={{ width: '100%', height: '100%', minHeight: '100%', overflow: 'hidden' }}
      >
        <Tree
          id="ccfk-tree-id"
          aria-labelledby="ccfk-tree-label"
          listProps={{ ref: listRef, ulProps: { role: "group" }, style: {height: '100%', maxHeight: `calc(100vh - ${treeContainerPartsHeightInRem})` }}}
          dnd={false}
          dndCallback={()=>{}}
          itemsPerPage={treeitemsPerPage}
        >
          {renderTreeData(treeData)}
        </Tree>
      </TreeContainer>
    </div>
  );
};
TreeCCFK.propTypes = {
  useFilter: PropTypes.bool,
  allowDuplicateTreeItemNames: PropTypes.bool
};
TreeCCFK.defaultProps = {
  useFilter: true,
  allowDuplicateTreeItemNames: true
};
export default TreeCCFK;
