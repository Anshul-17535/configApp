import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInputCCFK from '../../ccfk-components/TextInputCCFK';
import ProgressIndicatorCircularCCFK from '../../ccfk-components/ProgressIndicatorCircularCCFK';
import IconButtonCCFK from '../../ccfk-components/IconButtonCCFK';
import DeleteIcon from '@nokia-csf-uxr/ccfk-assets/legacy/DeleteIcon';
import CheckCircleIcon from '@nokia-csf-uxr/ccfk-assets/legacy/CheckCircleIcon';
import WarningIcon from '@nokia-csf-uxr/ccfk-assets/legacy/WarningIcon';
import { UpdateRuleEditor, UpdateRuleName, DeleteRules, RuleNameUpdate, RuleStatus, RuleContentUpdate, RuleSaveBtnDisabledState } from "../../actions/rulesengine";
import { bindActionCreators } from "redux";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { AndOrRuleValidation, ConditionValidation, ActionValidation } from './HelperFunctions'
import "../../styles/rulesEngine/RuleDisplay.css";
import { string } from 'prop-types';
import { head } from 'underscore';
let editorObject;
let _ = require('underscore');
let srv;
let wordList = [];
let operatorSymbols = ["==", "!=", ">", ">=", "<", "<=", "present", "!present", "~=", "!~=", "match_substring", "!match_substring"];
let operatorLong = ["==", "!=", ">", ">=", "<", "<=", "present", "!present"]
let operatorString = ["present", "!present", "==", "!=", "~=", "!~=", "match_substring", "!match_substring"]
let MathematicalOperators = [">", ">=", "<", "<="];
class RuleDisplay extends Component {

    constructor(props) {
        super(props);
        srv = this;
    }

    handleRuleNameChange = (value, i) => {
        srv.props.RuleNameUpdate(value, i);
        srv.props.CheckSaveBtnDisabledState();
        this.forceUpdate();
    }

    componentDidUpdate() {
        editorObject.editor.renderer.updateFull();
    }

    HandleDeleteRule = (ind) => {
        srv.props.DeleteRules(ind);
        srv.props.HandledeleteFunction();
        srv.props.CheckSaveBtnDisabledState();

    }
    previousToken = (rule, currCol, cond) => {
        if (currCol >= 0) {
            let tok = "";
            let i = currCol - 1;
            while (i !== -1 && rule[i] && rule[i] !== cond) {
                tok += rule[i];
                i--;
            }
            return tok.split("").reverse().join("");
        } else {
            return ""
        }
    }

    handleHttpHeaderfunc = (name) => {
        let headersdata=this.props.Headersdata;
        let headerName=name.toLowerCase();
        let headerType=headersdata[headerName]
        if (headerType===undefined)
        {
            return(0)
        }
        else if (headerType!==undefined)
        {
            return(headerType.toLowerCase())
        }
    }


    previousSecondToken = (rule, currCol, cond) => {
        try {
            let tok = "";
            let times = 2;
            let i = currCol - 1;
            while (i !== -1 && times !== 0) {
                if (rule[i] === cond) {
                    times -= 1;
                }
                if (times === 1) {
                    tok += rule[i];
                }

                i--;
            }
            return tok.split("").reverse().join("").trim();
        } catch {

        }
    }



    SpaceReturnFunc = (w, t, wordlist) => {
        let res = "";
        let adjustVal = wordlist.length > 8 ? 40 : 43;
        for (let i = 0; i < adjustVal - w.length - t.length; i++) {
            res += " ";
        }

        return res
    }

