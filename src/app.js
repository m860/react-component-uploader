import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import FileButton from './components/FileButton'

class SingleUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: []
		};
	}

	render() {
		return (
			<div style={{display:"flex",flexDirection:"column"}}>
				<FileButton
					url="http://39.108.11.254:8081/upload"
					headers={{
						'content-type': 'multipart/form-data',
						"x-produce-authentication":"74533907dc42a6c5a4ea3a5dba7da4680d79b3c3ba203501d6154d3829642ea5ea5361474c7609b25a6fe8b64d15c8ce33dfb40bee64f587bef32ce07c75cfb2471f22172ba16fba2cacea623da2a72c3da864e70dbc0b"
					}}
					formData={{
						businessType:"gongyi"
					}}
					onUpload={(err,{data})=>{
					if(err){
						alert(err.message);
					}
					else{
						if(data.success){
							const files=this.state.files.concat(data.data);
							this.setState({files});
						}
						else{
							alert(data.message)
						}
					}
				}}>上传文件</FileButton>
				<div style={{display:"flex",flexDirection:"column"}}>
					{this.state.files.map((item, index)=> {
						return (
							<a href={item.fileUrl} key={index}>
								<img src={item.fileUrl}/>
							</a>
						)
					})}
				</div>
			</div>
		);
	}
}

class MultipleUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: []
		};
	}

	render() {
		return (
			<div style={{display:"flex",flexDirection:"column"}}>
				<FileButton
					multiple={true}
					url="http://0.0.0.0:8081/upload"
					headers={{
						'content-type': 'multipart/form-data',
						"x-produce-authentication":"74533907dc42a6c5a4ea3a5dba7da4680d79b3c3ba203501d6154d3829642ea5ea5361474c7609b25a6fe8b64d15c8ce33dfb40bee64f587bef32ce07c75cfb2471f22172ba16fba2cacea623da2a72c3da864e70dbc0b"
					}}
					formData={{
						businessType:"gongyi"
					}}
					onUpload={(err,{data})=>{
					if(err){
						alert(err.message);
					}
					else{
						if(data.success){
							const files=this.state.files.concat(data.data);
							this.setState({files});
						}
						else{
							alert(data.message)
						}
					}
				}}>上传文件</FileButton>
				<div style={{display:"flex",flexDirection:"column"}}>
					{this.state.files.map((item, index)=> {
						return (
							<a href={item.fileUrl} key={index}>
								<img src={item.fileUrl}/>
							</a>
						)
					})}
				</div>
			</div>
		);
	}
}

class Example extends Component {
	render() {
		return (
			<div>
				<h5>Single Uploader</h5>
				<SingleUpload/>
				<h5>Multiple Uploader</h5>
				<MultipleUpload/>
			</div>
		);
	}
}

ReactDOM.render(
	<Example></Example>
	, document.getElementById("view"));