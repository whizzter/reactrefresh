import StatusConst from "../const/statusconst";

export function flagLoading(text:string) {
	return {type:StatusConst.FlagLoading as StatusConst.FlagLoading,text};
}
export function flagError(desc:string,action:any) {
	return {type:StatusConst.FlagError as StatusConst.FlagError,desc,action};
}


export type Actions=
	ReturnType<typeof flagLoading>|
	ReturnType<typeof flagError>;
