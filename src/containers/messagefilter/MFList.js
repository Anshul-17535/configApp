import React,{Component} from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import "../../styles/messageFilter/MFList.css";
import MFIndComponent from './MFIndComponent'
import {UpdateMessageFiltersListWhenIsOpenChanges} from "../../actions/messagefilter";
import {ExpansionPanel} from '@nokia-csf-uxr/ccfk/ExpansionPanels';

  const Item = ({
    name, isOpen, togglePanel,id
  }) => {
    return (
        <MFIndComponent isOpen={isOpen} togglePanel={togglePanel} filterId={id} name={name}/>
    );
  };


class MFList extends Component{

      togglePanel = id => (event) => {
          event.persist()
          if ((event.type === 'click' || event.key === ' ' || event.key === 'Enter')&&event.target.dataset.type==="clickable") {
            const {MessageFiltersList} = this.props
            const itemIndex = MessageFiltersList.findIndex(item => item.id === id);
            const ModifiedMessageFiltersList = [...MessageFiltersList];
            ModifiedMessageFiltersList[itemIndex].isOpen = !MessageFiltersList[itemIndex].isOpen;
            this.props.UpdateMessageFiltersListWhenIsOpenChanges(ModifiedMessageFiltersList)
          }
        }
    
    render(){
        const {MessageFiltersList} = this.props
        return(
            <div className="MFIndComponent">
                <ExpansionPanel 
                  id="expansionPanel">
                    {MessageFiltersList.map(item => <Item key={item.id} togglePanel={this.togglePanel(item.id)} {...item} />)}
                </ExpansionPanel>
            </div>
            
        )
    }
}






function mapStateToProps(state) {
    return{
      MessageFiltersList:state.mfnewEditDialog.currentTracingConfig.filterGroup.filters
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
      UpdateMessageFiltersListWhenIsOpenChanges
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(MFList);