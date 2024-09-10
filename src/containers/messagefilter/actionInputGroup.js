import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setFilterActionContext,setFilterActionName,updateparamNameAndValsForAction,updateErrorState,setType} from '../../actions/messagefilter'
import {setContextData} from '../../actions/messagefilter/commonServices'
import '../../styles/messageFilter/ActionInputGroup.css'
import {longestStringLengthInArray,datatypeValidationofTextInputs} from './helperFunctions'
let _ = require('underscore');

const data1 = ['EDR','HEP3']
const data2 = ['NONE','NRF','OAUTH','NRF AND OAUTH']
let Show = 'profileName'

class ActionInputGroup extends Component{
    
    constructor(props){
        super(props)
        const {filterId,actionId}=props
        this.state={
            show:[]
        }
        this.messageFilterIndex=props.MessageFiltersList.findIndex(item => item.id === filterId)
        this.actionIndex=props.MessageFiltersList[this.messageFilterIndex].filterActions.findIndex(item => item.id === actionId)
        this.messageFilterAction=props.MessageFiltersList[this.messageFilterIndex].filterActions[this.actionIndex]
    }


    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
            const {filterId,actionId}=nextProps
            this.messageFilterIndex=nextProps.MessageFiltersList.findIndex(item => item.id === filterId)
            this.actionIndex=nextProps.MessageFiltersList[this.messageFilterIndex].filterActions.findIndex(item => item.id === actionId)
            this.messageFilterAction=nextProps.MessageFiltersList[this.messageFilterIndex].filterActions[this.actionIndex]
          }
    }

    handleFilterActionContextSelectChange=(value)=>{
        if(!!value&&value!==this.messageFilterAction.context&&value!==null){
            this.props.setFilterActionContext(this.messageFilterIndex,this.actionIndex,value)
            this.props.setContextData(value)
        }
    }
    handleFilterActionNameSelectChange=(value)=>{
        
        if(!!value&&value!==this.messageFilterAction.name&&value!==null){
            if(value === 'MirrorMessage'){
                Show='profileName'
                this.props.setType(this.props.namemirror)
            }
            this.props.setFilterActionName(this.messageFilterIndex,this.actionIndex,value)
        }
    }
    returnActionsListForSelectedContext=()=>{
        let ContextActionsObject=!!this.props.contextDataList[this.messageFilterAction.context]&&this.props.contextDataList[this.messageFilterAction.context].actions
        return Object.keys(ContextActionsObject)
    }
    updateparamNameAndValsObjInAction=(value,attributeName,attributeType)=>{
        if(!!value){
            if(value === 'EDR'){
                        Show='profileName'
                        this.props.setType(this.props.nameEdr)
            }
            if(value === 'HEP3'){
                        Show='profileName'
                        this.props.setType(this.props.namehep3)
            }
            if(value === 'NONE'){
                        value = ""
            }
            if(value === 'NRF'){
                        value = "nnrf-disc"
            }
            if(value === 'OAUTH'){
                        value = "Oauth2"
            }
            if(value === 'NRF AND OAUTH'){
                        value = "Oauth2nnrf-disc"
            }

            if(datatypeValidationofTextInputs(value,attributeType)){
                if(!this.props.errorState.some(errObj => errObj.id === `${this.props.actionId}${attributeName}`)){
                    this.props.updateErrorState([...this.props.errorState,{"id":`${this.props.actionId}${attributeName}`}])
                }
            }else{
                let ModifiedErrorStateArray=this.props.errorState.filter(errObj=>errObj.id!==`${this.props.actionId}${attributeName}`)
                this.props.updateErrorState(ModifiedErrorStateArray)
            }
            this.props.updateparamNameAndValsForAction(this.messageFilterIndex,this.actionIndex,attributeName,value)
        
        }
    }
    
    render(){
        const {ContextActionsList,actionId}=this.props
        return(
            <div className="MFfilterActionGroup">
                <div style={{width:(4*longestStringLengthInArray(ContextActionsList)) + 150}}>
                    <SelectInputCCFK
                        label=""
                        data={ContextActionsList}
                        disabled={this.props.dialogType==="view"}
                        value={this.messageFilterAction.context}
                        onChange={this.handleFilterActionContextSelectChange}
                    />
                </div>
                <span className="actionDot">.</span>

                <div style={{width:(4*longestStringLengthInArray(this.returnActionsListForSelectedContext())) + 150}}>
                    <SelectInputCCFK
                        label=""
                        data={this.returnActionsListForSelectedContext()}
                        value={this.messageFilterAction.name}
                        disabled={this.props.dialogType==="view"}
                        onChange={this.handleFilterActionNameSelectChange}
                    />
                </div>
                {this.messageFilterAction.name!==""&&!_.isEmpty(this.props.contextDataList[this.messageFilterAction.context].actions[this.messageFilterAction.name]["parameterNamesAndTypes"])?
                <div className="paramNameAndValsInputGroup">
                    <span className="actionBracket">(</span>
                {this.props.contextDataList[this.messageFilterAction.context].actions[this.messageFilterAction.name]["parameterNamesAndTypes"].map(action=>{
                        if(action.type.constraints===null){
                        if(action.name !== "profileType" && action.name !== "profileName" && action.name !== "nrfMessageType" ){return <div key={`${action.name}${actionId}`} className="individualParamGroup">
                                <span>{`${action.name} = `}</span>
                                <TextInputCCFK
                                    id={`TextInputID${action.name}${actionId}`}
                                    label=""
                                    error={datatypeValidationofTextInputs(this.messageFilterAction.parameterNamesAndValues[action.name],action.type.javaType)}
                                    errorMsg="please provide Numeric values"
                                    disabled={this.props.dialogType==="view"}
                                    value={this.messageFilterAction.parameterNamesAndValues[action.name]}
                                    placeholder=""
                                    onChange={this.updateparamNameAndValsObjInAction}
                                    onChangeArgs={[action.name,action.type.javaType]}
                                />
                                </div>}
                        if(action.name === "nrfMessageType" ){return(
                            <div key={`${action.name}${actionId}`} className="individualParamGroup">
                            <span>{`${action.name} = `}</span>
                                <SelectInputCCFK
                                label=""
                                data={data2}
                                disabled={this.props.dialogType==="view"}
                                value={((this.props.dialogType==="view" || this.props.dialogType==="edit") && this.messageFilterAction.parameterNamesAndValues[action.name] === '' )?'NONE':(this.messageFilterAction.parameterNamesAndValues[action.name])}
                                onChange={this.updateparamNameAndValsObjInAction}
                                onChangeArgs={[action.name,action.type.javaType]}
                            />
                            </div>
                        )}
                        if(action.name === "profileType"){return(
                            <div key={`${action.name}${actionId}`} className="individualParamGroup">
                            <span>{`${action.name} = `}</span>
                                <SelectInputCCFK
                                label=""
                                data={data1}
                                disabled={this.props.dialogType==="view"}
                                value={this.messageFilterAction.parameterNamesAndValues[action.name]}
                                onChange={this.updateparamNameAndValsObjInAction}
                                onChangeArgs={[action.name,action.type.javaType]}
                            />
                            </div>
                        )}
                        if(action.name === "profileName"){return(
                            <div key={`${action.name}${actionId}`} className="individualParamGroup">
                            <span>{`${Show} = `}</span>
                            <SelectInputCCFK
                                label=""
                                data={this.props.option}
                                disabled={this.props.dialogType==="view"}
                                value={this.messageFilterAction.parameterNamesAndValues[action.name]}
                                onChange={this.updateparamNameAndValsObjInAction}
                                onChangeArgs={[action.name,action.type.javaType]}
                            />
                            </div>
                        )}
                        }else{
                            return <div key={`${action.name}${actionId}`} className="individualParamGroup">
                                <span>{`${action.name} = `}</span>
                                <SelectInputCCFK
                                    label=""
                                    data={action.type.constraints.validValues}
                                    disabled={this.props.dialogType==="view"}
                                    value={this.messageFilterAction.parameterNamesAndValues[action.name]}
                                    onChange={this.updateparamNameAndValsObjInAction}
                                    onChangeArgs={[action.name,action.type.javaType]}
                                />
                                </div>
                        }
                })}<span className="actionBracket">)</span></div>
                :null}
            </div>
            
        )
    }
}


function mapStateToProps(state) {
    return{
        ContextActionsList:state.mfnewEditDialog.listcontextsforactions,
        MessageFiltersList:state.mfnewEditDialog.currentTracingConfig.filterGroup.filters,
        errorState:state.mfnewEditDialog.errorState,
        contextDataList:state.mfnewEditDialog.contextDataList,
        nameEdr:state.mfnewEditDialog.name1,
        namehep3:state.mfnewEditDialog.name2,
        namemirror:state.mfnewEditDialog.name3,
        option:state.mfnewEditDialog.option,
        dialogType:state.mfnewEditDialog.dialogType
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setFilterActionContext,
        setContextData,
        setType,
        setFilterActionName,
        updateparamNameAndValsForAction,
        updateErrorState
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(ActionInputGroup);