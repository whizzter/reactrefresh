// User todo-items
export interface TodoItem {
	id:string,
	name:string,
	done:boolean
}

// the todo state.
export interface TodoState {
	items:TodoItem[];
}
