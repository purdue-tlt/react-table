'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
//


var emptyObj = function emptyObj() {
  return {};
};

exports.default = {
  // General
  data: [],
  resolveData: function resolveData(data) {
    return data;
  },
  loading: false,
  showPagination: true,
  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPage: 0,
  defaultPageSize: 20,
  showPageJump: true,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  sortable: true,
  multiSort: true,
  resizable: true,
  filterable: false,
  defaultSortDesc: false,
  defaultSorted: [],
  defaultFiltered: [],
  defaultResized: [],
  defaultExpanded: {},
  // eslint-disable-next-line no-unused-vars
  defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
    var id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
  },
  // eslint-disable-next-line no-unused-vars
  defaultSortMethod: function defaultSortMethod(a, b, desc) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? '' : a;
    b = b === null || b === undefined ? '' : b;
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0;
  },

  // Controlled State Props
  // page: undefined,
  // pageSize: undefined,
  // sorted: [],
  // filtered: [],
  // resized: [],
  // expanded: {},

  // Controlled State Callbacks
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortedChange: undefined,
  onFilteredChange: undefined,
  onResizedChange: undefined,
  onExpandedChange: undefined,

  // Pivoting
  pivotBy: undefined,

  // Key Constants
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',
  aggregatedKey: '_aggregated',
  nestingLevelKey: '_nestingLevel',
  originalKey: '_original',
  indexKey: '_index',
  groupedByPivotKey: '_groupedByPivot',

  // Server-side Callbacks
  onFetchData: function onFetchData() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,
  getResizerProps: emptyObj,

  // Global Column Defaults
  column: {
    // Renderers
    Cell: undefined,
    Header: undefined,
    Footer: undefined,
    Aggregated: undefined,
    Pivot: undefined,
    PivotValue: undefined,
    Expander: undefined,
    Filter: undefined,
    // All Columns
    sortable: undefined, // use table default
    resizable: undefined, // use table default
    filterable: undefined, // use table default
    show: true,
    minWidth: 100,
    // Cells only
    className: '',
    style: {},
    getProps: emptyObj,
    // Pivot only
    aggregate: undefined,
    // Headers only
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    filterAll: false,
    sortMethod: undefined
  },

  // Global Expander Column Defaults
  expanderDefaults: {
    sortable: false,
    resizable: false,
    filterable: false,
    width: 35
  },

  pivotDefaults: {
    // extend the defaults for pivoted columns here
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',
  pageJumpText: 'jump to page',
  rowsSelectorText: 'rows per page',

  // Components
  TableComponent: function TableComponent(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({
        className: (0, _classnames2.default)('rt-table', className),
        role: 'grid'
        // tabIndex='0'
      }, rest),
      children
    );
  },
  TheadComponent: _utils2.default.makeTemplateComponent('rt-thead', 'Thead'),
  TbodyComponent: _utils2.default.makeTemplateComponent('rt-tbody', 'Tbody'),
  TrGroupComponent: function TrGroupComponent(_ref2) {
    var children = _ref2.children,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-tr-group', className), role: 'rowgroup' }, rest),
      children
    );
  },
  TrComponent: function TrComponent(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-tr', className), role: 'row' }, rest),
      children
    );
  },
  ThComponent: function ThComponent(_ref4) {
    var toggleSort = _ref4.toggleSort,
        className = _ref4.className,
        children = _ref4.children,
        rest = _objectWithoutProperties(_ref4, ['toggleSort', 'className', 'children']);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      _react2.default.createElement(
        'div',
        _extends({
          className: (0, _classnames2.default)('rt-th', className),
          onClick: function onClick(e) {
            return toggleSort && toggleSort(e);
          },
          role: 'columnheader',
          tabIndex: '-1' // Resolves eslint issues without implementing keyboard navigation incorrectly
        }, rest),
        children
      )
    );
  },
  TdComponent: function TdComponent(_ref5) {
    var toggleSort = _ref5.toggleSort,
        className = _ref5.className,
        children = _ref5.children,
        rest = _objectWithoutProperties(_ref5, ['toggleSort', 'className', 'children']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('rt-td', className), role: 'gridcell' }, rest),
      children
    );
  },
  TfootComponent: _utils2.default.makeTemplateComponent('rt-tfoot', 'Tfoot'),
  FilterComponent: function FilterComponent(_ref6) {
    var filter = _ref6.filter,
        _onChange = _ref6.onChange;
    return _react2.default.createElement('input', {
      type: 'text',
      style: {
        width: '100%'
      },
      value: filter ? filter.value : '',
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      }
    });
  },
  ExpanderComponent: function ExpanderComponent(_ref7) {
    var isExpanded = _ref7.isExpanded;
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('rt-expander', isExpanded && '-open') },
      '\u2022'
    );
  },
  PivotValueComponent: function PivotValueComponent(_ref8) {
    var subRows = _ref8.subRows,
        value = _ref8.value;
    return _react2.default.createElement(
      'span',
      null,
      value,
      ' ',
      subRows && '(' + subRows.length + ')'
    );
  },
  AggregatedComponent: function AggregatedComponent(_ref9) {
    var subRows = _ref9.subRows,
        column = _ref9.column;

    var previewValues = subRows.filter(function (d) {
      return typeof d[column.id] !== 'undefined';
    }).map(function (row, i) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        _react2.default.createElement(
          'span',
          { key: i },
          row[column.id],
          i < subRows.length - 1 ? ', ' : ''
        )
      );
    });
    return _react2.default.createElement(
      'span',
      null,
      previewValues
    );
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: _pagination2.default,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref10) {
    var className = _ref10.className,
        loading = _ref10.loading,
        loadingText = _ref10.loadingText,
        rest = _objectWithoutProperties(_ref10, ['className', 'loading', 'loadingText']);

    return _react2.default.createElement(
      'div',
      _extends({ className: (0, _classnames2.default)('-loading', { '-active': loading }, className) }, rest),
      _react2.default.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _utils2.default.makeTemplateComponent('rt-noData', 'NoData'),
  ResizerComponent: _utils2.default.makeTemplateComponent('rt-resizer', 'Resizer'),
  PadRowComponent: function PadRowComponent() {
    return _react2.default.createElement(
      'span',
      null,
      '\xA0'
    );
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiZW1wdHlPYmoiLCJkYXRhIiwicmVzb2x2ZURhdGEiLCJsb2FkaW5nIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImRlZmF1bHRQYWdlIiwiZGVmYXVsdFBhZ2VTaXplIiwic2hvd1BhZ2VKdW1wIiwiY29sbGFwc2VPblNvcnRpbmdDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25EYXRhQ2hhbmdlIiwiZnJlZXplV2hlbkV4cGFuZGVkIiwic29ydGFibGUiLCJtdWx0aVNvcnQiLCJyZXNpemFibGUiLCJmaWx0ZXJhYmxlIiwiZGVmYXVsdFNvcnREZXNjIiwiZGVmYXVsdFNvcnRlZCIsImRlZmF1bHRGaWx0ZXJlZCIsImRlZmF1bHRSZXNpemVkIiwiZGVmYXVsdEV4cGFuZGVkIiwiZGVmYXVsdEZpbHRlck1ldGhvZCIsImZpbHRlciIsInJvdyIsImNvbHVtbiIsImlkIiwicGl2b3RJZCIsInVuZGVmaW5lZCIsIlN0cmluZyIsInN0YXJ0c1dpdGgiLCJ2YWx1ZSIsImRlZmF1bHRTb3J0TWV0aG9kIiwiYSIsImIiLCJkZXNjIiwidG9Mb3dlckNhc2UiLCJvblBhZ2VDaGFuZ2UiLCJvblBhZ2VTaXplQ2hhbmdlIiwib25Tb3J0ZWRDaGFuZ2UiLCJvbkZpbHRlcmVkQ2hhbmdlIiwib25SZXNpemVkQ2hhbmdlIiwib25FeHBhbmRlZENoYW5nZSIsInBpdm90QnkiLCJwaXZvdFZhbEtleSIsInBpdm90SURLZXkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm5lc3RpbmdMZXZlbEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsIm9uRmV0Y2hEYXRhIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJnZXRQcm9wcyIsImdldFRhYmxlUHJvcHMiLCJnZXRUaGVhZEdyb3VwUHJvcHMiLCJnZXRUaGVhZEdyb3VwVHJQcm9wcyIsImdldFRoZWFkR3JvdXBUaFByb3BzIiwiZ2V0VGhlYWRQcm9wcyIsImdldFRoZWFkVHJQcm9wcyIsImdldFRoZWFkVGhQcm9wcyIsImdldFRoZWFkRmlsdGVyUHJvcHMiLCJnZXRUaGVhZEZpbHRlclRyUHJvcHMiLCJnZXRUaGVhZEZpbHRlclRoUHJvcHMiLCJnZXRUYm9keVByb3BzIiwiZ2V0VHJHcm91cFByb3BzIiwiZ2V0VHJQcm9wcyIsImdldFRkUHJvcHMiLCJnZXRUZm9vdFByb3BzIiwiZ2V0VGZvb3RUclByb3BzIiwiZ2V0VGZvb3RUZFByb3BzIiwiZ2V0UGFnaW5hdGlvblByb3BzIiwiZ2V0TG9hZGluZ1Byb3BzIiwiZ2V0Tm9EYXRhUHJvcHMiLCJnZXRSZXNpemVyUHJvcHMiLCJDZWxsIiwiSGVhZGVyIiwiRm9vdGVyIiwiQWdncmVnYXRlZCIsIlBpdm90IiwiUGl2b3RWYWx1ZSIsIkV4cGFuZGVyIiwiRmlsdGVyIiwic2hvdyIsIm1pbldpZHRoIiwiYWdncmVnYXRlIiwiaGVhZGVyQ2xhc3NOYW1lIiwiaGVhZGVyU3R5bGUiLCJnZXRIZWFkZXJQcm9wcyIsImZvb3RlckNsYXNzTmFtZSIsImZvb3RlclN0eWxlIiwiZ2V0Rm9vdGVyUHJvcHMiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJzb3J0TWV0aG9kIiwiZXhwYW5kZXJEZWZhdWx0cyIsIndpZHRoIiwicGl2b3REZWZhdWx0cyIsInByZXZpb3VzVGV4dCIsIm5leHRUZXh0IiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwicGFnZVRleHQiLCJvZlRleHQiLCJyb3dzVGV4dCIsInBhZ2VKdW1wVGV4dCIsInJvd3NTZWxlY3RvclRleHQiLCJUYWJsZUNvbXBvbmVudCIsImNoaWxkcmVuIiwicmVzdCIsIlRoZWFkQ29tcG9uZW50IiwiXyIsIm1ha2VUZW1wbGF0ZUNvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJ0b2dnbGVTb3J0IiwiZSIsIlRkQ29tcG9uZW50IiwiVGZvb3RDb21wb25lbnQiLCJGaWx0ZXJDb21wb25lbnQiLCJvbkNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwiRXhwYW5kZXJDb21wb25lbnQiLCJpc0V4cGFuZGVkIiwiUGl2b3RWYWx1ZUNvbXBvbmVudCIsInN1YlJvd3MiLCJsZW5ndGgiLCJBZ2dyZWdhdGVkQ29tcG9uZW50IiwicHJldmlld1ZhbHVlcyIsImQiLCJtYXAiLCJpIiwiUGl2b3RDb21wb25lbnQiLCJQYWdpbmF0aW9uQ29tcG9uZW50IiwiUGFnaW5hdGlvbiIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsIkxvYWRpbmdDb21wb25lbnQiLCJOb0RhdGFDb21wb25lbnQiLCJSZXNpemVyQ29tcG9uZW50IiwiUGFkUm93Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7O0FBRkE7OztBQUlBLElBQU1BLFdBQVcsU0FBWEEsUUFBVztBQUFBLFNBQU8sRUFBUDtBQUFBLENBQWpCOztrQkFFZTtBQUNiO0FBQ0FDLFFBQU0sRUFGTztBQUdiQyxlQUFhO0FBQUEsV0FBUUQsSUFBUjtBQUFBLEdBSEE7QUFJYkUsV0FBUyxLQUpJO0FBS2JDLGtCQUFnQixJQUxIO0FBTWJDLHFCQUFtQixLQU5OO0FBT2JDLHdCQUFzQixJQVBUO0FBUWJDLHVCQUFxQixJQVJSO0FBU2JDLG1CQUFpQixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsQ0FUSjtBQVViQyxlQUFhLENBVkE7QUFXYkMsbUJBQWlCLEVBWEo7QUFZYkMsZ0JBQWMsSUFaRDtBQWFiQywyQkFBeUIsSUFiWjtBQWNiQyx3QkFBc0IsSUFkVDtBQWViQyx3QkFBc0IsSUFmVDtBQWdCYkMsc0JB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akM7QUFERixLQUhnQjtBQUFBLEdBeFBMO0FBK1BieUMsbUJBQWlCOUIsZ0JBQUVDLHFCQUFGLENBQXdCLFdBQXhCLEVBQXFDLFFBQXJDLENBL1BKO0FBZ1FiOEIsb0JBQWtCL0IsZ0JBQUVDLHFCQUFGLENBQXdCLFlBQXhCLEVBQXNDLFNBQXRDLENBaFFMO0FBaVFiK0IsbUJBQWlCO0FBQUEsV0FBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQU47QUFBQTtBQWpRSixDIiwiZmlsZSI6ImRlZmF1bHRQcm9wcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcclxuLy9cclxuaW1wb3J0IF8gZnJvbSAnLi91dGlscydcclxuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnLi9wYWdpbmF0aW9uJ1xyXG5cclxuY29uc3QgZW1wdHlPYmogPSAoKSA9PiAoe30pXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgLy8gR2VuZXJhbFxyXG4gIGRhdGE6IFtdLFxyXG4gIHJlc29sdmVEYXRhOiBkYXRhID0+IGRhdGEsXHJcbiAgbG9hZGluZzogZmFsc2UsXHJcbiAgc2hvd1BhZ2luYXRpb246IHRydWUsXHJcbiAgc2hvd1BhZ2luYXRpb25Ub3A6IGZhbHNlLFxyXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxyXG4gIHNob3dQYWdlU2l6ZU9wdGlvbnM6IHRydWUsXHJcbiAgcGFnZVNpemVPcHRpb25zOiBbNSwgMTAsIDIwLCAyNSwgNTAsIDEwMF0sXHJcbiAgZGVmYXVsdFBhZ2U6IDAsXHJcbiAgZGVmYXVsdFBhZ2VTaXplOiAyMCxcclxuICBzaG93UGFnZUp1bXA6IHRydWUsXHJcbiAgY29sbGFwc2VPblNvcnRpbmdDaGFuZ2U6IHRydWUsXHJcbiAgY29sbGFwc2VPblBhZ2VDaGFuZ2U6IHRydWUsXHJcbiAgY29sbGFwc2VPbkRhdGFDaGFuZ2U6IHRydWUsXHJcbiAgZnJlZXplV2hlbkV4cGFuZGVkOiBmYWxzZSxcclxuICBzb3J0YWJsZTogdHJ1ZSxcclxuICBtdWx0aVNvcnQ6IHRydWUsXHJcbiAgcmVzaXphYmxlOiB0cnVlLFxyXG4gIGZpbHRlcmFibGU6IGZhbHNlLFxyXG4gIGRlZmF1bHRTb3J0RGVzYzogZmFsc2UsXHJcbiAgZGVmYXVsdFNvcnRlZDogW10sXHJcbiAgZGVmYXVsdEZpbHRlcmVkOiBbXSxcclxuICBkZWZhdWx0UmVzaXplZDogW10sXHJcbiAgZGVmYXVsdEV4cGFuZGVkOiB7fSxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcclxuICBkZWZhdWx0RmlsdGVyTWV0aG9kOiAoZmlsdGVyLCByb3csIGNvbHVtbikgPT4ge1xyXG4gICAgY29uc3QgaWQgPSBmaWx0ZXIucGl2b3RJZCB8fCBmaWx0ZXIuaWRcclxuICAgIHJldHVybiByb3dbaWRdICE9PSB1bmRlZmluZWQgPyBTdHJpbmcocm93W2lkXSkuc3RhcnRzV2l0aChmaWx0ZXIudmFsdWUpIDogdHJ1ZVxyXG4gIH0sXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgZGVmYXVsdFNvcnRNZXRob2Q6IChhLCBiLCBkZXNjKSA9PiB7XHJcbiAgICAvLyBmb3JjZSBudWxsIGFuZCB1bmRlZmluZWQgdG8gdGhlIGJvdHRvbVxyXG4gICAgYSA9IGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkID8gJycgOiBhXHJcbiAgICBiID0gYiA9PT0gbnVsbCB8fCBiID09PSB1bmRlZmluZWQgPyAnJyA6IGJcclxuICAgIC8vIGZvcmNlIGFueSBzdHJpbmcgdmFsdWVzIHRvIGxvd2VyY2FzZVxyXG4gICAgYSA9IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEudG9Mb3dlckNhc2UoKSA6IGFcclxuICAgIGIgPSB0eXBlb2YgYiA9PT0gJ3N0cmluZycgPyBiLnRvTG93ZXJDYXNlKCkgOiBiXHJcbiAgICAvLyBSZXR1cm4gZWl0aGVyIDEgb3IgLTEgdG8gaW5kaWNhdGUgYSBzb3J0IHByaW9yaXR5XHJcbiAgICBpZiAoYSA+IGIpIHtcclxuICAgICAgcmV0dXJuIDFcclxuICAgIH1cclxuICAgIGlmIChhIDwgYikge1xyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIC8vIHJldHVybmluZyAwLCB1bmRlZmluZWQgb3IgYW55IGZhbHNleSB2YWx1ZSB3aWxsIHVzZSBzdWJzZXF1ZW50IHNvcnRzIG9yXHJcbiAgICAvLyB0aGUgaW5kZXggYXMgYSB0aWVicmVha2VyXHJcbiAgICByZXR1cm4gMFxyXG4gIH0sXHJcblxyXG4gIC8vIENvbnRyb2xsZWQgU3RhdGUgUHJvcHNcclxuICAvLyBwYWdlOiB1bmRlZmluZWQsXHJcbiAgLy8gcGFnZVNpemU6IHVuZGVmaW5lZCxcclxuICAvLyBzb3J0ZWQ6IFtdLFxyXG4gIC8vIGZpbHRlcmVkOiBbXSxcclxuICAvLyByZXNpemVkOiBbXSxcclxuICAvLyBleHBhbmRlZDoge30sXHJcblxyXG4gIC8vIENvbnRyb2xsZWQgU3RhdGUgQ2FsbGJhY2tzXHJcbiAgb25QYWdlQ2hhbmdlOiB1bmRlZmluZWQsXHJcbiAgb25QYWdlU2l6ZUNoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uU29ydGVkQ2hhbmdlOiB1bmRlZmluZWQsXHJcbiAgb25GaWx0ZXJlZENoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uUmVzaXplZENoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uRXhwYW5kZWRDaGFuZ2U6IHVuZGVmaW5lZCxcclxuXHJcbiAgLy8gUGl2b3RpbmdcclxuICBwaXZvdEJ5OiB1bmRlZmluZWQsXHJcblxyXG4gIC8vIEtleSBDb25zdGFudHNcclxuICBwaXZvdFZhbEtleTogJ19waXZvdFZhbCcsXHJcbiAgcGl2b3RJREtleTogJ19waXZvdElEJyxcclxuICBzdWJSb3dzS2V5OiAnX3N1YlJvd3MnLFxyXG4gIGFnZ3JlZ2F0ZWRLZXk6ICdfYWdncmVnYXRlZCcsXHJcbiAgbmVzdGluZ0xldmVsS2V5OiAnX25lc3RpbmdMZXZlbCcsXHJcbiAgb3JpZ2luYWxLZXk6ICdfb3JpZ2luYWwnLFxyXG4gIGluZGV4S2V5OiAnX2luZGV4JyxcclxuICBncm91cGVkQnlQaXZvdEtleTogJ19ncm91cGVkQnlQaXZvdCcsXHJcblxyXG4gIC8vIFNlcnZlci1zaWRlIENhbGxiYWNrc1xyXG4gIG9uRmV0Y2hEYXRhOiAoKSA9PiBudWxsLFxyXG5cclxuICAvLyBDbGFzc2VzXHJcbiAgY2xhc3NOYW1lOiAnJyxcclxuICBzdHlsZToge30sXHJcblxyXG4gIC8vIENvbXBvbmVudCBkZWNvcmF0b3JzXHJcbiAgZ2V0UHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRhYmxlUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkR3JvdXBQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRHcm91cFRyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkR3JvdXBUaFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZFRyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkVGhQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRGaWx0ZXJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRGaWx0ZXJUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZEZpbHRlclRoUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRib2R5UHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRyR3JvdXBQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VHJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGRQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGZvb3RQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGZvb3RUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUZm9vdFRkUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFBhZ2luYXRpb25Qcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0TG9hZGluZ1Byb3BzOiBlbXB0eU9iaixcclxuICBnZXROb0RhdGFQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0UmVzaXplclByb3BzOiBlbXB0eU9iaixcclxuXHJcbiAgLy8gR2xvYmFsIENvbHVtbiBEZWZhdWx0c1xyXG4gIGNvbHVtbjoge1xyXG4gICAgLy8gUmVuZGVyZXJzXHJcbiAgICBDZWxsOiB1bmRlZmluZWQsXHJcbiAgICBIZWFkZXI6IHVuZGVmaW5lZCxcclxuICAgIEZvb3RlcjogdW5kZWZpbmVkLFxyXG4gICAgQWdncmVnYXRlZDogdW5kZWZpbmVkLFxyXG4gICAgUGl2b3Q6IHVuZGVmaW5lZCxcclxuICAgIFBpdm90VmFsdWU6IHVuZGVmaW5lZCxcclxuICAgIEV4cGFuZGVyOiB1bmRlZmluZWQsXHJcbiAgICBGaWx0ZXI6IHVuZGVmaW5lZCxcclxuICAgIC8vIEFsbCBDb2x1bW5zXHJcbiAgICBzb3J0YWJsZTogdW5kZWZpbmVkLCAvLyB1c2UgdGFibGUgZGVmYXVsdFxyXG4gICAgcmVzaXphYmxlOiB1bmRlZmluZWQsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XHJcbiAgICBmaWx0ZXJhYmxlOiB1bmRlZmluZWQsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XHJcbiAgICBzaG93OiB0cnVlLFxyXG4gICAgbWluV2lkdGg6IDEwMCxcclxuICAgIC8vIENlbGxzIG9ubHlcclxuICAgIGNsYXNzTmFtZTogJycsXHJcbiAgICBzdHlsZToge30sXHJcbiAgICBnZXRQcm9wczogZW1wdHlPYmosXHJcbiAgICAvLyBQaXZvdCBvbmx5XHJcbiAgICBhZ2dyZWdhdGU6IHVuZGVmaW5lZCxcclxuICAgIC8vIEhlYWRlcnMgb25seVxyXG4gICAgaGVhZGVyQ2xhc3NOYW1lOiAnJyxcclxuICAgIGhlYWRlclN0eWxlOiB7fSxcclxuICAgIGdldEhlYWRlclByb3BzOiBlbXB0eU9iaixcclxuICAgIC8vIEZvb3RlcnMgb25seVxyXG4gICAgZm9vdGVyQ2xhc3NOYW1lOiAnJyxcclxuICAgIGZvb3RlclN0eWxlOiB7fSxcclxuICAgIGdldEZvb3RlclByb3BzOiBlbXB0eU9iaixcclxuICAgIGZpbHRlck1ldGhvZDogdW5kZWZpbmVkLFxyXG4gICAgZmlsdGVyQWxsOiBmYWxzZSxcclxuICAgIHNvcnRNZXRob2Q6IHVuZGVmaW5lZCxcclxuICB9LFxyXG5cclxuICAvLyBHbG9iYWwgRXhwYW5kZXIgQ29sdW1uIERlZmF1bHRzXHJcbiAgZXhwYW5kZXJEZWZhdWx0czoge1xyXG4gICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxyXG4gICAgd2lkdGg6IDM1LFxyXG4gIH0sXHJcblxyXG4gIHBpdm90RGVmYXVsdHM6IHtcclxuICAgIC8vIGV4dGVuZCB0aGUgZGVmYXVsdHMgZm9yIHBpdm90ZWQgY29sdW1ucyBoZXJlXHJcbiAgfSxcclxuXHJcbiAgLy8gVGV4dFxyXG4gIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcclxuICBuZXh0VGV4dDogJ05leHQnLFxyXG4gIGxvYWRpbmdUZXh0OiAnTG9hZGluZy4uLicsXHJcbiAgbm9EYXRhVGV4dDogJ05vIHJvd3MgZm91bmQnLFxyXG4gIHBhZ2VUZXh0OiAnUGFnZScsXHJcbiAgb2ZUZXh0OiAnb2YnLFxyXG4gIHJvd3NUZXh0OiAncm93cycsXHJcbiAgcGFnZUp1bXBUZXh0OiAnanVtcCB0byBwYWdlJyxcclxuICByb3dzU2VsZWN0b3JUZXh0OiAncm93cyBwZXIgcGFnZScsXHJcblxyXG4gIC8vIENvbXBvbmVudHNcclxuICBUYWJsZUNvbXBvbmVudDogKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSA9PiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdGFibGUnLCBjbGFzc05hbWUpfVxyXG4gICAgICByb2xlPVwiZ3JpZFwiXHJcbiAgICAgIC8vIHRhYkluZGV4PScwJ1xyXG4gICAgICB7Li4ucmVzdH1cclxuICAgID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9kaXY+XHJcbiAgKSxcclxuICBUaGVhZENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRoZWFkJywgJ1RoZWFkJyksXHJcbiAgVGJvZHlDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Ym9keScsICdUYm9keScpLFxyXG4gIFRyR3JvdXBDb21wb25lbnQ6ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRyLWdyb3VwJywgY2xhc3NOYW1lKX0gcm9sZT1cInJvd2dyb3VwXCIgey4uLnJlc3R9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICApLFxyXG4gIFRyQ29tcG9uZW50OiAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10cicsIGNsYXNzTmFtZSl9IHJvbGU9XCJyb3dcIiB7Li4ucmVzdH0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICksXHJcbiAgVGhDb21wb25lbnQ6ICh7XHJcbiAgICB0b2dnbGVTb3J0LCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0XHJcbiAgfSkgPT4gKFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHNcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10aCcsIGNsYXNzTmFtZSl9XHJcbiAgICAgIG9uQ2xpY2s9e2UgPT4gdG9nZ2xlU29ydCAmJiB0b2dnbGVTb3J0KGUpfVxyXG4gICAgICByb2xlPVwiY29sdW1uaGVhZGVyXCJcclxuICAgICAgdGFiSW5kZXg9XCItMVwiIC8vIFJlc29sdmVzIGVzbGludCBpc3N1ZXMgd2l0aG91dCBpbXBsZW1lbnRpbmcga2V5Ym9hcmQgbmF2aWdhdGlvbiBpbmNvcnJlY3RseVxyXG4gICAgICB7Li4ucmVzdH1cclxuICAgID5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9kaXY+XHJcbiAgKSxcclxuICBUZENvbXBvbmVudDogKHtcclxuICAgIHRvZ2dsZVNvcnQsIGNsYXNzTmFtZSwgY2hpbGRyZW4sIC4uLnJlc3RcclxuICB9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdGQnLCBjbGFzc05hbWUpfSByb2xlPVwiZ3JpZGNlbGxcIiB7Li4ucmVzdH0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICksXHJcbiAgVGZvb3RDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Zm9vdCcsICdUZm9vdCcpLFxyXG4gIEZpbHRlckNvbXBvbmVudDogKHsgZmlsdGVyLCBvbkNoYW5nZSB9KSA9PiAoXHJcbiAgICA8aW5wdXRcclxuICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgIH19XHJcbiAgICAgIHZhbHVlPXtmaWx0ZXIgPyBmaWx0ZXIudmFsdWUgOiAnJ31cclxuICAgICAgb25DaGFuZ2U9e2V2ZW50ID0+IG9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSl9XHJcbiAgICAvPlxyXG4gICksXHJcbiAgRXhwYW5kZXJDb21wb25lbnQ6ICh7IGlzRXhwYW5kZWQgfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LWV4cGFuZGVyJywgaXNFeHBhbmRlZCAmJiAnLW9wZW4nKX0+JmJ1bGw7PC9kaXY+XHJcbiAgKSxcclxuICBQaXZvdFZhbHVlQ29tcG9uZW50OiAoeyBzdWJSb3dzLCB2YWx1ZSB9KSA9PiAoXHJcbiAgICA8c3Bhbj5cclxuICAgICAge3ZhbHVlfSB7c3ViUm93cyAmJiBgKCR7c3ViUm93cy5sZW5ndGh9KWB9XHJcbiAgICA8L3NwYW4+XHJcbiAgKSxcclxuICBBZ2dyZWdhdGVkQ29tcG9uZW50OiAoeyBzdWJSb3dzLCBjb2x1bW4gfSkgPT4ge1xyXG4gICAgY29uc3QgcHJldmlld1ZhbHVlcyA9IHN1YlJvd3MuZmlsdGVyKGQgPT4gdHlwZW9mIGRbY29sdW1uLmlkXSAhPT0gJ3VuZGVmaW5lZCcpLm1hcCgocm93LCBpKSA9PiAoXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcclxuICAgICAgPHNwYW4ga2V5PXtpfT5cclxuICAgICAgICB7cm93W2NvbHVtbi5pZF19XHJcbiAgICAgICAge2kgPCBzdWJSb3dzLmxlbmd0aCAtIDEgPyAnLCAnIDogJyd9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICkpXHJcbiAgICByZXR1cm4gPHNwYW4+e3ByZXZpZXdWYWx1ZXN9PC9zcGFuPlxyXG4gIH0sXHJcbiAgUGl2b3RDb21wb25lbnQ6IHVuZGVmaW5lZCwgLy8gdGhpcyBpcyBhIGNvbXB1dGVkIGRlZmF1bHQgZ2VuZXJhdGVkIHVzaW5nXHJcbiAgLy8gdGhlIEV4cGFuZGVyQ29tcG9uZW50IGFuZCBQaXZvdFZhbHVlQ29tcG9uZW50IGF0IHJ1bi10aW1lIGluIG1ldGhvZHMuanNcclxuICBQYWdpbmF0aW9uQ29tcG9uZW50OiBQYWdpbmF0aW9uLFxyXG4gIFByZXZpb3VzQ29tcG9uZW50OiB1bmRlZmluZWQsXHJcbiAgTmV4dENvbXBvbmVudDogdW5kZWZpbmVkLFxyXG4gIExvYWRpbmdDb21wb25lbnQ6ICh7XHJcbiAgICBjbGFzc05hbWUsIGxvYWRpbmcsIGxvYWRpbmdUZXh0LCAuLi5yZXN0XHJcbiAgfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1sb2FkaW5nJywgeyAnLWFjdGl2ZSc6IGxvYWRpbmcgfSwgY2xhc3NOYW1lKX0gey4uLnJlc3R9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1sb2FkaW5nLWlubmVyXCI+e2xvYWRpbmdUZXh0fTwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKSxcclxuICBOb0RhdGFDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC1ub0RhdGEnLCAnTm9EYXRhJyksXHJcbiAgUmVzaXplckNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXJlc2l6ZXInLCAnUmVzaXplcicpLFxyXG4gIFBhZFJvd0NvbXBvbmVudDogKCkgPT4gPHNwYW4+Jm5ic3A7PC9zcGFuPixcclxufVxyXG4iXX0=