import React,{Component} from 'react'
import {connect} from 'react-redux';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import ErrorDialogCCFK from '../../ccfk-components/ErrorDialogCCFK';
import {setDialogState} from '../../actions/slfdestinationmap';
import DestinationMapPattern from './DestinationMapPattern';
import DestinationNFServiceInstance from './DestinationNfServiceInstance/DestinationNFServiceInstance';
import DestinationNFService from './DestinationNFService/DestinationNFService';
import SlfFqdn from './SlfFQDN/SlfFqdn';
import SlfIplist from './SlfIpList/SlfIplist';
import {bindActionCreators} from "redux";
import {setErrorOnValidation} from '../../actions/slfdestinationmap';
import {isFieldsEmpty} from './validationFunctions'
import { returnMapName } from './helpers';
import {createDestinationMapConfig,updateDestinationMapConfig,getAllData} from '../../actions/slfdestinationmap/commonservices';

class AddEditDialog extends Component{

    constructor(props){
        super(props)
        this.state={
            ValidationErrorMessage:""
        }
    }

    handleRenderFooterCancelClick=()=>{
        this.props.getAllData()
        this.props.setDialogState(false)
    }

    returnModifiedDestinationMapData=(destMapData)=>{
        let destDataObj=destMapData.destinationMap.DestMapList[0]
        const mapName=returnMapName(destDataObj.mapPattern)
        let mapDataList=destDataObj[mapName]
        let mapDataListCopy=mapDataList.slice()
        let newMapDataList = mapDataListCopy.map(({ isNew, ...rest }) =>rest )
        let ModObj={}
        ModObj[mapName]=newMapDataList;
        ModObj["destinationId"]=destDataObj.destinationId
        ModObj["mapPattern"]=destDataObj.mapPattern
        let modifiedObj={
            "destinationMap":{
                "DestMapList":[ModObj]
            }
        }
        return modifiedObj

    }

    handleRenderFooterSaveClick=()=>{
        const {slfDestinationMapData} = this.props
        switch(true){
            case slfDestinationMapData.destinationMap.DestMapList[0].mapPattern==="":
                this.setState({ValidationErrorMessage:"MapPattern cannot be Empty"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            case isFieldsEmpty(slfDestinationMapData):
                this.setState({ValidationErrorMessage:"Missing Field Values"},()=>{
                    this.props.setErrorOnValidation(true)
                })
                break;
            default:
                const ModifiedDestinationMapData=this.returnModifiedDestinationMapData(slfDestinationMapData)
                if(this.props.dialogType==="edit"){
                    this.props.updateDestinationMapConfig(ModifiedDestinationMapData)
                }else{
                    this.props.createDestinationMapConfig(ModifiedDestinationMapData)
                }
                break;
        }
    }

    renderFooter=()=>{
        return <div>
            <ButtonCCFK text="SAVE" onClick={this.handleRenderFooterSaveClick} variant="call-to-action" />
        </div>
    }

    returnDestinationMapComponent=()=>{
        //Since the configuration structure is same in case of NF_SERVICE ,NF_GROUP and NF_SET , single component is used.
        
        const {mapPattern}=this.props.slfDestinationMapData.destinationMap.DestMapList[0]
        switch(mapPattern){
            case 'NF_SERVICE':
                return <DestinationNFService/>
            case 'NF_GROUP':
                return <DestinationNFService/>
            case 'NF_INSTANCE':
                return <DestinationNFServiceInstance/>
            case 'NF_SET':
                return <DestinationNFService/>
            case 'IP_ADDRESS':
                return <SlfIplist/>
            case 'FQDN':
                return <SlfFqdn/>
            case 'IPADDRESS_SCP':
                return <SlfIplist/>
            case 'IPADDRESS_SEPP':
                return <SlfIplist/>
            case 'FQDN_SCP':
                return <SlfFqdn/>
            case 'FQDN_SEPP':
                return <SlfFqdn/>
            case 'NFSET_SCP':
                return <DestinationNFService/>
            case 'NFSET_SEPP':
                return <DestinationNFService/>
            default:
                return <></>
        }
    }

    onErrorClose = () =>{
        this.props.setErrorOnValidation(false);
    }

    ValidationErrorPopup = () => {
        return (<ErrorDialogCCFK title={"Error!"} variant="ERROR" message={this.state.ValidationErrorMessage} detailsText={""} onClose={this.onErrorClose}/>)
    }
    
    render(){
        return(
            <DialogCCFK
                title={`${this.props.dialogType==="edit"?"Edit":"Add"} SLF Destination Map`}
                renderFooter={this.renderFooter}
                onClose={this.handleRenderFooterCancelClick}
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
                <DestinationMapPattern/>
                {this.returnDestinationMapComponent()}
                {this.props.showValidationError && this.ValidationErrorPopup()}
            </DialogCCFK>
        )
    }
}

function mapStateToProps(state) {
    return{
        dialogType:state.slfDestinationMapnewEditDialog.dialogType,
        slfDestinationMapData:state.slfDestinationMapnewEditDialog.currentSlfDestinationMapConfig,
        showValidationError:state.mfnewEditDialog.showValidationError,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        createDestinationMapConfig,
        updateDestinationMapConfig,
        setErrorOnValidation,
        getAllData
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(AddEditDialog);