import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import './sass/Uploader.sass'
import Uploader from './components/Uploader'

class UploaderDemo extends Component{
	render(){
		return (
			<Uploader></Uploader>
		);
	}
}

class Example extends Component {
	render() {
		return (
			<div>
				<h5>Simple Uploader</h5>
				<UploaderDemo/>
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));