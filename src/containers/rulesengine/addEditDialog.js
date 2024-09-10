import React, {Component} from 'react';
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import SplitScreenCCFK from '../../ccfk-components/SplitScreenCCFK';
import {bindActionCreators} from "redux";
import RsvNameState from "./RsvNameState"
import RuleTriggerForm from "./RuleTriggerForm"
import {ActivateState,InActivateState,setnewgroup,reOrderRuleGroup} from "../../actions/rulesengine/commonServices";
import RuleGraphRowFromState from "./RuleGraphRowFromState";
import RuleGroupRulesForm from "./RuleGroupRulesForm"
import RuleTagListComponent from "./RuleTagListComponent"
import "../../styles/rulesEngine/addEditDialog.css";
import {RuleTriggerFormDisplayState, DeleteRulesDatagrid,setDialogState,RsvOnSaveBtnClick,addRSVstate,RuleGroupFormDisplayState,deleteRGalert} from "../../actions/rulesengine";
import RuleGraphRow from "./RuleGraphRow";
let _ = require('underscore');

let srv;
class AddEditDialog extends Component {

    constructor(props) {
        super(props);
        srv = this;
        srv.state={
            saveBtnState:true,
            pH:"",
            rsvStateChanged:false,
            currentRsvState:""
        }
    }

    componentWillMount() {
        switch (srv.props.dialogType){
            case ('new'):{
                srv.props.newDialogLabels();
                srv.props.saveBtnState(true);
                break;
            }
            case ('edit'):{
                srv.props.editDialogLabels();
                break;
            }
            default :{
                break;
            }
        }
        this.props.setnewgroup(false)
        this.props.deleteRGalert(false)
    }

    handlePhChange=(e)=>{
        srv.setState({pH:e})
    }

    componentDidMount(){
        srv.setState({currentRsvState:srv.props.rsvState})
    }

    handleRsvStateValue=(e)=>{
        srv.setState({rsvStateChanged:e});
    }

    handleRenderFooterButtonClick=(e)=>{
        if (e === "SAVE" && this.props.arrowGroupState ===  true) {
        let listofArray=[];
        !!this.props.RsvDataObj && this.props.RsvDataObj.map(element => {
            _.values(element)[0].map(e => {
                listofArray.push(e.name);
            })
        })
        srv.props.reOrderRuleGroup(listofArray,srv.props.rsvName);
        }
        srv.props.setDialogState(false);
        srv.props.RsvOnSaveBtnClick(false);
        srv.props.RuleGroupFormDisplayState(false);
        srv.props.RuleTriggerFormDisplayState(false);
        if(e==="CANCEL" &&this.props.rsvSaveState!==true&&srv.props.dialogTypeValue==="new"){
            srv.props.DeleteRulesDatagrid(srv.props.RuleIndexValue)
        }
    }
    saveBtnStateHandleFunction=(val)=>{
        srv.setState({saveBtnState:val})
    }

    RuleTagListComponentDisplayState=(RsvObjArray)=>{
        let Result=false
        !!RsvObjArray&&RsvObjArray.map(element=>{
            _.values(element)[0].map(e=>{
                 if(!_.isEmpty(e.rulePluginSequence)){
                    Result=true
                 }
                })
            })
        return Result
    }

