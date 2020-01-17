import * as Redux from "redux";

import TodoConst from "../const/todoconst";
import {TodoItem,TodoState} from "../defs/tododefs";
//import { atodoReducer } from "../reducers/todoreducers"
import {flagLoading, flagError} from "./statusactions";
import { loaded, updated } from "../reducers/todoreducers";

async function fetchStrict(url:string,reqinit?:RequestInit):Promise<Response> {
	let result=await fetch(url,reqinit);
	if (!result.ok)
		throw new Error("fetch problem code:"+result.status+"("+result.statusText+")");
	return result;
}

export function load() {
	return async function(dispatch:Redux.Dispatch) {
		// async function doing a loading task.
		dispatch( flagLoading("Initial load...") );

		let fr;
		try {
			fr=await fetchStrict("/api/1/items");
		} catch (e) {
			dispatch(flagError("Initial loading error, "+((e as Error).message),()=>load()))
			return;
		}
			
		//let text=await fr.text();
		let data:{items:TodoItem[]}=await fr.json();
		console.log("Items!!:"+data);
		dispatch(flagLoading(null));
		dispatch(loaded(data.items));
	};
}

function updateItem(item:TodoItem,msg:string) {
	console.log("Updateitem action runs!");
	return async function(dispatch:Redux.Dispatch) {
		dispatch( flagLoading("Updating item "+msg) );

		console.log("Pre fetch")
		let fr:Response;
		try {
			fr=await fetchStrict("/api/1/items/"+item.id,{method:"put",body:JSON.stringify(item)});
		} catch (e) {
			console.log("fetch failed")
			dispatch(flagError("Update error when "+msg+", got "+((e as Error).message),
				()=>{ console.log("Retrier for updateItem firing.",item,msg); return updateItem(item,msg) }))
			return;
		}

		console.log("Post fetch ok")
		dispatch(flagLoading(null));
		dispatch(updated(item));
	}
}

export { addItem } from "../reducers/todoreducers";

export function flipItem(item:TodoItem) {
	return updateItem({...item,done:!item.done},"Flipping item flag");
}

export function changeText(item:TodoItem,text:string) {
	return updateItem({...item,name:text},"changing item text");
}
