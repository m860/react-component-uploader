"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Uploader = function (_PureComponent) {
	_inherits(Uploader, _PureComponent);

	function Uploader(props) {
		_classCallCheck(this, Uploader);

		var _this = _possibleConstructorReturn(this, (Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call(this, props));

		_this.state = {
			files: props.value
		};
		return _this;
	}

	_createClass(Uploader, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ className: "uploader" },
				this.state.files.map(function (f, i) {
					return _react2.default.createElement(
						"div",
						{ key: i, className: "file" },
						f.name,
						_react2.default.createElement(
							"a",
							{ href: "javascript:void(0)", onClick: function onClick() {
									var files = [].concat(_toConsumableArray(_this2.state.files));
									files.splice(i, 1);
									var state = {
										files: files
									};
									var changedFiles = [f];
									_this2.setState(state, function () {
										_this2.props.onChange(changedFiles, [].concat(_toConsumableArray(_this2.state.files)));
									});
								} },
							_this2.props.renderCloseText()
						)
					);
				}),
				_react2.default.createElement(
					"button",
					{ className: "button-file", type: "button" },
					_react2.default.createElement("input", { type: "file", onChange: function onChange(event) {
							var files = event.target.files;
							var len = files.length;
							if (len > 0) {
								var state = {
									files: [].concat(_toConsumableArray(_this2.state.files))
								};
								var changedFiles = [];
								for (var i = 0; i < len; i++) {
									state.files.push(files[i]);
									changedFiles.push(files[i]);
								}
								_this2.setState(state, function () {
									_this2.props.onChange(changedFiles, [].concat(_toConsumableArray(_this2.state.files)));
								});
							}
						} }),
					this.props.renderAddText()
				)
			);
		}
	}]);

	return Uploader;
}(_react.PureComponent);

Uploader.propTypes = {
	value: _propTypes2.default.array,
	onChange: _propTypes2.default.func,
	renderAddText: _propTypes2.default.func,
	renderCloseText: _propTypes2.default.func
};
Uploader.defaultProps = {
	value: [],
	onChange: function onChange() {
		return null;
	},
	renderAddText: function renderAddText() {
		return "添加文件";
	},
	renderCloseText: function renderCloseText() {
		return "x";
	}
};
exports.default = Uploader;