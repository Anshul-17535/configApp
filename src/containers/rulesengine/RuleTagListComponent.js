import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {RuleTagsColoursObj} from './RuleTagsColours'
import "../../styles/rulesEngine/RuleTagListComponent.css";

class RuleTagListComponent extends Component {

    render(){

        return (
            <div className="RuleTagList">
                 {!!this.props.RuleTagsArray&&this.props.RuleTagsArray.map(tag=>{ 
                     return <div> 
                        <div style={{height:"13px",width:"13px",backgroundColor:RuleTagsColoursObj[tag.trim()]}}></div>
                        <p style={{color:"black"}}>{`${tag}`}</p> 
                     </div>
                })}
            </div>
        )

    }
}

function mapStateToProps(state) {
    return{
        RuleTagsArray:state.renewEditDialog.RuleTags
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(RuleTagListComponent);