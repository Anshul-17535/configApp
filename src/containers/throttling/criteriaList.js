import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import CriteriaIndComponent from './criteriaIndComponent'
import {UpdateMessageFiltersListWhenIsOpenChanges} from "../../actions/throttling";
import {ExpansionPanel} from '@nokia-csf-uxr/ccfk/ExpansionPanels';


const Item = ({
    name, isOpen, togglePanel,id,filterId
  }) => {
    return (
        <CriteriaIndComponent isOpen={isOpen} filterId={filterId} togglePanel={togglePanel} criteriaId={id} name={name}/>
    );
  };


class CriteriaList extends Component{

    togglePanel = (criteriaId,filterId) => (event) => {
        if ((event.type === 'click' || event.key === ' ' || event.key === 'Enter')&&event.target.dataset.type==="clickable") {
          const {MessageFiltersList} = this.props
          const itemIndex = MessageFiltersList.findIndex(item => item.id === filterId);
          const criteriaIndex=MessageFiltersList[itemIndex].filterCriteria.findIndex(item => item.id === criteriaId);
          const ModifiedMessageFiltersList = [...MessageFiltersList];
          ModifiedMessageFiltersList[itemIndex].filterCriteria[criteriaIndex].isOpen=!MessageFiltersList[itemIndex].filterCriteria[criteriaIndex].isOpen
          this.props.UpdateMessageFiltersListWhenIsOpenChanges(ModifiedMessageFiltersList)
        }
      }

    returnCriteriaListArray=(filterId)=>{
        const {MessageFiltersList} = this.props
        const filterIndex = MessageFiltersList.findIndex(item => item.id === filterId);
        return MessageFiltersList[filterIndex].filterCriteria
    }
    
    render(){
        const {filterId} = this.props
        return(
            <div className="MFIndComponent">
                <ExpansionPanel
                  elevationProps={{
                        elevationIndex: 0,
                        dark: false,
                    }}
                  id="expansionPanel">
                    {this.returnCriteriaListArray(filterId).map(item => <Item key={item.id} filterId={filterId} togglePanel={this.togglePanel(item.id,filterId)} {...item} />)}
                </ExpansionPanel>
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
        UpdateMessageFiltersListWhenIsOpenChanges
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(CriteriaList);