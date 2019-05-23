import * as Redux from "redux";

import StatusConst from "../const/statusconst";

export function flagLoading(text:string|null) {
	return {type:StatusConst.FlagLoading as StatusConst.FlagLoading,text};
}
export function flagError(desc:string,action:any) {
	return {type:StatusConst.FlagError as StatusConst.FlagError,desc,action};
}

export function retry(action:any) {
	return async function(dispatch:Redux.Dispatch) {
		console.log("Retrying action "+action);
		dispatch(flagError("",null));
		dispatch(action());
	};
}


export type Actions=
	ReturnType<typeof flagLoading>|
	ReturnType<typeof flagError>;
