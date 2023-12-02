"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/remark-gfm";
exports.ids = ["vendor-chunks/remark-gfm"];
exports.modules = {

/***/ "(ssr)/./node_modules/remark-gfm/index.js":
/*!******************************************!*\
  !*** ./node_modules/remark-gfm/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ remarkGfm)\n/* harmony export */ });\n/* harmony import */ var micromark_extension_gfm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-extension-gfm */ \"(ssr)/./node_modules/micromark-extension-gfm/index.js\");\n/* harmony import */ var mdast_util_gfm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mdast-util-gfm */ \"(ssr)/./node_modules/mdast-util-gfm/lib/index.js\");\n/**\n * @typedef {import('mdast').Root} Root\n * @typedef {import('micromark-extension-gfm').Options & import('mdast-util-gfm').Options} Options\n */\n\n\n\n\n/**\n * Plugin to support GFM (autolink literals, footnotes, strikethrough, tables, tasklists).\n *\n * @type {import('unified').Plugin<[Options?]|void[], Root>}\n */\nfunction remarkGfm(options = {}) {\n  const data = this.data()\n\n  add('micromarkExtensions', (0,micromark_extension_gfm__WEBPACK_IMPORTED_MODULE_0__.gfm)(options))\n  add('fromMarkdownExtensions', (0,mdast_util_gfm__WEBPACK_IMPORTED_MODULE_1__.gfmFromMarkdown)())\n  add('toMarkdownExtensions', (0,mdast_util_gfm__WEBPACK_IMPORTED_MODULE_1__.gfmToMarkdown)(options))\n\n  /**\n   * @param {string} field\n   * @param {unknown} value\n   */\n  function add(field, value) {\n    const list = /** @type {unknown[]} */ (\n      // Other extensions\n      /* c8 ignore next 2 */\n      data[field] ? data[field] : (data[field] = [])\n    )\n\n    list.push(value)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVtYXJrLWdmbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEsOEVBQThFO0FBQzNGOztBQUUyQztBQUNrQjs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ2UsK0JBQStCO0FBQzlDOztBQUVBLDZCQUE2Qiw0REFBRztBQUNoQyxnQ0FBZ0MsK0RBQWU7QUFDL0MsOEJBQThCLDZEQUFhOztBQUUzQztBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLDRCQUE0QixXQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21vbmRheUFzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9yZW1hcmstZ2ZtL2luZGV4LmpzPzkzZmUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay1leHRlbnNpb24tZ2ZtJykuT3B0aW9ucyAmIGltcG9ydCgnbWRhc3QtdXRpbC1nZm0nKS5PcHRpb25zfSBPcHRpb25zXG4gKi9cblxuaW1wb3J0IHtnZm19IGZyb20gJ21pY3JvbWFyay1leHRlbnNpb24tZ2ZtJ1xuaW1wb3J0IHtnZm1Gcm9tTWFya2Rvd24sIGdmbVRvTWFya2Rvd259IGZyb20gJ21kYXN0LXV0aWwtZ2ZtJ1xuXG4vKipcbiAqIFBsdWdpbiB0byBzdXBwb3J0IEdGTSAoYXV0b2xpbmsgbGl0ZXJhbHMsIGZvb3Rub3Rlcywgc3RyaWtldGhyb3VnaCwgdGFibGVzLCB0YXNrbGlzdHMpLlxuICpcbiAqIEB0eXBlIHtpbXBvcnQoJ3VuaWZpZWQnKS5QbHVnaW48W09wdGlvbnM/XXx2b2lkW10sIFJvb3Q+fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1hcmtHZm0ob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGEoKVxuXG4gIGFkZCgnbWljcm9tYXJrRXh0ZW5zaW9ucycsIGdmbShvcHRpb25zKSlcbiAgYWRkKCdmcm9tTWFya2Rvd25FeHRlbnNpb25zJywgZ2ZtRnJvbU1hcmtkb3duKCkpXG4gIGFkZCgndG9NYXJrZG93bkV4dGVuc2lvbnMnLCBnZm1Ub01hcmtkb3duKG9wdGlvbnMpKVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmllbGRcbiAgICogQHBhcmFtIHt1bmtub3dufSB2YWx1ZVxuICAgKi9cbiAgZnVuY3Rpb24gYWRkKGZpZWxkLCB2YWx1ZSkge1xuICAgIGNvbnN0IGxpc3QgPSAvKiogQHR5cGUge3Vua25vd25bXX0gKi8gKFxuICAgICAgLy8gT3RoZXIgZXh0ZW5zaW9uc1xuICAgICAgLyogYzggaWdub3JlIG5leHQgMiAqL1xuICAgICAgZGF0YVtmaWVsZF0gPyBkYXRhW2ZpZWxkXSA6IChkYXRhW2ZpZWxkXSA9IFtdKVxuICAgIClcblxuICAgIGxpc3QucHVzaCh2YWx1ZSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/remark-gfm/index.js\n");

/***/ })

};
;