"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var FileButton = function (_PureComponent) {
	_inherits(FileButton, _PureComponent);

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
	function FileButton(props) {
		_classCallCheck(this, FileButton);

		var _this = _possibleConstructorReturn(this, (FileButton.__proto__ || Object.getPrototypeOf(FileButton)).call(this, props));

		_this.state = {
			files: props.value
		};
		return _this;
	}

	_createClass(FileButton, [{
		key: "_upload",
		value: function _upload(files) {
			var formData = new FormData();
			for (var key in this.props.formData) {
				formData.append(key, this.props.formData[key]);
			}
			for (var i = 0; i < files.length; i++) {
				formData.append("files", files[i], files[i].name);
			}
			return (0, _axios2.default)({
				url: this.props.url,
				method: "post",
				headers: this.props.headers,
				data: formData
			});
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var style = Object.assign({
				position: "relative",
				overflow: "hidden"
			}, this.props.style);
			return _react2.default.createElement(
				"button",
				{
					className: this.props.className,
					style: style,
					type: "button" },
				_react2.default.createElement("input", {
					multiple: this.props.multiple,
					type: "file",
					style: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, width: "100%", opacity: 0 },
					onChange: function onChange(event) {
						var _upload$then;

						(_upload$then = _this2._upload(event.target.files).then(function () {
							var _props;

							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
							}

							(_props = _this2.props).onUpload.apply(_props, [null].concat(args));
						})).catch.apply(_upload$then, _toConsumableArray(function (args) {
							var _props2;

							(_props2 = _this2.props).onUpload.apply(_props2, _toConsumableArray(args));
						}));
					} }),
				this.props.children
			);
		}
	}]);

	return FileButton;
}(_react.PureComponent);

FileButton.propTypes = {
	style: _propTypes2.default.object,
	className: _propTypes2.default.string,
	url: _propTypes2.default.string.isRequired,
	headers: _propTypes2.default.object,
	onUpload: _propTypes2.default.func,
	formData: _propTypes2.default.object,
	multiple: _propTypes2.default.bool
};
FileButton.defaultProps = {
	children: "添加文件",
	headers: {
		"content-type": "multipart/form-data"
	},
	onUpload: function onUpload(err) {
		return null;
	},
	formData: {},
	multiple: false
};
exports.default = FileButton;