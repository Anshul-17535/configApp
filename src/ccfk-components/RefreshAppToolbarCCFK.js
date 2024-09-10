import React, { useEffect, useState } from "react"
import AppToolbar, {
    AppToolbarTitleContainer,
    AppToolbarTitle,
    AppToolbarContent,
    AppToolbarButtonRow 
} from '@nokia-csf-uxr/ccfk/AppToolbar';
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import VerticalDivider from '@nokia-csf-uxr/ccfk/VerticalDivider';
import ModuleIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ModuleIcon';
import Tooltip from '@nokia-csf-uxr/ccfk/Tooltip';
import RefreshButtonCCFK from "./RefreshButtonCCFK";

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

const TOOLTIP_PROPS_REFRESH = {
    placement: 'bottom',
    trigger: ['hover', 'focus'],
    modifiers: { offset: { offset: '0, 10' } },
    tooltip: 'Refresh',
  };

export default function RefreshAppToolbarCCFK({title="title",onToggle,onClick}){

    const [value,toggleValue]=useState(false)

    useEffect(()=>{
        onToggle(value)
    },[value])

    return (
            <AppToolbar >
                <AppToolbarTitleContainer>
                    <AppToolbarTitle>{title}</AppToolbarTitle>
                </AppToolbarTitleContainer>
                <AppToolbarContent >
                    <AppToolbarButtonRow>
                        {verticalDividerEqualPadding}
                        <Tooltip {...TOOLTIP_PROPS_REFRESH} >
                        <RefreshButtonCCFK onClick={()=> onClick()}/>
                        </Tooltip>
                    </AppToolbarButtonRow>
                </AppToolbarContent>
            </AppToolbar>
    )
}