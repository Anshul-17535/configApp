/* eslint-disable */

import axios from "axios";
import globals from "../../utils/config";
import messageInfo from "../../utils/resource_locale_default";
const nfserviceurl=`${globals.protocol}://${globals.host}/${globals.service}/${globals.nfserviceurl}`;
let _ = require('underscore');

export const setSuccessFlag = (setSuccessFlag) => {
    return {
        type: "SET_SUCCESS_FLAG",
        payload: setSuccessFlag
    }
}

export const dataFetched = (responseData) => {

    let finalResponse = [];
    if(!!responseData) {
      finalResponse=_.pluck(responseData, 'nfService')
    }
    return {
        type: "GET_ALL_RECORDS_SLF_NFSERVICE",
        payload: finalResponse
    }
  }

export const setErrorOnCall = (setErrorValue) => {
    return {
        type: "SET_ERROR_DIALOG",
        payload: setErrorValue
    }
}

export const groupFetchErrored = (errorId) => {
    let dataObject;
    if(!!errorId) {
        if(!!errorId.title) {
            dataObject = messageInfo.find(function (element) {
                return errorId.title.toLowerCase() === element.responseCode.toLowerCase();
            });
        }
        let concatenatedMessage = " ";
        if (!!errorId.invalidParams && errorId.invalidParams.length > 0 && !!dataObject) {
            errorId.invalidParams.forEach(function (elt) {
                let messageFromFile = messageInfo.find(function (element) {
                    return elt.errorcode.toLowerCase() === element.responseCode.toLowerCase();
                });
                if (!!messageFromFile) {
                    concatenatedMessage = concatenatedMessage + '\n' + elt.param + ":  " + messageFromFile.description;
                }
            });
            dataObject.moreDetails = concatenatedMessage;
        }
        if(dataObject === undefined){
            dataObject = {
                "responseCode": errorId.title,
                "mainTitle": !!errorId.detail?errorId.detail:"Error!",
                "description": errorId.cause,
                "moreDetails": ""
            }
            if (!!errorId.invalidParams && errorId.invalidParams.length > 0) {
                errorId.invalidParams.forEach(function (elt) {
                    concatenatedMessage = concatenatedMessage + '\n' + elt.param + ":  " + elt.reason;
                });
            }
            dataObject.moreDetails = concatenatedMessage;
        }
    }
    if (dataObject === undefined && errorId === undefined ) {
        dataObject = {
            "responseCode": "SM_0123",
            "mainTitle":"Unknown Error from Server",
            "description":"",
            "moreDetails": ""
        }
    }
    return {
        type: "FETCH_ERROR",
        payload: dataObject
    }
  }

export const setSuccessMessage = (setsuccessCode) => {
    let dataObject = messageInfo.find(function(element) {
        return setsuccessCode === element.responseCode ;
    });
    if(dataObject === ""){
        dataObject = {
            "responseCode": "SM_0123",
            "mainTitle":"Unknown Error from Server",
            "description":"",
            "moreDetails": ""
        }
    }
    return {
        type: "SET_SUCCESS_MESSAGE",
        payload: dataObject
    }
  }

export function createNfServiceConfig(NfServiceConfig){
    const ModifiedUrl=`${nfserviceurl}?operation=POST`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'post',
            url: ModifiedUrl,
            data:NfServiceConfig,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch({
                  type : 'SET_DIALOG_STATE',
                  payload:false
                })
                ])
        }).catch(({response}) => {
          if(!!response && response.status === 403){
            let errorResponse = {
                title : "SMCode000"
            }
            dispatch(groupFetchErrored(errorResponse));
            dispatch(setErrorOnCall(true));
        }
        else if(!!response) {
            dispatch(groupFetchErrored(response.data));
            dispatch(setErrorOnCall(true));
        }
        else {
            dispatch(setErrorOnCall(true));
            dispatch(groupFetchErrored());
        }
  
        });
   };
  }
  
  export function updateNfServiceConfig(NfServiceConfig){
    const ModifiedUrl=`${nfserviceurl}?operation=POST`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'put',
            url: ModifiedUrl,
            data:NfServiceConfig,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch({
                  type : 'SET_DIALOG_STATE',
                  payload:false
                })
                ])
        }).catch(({response}) => {
          if(!!response && response.status === 403){
            let errorResponse = {
                title : "SMCode000"
            }
            dispatch(groupFetchErrored(errorResponse));
            dispatch(setErrorOnCall(true));
        }
        else if(!!response) {
            dispatch(groupFetchErrored(response.data));
            dispatch(setErrorOnCall(true));
        }
        else {
            dispatch(setErrorOnCall(true));
            dispatch(groupFetchErrored());
        }
  
        });
   };
  }

  export function getAllData() {
    const ModifiedUrl=`${nfserviceurl}`
    return (dispatch) => {
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {'Content-type':'application/json',
                    'Accept': 'application/json',
                    'Authorization':  global.authToken,
                    'RequestSource':"GUI",
                    'IpAddress':globals.host,
                    'User':localStorage.getItem('userInfo')
                },
                timeout: 30000,
                withCredentials: false, // default
                maxContentLength: 2000
            }
        ).then(response => {
            return Promise.all([
                dispatch(dataFetched(response.data)),
                dispatch({
                    type:"SET_ALL_SLF_NFSERVICE_DATA",
                    payload:response.data
                })
            ])
        }).catch(({response}) => {
              if(!!response) {
                  dispatch(groupFetchErrored(response.data));
                  dispatch(setErrorOnCall(true));
              }
              else {
                  dispatch(setErrorOnCall(true));
                  dispatch(groupFetchErrored());
              }
            
        });
   };
  }
  
  export function deleteSlfNfServiceConfig(ServiceInstanceId){
    
    const ModifiedUrl=`${nfserviceurl}/${ServiceInstanceId}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'delete',
            url: ModifiedUrl,
            headers: {'Content-type':'application/json',
                'Accept': 'application/json',
                'Authorization':  global.authToken,
                'RequestSource':"GUI",
                'IpAddress':globals.host,
                'User':localStorage.getItem('userInfo')
                },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }).then(response => {
            let successCode = "SMCode002";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData())
                ])
        }).catch(({response}) => {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if(!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
   };
  }