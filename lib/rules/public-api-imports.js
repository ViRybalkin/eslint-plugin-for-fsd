const {isPathRelative} = require("../helpers/helpers");

/**
 * @fileoverview eslint plugin for fsd path
 * @author ViRybalkin
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
        const extendedLayers = {
            'entities': 'entities',
            'features': 'features',
            'pages': 'pages',
            'widget': 'widget',
        }
        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;
                const segments = importTo.split('/');

                const layer = segments[0];

                if(isPathRelative(importTo) || !extendedLayers[layer]) {
                    return;
                }

                if(segments.length > 2) {
                    context.report(node, 'Обсолютный импорт разрешен только из Public Api (index.ts)')
                }
            }
        };
    },
};
