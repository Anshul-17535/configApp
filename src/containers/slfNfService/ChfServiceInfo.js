import React,{Component} from 'react'
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import '../../styles/slfnfservice/ChfServiceInfoComponent.css';


class ChfServiceInfo extends Component{
    render(){
        const {primaryChfServiceInstance,secondaryChfServiceInstance}=this.props.chfServiceInfoState
        return (
            <div className="ChfServiceInfoComponent">
                <TextInputCCFK
                    label="Primary Chf ServiceInstance"
                    placeholder="primary Chf ServiceInstance"
                    value={primaryChfServiceInstance}
                    id="primaryChfServiceInstance"
                    onChange={this.props.handleChfServiceInfoChange}
                    onChangeArgs={["primaryChfServiceInstance"]}
                />
                <TextInputCCFK
                    label="Secondary Chf ServiceInstance"
                    placeholder="secondary Chf ServiceInstance"
                    value={secondaryChfServiceInstance}
                    id="secondaryChfServiceInstance"
                    onChange={this.props.handleChfServiceInfoChange}
                    onChangeArgs={["secondaryChfServiceInstance"]}
                />
            </div>
        )
    }
}

export default ChfServiceInfo;

