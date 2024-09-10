/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppToolbarCCFK from '../../ccfk-components/AppToolbarCCFK';
import {bindActionCreators} from "redux";
import AddEditDialog from "./addEditDialog";
import {getAllData} from '../../actions/slfnfprofile/commonservices';
import {getSplitScreenData,toggleSplitScreen} from '../../actions/splitScreenOptions';
import {getToolBarData ,setDialogType,setDialogState,addNewSlfNfProfileConfig} from '../../actions/slfnfprofile';
import {onSideClick} from '../../actions/rulesengine'


class ToolBar extends Component {
    constructor(props){
        super(props);
        let srv=this;
        this.state = {
            modalActive: false,
            text: ''
        };
        this.onIconButtonClick = this.onIconButtonClick.bind(this);
        this.activateModal = this.activateModal.bind(this);
        this.ontoggleChange = this.ontoggleChange.bind(this);
    }

    activateModal = () => {
        this.props.addNewSlfNfProfileConfig()
        this.props.setDialogType('new');
        this.props.setDialogState(true);
    };

    componentWillMount() {
        this.props.getAllData()
        this.props.getSplitScreenData();
        this.props.toggleSplitScreen(false);
    }

    onIconButtonClick(itemClicked){
        switch (itemClicked){
            case 'Add':{
                this.activateModal();
                break;
            }
            default:{
                break;
            }
        }
    }
    onSideClick = (value) =>{
        console.log('mid',value)
        if (value === true) {
            this.props.onSideClick(false);

        } else {
            this.props.onSideClick(true);
        }
    }
    ontoggleChange = (value) => {
        if (value === true) {
            this.props.toggleSplitScreen(false);

        } else {
            this.props.toggleSplitScreen(true);
        }
    };
    render(){
        if (!this.props.toolBar.toolbarData ) {
            return (<div>Getting Data</div>)
        }
        else {
            const modal = this.props.newEditDialog.dialogState ? <AddEditDialog/> : false;
            return (
                <div>
                    <AppToolbarCCFK
                        title={this.props.toolBar.toolbarData.pageTitle}
                        onToggle={this.ontoggleChange}
                        onSideClick={this.onSideClick}
                        onClick= {this.onIconButtonClick}
                    />
                    {modal}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return{
        toolBar: state.slfNfProfiletoolbar,
        newEditDialog: state.slfNfProfilenewEditDialog,
        toggleState:state.slfNfProfiledataGrid.toggleState,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getSplitScreenData,
        toggleSplitScreen,
        getToolBarData,
        setDialogType,
        setDialogState,
        addNewSlfNfProfileConfig,
        getAllData,
        onSideClick
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ToolBar);