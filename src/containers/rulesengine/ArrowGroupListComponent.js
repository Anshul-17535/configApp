import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import "../../styles/rulesEngine/RuleTagListComponent.css";
import ArrowGroup from './arrowGroup'
let _ = require('underscore');

class ArrowGroupListComponent extends Component {
    render() {
        const { InnerIndex, objectKey, listofItems } = this.props;
        return (
            <div style={{ width: "max-content", display: "flex", flexDirection: "column" }}>
                <ArrowGroup
                    innerId={objectKey}
                    innerIndex={InnerIndex}
                    listOfItems={listofItems}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        RsvDataObj: (!!state.renewEditDialog.Rules) ? state.renewEditDialog.Rules[0].RsvData : [],
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ArrowGroupListComponent);