import * as Redux from "Redux";

import {ViewState} from "../defs/viewdefs";
import {Actions} from "../actions/viewactions";

const initialState:ViewState={
	loading:false
};

export function viewReducer(state=initialState,action:Actions) {

}