    handleRuleChange = (e, i) => {
        let cursorRowPos = editorObject.editor.selection.getCursor();
        srv.props.RuleContentUpdate(e, i);

        this.handleAutoComplete(e, cursorRowPos)
        let r = this.props.TempRuleObjValueProp[i].rule.trim();
        srv.props.RuleStatus("", i);
        if (r.includes("if ") && r.includes("then ")) {
            r = r.slice(0, 2) + "\n" + r.slice(2, r.search(/then /) + 4) + "\n" + r.slice(r.search(/then /) + 4)
        } else {
            r = "if" + "\n" + "then" + "\n" + r
        }
        let Rarr = r.split("\n")

        Rarr = Rarr.map(el => el.trim());

        let ruleStartsWithIfCond = Rarr[0] === "if";
        let ruleContainsThenCond = Rarr.indexOf("then") < Rarr.length - 1;

        let RarrConditions = Rarr.slice(1, Rarr.indexOf("then"))
        let RarrActions = Rarr.slice(Rarr.indexOf("then") + 1)
        let AndOrRuleValidationCondition = false;
        let ConditionValidationValue = true;
        let ActionValidationValue = true;

        let time = 10;
        setTimeout(function () {
            try {
                if (ruleStartsWithIfCond && ruleContainsThenCond && RarrConditions.length > 0) {
                    AndOrRuleValidationCondition = AndOrRuleValidation(RarrConditions, RarrActions);
                    ConditionValidationValue = ConditionValidation(RarrConditions, operatorSymbols, MathematicalOperators, srv.props.sourcecontextObj);
                    ActionValidationValue = ActionValidation(RarrActions, srv.props.resultcontextObj, srv.props.sourcecontextObj);

                    if (ConditionValidationValue && ActionValidationValue && AndOrRuleValidationCondition) {
                        srv.props.RuleStatus("pass", i);
                    } else {
                        srv.props.RuleStatus("fail", i);
                    }
                }
                else {
                    AndOrRuleValidationCondition = AndOrRuleValidation(RarrConditions, RarrActions);
                    ActionValidationValue = ActionValidation(RarrActions, srv.props.resultcontextObj, srv.props.sourcecontextObj);

                    if (ActionValidationValue && AndOrRuleValidationCondition) {
                        srv.props.RuleStatus("pass", i);
                    } else {
                        srv.props.RuleStatus("fail", i);
                    }
                }
                srv.forceUpdate()
            }
            catch {
                srv.props.RuleStatus("fail", i);
                srv.forceUpdate()
            }
            srv.props.CheckSaveBtnDisabledState();
        }, time);
    }

