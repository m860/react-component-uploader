import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import axios from 'axios'

/**
 * FileButton - 上传按钮 {@link ./src/app.js example}
 *
 * @example <caption>上传单个文件</caption>
 *
 * <FileButton
 * 		url="http://0.0.0.0:8081/upload"
 * 		headers={{
 *			'content-type': 'multipart/form-data',
 *			"x-produce-authentication":"xxxx"
 *		}}
 *      formData={{
 *			businessType:"gongyi"
 *		}}
 *      onUpload={(err,{data})=>{
 *			if(err){
 *			alert(err.message);
 *		}
 *		else{
 *			if(data.success){
 *				const files=this.state.files.concat(data.data);
 *				this.setState({files});
 *			}
 *			else{
 *				alert(data.message)
 *			}
 *		}
 *	}}>上传文件</FileButton>
 *
 * */
export default class FileButton extends PureComponent {
	/**
	 * @property {?Object} style
	 * @property {?String} className
	 * @property {String} url - 上传文件的url地址
	 * @property {?Object} headers [{"content-type": "multipart/form-data"}] - request headers
	 * @property {?Object} formData [{}]
	 * @property {?Boolean} multiple [false] - 是否可以选择多个文件
	 * @property {?Function} onUpload [(err,res)=>null] - 上传成功/失败的回调
	 * @property {?Function} onUploadProgress - 上传进度条
	 * @property {any} children ["添加文件"]
	 * */
	static propTypes = {
		style: PropTypes.object,
		className: PropTypes.string,
		url: PropTypes.string.isRequired,
		headers: PropTypes.object,
		onUpload: PropTypes.func,
		onUploadProgress: PropTypes.func,
		formData: PropTypes.object,
		multiple: PropTypes.bool
	};
	static defaultProps = {
		children: "添加文件",
		headers: {},
		onUpload: (err)=>null,
		formData: {},
		multiple: false
	};

	constructor(props) {
		super(props);
		this._onUploadProgress = props.onUploadProgress || ((progressEvent)=> {
				if (progressEvent.lengthComputable) {
					const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
					this.setState(
						Object.assign({}, this.state, {
							uploadedPercent: percent,
							lengthComputable: true
						})
					)
				}
			});
		this.state = {
			files: props.value,
			useDefaultUploadProgress: !props.onUploadProgress,
			uploadedPercent: 0,//0~100
			uploading: false,
			lengthComputable: false
		};
	}

	get _text() {
		if (this.state.useDefaultUploadProgress && this.state.uploading && this.state.lengthComputable) {
			return `${this.state.uploadedPercent}%`;
		}
		return this.props.children;
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
			headers: Object.assign({
				"content-type": "multipart/form-data"
			}, this.props.headers),
			data: formData,
			onUploadProgress: this._onUploadProgress
		});
	}

	render() {
		const style = Object.assign({}, this.props.style, {
			position: "relative",
			overflow: "hidden"
		});
		return (
			<button
				disabled={this.state.uploading}
				className={this.props.className}
				style={style}
				type="button">
				<input
					multiple={this.props.multiple}
					type="file"
					disabled={this.state.uploading}
					style={styles.inputFile}
					onChange={event=>{
						const state = Object.assign({}, this.state, {
							uploading: true
						});
						const files=event.target.files;
						this.setState(state,()=>{
							this._upload(files)
								.then((...args)=>{
									this.setState(
										Object.assign({},this.state,{
											uploading:false,
											lengthComputable:false
										}),
										()=>{
											this.props.onUpload(null,...args);
										}
									);
								})
								.catch(...args=>{
									this.setState(
										Object.assign({},this.state,{
											uploading:false,
											lengthComputable:false
										}),
										()=>{
											this.props.onUpload(...args);
										}
									);
								});
						});

					}}/>
				{this._text}
			</button>
		);
	}
}


const styles = {
	inputFile: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: "100%",
		opacity: 0
	}
};
