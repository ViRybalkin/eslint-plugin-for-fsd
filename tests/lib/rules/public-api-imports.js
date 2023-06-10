/**
 * @fileoverview eslint plugin for fsd path
 * @author ViRybalkin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
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
ruleTester.run("public-api-imports", rule, {
    valid: [
        {
            filename: 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
            code: "import { NotificationList } from 'entities/NotificationList'",
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
            code: "import { NotificationList } from '../NotificationList/NotificationList/NotificationList'",
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
            code: "import { NotificationList } from '@react-testing-library/NotificationList/NotificationList'",
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
            code: "import { NotificationList } from '@/entities/Article/ui/Article.ts'",
            errors: [{ message: "Обсолютный импорт разрешен только из Public Api (index.ts)"}],
            output: "import { NotificationList } from '@/entities/Article'",
            options: [
                {
                    alias: '@'
                }
            ],
        },
        {
            filename: 'C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article',
            code: "import { NotificationList } from '@/entities/Article/ui/Article.ts'",
            errors: [{ message: "Обсолютный импорт разрешен только из Public Api (index.ts)"}],
            output: "import { NotificationList } from '@/entities/Article'",
            options: [
                {
                    alias: '@'
                }
            ],
        },
    ],
});
