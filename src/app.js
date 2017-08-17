import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import './sass/Uploader.sass'
import Panel from './components/Uploader'

class PanelDemo extends Component{
	render(){
		return (
			<Uploader title="Panel Title" renderRight={()=>{
				return (
					<button type="button" onClick={()=>{
						alert('pressed');
					}}>press me</button>
				);
			}}>
				<p>panel content</p>
			</Uploader>
		);
	}
}

class Example extends Component {
	render() {
		return (
			<div style={{paddingBottom:"50px"}}>
				<h5>Simple Panel</h5>
				<PanelDemo/>
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));