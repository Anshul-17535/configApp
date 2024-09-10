import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import {setDialogState} from '../../actions/peerconfig';
import PeerConfigForm from './PeerConfigForm';
import EgressPeer from './egressPeer';
import IngressPeer from './ingressPeer';
import {bindActionCreators} from "redux";
import {getAllData} from '../../actions/peerconfig/commonservices'


class AddEditDialog extends Component{

    handleRenderFooterCancelClick=()=>{
        this.props.getAllData()
        this.props.setDialogState(false)
    }

    returnTypeComponent=()=>{
        const egressData=this.props.egressData
        const ingressData=this.props.ingressData
        switch(this.props.peerType){
            case 'EGRESS_PEER':
                return (<EgressPeer egressData={egressData} />)
            case 'INGRESS_PEER':
                return (<IngressPeer ingressData={ingressData} />)
            default:
                return <></>
        }
    }

    render(){
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"View":"Add"} Peer Config`}
                onClose={this.handleRenderFooterCancelClick}
                renderFooter={()=>{}}
                dialogStyle={{
                    "content": {
                        "top":"1%",
                        "bottom":"1%",
                        "height": "98%",
                        "left": "1%",
                        "right": "1%",
                        "width": "98%"
                        }
                }}
                footerStyle={{"display":"flex","justifyContent":"center"}}
            >
                <PeerConfigForm/>
                {this.returnTypeComponent()}
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.peernewEditDialog.dialogType,
        peerType:state.peernewEditDialog.peertype,
        data1:state.peertoolbar.egreessprofilearray,
        data2:state.peertoolbar.ingreessprofilearray,
        egressData: state.peernewEditDialog.currentPeerEPConfig,
        ingressData: state.peernewEditDialog.currentPeerIPConfig,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        getAllData
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);