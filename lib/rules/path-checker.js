/**
 * @fileoverview eslint plugin for fsd path
 * @author ViRybalkin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "eslint plugin for fsd path",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importTo = node.source.value;

        const fromFile = context.filename;

        context.report({
          node: node,
          message: "Unexpected identifier: {{ identifier }}",
          data: {
            identifier: node.name
          },
        });
      }
      // visitor functions for different types of nodes
    };
  },
};