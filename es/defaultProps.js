var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import classnames from 'classnames';
//
import _ from './utils';
import Pagination from './pagination';

var emptyObj = function emptyObj() {
  return {};
};

export default {
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

    return React.createElement(
      'div',
      _extends({
        className: classnames('rt-table', className),
        role: 'grid'
        // tabIndex='0'
      }, rest),
      children
    );
  },
  TheadComponent: _.makeTemplateComponent('rt-thead', 'Thead'),
  TbodyComponent: _.makeTemplateComponent('rt-tbody', 'Tbody'),
  TrGroupComponent: function TrGroupComponent(_ref2) {
    var children = _ref2.children,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ['children', 'className']);

    return React.createElement(
      'div',
      _extends({ className: classnames('rt-tr-group', className), role: 'rowgroup' }, rest),
      children
    );
  },
  TrComponent: function TrComponent(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return React.createElement(
      'div',
      _extends({ className: classnames('rt-tr', className), role: 'row' }, rest),
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
      React.createElement(
        'div',
        _extends({
          className: classnames('rt-th', className),
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

    return React.createElement(
      'div',
      _extends({ className: classnames('rt-td', className), role: 'gridcell' }, rest),
      children
    );
  },
  TfootComponent: _.makeTemplateComponent('rt-tfoot', 'Tfoot'),
  FilterComponent: function FilterComponent(_ref6) {
    var filter = _ref6.filter,
        _onChange = _ref6.onChange;
    return React.createElement('input', {
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
    return React.createElement(
      'div',
      { className: classnames('rt-expander', isExpanded && '-open') },
      '\u2022'
    );
  },
  PivotValueComponent: function PivotValueComponent(_ref8) {
    var subRows = _ref8.subRows,
        value = _ref8.value;
    return React.createElement(
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
        React.createElement(
          'span',
          { key: i },
          row[column.id],
          i < subRows.length - 1 ? ', ' : ''
        )
      );
    });
    return React.createElement(
      'span',
      null,
      previewValues
    );
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: Pagination,
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref10) {
    var className = _ref10.className,
        loading = _ref10.loading,
        loadingText = _ref10.loadingText,
        rest = _objectWithoutProperties(_ref10, ['className', 'loading', 'loadingText']);

    return React.createElement(
      'div',
      _extends({ className: classnames('-loading', { '-active': loading }, className) }, rest),
      React.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _.makeTemplateComponent('rt-noData', 'NoData'),
  ResizerComponent: _.makeTemplateComponent('rt-resizer', 'Resizer'),
  PadRowComponent: function PadRowComponent() {
    return React.createElement(
      'span',
      null,
      '\xA0'
    );
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJjbGFzc25hbWVzIiwiXyIsIlBhZ2luYXRpb24iLCJlbXB0eU9iaiIsImRhdGEiLCJyZXNvbHZlRGF0YSIsImxvYWRpbmciLCJzaG93UGFnaW5hdGlvbiIsInNob3dQYWdpbmF0aW9uVG9wIiwic2hvd1BhZ2luYXRpb25Cb3R0b20iLCJzaG93UGFnZVNpemVPcHRpb25zIiwicGFnZVNpemVPcHRpb25zIiwiZGVmYXVsdFBhZ2UiLCJkZWZhdWx0UGFnZVNpemUiLCJzaG93UGFnZUp1bXAiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiY29sbGFwc2VPbkRhdGFDaGFuZ2UiLCJmcmVlemVXaGVuRXhwYW5kZWQiLCJzb3J0YWJsZSIsIm11bHRpU29ydCIsInJlc2l6YWJsZSIsImZpbHRlcmFibGUiLCJkZWZhdWx0U29ydERlc2MiLCJkZWZhdWx0U29ydGVkIiwiZGVmYXVsdEZpbHRlcmVkIiwiZGVmYXVsdFJlc2l6ZWQiLCJkZWZhdWx0RXhwYW5kZWQiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwiZmlsdGVyIiwicm93IiwiY29sdW1uIiwiaWQiLCJwaXZvdElkIiwidW5kZWZpbmVkIiwiU3RyaW5nIiwic3RhcnRzV2l0aCIsInZhbHVlIiwiZGVmYXVsdFNvcnRNZXRob2QiLCJhIiwiYiIsImRlc2MiLCJ0b0xvd2VyQ2FzZSIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJvblNvcnRlZENoYW5nZSIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJvblJlc2l6ZWRDaGFuZ2UiLCJvbkV4cGFuZGVkQ2hhbmdlIiwicGl2b3RCeSIsInBpdm90VmFsS2V5IiwicGl2b3RJREtleSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5IiwibmVzdGluZ0xldmVsS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5Iiwib25GZXRjaERhdGEiLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsImdldFJlc2l6ZXJQcm9wcyIsIkNlbGwiLCJIZWFkZXIiLCJGb290ZXIiLCJBZ2dyZWdhdGVkIiwiUGl2b3QiLCJQaXZvdFZhbHVlIiwiRXhwYW5kZXIiLCJGaWx0ZXIiLCJzaG93IiwibWluV2lkdGgiLCJhZ2dyZWdhdGUiLCJoZWFkZXJDbGFzc05hbWUiLCJoZWFkZXJTdHlsZSIsImdldEhlYWRlclByb3BzIiwiZm9vdGVyQ2xhc3NOYW1lIiwiZm9vdGVyU3R5bGUiLCJnZXRGb290ZXJQcm9wcyIsImZpbHRlck1ldGhvZCIsImZpbHRlckFsbCIsInNvcnRNZXRob2QiLCJleHBhbmRlckRlZmF1bHRzIiwid2lkdGgiLCJwaXZvdERlZmF1bHRzIiwicHJldmlvdXNUZXh0IiwibmV4dFRleHQiLCJsb2FkaW5nVGV4dCIsIm5vRGF0YVRleHQiLCJwYWdlVGV4dCIsIm9mVGV4dCIsInJvd3NUZXh0IiwicGFnZUp1bXBUZXh0Iiwicm93c1NlbGVjdG9yVGV4dCIsIlRhYmxlQ29tcG9uZW50IiwiY2hpbGRyZW4iLCJyZXN0IiwiVGhlYWRDb21wb25lbnQiLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJUYm9keUNvbXBvbmVudCIsIlRyR3JvdXBDb21wb25lbnQiLCJUckNvbXBvbmVudCIsIlRoQ29tcG9uZW50IiwidG9nZ2xlU29ydCIsImUiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRmlsdGVyQ29tcG9uZW50Iiwib25DaGFuZ2UiLCJldmVudCIsInRhcmdldCIsIkV4cGFuZGVyQ29tcG9uZW50IiwiaXNFeHBhbmRlZCIsIlBpdm90VmFsdWVDb21wb25lbnQiLCJzdWJSb3dzIiwibGVuZ3RoIiwiQWdncmVnYXRlZENvbXBvbmVudCIsInByZXZpZXdWYWx1ZXMiLCJkIiwibWFwIiwiaSIsIlBpdm90Q29tcG9uZW50IiwiUGFnaW5hdGlvbkNvbXBvbmVudCIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsIkxvYWRpbmdDb21wb25lbnQiLCJOb0RhdGFDb21wb25lbnQiLCJSZXNpemVyQ29tcG9uZW50IiwiUGFkUm93Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQTtBQUNBLE9BQU9DLENBQVAsTUFBYyxTQUFkO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixjQUF2Qjs7QUFFQSxJQUFNQyxXQUFXLFNBQVhBLFFBQVc7QUFBQSxTQUFPLEVBQVA7QUFBQSxDQUFqQjs7QUFFQSxlQUFlO0FBQ2I7QUFDQUMsUUFBTSxFQUZPO0FBR2JDLGVBQWE7QUFBQSxXQUFRRCxJQUFSO0FBQUEsR0FIQTtBQUliRSxXQUFTLEtBSkk7QUFLYkMsa0JBQWdCLElBTEg7QUFNYkMscUJBQW1CLEtBTk47QUFPYkMsd0JBQXNCLElBUFQ7QUFRYkMsdUJBQXFCLElBUlI7QUFTYkMsbUJBQWlCLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLEVBQVksRUFBWixFQUFnQixFQUFoQixFQUFvQixHQUFwQixDQVRKO0FBVWJDLGVBQWEsQ0FWQTtBQVdi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QVgsRUFBdUIsRUFBRSxXQUFXTSxPQUFiLEVBQXZCLEVBQStDcUQsU0FBL0MsQ0FBaEIsSUFBK0UwRCxJQUEvRTtBQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsZ0JBQWY7QUFBaUNUO0FBQWpDO0FBREYsS0FIZ0I7QUFBQSxHQXhQTDtBQStQYnVDLG1CQUFpQmxKLEVBQUVzSCxxQkFBRixDQUF3QixXQUF4QixFQUFxQyxRQUFyQyxDQS9QSjtBQWdRYjZCLG9CQUFrQm5KLEVBQUVzSCxxQkFBRixDQUF3QixZQUF4QixFQUFzQyxTQUF0QyxDQWhRTDtBQWlRYjhCLG1CQUFpQjtBQUFBLFdBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFOO0FBQUE7QUFqUUosQ0FBZiIsImZpbGUiOiJkZWZhdWx0UHJvcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXHJcbi8vXHJcbmltcG9ydCBfIGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbidcclxuXHJcbmNvbnN0IGVtcHR5T2JqID0gKCkgPT4gKHt9KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC8vIEdlbmVyYWxcclxuICBkYXRhOiBbXSxcclxuICByZXNvbHZlRGF0YTogZGF0YSA9PiBkYXRhLFxyXG4gIGxvYWRpbmc6IGZhbHNlLFxyXG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxyXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBmYWxzZSxcclxuICBzaG93UGFnaW5hdGlvbkJvdHRvbTogdHJ1ZSxcclxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxyXG4gIHBhZ2VTaXplT3B0aW9uczogWzUsIDEwLCAyMCwgMjUsIDUwLCAxMDBdLFxyXG4gIGRlZmF1bHRQYWdlOiAwLFxyXG4gIGRlZmF1bHRQYWdlU2l6ZTogMjAsXHJcbiAgc2hvd1BhZ2VKdW1wOiB0cnVlLFxyXG4gIGNvbGxhcHNlT25Tb3J0aW5nQ2hhbmdlOiB0cnVlLFxyXG4gIGNvbGxhcHNlT25QYWdlQ2hhbmdlOiB0cnVlLFxyXG4gIGNvbGxhcHNlT25EYXRhQ2hhbmdlOiB0cnVlLFxyXG4gIGZyZWV6ZVdoZW5FeHBhbmRlZDogZmFsc2UsXHJcbiAgc29ydGFibGU6IHRydWUsXHJcbiAgbXVsdGlTb3J0OiB0cnVlLFxyXG4gIHJlc2l6YWJsZTogdHJ1ZSxcclxuICBmaWx0ZXJhYmxlOiBmYWxzZSxcclxuICBkZWZhdWx0U29ydERlc2M6IGZhbHNlLFxyXG4gIGRlZmF1bHRTb3J0ZWQ6IFtdLFxyXG4gIGRlZmF1bHRGaWx0ZXJlZDogW10sXHJcbiAgZGVmYXVsdFJlc2l6ZWQ6IFtdLFxyXG4gIGRlZmF1bHRFeHBhbmRlZDoge30sXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXHJcbiAgZGVmYXVsdEZpbHRlck1ldGhvZDogKGZpbHRlciwgcm93LCBjb2x1bW4pID0+IHtcclxuICAgIGNvbnN0IGlkID0gZmlsdGVyLnBpdm90SWQgfHwgZmlsdGVyLmlkXHJcbiAgICByZXR1cm4gcm93W2lkXSAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKHJvd1tpZF0pLnN0YXJ0c1dpdGgoZmlsdGVyLnZhbHVlKSA6IHRydWVcclxuICB9LFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xyXG4gIGRlZmF1bHRTb3J0TWV0aG9kOiAoYSwgYiwgZGVzYykgPT4ge1xyXG4gICAgLy8gZm9yY2UgbnVsbCBhbmQgdW5kZWZpbmVkIHRvIHRoZSBib3R0b21cclxuICAgIGEgPSBhID09PSBudWxsIHx8IGEgPT09IHVuZGVmaW5lZCA/ICcnIDogYVxyXG4gICAgYiA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gJycgOiBiXHJcbiAgICAvLyBmb3JjZSBhbnkgc3RyaW5nIHZhbHVlcyB0byBsb3dlcmNhc2VcclxuICAgIGEgPSB0eXBlb2YgYSA9PT0gJ3N0cmluZycgPyBhLnRvTG93ZXJDYXNlKCkgOiBhXHJcbiAgICBiID0gdHlwZW9mIGIgPT09ICdzdHJpbmcnID8gYi50b0xvd2VyQ2FzZSgpIDogYlxyXG4gICAgLy8gUmV0dXJuIGVpdGhlciAxIG9yIC0xIHRvIGluZGljYXRlIGEgc29ydCBwcmlvcml0eVxyXG4gICAgaWYgKGEgPiBiKSB7XHJcbiAgICAgIHJldHVybiAxXHJcbiAgICB9XHJcbiAgICBpZiAoYSA8IGIpIHtcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICAvLyByZXR1cm5pbmcgMCwgdW5kZWZpbmVkIG9yIGFueSBmYWxzZXkgdmFsdWUgd2lsbCB1c2Ugc3Vic2VxdWVudCBzb3J0cyBvclxyXG4gICAgLy8gdGhlIGluZGV4IGFzIGEgdGllYnJlYWtlclxyXG4gICAgcmV0dXJuIDBcclxuICB9LFxyXG5cclxuICAvLyBDb250cm9sbGVkIFN0YXRlIFByb3BzXHJcbiAgLy8gcGFnZTogdW5kZWZpbmVkLFxyXG4gIC8vIHBhZ2VTaXplOiB1bmRlZmluZWQsXHJcbiAgLy8gc29ydGVkOiBbXSxcclxuICAvLyBmaWx0ZXJlZDogW10sXHJcbiAgLy8gcmVzaXplZDogW10sXHJcbiAgLy8gZXhwYW5kZWQ6IHt9LFxyXG5cclxuICAvLyBDb250cm9sbGVkIFN0YXRlIENhbGxiYWNrc1xyXG4gIG9uUGFnZUNoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uUGFnZVNpemVDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvblNvcnRlZENoYW5nZTogdW5kZWZpbmVkLFxyXG4gIG9uRmlsdGVyZWRDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvblJlc2l6ZWRDaGFuZ2U6IHVuZGVmaW5lZCxcclxuICBvbkV4cGFuZGVkQ2hhbmdlOiB1bmRlZmluZWQsXHJcblxyXG4gIC8vIFBpdm90aW5nXHJcbiAgcGl2b3RCeTogdW5kZWZpbmVkLFxyXG5cclxuICAvLyBLZXkgQ29uc3RhbnRzXHJcbiAgcGl2b3RWYWxLZXk6ICdfcGl2b3RWYWwnLFxyXG4gIHBpdm90SURLZXk6ICdfcGl2b3RJRCcsXHJcbiAgc3ViUm93c0tleTogJ19zdWJSb3dzJyxcclxuICBhZ2dyZWdhdGVkS2V5OiAnX2FnZ3JlZ2F0ZWQnLFxyXG4gIG5lc3RpbmdMZXZlbEtleTogJ19uZXN0aW5nTGV2ZWwnLFxyXG4gIG9yaWdpbmFsS2V5OiAnX29yaWdpbmFsJyxcclxuICBpbmRleEtleTogJ19pbmRleCcsXHJcbiAgZ3JvdXBlZEJ5UGl2b3RLZXk6ICdfZ3JvdXBlZEJ5UGl2b3QnLFxyXG5cclxuICAvLyBTZXJ2ZXItc2lkZSBDYWxsYmFja3NcclxuICBvbkZldGNoRGF0YTogKCkgPT4gbnVsbCxcclxuXHJcbiAgLy8gQ2xhc3Nlc1xyXG4gIGNsYXNzTmFtZTogJycsXHJcbiAgc3R5bGU6IHt9LFxyXG5cclxuICAvLyBDb21wb25lbnQgZGVjb3JhdG9yc1xyXG4gIGdldFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUYWJsZVByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZEdyb3VwUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkR3JvdXBUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZEdyb3VwVGhQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRUclByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUaGVhZFRoUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkRmlsdGVyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRoZWFkRmlsdGVyVHJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGhlYWRGaWx0ZXJUaFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUYm9keVByb3BzOiBlbXB0eU9iaixcclxuICBnZXRUckdyb3VwUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRyUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRkUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRmb290UHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFRmb290VHJQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0VGZvb3RUZFByb3BzOiBlbXB0eU9iaixcclxuICBnZXRQYWdpbmF0aW9uUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldExvYWRpbmdQcm9wczogZW1wdHlPYmosXHJcbiAgZ2V0Tm9EYXRhUHJvcHM6IGVtcHR5T2JqLFxyXG4gIGdldFJlc2l6ZXJQcm9wczogZW1wdHlPYmosXHJcblxyXG4gIC8vIEdsb2JhbCBDb2x1bW4gRGVmYXVsdHNcclxuICBjb2x1bW46IHtcclxuICAgIC8vIFJlbmRlcmVyc1xyXG4gICAgQ2VsbDogdW5kZWZpbmVkLFxyXG4gICAgSGVhZGVyOiB1bmRlZmluZWQsXHJcbiAgICBGb290ZXI6IHVuZGVmaW5lZCxcclxuICAgIEFnZ3JlZ2F0ZWQ6IHVuZGVmaW5lZCxcclxuICAgIFBpdm90OiB1bmRlZmluZWQsXHJcbiAgICBQaXZvdFZhbHVlOiB1bmRlZmluZWQsXHJcbiAgICBFeHBhbmRlcjogdW5kZWZpbmVkLFxyXG4gICAgRmlsdGVyOiB1bmRlZmluZWQsXHJcbiAgICAvLyBBbGwgQ29sdW1uc1xyXG4gICAgc29ydGFibGU6IHVuZGVmaW5lZCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcclxuICAgIHJlc2l6YWJsZTogdW5kZWZpbmVkLCAvLyB1c2UgdGFibGUgZGVmYXVsdFxyXG4gICAgZmlsdGVyYWJsZTogdW5kZWZpbmVkLCAvLyB1c2UgdGFibGUgZGVmYXVsdFxyXG4gICAgc2hvdzogdHJ1ZSxcclxuICAgIG1pbldpZHRoOiAxMDAsXHJcbiAgICAvLyBDZWxscyBvbmx5XHJcbiAgICBjbGFzc05hbWU6ICcnLFxyXG4gICAgc3R5bGU6IHt9LFxyXG4gICAgZ2V0UHJvcHM6IGVtcHR5T2JqLFxyXG4gICAgLy8gUGl2b3Qgb25seVxyXG4gICAgYWdncmVnYXRlOiB1bmRlZmluZWQsXHJcbiAgICAvLyBIZWFkZXJzIG9ubHlcclxuICAgIGhlYWRlckNsYXNzTmFtZTogJycsXHJcbiAgICBoZWFkZXJTdHlsZToge30sXHJcbiAgICBnZXRIZWFkZXJQcm9wczogZW1wdHlPYmosXHJcbiAgICAvLyBGb290ZXJzIG9ubHlcclxuICAgIGZvb3RlckNsYXNzTmFtZTogJycsXHJcbiAgICBmb290ZXJTdHlsZToge30sXHJcbiAgICBnZXRGb290ZXJQcm9wczogZW1wdHlPYmosXHJcbiAgICBmaWx0ZXJNZXRob2Q6IHVuZGVmaW5lZCxcclxuICAgIGZpbHRlckFsbDogZmFsc2UsXHJcbiAgICBzb3J0TWV0aG9kOiB1bmRlZmluZWQsXHJcbiAgfSxcclxuXHJcbiAgLy8gR2xvYmFsIEV4cGFuZGVyIENvbHVtbiBEZWZhdWx0c1xyXG4gIGV4cGFuZGVyRGVmYXVsdHM6IHtcclxuICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcclxuICAgIHdpZHRoOiAzNSxcclxuICB9LFxyXG5cclxuICBwaXZvdERlZmF1bHRzOiB7XHJcbiAgICAvLyBleHRlbmQgdGhlIGRlZmF1bHRzIGZvciBwaXZvdGVkIGNvbHVtbnMgaGVyZVxyXG4gIH0sXHJcblxyXG4gIC8vIFRleHRcclxuICBwcmV2aW91c1RleHQ6ICdQcmV2aW91cycsXHJcbiAgbmV4dFRleHQ6ICdOZXh0JyxcclxuICBsb2FkaW5nVGV4dDogJ0xvYWRpbmcuLi4nLFxyXG4gIG5vRGF0YVRleHQ6ICdObyByb3dzIGZvdW5kJyxcclxuICBwYWdlVGV4dDogJ1BhZ2UnLFxyXG4gIG9mVGV4dDogJ29mJyxcclxuICByb3dzVGV4dDogJ3Jvd3MnLFxyXG4gIHBhZ2VKdW1wVGV4dDogJ2p1bXAgdG8gcGFnZScsXHJcbiAgcm93c1NlbGVjdG9yVGV4dDogJ3Jvd3MgcGVyIHBhZ2UnLFxyXG5cclxuICAvLyBDb21wb25lbnRzXHJcbiAgVGFibGVDb21wb25lbnQ6ICh7IGNoaWxkcmVuLCBjbGFzc05hbWUsIC4uLnJlc3QgfSkgPT4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRhYmxlJywgY2xhc3NOYW1lKX1cclxuICAgICAgcm9sZT1cImdyaWRcIlxyXG4gICAgICAvLyB0YWJJbmRleD0nMCdcclxuICAgICAgey4uLnJlc3R9XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICksXHJcbiAgVGhlYWRDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10aGVhZCcsICdUaGVhZCcpLFxyXG4gIFRib2R5Q29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGJvZHknLCAnVGJvZHknKSxcclxuICBUckdyb3VwQ29tcG9uZW50OiAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10ci1ncm91cCcsIGNsYXNzTmFtZSl9IHJvbGU9XCJyb3dncm91cFwiIHsuLi5yZXN0fT5cclxuICAgICAge2NoaWxkcmVufVxyXG4gICAgPC9kaXY+XHJcbiAgKSxcclxuICBUckNvbXBvbmVudDogKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSA9PiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdHInLCBjbGFzc05hbWUpfSByb2xlPVwicm93XCIgey4uLnJlc3R9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICApLFxyXG4gIFRoQ29tcG9uZW50OiAoe1xyXG4gICAgdG9nZ2xlU29ydCwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucmVzdFxyXG4gIH0pID0+IChcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncnQtdGgnLCBjbGFzc05hbWUpfVxyXG4gICAgICBvbkNsaWNrPXtlID0+IHRvZ2dsZVNvcnQgJiYgdG9nZ2xlU29ydChlKX1cclxuICAgICAgcm9sZT1cImNvbHVtbmhlYWRlclwiXHJcbiAgICAgIHRhYkluZGV4PVwiLTFcIiAvLyBSZXNvbHZlcyBlc2xpbnQgaXNzdWVzIHdpdGhvdXQgaW1wbGVtZW50aW5nIGtleWJvYXJkIG5hdmlnYXRpb24gaW5jb3JyZWN0bHlcclxuICAgICAgey4uLnJlc3R9XHJcbiAgICA+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvZGl2PlxyXG4gICksXHJcbiAgVGRDb21wb25lbnQ6ICh7XHJcbiAgICB0b2dnbGVTb3J0LCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0XHJcbiAgfSkgPT4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRkJywgY2xhc3NOYW1lKX0gcm9sZT1cImdyaWRjZWxsXCIgey4uLnJlc3R9PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L2Rpdj5cclxuICApLFxyXG4gIFRmb290Q29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGZvb3QnLCAnVGZvb3QnKSxcclxuICBGaWx0ZXJDb21wb25lbnQ6ICh7IGZpbHRlciwgb25DaGFuZ2UgfSkgPT4gKFxyXG4gICAgPGlucHV0XHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICB9fVxyXG4gICAgICB2YWx1ZT17ZmlsdGVyID8gZmlsdGVyLnZhbHVlIDogJyd9XHJcbiAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiBvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpfVxyXG4gICAgLz5cclxuICApLFxyXG4gIEV4cGFuZGVyQ29tcG9uZW50OiAoeyBpc0V4cGFuZGVkIH0pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC1leHBhbmRlcicsIGlzRXhwYW5kZWQgJiYgJy1vcGVuJyl9PiZidWxsOzwvZGl2PlxyXG4gICksXHJcbiAgUGl2b3RWYWx1ZUNvbXBvbmVudDogKHsgc3ViUm93cywgdmFsdWUgfSkgPT4gKFxyXG4gICAgPHNwYW4+XHJcbiAgICAgIHt2YWx1ZX0ge3N1YlJvd3MgJiYgYCgke3N1YlJvd3MubGVuZ3RofSlgfVxyXG4gICAgPC9zcGFuPlxyXG4gICksXHJcbiAgQWdncmVnYXRlZENvbXBvbmVudDogKHsgc3ViUm93cywgY29sdW1uIH0pID0+IHtcclxuICAgIGNvbnN0IHByZXZpZXdWYWx1ZXMgPSBzdWJSb3dzLmZpbHRlcihkID0+IHR5cGVvZiBkW2NvbHVtbi5pZF0gIT09ICd1bmRlZmluZWQnKS5tYXAoKHJvdywgaSkgPT4gKFxyXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XHJcbiAgICAgIDxzcGFuIGtleT17aX0+XHJcbiAgICAgICAge3Jvd1tjb2x1bW4uaWRdfVxyXG4gICAgICAgIHtpIDwgc3ViUm93cy5sZW5ndGggLSAxID8gJywgJyA6ICcnfVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApKVxyXG4gICAgcmV0dXJuIDxzcGFuPntwcmV2aWV3VmFsdWVzfTwvc3Bhbj5cclxuICB9LFxyXG4gIFBpdm90Q29tcG9uZW50OiB1bmRlZmluZWQsIC8vIHRoaXMgaXMgYSBjb21wdXRlZCBkZWZhdWx0IGdlbmVyYXRlZCB1c2luZ1xyXG4gIC8vIHRoZSBFeHBhbmRlckNvbXBvbmVudCBhbmQgUGl2b3RWYWx1ZUNvbXBvbmVudCBhdCBydW4tdGltZSBpbiBtZXRob2RzLmpzXHJcbiAgUGFnaW5hdGlvbkNvbXBvbmVudDogUGFnaW5hdGlvbixcclxuICBQcmV2aW91c0NvbXBvbmVudDogdW5kZWZpbmVkLFxyXG4gIE5leHRDb21wb25lbnQ6IHVuZGVmaW5lZCxcclxuICBMb2FkaW5nQ29tcG9uZW50OiAoe1xyXG4gICAgY2xhc3NOYW1lLCBsb2FkaW5nLCBsb2FkaW5nVGV4dCwgLi4ucmVzdFxyXG4gIH0pID0+IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctbG9hZGluZycsIHsgJy1hY3RpdmUnOiBsb2FkaW5nIH0sIGNsYXNzTmFtZSl9IHsuLi5yZXN0fT5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCItbG9hZGluZy1pbm5lclwiPntsb2FkaW5nVGV4dH08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICksXHJcbiAgTm9EYXRhQ29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtbm9EYXRhJywgJ05vRGF0YScpLFxyXG4gIFJlc2l6ZXJDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC1yZXNpemVyJywgJ1Jlc2l6ZXInKSxcclxuICBQYWRSb3dDb21wb25lbnQ6ICgpID0+IDxzcGFuPiZuYnNwOzwvc3Bhbj4sXHJcbn1cclxuIl19