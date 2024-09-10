import React, { useEffect, useState } from "react";
import Tabs, { Tab, TabsContent } from "@nokia-csf-uxr/ccfk/Tabs";

const TabPanel = ({ index, selected, children, ...otherProps }) => (
    <div hidden={index !== selected} {...otherProps}>
      {children}
    </div>
  );

const TabGroupCCFK = ({tabsLabelArray=[],tabContentArray=[],tabsAlignment="left",tabsContentStyle={},selectedItem=0,onChange}) => {

    const [selectedTab,setSelectedTab]=useState(selectedItem)
    const clickHandler = selectedTab => () => {
        setSelectedTab(selectedTab);
      };
    
    useEffect(()=>{
        setSelectedTab(selectedItem)
    },[selectedItem])

    useEffect(()=>{
        onChange(selectedTab)
    },[selectedTab])

    return (
        <>
        <Tabs 
            alignment={tabsAlignment} 
            scroll={false}>
            {tabsLabelArray.map((tabLabelObj,Index)=>{
                return (
                    <Tab 
                    id={`tab-${Index}`}
                    key={`${tabLabelObj.label}_${Index}`} 
                    disabled={tabLabelObj.disabled} 
                    selected={selectedTab===Index} 
                    onSelect={clickHandler(Index)} 
                    role="option"
                    children= {tabLabelObj.label} 
                    />
                )
            })}
        </Tabs>
        <TabsContent selected={selectedTab}>
            {tabContentArray.map((tabContent,i)=>(
            <TabPanel
                id={`tab-content-${i}`}
                key={i}
                index={i}
                selected={selectedTab}
                children={tabContent} 
                role="tabpanel" 
                aria-labelledby={`tab-${i}`}
                aria-live="polite"
                aria-relevant="all"
            />
            ))}
        </TabsContent>
    </>
    );
};
export default TabGroupCCFK;