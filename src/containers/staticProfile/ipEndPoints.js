import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import { portCheck,hostCheck } from './helperFunctions';

class IPEndPoints extends Component{
    addServiceIpv4Address=(value)=>{
        this.props.addServiceIpv4Address(value,this.props.Index)
    }
    addServiceIpTransport=(value)=>{
        if(!!value){
            this.props.addServiceIpTransport(value,this.props.Index)
        }
    }
    addServiceIpPort=(value)=>{
        this.props.addServiceIpPort(value,this.props.Index)
    }
    addServiceIpEndpoint=(value)=>{
        this.props.addServiceIpEndpoint(value,this.props.Index)
    }

    render(){
        const {ipEndPoint,dialogType,Index}=this.props
        return (
            <div className="plmnComponent">
                <TextInputCCFK
                    id={`${Index}ipv4Address`}
                    error={hostCheck(ipEndPoint.ipv4Address,'IPv4')}
                    errorMsg={"Please Provide A Valid IPv4 Host Value"}
                    label="IPV4 Address"
                    placeholder="IPV4 Address"
                    value={ipEndPoint.ipv4Address}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceIpv4Address}
                    onChangeArgs={["ipEndPoint.ipv4Address"]}
                />
                <div style={{width:"8rem"}}>
                    <SelectInputCCFK
                        id={`${Index}transport`}
                        label="Transport"
                        data={['TCP']}
                        disabled={dialogType === "view"}
                        value={ipEndPoint.transport}
                        onChange={this.addServiceIpTransport}
                        onChangeArgs={["ipEndPoint.transport"]}
                    />
                </div>
                <TextInputCCFK
                    id={`${Index}port`}
                    label="port"
                    error={portCheck(ipEndPoint.port)}
                    errorMsg="Please Provide A Valid Port Value"
                    placeholder="port"
                    value={ipEndPoint.port}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceIpPort}
                    onChangeArgs={["ipEndPoint.port"]}
                />
                <TextInputCCFK
                    id={`${Index}Ipv6 Adresses`}
                    label="IPV6 Adresses"
                    error={hostCheck(ipEndPoint.ipv6Address,'IPv6')}
                    errorMsg={"Please Provide A Valid IPv6 Host Value"}
                    placeholder="Ipv6 Adresses"
                    value={ipEndPoint.ipv6Address}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceIpEndpoint}
                    onChangeArgs={["ipEndPoint.ipv6Address"]}
                />
                <IconButtonCCFK 
                    onClick={()=>{this.props.deleteIpEndPoints(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
                </div>
            
        )
    }
}


export default IPEndPoints;

