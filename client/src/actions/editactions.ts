import EditConst from "../const/editconst";

export function editSetTarget(target:any) {
	return {type:EditConst.EditItemTextTarget as EditConst.EditItemTextTarget,target}
}



export type Actions =
	ReturnType<typeof editSetTarget>;