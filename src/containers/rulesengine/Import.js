import React, { Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import DialogCCFK from '../../ccfk-components/DialogCCFK';
import ButtonCCFK from '../../ccfk-components/ButtonCCFK';
import { importrsv } from '../../actions/rulesengine/commonServices';
import "../../styles/rulesEngine/Import.css";
import {setImportDialog,importAlertState,saveState} from '../../actions/rulesengine/index';
import ImportRSVCCFK from '../../ccfk-components/ImportRSVCCFK';
import AlertMessage from "@nokia-csf-uxr/ccfk/Alert/AlertMessage"


let AllData=[];
let rsvsname=[];
class Import extends Component
{

    componentWillMount(){
       this.props.importAlertState(true);
    }

 dataCounter=(someString)=>{
    let count=0,index=0;
    let checkstring="ruleGroupTables";
    while ((index = someString.indexOf(checkstring,index)) != -1 ){
        count++;
        index++;
    }
    return count
}


newfunc=(e)=>{
    let reader=new FileReader();
    reader.readAsText(e);
    reader.onload=()=>{
        let ans=reader.result;
        let counter=this.dataCounter(ans);
        console.log(counter,ans)
        if(counter===1&&ans[0]!=='['){
            ans='['+ans+']';
        }
        if(counter!=0){
            AllData=JSON.parse(ans)
            this.props.saveState(true)
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
        this.props.importrsv(AllData)
        this.props.setImportDialog(false);
        this.props.saveState(false)
    }
    
    HandleCancel=()=>{
        this.props.importAlertState(false);
        this.props.setImportDialog(false);
        this.props.saveState(false)
    }
    


    onClose=()=>{
        this.props.importAlertState(false);
        this.props.setImportDialog(false);
        this.props.saveState(false)

    }

    errormessage=()=>{
        if(!this.props.datagrid.saveState){return(
            <div style={{display:'flex',paddingTop:'2%',justifyContent:'center'}}>   
                <AlertMessage variant="WARNING" message="UPLOAD A TEXT FILE IN JSON FORMAT" />
            </div>
        )}
        if(this.props.datagrid.saveState){return(
            <div style={{display:'flex',paddingTop:'2%',justifyContent:'center'}}>
                <AlertMessage message="     YOUR FILE IS READY FOR IMPORT" />
            </div>
        )}
        
    }

    delfunc=(e)=>{
        if(e===false){
        this.props.saveState(e)
        }
    }

    render(){
        return(
    <DialogCCFK
        title={"Import Rule System Version"}
        onClose={()=>{this.onClose()}}
        renderFooter={this.renderFooter}
        dialogStyle={{
            "content": {
                "top":"10%",
                "bottom":"10%",
                "height": "80%",
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
        datagrid: state.redataGrid,
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        importrsv,
        setImportDialog,
        importAlertState,
        saveState
    }, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Import);