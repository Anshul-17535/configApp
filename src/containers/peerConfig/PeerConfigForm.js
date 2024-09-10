import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setType} from '../../actions/peerconfig/index';

const Type = ["EGRESS_PEER","INGRESS_PEER"]

class PeerConfigForm extends React.Component{

    handleTypeChange=(value)=>{
        if(!!value&&this.props.dialogType!=="edit"){
            this.props.setType(value)
        }
    }

    render(){
        return (
            <div className="DestinationMapCommonInputGroup">
               <SelectInputCCFK
                    label="Peer Type"
                    required={true}
                    data={Type}
                    disabled={this.props.dialogType==="view"||this.props.dialogType === "edit"}
                    value={this.props.peerType}
                    onChange={this.handleTypeChange}
                />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        peerType:state.peernewEditDialog.peertype,
        dialogType:state.peernewEditDialog.dialogType,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setType
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(PeerConfigForm);