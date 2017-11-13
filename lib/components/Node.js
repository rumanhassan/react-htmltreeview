'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Component: Node
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Representation of an HTML element
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// http://www.w3.org/TR/html-markup/syntax.html#void-elements
var voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];

/**
 *
 */

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node() {
    _classCallCheck(this, Node);

    return _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).apply(this, arguments));
  }

  _createClass(Node, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextProps.node !== this.props.node;
    }
  }, {
    key: 'render',
    value: function render() {
      var customRender = this.props.customRender;

      var Renderable = this.getRenderable();
      return !customRender ? Renderable : customRender(function (decorate) {
        return decorate(Renderable) || _react2.default.createElement(Renderable, Renderable.props);
      }, this.props.node.toJS());
    }
  }, {
    key: 'getRenderable',
    value: function getRenderable() {
      var _this2 = this;

      var _props = this.props,
          node = _props.node,
          update = _props.update,
          onHover = _props.onHover;


      var type = node.get('type');
      var name = node.get('name');
      var data = node.get('data');
      var attribs = node.get('attribs');
      var depth = node.get('depth');
      var children = node.get('children');

      var expanded = node.getIn(['state', 'expanded']);
      var selected = node.getIn(['state', 'selected']);
      var tailed = node.getIn(['state', 'tailed']);
      var unfocused = node.getIn(['state', 'unfocused']);

      var tagEventHandlers = {
        onMouseDown: function onMouseDown(e) {
          return update(e, _this2, 'triggerSelect', { tailed: false });
        }
      };
      if (onHover) {
        Object.assign(tagEventHandlers, {
          onMouseOver: function onMouseOver(e) {
            return update(e, _this2, 'toggleHover');
          },
          onMouseOut: function onMouseOut(e) {
            return update(e, _this2, 'toggleHover');
          }
        });
      }
      if (children && children.size && name !== 'html') {
        Object.assign(tagEventHandlers, {
          onDoubleClick: function onDoubleClick(e) {
            return update(e, _this2, 'toggleExpand');
          }
        });
      }

      // indentation
      var base = {
        paddingLeft: (depth + 1) * 10
      };

      var modifier = {
        selected: selected,
        unfocused: unfocused,
        tailed: tailed

        // render: text + comments
      };if (type === 'text' || type === 'comment') {
        return _react2.default.createElement(
          'div',
          { className: 'Node' },
          _react2.default.createElement(
            'div',
            _extends({ className: (0, _classnames2.default)(["Node__Tag", "Node__Head", modifier]), style: base }, tagEventHandlers),
            type === 'text' ? _react2.default.createElement(
              'span',
              { className: 'Node__Wrap' },
              '"',
              _react2.default.createElement(
                'span',
                { className: 'Node__Text' },
                data
              ),
              '"'
            ) : _react2.default.createElement(
              'span',
              { className: 'Node__Comment' },
              '<!--' + data + '-->'
            )
          )
        );
      }

      // format: single-line tag, entries without children or just one + self-closing tags (e.g. images)
      if (!children || children.size === 1 && children.getIn([0, 'type']) === 'text') {
        var content = children && children.getIn([0, 'data']) || voidTags.indexOf(name) === -1;
        if (typeof content === 'boolean' || content.length < 500) {
          // only include less than 500
          return _react2.default.createElement(
            'div',
            { className: 'Node' },
            _react2.default.createElement(
              'div',
              _extends({ className: (0, _classnames2.default)(["Node__Tag", "Node__Head", modifier]), style: base }, tagEventHandlers),
              _react2.default.createElement(
                'span',
                { className: 'Node__Container' },
                this.getOpenTag(!content),
                content && _react2.default.createElement(
                  'span',
                  { className: 'Node__Content' },
                  content
                ),
                content && this.getCloseTag()
              )
            )
          );
        }
      }

      // indentation
      var baseExpander = {
        left: base.paddingLeft - 12

        // render: collapsed + extended content
      };var head = _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)(["Node__Tag", "Node__Head", modifier]), style: base }, tagEventHandlers),
        name !== 'html' && _react2.default.createElement(
          'span',
          { className: 'Node__Expander', style: baseExpander, onMouseDown: function onMouseDown(e) {
              return update(e, _this2, 'toggleExpand');
            } },
          !expanded ? _react2.default.createElement(
            'span',
            null,
            '\u25B6'
          ) : _react2.default.createElement(
            'span',
            null,
            '\u25BC'
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'Node__Container' },
          this.getOpenTag(),
          !expanded && _react2.default.createElement(
            'span',
            null,
            '\u2026'
          ),
          !expanded && this.getCloseTag()
        )
      );

      // invoke head styling
      if (!selected && !unfocused) {
        Object.assign(tagEventHandlers, {
          onMouseOver: function onMouseOver(e) {
            return update(e, _this2, 'toggleHover', { tailed: true });
          },
          onMouseOut: function onMouseOut(e) {
            return update(e, _this2, 'toggleHover', { tailed: false });
          }
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'Node' },
        head,
        expanded && _react2.default.createElement(
          'div',
          { className: 'Node__Children' },
          children.map(function (child, i) {
            return _react2.default.createElement(Node, _extends({}, _this2.props, { node: child, key: i }));
          })
        ),
        expanded && _react2.default.createElement(
          'div',
          _extends({
            className: (0, _classnames2.default)(["Node__Tag", "Node__Tail", modifier]), style: base
          }, tagEventHandlers, {
            onMouseDown: function onMouseDown(e) {
              return update(e, _this2, 'triggerSelect', { tailed: true });
            }
          }),
          this.getCloseTag()
        )
      );
    }
  }, {
    key: 'getOpenTag',
    value: function getOpenTag(selfclosing) {
      var node = this.props.node;

      var name = node.get('name');
      var attribs = node.get('attribs');
      return _react2.default.createElement(
        'span',
        { className: 'Node__Wrap' },
        '<',
        _react2.default.createElement(
          'span',
          { className: 'Node__Name' },
          name
        ),
        attribs && attribs.entrySeq().map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          var isLink = ['src', 'href'].indexOf(key) > -1;
          return _react2.default.createElement(
            'span',
            { className: 'Node__Wrap', key: key },
            '\xA0',
            _react2.default.createElement(
              'span',
              { className: 'Node__AttributeKey' },
              key
            ),
            '="',
            !isLink ? _react2.default.createElement(
              'span',
              { className: 'Node__AttributeValue' },
              value
            ) : _react2.default.createElement(
              'a',
              { className: (0, _classnames2.default)(['Node__AttributeValue'], {
                  link: true,
                  external: /^https?:/.test(value)
                }),
                href: value, target: '_blank'
              },
              value
            ),
            '"'
          );
        }),
        selfclosing && '/',
        '>'
      );
    }
  }, {
    key: 'getCloseTag',
    value: function getCloseTag() {
      var node = this.props.node;

      var name = node.get('name');
      return _react2.default.createElement(
        'span',
        { className: 'Node__Wrap' },
        '<',
        _react2.default.createElement(
          'span',
          { className: 'Node__Name' },
          '/' + name
        ),
        '>'
      );
    }
  }]);

  return Node;
}(_react.Component);

Node.propTypes = {
  node: _react.PropTypes.object.isRequired,
  update: _react.PropTypes.func.isRequired,
  onHover: _react.PropTypes.func,
  customRenderer: _react.PropTypes.func
};
exports.default = Node;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTm9kZS5qc3giXSwibmFtZXMiOlsidm9pZFRhZ3MiLCJOb2RlIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwibm9kZSIsInByb3BzIiwiY3VzdG9tUmVuZGVyIiwiUmVuZGVyYWJsZSIsImdldFJlbmRlcmFibGUiLCJkZWNvcmF0ZSIsInRvSlMiLCJ1cGRhdGUiLCJvbkhvdmVyIiwidHlwZSIsImdldCIsIm5hbWUiLCJkYXRhIiwiYXR0cmlicyIsImRlcHRoIiwiY2hpbGRyZW4iLCJleHBhbmRlZCIsImdldEluIiwic2VsZWN0ZWQiLCJ0YWlsZWQiLCJ1bmZvY3VzZWQiLCJ0YWdFdmVudEhhbmRsZXJzIiwib25Nb3VzZURvd24iLCJlIiwiT2JqZWN0IiwiYXNzaWduIiwib25Nb3VzZU92ZXIiLCJvbk1vdXNlT3V0Iiwic2l6ZSIsIm9uRG91YmxlQ2xpY2siLCJiYXNlIiwicGFkZGluZ0xlZnQiLCJtb2RpZmllciIsImNvbnRlbnQiLCJpbmRleE9mIiwibGVuZ3RoIiwiZ2V0T3BlblRhZyIsImdldENsb3NlVGFnIiwiYmFzZUV4cGFuZGVyIiwibGVmdCIsImhlYWQiLCJtYXAiLCJjaGlsZCIsImkiLCJzZWxmY2xvc2luZyIsImVudHJ5U2VxIiwia2V5IiwidmFsdWUiLCJpc0xpbmsiLCJsaW5rIiwiZXh0ZXJuYWwiLCJ0ZXN0IiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJjdXN0b21SZW5kZXJlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBTUE7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFQQTs7Ozs7O0FBU0E7QUFDQSxJQUFNQSxXQUFXLENBQ2YsTUFEZSxFQUNQLE1BRE8sRUFDQyxJQURELEVBQ08sS0FEUCxFQUNjLFNBRGQsRUFDeUIsT0FEekIsRUFDa0MsSUFEbEMsRUFDd0MsS0FEeEMsRUFFZixPQUZlLEVBRU4sUUFGTSxFQUVJLE1BRkosRUFFWSxVQUZaLEVBRXdCLE1BRnhCLEVBRWdDLE9BRmhD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InNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyBDb21wb25lbnQ6IE5vZGVcbiAqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhbiBIVE1MIGVsZW1lbnRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5cbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWwtbWFya3VwL3N5bnRheC5odG1sI3ZvaWQtZWxlbWVudHNcbmNvbnN0IHZvaWRUYWdzID0gW1xuICAnYXJlYScsICdiYXNlJywgJ2JyJywgJ2NvbCcsICdjb21tYW5kJywgJ2VtYmVkJywgJ2hyJywgJ2ltZycsXG4gICdpbnB1dCcsICdrZXlnZW4nLCAnbGluaycsICdtZW51aXRlbScsICdtZXRhJywgJ3BhcmFtJywgJ3NvdXJjZScsXG4gICd0cmFjaycsICd3YnInXG5dXG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm9kZSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBub2RlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uSG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGN1c3RvbVJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZSAobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICByZXR1cm4gbmV4dFByb3BzLm5vZGUgIT09IHRoaXMucHJvcHMubm9kZVxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgY29uc3QgeyBjdXN0b21SZW5kZXIgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBSZW5kZXJhYmxlID0gdGhpcy5nZXRSZW5kZXJhYmxlKClcbiAgICByZXR1cm4gKCFjdXN0b21SZW5kZXIpID8gUmVuZGVyYWJsZSA6IGN1c3RvbVJlbmRlcigoZGVjb3JhdGUpID0+IHtcbiAgICAgIHJldHVybiBkZWNvcmF0ZShSZW5kZXJhYmxlKSB8fCA8UmVuZGVyYWJsZSB7Li4uUmVuZGVyYWJsZS5wcm9wc30vPlxuICAgIH0sIHRoaXMucHJvcHMubm9kZS50b0pTKCkpXG4gIH1cblxuICBnZXRSZW5kZXJhYmxlKCl7XG4gICAgY29uc3QgeyBub2RlLCB1cGRhdGUsIG9uSG92ZXIgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IHR5cGUgPSBub2RlLmdldCgndHlwZScpXG4gICAgY29uc3QgbmFtZSA9IG5vZGUuZ2V0KCduYW1lJylcbiAgICBjb25zdCBkYXRhID0gbm9kZS5nZXQoJ2RhdGEnKVxuICAgIGNvbnN0IGF0dHJpYnMgPSBub2RlLmdldCgnYXR0cmlicycpXG4gICAgY29uc3QgZGVwdGggPSBub2RlLmdldCgnZGVwdGgnKVxuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5nZXQoJ2NoaWxkcmVuJylcblxuICAgIGNvbnN0IGV4cGFuZGVkID0gbm9kZS5nZXRJbihbJ3N0YXRlJywgJ2V4cGFuZGVkJ10pXG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLmdldEluKFsnc3RhdGUnLCAnc2VsZWN0ZWQnXSlcbiAgICBjb25zdCB0YWlsZWQgPSBub2RlLmdldEluKFsnc3RhdGUnLCAndGFpbGVkJ10pXG4gICAgY29uc3QgdW5mb2N1c2VkID0gbm9kZS5nZXRJbihbJ3N0YXRlJywgJ3VuZm9jdXNlZCddKVxuXG4gICAgY29uc3QgdGFnRXZlbnRIYW5kbGVycyA9IHtcbiAgICAgIG9uTW91c2VEb3duOiAoZSkgPT4gdXBkYXRlKGUsIHRoaXMsICd0cmlnZ2VyU2VsZWN0JywgeyB0YWlsZWQ6IGZhbHNlIH0pXG4gICAgfVxuICAgIGlmIChvbkhvdmVyKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRhZ0V2ZW50SGFuZGxlcnMsIHtcbiAgICAgICAgb25Nb3VzZU92ZXI6IChlKSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUhvdmVyJyksXG4gICAgICAgIG9uTW91c2VPdXQ6IChlKSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUhvdmVyJylcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5zaXplICYmIG5hbWUgIT09ICdodG1sJykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0YWdFdmVudEhhbmRsZXJzLCB7XG4gICAgICAgIG9uRG91YmxlQ2xpY2s6IChlKSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUV4cGFuZCcpXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIGluZGVudGF0aW9uXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICBwYWRkaW5nTGVmdDogKGRlcHRoICsgMSkgKiAxMFxuICAgIH1cblxuICAgIHZhciBtb2RpZmllciA9IHtcbiAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgIHVuZm9jdXNlZDogdW5mb2N1c2VkLFxuICAgICAgdGFpbGVkXG4gICAgfVxuXG4gICAgLy8gcmVuZGVyOiB0ZXh0ICsgY29tbWVudHNcbiAgICBpZiAodHlwZSA9PT0gJ3RleHQnIHx8IHR5cGUgPT09ICdjb21tZW50Jykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJOb2RlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoW1wiTm9kZV9fVGFnXCIsIFwiTm9kZV9fSGVhZFwiLCBtb2RpZmllcl0pfSBzdHlsZT17YmFzZX0gey4uLnRhZ0V2ZW50SGFuZGxlcnN9PlxuICAgICAgICAgICAge3R5cGUgPT09ICd0ZXh0JyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fV3JhcFwiPlxuICAgICAgICAgICAgICAgIFwiPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fVGV4dFwiPntkYXRhfTwvc3Bhbj5cIlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19Db21tZW50XCI+XG4gICAgICAgICAgICAgICAge2A8IS0tJHtkYXRhfS0tPmB9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGZvcm1hdDogc2luZ2xlLWxpbmUgdGFnLCBlbnRyaWVzIHdpdGhvdXQgY2hpbGRyZW4gb3IganVzdCBvbmUgKyBzZWxmLWNsb3NpbmcgdGFncyAoZS5nLiBpbWFnZXMpXG4gICAgaWYgKCFjaGlsZHJlbiB8fCBjaGlsZHJlbi5zaXplID09PSAxICYmIGNoaWxkcmVuLmdldEluKFswLCAndHlwZSddKSA9PT0gJ3RleHQnKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2hpbGRyZW4gJiYgY2hpbGRyZW4uZ2V0SW4oWzAsICdkYXRhJ10pIHx8IHZvaWRUYWdzLmluZGV4T2YobmFtZSkgPT09IC0xXG4gICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdib29sZWFuJyB8fGNvbnRlbnQubGVuZ3RoIDwgNTAwKSB7IC8vIG9ubHkgaW5jbHVkZSBsZXNzIHRoYW4gNTAwXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJOb2RlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhbXCJOb2RlX19UYWdcIiwgXCJOb2RlX19IZWFkXCIsIG1vZGlmaWVyXSl9IHN0eWxlPXtiYXNlfSB7Li4udGFnRXZlbnRIYW5kbGVyc30+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX0NvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIHt0aGlzLmdldE9wZW5UYWcoIWNvbnRlbnQpfVxuICAgICAgICAgICAgICAgIHtjb250ZW50ICYmIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX0NvbnRlbnRcIj57Y29udGVudH08L3NwYW4+fVxuICAgICAgICAgICAgICAgIHtjb250ZW50ICYmIHRoaXMuZ2V0Q2xvc2VUYWcoKX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpbmRlbnRhdGlvblxuICAgIHZhciBiYXNlRXhwYW5kZXIgPSB7XG4gICAgICBsZWZ0OiBiYXNlLnBhZGRpbmdMZWZ0IC0gMTJcbiAgICB9XG5cbiAgICAvLyByZW5kZXI6IGNvbGxhcHNlZCArIGV4dGVuZGVkIGNvbnRlbnRcbiAgICBjb25zdCBoZWFkID0gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoW1wiTm9kZV9fVGFnXCIsIFwiTm9kZV9fSGVhZFwiLCBtb2RpZmllcl0pfSBzdHlsZT17YmFzZX0gey4uLnRhZ0V2ZW50SGFuZGxlcnN9PlxuICAgICAgICB7bmFtZSAhPT0gJ2h0bWwnICYmIChcbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19FeHBhbmRlclwiIHN0eWxlPXtiYXNlRXhwYW5kZXJ9IG9uTW91c2VEb3duPXsoZSkgPT4gdXBkYXRlKGUsIHRoaXMsICd0b2dnbGVFeHBhbmQnKX0+XG4gICAgICAgICAgICB7IWV4cGFuZGVkID8gPHNwYW4+JiM5NjU0Ozwvc3Bhbj4gOiA8c3Bhbj4mIzk2NjA7PC9zcGFuPn17LyoqICfilrYnIDogJ+KWvCcgKiovfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKX1cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fQ29udGFpbmVyXCI+XG4gICAgICAgICAge3RoaXMuZ2V0T3BlblRhZygpfVxuICAgICAgICAgIHshZXhwYW5kZWQgJiYgPHNwYW4+JmhlbGxpcDs8L3NwYW4+fVxuICAgICAgICAgIHshZXhwYW5kZWQgJiYgdGhpcy5nZXRDbG9zZVRhZygpfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApXG5cbiAgICAvLyBpbnZva2UgaGVhZCBzdHlsaW5nXG4gICAgaWYgKCFzZWxlY3RlZCAmJiAhdW5mb2N1c2VkKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRhZ0V2ZW50SGFuZGxlcnMsIHtcbiAgICAgICAgb25Nb3VzZU92ZXI6IChlKSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUhvdmVyJywgeyB0YWlsZWQ6IHRydWUgfSksXG4gICAgICAgIG9uTW91c2VPdXQ6IChlKSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RvZ2dsZUhvdmVyJywgeyB0YWlsZWQ6IGZhbHNlIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIk5vZGVcIj5cbiAgICAgICAge2hlYWR9XG4gICAgICAgIHtleHBhbmRlZCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJOb2RlX19DaGlsZHJlblwiPlxuICAgICAgICAgICAge2NoaWxkcmVuLm1hcCgoY2hpbGQsIGkpID0+IDxOb2RlIHsuLi50aGlzLnByb3BzfSBub2RlPXtjaGlsZH0ga2V5PXtpfS8+KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge2V4cGFuZGVkICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoW1wiTm9kZV9fVGFnXCIsIFwiTm9kZV9fVGFpbFwiLCBtb2RpZmllcl0pfSBzdHlsZT17YmFzZX1cbiAgICAgICAgICAgIHsuLi50YWdFdmVudEhhbmRsZXJzfVxuICAgICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiB1cGRhdGUoZSwgdGhpcywgJ3RyaWdnZXJTZWxlY3QnLCB7IHRhaWxlZDogdHJ1ZSB9KX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5nZXRDbG9zZVRhZygpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgZ2V0T3BlblRhZyAoc2VsZmNsb3NpbmcpIHtcbiAgICBjb25zdCB7IG5vZGUgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBuYW1lID0gbm9kZS5nZXQoJ25hbWUnKVxuICAgIGNvbnN0IGF0dHJpYnMgPSBub2RlLmdldCgnYXR0cmlicycpXG4gICAgcmV0dXJuICAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19XcmFwXCI+XG4gICAgICAgICZsdDtcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fTmFtZVwiPntuYW1lfTwvc3Bhbj5cbiAgICAgICAge2F0dHJpYnMgJiYgYXR0cmlicy5lbnRyeVNlcSgpLm1hcCgoWyBrZXksIHZhbHVlIF0pID0+IHtcbiAgICAgICAgICBjb25zdCBpc0xpbmsgPSBbJ3NyYycsICdocmVmJ10uaW5kZXhPZihrZXkpID4gLTFcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fV3JhcFwiIGtleT17a2V5fT5cbiAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIk5vZGVfX0F0dHJpYnV0ZUtleVwiPntrZXl9PC9zcGFuPj1cIlxuICAgICAgICAgICAgICB7IWlzTGluayA/XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fQXR0cmlidXRlVmFsdWVcIj57dmFsdWV9PC9zcGFuPiA6XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFsnTm9kZV9fQXR0cmlidXRlVmFsdWUnXSwge1xuICAgICAgICAgICAgICAgICAgICBsaW5rOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBleHRlcm5hbDogL15odHRwcz86Ly50ZXN0KHZhbHVlKVxuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICBocmVmPXt2YWx1ZX0gdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7dmFsdWV9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICB9XCJcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApXG4gICAgICAgIH0pfVxuICAgICAgICB7c2VsZmNsb3NpbmcgJiYgJy8nfVxuICAgICAgICAmZ3Q7XG4gICAgICA8L3NwYW4+XG4gICAgKVxuICB9XG5cbiAgZ2V0Q2xvc2VUYWcoKXtcbiAgICBjb25zdCB7IG5vZGUgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBuYW1lID0gbm9kZS5nZXQoJ25hbWUnKVxuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJOb2RlX19XcmFwXCI+XG4gICAgICAgICZsdDtcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiTm9kZV9fTmFtZVwiPntgLyR7bmFtZX1gfTwvc3Bhbj5cbiAgICAgICAgJmd0O1xuICAgICAgPC9zcGFuPlxuICAgIClcbiAgfVxuXG59XG4iXX0=
