import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import IconButton from '@nokia-csf-uxr/ccfk/IconButton';
import {setImportDialog} from '../actions/rulesengine/index';
import {setStatImportDialog} from '../actions/staticProfile/index';
import Tooltip from "@nokia-csf-uxr/ccfk/Tooltip";
import ImportIcon from '@nokia-csf-uxr/ccfk-assets/latest/ImportIcon';



let srv;
class IMPORT extends Component
{
    onImport(){
        switch (this.props.formName) {
            case 'RSV':
                this.props.setImportDialog(true);
                break;
            case 'STATPROF':
                this.props.setStatImportDialog(true);
                break;
            default:
                this.props.setImportDialog(true);
                break;
        }
    }
    
    

    render(){
        return(
            <Tooltip key="export" closeOnOutOfBoundaries={false} placement="top" modifiers={{ offset: { offset: "[0, 10]" } }} trigger="hover"
                tooltip="Import">
            <IconButton 
            size="large"
            onClick={() => this.onImport()} >
                            <ImportIcon/>
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
        setImportDialog,
        setStatImportDialog
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(IMPORT);