    ReturnConditionCaption = (ConditionPartOfRule, word, sourcecontextObj, wordList, cursorRowPos) => {
        let PreviousTokenTillSpace = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, " ").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillComma = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, ",").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillOpenRoundBracket = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, "(").replace(/\[[0-9]+\]/g, "")
        if (!!sourcecontextObj[PreviousTokenTillSpace + "." + word] && sourcecontextObj[PreviousTokenTillSpace + "." + word].att !== "BASE") {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillSpace + "." + word].rvt, wordList) + sourcecontextObj[PreviousTokenTillSpace + "." + word].rvt
        } else if (!!sourcecontextObj[PreviousTokenTillSpace + "." + word] && sourcecontextObj[PreviousTokenTillSpace + "." + word].att === "BASE") {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillSpace + "." + word].att, wordList) + sourcecontextObj[PreviousTokenTillSpace + "." + word].att
        }
        else if (!!sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word] && sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].att !== "BASE") {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].rvt, wordList) + sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].rvt
        } else if (!!sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word] && sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].att === "BASE") {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].att, wordList) + sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].att
        }
        else if (!!sourcecontextObj[PreviousTokenTillComma + "." + word] && sourcecontextObj[PreviousTokenTillComma + "." + word].att !== "BASE") {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillComma + "." + word].rvt, wordList) + sourcecontextObj[PreviousTokenTillComma + "." + word].rvt
        }
        else if (!!sourcecontextObj[PreviousTokenTillComma + "." + word] && sourcecontextObj[PreviousTokenTillComma + "." + word].att === "BASE") {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillComma + "." + word].att, wordList) + sourcecontextObj[PreviousTokenTillComma + "." + word].att
        }
    }

    ReturnConditionValue = (ConditionPartOfRule, word, sourcecontextObj, cursorRowPos) => {
        let PreviousTokenTillSpace = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, " ").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillComma = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, ",").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillOpenRoundBracket = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, "(").replace(/\[[0-9]+\]/g, "")


        if (word === "then") {
            return `\n${word}`
        } else if (["AND", "OR"].includes(PreviousTokenTillSpace.trim())) {
            return `\n   ${word}`
        } else if (!!sourcecontextObj[PreviousTokenTillSpace + "." + word] && sourcecontextObj[PreviousTokenTillSpace + "." + word].att === "BASE") {
            return word + "[]"
        } else if (!!ConditionPartOfRule.includes("(") && !!sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word] && sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].att === "BASE") {
            return word + "[]"
        } else if (!!ConditionPartOfRule.includes(",") && !!sourcecontextObj[PreviousTokenTillComma + "." + word] && sourcecontextObj[PreviousTokenTillComma + "." + word].att === "BASE") {
            return word + "[]"
        } else {
            return word
        }
    }

    ReturnActionCaption = (ActionPartOfRule, word, sourcecontextObj, wordList, resultcontextObj, cursorRowPos) => {
        let PreviousTokenTillSpace = srv.previousToken(ActionPartOfRule, cursorRowPos.column, " ").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillComma = srv.previousToken(ActionPartOfRule, cursorRowPos.column, ",").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillOpenRoundBracket = srv.previousToken(ActionPartOfRule, cursorRowPos.column, "(").replace(/\[[0-9]+\]/g, "")
        if (!!resultcontextObj[PreviousTokenTillSpace + "." + word]) {
            return srv.SpaceReturnFunc(word, resultcontextObj[PreviousTokenTillSpace + "." + word].rvt, wordList) + resultcontextObj[PreviousTokenTillSpace + "." + word].rvt
        } else if (!!sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word]) {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].rvt, wordList) + sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].rvt
        } else if (!!sourcecontextObj[PreviousTokenTillComma + "." + word]) {
            return srv.SpaceReturnFunc(word, sourcecontextObj[PreviousTokenTillComma + "." + word].rvt, wordList) + sourcecontextObj[PreviousTokenTillComma + "." + word].rvt
        }
    }

    ReturnActionValue = (ActionPartOfRule, word, sourcecontextObj, resultcontextObj, splitRule, cursorRowPos, ConditionPartOfRule) => {
        let ConditionPreviousTokenTillSpace = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, " ").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillSpace = srv.previousToken(ActionPartOfRule, cursorRowPos.column, " ").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillComma = srv.previousToken(ActionPartOfRule, cursorRowPos.column, ",").replace(/\[[0-9]+\]/g, "")
        let PreviousTokenTillOpenRoundBracket = srv.previousToken(ActionPartOfRule, cursorRowPos.column, "(").replace(/\[[0-9]+\]/g, "")

        if (word === "then") {
            return `\n${word}`
        } else if (["AND", "OR"].includes(ConditionPreviousTokenTillSpace.trim())) {
            return `\n   ${word}`
        } else if (["AND"].includes(PreviousTokenTillSpace.trim()) && !splitRule.startsWith("if") && !splitRule.includes("then ")) {
            return `\n${word}`
        } else if (["AND"].includes(PreviousTokenTillSpace.trim())) {
            return `\n     ${word}`
        } else if (!!resultcontextObj[PreviousTokenTillSpace + "." + word] && !!resultcontextObj[PreviousTokenTillSpace + "." + word].par[0] && resultcontextObj[PreviousTokenTillSpace + "." + word].par[0].vt === resultcontextObj[PreviousTokenTillSpace + "." + word].rvt && resultcontextObj[PreviousTokenTillSpace + "." + word].rvt === "BASE") {
            return word + "[]"
        } else if (!!sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word] && sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].att === sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].rvt && sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word].rvt === "BASE") {
            return word + "[]"
        } else if (!!sourcecontextObj[PreviousTokenTillComma + "." + word] && sourcecontextObj[PreviousTokenTillComma + "." + word].att === sourcecontextObj[PreviousTokenTillComma + "." + word].rvt && sourcecontextObj[PreviousTokenTillComma + "." + word].rvt === "BASE") {
            return word + "[]"
        }
        else {
            return word
        }
    }

    handleAutoComplete = (TypedRule = "", cursorRowPos) => {
        const { ModifiedSrcContextObj, sourcecontextObj, ModifiedResultContextObj, resultcontextObj } = srv.props;
        if (editorObject !== undefined) {
            let splitRule = TypedRule
            if (!splitRule.startsWith("if") && !splitRule.includes("then ")) {
                splitRule = splitRule
            } else {
                splitRule = splitRule.slice(0, 2) + "\n" + splitRule.slice(2, splitRule.search(/then /) + 4) + "\n" + splitRule.slice(splitRule.search(/then /) + 4)
            }
            let splitArray = splitRule.split("\n");
            splitArray = splitArray.map(el => el.trim());

            let ConditionPartOfRule = splitArray.indexOf("if") === -1 && splitArray.indexOf("then") === -1 ? "" : splitArray.indexOf("if") !== -1 && splitArray.indexOf("then") === -1 && splitRule.trim() === "if" ? splitArray[cursorRowPos.row] : splitArray.indexOf("if") !== -1 && splitArray.indexOf("then") === -1 ? splitArray[cursorRowPos.row + 2] : splitArray.indexOf("if") !== -1 && splitArray.indexOf("then") !== -1 ? splitArray[cursorRowPos.row + 1] : "";
            let ConditionPartOfRuleCopy = ConditionPartOfRule.replace(/\[[0-9]+\]/g, "");

            let ActionPartOfRule = splitArray.indexOf("if") === -1 && splitArray.indexOf("then") === -1 ? splitArray[cursorRowPos.row] : splitArray.indexOf("if") !== -1 && splitArray.indexOf("then") === -1 ? "" : splitArray[cursorRowPos.row + 2];
            let ActionPartOfRuleCopy = ActionPartOfRule.replace(/\[[0-9]+\]/g, "");


            let ColumnAdjustForConditions = !!ConditionPartOfRule && !!ConditionPartOfRule.match(/\[[0-9]+\]/g) ? ConditionPartOfRule.match(/\[[0-9]+\]/g).reduce((x, y) => x + y).length : 0;
            let ColumnAdjustForActions = !!ActionPartOfRule && !!ActionPartOfRule.match(/\[[0-9]+\]/g) ? ActionPartOfRule.match(/\[[0-9]+\]/g).reduce((x, y) => x + y).length : 0;
            if (!splitRule.startsWith("if") && !splitRule.includes("then ")) {
                editorObject.editor.commands.on("afterExec", function (e) {
                    wordList = srv.props.ModifiedResultContextObj["ifThen"]
                    if (e.command.name === "insertstring") {
                        let PreviousTokenTillSpace = srv.previousToken(ActionPartOfRuleCopy, cursorRowPos.column - ColumnAdjustForActions, " ")
                        let PreviousTokenTillComma = srv.previousToken(ActionPartOfRuleCopy, cursorRowPos.column - ColumnAdjustForActions, ",")
                        let PreviousTokenTillOpenRoundBracket = srv.previousToken(ActionPartOfRuleCopy, cursorRowPos.column - ColumnAdjustForActions, "(")
                        let PreviousTokenTillDot = srv.previousToken(ActionPartOfRuleCopy, cursorRowPos.column - ColumnAdjustForActions, ".")
                        if (/ /.test(e.args)) {
                            if (PreviousTokenTillSpace === "AND") {
                                wordList = ModifiedResultContextObj["ifThen"];
                                editorObject.editor.execCommand("startAutocomplete");
                            } else if (!!resultcontextObj[PreviousTokenTillSpace] && resultcontextObj[PreviousTokenTillSpace].rvt === "VOID") {
                                wordList = ["AND"];
                                editorObject.editor.execCommand("startAutocomplete");
                            }
                            else if (ActionPartOfRule.match(/[(][^\)]*?[)]/g)) {
                                wordList = ["AND"];
                                editorObject.editor.execCommand("startAutocomplete");
                            } else {
                                wordList = [];
                                editorObject.editor.execCommand("startAutocomplete");
                            }
                        }
                        else if (/,/.test(e.args)) {
                            wordList = ModifiedSrcContextObj["ifThen"];
                            editorObject.editor.execCommand("startAutocomplete");
                        }
                        else if (/\(/.test(e.args)) {
                            wordList = ModifiedSrcContextObj["ifThen"];
                            editorObject.editor.execCommand("startAutocomplete");
                        }
                        else if (/\./.test(e.args)) {
                            if (Object.keys(resultcontextObj).includes(PreviousTokenTillSpace) && resultcontextObj[PreviousTokenTillSpace].rvt === "VOID") {
                                wordList = []
                                editorObject.editor.execCommand("startAutocomplete");
                            } else if (ActionPartOfRuleCopy.includes("(")
                                && cursorRowPos.column > ActionPartOfRuleCopy.indexOf("(")
                                && Object.keys(sourcecontextObj).includes(PreviousTokenTillOpenRoundBracket)
                                && _.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length === 0
                                && sourcecontextObj[PreviousTokenTillOpenRoundBracket].rvt !== "BASE"
                                && sourcecontextObj[PreviousTokenTillOpenRoundBracket].att !== "BASE") {
                                wordList = []
                                editorObject.editor.execCommand("startAutocomplete");
                            } else if (ActionPartOfRuleCopy.includes("(")
                                && cursorRowPos.column > ActionPartOfRuleCopy.indexOf("(")
                                && Object.keys(sourcecontextObj).includes(PreviousTokenTillComma)
                                && _.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length === 0
                                && sourcecontextObj[PreviousTokenTillComma].rvt !== "BASE"
                                && sourcecontextObj[PreviousTokenTillComma].att !== "BASE") {
                                wordList = []
                                editorObject.editor.execCommand("startAutocomplete");
                            }
                            if (ActionPartOfRuleCopy.includes("(") && cursorRowPos.column > ActionPartOfRuleCopy.indexOf("(")) {
                                if (_.values(ModifiedSrcContextObj[PreviousTokenTillComma]).length > 0) {
                                    wordList = ModifiedSrcContextObj[PreviousTokenTillComma];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (_.values(ModifiedSrcContextObj[PreviousTokenTillOpenRoundBracket]).length > 0) {
                                    wordList = ModifiedSrcContextObj[PreviousTokenTillOpenRoundBracket];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (_.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length > 0) {
                                    wordList = ModifiedSrcContextObj[PreviousTokenTillDot];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else {
                                    wordList = [];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                            } else {
                                if (_.values(ModifiedResultContextObj[PreviousTokenTillSpace]).length > 0) {
                                    wordList = ModifiedResultContextObj[PreviousTokenTillSpace];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                                else if (_.values(ModifiedResultContextObj[PreviousTokenTillDot]).length > 0) {
                                    wordList = ModifiedResultContextObj[PreviousTokenTillDot];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else {
                                    wordList = [];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                            }
                        }
                        else if (/^[a-zA-Z0-9]/.test(e.args) && editorObject.editor.getCursorPosition().column < 2) {
                            editorObject.editor.execCommand("startAutocomplete");
                        }
                    }
                });
            } else {
                ActionPartOfRule = "then " + ActionPartOfRule;
                ConditionPartOfRule = "if " + ConditionPartOfRule;
                editorObject.editor.commands.on("afterExec", function (e) {
                    if (e.command.name === "insertstring") {
                        if (((splitArray[0] === "if" && splitArray.indexOf("then") === -1 && cursorRowPos.row >= 0) || (splitArray.indexOf("then") !== -1 && cursorRowPos.row < splitArray.indexOf("then") - 1))) {
                            let PreviousTokenTillSpace = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, " ").replace(/\[[0-9]+\]/g, "")
                            let PreviousTokenTillComma = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, ",").replace(/\[[0-9]+\]/g, "")
                            let PreviousTokenTillOpenRoundBracket = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, "(").replace(/\[[0-9]+\]/g, "")
                            let PreviousTokenTillDot = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, ".").replace(/\[[0-9]+\]/g, "")
                            if (/ /.test(e.args)) {
                                if (PreviousTokenTillSpace === "if") {
                                    wordList = ModifiedSrcContextObj["ifThen"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (PreviousTokenTillSpace === "AND" || PreviousTokenTillSpace === "OR") {
                                    wordList = ModifiedSrcContextObj["ifThen"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (PreviousTokenTillSpace === 'present' || PreviousTokenTillSpace === '!present') {
                                    wordList = ["AND", "OR", "then"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (operatorSymbols.includes(srv.previousSecondToken(ConditionPartOfRule, cursorRowPos.column, " "))) {
                                    wordList = ["AND", "OR", "then"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (operatorSymbols.includes(PreviousTokenTillSpace)) {
                                    wordList = ModifiedSrcContextObj["ifThen"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } 
                                else if (_.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length === 0 || (_.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length === 1 && ModifiedSrcContextObj[PreviousTokenTillDot][0] === 'Value-length'))  {
                                    try { 
                                        let c = false;
                                        let request = ConditionPartOfRule.substring(ConditionPartOfRule.indexOf(".") + 1, ConditionPartOfRule.indexOf("("));
                                        let headerName = ConditionPartOfRule.substring(ConditionPartOfRule.indexOf("\"") + 1, ConditionPartOfRule.indexOf(")") - 1);
                                        if ( request === "HttpHeaderGet" ) 
                                        {
                                            let headerType = srv.handleHttpHeaderfunc(headerName);
                                            if ( headerType === "integer" ) {
                                                operatorLong.map(e => {
                                                    if (ConditionPartOfRule.includes(e)) {
                                                        c = true;
                                                        return
                                                    }
                                                })
                                                wordList = c === true ? [] : operatorLong;
                                            }
                                            else if ( headerType === "string" ) {
                                                operatorString.map(e => {
                                                    if (ConditionPartOfRule.includes(e)) {
                                                        c = true;
                                                        return
                                                    }
                                                })
                                                wordList = c === true ? [] : operatorString;
                                            }
                                            else if ( headerType === 0 )
                                            {
                                                operatorSymbols.map(e => {
                                                    if (ConditionPartOfRule.includes(e)) {
                                                        c = true;
                                                        return
                                                    }
                                                })
                                                wordList = c === true ? [] : operatorSymbols;
                                            }
 
                                        }
                                        else if (request !== "HttpHeaderGet") {
                                            operatorSymbols.map(e => {
                                                if (ConditionPartOfRule.includes(e)) {
                                                    c = true;
                                                    return
                                                }
                                            })
                                            wordList = c === true ? [] : operatorSymbols;
                                        } 
                                    }
                                    catch (e) {
                                    }
                                     editorObject.editor.execCommand("startAutocomplete");
                                }
                                
                                else {
                                    wordList = [];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                            } else if (/,/.test(e.args)) {
                                wordList = ModifiedSrcContextObj["ifThen"];
                                editorObject.editor.execCommand("startAutocomplete");
                            }
                            else if (/\(/.test(e.args)) {
                                wordList = ModifiedSrcContextObj["ifThen"];
                                editorObject.editor.execCommand("startAutocomplete");
                            } else if (/\./.test(e.args)) {
                                if (_.values(ModifiedSrcContextObj[PreviousTokenTillSpace]).length > 0) {
                                    wordList = ModifiedSrcContextObj[PreviousTokenTillSpace];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                                else if (_.values(ModifiedSrcContextObj[PreviousTokenTillComma]).length > 0) {
                                    wordList = ModifiedSrcContextObj[PreviousTokenTillComma];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (_.values(ModifiedSrcContextObj[PreviousTokenTillOpenRoundBracket]).length > 0) {
                                    wordList = ModifiedSrcContextObj[PreviousTokenTillOpenRoundBracket];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (_.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length > 0) {
                                    wordList = ModifiedSrcContextObj[PreviousTokenTillDot];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                                else {
                                    wordList = [];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                            }
                        }
                        else {
                            let PreviousTokenTillSpace = srv.previousToken(ActionPartOfRule, cursorRowPos.column, " ").replace(/\[[0-9]+\]/g, "")
                            let PreviousTokenTillComma = srv.previousToken(ActionPartOfRule, cursorRowPos.column, ",").replace(/\[[0-9]+\]/g, "")
                            let PreviousTokenTillOpenRoundBracket = srv.previousToken(ActionPartOfRule, cursorRowPos.column, "(").replace(/\[[0-9]+\]/g, "")
                            let PreviousTokenTillDot = srv.previousToken(ActionPartOfRule, cursorRowPos.column, ".").replace(/\[[0-9]+\]/g, "")
                            if (/ /.test(e.args)) {
                                if (PreviousTokenTillSpace === "then" || (splitArray.indexOf("if") === -1 && splitArray.indexOf("then") === -1)) {
                                    wordList = ModifiedResultContextObj["ifThen"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                                else if (PreviousTokenTillSpace === "AND") {
                                    wordList = ModifiedResultContextObj["ifThen"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (!!resultcontextObj[PreviousTokenTillSpace] && resultcontextObj[PreviousTokenTillSpace].rvt === "VOID") {
                                    wordList = ["AND"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                                else if (ActionPartOfRule.match(/[(][^\)]*?[)]/g)) {
                                    wordList = ["AND"];
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else {
                                    wordList = [];
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                            }
                            else if (/,/.test(e.args)) {
                                wordList = ModifiedSrcContextObj["ifThen"];
                                editorObject.editor.execCommand("startAutocomplete");
                            }
                            else if (/\(/.test(e.args)) {
                                wordList = ModifiedSrcContextObj["ifThen"];
                                editorObject.editor.execCommand("startAutocomplete");
                            } else if (/\./.test(e.args)) {
                                if (Object.keys(resultcontextObj).includes(PreviousTokenTillSpace) && resultcontextObj[PreviousTokenTillSpace].rvt === "VOID") {
                                    wordList = []
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (ActionPartOfRuleCopy.includes("(")
                                    && cursorRowPos.column > ActionPartOfRuleCopy.indexOf("(")
                                    && Object.keys(sourcecontextObj).includes(PreviousTokenTillOpenRoundBracket)
                                    && _.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length === 0
                                    && sourcecontextObj[PreviousTokenTillOpenRoundBracket].rvt !== "BASE"
                                    && sourcecontextObj[PreviousTokenTillOpenRoundBracket].att !== "BASE") {
                                    wordList = []
                                    editorObject.editor.execCommand("startAutocomplete");
                                } else if (ActionPartOfRuleCopy.includes("(")
                                    && cursorRowPos.column > ActionPartOfRuleCopy.indexOf("(")
                                    && Object.keys(sourcecontextObj).includes(PreviousTokenTillComma)
                                    && _.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length === 0
                                    && sourcecontextObj[PreviousTokenTillComma].rvt !== "BASE"
                                    && sourcecontextObj[PreviousTokenTillComma].att !== "BASE") {
                                    wordList = []
                                    editorObject.editor.execCommand("startAutocomplete");
                                }
                                if (ActionPartOfRuleCopy.includes("(") && cursorRowPos.column > ActionPartOfRuleCopy.indexOf("(")) {
                                    if (_.values(ModifiedSrcContextObj[PreviousTokenTillComma]).length > 0) {
                                        wordList = ModifiedSrcContextObj[PreviousTokenTillComma];
                                        editorObject.editor.execCommand("startAutocomplete");
                                    } else if (_.values(ModifiedSrcContextObj[PreviousTokenTillOpenRoundBracket]).length > 0) {
                                        wordList = ModifiedSrcContextObj[PreviousTokenTillOpenRoundBracket];
                                        editorObject.editor.execCommand("startAutocomplete");
                                    } else if (_.values(ModifiedSrcContextObj[PreviousTokenTillDot]).length > 0) {
                                        wordList = ModifiedSrcContextObj[PreviousTokenTillDot];
                                        editorObject.editor.execCommand("startAutocomplete");
                                    } else {
                                        wordList = [];
                                        editorObject.editor.execCommand("startAutocomplete");
                                    }
                                } else {
                                    if (_.values(ModifiedResultContextObj[PreviousTokenTillSpace]).length > 0) {
                                        wordList = ModifiedResultContextObj[PreviousTokenTillSpace];
                                        editorObject.editor.execCommand("startAutocomplete");
                                    }
                                    else if (_.values(ModifiedResultContextObj[PreviousTokenTillDot]).length > 0) {
                                        wordList = ModifiedResultContextObj[PreviousTokenTillDot];
                                        editorObject.editor.execCommand("startAutocomplete");
                                    }
                                    else {
                                        wordList = [];
                                        editorObject.editor.execCommand("startAutocomplete");
                                    }
                                }
                            }
                        }
                    }
                });
            }

            let staticWordCompleter = {
                getCompletions: function (editor, session, pos, prefix, callback) {
                    if (!!wordList && wordList.length > 0) {
                        callback(null, wordList.map(function (word) {
                            let ConditionPartOfRuleCopy = !!ConditionPartOfRule && !!ConditionPartOfRule.replace(/\[[0-9]+\]/g, "") ? ConditionPartOfRule.replace(/\[[0-9]+\]/g, "") : "";
                            let PreviousTokenTillComma = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, ",").replace(/\[[0-9]+\]/g, "")
                            let PreviousTokenTillOpenRoundBracket = srv.previousToken(ConditionPartOfRule, cursorRowPos.column, "(").replace(/\[[0-9]+\]/g, "")

                            if (!!sourcecontextObj[srv.previousToken(ConditionPartOfRuleCopy, cursorRowPos.column - ColumnAdjustForConditions, " ") + "." + word] ||
                                !!sourcecontextObj[PreviousTokenTillComma + "." + word] ||
                                !!sourcecontextObj[PreviousTokenTillOpenRoundBracket + "." + word]) {
                                return {
                                    meta: srv.ReturnConditionCaption(ConditionPartOfRule, word, sourcecontextObj, wordList, cursorRowPos),
                                    value: srv.ReturnConditionValue(ConditionPartOfRule, word, sourcecontextObj, cursorRowPos),
                                    caption: word,

                                };
                            } else {

                                return {
                                    meta: srv.ReturnActionCaption(ActionPartOfRule, word, sourcecontextObj, wordList, resultcontextObj, cursorRowPos),
                                    value: srv.ReturnActionValue(ActionPartOfRule, word, sourcecontextObj, resultcontextObj, splitRule, cursorRowPos, ConditionPartOfRule),
                                    caption: word,

                                };
                            }

                        }));
                    }
                }
            }
            editorObject.editor.completers = [staticWordCompleter];
        }
    }

    renderRuleStatusIcon = (status) => {
        switch (!!status && status) {
            case "pass": return <CheckCircleIcon color="#008000" />
            case "fail": return <WarningIcon color="#ff5b12" />
            default: return <ProgressIndicatorCircularCCFK overlay={false} size="small" />
        }
    }

    render() {
        const { TempRuleObjValue, TemporaryRsvDataObj, viewmode } = srv.props;

        return (
            <div className="Single_rule" style={{ margin: "10px", height: 146, backgroundColor: "#FFF" }}>

                <div className="singleRuleHeader">
                    <div className="RuleStatusIcon">
                        {this.renderRuleStatusIcon(TemporaryRsvDataObj.rules[this.props.index].status)}
                    </div>
                    <div className="RuleNameInput">
                        <TextInputCCFK
                            id={TempRuleObjValue[this.props.index].name + this.props.index}
                            label=""
                            disabled={viewmode === true}
                            value={this.props.RuleObject.name}
                            placeholder="Rule Name"
                            onChange={this.handleRuleNameChange}
                            onChangeArgs={[this.props.index]}
                        />
                    </div>
                </div>
                <div className="editor">
                    <AceEditor
                        mode="text"
                        theme="eclipse"
                        id={TempRuleObjValue[this.props.index].name + this.props.index}
                        name="editor"
                        wrap={true}
                        readOnly={false}
                        showPrintMargin={true}
                        showGutter={true}
                        ref="ace"
                        setOptions={{
                            enableLiveAutocompletion: false,
                            enableBasicAutocompletion: true,
                            readOnly: viewmode,
                            enableSnippets: true,
                            theme: 'ace/theme/eclipse'
                        }

                        }
                        value={this.props.RuleObject.rule}
                        onChange={(e) => { this.handleRuleChange(e, this.props.index) }}
                        style={{ height: '86px' }}
                        ref={(editor) => {
                            srv.editor = editor;
                            if (editor !== undefined) {
                                editorObject = editor;
                            }
                        }}
                    />
                </div>
                <div className="DeleteBtnForRule">
                    {viewmode !== true && this.props.deleteCondition === true ?
                        <IconButtonCCFK
                            onClick={() => { srv.HandleDeleteRule(this.props.index) }}>
                            <DeleteIcon />
                        </IconButtonCCFK> : null}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        TemporaryRsvDataObj: state.renewEditDialog.TemporaryRsvData,
        viewmode: state.renewEditDialog.viewMode,
        TempRuleObjValue: state.renewEditDialog.TempRuleObj,
        Headersdata: state.renewEditDialog.Headersdata,
        TemporaryRsvDataRules: state.renewEditDialog.TemporaryRsvData.rules,
        ModifiedSrcContextObj: (!!state.renewEditDialog.ModifiedSrcContext && !!state.renewEditDialog.ModifiedSrcContext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] && !!state.renewEditDialog.TemporaryRsvData) ? state.renewEditDialog.ModifiedSrcContext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] : {},
        ModifiedResultContextObj: (!!state.renewEditDialog.ModifiedResultContext && !!state.renewEditDialog.ModifiedResultContext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] && !!state.renewEditDialog.TemporaryRsvData) ? state.renewEditDialog.ModifiedResultContext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] : {},
        sourcecontextObj: (!!state.renewEditDialog.sourcecontext && state.renewEditDialog.sourcecontext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] && !!state.renewEditDialog.TemporaryRsvData) ? state.renewEditDialog.sourcecontext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] : {},
        resultcontextObj: (!!state.renewEditDialog.resultcontext && !!state.renewEditDialog.resultcontext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] && !!state.renewEditDialog.TemporaryRsvData) ? state.renewEditDialog.resultcontext[state.renewEditDialog.TemporaryRsvData.ruleSetType[0]] : {},
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        UpdateRuleEditor,
        UpdateRuleName,
        DeleteRules,
        RuleNameUpdate,
        RuleStatus,
        RuleContentUpdate,
        RuleSaveBtnDisabledState
    }
        , dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(RuleDisplay);