import * as Redux from "redux";

import TodoConst from "../const/todoconst";
import {TodoItem,TodoState} from "../defs/tododefs";
import {flagLoading, flagError} from "./statusactions";


export function load() {
	return async function(dispatch:Redux.Dispatch) {
		// async function doing a loading task.
		dispatch( flagLoading("Initial load...") );

		let fr=await fetch("/hw");
		if (!fr.ok) {
			dispatch(flagError("Initial loading error",load()));
			return;
		}
			
		//let text=await fr.text();
		let data:{items:TodoItem[]}=await fr.json();
		console.log("Items!!:"+data);
		dispatch(flagLoading(null));
		dispatch(loaded(data.items));
	};
}

export function loaded(items:TodoItem[]) {
	return {type:TodoConst.LOADED as TodoConst.LOADED,items};
}

export function addItem(item:TodoItem) {
	return {type:TodoConst.ADD as TodoConst.ADD,data:item}
}

export function flipItem(id:string) {
	return {type:TodoConst.FLIP as TodoConst.FLIP,id}
}

export type Action=
	ReturnType<typeof addItem>|
	ReturnType<typeof flipItem>|
	ReturnType<typeof loaded>;
