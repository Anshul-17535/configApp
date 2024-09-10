import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import ChipsInputCCFK from '../../ccfk-components/ChipsInputCCFK';
import {setFilterCriteriaContext,setFilterCriteriaName,setFilterCriteriaOperator,setFilterCriteriaValuesArray,updateparamNameAndValsForCriteria,updateErrorState} from '../../actions/throttling'
import {setContextData} from '../../actions/throttling/commonServices'
import '../../styles/throttling/CriteriaInputGroup.css'
import {longestStringLengthInArray,datatypeValidationOfListOfValues,datatypeValidationofTextInputs} from './helperFunctions'
let _ = require('underscore');


  
class CriteriaInputGroup extends Component{
    
    constructor(props){
        super(props)
        const {filterId,criteriaId}=props
        this.messageFilterIndex=props.MessageFiltersList.findIndex(item => item.id === filterId)
        this.criteriaIndex=props.MessageFiltersList[this.messageFilterIndex].filterCriteria.findIndex(item => item.id === criteriaId)
        this.messageFilterCriteria=props.MessageFiltersList[this.messageFilterIndex].filterCriteria[this.criteriaIndex]
    }

    componentWillReceiveProps(nextProps){
        if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
             this.data = nextProps.receivedData;
             const {filterId,criteriaId}=nextProps
            this.messageFilterIndex=nextProps.MessageFiltersList.findIndex(item => item.id === filterId)
            this.criteriaIndex=nextProps.MessageFiltersList[this.messageFilterIndex].filterCriteria.findIndex(item => item.id === criteriaId)
            this.messageFilterCriteria=nextProps.MessageFiltersList[this.messageFilterIndex].filterCriteria[this.criteriaIndex]
        }
    }

    handleFilterCriteriaContextSelectChange=(value)=>{
        if(!!value&&value!==this.messageFilterCriteria.context&&value!==null){
            this.props.setFilterCriteriaContext(this.messageFilterIndex,this.criteriaIndex,value)
            this.props.setContextData(value)
        }
    }
    handleFilterCriteriaNameSelectChange=(value)=>{
        if(!!value&&value!==this.messageFilterCriteria.name&&value!==null){
            this.props.setFilterCriteriaName(this.messageFilterIndex,this.criteriaIndex,value)
        }
    }
    returnAttributesListForSelectedContext=()=>{
        let ContextAttributesObject=!!this.props.contextDataList[this.messageFilterCriteria.context]&&this.props.contextDataList[this.messageFilterCriteria.context]["attributes"]
        return Object.keys(ContextAttributesObject)
    }

    returnOperatorList=()=>{
        let FilterCriteria=this.messageFilterCriteria
        let FilterCriteriaName=FilterCriteria.name
        if(!!this.props.contextDataList[this.messageFilterCriteria.context]&&Object.keys(this.props.contextDataList[this.messageFilterCriteria.context]["attributes"]).length!==0&&FilterCriteriaName!==""){
            return this.props.contextDataList[this.messageFilterCriteria.context]["attributes"][FilterCriteriaName]["type"]["supportedOperators"]
        }
        return ["PRESENT"]
    }
    handleFilterCriteriaOperatorSelectChange=(value)=>{
        if(!!value){
            this.props.setFilterCriteriaOperator(this.messageFilterIndex,this.criteriaIndex,value)
        }
    }
    isOperatorEqualsPresentOrNotPresent=()=>{
        let FilterCriteriaOperator=this.messageFilterCriteria.operator
        return FilterCriteriaOperator==="PRESENT"||FilterCriteriaOperator==="NOT_PRESENT"
    }
    handleChipsUpdate=(data)=>{
        let attributeType=this.props.contextDataList[this.messageFilterCriteria.context]["attributes"][this.messageFilterCriteria.name].type.javaType
        if(datatypeValidationOfListOfValues(data,attributeType)){
            if(!this.props.errorState.some(errObj => errObj.id === `${this.props.criteriaId}Values`)){
                this.props.updateErrorState([...this.props.errorState,{"id":`${this.props.criteriaId}Values`}])
            }
        }else{
            let ModifiedErrorStateArray=this.props.errorState.filter(errObj=>errObj.id!==`${this.props.criteriaId}Values`)
            this.props.updateErrorState(ModifiedErrorStateArray)
        }
        this.props.setFilterCriteriaValuesArray(this.messageFilterIndex,this.criteriaIndex,data) 
    }
    updateparamNameAndValsObjInCriteria=(value,attributeName,attributeType)=>{
        if(datatypeValidationofTextInputs(value,attributeType)){
            if(!this.props.errorState.some(errObj => errObj.id === `${this.props.criteriaId}${attributeName}`)){
                this.props.updateErrorState([...this.props.errorState,{"id":`${this.props.criteriaId}${attributeName}`}])
            }
        }else{
            let ModifiedErrorStateArray=this.props.errorState.filter(errObj=>errObj.id!==`${this.props.criteriaId}${attributeName}`)
            this.props.updateErrorState(ModifiedErrorStateArray)
        }
        this.props.updateparamNameAndValsForCriteria(this.messageFilterIndex,this.criteriaIndex,attributeName,value)
    }
    
    render(){
        const {ContextAttributesList,criteriaId}=this.props
        return(
            <div className="MFfilterCriteriaGroup">
                <div style={{width:(4*longestStringLengthInArray(ContextAttributesList)) + 150}}>
                    <SelectInputCCFK
                        label=""
                        data={ContextAttributesList}
                        value={this.messageFilterCriteria.context}
                        onChange={this.handleFilterCriteriaContextSelectChange}
                    />
                </div>
                <span className="criteriaDot">.</span>
                <div style={{width:(4*longestStringLengthInArray(this.returnAttributesListForSelectedContext())) + 150}}>
                    <SelectInputCCFK
                        label=""
                        data={this.returnAttributesListForSelectedContext()}
                        value={this.messageFilterCriteria.name}
                        onChange={this.handleFilterCriteriaNameSelectChange}
                    />
                </div>
                {this.messageFilterCriteria.name!==""&&!_.isEmpty(this.props.contextDataList[this.messageFilterCriteria.context]["attributes"][this.messageFilterCriteria.name]["parameterNamesAndTypes"])?
                <div className="paramNameAndValsInputGroup">
                    <span className="criteriaBracket">(</span>
                {this.props.contextDataList[this.messageFilterCriteria.context]["attributes"][this.messageFilterCriteria.name]["parameterNamesAndTypes"].map(attribute=>{
                        return <div key={`TextInputID${attribute.name}${criteriaId}`} className="individualParamGroup">
                                <span>{`${attribute.name} = `}</span>
                                <TextInputCCFK
                                    id={`TextInputID${attribute.name}${criteriaId}`}
                                    label=""
                                    error={datatypeValidationofTextInputs(this.messageFilterCriteria.parameterNamesAndValues[attribute.name],attribute.type.javaType)}
                                    errorMsg="please provide numeric values"
                                    value={this.messageFilterCriteria.parameterNamesAndValues[attribute.name]}
                                    placeholder=""
                                    onChange={this.updateparamNameAndValsObjInCriteria}
                                    onChangeArgs={[attribute.name,attribute.type.javaType]}
                                />
                                </div>
                })}<span className="criteriaBracket">)</span></div>
                :null}
                <div style={{width:(4*longestStringLengthInArray(this.returnOperatorList())) + 150}}>

                    <SelectInputCCFK
                        label=""
                        data={this.returnOperatorList()}
                        value={this.messageFilterCriteria.operator}
                        onChange={this.handleFilterCriteriaOperatorSelectChange}
                    />
                </div>
                {!this.isOperatorEqualsPresentOrNotPresent()?
                <div className="multipleValuesGroup">
                        <ChipsInputCCFK
                            placeHolder="Values"
                            style={{margin:0,width:"98.5%",maxWidth:"98.5%",paddingRight:"12px"}}
                            onChange={this.handleChipsUpdate}
                            size="medium"
                            ErrConditionRegex={_.last(this.props.contextDataList[this.messageFilterCriteria.context]["attributes"][this.messageFilterCriteria.name].type.javaType.split("."))==="Integer"?/^\d+$/:""}
                            ErrorMsg={_.last(this.props.contextDataList[this.messageFilterCriteria.context]["attributes"][this.messageFilterCriteria.name].type.javaType.split("."))==="Integer"?"Duplicate or Non Numeric Values":"Duplicate Values Found"}
                            value={this.messageFilterCriteria.values}
                        />
                    </div>:null}
            </div>
            
        )
    }
}


function mapStateToProps(state) {
    return{
        ContextAttributesList:state.thnewEditDialog.listcontextsforattrs,
        MessageFiltersList:state.thnewEditDialog.currentTracingConfig.filterGroup.filters,
        errorState:state.thnewEditDialog.errorState,
        contextDataList:state.thnewEditDialog.contextDataList
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setFilterCriteriaContext,
        setContextData,
        setFilterCriteriaName,
        setFilterCriteriaOperator,
        setFilterCriteriaValuesArray,
        updateparamNameAndValsForCriteria,
        updateErrorState
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(CriteriaInputGroup);