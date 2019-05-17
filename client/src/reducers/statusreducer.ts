import * as Redux from "Redux";

import {StatusState} from "../defs/statusdefs";
import {Actions} from "../actions/statusactions";

const initialState:StatusState={
	loading:null,

	failedMessage:"",
	failedAction:null
};

export function statusReducer(state=initialState,action:Actions) {
	switch(action.type) {
	case "Status_FlagLoading" : {
		return {...state,loading:action.text};
	}
	case "Status_FlagError" : {
		return {...state,failedMessage:action.desc,failedAction:action.action};
	}
	default:
		return state;

	}
}