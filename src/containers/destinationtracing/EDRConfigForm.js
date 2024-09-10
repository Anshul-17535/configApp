import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setType} from '../../actions/destinationprofile/index';

const Type = ["HTTP Server","HEP3 Server","Kafka Cluster","Remote File","Message Mirror"]

class EDRConfigForm extends React.Component{

    handleTypeChange=(value)=>{
        if(!!value&&this.props.dialogType!=="edit"){
            this.props.setType(value)
        }
    }

    render(){
        return (
            <div className="DestinationMapCommonInputGroup">
               <SelectInputCCFK
                    label="Destination Type"
                    required={true}
                    data={Type}
                    disabled={this.props.dialogType==="edit" || this.props.dialogType==="view"}
                    value={this.props.edrType}
                    onChange={this.handleTypeChange}
                />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        edrType:state.dstpnewEditDialog.edrType,
        dialogType:state.dstpnewEditDialog.dialogType,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setType
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(EDRConfigForm);