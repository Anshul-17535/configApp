import React, { useState, createRef, useEffect } from 'react';
// Legacy theme icons
import ChevronDownIconLatest from "@nokia-csf-uxr/ccfk-assets/legacy/ChevronDownIcon";
import FolderIcon from "@nokia-csf-uxr/ccfk-assets/legacy/FolderIcon.js"
import FileIcon from "@nokia-csf-uxr/ccfk-assets/legacy/FileIcon.js"
import ChevronUpIconLatest from "@nokia-csf-uxr/ccfk-assets/legacy/ChevronUpIcon";
import { getContext } from '@nokia-csf-uxr/ccfk/common/index.js';
import splitScreenData from "../actions/splitScreenData.json";
import SideDrawer from '@nokia-csf-uxr/ccfk/SideDrawer';
import ListSheetIcon from '@nokia-csf-uxr/ccfk-assets/latest/ListSheetIcon';
import CpuVirtualIcon from '@nokia-csf-uxr/ccfk-assets/latest/CpuVirtualIcon';
import TraceIcon from '@nokia-csf-uxr/ccfk-assets/latest/TraceIcon';
import FanIcon from '@nokia-csf-uxr/ccfk-assets/latest/FanIcon';
import UserLocationIcon from '@nokia-csf-uxr/ccfk-assets/latest/UserLocationIcon';
import DashboardIcon from '@nokia-csf-uxr/ccfk-assets/latest/DashboardIcon';
import AnomalyIcon from '@nokia-csf-uxr/ccfk-assets/latest/AnomalyIcon';
import BackhaulNodeIcon from '@nokia-csf-uxr/ccfk-assets/latest/BackhaulNodeIcon';

import {
  SideDrawerList,
  SideDrawerItem
} from '@nokia-csf-uxr/ccfk/SideDrawer';

import KEY_CODES from '@nokia-csf-uxr/ccfk/common/KeyCodes';

const CompactSideBarCCFK = (props) => {
  
  const { listVariant, isLegacy } = props;
  const isValidKey = event => (event.key === KEY_CODES.ENTER_KEY || event.key === KEY_CODES.SPACE_KEY);
  const sideDrawerRef = createRef(null);
  const SideDrawerButtonRef = createRef(null);
  const [selectedSubIndex, setSelectedSubIndex] = useState(-1);

  const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);
  const [subMenuOneBadge, setSubMenuOneBadge] = useState(1);
  const [subMenuTwoBadge, setSubMenuTwoBadge] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openedGroupIndex, setOpenedGroupIndex] = useState(props.indexRecieved);
  const NONE_SELECTED_INDEX = -1;
  
  const isRTL = getContext(({ RTL }) => {
    return RTL;
  })

  useEffect(()=>{
    setIsSideDrawerVisible(props.sideProp)
  },[props.sideProp])

  const handleItemClick = (index, subIndex) => {
    setSelectedIndex(index);
    setSelectedSubIndex(subIndex);
  };

  const itemProps = (index, subIndex,cIndex, route, formName, id) => {
    const selected = (props.nodeRecieved === id)
    return {
      onKeyPress: (event) => {
        if (isValidKey(event)) {
          event.preventDefault();
          handleItemClick(index, subIndex);
        }
      },
      onClick: () => {
        handleItemClick(index, subIndex);
        props.routeClick(id,cIndex);
      },
      selected,
    };
  };
  const groupHeaderProps = (index) => ({
    onClick: () => {
      openedGroupIndex === index
        ? setOpenedGroupIndex(NONE_SELECTED_INDEX)
        : setOpenedGroupIndex(index);
    },
    expandableHeaderIndicator:
    openedGroupIndex === index ? (
        isSideDrawerVisible ? (
          <ChevronUpIconLatest />
        ) : (
          ""
        )
      ) : isSideDrawerVisible ? (
        <ChevronDownIconLatest />
      ) : (
        ""
      ),
    isOpen: openedGroupIndex === index,
  });
  const SideDrawerProps = {
    modalMaskProps: { onClick:() => { setIsSideDrawerVisible(false); } },
    trapFocus: false,
    visible: isSideDrawerVisible,
    variant: 'compact',
    onMouseEnter: () => {
      setIsSideDrawerVisible(true);
    },
    onMouseLeave: () => {
      setIsSideDrawerVisible(false);
    }
  };

  const iconCheck = (value) =>{
    switch (value) {
      case "File":
            return (
              <FileIcon/>
            )
      case "Folder":
            return (
              <FolderIcon/>
            )
      case "RuleIcon":
            return (
              <ListSheetIcon/>
            )
      case "TraceIcon":
            return (
              <TraceIcon/>
            )
      case "nrfpRule":
            return(
              <ListSheetIcon/>
            )
      case "throttling":
            return(
              <FanIcon/>
            )
      case "slf":
            return(
              <UserLocationIcon/>
            )
      case "mediation":
            return(
              <DashboardIcon/>
            )   
      case "probStat":
            return(
              <AnomalyIcon/>
            ) 
      case "staticProfile":
            return(
              <BackhaulNodeIcon/>
            )
      default:
        break;
    }
  }

  const renderSideBar = () => {
    return splitScreenData.MenuItems.map((menu, index) => (
          <div key={index} style={{marginBottom:"7%"}}>
            <SideDrawerItem
              icon={iconCheck(menu.icon)}
              key={index}
              label={menu.label}
              {...(menu.expand
                ? groupHeaderProps(index)
                : itemProps(index, -1,0, menu.state, menu.label, menu.id))}
            />
            {(openedGroupIndex === index) &&
              menu.subMenus &&
              menu.subMenus.map((subMenu, subIndex) => {
                const componentRoute = `${menu.state}${subMenu.route}`;
                return (
                  <SideDrawerItem
                    icon={iconCheck(subMenu.icon)}
                    key={subIndex}
                    label={subMenu.label}
                    {...itemProps(index, subIndex,subMenu.carriedIndex, componentRoute,subMenu.label, subMenu.id)}
                  />
                );
              })}
          </div>
        ));
  };

  
  return (
        <SideDrawer {...SideDrawerProps}>
        <div style={isSideDrawerVisible?{overflowY:'auto',marginBottom:'3rem'}:{overflowY:'hidden'}}>
            <SideDrawerList variant={listVariant}>
            {renderSideBar()}
            </SideDrawerList>
          </div>
        </SideDrawer>
  );
}
export default CompactSideBarCCFK;