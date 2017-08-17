import React,{PureComponent} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

/**
 * Panel
 *
 * @example <caption>Simple Panel Demo</caption>
 * class PanelDemo extends Component{
 *	render(){
 *		return (
 *			<Panel title="Panel Title" renderRight={()=>{
 *				return (
 *					<button type="button" onClick={()=>{
 *						alert('pressed');
 *					}}>press me</button>
 *				);
 *			}}>
 *				<p>panel content</p>
 *			</Panel>
 *		);
 *	}
 * }
 *
 * */
export default class Uploader extends PureComponent{
	/**
	 * @property {String|ReactNode|HtmlElement} title - 标题
	 * @property {?Function} renderRight [ ()=>null ] - 右侧按钮
	 * @property {?Object} style - 样式
	 * @property {?String} className - class style
	 * */
	static propTypes={
		title:PropTypes.oneOfType([PropTypes.string,PropTypes.node,PropTypes.element]).isRequired,
		renderRight:PropTypes.func,
		style:PropTypes.object,
		className:PropTypes.any
	};
	static defaultProps={
		renderRight:()=>null
	};
	render(){
		return (
			<div className={classnames("panel",this.props.className)} style={this.props.style}>
				<div className="panel-header">
					<div className="panel-header-title">
						{this.props.title}
					</div>
					<div className="panel-header-right">
						{this.props.renderRight()}
					</div>
				</div>
				<div className="panel-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}