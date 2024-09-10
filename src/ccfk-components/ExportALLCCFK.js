import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import { setExportAllDialog } from '../actions/rulesengine';
import {setExportStatAllDialog,handleStatNfTypeChange,typeChanged} from '../actions/staticProfile'
import {ExportAllData} from '../actions/rulesengine/commonServices';
import ExportAllIcon from '@nokia-csf-uxr/ccfk-assets/latest/ExportAllIcon';

let srv;
class EXPORT extends Component
{
    onExport(){
        switch (this.props.formName) {
            case 'RSV':
                this.props.ExportAllData();
                this.props.setExportAllDialog(true);
                break;

            case 'STATPROF':
                this.props.typeChanged(false)
                this.props.handleStatNfTypeChange('')
                this.props.setExportStatAllDialog(true)
		break;

            default:
                this.props.ExportAllData();
                this.props.setExportAllDialog(true);
                break;
        }
    }

    render(){
        return(
            <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Export All">
                <IconButton 
                size="large"
                onClick={() => this.onExport()} >
                        <ExportAllIcon />
            </IconButton> 
                </Tooltip>
            
    )}
}

function mapStateToProps(state) {
    return{
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setExportAllDialog,
        ExportAllData,
        setExportStatAllDialog,
        handleStatNfTypeChange,
        typeChanged
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(EXPORT);
