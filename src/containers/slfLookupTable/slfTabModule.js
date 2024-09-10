import React, { Component } from 'react';
import SlfLookUpForm from './slfLookUpForm';
import SlfKeyPairsGrid from './slfKeyPairsGrid';
import "../../styles/slflookup/slfLookUpForm.css";
import { getAllDestinationData, getAllNfProfileData, getAllKeyPairData } from "../../actions/slflookup/commonservices";
import { enableKeyPairForm } from "../../actions/slflookup/"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TabGroupCCFK from "../../ccfk-components/TabGroupCCFK";
import { setSlfLookUpName, setSlfLookUpType, setSlfLookUpMapFlag, setDialogState } from '../../actions/slflookup';
import { createSlfLookUp, updateSlfLookUp } from "../../actions/slflookup/commonservices";


class SlfTabs extends Component {
    constructor(props) {
        super(props);
        this.onIconButtonClick = this.onIconButtonClick.bind(this);
    }

    handleLookUpNameChange = (event) => {

        this.props.setSlfLookUpName(event);
    }

    handleSlfLookUpTypeChange = (event) => {
        if(!!event){
            this.props.setSlfLookUpType(event);
        }
    }

    handleSlfMapChange = (event) => {
        this.props.setSlfLookUpMapFlag(event);
    }

    handleSaveClick = () => {
        if (this.props.dialogType === "edit") {
            this.props.updateSlfLookUp(this.props.slfLookUpData);
        } else {
            this.props.createSlfLookUp(this.props.slfLookUpData);
        }
    }


    onIconButtonClick(itemClicked) {
        if (!!this.props.slfLookUpData.lookupTypeName) {
            this.props.getAllKeyPairData(this.props.slfLookUpData.lookupTypeName);
        }
        switch (itemClicked) {
            case '1': {
                this.activateModal();
                break;
            }
            default: {
                return (<div><SlfLookUpForm /></div>);
            }
        }
    }

    componentWillMount() {
        this.props.getAllDestinationData();
        this.props.getAllNfProfileData();
    }

    render() {
        return (
            <div>
                <TabGroupCCFK
                    onChange={(onClickedObject) => {this.onIconButtonClick(onClickedObject)}}
                    tabsLabelArray={[{ "label": "SLF LookUp Table", "disabled": false }, { "label": "SLF Key Map", "disabled": !this.props.enableKeyPair }]}
                    tabsAlignment='left'
                    tabContentArray={
                        [
                            <SlfLookUpForm handleLookUpNameChange={this.handleLookUpNameChange} handleSlfLookUpTypeChange={this.handleSlfLookUpTypeChange} handleSlfMapChange={this.handleSlfMapChange} handleSaveClick={this.handleSaveClick} />,
                            <SlfKeyPairsGrid />
                        ]}

                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newEditDialog: state.slflookUpnewEditDialog,
        slfLookUpData: state.slflookUpnewEditDialog.slfLookUpData,
        enableKeyPair: state.slfLookUptoolbar.enableKeyPair,
        dialogType: state.slflookUpnewEditDialog.dialogType,
        slfLookUpData: state.slflookUpnewEditDialog.slfLookUpData
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDestinationData,
        enableKeyPairForm,
        getAllKeyPairData,
        getAllNfProfileData,
        setSlfLookUpName,
        setSlfLookUpName,
        setSlfLookUpType,
        setSlfLookUpMapFlag,
        setDialogState,
        createSlfLookUp,
        updateSlfLookUp
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(SlfTabs);