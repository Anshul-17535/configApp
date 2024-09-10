import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppToolbarCCFK from '../../ccfk-components/AppToolbarCCFK';
import {bindActionCreators} from "redux";
import AddEditDialog from '../../containers/tracingprofile/addEditDialog';
import {getSplitScreenData,toggleSplitScreen} from '../../actions/splitScreenOptions';
import {getEDRFieldByType,getAllData,getDest1Name,getDest2Name,getDest3Name,getDest4Name,getDest5Name} from '../../actions/tracingprofile/commonservices';
import {getToolBarData ,setDialogType,setDialogState,setDialogState2,setDialogState3,addNewThrottlingData} from '../../actions/tracingprofile';
import {onSideClick} from '../../actions/rulesengine'


class ToolBar extends Component {
    constructor(props){
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
        this.props.addNewThrottlingData();
        this.props.setDialogType('new');
        this.props.setDialogState(true);
        this.props.setDialogState2(false);
        this.props.setDialogState3(false);
    };

    componentWillMount() {
        this.props.getAllData()
        this.props.getSplitScreenData();
        this.props.getDest1Name()
        this.props.getDest2Name()
        this.props.getDest3Name()
        this.props.getDest4Name()
        this.props.getDest5Name()
        this.props.getEDRFieldByType()
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
                        onClick= {this.onIconButtonClick}
                        onSideClick={this.onSideClick}
                    />
                    {modal}
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return{
        toolBar: state.tcptoolbar,
        newEditDialog: state.tcpnewEditDialog,
        toggleState:state.tcpdataGrid.toggleState,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        setDialogType,
        getToolBarData,
        toggleSplitScreen,
        getSplitScreenData,
        addNewThrottlingData,
        getAllData,
        getEDRFieldByType,
        getDest1Name,
        getDest2Name,
        getDest3Name,
        getDest4Name,
        getDest5Name,
        setDialogState2,
        setDialogState3,
        onSideClick
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ToolBar);