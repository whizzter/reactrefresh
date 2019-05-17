// we just re-export the shared todo def info for the time being!
export * from "../../../shared/sharedtododefs";

import {TodoItem} from "../../../shared/sharedtododefs";

// the todo state.
export interface TodoState {
	items:TodoItem[];
}
