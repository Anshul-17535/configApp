import React,{Component} from 'react'
import {returnIndexUsingId,performUpOperation} from './helperFunctions'
import ArrowLineDownIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ArrowLineDownIcon';
import ArrowLineUpIcon from '@nokia-csf-uxr/ccfk-assets/legacy/ArrowLineUpIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import {performListReOrder} from '../../actions/messagefilter'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

class ArrowGroup extends Component{

    upDownOperation=(operation)=>{
        const {listOfItems,listType,itemId,MessageFiltersList,filterId}=this.props
        let filterIndex = returnIndexUsingId(MessageFiltersList,filterId)
        let itemIndex=returnIndexUsingId(listOfItems,itemId)
        switch(operation){
            case "up":
                this.props.performListReOrder(performUpOperation(listOfItems,itemIndex),listType,filterIndex)
                break;
            case "down":
                this.props.performListReOrder(performUpOperation(listOfItems,itemIndex+1),listType,filterIndex)
                break;
            default:
                break;
        }
    }

    renderArrowGroup=()=>{
        const {listOfItems,itemId}=this.props
        if(listOfItems.length>1){
            switch(returnIndexUsingId(listOfItems,itemId)){
                case 0:
                    return <div style={{display:"flex"}}>
                        <IconButtonCCFK 
                            disabled={this.props.dialogType==="view"}
                            onClick={()=>this.upDownOperation("down")}>
                            <ArrowLineDownIcon/>
                        </IconButtonCCFK>
                    </div>
                case listOfItems.length-1:
                    return <div style={{display:"flex"}}>
                        <IconButtonCCFK 
                         disabled={this.props.dialogType==="view"}
                            onClick={()=>this.upDownOperation("up")}>
                            <ArrowLineUpIcon/>
                        </IconButtonCCFK>
                    </div>
                default:
                    return <div style={{display:"flex"}}>
                        <IconButtonCCFK 
                        disabled={this.props.dialogType==="view"}
                            onClick={()=>this.upDownOperation("up")}>
                            <ArrowLineUpIcon/>
                        </IconButtonCCFK>
                        <IconButtonCCFK 
                        disabled={this.props.dialogType==="view"}
                            onClick={()=>this.upDownOperation("down")}>
                            <ArrowLineDownIcon/>
                        </IconButtonCCFK>
                        
                    </div>
            }
            
        }   
    }

    render(){
        return (
            <>
            {this.renderArrowGroup()}
            </>
        )
    }
}
function mapStateToProps(state) {
    return{
        MessageFiltersList:state.mfnewEditDialog.currentTracingConfig.filterGroup.filters,
        dialogType:state.mfnewEditDialog.dialogType
    }
}
    
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        performListReOrder
    }, dispatch);
}
    
export default connect(mapStateToProps,matchDispatchToProps)(ArrowGroup);