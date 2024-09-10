import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setFilterActionContext,setFilterActionName,updateparamNameAndValsForAction,updateErrorState} from '../../actions/throttling'
import {setContextData} from '../../actions/throttling/commonServices'
import '../../styles/throttling/ActionInputGroup.css'
import {longestStringLengthInArray,datatypeValidationofTextInputs} from './helperFunctions'
let _ = require('underscore');


  
class ActionInputGroup extends Component{
    
    constructor(props){
        super(props)
        const {filterId,actionId}=props
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
            this.props.setFilterActionName(this.messageFilterIndex,this.actionIndex,value)
        }
    }
    returnActionsListForSelectedContext=()=>{
        let ContextActionsObject=!!this.props.contextDataList[this.messageFilterAction.context]&&this.props.contextDataList[this.messageFilterAction.context].actions
        if(!!this.props.contextDataList[this.messageFilterAction.context]&&this.props.contextDataList[this.messageFilterAction.context].name==="HttpRequest")
        {
            let sendCopy = Object.keys(ContextActionsObject)
            let send=sendCopy.filter(value=> (value==='Reject-Request'||value==='Reject-With-Percentage'||value==='Respond-Request'))
            return send
        }
        return Object.keys(ContextActionsObject)
    }
    updateparamNameAndValsObjInAction=(value,attributeName,attributeType)=>{
        if(!!value){
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
                        onChange={this.handleFilterActionNameSelectChange}
                    />
                </div>
                {this.messageFilterAction.name!==""&&!_.isEmpty(this.props.contextDataList[this.messageFilterAction.context].actions[this.messageFilterAction.name]["parameterNamesAndTypes"])?
                <div className="paramNameAndValsInputGroup">
                    <span className="actionBracket">(</span>
                {this.props.contextDataList[this.messageFilterAction.context].actions[this.messageFilterAction.name]["parameterNamesAndTypes"].map(action=>{
                        if(action.type.constraints===null){
                        return <div key={`${action.name}${actionId}`} className="individualParamGroup">
                                <span>{`${action.name} = `}</span>
                                <TextInputCCFK
                                    id={`TextInputID${action.name}${actionId}`}
                                    label=""
                                    error={datatypeValidationofTextInputs(this.messageFilterAction.parameterNamesAndValues[action.name],action.type.javaType)}
                                    errorMsg="please provide Numeric values"
                                    value={this.messageFilterAction.parameterNamesAndValues[action.name]}
                                    placeholder=""
                                    onChange={this.updateparamNameAndValsObjInAction}
                                    onChangeArgs={[action.name,action.type.javaType]}
                                />
                                </div>
                        }else{
                            return <div key={`${action.name}${actionId}`} className="individualParamGroup">
                                <span>{`${action.name} = `}</span>
                                <SelectInputCCFK
                                    label=""
                                    data={action.type.constraints.validValues}
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
        ContextActionsList:state.thnewEditDialog.listcontextsforactions,
        MessageFiltersList:state.thnewEditDialog.currentTracingConfig.filterGroup.filters,
        errorState:state.thnewEditDialog.errorState,
        contextDataList:state.thnewEditDialog.contextDataList
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setFilterActionContext,
        setContextData,
        setFilterActionName,
        updateparamNameAndValsForAction,
        updateErrorState
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(ActionInputGroup);