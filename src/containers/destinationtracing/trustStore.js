import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import "../../styles/peerConfig/peerConfigForm.css";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import {a1,b1,c1,d1,e1,f1} from '../../actions/destinationprofile/index';
import '../../styles/destinationtracing/httpserver.css'


class TrustStoreConfig extends React.Component {

    constructor(props){
        super(props)
        this.state={
            checkHostValid:false
        }
    }

    a=(value)=>{
        this.props.a1(value)
    }
    
    b=(value)=>{
        this.props.b1(value)
    }

    c=(value)=>{
        this.props.c1(value)
    }

    d=(value)=>{
        this.props.d1(value)
    }

    e=(value)=>{
        this.props.e1(value)
    }

    f=(value)=>{
        this.props.f1(value)
    }

    render() {
        const {bn,dialogType}=this.props
            return (
                <div>
                     <div className="SlfLookUpForm">
                     <TextInputCCFK
                            id="Location"
                            label="Location"
                            disabled={dialogType === "view"}
                            placeholder="Location"
                            value={bn.location}
                            onChange={this.a}
                            onChangeArgs={["bn.location"]}
                        />
                    <TextInputCCFK
                            id="Password"
                            label="Password"
                            disabled={dialogType === "view"}
                            placeholder="Password"
                            value={bn.password}
                            onChange={this.b}
                            onChangeArgs={["bn.password"]}
                        />
                    <TextInputCCFK
                            id="Password ENV Variable"
                            label="Password ENV Variable"
                            disabled={dialogType === "view"}
                            placeholder="Password ENV Variable"
                            value={bn.passwordEnvVariable}
                            onChange={this.c}
                            onChangeArgs={["bn.passwordEnvVariable"]}
                        />
                    <TextInputCCFK
                            id="Password File"
                            label="Password File"
                            disabled={dialogType === "view"}
                            placeholder="Password File"
                            value={bn.passwordFile}
                            onChange={this.d}
                            onChangeArgs={["bn.passwordFile"]}
                        />
                    <TextInputCCFK
                        id="Type"
                        label="Type"
                        placeholder="Type"
                        value={bn.type}
                        disabled={dialogType === "view"}
                        onChange={this.e}
                        onChangeArgs={["bn.type"]}
                    />
                    <TextInputCCFK
                            id="Trust Factory Algorithm"
                            label="Trust Factory Algorithm"
                            placeholder="Trust Factory Algorithm"
                            value={bn.trustManagerFactoryAlgo}
                            onChange={this.f}
                            disabled={dialogType === "view"}
                            onChangeArgs={["bn.trustManagerFactoryAlgo"]}
                        />

                    </div>
                </div>
            )
        
    }
}

function mapStateToProps(state) {
    return {
        dialogType:state.dstpnewEditDialog.dialogType,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        a1,
        b1,
        c1,
        d1,
        e1,
        f1
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TrustStoreConfig);