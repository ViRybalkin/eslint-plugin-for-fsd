const path = require('path')
const { isPathRelative } = require('../helpers/helpers')
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
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: "string"
          }
      },
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';
    return {
      ImportDeclaration(node) {
        const value = node.source.value;
        const importTo = alias ? value.replace(`${alias}/`, '') : value;

        const fromFile = context.getFilename();

        if(shouldBeRelative(fromFile, importTo))
        context.report(node, 'В рамках одного слайса все пути должны быть относительными')
      }
      // visitor functions for different types of nodes
    };
  },
};

const layers = {
  'entities': 'entities',
  'features': 'features',
  'pages': 'pages',
  'widget': 'widget',
  'shared': 'shared',
}

const shouldBeRelative = (from, to) => {
  if(isPathRelative(to)) {
    return false;
  }

  const toArray = to.split('/');
  const toLayer = toArray[0];
  const toSlice = toArray[1];

  if(!toLayer || !toSlice || !layers[toLayer]) {
    return false
  }

  const normalizedPath = path.toNamespacedPath(from);
  const isWindowsOS = normalizedPath.includes('\\');
  const projectFrom = normalizedPath.split('src')[1];
  const splitBy = isWindowsOS ? '\\' : '/';
  const fromArray = projectFrom.split(splitBy);

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if(!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false
  }

  return fromSlice === toSlice && toLayer === fromLayer;
}