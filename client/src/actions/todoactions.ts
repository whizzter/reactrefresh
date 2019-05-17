import * as Redux from "redux";

import TodoConst from "../const/todoconst";
import {TodoItem,TodoState} from "../defs/tododefs";
import {flagLoading, flagError} from "./statusactions";


export function load() {
	return async function(dispatch:Redux.Dispatch) {
		dispatch( flagLoading("Initial load...") );
		try {
			let fr=await fetch("/hw");
			if (!fr.ok) {
				dispatch(flagError("Initial loading error",load()));
				return;
			}
				
			let text=await fr.text();
			console.log("Text:"+text);
			dispatch(flagLoading(null));
		} catch (e) {
			console.log("Err fetching!!");
			dispatch(flagError("Initial loading error",load()));
		}
	};
}

export function addItem(item:TodoItem) {
	return {type:TodoConst.ADD as TodoConst.ADD,data:item}
}

export function flipItem(id:string) {
	return {type:TodoConst.FLIP as TodoConst.FLIP,id}
}

export type Action=
	ReturnType<typeof addItem>|
	ReturnType<typeof flipItem>;
