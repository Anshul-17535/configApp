import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import {setDialogState} from '../../actions/destinationprofile';
import EDRConfigForm from './EDRConfigForm';
import {bindActionCreators} from "redux";
import {getAllData} from '../../actions/destinationprofile/commonservices'
import {setSSLShow,setSSLShow2} from '../../actions/destinationprofile/index'
import HttpServer from './httpServer';
import Hep3Server from './hep3Server';
import KafkaCluster from './kafkaCluster';
import RemoteFile from './remoteFile';
import MessageMirror from './messageMirror';


class AddEditDialog extends Component{


    componentWillMount=()=>{
        this.props.setSSLShow(false)
        this.props.setSSLShow2(false)
    }

    handleRenderFooterCancelClick=()=>{
        this.props.getAllData()
        this.props.setDialogState(false)
    }

    returnTypeComponent=()=>{
        const a=this.props.httpServer
        const b=this.props.hep3Server
        const c=this.props.kafkaCluster
        const d=this.props.remoteFile
        const e=this.props.mirrorServer
        switch(this.props.edrType){
            case 'HTTP Server':
                return (<HttpServer a={a}/>)
            case 'HEP3 Server':
                return (<Hep3Server b={b}/>)
            case 'Kafka Cluster':
                return (<KafkaCluster c={c}/>)
            case 'Remote File':
                return (<RemoteFile d={d}/>)
            case 'Message Mirror':
                return (<MessageMirror e={e}/>)
            default:
                return <></>
        }
    }

    render(){
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"View":"Add"} Tracing Destination`}
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
                <EDRConfigForm/>
                {this.returnTypeComponent()}
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.dstpnewEditDialog.dialogType,
        edrType:state.dstpnewEditDialog.edrType,
        httpServer: state.dstpnewEditDialog.currentHttpServer,
        hep3Server: state.dstpnewEditDialog.currentHep3Server,
        kafkaCluster: state.dstpnewEditDialog.currentKafkaCluster,
        remoteFile: state.dstpnewEditDialog.currentRemotefile,  
        mirrorServer: state.dstpnewEditDialog.currentMirrorServer    
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        getAllData,
        setSSLShow,
        setSSLShow2
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);