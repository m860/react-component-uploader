import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import axios from 'axios'

/**
 * FileButton - 上传按钮 {@link ./src/app.js example}
 *
 * @example <caption>上传单个文件</caption>
 *
 * <FileButton
 * url="http://0.0.0.0:8081/upload"
 * headers={{
 *						'content-type': 'multipart/form-data',
 *						"x-produce-authentication":"74533907dc42a6c5a4ea3a5dba7da4680d79b3c3ba203501d6154d3829642ea5ea5361474c7609b25a6fe8b64d15c8ce33dfb40bee64f587bef32ce07c75cfb2471f22172ba16fba2cacea623da2a72c3da864e70dbc0b"
 *					}}
 * formData={{
 *						businessType:"gongyi"
 *					}}
 * onUpload={(err,{data})=>{
 *					if(err){
 *						alert(err.message);
 *					}
 *					else{
 *						if(data.success){
 *							const files=this.state.files.concat(data.data);
 *							this.setState({files});
 *						}
 *						else{
 *							alert(data.message)
 *						}
 *					}
 *				}}>上传文件</FileButton>
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
	 * @property {any} children ["添加文件"]
	 * */
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
		const style=Object.assign({
			position:"relative",
			overflow:"hidden"
		},this.props.style);
		return (
			<button
				className={this.props.className}
				style={style}
				type="button">
				<input
					multiple={this.props.multiple}
					type="file"
					style={{position:"absolute",top:0,bottom:0,left:0,right:0,width:"100%",opacity:0}}
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
