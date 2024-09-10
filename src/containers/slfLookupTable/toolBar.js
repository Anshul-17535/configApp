import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppToolbarCCFK from '../../ccfk-components/AppToolbarCCFK';
import { bindActionCreators } from "redux";
import AddEditDialog from './addEditDialog';
import { getSplitScreenData, toggleSplitScreen } from '../../actions/splitScreenOptions';
import { getAllData } from '../../actions/slflookup/commonservices';
import { getToolBarData, setDialogType, setDialogState, addNewSlfLookUpData, enableKeyPairForm } from '../../actions/slflookup';
import {onSideClick} from '../../actions/rulesengine'


class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalActive: false,
            text: ''
        };
        this.onIconButtonClick = this.onIconButtonClick.bind(this);
        this.activateModal = this.activateModal.bind(this);
        this.ontoggleChange = this.ontoggleChange.bind(this);
    }

    activateModal = () => {
        this.props.addNewSlfLookUpData();
        this.props.setDialogType('new');
        this.props.setDialogState(true);
    };

    componentWillMount() {
        this.props.getAllData();
        this.props.getSplitScreenData();
        this.props.toggleSplitScreen(false);
    }

    onIconButtonClick(itemClicked) {
        switch (itemClicked) {
            case 'Add': {
                this.activateModal();
                this.props.enableKeyPairForm(false);
                break;
            }
            default: {
                break;
            }
        }
    }
    ontoggleChange = (value) => {
        if (value=== true) {
            this.props.toggleSplitScreen(false);

        } else {
            this.props.toggleSplitScreen(true);
        }
    };
    onSideClick = (value) =>{
        console.log('mid',value)
        if (value === true) {
            this.props.onSideClick(false);

        } else {
            this.props.onSideClick(true);
        }
    }
    render() {
        if (!this.props.toolBar.toolbarData) {
            return (<div>Getting Data</div>)
        }
        else {
            const modal = this.props.newEditDialog.dialogState ? <AddEditDialog /> : false;
            return (
                <div>
                    <AppToolbarCCFK
                        title={this.props.toolBar.toolbarData.pageTitle}
                        onToggle={this.ontoggleChange}
                        onClick={this.onIconButtonClick}
                        onSideClick={this.onSideClick}
                    />
                    {modal}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        toolBar: state.slfLookUptoolbar,
        newEditDialog: state.slflookUpnewEditDialog,
        toggleState: state.slfLookUpdataGrid.toggleState,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        setDialogState,
        setDialogType,
        getToolBarData,
        toggleSplitScreen,
        getSplitScreenData,
        addNewSlfLookUpData,
        getAllData,
        enableKeyPairForm,
        onSideClick
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ToolBar);