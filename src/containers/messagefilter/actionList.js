import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {ExpansionPanel} from '@nokia-csf-uxr/ccfk/ExpansionPanels';
import ActionIndComponent from './actionIndComponent'
import {UpdateMessageFiltersListWhenIsOpenChanges} from "../../actions/messagefilter";



const Item = ({
    name, isOpen, togglePanel,id,filterId
  }) => {
    return (
        <ActionIndComponent isOpen={isOpen} filterId={filterId} togglePanel={togglePanel} actionId={id} name={name}/>
    );
  };


class ActionList extends Component{

    togglePanel = (actionId,filterId) => (event) => {
        if ((event.type === 'click' || event.key === ' ' || event.key === 'Enter')&&event.target.dataset.type==="clickable") {
          const {MessageFiltersList} = this.props
          const itemIndex = MessageFiltersList.findIndex(item => item.id === filterId);
          const actionIndex=MessageFiltersList[itemIndex].filterActions.findIndex(item => item.id === actionId);
          const ModifiedMessageFiltersList = [...MessageFiltersList];
          ModifiedMessageFiltersList[itemIndex].filterActions[actionIndex].isOpen=!MessageFiltersList[itemIndex].filterActions[actionIndex].isOpen
          this.props.UpdateMessageFiltersListWhenIsOpenChanges(ModifiedMessageFiltersList)
        }
      }

    returnActionListArray=(filterId)=>{
        const {MessageFiltersList} = this.props
        const filterIndex = MessageFiltersList.findIndex(item => item.id === filterId);
        return MessageFiltersList[filterIndex].filterActions
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
                    {this.returnActionListArray(filterId).map(item => <Item key={item.id} filterId={filterId} togglePanel={this.togglePanel(item.id,filterId)} {...item} />)}
                </ExpansionPanel>
            </div>
            
        )
    }
}






function mapStateToProps(state) {
    return{
        MessageFiltersList:state.mfnewEditDialog.currentTracingConfig.filterGroup.filters,
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        UpdateMessageFiltersListWhenIsOpenChanges
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(ActionList);