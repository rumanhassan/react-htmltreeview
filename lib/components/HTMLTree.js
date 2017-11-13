'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _server = require('react-dom/server');

var _htmlparser = require('htmlparser2');

var _themes = require('../themes/');

var _themes2 = _interopRequireDefault(_themes);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Component: HTMLTree
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Public interface of the component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isBrowser = typeof HTMLElement !== 'undefined';

/**
 *
 */

var HTMLTree = function (_Component) {
  _inherits(HTMLTree, _Component);

  function HTMLTree() {
    _classCallCheck(this, HTMLTree);

    return _possibleConstructorReturn(this, (HTMLTree.__proto__ || Object.getPrototypeOf(HTMLTree)).apply(this, arguments));
  }

  _createClass(HTMLTree, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var source = this.props.source;
      // keep state of provided source and representation view in sync

      if (isBrowser && source instanceof HTMLElement) {
        var element = (0, _reactDom.findDOMNode)(this);
        this.observer = new MutationObserver(function (mutations) {
          var inception = mutations.some(function (mutation) {
            return element.contains(mutation.target);
          });
          if (!inception) {
            _this2.forceUpdate();
          }
        }).observe(source, {
          childList: true,
          subtree: true,
          attributes: true
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          source = _props.source,
          theme = _props.theme,
          defaultsAndEventHandlers = _objectWithoutProperties(_props, ['source', 'theme']);

      var origin = isBrowser && source instanceof HTMLElement && source;
      var tree = (0, _htmlparser.parseDOM)( /** sourceText **/
      origin ? source.outerHTML : _react2.default.isValidElement(source) ? (0, _server.renderToString)(source) : source.replace(/<!DOCTYPE(.|\n|\r)*?>/i, ''));

      var componentStyles = (0, _themes2.default)(theme);

      return _react2.default.createElement(
        'div',
        { className: 'HTMLTree' },
        _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: componentStyles } }),
        _react2.default.createElement(_Container2.default, _extends({ tree: tree, origin: origin || null }, defaultsAndEventHandlers))
      );
    }
  }]);

  return HTMLTree;
}(_react.Component);

