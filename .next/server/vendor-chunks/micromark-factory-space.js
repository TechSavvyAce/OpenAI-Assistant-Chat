"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-factory-space";
exports.ids = ["vendor-chunks/micromark-factory-space"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-factory-space/dev/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/micromark-factory-space/dev/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   factorySpace: () => (/* binding */ factorySpace)\n/* harmony export */ });\n/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-character */ \"(ssr)/./node_modules/micromark-util-character/dev/index.js\");\n/**\n * @typedef {import('micromark-util-types').Effects} Effects\n * @typedef {import('micromark-util-types').State} State\n * @typedef {import('micromark-util-types').TokenType} TokenType\n */\n\n\n\n// To do: implement `spaceOrTab`, `spaceOrTabMinMax`, `spaceOrTabWithOptions`.\n\n/**\n * Parse spaces and tabs.\n *\n * There is no `nok` parameter:\n *\n * *   spaces in markdown are often optional, in which case this factory can be\n *     used and `ok` will be switched to whether spaces were found or not\n * *   one line ending or space can be detected with `markdownSpace(code)` right\n *     before using `factorySpace`\n *\n * ###### Examples\n *\n * Where `␉` represents a tab (plus how much it expands) and `␠` represents a\n * single space.\n *\n * ```markdown\n * ␉\n * ␠␠␠␠\n * ␉␠\n * ```\n *\n * @param {Effects} effects\n *   Context.\n * @param {State} ok\n *   State switched to when successful.\n * @param {TokenType} type\n *   Type (`' \\t'`).\n * @param {number | undefined} [max=Infinity]\n *   Max (exclusive).\n * @returns\n *   Start state.\n */\nfunction factorySpace(effects, ok, type, max) {\n  const limit = max ? max - 1 : Number.POSITIVE_INFINITY\n  let size = 0\n\n  return start\n\n  /** @type {State} */\n  function start(code) {\n    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownSpace)(code)) {\n      effects.enter(type)\n      return prefix(code)\n    }\n\n    return ok(code)\n  }\n\n  /** @type {State} */\n  function prefix(code) {\n    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_0__.markdownSpace)(code) && size++ < limit) {\n      effects.consume(code)\n      return prefix\n    }\n\n    effects.exit(type)\n    return ok(code)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLWZhY3Rvcnktc3BhY2UvZGV2L2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxhQUFhLHdDQUF3QztBQUNyRCxhQUFhLHNDQUFzQztBQUNuRCxhQUFhLDBDQUEwQztBQUN2RDs7QUFFc0Q7O0FBRXREOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBLFdBQVcsV0FBVztBQUN0QjtBQUNBLFdBQVcsb0JBQW9CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBOztBQUVBOztBQUVBLGFBQWEsT0FBTztBQUNwQjtBQUNBLFFBQVEsdUVBQWE7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsYUFBYSxPQUFPO0FBQ3BCO0FBQ0EsUUFBUSx1RUFBYTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb25kYXlBc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLWZhY3Rvcnktc3BhY2UvZGV2L2luZGV4LmpzPzY1NzkiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLkVmZmVjdHN9IEVmZmVjdHNcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21pY3JvbWFyay11dGlsLXR5cGVzJykuU3RhdGV9IFN0YXRlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtaWNyb21hcmstdXRpbC10eXBlcycpLlRva2VuVHlwZX0gVG9rZW5UeXBlXG4gKi9cblxuaW1wb3J0IHttYXJrZG93blNwYWNlfSBmcm9tICdtaWNyb21hcmstdXRpbC1jaGFyYWN0ZXInXG5cbi8vIFRvIGRvOiBpbXBsZW1lbnQgYHNwYWNlT3JUYWJgLCBgc3BhY2VPclRhYk1pbk1heGAsIGBzcGFjZU9yVGFiV2l0aE9wdGlvbnNgLlxuXG4vKipcbiAqIFBhcnNlIHNwYWNlcyBhbmQgdGFicy5cbiAqXG4gKiBUaGVyZSBpcyBubyBgbm9rYCBwYXJhbWV0ZXI6XG4gKlxuICogKiAgIHNwYWNlcyBpbiBtYXJrZG93biBhcmUgb2Z0ZW4gb3B0aW9uYWwsIGluIHdoaWNoIGNhc2UgdGhpcyBmYWN0b3J5IGNhbiBiZVxuICogICAgIHVzZWQgYW5kIGBva2Agd2lsbCBiZSBzd2l0Y2hlZCB0byB3aGV0aGVyIHNwYWNlcyB3ZXJlIGZvdW5kIG9yIG5vdFxuICogKiAgIG9uZSBsaW5lIGVuZGluZyBvciBzcGFjZSBjYW4gYmUgZGV0ZWN0ZWQgd2l0aCBgbWFya2Rvd25TcGFjZShjb2RlKWAgcmlnaHRcbiAqICAgICBiZWZvcmUgdXNpbmcgYGZhY3RvcnlTcGFjZWBcbiAqXG4gKiAjIyMjIyMgRXhhbXBsZXNcbiAqXG4gKiBXaGVyZSBg4pCJYCByZXByZXNlbnRzIGEgdGFiIChwbHVzIGhvdyBtdWNoIGl0IGV4cGFuZHMpIGFuZCBg4pCgYCByZXByZXNlbnRzIGFcbiAqIHNpbmdsZSBzcGFjZS5cbiAqXG4gKiBgYGBtYXJrZG93blxuICog4pCJXG4gKiDikKDikKDikKDikKBcbiAqIOKQieKQoFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtFZmZlY3RzfSBlZmZlY3RzXG4gKiAgIENvbnRleHQuXG4gKiBAcGFyYW0ge1N0YXRlfSBva1xuICogICBTdGF0ZSBzd2l0Y2hlZCB0byB3aGVuIHN1Y2Nlc3NmdWwuXG4gKiBAcGFyYW0ge1Rva2VuVHlwZX0gdHlwZVxuICogICBUeXBlIChgJyBcXHQnYCkuXG4gKiBAcGFyYW0ge251bWJlciB8IHVuZGVmaW5lZH0gW21heD1JbmZpbml0eV1cbiAqICAgTWF4IChleGNsdXNpdmUpLlxuICogQHJldHVybnNcbiAqICAgU3RhcnQgc3RhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmYWN0b3J5U3BhY2UoZWZmZWN0cywgb2ssIHR5cGUsIG1heCkge1xuICBjb25zdCBsaW1pdCA9IG1heCA/IG1heCAtIDEgOiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFlcbiAgbGV0IHNpemUgPSAwXG5cbiAgcmV0dXJuIHN0YXJ0XG5cbiAgLyoqIEB0eXBlIHtTdGF0ZX0gKi9cbiAgZnVuY3Rpb24gc3RhcnQoY29kZSkge1xuICAgIGlmIChtYXJrZG93blNwYWNlKGNvZGUpKSB7XG4gICAgICBlZmZlY3RzLmVudGVyKHR5cGUpXG4gICAgICByZXR1cm4gcHJlZml4KGNvZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIG9rKGNvZGUpXG4gIH1cblxuICAvKiogQHR5cGUge1N0YXRlfSAqL1xuICBmdW5jdGlvbiBwcmVmaXgoY29kZSkge1xuICAgIGlmIChtYXJrZG93blNwYWNlKGNvZGUpICYmIHNpemUrKyA8IGxpbWl0KSB7XG4gICAgICBlZmZlY3RzLmNvbnN1bWUoY29kZSlcbiAgICAgIHJldHVybiBwcmVmaXhcbiAgICB9XG5cbiAgICBlZmZlY3RzLmV4aXQodHlwZSlcbiAgICByZXR1cm4gb2soY29kZSlcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-factory-space/dev/index.js\n");

/***/ })

};
;