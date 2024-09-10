import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ArrowLineDownIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ArrowLineDownIcon';
import ArrowLineUpIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ArrowLineUpIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import { performListReOrder,ArrowGroupBtnClick } from '../../actions/rulesengine';
import _cloneDeep from 'lodash/cloneDeep';
let _ = require('underscore');

let srv;
class ArrowGroup extends Component {
  constructor(props) {
    super(props);
    srv = this;
    }
  upDownOperation = (operation) => {
  srv.props.ArrowGroupBtnClick(true); 
    const {
      listOfItems,innerIndex,
      innerId,RsvDataObjList
    } = this.props;
    switch (operation) {
      case 'up': {
        if (innerIndex > 0) {
          const updatedListUp = [...listOfItems];
          [updatedListUp[innerIndex], updatedListUp[innerIndex - 1]] = [updatedListUp[innerIndex - 1], updatedListUp[innerIndex]];
          const httpAnswerObj = RsvDataObjList.find(obj => obj.hasOwnProperty(innerId));
          if (httpAnswerObj) {
            httpAnswerObj[innerId] = updatedListUp;
          }
          this.props.performListReOrder(RsvDataObjList);
        }
        break;
      }
      case 'down': {
        if (innerIndex < listOfItems.length - 1) { 
          const updatedList = [...listOfItems]; 
          [updatedList[innerIndex], updatedList[innerIndex + 1]] = [updatedList[innerIndex + 1], updatedList[innerIndex]]; 
          const httpAnswerObj = RsvDataObjList.find(obj => obj.hasOwnProperty(innerId));
          if (httpAnswerObj) {
            httpAnswerObj[innerId] = updatedList;
          }
          this.props.performListReOrder(RsvDataObjList);
        }
        break;
      }
      default:
        break;
    }
  };
  renderArrowGroup = () => {
    const {
      listOfItems,
      innerIndex
    } = this.props;
    if (listOfItems.length > 1) {
      switch (innerIndex) {
        case 0:
          return (
            <div style={{ display: 'flex' }}>
              <IconButtonCCFK onClick={() => this.upDownOperation('down')}>
                <ArrowLineDownIcon />
              </IconButtonCCFK>
            </div>
          );
        case listOfItems.length - 1:
          return (
            <div style={{ display: 'flex' }}>
              <IconButtonCCFK onClick={() => this.upDownOperation('up')}>
                <ArrowLineUpIcon />
              </IconButtonCCFK>
            </div>
          );
        default:
          return <div style={{ display: "flex" }}>
            <IconButtonCCFK
              onClick={() => this.upDownOperation("up")}>
              <ArrowLineUpIcon />
            </IconButtonCCFK>
            <IconButtonCCFK
              onClick={() => this.upDownOperation("down")}>
              <ArrowLineDownIcon />
            </IconButtonCCFK>
          </div>
      }
    }
    else if (listOfItems.length == 1) {
      switch (innerIndex) {
        case 0:
          return null;
      }
    }
  }
  render() {
    return (
      <>
        {this.renderArrowGroup()}
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    renewEditDialog: state.renewEditDialog,
    RsvDataObjList: (!!state.renewEditDialog.Rules) ? state.renewEditDialog.Rules[0].RsvData : [],
    Rules :(!!state.renewEditDialog.Rules)
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    performListReOrder,
    ArrowGroupBtnClick
  }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(ArrowGroup);