HTMLTree.defaultProps = {
  theme: 'chrome-devtools',
  defaultExpandedTags: ['html', 'body']
};
HTMLTree.propTypes = {
  source: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node, _react.PropTypes.instanceOf(isBrowser ? HTMLElement : Object)]).isRequired,
  theme: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
  defaultExpandedTags: _react.PropTypes.array.isRequired,
  customRender: _react.PropTypes.func,
  onHover: _react.PropTypes.func,
  onExpand: _react.PropTypes.func,
  onSelect: _react.PropTypes.func,
  onUnfocus: _react.PropTypes.func
};
exports.default = HTMLTree;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSFRNTFRyZWUuanN4Il0sIm5hbWVzIjpbImlzQnJvd3NlciIsIkhUTUxFbGVtZW50IiwiSFRNTFRyZWUiLCJzb3VyY2UiLCJwcm9wcyIsImVsZW1lbnQiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJpbmNlcHRpb24iLCJzb21lIiwibXV0YXRpb24iLCJjb250YWlucyIsInRhcmdldCIsImZvcmNlVXBkYXRlIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJhdHRyaWJ1dGVzIiwiZGlzY29ubmVjdCIsInRoZW1lIiwiZGVmYXVsdHNBbmRFdmVudEhhbmRsZXJzIiwib3JpZ2luIiwidHJlZSIsIm91dGVySFRNTCIsImlzVmFsaWRFbGVtZW50IiwicmVwbGFjZSIsImNvbXBvbmVudFN0eWxlcyIsIl9faHRtbCIsImRlZmF1bHRQcm9wcyIsImRlZmF1bHRFeHBhbmRlZFRhZ3MiLCJwcm9wVHlwZXMiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJub2RlIiwiaW5zdGFuY2VPZiIsIk9iamVjdCIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJhcnJheSIsImN1c3RvbVJlbmRlciIsImZ1bmMiLCJvbkhvdmVyIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uVW5mb2N1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7OytlQVpBOzs7Ozs7QUFjQSxJQUFNQSxZQUFZLE9BQU9DLFdBQVAsS0FBdUIsV0FBekM7O0FBRUE7Ozs7SUFHcUJDLFE7Ozs7Ozs7Ozs7O3dDQXlCQTtBQUFBOztBQUFBLFVBQ1RDLE1BRFMsR0FDRSxLQUFLQyxLQURQLENBQ1RELE1BRFM7QUFFakI7O0FBQ0EsVUFBSUgsYUFBYUcsa0JBQWtCRixXQUFuQyxFQUFnRDtBQUM5QyxZQUFNSSxVQUFVLDJCQUFZLElBQVosQ0FBaEI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQUlDLGdCQUFKLENBQXFCLFVBQUNDLFNBQUQsRUFBZTtBQUNsRCxjQUFNQyxZQUFZRCxVQUFVRSxJQUFWLENBQWUsVUFBQ0MsUUFBRDtBQUFBLG1CQUFjTixRQUFRTyxRQUFSLENBQWlCRCxTQUFTRSxNQUExQixDQUFkO0FBQUEsV0FBZixDQUFsQjtBQUNBLGNBQUksQ0FBQ0osU0FBTCxFQUFnQjtBQUNkLG1CQUFLSyxXQUFMO0FBQ0Q7QUFDRixTQUxlLEVBS2JDLE9BTGEsQ0FLTFosTUFMSyxFQUtHO0FBQ2pCYSxxQkFBVyxJQURNO0FBRWpCQyxtQkFBUyxJQUZRO0FBR2pCQyxzQkFBWTtBQUhLLFNBTEgsQ0FBaEI7QUFVRDtBQUNGOzs7MkNBRXFCO0FBQ3BCLFVBQUksS0FBS1osUUFBVCxFQUFtQjtBQUNqQixhQUFLQSxRQUFMLENBQWNhLFVBQWQ7QUFDRDtBQUNGOzs7NkJBRU87QUFBQSxtQkFDaUQsS0FBS2YsS0FEdEQ7QUFBQSxVQUNFRCxNQURGLFVBQ0VBLE1BREY7QUFBQSxVQUNVaUIsS0FEVixVQUNVQSxLQURWO0FBQUEsVUFDb0JDLHdCQURwQjs7QUFHTixVQUFNQyxTQUFTdEIsYUFBYUcsa0JBQWtCRixXQUEvQixJQUE4Q0UsTUFBN0Q7QUFDQSxVQUFNb0IsT0FBTywyQkFBUztBQUNwQkQsZUFBU25CLE9BQU9xQixTQUFoQixHQUNDLGdCQUFNQyxjQUFOLENBQXFCdEIsTUFBckIsSUFBK0IsNEJBQWVBLE1BQWYsQ0FBL0IsR0FBd0RBLE9BQU91QixPQUFQLENBQWUsd0JBQWYsRUFBeUMsRUFBekMsQ0FGOUMsQ0FBYjs7QUFLQSxVQUFNQyxrQkFBa0Isc0JBQVVQLEtBQVYsQ0FBeEI7O0FBRUEsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLFVBQWY7QUFDRSxpREFBTyx5QkFBeUIsRUFBRVEsUUFBUUQsZUFBVixFQUFoQyxHQURGO0FBRUUsc0VBQVcsTUFBTUosSUFBakIsRUFBdUIsUUFBUUQsVUFBUSxJQUF2QyxJQUFpREQsd0JBQWpEO0FBRkYsT0FERjtBQU1EOzs7Ozs7QUFsRWtCbkIsUSxDQUVaMkIsWSxHQUFlO0FBQ3BCVCxTQUFPLGlCQURhO0FBRXBCVSx1QkFBcUIsQ0FBQyxNQUFELEVBQVMsTUFBVDtBQUZELEM7QUFGSDVCLFEsQ0FPWjZCLFMsR0FBWTtBQUNqQjVCLFVBQVEsaUJBQVU2QixTQUFWLENBQW9CLENBQzFCLGlCQUFVQyxNQURnQixFQUUxQixpQkFBVUMsSUFGZ0IsRUFHMUIsaUJBQVVDLFVBQVYsQ0FBcUJuQyxZQUFZQyxXQUFaLEdBQTBCbUMsTUFBL0MsQ0FIMEIsQ0FBcEIsRUFJTEMsVUFMYztBQU1qQmpCLFNBQU8saUJBQVVZLFNBQVYsQ0FBb0IsQ0FDekIsaUJBQVVDLE1BRGUsRUFFekIsaUJBQVVLLE1BRmUsQ0FBcEIsRUFHSkQsVUFUYztBQVVqQlAsdUJBQXFCLGlCQUFVUyxLQUFWLENBQWdCRixVQVZwQjtBQVdqQkcsZ0JBQWMsaUJBQVVDLElBWFA7QUFZakJDLFdBQVMsaUJBQVVELElBWkY7QUFhakJFLFlBQVUsaUJBQVVGLElBYkg7QUFjakJHLFlBQVUsaUJBQVVILElBZEg7QUFlakJJLGFBQVcsaUJBQVVKO0FBZkosQztrQkFQQXZDLFEiLCJmaWxlIjoiY29tcG9uZW50cy9IVE1MVHJlZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyBDb21wb25lbnQ6IEhUTUxUcmVlXG4gKlxuICogUHVibGljIGludGVyZmFjZSBvZiB0aGUgY29tcG9uZW50XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCwgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCB7IHBhcnNlRE9NIH0gZnJvbSAnaHRtbHBhcnNlcjInXG5cbmltcG9ydCBnZXRTdHlsZXMgZnJvbSAnLi4vdGhlbWVzLydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXInXG5cbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MVHJlZSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0aGVtZTogJ2Nocm9tZS1kZXZ0b29scycsXG4gICAgZGVmYXVsdEV4cGFuZGVkVGFnczogWydodG1sJywgJ2JvZHknXVxuICB9O1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc291cmNlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKGlzQnJvd3NlciA/IEhUTUxFbGVtZW50IDogT2JqZWN0KSxcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIHRoZW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMub2JqZWN0XG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBkZWZhdWx0RXhwYW5kZWRUYWdzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBjdXN0b21SZW5kZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbmZvY3VzOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgY29uc3QgeyBzb3VyY2UgfSA9IHRoaXMucHJvcHNcbiAgICAvLyBrZWVwIHN0YXRlIG9mIHByb3ZpZGVkIHNvdXJjZSBhbmQgcmVwcmVzZW50YXRpb24gdmlldyBpbiBzeW5jXG4gICAgaWYgKGlzQnJvd3NlciAmJiBzb3VyY2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGZpbmRET01Ob2RlKHRoaXMpXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICBjb25zdCBpbmNlcHRpb24gPSBtdXRhdGlvbnMuc29tZSgobXV0YXRpb24pID0+IGVsZW1lbnQuY29udGFpbnMobXV0YXRpb24udGFyZ2V0KSlcbiAgICAgICAgaWYgKCFpbmNlcHRpb24pIHtcbiAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgfVxuICAgICAgfSkub2JzZXJ2ZShzb3VyY2UsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgY29uc3QgeyBzb3VyY2UsIHRoZW1lLCAuLi5kZWZhdWx0c0FuZEV2ZW50SGFuZGxlcnMgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IG9yaWdpbiA9IGlzQnJvd3NlciAmJiBzb3VyY2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBzb3VyY2VcbiAgICBjb25zdCB0cmVlID0gcGFyc2VET00oLyoqIHNvdXJjZVRleHQgKiovXG4gICAgICBvcmlnaW4gPyBzb3VyY2Uub3V0ZXJIVE1MIDpcbiAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChzb3VyY2UpID8gcmVuZGVyVG9TdHJpbmcoc291cmNlKSA6IHNvdXJjZS5yZXBsYWNlKC88IURPQ1RZUEUoLnxcXG58XFxyKSo/Pi9pLCAnJykpXG4gICAgKVxuXG4gICAgY29uc3QgY29tcG9uZW50U3R5bGVzID0gZ2V0U3R5bGVzKHRoZW1lKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSFRNTFRyZWVcIj5cbiAgICAgICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogY29tcG9uZW50U3R5bGVzIH19Lz5cbiAgICAgICAgPENvbnRhaW5lciB0cmVlPXt0cmVlfSBvcmlnaW49e29yaWdpbnx8bnVsbH0gey4uLmRlZmF1bHRzQW5kRXZlbnRIYW5kbGVyc30vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cbiJdfQ==
