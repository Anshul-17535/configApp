import axios from "axios";
import globals from "../../utils/config";
import messageInfo from "../../utils/resource_locale_default";
import {nfType} from '../../containers/splitScreenForm'
const url = `${globals.protocol}://${globals.host}/${globals.service}/${globals.rebasedurl}`;
const conurl = `${globals.protocol}://${globals.host}/${globals.service}/${globals.contexturl}`;

export const dataFetched = (responseData) => {

    let finalResponse = [];
    if(!!responseData) {
        Object.assign(responseData).forEach(element => {
            let objectFormed = {};
            Object.keys(element).forEach(function (key) {
                objectFormed[key] = element[key];
            });
            finalResponse.push(objectFormed);
        });
    }
    else {
        finalResponse = responseData;
    }
    return {
        type: "GET_ALL_RECORDS",
        payload: finalResponse
    }
}

export function getAllData() {
    const ModifiedUrl=nfType==="nrfp"?`${url}?nftype=nrfp`:`${url}/`
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
            dispatch(dataFetched(response.data));
        }).catch(({response}) => {
            dispatch(dataFetched(null));
            console.log("44,response ",response);
            if(!!response){
                if(!!response.data.title && response.data.title !== "SMErr006") {
                    dispatch(groupFetchErrored(response.data));
                    dispatch(setErrorOnCall(true));
                }
            }
            else {
                dispatch(groupFetchErrored());
                dispatch(setErrorOnCall(true));
            }
        });
   };
}

///Export Function needs this
//http://127.0.0.1:8082/config/scp/v1/rsv/rulesystemversion/getAllRuleTable
export function ExportAllData() {
    const ModifiedUrl=nfType==="nrfp"?`${url}?nftype=nrfp`:`${url}/getAllRuleTable`
    return (dispatch) => {
        axios({
            method: 'get',
            url: ModifiedUrl,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': global.authToken,
                'RequestSource': "GUI",
                'IpAddress': globals.host,
                'User': localStorage.getItem('userInfo')
            },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }
        ).then(response => {
            let successCode = "SMCode004";
            return Promise.all([
                dispatch({
                    type: "EXPORT_ALL_DATA",
                    payload: response.data
                })
            ])
        }).catch(({ response }) => {
            if (!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        })
    }
}

//POST A DATA --- IMPORT FUNCTIONALITY
//url is - http://127.0.0.1:8082/config/scp/v1/rsv/rulesystemversion/createbulkrsv
export function importrsv(postData){
    const ModifiedUrl=nfType==="nrfp"?`${url}?nftype=nrfp`:`${url}/createbulkrsv`
    return (dispatch) => {
        var hours = new Date().getHours(); //To get the Current Hours
        var min = new Date().getMinutes(); //To get the Current Minutes
        var sec = new Date().getSeconds(); //To get the Current Seconds
        console.log("TIME BEFORE IMPORT",hours,min,sec)
        dispatch(setSuccessFlag(false));
        axios({
                method: 'post',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            var hours = new Date().getHours(); //To get the Current Hours
            var min = new Date().getMinutes(); //To get the Current Minutes
            var sec = new Date().getSeconds(); //To get the Current Seconds
            console.log("SUCCESSFUL IMPORT AT",hours,min,sec)
                let successCode = "SMCode001";
                return Promise.all([
                    dispatch(setSuccessMessage(successCode)),
                    dispatch(setSuccessFlag(true)),
                    dispatch(getAllData()),
                    dispatch(ExportAllData())
                ]).then(listOfResults => {
                    return Promise.all([
                    ])
                });
        }).catch(({response}) => {
            var hours = new Date().getHours(); //To get the Current Hours
            var min = new Date().getMinutes(); //To get the Current Minutes
            var sec = new Date().getSeconds(); //To get the Current Seconds
            console.log("SUCCESSFUL IMPORT AT",hours,min,sec)
            console.log("FAILURE IMPORT AT",hours,min,sec)
            // console.log("THIS IMPORT ACTION IS FAILING")
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setimportOnCall(true));
            }
            else if(!!response) {
                dispatch({
                    type:"RSV_NAME_ERROR_STATE",
                    payload:true
                })
                dispatch(groupFetchErrored(response.data));
                dispatch(setimportOnCall(true));
            }
            else {
                dispatch(setimportOnCall(true));
                dispatch(groupFetchErrored());
            }
            dispatch(ExportAllData());
            dispatch(getAllData());
        });
    }
}

//Export One
//New API http://127.0.0.1:8082/config/scp/v1/rsv/rulesystemversion/ruletable/rsv-2
export function exportOne(rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}?nftype=nrfp`:`${url}/ruletable/${rsvName}`
    return (dispatch) => {
	dispatch(setSuccessFlag(false));
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(getAllData()),
                dispatch(ExportAllData()),
                dispatch({
                    type: "EXPORT_ONE_DATA",
                    payload: response.data
                })
            ]).then(listOfResults => {
                dispatch({
                        type : 'SET_DIALOG_STATE',
                        payload:false

                })
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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



export function addNewRecord(postData){
    const ModifiedUrl=nfType==="nrfp"?`${url}?nftype=nrfp`:`${url}/`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'post',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
    }
}
//For adding Rule Group
export function addNewRuleGroup(postData,rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}/ruletable?nftype=nrfp`:`${url}/${rsvName}/ruletable`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'post',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });
        }).catch(({response}) => {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            if(!!response && response.status === 400){
                dispatch(setnewgroup(true))
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
    }
}
//For ReOrdering Rule Group based on Rule Prioritization
export function reOrderRuleGroup(postData,rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}/ruletable?nftype=nrfp`:`${url}/${rsvName}/ruletable`
    console.log(postData,rsvName);
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'put',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });
        }).catch(({response}) => {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            if(!!response && response.status === 400){
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
    }
}
//Creating RSV
export function createRsv(postData){
    const ModifiedUrl=nfType==="nrfp"?`${url}?nftype=nrfp`:`${url}/`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'post',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
                let successCode = "SMCode001";
                return Promise.all([
                    dispatch(setSuccessMessage(successCode)),
                    dispatch(setSuccessFlag(true)),
                    dispatch(getAllData()),
                    dispatch(ExportAllData())
                ]).then(listOfResults => {
                    return Promise.all([
                        dispatch({
                            type: 'RSV_SAVE_BTN_CLICK_STATE',
                            payload :true
                        }),
                        dispatch({
                            type:"RSV_NAME_ERROR_STATE",
                            payload:false
                        })
                    ])


                });
        }).catch(({response}) => {
            if(!!response && response.status === 403){
                let errorResponse = {
                    title : "SMCode000"
                }
                dispatch(groupFetchErrored(errorResponse));
                dispatch(setErrorOnCall(true));
            }
            else if(!!response) {
                dispatch({
                    type:"RSV_NAME_ERROR_STATE",
                    payload:true
                })
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
            dispatch(getAllData());
            dispatch(ExportAllData());
        });
    }
}
export function ActivateState(rsvName,postData){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}?activate=true&nftype=nrfp`:`${url}/${rsvName}?activate=true`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'put',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
    }
}

export function InActivateState(rsvName,postData){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}?activate=false&nftype=nrfp`:`${url}/${rsvName}?activate=false`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'put',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
    }
}

export function updateRuleTable(postData,rsvName,RuleTableName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}/ruletable/${RuleTableName}?nftype=nrfp`:`${url}/${rsvName}/ruletable/${RuleTableName}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'put',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
    }
}

export function editRecord(rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}?nftype=nrfp`:`${url}/${rsvName}`
    return (dispatch) => {
	dispatch(setSuccessFlag(false));
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(getAllData()),
                dispatch(ExportAllData()),
                dispatch({
                    type: "STORE_DISPLAY_DATA",
                    payload: response.data
                })
            ]).then(listOfResults => {
                dispatch({
                        type : 'SET_DIALOG_STATE',
                        payload:true
                })
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
//RULES NAMES
export function assignRuleSetNames(rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}?nftype=nrfp`:`${url}/${rsvName}`
    return (dispatch) => {
	dispatch(setSuccessFlag(false));
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(getAllData()),
                dispatch(ExportAllData()),
                dispatch({
                    type: "ASSIGN_RULE_SET_NAMES",
                    payload: response.data
                })
            ]).then(listOfResults => {
                dispatch({
                    type: 'RULE_TRIGGER_FORM_DISPLAY_STATE',
                    payload :true
                })
            });
        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
//RULES NAME SAVING
export function storingRulesInState(rsvName,ruletable){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}/ruletable/${ruletable}?nftype=nrfp`:`${url}/${rsvName}/ruletable/${ruletable}`
    return (dispatch) => {
	dispatch(setSuccessFlag(false));
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(getAllData()),
                dispatch(ExportAllData()),
                dispatch({
                    type: "STORE_RULE_DATA_IN_STORE",
                    payload: response.data
                })
            ]).then(listOfResults => {
                dispatch({
                    type: 'RULE_GROUP_FORM_DISPLAY_STATE',
                    payload :true
                })
            });
        }).catch((response) => {
            console.log("901",response)
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
//THIS IS FOR VIEWING RELATED TO RSVNAME
export function viewRecord(rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}?nftype=nrfp`:`${url}/${rsvName}`
    return (dispatch) => {
	dispatch(setSuccessFlag(false));
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch(getAllData()),
                dispatch({
                    type: "VIEW_DISPLAY_DATA",
                    payload: response.data
                })
            ]).then(listOfResults => {
                dispatch({
                        type : 'SET_DIALOG_STATE',
                        payload:true

                })
            });
        }).catch(({response}) => {
            dispatch(getAllData());
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
                "mainTitle": errorId.detail,
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

export const setErrorOnCall = (setErrorValue) => {
    return {
        type: "SET_ERROR_DIALOG",
        payload: setErrorValue
    }
}

export const setnewgroup = (error) => {
    return {
        type: "SAME_TYPE_RULE_GROUP",
        payload: error
    }
}

export const setimportOnCall = (setErrorValue) => {
    return {
        type: "SET_IMPORT_ERROR",
        payload: setErrorValue
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
//THIS IS FOR DELETING RECORD USING RSVNAME
export function deleteRecord(rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}?nftype=nrfp`:`${url}/${rsvName}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'delete',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode002";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });

        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
    }
}
//THIS IS FOR DELETING RULE GROUP RECORD USING RSVNAME
export function deleteRuleGroup(ruleGroupName,rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}/ruletable/${ruleGroupName}?nftype=nrfp`:`${url}/${rsvName}/ruletable/${ruleGroupName}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'delete',
                url: ModifiedUrl,
                     headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode002";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });

        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
    }
}

export function deleteTrigGroup(TrigArr,rsvName){
    const ModifiedUrl=nfType==="nrfp"?`${url}/${rsvName}/ruletable/deleteAll?nftype=nrfp`:`${url}/${rsvName}/ruletable/deleteAll`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'delete',
                url: ModifiedUrl,
                data:TrigArr,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode002";
            return Promise.all([
                dispatch(setSuccessMessage(successCode)),
                dispatch(setSuccessFlag(true)),
                dispatch(getAllData()),
                dispatch(ExportAllData())
            ]).then(listOfResults => {
            });

        }).catch(({response}) => {
            dispatch(getAllData());
            dispatch(ExportAllData());
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
    }
}

export const resultContextData=(postData)=>{
    const ModifiedUrl=nfType==="nrfp"?`${conurl}/resultcontextmap?nftype=nrfp`:`${conurl}/resultcontextmap`
    // http://127.0.0.1:8081/config/nscp/v192/rulesystemversion/resultcontextmap
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'post',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(getAllData()),
                dispatch(ExportAllData()),
                dispatch({
                    type: "GET_RESULT_CONTEXT",
                    payload: response.data,
		                trigger:postData["ruleSetTypes"][0]
                })
            ]).then(listOfResults => {
                dispatch({
                    type:"MODIFIED_RESULT_CONTEXT"
                })
            });
        }).catch((response) => {
	        console.log("902",response)
            dispatch(setErrorOnCall(true));
            dispatch(groupFetchErrored());
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
export const sourceContextData=(postData)=>{
    const ModifiedUrl=nfType==="nrfp"?`${conurl}/sourcecontextmap?nftype=nrfp`:`${conurl}/sourcecontextmap`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
                method: 'post',
                url: ModifiedUrl,
                data:postData,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode001";
            return Promise.all([
                dispatch(getAllData()),
                dispatch(ExportAllData()),
                dispatch({
                    type: "GET_SOURCE_CONTEXT",
                    payload: response.data,
		                trigger:postData["ruleSetTypes"][0]
                })
            ]).then(listOfResults => {
                dispatch({
                    type:"MODIFIED_SOURCE_CONTEXT"
                })
            });
        }).catch((response) => {
	          console.log("903",response)
            dispatch(setErrorOnCall(true));
            dispatch(groupFetchErrored());
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
export function GetHttpHeader() {

    return (dispatch) => {
        axios({
            method: 'get',
            url: conurl+"/headerdatatypeinfo",
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': global.authToken,
                'RequestSource': "GUI",
                'IpAddress': globals.host,
                'User': localStorage.getItem('userInfo')
            },
            timeout: 30000,
            withCredentials: false, // default
            maxContentLength: 2000
        }
        ).then(response => {
            let successCode = "SMCode004";
            return Promise.all([
                dispatch({
                    type: "GET_HTTP_HEADER",
                    payload: response.data
                })
            ])
        }).catch(({ response }) => {
            if (!!response) {
                dispatch(groupFetchErrored(response.data));
                dispatch(setErrorOnCall(true));
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        })
    }
}

export function GetRulePluginSequence(){
    const ModifiedUrl=nfType==="nrfp"?`${url}/ruletag?nftype=nrfp`:`${url}/ruletag`
    return (dispatch) => {
        axios({
                method: 'get',
                url: ModifiedUrl,
                headers: {
                    'Content-type': 'application/json',
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
            let successCode = "SMCode003";
            return Promise.all([
                dispatch({
                    type: "GET_PLUGIN_SEQUENCE",
                    payload: response.data
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
    }
}



