import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class Uploader extends PureComponent {
	static propTypes = {
		value: PropTypes.array,
		onChange: PropTypes.func,
		renderAddText: PropTypes.func,
		renderUploadText: PropTypes.func,
		onUploadClick: PropTypes.func,
		renderCloseText: PropTypes.func,
	};
	static defaultProps = {
		value: [],
		onChange: ()=>null,
		renderAddText: ()=>"添加文件",
		renderUploadText: ()=>"上传",
		onUploadClick: ()=>null,
		renderCloseText: ()=>"x"
	};

	constructor(props) {
		super(props);
		this.state = {
			files: props.value
		};
	}

	render() {
		return (
			<div className="uploader">
				<div>
					<button className="button-file" type="button">
						<input type="file" onChange={event=>{
						const files=event.target.files;
						const len=files.length;
						if(len>0){
							let state={
								files:[...this.state.files]
							};
							for(let i=0;i<len;i++){
								state.files.push(files[i]);
							}
							this.setState(state,()=>{
								this.props.onChange(files,[...this.state.files]);
							});
						}
					}}/>
						{this.props.renderAddText()}
					</button>
					<button onClick={event=>{
						this.props.onUploadClick(event,this.state.files);
					}} className="button-upload" type="button">
						{this.props.renderUploadText()}
					</button>
				</div>
				<div>
					{this.state.files.map((f, i)=> {
						return (
							<div key={i} className="file">
								{f.name}
								<a href="javascript:void(0)" onClick={()=>{
									let files=[...this.state.files];
									files.splice(i,1);
									const state={
										files
									}
									this.setState(state,()=>{
										this.props.onChange([f],[...this.state.files]);
									});
								}}>{this.props.renderCloseText()}</a>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
