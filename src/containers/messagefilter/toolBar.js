import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppToolbarCCFK from '../../ccfk-components/AppToolbarCCFK';
import {bindActionCreators} from "redux";
import AddEditDialog from '../../containers/messagefilter/addEditDialog';
import {getAllData,setListContextForAttributes,setListContextForActions,getDest1Name,getDest3Name,getDest2Name} from '../../actions/messagefilter/commonServices';
import {getSplitScreenData,toggleSplitScreen} from '../../actions/splitScreenOptions';
import {getToolBarData ,setDialogType,setDialogState,addNewTracingConfigData} from '../../actions/messagefilter';
import {onSideClick} from '../../actions/rulesengine'

// var srv;

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

        this.props.setDialogType('new');
        this.props.setDialogState(true);
        this.props.setListContextForAttributes()
        this.props.setListContextForActions()
        this.props.addNewTracingConfigData();

    };

    componentWillMount() {
        this.props.getAllData();
        this.props.getDest1Name()
        this.props.getDest2Name()
        this.props.getDest3Name()
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
        toolBar: state.mftoolbar,
        newEditDialog: state.mfnewEditDialog,
        toggleState:state.mfdataGrid.toggleState,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        setDialogState,
        setDialogType,
        // newRecordData,
        // updateRecordData,
        getAllData,
        getToolBarData,
        toggleSplitScreen,
        getSplitScreenData,
        addNewTracingConfigData,
        setListContextForAttributes,
        setListContextForActions,
        getDest1Name,
        getDest3Name,
        getDest2Name,
        onSideClick
        // ViewMode
    
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(ToolBar);