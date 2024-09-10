import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import ChevronLeftIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ChevronLeftIcon';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
// import '../../styles/throttling/ActionIndComponent.css'
import '../../styles/throttling/ActionIndComponent.css'
import {deleteActionItem} from '../../actions/throttling'
import ActionInputGroup from './actionInputGroup'
import {returnIndexUsingId} from './helperFunctions'
import ArrowGroup from './arrowGroup'

  
class ActionIndComponent extends Component{
    
    deleteActionItem=()=>{
        const {actionId,filterId}=this.props
        this.props.deleteActionItem(actionId,filterId)
    }

    render(){
        const {togglePanel,isOpen,filterId,actionId,MessageFiltersList}=this.props
        return(
        <div className="actionIndComponentContainer" key={actionId}>
          <div data-type="clickable" role="button" className="toggle-bar" onClick={togglePanel} tabIndex="0" onKeyDown={togglePanel} aria-expanded="true">
          <div className="ActionChevronGroup">
            <span className={`chevron-indicator${isOpen?"-open":""}`}>
              <ChevronLeftIcon color="#737373" size="24px" />
            </span>
            <div className="ActionText">
                Action
            </div>
          </div>
          <div className="Action-delete-button">
            <ArrowGroup listOfItems={MessageFiltersList[returnIndexUsingId(MessageFiltersList,filterId)].filterActions} filterId={filterId} itemId={actionId} listType="action"/> 
            <IconButtonCCFK 
                onClick={this.deleteActionItem}>
                <DeleteIcon/>
            </IconButtonCCFK>
          </div>
          </div>
          {isOpen?<div className="expanded-panel">
            <ActionInputGroup filterId={filterId} actionId={actionId}/>
          </div>:null}
        </div>
            
        )
    }
}






function mapStateToProps(state) {
    return{
      MessageFiltersList:state.thnewEditDialog.currentTracingConfig.filterGroup.filters,
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        deleteActionItem
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(ActionIndComponent);