import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import {setConfigType} from '../../actions/destinationprofile/index';

const data2=["KeyStore Configuration","TrustStore Configuration"]

class ConfigType extends React.Component{

    handleTypeChange=(value)=>{
        if(!!value){
            this.props.setConfigType(value)
        }
    }

    render(){
        return (
            <div className="DestinationMapCommonInputGroup">
               <SelectInputCCFK
                    label="TYPE"
                    required={true}
                    data={data2}
                    disabled={this.props.dialogType === "view"}
                    value={this.props.edrType}
                    onChange={this.handleTypeChange}
                />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        edrType:state.dstpnewEditDialog.edrConfigType,
        dialogType:state.dstpnewEditDialog.dialogType,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setConfigType
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ConfigType);