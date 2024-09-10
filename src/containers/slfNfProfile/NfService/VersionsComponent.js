import React,{Component} from 'react'
import TextInputCCFK from '../../../ccfk-components/TextInputCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import IconButtonCCFK from '../../../ccfk-components/IconButtonCCFK';
import '../../../styles/slfnfservice/VersionsComponent.css';


class Versions extends Component{
    render(){
        const {Index,apiVersionInUri,apiFullVersion,expiry}=this.props
        return (
            <div className="VersionsComponent">
                <TextInputCCFK
                    label="ApiVersionInUri"
                    placeholder="apiVersionInUri"
                    value={apiVersionInUri}
                    id={`apiVersionInUri_${Index}`}
                    onChange={this.props.handleVersionsChange}
                    onChangeArgs={["apiVersionInUri",Index,"versions"]}
                />
                <TextInputCCFK
                    label="ApiFullVersion"
                    placeholder="apiFullVersion"
                    value={apiFullVersion}
                    id={`apiFullVersion_${Index}`}
                    onChange={this.props.handleVersionsChange}
                    onChangeArgs={["apiFullVersion",Index,"versions"]}
                />
                <TextInputCCFK
                    label="Expiry"
                    placeholder="expiry"
                    value={expiry}
                    id={`expiry_${Index}`}
                    onChange={this.props.handleVersionsChange}
                    onChangeArgs={["expiry",Index,"versions"]}
                />
                <IconButtonCCFK 
                    onClick={()=>{this.props.deleteVersions(Index)}}>
                    <DeleteIcon/>
                </IconButtonCCFK>
            </div>
        )
    }
}


export default Versions;

