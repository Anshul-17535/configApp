import React,{Component} from 'react'
import SlfNfServiceContainer from './NfService/SlfNfServiceContainer';


class NfServiceForm extends Component{

    render(){
        return (
            <SlfNfServiceContainer ref={this.props.nfServiceRef}/>
        )
    }
}

export default NfServiceForm;

