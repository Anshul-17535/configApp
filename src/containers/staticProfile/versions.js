import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
// import CalendarCCFK from '../../ccfk-components/CalendarCCFK';

class Versions extends Component{

    addServiceVapiURL=(value)=>{
        this.props.addServiceVapiURL(value,this.props.Index)
    }

    addServiceVapiFullVersion=(value)=>{
        this.props.addServiceVapiFullVersion(value,this.props.Index)
    }

    addServiceVexpiry=(value)=>{
        this.props.addServiceVexpiry(value,this.props.Index)
    }

    

    render(){
        const {versions,dialogType,Index}=this.props
        return (
            <div className="plmnComponent">
                <TextInputCCFK
                    id={`${Index}apiVersionInUri`}
                    label="API Version In Uri"
                    required={true}
                    style={{width:"40%"}}
                    placeholder="API Version In Uri"
                    value={versions.apiVersionInUri}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceVapiURL}
                    onChangeArgs={["versions.apiVersionInUri"]}
                />
                <TextInputCCFK
                    id={`${Index}apiFullVersion`}
                    label="API Full Version"
                    style={{width:"40%"}}
                    placeholder="API Full Version"
                    value={versions.apiFullVersion}
                    disabled={dialogType === "view"}
                    onChange={this.addServiceVapiFullVersion}
                    onChangeArgs={["versions.apiFullVersion"]}
                />
                {/* <CalendarCCFK
                        label="Expiry"
                        required={false}
                        onChange={this.addServiceVexpiry}
                        value = {versions.expiry}
                        disabled={false}
                        /> */}
                <IconButtonCCFK 
                    onClick={()=>{this.props.deleteVersions(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
                </div>
            
        )
    }
}


export default Versions;

