import * as Redux from "Redux";

import {TodoItem,TodoState} from "../defs/tododefs";

// our initial application state (testing)
const initialState:TodoState={
	// some faux starter data before we have any network stuff connected!
	items:[
		{id:"fewfwf",name:"CLIENT TODO",done:true},
		{id:"fef23",name:"ITEMS",done:false}
	]
};

type RemoveFirst<T extends any[]> = ( ((...b:T)=>void) extends (a:any,...b:infer I)=>void ? I:[] );

function createActionsAndReducer
	<S,T extends { [k:string]:(old:S,...args:any)=>S; }>
	(initialState:S,prefix:string,reductions:T):
	{
		actions:{[K in keyof T]:(...args:RemoveFirst<Parameters<T[K]>>)=>Redux.Action<string>},
		reducer:(state:S,action:Redux.Action)=>S
	}
{
	prefix = prefix+"/";
	const actions:{[K in keyof T]:(...args:RemoveFirst<Parameters<T[K]>>)=>Redux.Action<string>} = {} as any;
	for (let key in reductions) {
		actions[key] = (...args:any)=>({ type:prefix+key,data:args })
	}
	const reducer = (state:S=initialState,action:Redux.Action<string>)=>{
		if (action.type.startsWith(prefix)) {
			const key = action.type.substring(prefix.length);
			if (reductions.hasOwnProperty(key)) {
				return reductions[key](state,...((action as any).data));
			}
		}
		return state;
	}
	return {actions,reducer};
}

export const atodoReducer = createActionsAndReducer(initialState,"todos",{
	loaded(state,items:TodoItem[]) {
		return {items};
	},
	addItem(state,item:TodoItem) {
		return {...state,items:[...state.items,item]}
	},
	updated(state,item:TodoItem) {
		return {...state,items:state.items.map(mi=>mi.id===item.id?item:mi)}
	}
})
