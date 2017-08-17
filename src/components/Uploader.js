import React, {PureComponent} from "react";
import PropTypes from "prop-types";

export default class Uploader extends PureComponent {
	static propTypes = {
		value: PropTypes.array,
		onChange: PropTypes.func,
		renderAddText: PropTypes.func,
		renderCloseText: PropTypes.func,
	};
	static defaultProps = {
		value: [],
		onChange: ()=>null,
		renderAddText: ()=>"添加文件",
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
				{this.state.files.map((f, i)=> {
					return (
						<div key={i} className="file">
							{f.name}
							<a href="javascript:void(0)" onClick={()=>{
									let files=[...this.state.files];
									files.splice(i,1);
									const state={
										files
									};
									const changedFiles=[f];
									this.setState(state,()=>{
										this.props.onChange(changedFiles,[...this.state.files]);
									});
								}}>{this.props.renderCloseText()}</a>
						</div>
					);
				})}
				<button className="button-file" type="button">
					<input type="file" onChange={event=>{
						const files=event.target.files;
						const len=files.length;
						if(len>0){
							let state={
								files:[...this.state.files]
							};
							let changedFiles=[];
							for(let i=0;i<len;i++){
								state.files.push(files[i]);
								changedFiles.push(files[i]);
							}
							this.setState(state,()=>{
								this.props.onChange(changedFiles,[...this.state.files]);
							});
						}
					}}/>
					{this.props.renderAddText()}
				</button>
			</div>
		);
	}
}
