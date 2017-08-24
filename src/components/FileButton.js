import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import classnames from 'classnames'
import axios from 'axios'

export default class FileButton extends PureComponent {
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		url: PropTypes.string.isRequired,
		headers: PropTypes.object,
		onUpload: PropTypes.func,
		formData: PropTypes.object,
		multiple: PropTypes.bool
	};
	static defaultProps = {
		children: "添加文件",
		headers: {
			"content-type": "multipart/form-data"
		},
		onUpload: (err)=>null,
		formData: {},
		multiple: false
	};

	constructor(props) {
		super(props);
		this.state = {
			files: props.value
		};
	}

	_upload(files) {
		let formData = new FormData();
		for (let key in this.props.formData) {
			formData.append(key, this.props.formData[key]);
		}
		for (let i = 0; i < files.length; i++) {
			formData.append("files", files[i], files[i].name);
		}
		return axios({
			url: this.props.url,
			method: "post",
			headers: this.props.headers,
			data: formData
		});
	}

	render() {
		return (
			<button
				className={classnames('file-button',this.props.className)}
				style={this.props.style}
				type="button">
				<input
					multiple={this.props.multiple}
					type="file"
					onChange={event=>{
						this._upload(event.target.files)
							.then((...args)=>{
								this.props.onUpload(null,...args);
							})
							.catch(...args=>{
								this.props.onUpload(...args);
							})
					}}/>
				{this.props.children}
			</button>
		);
	}
}
