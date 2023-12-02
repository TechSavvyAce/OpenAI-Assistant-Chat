"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mdast-util-find-and-replace";
exports.ids = ["vendor-chunks/mdast-util-find-and-replace"];
exports.modules = {

/***/ "(ssr)/./node_modules/mdast-util-find-and-replace/lib/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/mdast-util-find-and-replace/lib/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   findAndReplace: () => (/* binding */ findAndReplace)\n/* harmony export */ });\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-string-regexp */ \"(ssr)/./node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js\");\n/* harmony import */ var unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! unist-util-visit-parents */ \"(ssr)/./node_modules/unist-util-visit-parents/lib/index.js\");\n/* harmony import */ var unist_util_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unist-util-is */ \"(ssr)/./node_modules/unist-util-is/lib/index.js\");\n/**\n * @typedef {import('mdast').Parent} MdastParent\n * @typedef {import('mdast').Root} Root\n * @typedef {import('mdast').Content} Content\n * @typedef {import('mdast').PhrasingContent} PhrasingContent\n * @typedef {import('mdast').Text} Text\n * @typedef {import('unist-util-visit-parents').Test} Test\n * @typedef {import('unist-util-visit-parents').VisitorResult} VisitorResult\n */\n\n/**\n * @typedef {Content | Root} Node\n * @typedef {Extract<Node, MdastParent>} Parent\n * @typedef {Exclude<Parent, Root>} ContentParent\n *\n * @typedef RegExpMatchObject\n *   Info on the match.\n * @property {number} index\n *   The index of the search at which the result was found.\n * @property {string} input\n *   A copy of the search string in the text node.\n * @property {[Root, ...Array<ContentParent>, Text]} stack\n *   All ancestors of the text node, where the last node is the text itself.\n *\n * @callback ReplaceFunction\n *   Callback called when a search matches.\n * @param {...any} parameters\n *   The parameters are the result of corresponding search expression:\n *\n *   * `value` (`string`) — whole match\n *   * `...capture` (`Array<string>`) — matches from regex capture groups\n *   * `match` (`RegExpMatchObject`) — info on the match\n * @returns {Array<PhrasingContent> | PhrasingContent | string | false | undefined | null}\n *   Thing to replace with.\n *\n *   * when `null`, `undefined`, `''`, remove the match\n *   * …or when `false`, do not replace at all\n *   * …or when `string`, replace with a text node of that value\n *   * …or when `Node` or `Array<Node>`, replace with those nodes\n *\n * @typedef {string | RegExp} Find\n *   Pattern to find.\n *\n *   Strings are escaped and then turned into global expressions.\n *\n * @typedef {Array<FindAndReplaceTuple>} FindAndReplaceList\n *   Several find and replaces, in array form.\n * @typedef {Record<string, Replace>} FindAndReplaceSchema\n *   Several find and replaces, in object form.\n * @typedef {[Find, Replace]} FindAndReplaceTuple\n *   Find and replace in tuple form.\n * @typedef {string | ReplaceFunction} Replace\n *   Thing to replace with.\n * @typedef {[RegExp, ReplaceFunction]} Pair\n *   Normalized find and replace.\n * @typedef {Array<Pair>} Pairs\n *   All find and replaced.\n *\n * @typedef Options\n *   Configuration.\n * @property {Test | null | undefined} [ignore]\n *   Test for which nodes to ignore.\n */\n\n\n\n\n\nconst own = {}.hasOwnProperty\n\n/**\n * Find patterns in a tree and replace them.\n *\n * The algorithm searches the tree in *preorder* for complete values in `Text`\n * nodes.\n * Partial matches are not supported.\n *\n * @param tree\n *   Tree to change.\n * @param find\n *   Patterns to find.\n * @param replace\n *   Things to replace with (when `find` is `Find`) or configuration.\n * @param options\n *   Configuration (when `find` is not `Find`).\n * @returns\n *   Given, modified, tree.\n */\n// To do: next major: remove `find` & `replace` combo, remove schema.\nconst findAndReplace =\n  /**\n   * @type {(\n   *   (<Tree extends Node>(tree: Tree, find: Find, replace?: Replace | null | undefined, options?: Options | null | undefined) => Tree) &\n   *   (<Tree extends Node>(tree: Tree, schema: FindAndReplaceSchema | FindAndReplaceList, options?: Options | null | undefined) => Tree)\n   * )}\n   **/\n  (\n    /**\n     * @template {Node} Tree\n     * @param {Tree} tree\n     * @param {Find | FindAndReplaceSchema | FindAndReplaceList} find\n     * @param {Replace | Options | null | undefined} [replace]\n     * @param {Options | null | undefined} [options]\n     * @returns {Tree}\n     */\n    function (tree, find, replace, options) {\n      /** @type {Options | null | undefined} */\n      let settings\n      /** @type {FindAndReplaceSchema|FindAndReplaceList} */\n      let schema\n\n      if (typeof find === 'string' || find instanceof RegExp) {\n        // @ts-expect-error don’t expect options twice.\n        schema = [[find, replace]]\n        settings = options\n      } else {\n        schema = find\n        // @ts-expect-error don’t expect replace twice.\n        settings = replace\n      }\n\n      if (!settings) {\n        settings = {}\n      }\n\n      const ignored = (0,unist_util_is__WEBPACK_IMPORTED_MODULE_1__.convert)(settings.ignore || [])\n      const pairs = toPairs(schema)\n      let pairIndex = -1\n\n      while (++pairIndex < pairs.length) {\n        (0,unist_util_visit_parents__WEBPACK_IMPORTED_MODULE_2__.visitParents)(tree, 'text', visitor)\n      }\n\n      // To do next major: don’t return the given tree.\n      return tree\n\n      /** @type {import('unist-util-visit-parents/complex-types.js').BuildVisitor<Root, 'text'>} */\n      function visitor(node, parents) {\n        let index = -1\n        /** @type {Parent | undefined} */\n        let grandparent\n\n        while (++index < parents.length) {\n          const parent = parents[index]\n\n          if (\n            ignored(\n              parent,\n              // @ts-expect-error: TS doesn’t understand but it’s perfect.\n              grandparent ? grandparent.children.indexOf(parent) : undefined,\n              grandparent\n            )\n          ) {\n            return\n          }\n\n          grandparent = parent\n        }\n\n        if (grandparent) {\n          return handler(node, parents)\n        }\n      }\n\n      /**\n       * Handle a text node which is not in an ignored parent.\n       *\n       * @param {Text} node\n       *   Text node.\n       * @param {Array<Parent>} parents\n       *   Parents.\n       * @returns {VisitorResult}\n       *   Result.\n       */\n      function handler(node, parents) {\n        const parent = parents[parents.length - 1]\n        const find = pairs[pairIndex][0]\n        const replace = pairs[pairIndex][1]\n        let start = 0\n        // @ts-expect-error: TS is wrong, some of these children can be text.\n        const index = parent.children.indexOf(node)\n        let change = false\n        /** @type {Array<PhrasingContent>} */\n        let nodes = []\n\n        find.lastIndex = 0\n\n        let match = find.exec(node.value)\n\n        while (match) {\n          const position = match.index\n          /** @type {RegExpMatchObject} */\n          const matchObject = {\n            index: match.index,\n            input: match.input,\n            // @ts-expect-error: stack is fine.\n            stack: [...parents, node]\n          }\n          let value = replace(...match, matchObject)\n\n          if (typeof value === 'string') {\n            value = value.length > 0 ? {type: 'text', value} : undefined\n          }\n\n          // It wasn’t a match after all.\n          if (value !== false) {\n            if (start !== position) {\n              nodes.push({\n                type: 'text',\n                value: node.value.slice(start, position)\n              })\n            }\n\n            if (Array.isArray(value)) {\n              nodes.push(...value)\n            } else if (value) {\n              nodes.push(value)\n            }\n\n            start = position + match[0].length\n            change = true\n          }\n\n          if (!find.global) {\n            break\n          }\n\n          match = find.exec(node.value)\n        }\n\n        if (change) {\n          if (start < node.value.length) {\n            nodes.push({type: 'text', value: node.value.slice(start)})\n          }\n\n          parent.children.splice(index, 1, ...nodes)\n        } else {\n          nodes = [node]\n        }\n\n        return index + nodes.length\n      }\n    }\n  )\n\n/**\n * Turn a schema into pairs.\n *\n * @param {FindAndReplaceSchema | FindAndReplaceList} schema\n *   Schema.\n * @returns {Pairs}\n *   Clean pairs.\n */\nfunction toPairs(schema) {\n  /** @type {Pairs} */\n  const result = []\n\n  if (typeof schema !== 'object') {\n    throw new TypeError('Expected array or object as schema')\n  }\n\n  if (Array.isArray(schema)) {\n    let index = -1\n\n    while (++index < schema.length) {\n      result.push([\n        toExpression(schema[index][0]),\n        toFunction(schema[index][1])\n      ])\n    }\n  } else {\n    /** @type {string} */\n    let key\n\n    for (key in schema) {\n      if (own.call(schema, key)) {\n        result.push([toExpression(key), toFunction(schema[key])])\n      }\n    }\n  }\n\n  return result\n}\n\n/**\n * Turn a find into an expression.\n *\n * @param {Find} find\n *   Find.\n * @returns {RegExp}\n *   Expression.\n */\nfunction toExpression(find) {\n  return typeof find === 'string' ? new RegExp((0,escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(find), 'g') : find\n}\n\n/**\n * Turn a replace into a function.\n *\n * @param {Replace} replace\n *   Replace.\n * @returns {ReplaceFunction}\n *   Function.\n */\nfunction toFunction(replace) {\n  return typeof replace === 'function' ? replace : () => replace\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1maW5kLWFuZC1yZXBsYWNlL2xpYi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHlCQUF5QjtBQUN0QyxhQUFhLGlDQUFpQztBQUM5QyxhQUFhLHNCQUFzQjtBQUNuQyxhQUFhLHlDQUF5QztBQUN0RCxhQUFhLGtEQUFrRDtBQUMvRDs7QUFFQTtBQUNBLGFBQWEsZ0JBQWdCO0FBQzdCLGFBQWEsNEJBQTRCO0FBQ3pDLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBLGNBQWMsdUNBQXVDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsNEJBQTRCO0FBQ3pDO0FBQ0EsYUFBYSx5QkFBeUI7QUFDdEM7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBLGFBQWEsMEJBQTBCO0FBQ3ZDO0FBQ0EsYUFBYSwyQkFBMkI7QUFDeEM7QUFDQSxhQUFhLGFBQWE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHlCQUF5QjtBQUN2QztBQUNBOztBQUV5QztBQUNZO0FBQ2hCOztBQUVyQyxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTTtBQUN4QixlQUFlLE1BQU07QUFDckIsZUFBZSxrREFBa0Q7QUFDakUsZUFBZSxzQ0FBc0M7QUFDckQsZUFBZSw0QkFBNEI7QUFDM0MsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0EsaUJBQWlCLHlDQUF5QztBQUMxRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLHNEQUFPO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHNFQUFZO0FBQ3BCOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLGdGQUFnRjtBQUNqRztBQUNBO0FBQ0EsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE1BQU07QUFDdkI7QUFDQSxpQkFBaUIsZUFBZTtBQUNoQztBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0MscUJBQXFCO0FBQzdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsNkNBQTZDO0FBQ3JFOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVywyQ0FBMkM7QUFDdEQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxnRUFBTTtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21vbmRheUFzc2lzdGFudC8uL25vZGVfbW9kdWxlcy9tZGFzdC11dGlsLWZpbmQtYW5kLXJlcGxhY2UvbGliL2luZGV4LmpzP2M1MjMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlBhcmVudH0gTWRhc3RQYXJlbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ21kYXN0JykuUm9vdH0gUm9vdFxuICogQHR5cGVkZWYge2ltcG9ydCgnbWRhc3QnKS5Db250ZW50fSBDb250ZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlBocmFzaW5nQ29udGVudH0gUGhyYXNpbmdDb250ZW50XG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdtZGFzdCcpLlRleHR9IFRleHRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0LXV0aWwtdmlzaXQtcGFyZW50cycpLlRlc3R9IFRlc3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0LXV0aWwtdmlzaXQtcGFyZW50cycpLlZpc2l0b3JSZXN1bHR9IFZpc2l0b3JSZXN1bHRcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtDb250ZW50IHwgUm9vdH0gTm9kZVxuICogQHR5cGVkZWYge0V4dHJhY3Q8Tm9kZSwgTWRhc3RQYXJlbnQ+fSBQYXJlbnRcbiAqIEB0eXBlZGVmIHtFeGNsdWRlPFBhcmVudCwgUm9vdD59IENvbnRlbnRQYXJlbnRcbiAqXG4gKiBAdHlwZWRlZiBSZWdFeHBNYXRjaE9iamVjdFxuICogICBJbmZvIG9uIHRoZSBtYXRjaC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBpbmRleFxuICogICBUaGUgaW5kZXggb2YgdGhlIHNlYXJjaCBhdCB3aGljaCB0aGUgcmVzdWx0IHdhcyBmb3VuZC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpbnB1dFxuICogICBBIGNvcHkgb2YgdGhlIHNlYXJjaCBzdHJpbmcgaW4gdGhlIHRleHQgbm9kZS5cbiAqIEBwcm9wZXJ0eSB7W1Jvb3QsIC4uLkFycmF5PENvbnRlbnRQYXJlbnQ+LCBUZXh0XX0gc3RhY2tcbiAqICAgQWxsIGFuY2VzdG9ycyBvZiB0aGUgdGV4dCBub2RlLCB3aGVyZSB0aGUgbGFzdCBub2RlIGlzIHRoZSB0ZXh0IGl0c2VsZi5cbiAqXG4gKiBAY2FsbGJhY2sgUmVwbGFjZUZ1bmN0aW9uXG4gKiAgIENhbGxiYWNrIGNhbGxlZCB3aGVuIGEgc2VhcmNoIG1hdGNoZXMuXG4gKiBAcGFyYW0gey4uLmFueX0gcGFyYW1ldGVyc1xuICogICBUaGUgcGFyYW1ldGVycyBhcmUgdGhlIHJlc3VsdCBvZiBjb3JyZXNwb25kaW5nIHNlYXJjaCBleHByZXNzaW9uOlxuICpcbiAqICAgKiBgdmFsdWVgIChgc3RyaW5nYCkg4oCUIHdob2xlIG1hdGNoXG4gKiAgICogYC4uLmNhcHR1cmVgIChgQXJyYXk8c3RyaW5nPmApIOKAlCBtYXRjaGVzIGZyb20gcmVnZXggY2FwdHVyZSBncm91cHNcbiAqICAgKiBgbWF0Y2hgIChgUmVnRXhwTWF0Y2hPYmplY3RgKSDigJQgaW5mbyBvbiB0aGUgbWF0Y2hcbiAqIEByZXR1cm5zIHtBcnJheTxQaHJhc2luZ0NvbnRlbnQ+IHwgUGhyYXNpbmdDb250ZW50IHwgc3RyaW5nIHwgZmFsc2UgfCB1bmRlZmluZWQgfCBudWxsfVxuICogICBUaGluZyB0byByZXBsYWNlIHdpdGguXG4gKlxuICogICAqIHdoZW4gYG51bGxgLCBgdW5kZWZpbmVkYCwgYCcnYCwgcmVtb3ZlIHRoZSBtYXRjaFxuICogICAqIOKApm9yIHdoZW4gYGZhbHNlYCwgZG8gbm90IHJlcGxhY2UgYXQgYWxsXG4gKiAgICog4oCmb3Igd2hlbiBgc3RyaW5nYCwgcmVwbGFjZSB3aXRoIGEgdGV4dCBub2RlIG9mIHRoYXQgdmFsdWVcbiAqICAgKiDigKZvciB3aGVuIGBOb2RlYCBvciBgQXJyYXk8Tm9kZT5gLCByZXBsYWNlIHdpdGggdGhvc2Ugbm9kZXNcbiAqXG4gKiBAdHlwZWRlZiB7c3RyaW5nIHwgUmVnRXhwfSBGaW5kXG4gKiAgIFBhdHRlcm4gdG8gZmluZC5cbiAqXG4gKiAgIFN0cmluZ3MgYXJlIGVzY2FwZWQgYW5kIHRoZW4gdHVybmVkIGludG8gZ2xvYmFsIGV4cHJlc3Npb25zLlxuICpcbiAqIEB0eXBlZGVmIHtBcnJheTxGaW5kQW5kUmVwbGFjZVR1cGxlPn0gRmluZEFuZFJlcGxhY2VMaXN0XG4gKiAgIFNldmVyYWwgZmluZCBhbmQgcmVwbGFjZXMsIGluIGFycmF5IGZvcm0uXG4gKiBAdHlwZWRlZiB7UmVjb3JkPHN0cmluZywgUmVwbGFjZT59IEZpbmRBbmRSZXBsYWNlU2NoZW1hXG4gKiAgIFNldmVyYWwgZmluZCBhbmQgcmVwbGFjZXMsIGluIG9iamVjdCBmb3JtLlxuICogQHR5cGVkZWYge1tGaW5kLCBSZXBsYWNlXX0gRmluZEFuZFJlcGxhY2VUdXBsZVxuICogICBGaW5kIGFuZCByZXBsYWNlIGluIHR1cGxlIGZvcm0uXG4gKiBAdHlwZWRlZiB7c3RyaW5nIHwgUmVwbGFjZUZ1bmN0aW9ufSBSZXBsYWNlXG4gKiAgIFRoaW5nIHRvIHJlcGxhY2Ugd2l0aC5cbiAqIEB0eXBlZGVmIHtbUmVnRXhwLCBSZXBsYWNlRnVuY3Rpb25dfSBQYWlyXG4gKiAgIE5vcm1hbGl6ZWQgZmluZCBhbmQgcmVwbGFjZS5cbiAqIEB0eXBlZGVmIHtBcnJheTxQYWlyPn0gUGFpcnNcbiAqICAgQWxsIGZpbmQgYW5kIHJlcGxhY2VkLlxuICpcbiAqIEB0eXBlZGVmIE9wdGlvbnNcbiAqICAgQ29uZmlndXJhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7VGVzdCB8IG51bGwgfCB1bmRlZmluZWR9IFtpZ25vcmVdXG4gKiAgIFRlc3QgZm9yIHdoaWNoIG5vZGVzIHRvIGlnbm9yZS5cbiAqL1xuXG5pbXBvcnQgZXNjYXBlIGZyb20gJ2VzY2FwZS1zdHJpbmctcmVnZXhwJ1xuaW1wb3J0IHt2aXNpdFBhcmVudHN9IGZyb20gJ3VuaXN0LXV0aWwtdmlzaXQtcGFyZW50cydcbmltcG9ydCB7Y29udmVydH0gZnJvbSAndW5pc3QtdXRpbC1pcydcblxuY29uc3Qgb3duID0ge30uaGFzT3duUHJvcGVydHlcblxuLyoqXG4gKiBGaW5kIHBhdHRlcm5zIGluIGEgdHJlZSBhbmQgcmVwbGFjZSB0aGVtLlxuICpcbiAqIFRoZSBhbGdvcml0aG0gc2VhcmNoZXMgdGhlIHRyZWUgaW4gKnByZW9yZGVyKiBmb3IgY29tcGxldGUgdmFsdWVzIGluIGBUZXh0YFxuICogbm9kZXMuXG4gKiBQYXJ0aWFsIG1hdGNoZXMgYXJlIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogQHBhcmFtIHRyZWVcbiAqICAgVHJlZSB0byBjaGFuZ2UuXG4gKiBAcGFyYW0gZmluZFxuICogICBQYXR0ZXJucyB0byBmaW5kLlxuICogQHBhcmFtIHJlcGxhY2VcbiAqICAgVGhpbmdzIHRvIHJlcGxhY2Ugd2l0aCAod2hlbiBgZmluZGAgaXMgYEZpbmRgKSBvciBjb25maWd1cmF0aW9uLlxuICogQHBhcmFtIG9wdGlvbnNcbiAqICAgQ29uZmlndXJhdGlvbiAod2hlbiBgZmluZGAgaXMgbm90IGBGaW5kYCkuXG4gKiBAcmV0dXJuc1xuICogICBHaXZlbiwgbW9kaWZpZWQsIHRyZWUuXG4gKi9cbi8vIFRvIGRvOiBuZXh0IG1ham9yOiByZW1vdmUgYGZpbmRgICYgYHJlcGxhY2VgIGNvbWJvLCByZW1vdmUgc2NoZW1hLlxuZXhwb3J0IGNvbnN0IGZpbmRBbmRSZXBsYWNlID1cbiAgLyoqXG4gICAqIEB0eXBlIHsoXG4gICAqICAgKDxUcmVlIGV4dGVuZHMgTm9kZT4odHJlZTogVHJlZSwgZmluZDogRmluZCwgcmVwbGFjZT86IFJlcGxhY2UgfCBudWxsIHwgdW5kZWZpbmVkLCBvcHRpb25zPzogT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQpID0+IFRyZWUpICZcbiAgICogICAoPFRyZWUgZXh0ZW5kcyBOb2RlPih0cmVlOiBUcmVlLCBzY2hlbWE6IEZpbmRBbmRSZXBsYWNlU2NoZW1hIHwgRmluZEFuZFJlcGxhY2VMaXN0LCBvcHRpb25zPzogT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWQpID0+IFRyZWUpXG4gICAqICl9XG4gICAqKi9cbiAgKFxuICAgIC8qKlxuICAgICAqIEB0ZW1wbGF0ZSB7Tm9kZX0gVHJlZVxuICAgICAqIEBwYXJhbSB7VHJlZX0gdHJlZVxuICAgICAqIEBwYXJhbSB7RmluZCB8IEZpbmRBbmRSZXBsYWNlU2NoZW1hIHwgRmluZEFuZFJlcGxhY2VMaXN0fSBmaW5kXG4gICAgICogQHBhcmFtIHtSZXBsYWNlIHwgT3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWR9IFtyZXBsYWNlXVxuICAgICAqIEBwYXJhbSB7T3B0aW9ucyB8IG51bGwgfCB1bmRlZmluZWR9IFtvcHRpb25zXVxuICAgICAqIEByZXR1cm5zIHtUcmVlfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uICh0cmVlLCBmaW5kLCByZXBsYWNlLCBvcHRpb25zKSB7XG4gICAgICAvKiogQHR5cGUge09wdGlvbnMgfCBudWxsIHwgdW5kZWZpbmVkfSAqL1xuICAgICAgbGV0IHNldHRpbmdzXG4gICAgICAvKiogQHR5cGUge0ZpbmRBbmRSZXBsYWNlU2NoZW1hfEZpbmRBbmRSZXBsYWNlTGlzdH0gKi9cbiAgICAgIGxldCBzY2hlbWFcblxuICAgICAgaWYgKHR5cGVvZiBmaW5kID09PSAnc3RyaW5nJyB8fCBmaW5kIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgZG9u4oCZdCBleHBlY3Qgb3B0aW9ucyB0d2ljZS5cbiAgICAgICAgc2NoZW1hID0gW1tmaW5kLCByZXBsYWNlXV1cbiAgICAgICAgc2V0dGluZ3MgPSBvcHRpb25zXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY2hlbWEgPSBmaW5kXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgZG9u4oCZdCBleHBlY3QgcmVwbGFjZSB0d2ljZS5cbiAgICAgICAgc2V0dGluZ3MgPSByZXBsYWNlXG4gICAgICB9XG5cbiAgICAgIGlmICghc2V0dGluZ3MpIHtcbiAgICAgICAgc2V0dGluZ3MgPSB7fVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpZ25vcmVkID0gY29udmVydChzZXR0aW5ncy5pZ25vcmUgfHwgW10pXG4gICAgICBjb25zdCBwYWlycyA9IHRvUGFpcnMoc2NoZW1hKVxuICAgICAgbGV0IHBhaXJJbmRleCA9IC0xXG5cbiAgICAgIHdoaWxlICgrK3BhaXJJbmRleCA8IHBhaXJzLmxlbmd0aCkge1xuICAgICAgICB2aXNpdFBhcmVudHModHJlZSwgJ3RleHQnLCB2aXNpdG9yKVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBkbyBuZXh0IG1ham9yOiBkb27igJl0IHJldHVybiB0aGUgZ2l2ZW4gdHJlZS5cbiAgICAgIHJldHVybiB0cmVlXG5cbiAgICAgIC8qKiBAdHlwZSB7aW1wb3J0KCd1bmlzdC11dGlsLXZpc2l0LXBhcmVudHMvY29tcGxleC10eXBlcy5qcycpLkJ1aWxkVmlzaXRvcjxSb290LCAndGV4dCc+fSAqL1xuICAgICAgZnVuY3Rpb24gdmlzaXRvcihub2RlLCBwYXJlbnRzKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xXG4gICAgICAgIC8qKiBAdHlwZSB7UGFyZW50IHwgdW5kZWZpbmVkfSAqL1xuICAgICAgICBsZXQgZ3JhbmRwYXJlbnRcblxuICAgICAgICB3aGlsZSAoKytpbmRleCA8IHBhcmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgcGFyZW50ID0gcGFyZW50c1tpbmRleF1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGlnbm9yZWQoXG4gICAgICAgICAgICAgIHBhcmVudCxcbiAgICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogVFMgZG9lc27igJl0IHVuZGVyc3RhbmQgYnV0IGl04oCZcyBwZXJmZWN0LlxuICAgICAgICAgICAgICBncmFuZHBhcmVudCA/IGdyYW5kcGFyZW50LmNoaWxkcmVuLmluZGV4T2YocGFyZW50KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgZ3JhbmRwYXJlbnRcbiAgICAgICAgICAgIClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGdyYW5kcGFyZW50ID0gcGFyZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ3JhbmRwYXJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gaGFuZGxlcihub2RlLCBwYXJlbnRzKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogSGFuZGxlIGEgdGV4dCBub2RlIHdoaWNoIGlzIG5vdCBpbiBhbiBpZ25vcmVkIHBhcmVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge1RleHR9IG5vZGVcbiAgICAgICAqICAgVGV4dCBub2RlLlxuICAgICAgICogQHBhcmFtIHtBcnJheTxQYXJlbnQ+fSBwYXJlbnRzXG4gICAgICAgKiAgIFBhcmVudHMuXG4gICAgICAgKiBAcmV0dXJucyB7VmlzaXRvclJlc3VsdH1cbiAgICAgICAqICAgUmVzdWx0LlxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBoYW5kbGVyKG5vZGUsIHBhcmVudHMpIHtcbiAgICAgICAgY29uc3QgcGFyZW50ID0gcGFyZW50c1twYXJlbnRzLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnN0IGZpbmQgPSBwYWlyc1twYWlySW5kZXhdWzBdXG4gICAgICAgIGNvbnN0IHJlcGxhY2UgPSBwYWlyc1twYWlySW5kZXhdWzFdXG4gICAgICAgIGxldCBzdGFydCA9IDBcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogVFMgaXMgd3JvbmcsIHNvbWUgb2YgdGhlc2UgY2hpbGRyZW4gY2FuIGJlIHRleHQuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gcGFyZW50LmNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgICAgICAgbGV0IGNoYW5nZSA9IGZhbHNlXG4gICAgICAgIC8qKiBAdHlwZSB7QXJyYXk8UGhyYXNpbmdDb250ZW50Pn0gKi9cbiAgICAgICAgbGV0IG5vZGVzID0gW11cblxuICAgICAgICBmaW5kLmxhc3RJbmRleCA9IDBcblxuICAgICAgICBsZXQgbWF0Y2ggPSBmaW5kLmV4ZWMobm9kZS52YWx1ZSlcblxuICAgICAgICB3aGlsZSAobWF0Y2gpIHtcbiAgICAgICAgICBjb25zdCBwb3NpdGlvbiA9IG1hdGNoLmluZGV4XG4gICAgICAgICAgLyoqIEB0eXBlIHtSZWdFeHBNYXRjaE9iamVjdH0gKi9cbiAgICAgICAgICBjb25zdCBtYXRjaE9iamVjdCA9IHtcbiAgICAgICAgICAgIGluZGV4OiBtYXRjaC5pbmRleCxcbiAgICAgICAgICAgIGlucHV0OiBtYXRjaC5pbnB1dCxcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3I6IHN0YWNrIGlzIGZpbmUuXG4gICAgICAgICAgICBzdGFjazogWy4uLnBhcmVudHMsIG5vZGVdXG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCB2YWx1ZSA9IHJlcGxhY2UoLi4ubWF0Y2gsIG1hdGNoT2JqZWN0KVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUubGVuZ3RoID4gMCA/IHt0eXBlOiAndGV4dCcsIHZhbHVlfSA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEl0IHdhc27igJl0IGEgbWF0Y2ggYWZ0ZXIgYWxsLlxuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChzdGFydCAhPT0gcG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBub2RlLnZhbHVlLnNsaWNlKHN0YXJ0LCBwb3NpdGlvbilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgIG5vZGVzLnB1c2goLi4udmFsdWUpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIG5vZGVzLnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0YXJ0ID0gcG9zaXRpb24gKyBtYXRjaFswXS5sZW5ndGhcbiAgICAgICAgICAgIGNoYW5nZSA9IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIWZpbmQuZ2xvYmFsKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG1hdGNoID0gZmluZC5leGVjKG5vZGUudmFsdWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgICAgaWYgKHN0YXJ0IDwgbm9kZS52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2goe3R5cGU6ICd0ZXh0JywgdmFsdWU6IG5vZGUudmFsdWUuc2xpY2Uoc3RhcnQpfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxLCAuLi5ub2RlcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2RlcyA9IFtub2RlXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4ICsgbm9kZXMubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuICApXG5cbi8qKlxuICogVHVybiBhIHNjaGVtYSBpbnRvIHBhaXJzLlxuICpcbiAqIEBwYXJhbSB7RmluZEFuZFJlcGxhY2VTY2hlbWEgfCBGaW5kQW5kUmVwbGFjZUxpc3R9IHNjaGVtYVxuICogICBTY2hlbWEuXG4gKiBAcmV0dXJucyB7UGFpcnN9XG4gKiAgIENsZWFuIHBhaXJzLlxuICovXG5mdW5jdGlvbiB0b1BhaXJzKHNjaGVtYSkge1xuICAvKiogQHR5cGUge1BhaXJzfSAqL1xuICBjb25zdCByZXN1bHQgPSBbXVxuXG4gIGlmICh0eXBlb2Ygc2NoZW1hICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGFycmF5IG9yIG9iamVjdCBhcyBzY2hlbWEnKVxuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hKSkge1xuICAgIGxldCBpbmRleCA9IC0xXG5cbiAgICB3aGlsZSAoKytpbmRleCA8IHNjaGVtYS5sZW5ndGgpIHtcbiAgICAgIHJlc3VsdC5wdXNoKFtcbiAgICAgICAgdG9FeHByZXNzaW9uKHNjaGVtYVtpbmRleF1bMF0pLFxuICAgICAgICB0b0Z1bmN0aW9uKHNjaGVtYVtpbmRleF1bMV0pXG4gICAgICBdKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICBsZXQga2V5XG5cbiAgICBmb3IgKGtleSBpbiBzY2hlbWEpIHtcbiAgICAgIGlmIChvd24uY2FsbChzY2hlbWEsIGtleSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goW3RvRXhwcmVzc2lvbihrZXkpLCB0b0Z1bmN0aW9uKHNjaGVtYVtrZXldKV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIFR1cm4gYSBmaW5kIGludG8gYW4gZXhwcmVzc2lvbi5cbiAqXG4gKiBAcGFyYW0ge0ZpbmR9IGZpbmRcbiAqICAgRmluZC5cbiAqIEByZXR1cm5zIHtSZWdFeHB9XG4gKiAgIEV4cHJlc3Npb24uXG4gKi9cbmZ1bmN0aW9uIHRvRXhwcmVzc2lvbihmaW5kKSB7XG4gIHJldHVybiB0eXBlb2YgZmluZCA9PT0gJ3N0cmluZycgPyBuZXcgUmVnRXhwKGVzY2FwZShmaW5kKSwgJ2cnKSA6IGZpbmRcbn1cblxuLyoqXG4gKiBUdXJuIGEgcmVwbGFjZSBpbnRvIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtSZXBsYWNlfSByZXBsYWNlXG4gKiAgIFJlcGxhY2UuXG4gKiBAcmV0dXJucyB7UmVwbGFjZUZ1bmN0aW9ufVxuICogICBGdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gdG9GdW5jdGlvbihyZXBsYWNlKSB7XG4gIHJldHVybiB0eXBlb2YgcmVwbGFjZSA9PT0gJ2Z1bmN0aW9uJyA/IHJlcGxhY2UgOiAoKSA9PiByZXBsYWNlXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-find-and-replace/lib/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ escapeStringRegexp)\n/* harmony export */ });\nfunction escapeStringRegexp(string) {\n\tif (typeof string !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\t// Escape characters with special meaning either inside or outside character sets.\n\t// Use a simple backslash escape when it’s always valid, and a `\\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.\n\treturn string\n\t\t.replace(/[|\\\\{}()[\\]^$+*?.]/g, '\\\\$&')\n\t\t.replace(/-/g, '\\\\x2d');\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1maW5kLWFuZC1yZXBsYWNlL25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tb25kYXlBc3Npc3RhbnQvLi9ub2RlX21vZHVsZXMvbWRhc3QtdXRpbC1maW5kLWFuZC1yZXBsYWNlL25vZGVfbW9kdWxlcy9lc2NhcGUtc3RyaW5nLXJlZ2V4cC9pbmRleC5qcz80OTAzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZVN0cmluZ1JlZ2V4cChzdHJpbmcpIHtcblx0aWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBzdHJpbmcnKTtcblx0fVxuXG5cdC8vIEVzY2FwZSBjaGFyYWN0ZXJzIHdpdGggc3BlY2lhbCBtZWFuaW5nIGVpdGhlciBpbnNpZGUgb3Igb3V0c2lkZSBjaGFyYWN0ZXIgc2V0cy5cblx0Ly8gVXNlIGEgc2ltcGxlIGJhY2tzbGFzaCBlc2NhcGUgd2hlbiBpdOKAmXMgYWx3YXlzIHZhbGlkLCBhbmQgYSBgXFx4bm5gIGVzY2FwZSB3aGVuIHRoZSBzaW1wbGVyIGZvcm0gd291bGQgYmUgZGlzYWxsb3dlZCBieSBVbmljb2RlIHBhdHRlcm5z4oCZIHN0cmljdGVyIGdyYW1tYXIuXG5cdHJldHVybiBzdHJpbmdcblx0XHQucmVwbGFjZSgvW3xcXFxce30oKVtcXF1eJCsqPy5dL2csICdcXFxcJCYnKVxuXHRcdC5yZXBsYWNlKC8tL2csICdcXFxceDJkJyk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mdast-util-find-and-replace/node_modules/escape-string-regexp/index.js\n");

/***/ })

};
;