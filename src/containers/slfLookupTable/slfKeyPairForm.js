import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import SpinnerCCFK from '../../ccfk-components/SpinnerCCFK';
import SelectInputCCFK from '../../ccfk-components/SelectInputCCFK';
import { setDialogStateKeyPair, setSlfPattern, setDestinationType, setDestinationId, setSlfLookupPairData, setCustomTag1, setCustomTag2, setCustomTag3, setRank, setDestinationIdOptions } from '../../actions/slflookup';
import "../../styles/slflookup/slfLookUpForm.css";
import { updateSlfKeyPair, createSlfKeyPair } from "../../actions/slflookup/commonservices";
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';

const MapPatternOptions = ['FQDN','IP_ADDRESS','NF_SERVICE','NF_GROUP','NF_INSTANCE','NF_PROFILE','NF_SET','LOOKUP_KEYS',"IPADDRESS_SCP","FQDN_SCP","NFSET_SCP"];

class SlfLookUpForm extends React.Component {

    componentDidMount() {
        this.props.setSlfLookupPairData(this.props.slfLookUpData);
    }
    handlePatternChange = (event) => {
        this.props.setSlfPattern(event);
    }

    handleDestinationTypeChange = (event) => {
        
        if(!!event && this.props.dialogTypeKeyPair!=="edit"){
            this.props.setDestinationType(event);
            if (event === 'NF_PROFILE') {
                this.props.setDestinationIdOptions(this.props.slfNFProfileOptions);
            }
            else {
                if (!!this.props.slfDestinationData[event]) {
                    this.props.setDestinationIdOptions(this.props.slfDestinationData[event]);
                }
            }
            this.props.setDestinationId("");
        }
    }
    handleDestinationIdChange = (event) => {
        if(!!event && this.props.dialogTypeKeyPair!=="edit"){
            this.props.setDestinationId(event);
        }
    }
    handleRankChange = (event) => {
        this.props.setRank(Number(event));
    }
    handleTag1Change = (event) => {
        this.props.setCustomTag1(event);
    }
    handleTag2Change = (event) => {
        this.props.setCustomTag2(event);
    }
    handleTag3Change = (event) => {
        this.props.setCustomTag3(event);
    }
    handleSaveClick = () => {
        if (this.props.dialogTypeKeyPair === "edit") {
            this.props.updateSlfKeyPair(this.props.slfKeyPairData);
        }else{
            this.props.createSlfKeyPair(this.props.slfKeyPairData);
        }
    }
    onClose=()=>{
        this.props.setDialogStateKeyPair(false);
    }
    renderFooter=()=>{
        return(
            <div className="container">
                        <ButtonCCFK text="SAVE" variant="call-to-action" disabled={this.props.slfKeyPairData.pattern === "" || this.props.slfKeyPairData.destinationId === "" || this.props.slfKeyPairData.destinationType === ""} onClick={this.handleSaveClick} />
                    </div>

        )
    }

    render() {
        const { dialogTypeKeyPair } = this.props;
        if (!this.props.slfKeyPairData) {
            return <div></div>
        } else {
            return (
                <DialogCCFK
                    title="SLF Key Map"
                    renderFooter={this.renderFooter}
                    onClose={this.onClose}
                    dialogStyle={{
                        "content": {
                            "top": "15%",
                            "bottom": "15%",
                            "height": "70%",
                            "left": "1%",
                            "right": "1%",
                            "width": "98%"
                        }
                    }}
                    footerStyle={{"display":"flex","justifyContent":"center"}}
                >
                    <div className="SlfKeyPairForm">
                        <TextInputCCFK
                            id="pattern"
                            required={true}
                            placeholder="Pattern"
                            label="Pattern"
                            value={this.props.slfKeyPairData.pattern}
                            disabled={dialogTypeKeyPair === "edit"}
                            onChange={this.handlePatternChange}
                        />
                        <SelectInputCCFK
                            label="Destination Type"
                            required={true}
                            data={MapPatternOptions}
                            disabled={dialogTypeKeyPair === "edit"}
                            value={this.props.slfKeyPairData.destinationType}
                            onChange={this.handleDestinationTypeChange}
                        />
                        {(!!this.props.slfKeyPairData.destinationType && this.props.slfKeyPairData.destinationType === "LOOKUP_KEYS") ?
                            <TextInputCCFK
                                id="destinationId"
                                required={true}
                                placeholder="Destination ID"
                                label="Destination ID"
                                value={this.props.slfKeyPairData.destinationId}
                                disabled={dialogTypeKeyPair === "edit"}
                                onChange={this.handleDestinationIdChange}
                            /> :
                            <SelectInputCCFK
                                label="Destination ID"
                                required={true}
                                data={this.props.slfDestinationIdOptions}
                                disabled={dialogTypeKeyPair === "edit"}
                                value={this.props.slfKeyPairData.destinationId}
                                onChange={this.handleDestinationIdChange}
                            />}
                        <SpinnerCCFK
                            label="Rank"
                            min={1}
                            max={2147483647}
                            disabled={false}
                            required={false}
                            readOnly={false}
                            step={1}
                            value={this.props.slfKeyPairData.rank}
                            onChange={this.handleRankChange}
                        />
                        <TextInputCCFK
                            id="customTag1"
                            placeholder="Tag1"
                            label="Tag1"
                            value={this.props.slfKeyPairData.customTag1}
                            onChange={this.handleTag1Change}
                        />
                        <TextInputCCFK
                            id="customTag2"
                            placeholder="Tag2"
                            label="Tag2"
                            value={this.props.slfKeyPairData.customTag2}
                            onChange={this.handleTag2Change}
                        />
                        <TextInputCCFK
                            id="customTag3"
                            placeholder="Tag3"
                            label="Tag3"
                            value={this.props.slfKeyPairData.customTag3}
                            onChange={this.handleTag3Change}
                        />
                    </div>
                </DialogCCFK>
            )
        }
    }
}

function mapStateToProps(state) {
    return{
        dialogTypeKeyPair:state.slflookUpnewEditDialog.dialogTypeKeyPair,
        slfKeyPairData:state.slflookUpnewEditDialog.slfKeyPairData,
        slfDestinationData:state.slflookUpnewEditDialog.slfDestinationData,
        slfLookUpData: state.slflookUpnewEditDialog.slfLookUpData,
        slfDestinationIdOptions: state.slflookUpnewEditDialog.slfDestinationIdOptions,
        slfNFProfileOptions : state.slflookUpnewEditDialog.slfNFProfileOptions
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setSlfPattern,
        setDestinationType,
        setDestinationId,
        setDialogStateKeyPair,
        createSlfKeyPair,
        updateSlfKeyPair,
        setSlfLookupPairData,
        setCustomTag1,
        setCustomTag2,
        setCustomTag3,
        setDestinationIdOptions,
        setRank
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(SlfLookUpForm);