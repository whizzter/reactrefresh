import TodoConst from "./todoconst";
import {TodoItem,TodoState} from "./tododefs";

export function addItem(item:TodoItem) {
	return {type:TodoConst.ADD as TodoConst.ADD,data:item}
}

export function flipItem(id:string) {
	return {type:TodoConst.FLIP as TodoConst.FLIP,id}
}

export type Action=
	ReturnType<typeof addItem>|
	ReturnType<typeof flipItem>;
