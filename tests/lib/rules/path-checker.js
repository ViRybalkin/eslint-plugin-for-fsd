/**
 * @fileoverview eslint plugin for fsd path
 * @author ViRybalkin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
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
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
      code: "import { NotificationList } from 'entities/NotificationList'",
    },
    {
      filename: 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
      code: "import { NotificationList } from '@/entities/NotificationList'",
      options: [
        {
          alias: '@'
        }
      ]
    }
  ],

  invalid: [
    {
      filename:'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
      code: "import { NotificationList } from 'entities/Article/ui/Article.ts'",
      errors: [{ message: "В рамках одного слайса все пути должны быть относительными"}],
    },
    {
      filename: 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
      code: "import { NotificationList } from '@/entities/Article/ui/Article.ts'",
      errors: [{ message: "В рамках одного слайса все пути должны быть относительными"}],
      options: [
          {
        alias: '@'
      }
      ],
    },
  ],
});
