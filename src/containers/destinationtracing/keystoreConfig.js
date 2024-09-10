import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import "../../styles/peerConfig/peerConfigForm.css";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import {a,b,c,d,e,f} from '../../actions/destinationprofile/index';
import '../../styles/destinationtracing/httpserver.css'


class KeyStoreConfig extends React.Component {

    constructor(props){
        super(props)
        this.state={
            checkHostValid:false
        }
    }

    a=(value)=>{
        this.props.a(value)
    }

    b=(value)=>{
        this.props.b(value)
    }

    c=(value)=>{
        this.props.c(value)
    }

    d=(value)=>{
        this.props.d(value)
    }

    e=(value)=>{
        this.props.e(value)
    }
    
    f=(value)=>{
        this.props.f(value)
    }

    render() {
        const {an,dialogType}=this.props
            return (
                <div>
                     <div className="SlfLookUpForm" >
                     <TextInputCCFK
                            id="Location"
                            label="Location"
                            placeholder="Location"
                            value={an.location}
                            disabled={dialogType === "view"}
                            onChange={this.a}
                            onChangeArgs={["an.location"]}
                        />
                    <TextInputCCFK
                            id="Password"
                            label="Password"
                            disabled={dialogType === "view"}
                            placeholder="Password"
                            value={an.password}
                            onChange={this.b}
                            onChangeArgs={["an.password"]}
                        />
                    <TextInputCCFK
                            id="Password ENV Variable"
                            label="Password ENV Variable"
                            disabled={dialogType === "view"}
                            placeholder="Password ENV Variable"
                            value={an.passwordEnvVariable}
                            onChange={this.c}
                            onChangeArgs={["an.passwordEnvVariable"]}
                        />
                    <TextInputCCFK
                            id="Password File"
                            label="Password File"
                            disabled={dialogType === "view"}
                            placeholder="Password File"
                            value={an.passwordFile}
                            onChange={this.d}
                            onChangeArgs={["an.passwordFile"]}
                        />
                    <TextInputCCFK
                        id="Type"
                        label="Type"
                        disabled={dialogType === "view"}
                        placeholder="Type"
                        value={an.type}
                        onChange={this.e}
                        onChangeArgs={["an.type"]}
                    />
                    <TextInputCCFK
                            id="Key Factory Algorithm"
                            label="Key Factory Algorithm"
                            disabled={dialogType === "view"}
                            placeholder="Key Factory Algorithm"
                            value={an.keyManagerFactoryAlgo}
                            onChange={this.f}
                            onChangeArgs={["an.keyManagerFactoryAlgo"]}
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
        a,
        b,
        c,
        d,
        e,
        f
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(KeyStoreConfig);