    renderFooter=()=>{
        return <div className='rulesEngineFooter'>
            <ButtonCCFK text={srv.props.viewmode!==true?"CANCEL":"CLOSE"} onClick={()=>this.handleRenderFooterButtonClick("CANCEL")} />
            {srv.props.viewmode!==true?
            <ButtonCCFK variant="call-to-action" disabled={srv.props.dialogTypeValue==="edit"?false:srv.state.saveBtnState} text="SAVE" onClick={()=>{srv.handleRenderFooterButtonClick("SAVE");
                if(srv.props.rsvState==="ACTIVE"&&srv.props.dialogTypeValue==="edit"&&srv.state.rsvStateChanged){
                    srv.props.addRSVstate("INACTIVE")
                    let updatedRsvObj={}
                    updatedRsvObj.rsvName = srv.props.rsvName;
                    updatedRsvObj.state = srv.props.rsvState;
                    srv.props.InActivateState(srv.props.rsvName,updatedRsvObj)
                }else if(srv.props.rsvState==="INACTIVE"&&srv.props.dialogTypeValue==="edit"&&srv.state.rsvStateChanged){
                    srv.props.addRSVstate("ACTIVE")
                    let updatedRsvObj={}
                    updatedRsvObj.rsvName = srv.props.rsvName;
                    updatedRsvObj.state = srv.props.rsvState;
                    srv.props.ActivateState(srv.props.rsvName,updatedRsvObj)
                }}} />:null}
        </div>
    }
    returnLeftChildren=()=>{
        return (
                <div>
                    {!!this.props.RsvDataObj&&this.props.RsvDataObj.map((element,key)=>
                        <div className="profiletree profileBranchContainer profileBranchDotFull">
                            <RuleGraphRowFromState handlePhChange={srv.handlePhChange} key={_.uniqueId('graphRowFromState_')} RuleTagListDisplayState={this.RuleTagListComponentDisplayState(this.props.RsvDataObj)} element={element} index={key}/>
                        </div>
                    )}
                    {!srv.props.viewmode?<div className="profiletree profileBranchContainer profileBranchDotEnd">
                        <RuleGraphRow handlePhChange={srv.handlePhChange} PhVal={srv.state.pH}/>
                    </div>:<></>}
                </div>
        )
    }

    returnRightChildren=()=>{
        return (
            <div>
                {srv.props.RuleTriggerFormDisplayStateValue?<div><RuleTriggerForm handlePhChange={srv.handlePhChange} PhVal={srv.state.pH} savebtnstatehandlefunction={srv.saveBtnStateHandleFunction}/></div>:null}
                {srv.props.RuleGroupFormDisplayStateValue?<div><RuleGroupRulesForm rulegrouptabstate={srv.state}/></div>:null}
            </div>
        )
    }
    render() {
        if (!srv.props.renewEditDialog.recordData) {
            return <div></div>
        }else {
            return (
                <DialogCCFK
                    title={`${this.props.dialogType==="edit"?"Edit":"Add"} Rules Engine`}
                    onClose={()=>this.handleRenderFooterButtonClick("CANCEL")}
                    renderFooter={this.renderFooter}
                    dialogStyle={{
                        "content": {
                            "top":"1%",
                            "bottom":"1%",
                            "height": "98%",
                            "left": "1%",
                            "right": "1%",
                            "width": "98%"
                            }
                    }}
                    footerStyle={{"display":"flex","justifyContent":"center"}}
                    >                         
                    <RsvNameState currentRsvState={srv.state.currentRsvState} handleRsvStateValue={srv.handleRsvStateValue}/>
                    {this.RuleTagListComponentDisplayState(this.props.RsvDataObj)?<RuleTagListComponent/>:null}
		            {this.props.rsvSaveState?
                    <SplitScreenCCFK
                            leftChildren={this.returnLeftChildren()}
                            rightChildren={this.returnRightChildren()}
                            defaultSplitRatio={srv.props.defaultSplitRatio}
                            toggleScreen={true}
                            primaryPanel="left"
                        />
                        :null} 
                </DialogCCFK>
            )
        }
    }
}

function mapStateToProps(state) {
    return{
        renewEditDialog: state.renewEditDialog,
        recordData: state.recordData,
        rsvName: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].rsvName : "",
        rsvState: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].state :"",
        rsvSaveState: state.renewEditDialog.RsvSaveState,
        dialogTypeValue: state.renewEditDialog.dialogType,
        RuleIndexValue: state.renewEditDialog.RuleIndex,
        viewmode: state.renewEditDialog.viewMode,
        RsvDataObj: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].RsvData:[],
        RuleTriggerFormDisplayStateValue: state.renewEditDialog.RuleTriggerFormDisplayState,
        RuleGroupFormDisplayStateValue: state.renewEditDialog.RuleGroupFormDisplayState,
        ruleSetNames: (!!state.renewEditDialog.Rules&&!!state.renewEditDialog.Rules[0])?state.renewEditDialog.Rules[0].ruleSetNames:[],
        arrowGroupState: state.renewEditDialog.ArrowGroupState
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        addRSVstate,
        RuleTriggerFormDisplayState,
        RsvOnSaveBtnClick,
        RuleGroupFormDisplayState,
        ActivateState,
        DeleteRulesDatagrid,
        InActivateState,
        setnewgroup,
        reOrderRuleGroup,
        deleteRGalert


    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);