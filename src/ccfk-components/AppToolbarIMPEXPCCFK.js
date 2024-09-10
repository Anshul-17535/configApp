import React, { useEffect, useState, createRef } from "react"
import AppToolbar, {
    AppToolbarTitleContainer,
    AppToolbarTitle,
    AppToolbarContent,
    AppToolbarButtonRow 
} from '@nokia-csf-uxr/ccfk/AppToolbar';
import {SideDrawerButton} from '@nokia-csf-uxr/ccfk/SideDrawer'
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import VerticalDivider from '@nokia-csf-uxr/ccfk/VerticalDivider';
import EXPORT from './ExportALLCCFK';
import IMPORT from './ImportALLCCFK';
import { nfType } from "../containers/splitScreenForm";
import DeleteIcon from "@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon";
import Tooltip from '@nokia-csf-uxr/ccfk/Tooltip';


const verticalDividerEqualPadding = (
    <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
        < VerticalDivider style={{ height: '3rem' }} />
    </div>
);

const TOOLTIP_PROPS = {
    placement: 'bottom',
    trigger: ['hover', 'focus'],
    modifiers: { offset: { offset: '0, 10' } },
    tooltip: 'Toggle SplitScreen',
  };

  const TOOLTIP_PROPS_DELETE = {
    placement: 'bottom',
    trigger: ['hover', 'focus'],
    modifiers: { offset: { offset: '0, 10' } },
    tooltip: 'Delete',
  };




export default function AppToolbarIMPEXPCCFK({title="title",formName="RSV",onSideClick,onToggle,onClick,onDelete}){

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
                    {nfType==="nrfp"?false:<>
                        {verticalDividerEqualPadding}
                        <IMPORT formName={formName}/>
                        {verticalDividerEqualPadding}
                        <EXPORT formName={formName}/> </> }  
                        {formName==='STATPROF'?<>
                        {verticalDividerEqualPadding}
                        <Tooltip {...TOOLTIP_PROPS_DELETE}>
                            <IconButton onClick={()=>onDelete()} >
                                <DeleteIcon /> 
                            </IconButton>
                        </Tooltip></>:false}
                        {verticalDividerEqualPadding}
                        <IconButton onClick={() => onClick("Add")} >
                            <AddIcon />
                        </IconButton>
                    </AppToolbarButtonRow>
                </AppToolbarContent>
            </AppToolbar>
    )
}