import React, { createRef, useEffect, useState } from "react";
import ChevronDownIconLatest from "@nokia-csf-uxr/ccfk-assets/legacy/ChevronDownIcon";
import FolderIcon from "@nokia-csf-uxr/ccfk-assets/legacy/FolderIcon.js"
import FileIcon from "@nokia-csf-uxr/ccfk-assets/legacy/FileIcon.js"
import ChevronUpIconLatest from "@nokia-csf-uxr/ccfk-assets/legacy/ChevronUpIcon";
import SideDrawer from "@nokia-csf-uxr/ccfk/SideDrawer";
import KEY_CODES from "@nokia-csf-uxr/ccfk/common/KeyCodes";
import splitScreenData from "../actions/splitScreenData.json";

import { SideDrawerList, SideDrawerItem } from "@nokia-csf-uxr/ccfk/SideDrawer";

const SideBar = ({TreeData,indexRecieved,nodeRecieved,routeClick}) => {
  const [isSideDrawerVisible, setIsSideBarVisible] = useState(true)
  const [selectedSubIndex, setSelectedSubIndex] = useState(-1);
  const isValidKey = (event) =>
    event.key === KEY_CODES.ENTER_KEY || event.key === KEY_CODES.SPACE_KEY;
  const SideDrawerButtonRef = createRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const NONE_SELECTED_INDEX = -1;
  const [openedGroupIndex, setOpenedGroupIndex] = useState(indexRecieved);


  /**
   * Renders Sidebar items described in SideDrawerList
   *
   * @param {*} selectedTab
   * @returns
   */
  const renderSideBar = () => {
    return splitScreenData.MenuItems.map((menu, index) => (
          <div key={index} style={{marginBottom:"7%"}}>
            <SideDrawerItem
              icon={menu.icon==="File"? <FileIcon/>:<FolderIcon/>}
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
                    icon={subMenu.icon==="File"?<FileIcon/>:<FolderIcon/>}
                    key={subIndex}
                    label={subMenu.label}
                    {...itemProps(index, subIndex,subMenu.carriedIndex, componentRoute,subMenu.label, subMenu.id)}
                  />
                );
              })}
          </div>
        ));
  };


  /**
   * Handles & set Expandable Sections like Arrow down/up when clicked
   *
   * @param {*} index
   * @returns
   */
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
  /**
   * Handles the behaviour of SideDrawer like Collapse behaviour, variant (compact)
   */
  const SideDrawerProps = {
    modalMaskProps: {
      onClick: () => {
        setIsSideBarVisible(false);
      },
    },
    trapFocus: false,
    onKeyDown: (event) => {
      // closes the SideDrawerButton when ESC is pressed
      event.key === KEY_CODES.ESCAPE && setIsSideBarVisible(false);
      // focus on SideDrawerButton when ESC is pressed
      event.key === KEY_CODES.ESCAPE && SideDrawerButtonRef.current.focus();
    },
    visible: true,
    variant: "compact",
  };
  /**
   * Handles the behaviour of Side bar Item, for Ex. Set the current selected form, and sets the index
   *
   * @param {*} index
   * @param {*} subIndex
   * @returns Object
   */
  const itemProps = (index, subIndex,cIndex, route, formName, id) => {
    const selected = (nodeRecieved === id)
    return {
      onKeyPress: (event) => {
        if (isValidKey(event)) {
          event.preventDefault();
          handleItemClick(index, subIndex);
        }
      },
      onClick: () => {
        handleItemClick(index, subIndex);
        routeClick(id,cIndex);
      },
      selected,
    };
  };

  /**
   * Handles the click event when any form is clicked
   *
   * @param {*} index
   * @param {*} subIndex
   */
  const handleItemClick = (index, subIndex) => {
    setSelectedIndex(index);
    setSelectedSubIndex(subIndex);
  };


  return (
<div>
      <SideDrawer {...SideDrawerProps} style={{width: "100%",marginBottom: "20%"}}>
      
        <SideDrawerList >
          {renderSideBar()}
        </SideDrawerList>
    </SideDrawer>
    </div>
  );
};

export default SideBar;
