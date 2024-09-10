import React, {Component} from 'react';
import {connect} from 'react-redux';
import {RuleTriggerFormDisplayState} from "../../actions/rulesengine";
import {bindActionCreators} from "redux";
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import EditIcon from '@nokia-csf-uxr/ccfk-assets/legacy/EditIcon';
import "../../styles/rulesEngine/RuleTrigger.css";
let _ = require('underscore');



let srv;
class RuleTriggerFromState extends Component {

    constructor(props) {
        super(props);
        srv = this;

    }


    drawProfileTrigger = (a) =>{
            return <div className = "baseProfileElement profileTrigger">{a}</div>
    }


    render(){

        return (
            <div>
                <div className = "profileLayoutContainer">
                    <div className = "baseProfileContainer profileTriggerContainer">
                        <div className = "baseProfileElement profileTriggerHeader">Trigger</div>
                        {srv.drawProfileTrigger(this.props.ruletrigger)}
                        <div style={{display:"flex",height:"30px"}} key={this.props.ruletrigger} >
                        <div style={{height:"13px",width:"13px",paddingLeft:"20px",marginTop:"1px"}}>  
                        <IconButtonCCFK  onClick={() => { srv.props.HandleEditTrigger(this.props.element,this.props.ruletrigger)}}  >
                            <EditIcon />
                        </IconButtonCCFK>  
                        </div>
                        <div style={{height:"13px",width:"13px",paddingLeft:"50px",marginTop:"1px"}}>  
                        <IconButtonCCFK  onClick={() => { srv.props.HandleDeleteTrigger(this.props.element,this.props.ruletrigger)}}  >
                            <DeleteIcon />
                        </IconButtonCCFK>                                                                
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        )

    }
}

function mapStateToProps(state) {
    return{
        ruleSetType:!!state.renewEditDialog.TemporaryRsvData&&state.renewEditDialog.TemporaryRsvData.ruleSetType,
        RuleTriggerFormDisplayStateValue: state.renewEditDialog.RuleTriggerFormDisplayState,




    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        RuleTriggerFormDisplayState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleTriggerFromState);