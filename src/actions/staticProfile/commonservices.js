import axios from "axios";
import globals from "../../utils/config";
import messageInfo from "../../utils/resource_locale_default";
const url = `${globals.protocol}://${globals.host}/${globals.service}/${globals.staticGetOnNFtype}`;
const url2 = `${globals.protocol}://${globals.host}/${globals.service}/${globals.staticProf}`;

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
        type: "GET_ALL_STAT_RECORDS",
        payload: finalResponse
    }
}

export const setSuccessFlag = (setSuccessFlag) => {
    return {
        type: "SET_SUCCESS_STAT_FLAG",
        payload: setSuccessFlag
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
        type: "FETCH_STAT_ERROR",
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
        type: "SET_SUCCESS_STAT_MESSAGE",
        payload: dataObject
    }
}

export const setErrorOnCall = (setErrorValue) => {
    return {
        type: "SET_ERROR_STAT_DIALOG",
        payload: setErrorValue
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
                    type:"SET_ALL_STAT_CONFIG_DATA",
                    payload:response.data
                })
            ])
        }).catch(({response})=> {
            const abc=[]
            if(!!response) {
                if(response.data.title === 'SMErr006') {
                    return Promise.all([
                        dispatch(dataFetched(abc)),
                        dispatch({
                            type:"SET_ALL_STAT_CONFIG_DATA",
                            payload:abc
                        })
                    ])
                }
                else{
                    dispatch(groupFetchErrored(response.data));
                    dispatch(setErrorOnCall(true));
                }
            }
            else {
                dispatch(setErrorOnCall(true));
                dispatch(groupFetchErrored());
            }
        });
   };
}

export const setimportOnCall = (setErrorValue) => {
    return {
        type: "SET_STAT_IMPORT_ERROR",
        payload: setErrorValue
    }
}

export function exportOne(statName){
    const ModifiedUrl=`${url2}?nfInstanceId=${statName}`
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
                    type: "EXPORT_STAT_ONE_DATA",
                    payload: response.data
                })
            ]).then(listOfResults => {
                dispatch({
                        type : 'SET_DIALOG_STATE',
                        payload:false

                })
            });
        }).catch(({response}) => {
            // dispatch(getAllData());
            // if(!!response) {
            //     dispatch(groupFetchErrored(response.data));
            //     dispatch(setErrorOnCall(true));
            // }
            // else {
            //     dispatch(setErrorOnCall(true));
            //     dispatch(groupFetchErrored());
            // }
        });
    }
}

export function importStaticProf(postData){
    const ModifiedUrl=`${url2}/createbulkprofiles`
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
                dispatch(groupFetchErrored(response.data));
                dispatch(setimportOnCall(true));
            }
            else {
                dispatch(setimportOnCall(true));
                dispatch(groupFetchErrored());
            }
            dispatch(getAllData());
        });
    }
}

export function ExportAllStatData(nftype) {
    const ModifiedUrl= nftype === 'GLOBAL'?`${url}`:`${url}?nfType=${nftype}`
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
                    type: "EXPORT_ALL_STAT_DATA",
                    payload: response.data
                }),
                dispatch({
                    type:'EXPORT_ALL_STAT_ERROR',
                    payload:false
                })
            ])
        }).catch(({ response }) => {
            dispatch({
                type:'EXPORT_ALL_STAT_ERROR',
                payload:true
            })
            // if (!!response) {
            //     dispatch(groupFetchErrored(response.data));
            //     dispatch(setErrorOnCall(true));
            // }
            // else {
            //     dispatch(setErrorOnCall(true));
            //     dispatch(groupFetchErrored());
            // }
        })
    }
}

export function createStatProfConfig(staticProf){
    const ModifiedUrl=`${url2}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'post',
            url: ModifiedUrl,
            data:staticProf,
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


export function updateStatProfConfig(staticProf){
    const ModifiedUrl=`${url2}`
    return (dispatch) => {
        dispatch(setSuccessFlag(false));
        axios({
            method: 'put',
            url: ModifiedUrl,
            data:staticProf,
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

export function deleteStatProfConfig(configName){
    const ModifiedUrl=`${url2}?nfInstanceId=${configName}`
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

export function deleteStatProfByNFtypeConfig(nftype){
    const ModifiedUrl=`${url2}/deletebulkprofiles?nfType=${nftype}`
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
