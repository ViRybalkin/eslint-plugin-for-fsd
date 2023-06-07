/**
 * @fileoverview asda
 * @author eslint-plugin-for-fsd-path
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layer-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/shared/Article",
      code:"import { NotificationList } from '@/shared/Typography/ui/Article.ts'",
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/entities/Article",
      code:"import { NotificationList } from '@/entities/Typography/ui/Article.ts'",
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/features/Article",
      code:"import { NotificationList } from '@/entities/Typography/ui/Article.ts'",
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/config/extension.js",
      code:"import { NotificationList } from 'webpack'",
      options: [
        {
          ignoreImportsPatterns: ['config/**/8'],
          alias: '@'
        }
      ]
    },
  ],

  invalid: [
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/features/Article",
      code:"import { NotificationList } from '@/features/Article/ui/Article.ts'",
      errors: [{message: 'Текущий слой может импортировать только нижележащий слой'}],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/pages/Article",
      code:"import { NotificationList } from '@/pages/Article/ui/Article.ts'",
      errors: [{message: 'Текущий слой может импортировать только нижележащий слой'}],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/app/Article",
      code:"import { NotificationList } from '@/app/Article/ui/Article.ts'",
      errors: [{message: 'Текущий слой может импортировать только нижележащий слой'}],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/widget/Article",
      code:"import { NotificationList } from 'widget/Article/ui/Article.ts'",
      errors: [{message: 'Текущий слой может импортировать только нижележащий слой'}],
    },
    {
      filename: "/Users/virybalkin/WebstormProjects/ProjectForLearning/src/shared/Article",
      code:"import { NotificationList } from 'features/entities/ui/Article.ts'",
      errors: [{message: 'Текущий слой может импортировать только нижележащий слой'}],
    },
  ],
});
