import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import FolderOpenIcon from '@nokia-csf-uxr/ccfk-assets/legacy/FolderOpenIcon';
import FolderIcon from '@nokia-csf-uxr/ccfk-assets/legacy/FolderIcon';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import MFList from './MFList'
import '../../styles/messageFilter/MFGroup.css'
import {AddNewMessageFilter,ExpandAll,CloseAll} from "../../actions/messagefilter";
import { v4 as uuidv4 } from 'uuid';



class MFGroup extends Component{

    AddNewMessageFilter=()=>{
        let NewMessageFilterObject={  
            "name": "",
            "filterActions": [
            ],
            "filterCriteria": [
            ],
            "isOpen": false,
            "id": uuidv4()
        }
        this.props.AddNewMessageFilter(NewMessageFilterObject)
    }

    componentWillMount=()=>{
        if(this.props.dialogType === 'view' ){
            this.props.ExpandAll()
        }
    }

    onExpandAll=()=>{
        this.props.ExpandAll()
    }

    onCloseAll=()=>{
        this.props.CloseAll()
    }

    render(){
        return(
            <div className="MFGroup">
                <div className="ExpandAllCloseAll">
                    <div onClick={this.onExpandAll} className="expandIconGroup">
                        <FolderOpenIcon/>
                        <p>Expand All</p>
                    </div>
                    <div onClick={this.onCloseAll} className="closeIconGroup">
                        <FolderIcon/>
                        <p>Close All</p>
                    </div>
                </div>
                <MFList/>
                <ButtonCCFK text="ADD MESSAGE FILTER"
                disabled = {this.props.dialogType === 'view'}
                iconDirection="left" Icon={<AddIcon color="#ffffff"/>} onClick={this.AddNewMessageFilter} variant="call-to-action"/>
            </div>
            
        )
    }
}






function mapStateToProps(state) {
    return{
        dialogType:state.mfnewEditDialog.dialogType
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        AddNewMessageFilter,
        ExpandAll,
        CloseAll
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(MFGroup);