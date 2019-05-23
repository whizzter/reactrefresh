import * as React from "react";

type FocusTextInputProps={text:string,onAccept:(val:string)=>void,onBlur:()=>void};
export default class FocusTextInput extends React.Component<FocusTextInputProps,{text:string}> {
	constructor(props:FocusTextInputProps) {
		super(props)
		this.state={text:props.text};
	}
	render(){
		const elem=<input autoFocus type="text" value={ this.state.text }
		onChange={  (evt)=>{
			this.setState( { text:evt.target.value });
		} } 
		onKeyDown={ (evt)=>{
			if (evt.keyCode===27) {
				this.props.onBlur();
			}
			if (evt.keyCode==13) {
				this.props.onAccept(this.state.text)
			}
		}}
		onBlur={ (evt)=>{
			this.props.onAccept(this.state.text)
			this.props.onBlur();
		}}
		/>

		return elem;
	}
}
