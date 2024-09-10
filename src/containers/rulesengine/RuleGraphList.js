import React, {Component} from 'react';
import {connect} from 'react-redux';

import RuleGraphRow from "./RuleGraphRow";
import {bindActionCreators} from "redux";
import "../../styles/rulesEngine/RuleGraphList.css";

let srv;
class RuleGraphList extends Component {
constructor(props){
    super(props);
    srv=this;
}



    render(){
        let arr=srv.props.RsvObjectArr;
        return (
            <div>
                {!!arr&&arr.map((element,key)=>
                    <div className="profiletree profileBranchContainer profileBranchDotFull">
                        <RuleGraphRow/>
                    </div>
                )}

                <div className="profiletree profileBranchContainer profileBranchDotEnd">
                    <RuleGraphRow/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        RsvDataObj: (!!state.renewEditDialog.Rules)?state.renewEditDialog.Rules[0].RsvData:[],
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleGraphList);