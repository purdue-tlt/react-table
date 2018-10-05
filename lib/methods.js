'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _utils2.default.compactObject(this.state), _utils2.default.compactObject(this.props), _utils2.default.compactObject(state), _utils2.default.compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState, dataChanged) {
        var _this2 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            resolveData = newState.resolveData,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine Header Groups

        var hasHeaderGroups = false;
        columns.forEach(function (column) {
          if (column.columns) {
            hasHeaderGroups = true;
          }
        });

        var columnsWithExpander = [].concat(_toConsumableArray(columns));

        var expanderColumn = columns.find(function (col) {
          return col.expander || col.columns && col.columns.some(function (col2) {
            return col2.expander;
          });
        });
        // The actual expander might be in the columns field of a group column
        if (expanderColumn && !expanderColumn.expander) {
          expanderColumn = expanderColumn.columns.find(function (col) {
            return col.expander;
          });
        }

        // If we have SubComponent's we need to make sure we have an expander column
        if (SubComponent && !expanderColumn) {
          expanderColumn = { expander: true };
          columnsWithExpander = [expanderColumn].concat(_toConsumableArray(columnsWithExpander));
        }

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this2.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            dcol.id = dcol.id || dcol.accessor;
            var accessorString = dcol.accessor;
            dcol.accessor = function (row) {
              return _utils2.default.get(row, accessorString);
            };
            return dcol;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            console.warn(dcol);
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function () {
              return undefined;
            };
          }

          return dcol;
        };

        var allDecoratedColumns = [];

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(column, parentColumn) {
          var decoratedColumn = makeDecoratedColumn(column, parentColumn);
          allDecoratedColumns.push(decoratedColumn);
          return decoratedColumn;
        };

        var decoratedColumns = columnsWithExpander.map(function (column) {
          if (column.columns) {
            return _extends({}, column, {
              columns: column.columns.map(function (d) {
                return decorateAndAddToAll(d, column);
              })
            });
          }
          return decorateAndAddToAll(column);
        });

        // Build the visible columns, headers and flat column list
        var visibleColumns = decoratedColumns.slice();
        var allVisibleColumns = [];

        visibleColumns = visibleColumns.map(function (column) {
          if (column.columns) {
            var visibleSubColumns = column.columns.filter(function (d) {
              return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
            });
            return _extends({}, column, {
              columns: visibleSubColumns
            });
          }
          return column;
        });

        visibleColumns = visibleColumns.filter(function (column) {
          return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
        });

        // Find any custom pivot location
        var pivotIndex = visibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          // Retrieve the pivot columns in the correct pivot order
          var pivotColumns = [];
          pivotBy.forEach(function (pivotID) {
            var found = allDecoratedColumns.find(function (d) {
              return d.id === pivotID;
            });
            if (found) {
              pivotColumns.push(found);
            }
          });

          var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
            return prev && prev === current.parentColumn && current.parentColumn;
          }, pivotColumns[0].parentColumn);

          var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
          PivotGroupHeader = PivotGroupHeader || function () {
            return _react2.default.createElement(
              'strong',
              null,
              'Pivoted'
            );
          };

          var pivotColumnGroup = {
            Header: PivotGroupHeader,
            columns: pivotColumns.map(function (col) {
              return _extends({}, _this2.props.pivotDefaults, col, {
                pivoted: true
              });
            })

            // Place the pivotColumns back into the visibleColumns
          };if (pivotIndex >= 0) {
            pivotColumnGroup = _extends({}, visibleColumns[pivotIndex], pivotColumnGroup);
            visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
          } else {
            visibleColumns.unshift(pivotColumnGroup);
          }
        }

        // Build Header Groups
        var headerGroups = [];
        var currentSpan = [];

        // A convenience function to add a header and reset the currentSpan
        var addHeader = function addHeader(columns, column) {
          headerGroups.push(_extends({}, _this2.props.column, column, {
            columns: columns
          }));
          currentSpan = [];
        };

        // Build flast list of allVisibleColumns and HeaderGroups
        visibleColumns.forEach(function (column) {
          if (column.columns) {
            allVisibleColumns = allVisibleColumns.concat(column.columns);
            if (currentSpan.length > 0) {
              addHeader(currentSpan);
            }
            addHeader(column.columns, column);
            return;
          }
          allVisibleColumns.push(column);
          currentSpan.push(column);
        });
        if (hasHeaderGroups && currentSpan.length > 0) {
          addHeader(currentSpan);
        }

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };

        // // If the data hasn't changed, just use the cached data
        var resolvedData = this.resolvedData;
        // If the data has changed, run the data resolver and cache the result
        if (!this.resolvedData || dataChanged) {
          resolvedData = resolveData(data);
          this.resolvedData = resolvedData;
        }
        // Use the resolved data
        resolvedData = resolvedData.map(function (d, i) {
          return accessRow(d, i);
        });

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = allVisibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };
        if (pivotBy.length) {
          var groupRecursively = function groupRecursively(rows, keys) {
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // This is the last level, just return the rows
            if (i === keys.length) {
              return rows;
            }
            // Group the rows together for this level
            var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
              var _ref3;

              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
            });
            // Recurse into the subRows
            groupedRows = groupedRows.map(function (rowGroup) {
              var _extends2;

              var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
              return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
            });
            return groupedRows;
          };
          resolvedData = groupRecursively(resolvedData, pivotBy);
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          allVisibleColumns: allVisibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            allVisibleColumns = resolvedState.allVisibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        this.props.onFetchData(this.getResolvedState(), this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
        var _this3 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            }
            return filteredSoFar.filter(function (row) {
              return filterMethod(nextFilter, row, column);
            });
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, allVisibleColumns)));
          }).filter(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return true;
            }
            return row[_this3.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this4 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || _utils2.default.orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
            };
          }
          return function (a, b) {
            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this4.props.subRowsKey]) {
            return;
          }
          row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          return onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = _utils2.default.clone(sorted || []).map(function (d) {
          d.desc = _utils2.default.isSortingDesc(d);
          return d;
        });
        if (!_utils2.default.isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else if (additive) {
            newSorted.push({
              id: column.id,
              desc: firstSortDirection
            });
          } else {
            newSorted = [{
              id: column.id,
              desc: firstSortDirection
            }];
          }
        } else {
          // Multi-Sort
          var _existingIndex = newSorted.findIndex(function (d) {
            return d.id === column[0].id;
          });
          // Existing Sorted Column
          if (_existingIndex > -1) {
            var _existing = newSorted[_existingIndex];
            if (_existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(_existingIndex, column.length);
              } else {
                column.forEach(function (d, i) {
                  newSorted[_existingIndex + i].desc = firstSortDirection;
                });
              }
            } else {
              column.forEach(function (d, i) {
                newSorted[_existingIndex + i].desc = secondSortDirection;
              });
            }
            if (!additive) {
              newSorted = newSorted.slice(_existingIndex, column.length);
            }
            // New Sort Column
          } else if (additive) {
            newSorted = newSorted.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            }));
          } else {
            newSorted = column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            });
          }
        }

        this.setStateWithData({
          page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          return onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          return x.id !== column.id;
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          return onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this5 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this5.resizeColumnMoving);
            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
            document.addEventListener('touchend', _this5.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this5.resizeColumnMoving);
            document.addEventListener('mouseup', _this5.resizeColumnEnd);
            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var onResizedChange = this.props.onResizedChange;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing;

        // Delete old value


        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        // Set the min size to 10 to account for margin and border or else the
        // group headers don't line up correctly
        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, 11);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          return onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbInByb3BzIiwic3RhdGUiLCJyZXNvbHZlZFN0YXRlIiwiXyIsImNvbXBhY3RPYmplY3QiLCJuZXdTdGF0ZSIsImRhdGFDaGFuZ2VkIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicmVzb2x2ZURhdGEiLCJwaXZvdElES2V5IiwicGl2b3RWYWxLZXkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm5lc3RpbmdMZXZlbEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsIlN1YkNvbXBvbmVudCIsImhhc0hlYWRlckdyb3VwcyIsImZvckVhY2giLCJjb2x1bW4iLCJjb2x1bW5zV2l0aEV4cGFuZGVyIiwiZXhwYW5kZXJDb2x1bW4iLCJmaW5kIiwiY29sIiwiZXhwYW5kZXIiLCJzb21lIiwiY29sMiIsIm1ha2VEZWNvcmF0ZWRDb2x1bW4iLCJwYXJlbnRDb2x1bW4iLCJkY29sIiwiZXhwYW5kZXJEZWZhdWx0cyIsIm1heFdpZHRoIiwibWluV2lkdGgiLCJhY2Nlc3NvciIsImlkIiwiYWNjZXNzb3JTdHJpbmciLCJnZXQiLCJyb3ciLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwidW5kZWZpbmVkIiwiYWxsRGVjb3JhdGVkQ29sdW1ucyIsImRlY29yYXRlQW5kQWRkVG9BbGwiLCJkZWNvcmF0ZWRDb2x1bW4iLCJwdXNoIiwiZGVjb3JhdGVkQ29sdW1ucyIsIm1hcCIsImQiLCJ2aXNpYmxlQ29sdW1ucyIsInNsaWNlIiwiYWxsVmlzaWJsZUNvbHVtbnMiLCJ2aXNpYmxlU3ViQ29sdW1ucyIsImZpbHRlciIsImluZGV4T2YiLCJnZXRGaXJzdERlZmluZWQiLCJzaG93IiwibGVuZ3RoIiwicGl2b3RJbmRleCIsImZpbmRJbmRleCIsInBpdm90IiwicGl2b3RDb2x1bW5zIiwiZm91bmQiLCJwaXZvdElEIiwiUGl2b3RQYXJlbnRDb2x1bW4iLCJyZWR1Y2UiLCJwcmV2IiwiY3VycmVudCIsIlBpdm90R3JvdXBIZWFkZXIiLCJIZWFkZXIiLCJwaXZvdENvbHVtbkdyb3VwIiwicGl2b3REZWZhdWx0cyIsInBpdm90ZWQiLCJzcGxpY2UiLCJ1bnNoaWZ0IiwiaGVhZGVyR3JvdXBzIiwiY3VycmVudFNwYW4iLCJhZGRIZWFkZXIiLCJjb25jYXQiLCJhY2Nlc3NSb3ciLCJpIiwibGV2ZWwiLCJyZXNvbHZlZERhdGEiLCJhZ2dyZWdhdGluZ0NvbHVtbnMiLCJhZ2dyZWdhdGUiLCJhZ2dyZWdhdGlvblZhbHVlcyIsInZhbHVlcyIsInJvd3MiLCJncm91cFJlY3Vyc2l2ZWx5Iiwia2V5cyIsImdyb3VwZWRSb3dzIiwiT2JqZWN0IiwiZW50cmllcyIsImdyb3VwQnkiLCJrZXkiLCJ2YWx1ZSIsInN1YlJvd3MiLCJyb3dHcm91cCIsIm1hbnVhbCIsInNvcnRlZCIsImZpbHRlcmVkIiwiZGVmYXVsdEZpbHRlck1ldGhvZCIsInNvcnRNZXRob2RzQnlDb2x1bW5JRCIsInNvcnRNZXRob2QiLCJzb3J0ZWREYXRhIiwic29ydERhdGEiLCJmaWx0ZXJEYXRhIiwib25GZXRjaERhdGEiLCJnZXRSZXNvbHZlZFN0YXRlIiwiZmlsdGVyZWREYXRhIiwiZmlsdGVyZWRTb0ZhciIsIm5leHRGaWx0ZXIiLCJ4IiwiZmlsdGVyYWJsZSIsImZpbHRlck1ldGhvZCIsImZpbHRlckFsbCIsIm9yZGVyQnlNZXRob2QiLCJvcmRlckJ5Iiwic29ydCIsImEiLCJiIiwiZGVzYyIsImRlZmF1bHRTb3J0TWV0aG9kIiwibWluUm93cyIsImdldFN0YXRlT3JQcm9wIiwicGFnZSIsIm9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiZXhwYW5kZWQiLCJzZXRTdGF0ZVdpdGhEYXRhIiwibmV3UGFnZVNpemUiLCJvblBhZ2VTaXplQ2hhbmdlIiwicGFnZVNpemUiLCJjdXJyZW50Um93IiwibmV3UGFnZSIsIk1hdGgiLCJmbG9vciIsImFkZGl0aXZlIiwic2tpcE5leHRTb3J0IiwiZGVmYXVsdFNvcnREZXNjIiwiZmlyc3RTb3J0RGlyZWN0aW9uIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwic2Vjb25kU29ydERpcmVjdGlvbiIsIm9uU29ydGVkQ2hhbmdlIiwibmV3U29ydGVkIiwiY2xvbmUiLCJpc1NvcnRpbmdEZXNjIiwiaXNBcnJheSIsImV4aXN0aW5nSW5kZXgiLCJleGlzdGluZyIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJuZXdGaWx0ZXJpbmciLCJldmVudCIsImlzVG91Y2giLCJzdG9wUHJvcGFnYXRpb24iLCJwYXJlbnRXaWR0aCIsInRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsInBhZ2VYIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cmFwRXZlbnRzIiwiY3VycmVudGx5UmVzaXppbmciLCJzdGFydFgiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemVDb2x1bW5Nb3ZpbmciLCJyZXNpemVDb2x1bW5FbmQiLCJvblJlc2l6ZWRDaGFuZ2UiLCJyZXNpemVkIiwibmV3UmVzaXplZCIsInR5cGUiLCJuZXdXaWR0aCIsIm1heCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O2tCQUVlO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHVDQUVPQSxLQUZQLEVBRWNDLEtBRmQsRUFFcUI7QUFDOUIsWUFBTUMsNkJBQ0RDLGdCQUFFQyxhQUFGLENBQWdCLEtBQUtILEtBQXJCLENBREMsRUFFREUsZ0JBQUVDLGFBQUYsQ0FBZ0IsS0FBS0osS0FBckIsQ0FGQyxFQUdERyxnQkFBRUMsYUFBRixDQUFnQkgsS0FBaEIsQ0FIQyxFQUlERSxnQkFBRUMsYUFBRixDQUFnQkosS0FBaEIsQ0FKQyxDQUFOO0FBTUEsZUFBT0UsYUFBUDtBQUNEO0FBVlU7QUFBQTtBQUFBLG1DQVlH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QUtSLGtCQUEvQztBQUNBRixtQkFBU1UsbUJBQVQsQ0FBNkIsYUFBN0IsRUFBNEMsS0FBS1AsZUFBakQ7QUFDQUgsbUJBQVNVLG1CQUFULENBQTZCLFVBQTdCLEVBQXlDLEtBQUtQLGVBQTlDO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBSCxpQkFBU1UsbUJBQVQsQ0FBNkIsV0FBN0IsRUFBMEMsS0FBS1Isa0JBQS9DO0FBQ0FGLGlCQUFTVSxtQkFBVCxDQUE2QixTQUE3QixFQUF3QyxLQUFLUCxlQUE3QztBQUNBSCxpQkFBU1UsbUJBQVQsQ0FBNkIsWUFBN0IsRUFBMkMsS0FBS1AsZUFBaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSSxDQUFDZixPQUFMLEVBQWM7QUFDWixlQUFLMUIsZ0JBQUwsQ0FBc0I7QUFDcEJTLDBCQUFjLElBRE07QUFFcEIyQiwrQkFBbUI7QUFGQyxXQUF0QjtBQUlEO0FBQ0Y7QUFscUJVOztBQUFBO0FBQUEsSUFDQ2EsSUFERDtBQUFBLEMiLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcclxuaW1wb3J0IF8gZnJvbSAnLi91dGlscydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJhc2UgPT5cclxuICBjbGFzcyBleHRlbmRzIEJhc2Uge1xyXG4gICAgZ2V0UmVzb2x2ZWRTdGF0ZSAocHJvcHMsIHN0YXRlKSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XHJcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHRoaXMuc3RhdGUpLFxyXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdCh0aGlzLnByb3BzKSxcclxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3Qoc3RhdGUpLFxyXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdChwcm9wcyksXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc29sdmVkU3RhdGVcclxuICAgIH1cclxuXHJcbiAgICBnZXREYXRhTW9kZWwgKG5ld1N0YXRlLCBkYXRhQ2hhbmdlZCkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgY29sdW1ucyxcclxuICAgICAgICBwaXZvdEJ5ID0gW10sXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICByZXNvbHZlRGF0YSxcclxuICAgICAgICBwaXZvdElES2V5LFxyXG4gICAgICAgIHBpdm90VmFsS2V5LFxyXG4gICAgICAgIHN1YlJvd3NLZXksXHJcbiAgICAgICAgYWdncmVnYXRlZEtleSxcclxuICAgICAgICBuZXN0aW5nTGV2ZWxLZXksXHJcbiAgICAgICAgb3JpZ2luYWxLZXksXHJcbiAgICAgICAgaW5kZXhLZXksXHJcbiAgICAgICAgZ3JvdXBlZEJ5UGl2b3RLZXksXHJcbiAgICAgICAgU3ViQ29tcG9uZW50LFxyXG4gICAgICB9ID0gbmV3U3RhdGVcclxuXHJcbiAgICAgIC8vIERldGVybWluZSBIZWFkZXIgR3JvdXBzXHJcbiAgICAgIGxldCBoYXNIZWFkZXJHcm91cHMgPSBmYWxzZVxyXG4gICAgICBjb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcclxuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcclxuICAgICAgICAgIGhhc0hlYWRlckdyb3VwcyA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBsZXQgY29sdW1uc1dpdGhFeHBhbmRlciA9IFsuLi5jb2x1bW5zXVxyXG5cclxuICAgICAgbGV0IGV4cGFuZGVyQ29sdW1uID0gY29sdW1ucy5maW5kKFxyXG4gICAgICAgIGNvbCA9PiBjb2wuZXhwYW5kZXIgfHwgKGNvbC5jb2x1bW5zICYmIGNvbC5jb2x1bW5zLnNvbWUoY29sMiA9PiBjb2wyLmV4cGFuZGVyKSlcclxuICAgICAgKVxyXG4gICAgICAvLyBUaGUgYWN0dWFsIGV4cGFuZGVyIG1pZ2h0IGJlIGluIHRoZSBjb2x1bW5zIGZpZWxkIG9mIGEgZ3JvdXAgY29sdW1uXHJcbiAgICAgIGlmIChleHBhbmRlckNvbHVtbiAmJiAhZXhwYW5kZXJDb2x1bW4uZXhwYW5kZXIpIHtcclxuICAgICAgICBleHBhbmRlckNvbHVtbiA9IGV4cGFuZGVyQ29sdW1uLmNvbHVtbnMuZmluZChjb2wgPT4gY29sLmV4cGFuZGVyKVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB3ZSBoYXZlIFN1YkNvbXBvbmVudCdzIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gZXhwYW5kZXIgY29sdW1uXHJcbiAgICAgIGlmIChTdWJDb21wb25lbnQgJiYgIWV4cGFuZGVyQ29sdW1uKSB7XHJcbiAgICAgICAgZXhwYW5kZXJDb2x1bW4gPSB7IGV4cGFuZGVyOiB0cnVlIH1cclxuICAgICAgICBjb2x1bW5zV2l0aEV4cGFuZGVyID0gW2V4cGFuZGVyQ29sdW1uLCAuLi5jb2x1bW5zV2l0aEV4cGFuZGVyXVxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtYWtlRGVjb3JhdGVkQ29sdW1uID0gKGNvbHVtbiwgcGFyZW50Q29sdW1uKSA9PiB7XHJcbiAgICAgICAgbGV0IGRjb2xcclxuICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSB7XHJcbiAgICAgICAgICBkY29sID0ge1xyXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5leHBhbmRlckRlZmF1bHRzLFxyXG4gICAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRjb2wgPSB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxyXG4gICAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFbnN1cmUgbWluV2lkdGggaXMgbm90IGdyZWF0ZXIgdGhhbiBtYXhXaWR0aCBpZiBzZXRcclxuICAgICAgICBpZiAoZGNvbC5tYXhXaWR0aCA8IGRjb2wubWluV2lkdGgpIHtcclxuICAgICAgICAgIGRjb2wubWluV2lkdGggPSBkY29sLm1heFdpZHRoXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyZW50Q29sdW1uKSB7XHJcbiAgICAgICAgICBkY29sLnBhcmVudENvbHVtbiA9IHBhcmVudENvbHVtblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgZm9yIHN0cmluZyBhY2Nlc3NvclxyXG4gICAgICAgIGlmICh0eXBlb2YgZGNvbC5hY2Nlc3NvciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIGRjb2wuaWQgPSBkY29sLmlkIHx8IGRjb2wuYWNjZXNzb3JcclxuICAgICAgICAgIGNvbnN0IGFjY2Vzc29yU3RyaW5nID0gZGNvbC5hY2Nlc3NvclxyXG4gICAgICAgICAgZGNvbC5hY2Nlc3NvciA9IHJvdyA9PiBfLmdldChyb3csIGFjY2Vzc29yU3RyaW5nKVxyXG4gICAgICAgICAgcmV0dXJuIGRjb2xcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBmdW5jdGlvbmFsIGFjY2Vzc29yIChidXQgcmVxdWlyZSBhbiBJRClcclxuICAgICAgICBpZiAoZGNvbC5hY2Nlc3NvciAmJiAhZGNvbC5pZCkge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGRjb2wpXHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICdBIGNvbHVtbiBpZCBpcyByZXF1aXJlZCBpZiB1c2luZyBhIG5vbi1zdHJpbmcgYWNjZXNzb3IgZm9yIGNvbHVtbiBhYm92ZS4nXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gYW4gdW5kZWZpbmVkIGFjY2Vzc29yXHJcbiAgICAgICAgaWYgKCFkY29sLmFjY2Vzc29yKSB7XHJcbiAgICAgICAgICBkY29sLmFjY2Vzc29yID0gKCkgPT4gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGNvbFxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cclxuXHJcbiAgICAgIC8vIERlY29yYXRlIHRoZSBjb2x1bW5zXHJcbiAgICAgIGNvbnN0IGRlY29yYXRlQW5kQWRkVG9BbGwgPSAoY29sdW1uLCBwYXJlbnRDb2x1bW4pID0+IHtcclxuICAgICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW4gPSBtYWtlRGVjb3JhdGVkQ29sdW1uKGNvbHVtbiwgcGFyZW50Q29sdW1uKVxyXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMucHVzaChkZWNvcmF0ZWRDb2x1bW4pXHJcbiAgICAgICAgcmV0dXJuIGRlY29yYXRlZENvbHVtblxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW5zID0gY29sdW1uc1dpdGhFeHBhbmRlci5tYXAoY29sdW1uID0+IHtcclxuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLmNvbHVtbixcclxuICAgICAgICAgICAgY29sdW1uczogY29sdW1uLmNvbHVtbnMubWFwKGQgPT4gZGVjb3JhdGVBbmRBZGRUb0FsbChkLCBjb2x1bW4pKSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRlY29yYXRlQW5kQWRkVG9BbGwoY29sdW1uKVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8gQnVpbGQgdGhlIHZpc2libGUgY29sdW1ucywgaGVhZGVycyBhbmQgZmxhdCBjb2x1bW4gbGlzdFxyXG4gICAgICBsZXQgdmlzaWJsZUNvbHVtbnMgPSBkZWNvcmF0ZWRDb2x1bW5zLnNsaWNlKClcclxuICAgICAgbGV0IGFsbFZpc2libGVDb2x1bW5zID0gW11cclxuXHJcbiAgICAgIHZpc2libGVDb2x1bW5zID0gdmlzaWJsZUNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XHJcbiAgICAgICAgICBjb25zdCB2aXNpYmxlU3ViQ29sdW1ucyA9IGNvbHVtbi5jb2x1bW5zLmZpbHRlcihcclxuICAgICAgICAgICAgZCA9PiAocGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSkpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5jb2x1bW4sXHJcbiAgICAgICAgICAgIGNvbHVtbnM6IHZpc2libGVTdWJDb2x1bW5zLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sdW1uXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICB2aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zLmZpbHRlcihcclxuICAgICAgICBjb2x1bW4gPT5cclxuICAgICAgICAgIGNvbHVtbi5jb2x1bW5zXHJcbiAgICAgICAgICAgID8gY29sdW1uLmNvbHVtbnMubGVuZ3RoXHJcbiAgICAgICAgICAgIDogcGl2b3RCeS5pbmRleE9mKGNvbHVtbi5pZCkgPiAtMVxyXG4gICAgICAgICAgICAgID8gZmFsc2VcclxuICAgICAgICAgICAgICA6IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5zaG93LCB0cnVlKVxyXG4gICAgICApXHJcblxyXG4gICAgICAvLyBGaW5kIGFueSBjdXN0b20gcGl2b3QgbG9jYXRpb25cclxuICAgICAgY29uc3QgcGl2b3RJbmRleCA9IHZpc2libGVDb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnBpdm90KVxyXG5cclxuICAgICAgLy8gSGFuZGxlIFBpdm90IENvbHVtbnNcclxuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gUmV0cmlldmUgdGhlIHBpdm90IGNvbHVtbnMgaW4gdGhlIGNvcnJlY3QgcGl2b3Qgb3JkZXJcclxuICAgICAgICBjb25zdCBwaXZvdENvbHVtbnMgPSBbXVxyXG4gICAgICAgIHBpdm90QnkuZm9yRWFjaChwaXZvdElEID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZvdW5kID0gYWxsRGVjb3JhdGVkQ29sdW1ucy5maW5kKGQgPT4gZC5pZCA9PT0gcGl2b3RJRClcclxuICAgICAgICAgIGlmIChmb3VuZCkge1xyXG4gICAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChmb3VuZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBQaXZvdFBhcmVudENvbHVtbiA9IHBpdm90Q29sdW1ucy5yZWR1Y2UoXHJcbiAgICAgICAgICAocHJldiwgY3VycmVudCkgPT4gcHJldiAmJiBwcmV2ID09PSBjdXJyZW50LnBhcmVudENvbHVtbiAmJiBjdXJyZW50LnBhcmVudENvbHVtbixcclxuICAgICAgICAgIHBpdm90Q29sdW1uc1swXS5wYXJlbnRDb2x1bW5cclxuICAgICAgICApXHJcblxyXG4gICAgICAgIGxldCBQaXZvdEdyb3VwSGVhZGVyID0gaGFzSGVhZGVyR3JvdXBzICYmIFBpdm90UGFyZW50Q29sdW1uLkhlYWRlclxyXG4gICAgICAgIFBpdm90R3JvdXBIZWFkZXIgPSBQaXZvdEdyb3VwSGVhZGVyIHx8ICgoKSA9PiA8c3Ryb25nPlBpdm90ZWQ8L3N0cm9uZz4pXHJcblxyXG4gICAgICAgIGxldCBwaXZvdENvbHVtbkdyb3VwID0ge1xyXG4gICAgICAgICAgSGVhZGVyOiBQaXZvdEdyb3VwSGVhZGVyLFxyXG4gICAgICAgICAgY29sdW1uczogcGl2b3RDb2x1bW5zLm1hcChjb2wgPT4gKHtcclxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5waXZvdERlZmF1bHRzLFxyXG4gICAgICAgICAgICAuLi5jb2wsXHJcbiAgICAgICAgICAgIHBpdm90ZWQ6IHRydWUsXHJcbiAgICAgICAgICB9KSksXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQbGFjZSB0aGUgcGl2b3RDb2x1bW5zIGJhY2sgaW50byB0aGUgdmlzaWJsZUNvbHVtbnNcclxuICAgICAgICBpZiAocGl2b3RJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICBwaXZvdENvbHVtbkdyb3VwID0ge1xyXG4gICAgICAgICAgICAuLi52aXNpYmxlQ29sdW1uc1twaXZvdEluZGV4XSxcclxuICAgICAgICAgICAgLi4ucGl2b3RDb2x1bW5Hcm91cCxcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZpc2libGVDb2x1bW5zLnNwbGljZShwaXZvdEluZGV4LCAxLCBwaXZvdENvbHVtbkdyb3VwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy51bnNoaWZ0KHBpdm90Q29sdW1uR3JvdXApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBCdWlsZCBIZWFkZXIgR3JvdXBzXHJcbiAgICAgIGNvbnN0IGhlYWRlckdyb3VwcyA9IFtdXHJcbiAgICAgIGxldCBjdXJyZW50U3BhbiA9IFtdXHJcblxyXG4gICAgICAvLyBBIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGFkZCBhIGhlYWRlciBhbmQgcmVzZXQgdGhlIGN1cnJlbnRTcGFuXHJcbiAgICAgIGNvbnN0IGFkZEhlYWRlciA9IChjb2x1bW5zLCBjb2x1bW4pID0+IHtcclxuICAgICAgICBoZWFkZXJHcm91cHMucHVzaCh7XHJcbiAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcclxuICAgICAgICAgIC4uLmNvbHVtbixcclxuICAgICAgICAgIGNvbHVtbnMsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjdXJyZW50U3BhbiA9IFtdXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEJ1aWxkIGZsYXN0IGxpc3Qgb2YgYWxsVmlzaWJsZUNvbHVtbnMgYW5kIEhlYWRlckdyb3Vwc1xyXG4gICAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XHJcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XHJcbiAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucyA9IGFsbFZpc2libGVDb2x1bW5zLmNvbmNhdChjb2x1bW4uY29sdW1ucylcclxuICAgICAgICAgIGlmIChjdXJyZW50U3Bhbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGFkZEhlYWRlcihjdXJyZW50U3BhbilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGFkZEhlYWRlcihjb2x1bW4uY29sdW1ucywgY29sdW1uKVxyXG4gICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFsbFZpc2libGVDb2x1bW5zLnB1c2goY29sdW1uKVxyXG4gICAgICAgIGN1cnJlbnRTcGFuLnB1c2goY29sdW1uKVxyXG4gICAgICB9KVxyXG4gICAgICBpZiAoaGFzSGVhZGVyR3JvdXBzICYmIGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBhZGRIZWFkZXIoY3VycmVudFNwYW4pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEFjY2VzcyB0aGUgZGF0YVxyXG4gICAgICBjb25zdCBhY2Nlc3NSb3cgPSAoZCwgaSwgbGV2ZWwgPSAwKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0ge1xyXG4gICAgICAgICAgW29yaWdpbmFsS2V5XTogZCxcclxuICAgICAgICAgIFtpbmRleEtleV06IGksXHJcbiAgICAgICAgICBbc3ViUm93c0tleV06IGRbc3ViUm93c0tleV0sXHJcbiAgICAgICAgICBbbmVzdGluZ0xldmVsS2V5XTogbGV2ZWwsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xyXG4gICAgICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikgcmV0dXJuXHJcbiAgICAgICAgICByb3dbY29sdW1uLmlkXSA9IGNvbHVtbi5hY2Nlc3NvcihkKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJvd1tzdWJSb3dzS2V5XSkge1xyXG4gICAgICAgICAgcm93W3N1YlJvd3NLZXldID0gcm93W3N1YlJvd3NLZXldLm1hcCgoZCwgaSkgPT4gYWNjZXNzUm93KGQsIGksIGxldmVsICsgMSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3dcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gLy8gSWYgdGhlIGRhdGEgaGFzbid0IGNoYW5nZWQsIGp1c3QgdXNlIHRoZSBjYWNoZWQgZGF0YVxyXG4gICAgICBsZXQgcmVzb2x2ZWREYXRhID0gdGhpcy5yZXNvbHZlZERhdGFcclxuICAgICAgLy8gSWYgdGhlIGRhdGEgaGFzIGNoYW5nZWQsIHJ1biB0aGUgZGF0YSByZXNvbHZlciBhbmQgY2FjaGUgdGhlIHJlc3VsdFxyXG4gICAgICBpZiAoIXRoaXMucmVzb2x2ZWREYXRhIHx8IGRhdGFDaGFuZ2VkKSB7XHJcbiAgICAgICAgcmVzb2x2ZWREYXRhID0gcmVzb2x2ZURhdGEoZGF0YSlcclxuICAgICAgICB0aGlzLnJlc29sdmVkRGF0YSA9IHJlc29sdmVkRGF0YVxyXG4gICAgICB9XHJcbiAgICAgIC8vIFVzZSB0aGUgcmVzb2x2ZWQgZGF0YVxyXG4gICAgICByZXNvbHZlZERhdGEgPSByZXNvbHZlZERhdGEubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSkpXHJcblxyXG4gICAgICAvLyBUT0RPOiBNYWtlIGl0IHBvc3NpYmxlIHRvIGZhYnJpY2F0ZSBuZXN0ZWQgcm93cyB3aXRob3V0IHBpdm90aW5nXHJcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW5nQ29sdW1ucyA9IGFsbFZpc2libGVDb2x1bW5zLmZpbHRlcihkID0+ICFkLmV4cGFuZGVyICYmIGQuYWdncmVnYXRlKVxyXG5cclxuICAgICAgLy8gSWYgcGl2b3RpbmcsIHJlY3Vyc2l2ZWx5IGdyb3VwIHRoZSBkYXRhXHJcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0ZSA9IHJvd3MgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFnZ3JlZ2F0aW9uVmFsdWVzID0ge31cclxuICAgICAgICBhZ2dyZWdhdGluZ0NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xyXG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gcm93cy5tYXAoZCA9PiBkW2NvbHVtbi5pZF0pXHJcbiAgICAgICAgICBhZ2dyZWdhdGlvblZhbHVlc1tjb2x1bW4uaWRdID0gY29sdW1uLmFnZ3JlZ2F0ZSh2YWx1ZXMsIHJvd3MpXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gYWdncmVnYXRpb25WYWx1ZXNcclxuICAgICAgfVxyXG4gICAgICBpZiAocGl2b3RCeS5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBncm91cFJlY3Vyc2l2ZWx5ID0gKHJvd3MsIGtleXMsIGkgPSAwKSA9PiB7XHJcbiAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBsYXN0IGxldmVsLCBqdXN0IHJldHVybiB0aGUgcm93c1xyXG4gICAgICAgICAgaWYgKGkgPT09IGtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByb3dzXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBHcm91cCB0aGUgcm93cyB0b2dldGhlciBmb3IgdGhpcyBsZXZlbFxyXG4gICAgICAgICAgbGV0IGdyb3VwZWRSb3dzID0gT2JqZWN0LmVudHJpZXMoXy5ncm91cEJ5KHJvd3MsIGtleXNbaV0pKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcclxuICAgICAgICAgICAgW3Bpdm90SURLZXldOiBrZXlzW2ldLFxyXG4gICAgICAgICAgICBbcGl2b3RWYWxLZXldOiBrZXksXHJcbiAgICAgICAgICAgIFtrZXlzW2ldXToga2V5LFxyXG4gICAgICAgICAgICBbc3ViUm93c0tleV06IHZhbHVlLFxyXG4gICAgICAgICAgICBbbmVzdGluZ0xldmVsS2V5XTogaSxcclxuICAgICAgICAgICAgW2dyb3VwZWRCeVBpdm90S2V5XTogdHJ1ZSxcclxuICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgLy8gUmVjdXJzZSBpbnRvIHRoZSBzdWJSb3dzXHJcbiAgICAgICAgICBncm91cGVkUm93cyA9IGdyb3VwZWRSb3dzLm1hcChyb3dHcm91cCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YlJvd3MgPSBncm91cFJlY3Vyc2l2ZWx5KHJvd0dyb3VwW3N1YlJvd3NLZXldLCBrZXlzLCBpICsgMSlcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAuLi5yb3dHcm91cCxcclxuICAgICAgICAgICAgICBbc3ViUm93c0tleV06IHN1YlJvd3MsXHJcbiAgICAgICAgICAgICAgW2FnZ3JlZ2F0ZWRLZXldOiB0cnVlLFxyXG4gICAgICAgICAgICAgIC4uLmFnZ3JlZ2F0ZShzdWJSb3dzKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIHJldHVybiBncm91cGVkUm93c1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXNvbHZlZERhdGEgPSBncm91cFJlY3Vyc2l2ZWx5KHJlc29sdmVkRGF0YSwgcGl2b3RCeSlcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICAuLi5uZXdTdGF0ZSxcclxuICAgICAgICByZXNvbHZlZERhdGEsXHJcbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXHJcbiAgICAgICAgaGVhZGVyR3JvdXBzLFxyXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMsXHJcbiAgICAgICAgaGFzSGVhZGVyR3JvdXBzLFxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U29ydGVkRGF0YSAocmVzb2x2ZWRTdGF0ZSkge1xyXG4gICAgICBjb25zdCB7XHJcbiAgICAgICAgbWFudWFsLFxyXG4gICAgICAgIHNvcnRlZCxcclxuICAgICAgICBmaWx0ZXJlZCxcclxuICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxyXG4gICAgICAgIHJlc29sdmVkRGF0YSxcclxuICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucyxcclxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxyXG4gICAgICB9ID0gcmVzb2x2ZWRTdGF0ZVxyXG5cclxuICAgICAgY29uc3Qgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge31cclxuXHJcbiAgICAgIGFsbERlY29yYXRlZENvbHVtbnMuZmlsdGVyKGNvbCA9PiBjb2wuc29ydE1ldGhvZCkuZm9yRWFjaChjb2wgPT4ge1xyXG4gICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFtjb2wuaWRdID0gY29sLnNvcnRNZXRob2RcclxuICAgICAgfSlcclxuXHJcbiAgICAgIC8vIFJlc29sdmUgdGhlIGRhdGEgZnJvbSBlaXRoZXIgbWFudWFsIGRhdGEgb3Igc29ydGVkIGRhdGFcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzb3J0ZWREYXRhOiBtYW51YWxcclxuICAgICAgICAgID8gcmVzb2x2ZWREYXRhXHJcbiAgICAgICAgICA6IHRoaXMuc29ydERhdGEoXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyRGF0YShyZXNvbHZlZERhdGEsIGZpbHRlcmVkLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCBhbGxWaXNpYmxlQ29sdW1ucyksXHJcbiAgICAgICAgICAgIHNvcnRlZCxcclxuICAgICAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEXHJcbiAgICAgICAgICApLFxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmlyZUZldGNoRGF0YSAoKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25GZXRjaERhdGEodGhpcy5nZXRSZXNvbHZlZFN0YXRlKCksIHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvcE9yU3RhdGUgKGtleSkge1xyXG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5wcm9wc1trZXldLCB0aGlzLnN0YXRlW2tleV0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RhdGVPclByb3AgKGtleSkge1xyXG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5zdGF0ZVtrZXldLCB0aGlzLnByb3BzW2tleV0pXHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyRGF0YSAoZGF0YSwgZmlsdGVyZWQsIGRlZmF1bHRGaWx0ZXJNZXRob2QsIGFsbFZpc2libGVDb2x1bW5zKSB7XHJcbiAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSBkYXRhXHJcblxyXG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWQucmVkdWNlKChmaWx0ZXJlZFNvRmFyLCBuZXh0RmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBhbGxWaXNpYmxlQ29sdW1ucy5maW5kKHggPT4geC5pZCA9PT0gbmV4dEZpbHRlci5pZClcclxuXHJcbiAgICAgICAgICAvLyBEb24ndCBmaWx0ZXIgaGlkZGVuIGNvbHVtbnMgb3IgY29sdW1ucyB0aGF0IGhhdmUgaGFkIHRoZWlyIGZpbHRlcnMgZGlzYWJsZWRcclxuICAgICAgICAgIGlmICghY29sdW1uIHx8IGNvbHVtbi5maWx0ZXJhYmxlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWRTb0ZhclxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGNvbnN0IGZpbHRlck1ldGhvZCA9IGNvbHVtbi5maWx0ZXJNZXRob2QgfHwgZGVmYXVsdEZpbHRlck1ldGhvZFxyXG5cclxuICAgICAgICAgIC8vIElmICdmaWx0ZXJBbGwnIGlzIHNldCB0byB0cnVlLCBwYXNzIHRoZSBlbnRpcmUgZGF0YXNldCB0byB0aGUgZmlsdGVyIG1ldGhvZFxyXG4gICAgICAgICAgaWYgKGNvbHVtbi5maWx0ZXJBbGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlck1ldGhvZChuZXh0RmlsdGVyLCBmaWx0ZXJlZFNvRmFyLCBjb2x1bW4pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmlsdGVyZWRTb0Zhci5maWx0ZXIocm93ID0+IGZpbHRlck1ldGhvZChuZXh0RmlsdGVyLCByb3csIGNvbHVtbikpXHJcbiAgICAgICAgfSwgZmlsdGVyZWREYXRhKVxyXG5cclxuICAgICAgICAvLyBBcHBseSB0aGUgZmlsdGVyIHRvIHRoZSBzdWJyb3dzIGlmIHdlIGFyZSBwaXZvdGluZywgYW5kIHRoZW5cclxuICAgICAgICAvLyBmaWx0ZXIgYW55IHJvd3Mgd2l0aG91dCBzdWJjb2x1bW5zIGJlY2F1c2UgaXQgd291bGQgYmUgc3RyYW5nZSB0byBzaG93XHJcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhXHJcbiAgICAgICAgICAubWFwKHJvdyA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcm93XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAuLi5yb3csXHJcbiAgICAgICAgICAgICAgW3RoaXMucHJvcHMuc3ViUm93c0tleV06IHRoaXMuZmlsdGVyRGF0YShcclxuICAgICAgICAgICAgICAgIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyZWQsXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnNcclxuICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmZpbHRlcihyb3cgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0ubGVuZ3RoID4gMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGZpbHRlcmVkRGF0YVxyXG4gICAgfVxyXG5cclxuICAgIHNvcnREYXRhIChkYXRhLCBzb3J0ZWQsIHNvcnRNZXRob2RzQnlDb2x1bW5JRCA9IHt9KSB7XHJcbiAgICAgIGlmICghc29ydGVkLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNvcnRlZERhdGEgPSAodGhpcy5wcm9wcy5vcmRlckJ5TWV0aG9kIHx8IF8ub3JkZXJCeSkoXHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBzb3J0ZWQubWFwKHNvcnQgPT4ge1xyXG4gICAgICAgICAgLy8gU3VwcG9ydCBjdXN0b20gc29ydGluZyBtZXRob2RzIGZvciBlYWNoIGNvbHVtblxyXG4gICAgICAgICAgaWYgKHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXShhW3NvcnQuaWRdLCBiW3NvcnQuaWRdLCBzb3J0LmRlc2MpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHRoaXMucHJvcHMuZGVmYXVsdFNvcnRNZXRob2QoYVtzb3J0LmlkXSwgYltzb3J0LmlkXSwgc29ydC5kZXNjKVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHNvcnRlZC5tYXAoZCA9PiAhZC5kZXNjKSxcclxuICAgICAgICB0aGlzLnByb3BzLmluZGV4S2V5XHJcbiAgICAgIClcclxuXHJcbiAgICAgIHNvcnRlZERhdGEuZm9yRWFjaChyb3cgPT4ge1xyXG4gICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcclxuICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSA9IHRoaXMuc29ydERhdGEoXHJcbiAgICAgICAgICByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSxcclxuICAgICAgICAgIHNvcnRlZCxcclxuICAgICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFxyXG4gICAgICAgIClcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHJldHVybiBzb3J0ZWREYXRhXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWluUm93cyAoKSB7XHJcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzLm1pblJvd3MsIHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJykpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXNlciBhY3Rpb25zXHJcbiAgICBvblBhZ2VDaGFuZ2UgKHBhZ2UpIHtcclxuICAgICAgY29uc3QgeyBvblBhZ2VDaGFuZ2UsIGNvbGxhcHNlT25QYWdlQ2hhbmdlIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgcGFnZSB9XHJcbiAgICAgIGlmIChjb2xsYXBzZU9uUGFnZUNoYW5nZSkge1xyXG4gICAgICAgIG5ld1N0YXRlLmV4cGFuZGVkID0ge31cclxuICAgICAgfVxyXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEobmV3U3RhdGUsICgpID0+IG9uUGFnZUNoYW5nZSAmJiBvblBhZ2VDaGFuZ2UocGFnZSkpXHJcbiAgICB9XHJcblxyXG4gICAgb25QYWdlU2l6ZUNoYW5nZSAobmV3UGFnZVNpemUpIHtcclxuICAgICAgY29uc3QgeyBvblBhZ2VTaXplQ2hhbmdlIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgIGNvbnN0IHsgcGFnZVNpemUsIHBhZ2UgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXHJcblxyXG4gICAgICAvLyBOb3JtYWxpemUgdGhlIHBhZ2UgdG8gZGlzcGxheVxyXG4gICAgICBjb25zdCBjdXJyZW50Um93ID0gcGFnZVNpemUgKiBwYWdlXHJcbiAgICAgIGNvbnN0IG5ld1BhZ2UgPSBNYXRoLmZsb29yKGN1cnJlbnRSb3cgLyBuZXdQYWdlU2l6ZSlcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYWdlU2l6ZTogbmV3UGFnZVNpemUsXHJcbiAgICAgICAgICBwYWdlOiBuZXdQYWdlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4gb25QYWdlU2l6ZUNoYW5nZSAmJiBvblBhZ2VTaXplQ2hhbmdlKG5ld1BhZ2VTaXplLCBuZXdQYWdlKVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgc29ydENvbHVtbiAoY29sdW1uLCBhZGRpdGl2ZSkge1xyXG4gICAgICBjb25zdCB7IHNvcnRlZCwgc2tpcE5leHRTb3J0LCBkZWZhdWx0U29ydERlc2MgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXHJcblxyXG4gICAgICBjb25zdCBmaXJzdFNvcnREaXJlY3Rpb24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sdW1uLCAnZGVmYXVsdFNvcnREZXNjJylcclxuICAgICAgICA/IGNvbHVtbi5kZWZhdWx0U29ydERlc2NcclxuICAgICAgICA6IGRlZmF1bHRTb3J0RGVzY1xyXG4gICAgICBjb25zdCBzZWNvbmRTb3J0RGlyZWN0aW9uID0gIWZpcnN0U29ydERpcmVjdGlvblxyXG5cclxuICAgICAgLy8gd2UgY2FuJ3Qgc3RvcCBldmVudCBwcm9wYWdhdGlvbiBmcm9tIHRoZSBjb2x1bW4gcmVzaXplIG1vdmUgaGFuZGxlcnNcclxuICAgICAgLy8gYXR0YWNoZWQgdG8gdGhlIGRvY3VtZW50IGJlY2F1c2Ugb2YgcmVhY3QncyBzeW50aGV0aWMgZXZlbnRzXHJcbiAgICAgIC8vIHNvIHdlIGhhdmUgdG8gcHJldmVudCB0aGUgc29ydCBmdW5jdGlvbiBmcm9tIGFjdHVhbGx5IHNvcnRpbmdcclxuICAgICAgLy8gaWYgd2UgY2xpY2sgb24gdGhlIGNvbHVtbiByZXNpemUgZWxlbWVudCB3aXRoaW4gYSBoZWFkZXIuXHJcbiAgICAgIGlmIChza2lwTmV4dFNvcnQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xyXG4gICAgICAgICAgc2tpcE5leHRTb3J0OiBmYWxzZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVyblxyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB7IG9uU29ydGVkQ2hhbmdlIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgICBsZXQgbmV3U29ydGVkID0gXy5jbG9uZShzb3J0ZWQgfHwgW10pLm1hcChkID0+IHtcclxuICAgICAgICBkLmRlc2MgPSBfLmlzU29ydGluZ0Rlc2MoZClcclxuICAgICAgICByZXR1cm4gZFxyXG4gICAgICB9KVxyXG4gICAgICBpZiAoIV8uaXNBcnJheShjb2x1bW4pKSB7XHJcbiAgICAgICAgLy8gU2luZ2xlLVNvcnRcclxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcclxuICAgICAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxyXG4gICAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MgPT09IHNlY29uZFNvcnREaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgaWYgKGFkZGl0aXZlKSB7XHJcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCAxKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGV4aXN0aW5nLmRlc2MgPSBmaXJzdFNvcnREaXJlY3Rpb25cclxuICAgICAgICAgICAgICBuZXdTb3J0ZWQgPSBbZXhpc3RpbmddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV4aXN0aW5nLmRlc2MgPSBzZWNvbmRTb3J0RGlyZWN0aW9uXHJcbiAgICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcclxuICAgICAgICAgICAgICBuZXdTb3J0ZWQgPSBbZXhpc3RpbmddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGFkZGl0aXZlKSB7XHJcbiAgICAgICAgICBuZXdTb3J0ZWQucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXHJcbiAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld1NvcnRlZCA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXHJcbiAgICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBNdWx0aS1Tb3J0XHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IG5ld1NvcnRlZC5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW5bMF0uaWQpXHJcbiAgICAgICAgLy8gRXhpc3RpbmcgU29ydGVkIENvbHVtblxyXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcclxuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGVkW2V4aXN0aW5nSW5kZXhdXHJcbiAgICAgICAgICBpZiAoZXhpc3RpbmcuZGVzYyA9PT0gc2Vjb25kU29ydERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcclxuICAgICAgICAgICAgICBuZXdTb3J0ZWQuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIG5ld1NvcnRlZFtleGlzdGluZ0luZGV4ICsgaV0uZGVzYyA9IGZpcnN0U29ydERpcmVjdGlvblxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gc2Vjb25kU29ydERpcmVjdGlvblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFhZGRpdGl2ZSkge1xyXG4gICAgICAgICAgICBuZXdTb3J0ZWQgPSBuZXdTb3J0ZWQuc2xpY2UoZXhpc3RpbmdJbmRleCwgY29sdW1uLmxlbmd0aClcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIE5ldyBTb3J0IENvbHVtblxyXG4gICAgICAgIH0gZWxzZSBpZiAoYWRkaXRpdmUpIHtcclxuICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5jb25jYXQoXHJcbiAgICAgICAgICAgIGNvbHVtbi5tYXAoZCA9PiAoe1xyXG4gICAgICAgICAgICAgIGlkOiBkLmlkLFxyXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcclxuICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld1NvcnRlZCA9IGNvbHVtbi5tYXAoZCA9PiAoe1xyXG4gICAgICAgICAgICBpZDogZC5pZCxcclxuICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxyXG4gICAgICAgICAgfSkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGFnZTogKCFzb3J0ZWQubGVuZ3RoICYmIG5ld1NvcnRlZC5sZW5ndGgpIHx8ICFhZGRpdGl2ZSA/IDAgOiB0aGlzLnN0YXRlLnBhZ2UsXHJcbiAgICAgICAgICBzb3J0ZWQ6IG5ld1NvcnRlZCxcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IG9uU29ydGVkQ2hhbmdlICYmIG9uU29ydGVkQ2hhbmdlKG5ld1NvcnRlZCwgY29sdW1uLCBhZGRpdGl2ZSlcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGZpbHRlckNvbHVtbiAoY29sdW1uLCB2YWx1ZSkge1xyXG4gICAgICBjb25zdCB7IGZpbHRlcmVkIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxyXG4gICAgICBjb25zdCB7IG9uRmlsdGVyZWRDaGFuZ2UgfSA9IHRoaXMucHJvcHNcclxuXHJcbiAgICAgIC8vIFJlbW92ZSBvbGQgZmlsdGVyIGZpcnN0IGlmIGl0IGV4aXN0c1xyXG4gICAgICBjb25zdCBuZXdGaWx0ZXJpbmcgPSAoZmlsdGVyZWQgfHwgW10pLmZpbHRlcih4ID0+IHguaWQgIT09IGNvbHVtbi5pZClcclxuXHJcbiAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcclxuICAgICAgICBuZXdGaWx0ZXJpbmcucHVzaCh7XHJcbiAgICAgICAgICBpZDogY29sdW1uLmlkLFxyXG4gICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGZpbHRlcmVkOiBuZXdGaWx0ZXJpbmcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAoKSA9PiBvbkZpbHRlcmVkQ2hhbmdlICYmIG9uRmlsdGVyZWRDaGFuZ2UobmV3RmlsdGVyaW5nLCBjb2x1bW4sIHZhbHVlKVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplQ29sdW1uU3RhcnQgKGV2ZW50LCBjb2x1bW4sIGlzVG91Y2gpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgY29uc3QgcGFyZW50V2lkdGggPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG5cclxuICAgICAgbGV0IHBhZ2VYXHJcbiAgICAgIGlmIChpc1RvdWNoKSB7XHJcbiAgICAgICAgcGFnZVggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy50cmFwRXZlbnRzID0gdHJ1ZVxyXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IHtcclxuICAgICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcclxuICAgICAgICAgICAgc3RhcnRYOiBwYWdlWCxcclxuICAgICAgICAgICAgcGFyZW50V2lkdGgsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGlzVG91Y2gpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplQ29sdW1uTW92aW5nIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICBjb25zdCB7IG9uUmVzaXplZENoYW5nZSB9ID0gdGhpcy5wcm9wc1xyXG4gICAgICBjb25zdCB7IHJlc2l6ZWQsIGN1cnJlbnRseVJlc2l6aW5nIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxyXG5cclxuICAgICAgLy8gRGVsZXRlIG9sZCB2YWx1ZVxyXG4gICAgICBjb25zdCBuZXdSZXNpemVkID0gcmVzaXplZC5maWx0ZXIoeCA9PiB4LmlkICE9PSBjdXJyZW50bHlSZXNpemluZy5pZClcclxuXHJcbiAgICAgIGxldCBwYWdlWFxyXG5cclxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcbiAgICAgICAgcGFnZVggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxyXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XHJcbiAgICAgICAgcGFnZVggPSBldmVudC5wYWdlWFxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgdGhlIG1pbiBzaXplIHRvIDEwIHRvIGFjY291bnQgZm9yIG1hcmdpbiBhbmQgYm9yZGVyIG9yIGVsc2UgdGhlXHJcbiAgICAgIC8vIGdyb3VwIGhlYWRlcnMgZG9uJ3QgbGluZSB1cCBjb3JyZWN0bHlcclxuICAgICAgY29uc3QgbmV3V2lkdGggPSBNYXRoLm1heChcclxuICAgICAgICBjdXJyZW50bHlSZXNpemluZy5wYXJlbnRXaWR0aCArIHBhZ2VYIC0gY3VycmVudGx5UmVzaXppbmcuc3RhcnRYLFxyXG4gICAgICAgIDExXHJcbiAgICAgIClcclxuXHJcbiAgICAgIG5ld1Jlc2l6ZWQucHVzaCh7XHJcbiAgICAgICAgaWQ6IGN1cnJlbnRseVJlc2l6aW5nLmlkLFxyXG4gICAgICAgIHZhbHVlOiBuZXdXaWR0aCxcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcclxuICAgICAgICB7XHJcbiAgICAgICAgICByZXNpemVkOiBuZXdSZXNpemVkLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4gb25SZXNpemVkQ2hhbmdlICYmIG9uUmVzaXplZENoYW5nZShuZXdSZXNpemVkLCBldmVudClcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc2l6ZUNvbHVtbkVuZCAoZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgY29uc3QgaXNUb3VjaCA9IGV2ZW50LnR5cGUgPT09ICd0b3VjaGVuZCcgfHwgZXZlbnQudHlwZSA9PT0gJ3RvdWNoY2FuY2VsJ1xyXG5cclxuICAgICAgaWYgKGlzVG91Y2gpIHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIGl0cyBhIHRvdWNoIGV2ZW50IGNsZWFyIHRoZSBtb3VzZSBvbmUncyBhcyB3ZWxsIGJlY2F1c2Ugc29tZXRpbWVzXHJcbiAgICAgIC8vIHRoZSBtb3VzZURvd24gZXZlbnQgZ2V0cyBjYWxsZWQgYXMgd2VsbCwgYnV0IHRoZSBtb3VzZVVwIGV2ZW50IGRvZXNuJ3RcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxyXG5cclxuICAgICAgLy8gVGhlIHRvdWNoIGV2ZW50cyBkb24ndCBwcm9wYWdhdGUgdXAgdG8gdGhlIHNvcnRpbmcncyBvbk1vdXNlRG93biBldmVudCBzb1xyXG4gICAgICAvLyBubyBuZWVkIHRvIHByZXZlbnQgaXQgZnJvbSBoYXBwZW5pbmcgb3IgZWxzZSB0aGUgZmlyc3QgY2xpY2sgYWZ0ZXIgYSB0b3VjaFxyXG4gICAgICAvLyBldmVudCByZXNpemUgd2lsbCBub3Qgc29ydCB0aGUgY29sdW1uLlxyXG4gICAgICBpZiAoIWlzVG91Y2gpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoe1xyXG4gICAgICAgICAgc2tpcE5leHRTb3J0OiB0cnVlLFxyXG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IGZhbHNlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==