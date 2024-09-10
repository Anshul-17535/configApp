import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import ChevronLeftIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ChevronLeftIcon';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import '../../styles/throttling/CriteriaIndComponent.css'
import {deleteCriteriaItem} from '../../actions/throttling'
import CriteriaInputGroup from "./criteriaInputGroup";
import {returnIndexUsingId} from './helperFunctions'
import ArrowGroup from './arrowGroup'


  
class CriteriaIndComponent extends Component{
    
    deleteCriteriaItem=()=>{
        const {criteriaId,filterId}=this.props
        this.props.deleteCriteriaItem(criteriaId,filterId)
    }

    render(){
        const {togglePanel,isOpen,filterId,criteriaId,MessageFiltersList}=this.props
        return(
        <div className="criteriaIndComponentContainer" key={criteriaId}>
          <div data-type="clickable" role="button" className="toggle-bar" onClick={togglePanel} tabIndex="0" onKeyDown={togglePanel} aria-expanded="true">
          <div className="CriteriaChevronGroup">
            <span className={`chevron-indicator${isOpen?"-open":""}`}>
                <ChevronLeftIcon color="#737373" size="24px" />
            </span>
            <div className="CriteriaText">
                Criterion
            </div>
          </div>
          <div className="Criteria-delete-button">
            <ArrowGroup listOfItems={MessageFiltersList[returnIndexUsingId(MessageFiltersList,filterId)].filterCriteria} filterId={filterId} itemId={criteriaId} listType="criteria"/> 
            <IconButtonCCFK 
                onClick={this.deleteCriteriaItem}>
                <DeleteIcon/>
            </IconButtonCCFK>
          </div>
          </div>
          {isOpen?<div className="expanded-panel">
              <CriteriaInputGroup filterId={filterId} criteriaId={criteriaId}/>
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
        deleteCriteriaItem
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(CriteriaIndComponent);