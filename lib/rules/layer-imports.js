const {isPathRelative} = require('../helpers/helpers')
const micromatch = require('micromatch')
/**
 * @fileoverview asda
 * @author eslint-plugin-for-fsd-path
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const path = require("path");
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "asda",
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
          },
          ignoreImportsPatterns: {
            type: 'array'
          }
        },
      }
    ], // Add a schema if the rule has options
  },

  create(context) {
    const layers = {
      'app': ['pages', 'widget', 'features', "entities", 'shared'],
      'pages': ['widget', 'features', "entities", 'shared'],
      'widget': ['features', "entities", 'shared'],
      'features': ["entities", 'shared'],
      'entities': ['shared', 'entities'],
      'shared': ['shared'],
    }

    const availableLayers = {
      'entities': 'entities',
      'app': 'app',
      'features': 'features',
      'pages': 'pages',
      'widget': 'widget',
      'shared': 'shared',
    };

    const {alias = '',ignoreImportsPatterns = [] } = context.options[0] ?? {};

    const getCurrentFileLayer = () => {
      const currentFilePath = context.getFilename();

      const normalizedPath = path.toNamespacedPath(currentFilePath);
      const isWindowsOS = normalizedPath.includes('\\');
      const projectFrom = normalizedPath.split('src')[1];
      const splitBy = isWindowsOS ? '\\' : '/';
      const fromArray = projectFrom?.split(splitBy);

      return fromArray?.[1];
    }
    const getImportLayer = (value) => {
      const importTo = alias ? value.replace(`${alias}/`, '') : value;
      const segments = importTo?.split('/');

      return segments?.[0]
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        const currentFileLayer = getCurrentFileLayer();
        const currentImportLayer = getImportLayer(node.source.value);

        if(isPathRelative(importPath)) {
          return;
        }

        if(!availableLayers[currentImportLayer] || !availableLayers[currentFileLayer]) {
          return;
        }

        const isIgnorePath = ignoreImportsPatterns.some((pattern) => {
          return micromatch.isMatch(importPath, pattern)
        });

        if(isIgnorePath){
          return;
        }

        if(!layers[currentFileLayer].includes(currentImportLayer)) {
          context.report(node, 'Текущий слой может импортировать только нижележащий слой')
        }
      }
      // visitor functions for different types of nodes
    };
  },
};
