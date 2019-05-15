import TodoConst from "../const/todoconst";
import {TodoItem,TodoState} from "../defs/tododefs";

export function addItem(item:TodoItem) {
	return {type:TodoConst.ADD as TodoConst.ADD,data:item}
}

export function flipItem(id:string) {
	return {type:TodoConst.FLIP as TodoConst.FLIP,id}
}

export type Action=
	ReturnType<typeof addItem>|
	ReturnType<typeof flipItem>;
