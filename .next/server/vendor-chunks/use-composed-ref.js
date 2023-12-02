"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-composed-ref";
exports.ids = ["vendor-chunks/use-composed-ref"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-composed-ref/dist/use-composed-ref.cjs.js":
/*!********************************************************************!*\
  !*** ./node_modules/use-composed-ref/dist/use-composed-ref.cjs.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\nvar React = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n\nvar updateRef = function updateRef(ref, value) {\n  if (typeof ref === 'function') {\n    ref(value);\n    return;\n  }\n  ref.current = value;\n};\n\nvar useComposedRef = function useComposedRef(libRef, userRef) {\n  var prevUserRef = React.useRef();\n  return React.useCallback(function (instance) {\n    libRef.current = instance;\n\n    if (prevUserRef.current) {\n      updateRef(prevUserRef.current, null);\n    }\n\n    prevUserRef.current = userRef;\n\n    if (!userRef) {\n      return;\n    }\n\n    updateRef(userRef, instance);\n  }, [userRef]);\n};\n\nexports[\"default\"] = useComposedRef;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNvbXBvc2VkLXJlZi9kaXN0L3VzZS1jb21wb3NlZC1yZWYuY2pzLmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLDhDQUE2QyxFQUFFLGFBQWEsRUFBQzs7QUFFN0QsWUFBWSxtQkFBTyxDQUFDLHdHQUFPOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGtCQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbW9uZGF5QXNzaXN0YW50Ly4vbm9kZV9tb2R1bGVzL3VzZS1jb21wb3NlZC1yZWYvZGlzdC91c2UtY29tcG9zZWQtcmVmLmNqcy5qcz80Mjg1Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIHVwZGF0ZVJlZiA9IGZ1bmN0aW9uIHVwZGF0ZVJlZihyZWYsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVmKHZhbHVlKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbn07XG5cbnZhciB1c2VDb21wb3NlZFJlZiA9IGZ1bmN0aW9uIHVzZUNvbXBvc2VkUmVmKGxpYlJlZiwgdXNlclJlZikge1xuICB2YXIgcHJldlVzZXJSZWYgPSBSZWFjdC51c2VSZWYoKTtcbiAgcmV0dXJuIFJlYWN0LnVzZUNhbGxiYWNrKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgIGxpYlJlZi5jdXJyZW50ID0gaW5zdGFuY2U7XG5cbiAgICBpZiAocHJldlVzZXJSZWYuY3VycmVudCkge1xuICAgICAgdXBkYXRlUmVmKHByZXZVc2VyUmVmLmN1cnJlbnQsIG51bGwpO1xuICAgIH1cblxuICAgIHByZXZVc2VyUmVmLmN1cnJlbnQgPSB1c2VyUmVmO1xuXG4gICAgaWYgKCF1c2VyUmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdXBkYXRlUmVmKHVzZXJSZWYsIGluc3RhbmNlKTtcbiAgfSwgW3VzZXJSZWZdKTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHVzZUNvbXBvc2VkUmVmO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-composed-ref/dist/use-composed-ref.cjs.js\n");

/***/ })

};
;