/* eslint-disable */

import axios from "axios";
import globals from "../../utils/config";
import messageInfo from "../../utils/resource_locale_default";
import {returnQueryName,returnDeleteMapConfigAction} from "../../containers/slfDestinationMap/helpers";
const url = `${globals.protocol}://${globals.host}/${globals.service}/${globals.destinationmapurl}`;
const nfserviceurl=`${globals.protocol}://${globals.host}/${globals.service}/${globals.nfserviceurl}`;
const nfprofileurl=`${globals.protocol}://${globals.host}/${globals.service}/${globals.nfprofileurl}`;


export const dataFetched = (responseData) => {

  let finalResponse = [];
  if(!!responseData) {
    finalResponse=responseData.destinationMap.DestMapList
  }
  return {
      type: "GET_ALL_RECORDS_DESTINATIONMAP",
      payload: finalResponse
  }
}

export const resetMapLoadingState=()=>{
  return {
      type:'RESET_MAP_LOADING_STATE'
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


export const setSuccessFlag = (setSuccessFlag) => {
    return {
        type: "SET_SUCCESS_FLAG",
        payload: setSuccessFlag
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

export const setErrorOnCall = (setErrorValue) => {
    return {
        type: "SET_ERROR_DIALOG",
        payload: setErrorValue
    }
}

export const getAllNfServiceData=()=>{
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
                dispatch({
                    type:"SET_MODIFIED_NFSERVICE_SET_ID_LIST",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
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

export function createDestinationMapConfig(destinationMapConfig){
  const ModifiedUrl=`${url}?operation=POST`
  return (dispatch) => {
      dispatch(setSuccessFlag(false));
      axios({
          method: 'post',
          url: ModifiedUrl,
          data:destinationMapConfig,
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
      }).catch(({response})=> {
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

export function updateDestinationMapConfig(destinationMapConfig){
  const ModifiedUrl=url
  return (dispatch) => {
      dispatch(setSuccessFlag(false));
      axios({
          method: 'put',
          url: ModifiedUrl,
          data:destinationMapConfig,
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
      }).catch(({response})=> {
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

export function deleteDestinationMapConfig(destinationId,mapPattern){
    
  const ModifiedUrl=`${url}/${destinationId}?Type=${returnQueryName(mapPattern)}`
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
      }).catch(({response})=> {
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

export function deleteIndividualMapConfig(individualMapConfig,Index){
  
  const ModifiedUrl=`${url}/?operation=DELETE`
  return (dispatch) => {
      dispatch(setSuccessFlag(false));
      axios({
          method: 'post',
          url: ModifiedUrl,
          data:individualMapConfig,
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
              dispatch(getAllData()),
              dispatch({
                type:returnDeleteMapConfigAction(individualMapConfig.destinationMap.DestMapList[0].mapPattern),
                Index
              }),
              dispatch({
                type:"SET_MAP_LOADING_STATE",
                payload:Index,
                operation:"delete"
              })
              ])
      }).catch(({response})=> {
          dispatch(resetMapLoadingState())
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


export const getAllNfProfileData=()=>{
  const ModifiedUrl=`${nfprofileurl}`
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
                dispatch({
                    type:"SET_MODIFIED_RELATED_LISTS",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
          if(!!response) {
              dispatch(groupFetchErrored(response.data));
              dispatch(setErrorOnCall(true));
          }
          else {
              dispatch(setErrorOnCall(true));
              dispatch(groupFetchErrored());
          }
      });

    }
}

export function getAllData() {
  const ModifiedUrl=`${url}`
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
                  type:"SET_ALL_DESTINATION_MAP_DATA",
                  payload:response.data
              })
          ])
      }).catch(({response})=> {
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
