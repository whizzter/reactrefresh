export interface TodoItem {
	id:string,
	name:string,
	done:boolean
}
export interface TodoState {
	items:TodoItem[];
}
