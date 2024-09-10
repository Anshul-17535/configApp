import React, { Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import { importStaticProf } from '../../actions/staticProfile/commonservices';
import "../../styles/rulesEngine/Import.css";
import {setStatImportDialog,importAlertState,saveState} from '../../actions/staticProfile/index';
import AlertMessage from "@nokia-csf-uxr/ccfk/Alert/AlertMessage"
import ImportRSVCCFK from '../../ccfk-components/ImportRSVCCFK';


let AllData=[];
class Import extends Component
{
    constructor(props){
        super(props)
        this.state={
            errorOnImport:false
        }
    }

    
    componentWillMount(){
       this.props.importAlertState(true);
    }


    newfunc=(e)=>{
        let reader=new FileReader();
        reader.readAsText(e);
        reader.onload=()=>{
            let ans=reader.result;
            if(!!ans){
                if(ans[0]!=='['){
                    ans='['+ans+']';
                }
                try{
                    AllData=JSON.parse(ans)
                    this.props.saveState(true)
                    this.setState({errorOnImport:false},()=>{})
                }
                catch(error){
                    this.setState({errorOnImport:true},()=>{})
                    console.log("Error on import",error,this.state.errorOnImport)
                }
            }
        }   
    }

    renderFooter=()=>{
        
        return(
            <div>
                <ButtonCCFK text="SAVE" disabled={!this.props.datagrid.saveState} onClick={this.HandleSave} variant="call-to-action" />
                <ButtonCCFK text="CANCEL" onClick={this.HandleCancel}/>
            </div>
        )
    }
    
    HandleSave=()=>{
        this.props.importStaticProf(AllData)
        this.props.setStatImportDialog(false);
        this.props.saveState(false)
    }
    
    HandleCancel=()=>{
        this.props.importAlertState(false);
        this.props.setStatImportDialog(false);
        this.props.saveState(false)
    }
    


    onClose=()=>{
        this.props.importAlertState(false);
        this.props.setStatImportDialog(false);
        this.props.saveState(false)

    }

    errormessage=()=>{
        if(!this.props.datagrid.saveState){
            return(<div style={{display:'flex',paddingTop:'2%',justifyContent:'center'}}>   
            <AlertMessage variant="WARNING" message={this.state.errorOnImport?"UPLOADED FILE IS NOT OF PROPER FORMAT":"UPLOAD A TEXT FILE IN JSON FORMAT"} />
            </div>)
        }
        if(this.props.datagrid.saveState){
            return(<div style={{display:'flex',paddingTop:'2%',justifyContent:'center'}}>   
            <AlertMessage message="YOUR FILE IS READY FOR IMPORT" />
            </div>)

        }
        
    }

    delfunc=(e)=>{
        if(e===false){
        this.props.saveState(e)
        this.setState({errorOnImport:false},()=>{})
        }
    }

    render(){
        return(
    <DialogCCFK
        title={"Import Static Profiles"}
        onClose={()=>{this.onClose()}}
        renderFooter={this.renderFooter}
        dialogStyle={{
            "content": {
                "top":"13%",
                "bottom":"17%",
                "height": "70%",
                "left": "15%",
                "right": "15%",
                "width": "70%"
                }
        }}
        footerStyle={{"display":"flex","justifyContent":"center"}}
        >      
        <div className="ImportForm">
        <ImportRSVCCFK
                           label='IMPORT'
                           onChange={(e)=>{this.newfunc(e)}}
                           onChange2={(e)=>{this.delfunc(e)}}
        />
        {this.props.datagrid.importAlertDialog && this.errormessage()}
        </div>
    </DialogCCFK>
    )}
}

function mapStateToProps(state) {
    return{
        datagrid: state.statprofnewEditDialog
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        importStaticProf,
        setStatImportDialog,
        importAlertState,
        saveState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Import);