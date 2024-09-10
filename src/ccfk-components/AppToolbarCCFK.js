import React, { useEffect, useState } from "react"
import AppToolbar, {
    AppToolbarTitleContainer,
    AppToolbarTitle,
    AppToolbarContent,
    AppToolbarButtonRow 
} from '@nokia-csf-uxr/ccfk/AppToolbar';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import {SideDrawerButton} from '@nokia-csf-uxr/ccfk/SideDrawer'
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import VerticalDivider from '@nokia-csf-uxr/ccfk/VerticalDivider';

const verticalDividerEqualPadding = (
    <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
        < VerticalDivider style={{ height: '3rem' }} />
    </div>
);



export default function AppToolbarCCFK({title="title",onSideClick,onToggle,onClick}){

    const [value,toggleValue]=useState(false)
    const [sideToggle,setSideToggle]=useState(true)
    const SideDrawerButtonProps = {
        buttonProps: {
          onClick: () => {
            setSideToggle(!sideToggle);
          }
        }
      };
    useEffect(()=>{
        onSideClick(sideToggle)
    },[sideToggle])
    useEffect(()=>{
        onToggle(value)
    },[value])

    return (
            <AppToolbar >
                <div style={{marginLeft:"1.5%"}}>
                <SideDrawerButton {...SideDrawerButtonProps} />
                </div>
                <AppToolbarTitleContainer>
                    <AppToolbarTitle>{title}</AppToolbarTitle>
                </AppToolbarTitleContainer>
                <AppToolbarContent >
                    <AppToolbarButtonRow>
                        {verticalDividerEqualPadding}
                        <IconButton 
                        size="large"
                        onClick={() => onClick("Add")} >
                            <AddIcon />
                        </IconButton>
                    </AppToolbarButtonRow>
                </AppToolbarContent>
            </AppToolbar>
    )
}