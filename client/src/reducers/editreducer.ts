import {EditState} from "../defs/editdefs";

import {Actions} from "../actions/editactions";
import EditConst from "../const/editconst";

const initialEditState:EditState={
	textEditItemID:null
}

export function editReducer(editState=initialEditState,action:Actions) {

	switch(action.type) {
		case EditConst.EditItemTextTarget : {
			return {...editState,textEditItemID:action.target};
		}
		default:
			return editState;
	}
}