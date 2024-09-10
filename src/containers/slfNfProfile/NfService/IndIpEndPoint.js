import React,{Component} from 'react'
import {connect} from 'react-redux';
import SelectInputCCFK from '../../../ccfk-components/SelectInputCCFK';
import TextInputCCFK from '../../../ccfk-components/TextInputCCFK';
import SpinnerCCFK from '../../../ccfk-components/SpinnerCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import {bindActionCreators} from "redux";
import {IPV4_REGEX,IPV6_REGEX,API_PREFIX_REGEX} from '../../slfNfService/validationRegexs';
import {testRegex} from './helperFunctions';
import '../../../styles/slfnfservice/SlfNfServiceInputGroup.css';


class IndIpEndPoint extends Component{

    handleChange=(value,name)=>{
        const ipEndPointCopy={...this.props.ipEndPoint}
        ipEndPointCopy[name]=value
        this.props.handleIpEndpointsChange(ipEndPointCopy,this.props.Index)
    }

    
    render(){
        const {port,transport,apiPrefix,ipv6Address,ipv4Address} = this.props.ipEndPoint
        const {Index} = this.props
        return (
            <div className="SlfNfServiceIpEndPoint">
                <div className="ipendpointsInputGroup">
                    <TextInputCCFK
                        id={`IpEndPointapiPrefix_${Index}`}
                        label="Api Prefix"
                        error={!testRegex(API_PREFIX_REGEX,apiPrefix)}
                        errorMsg={`Invalid apiPrefix`}
                        value={apiPrefix}
                        placeholder="Api Prefix"
                        onChange={this.handleChange}
                        onChangeArgs={["apiPrefix"]}
                    />
                    <TextInputCCFK
                        id={`ipv4Address_${Index}`}
                        label="Ipv4 Address"
                        error={!testRegex(IPV4_REGEX,ipv4Address)}
                        errorMsg={`Invalid IPV4 Address`}
                        value={ipv4Address}
                        placeholder="Ipv4 Address"
                        onChange={this.handleChange}
                        onChangeArgs={["ipv4Address"]}
                    />
                    <TextInputCCFK
                        id={`ipv6Address_${Index}`}
                        label="Ipv6 Address"
                        error={!testRegex(IPV6_REGEX,ipv6Address)}
                        errorMsg={`Invalid IPV6 Address`}
                        value={ipv6Address}
                        placeholder="Ipv6 Address"
                        onChange={this.handleChange}
                        onChangeArgs={["ipv6Address"]}
                    />
                    <SelectInputCCFK
                        label="Transport"
                        data={["TCP"]}
                        value={transport}
                        onChange={this.handleChange}
                        onChangeArgs={["transport"]}
                    />
                    <SpinnerCCFK
                        label="Port"
                        min={0}
                        max={65535}
                        value={port}
                        step={1}
                        onChange={this.handleChange}
                        onChangeArgs={["port"]}
                    />
                    <IconButtonCCFK 
                        onClick={()=>this.props.deleteIpEndPoint(Index)}>
                        <DeleteIcon/>
                    </IconButtonCCFK>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slfNfServicenewEditDialog.dialogType
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(IndIpEndPoint);