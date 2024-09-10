import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import AddIcon from '@nokia-csf-uxr/ccfk-assets/legacy/AddIcon';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import ChevronLeftIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ChevronLeftIcon';
import '../../styles/messageFilter/MFIndComponent.css'
import {deleteMessageFilter,setFilterName,addNewCriteriaObject,addNewActionObject} from '../../actions/messagefilter'
import { v4 as uuidv4 } from 'uuid';
import CriteriaList from "./criteriaList";
import ActionList from './actionList'
import ArrowGroup from './arrowGroup'
  
class MFIndComponent extends Component{
    
    deleteMessageFilter=()=>{
        this.props.deleteMessageFilter(this.props.filterId)
    }

    handleFilterNameChange=(value)=>{
        this.props.setFilterName(this.props.filterId,value)
    }

    addNewCriteria=()=>{
        const NewCriteriaObj={
            "context": "",
            "name": "",
            "parameterNamesAndValues": {},
            "operator": "PRESENT",
            "values": [],
            "isOpen": false,
            "id": uuidv4()
          }
        this.props.addNewCriteriaObject(this.props.filterId,NewCriteriaObj)
    }

    addNewAction=()=>{
        const NewActionObject={
            "context": "",
            "name": "",
            "parameterNamesAndValues": {},
            "isOpen": false,
            "id": uuidv4()
        }
        this.props.addNewActionObject(this.props.filterId,NewActionObject)
    }

    render(){
        const {togglePanel,name,isOpen,filterId,MessageFiltersList}=this.props
        return(
        <div className="MfIndComponentContainer">
          <div data-type="clickable" role="button" className="toggle-bar" onClick={togglePanel} tabIndex="0" onKeyDown={togglePanel} aria-expanded="true">
          <div className="MFNameChevronGroup">
            <div className={`chevron-indicator${isOpen?"-open":""}`}>
                <ChevronLeftIcon color="#737373" size="24px" />
            </div>
            <div className="MFName Required">
                <TextInputCCFK
                    id={`MFName${filterId}`}
                    required={false}
                    label=""
                    value={name}
                    disabled={this.props.dialogType==="view"}
                    placeholder=""
                    style={{backgroundColor:"white"}}
                    onChange={this.handleFilterNameChange}
                />
            </div>
          </div>
          <div className="MF-Button-Group">
            <ArrowGroup listOfItems={MessageFiltersList} itemId={filterId} filterId={filterId} listType="filters"/>
            <IconButtonCCFK 
                disabled={this.props.dialogType==="view"}
                onClick={this.deleteMessageFilter}>
                <DeleteIcon/>
            </IconButtonCCFK>
          </div>
          </div>
          {isOpen?<div className="expanded-panel">
            <div className="criteriaDiv">
                <div className="criteriaGroup">
                    <p className="criteriaText">Criteria</p>
                    <ButtonCCFK text="ADD CRITERIA" 
                    disabled={this.props.dialogType==="view"}
                    iconDirection="left" Icon={<AddIcon color="#ffffff"/>} onClick={this.addNewCriteria} variant="call-to-action"/>
                </div>
                <CriteriaList filterId={filterId}/>
            </div>
            <div className="actionDiv">
                <div className="actionGroup">
                    <p className="actionText Required">Action</p>
                    <ButtonCCFK text="ADD ACTION" 
                    disabled={this.props.dialogType==="view"}
                    iconDirection="left" Icon={<AddIcon color="#ffffff"/>} onClick={this.addNewAction} variant="call-to-action"/>

                </div>
                <ActionList filterId={filterId}/>
            </div>
          </div>:null}
        </div>
            
        )
    }
}






function mapStateToProps(state) {
    return{
        MessageFiltersList:state.mfnewEditDialog.currentTracingConfig.filterGroup.filters,
        dialogType:state.mfnewEditDialog.dialogType
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        deleteMessageFilter,
        setFilterName,
        addNewCriteriaObject,
        addNewActionObject
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(MFIndComponent);