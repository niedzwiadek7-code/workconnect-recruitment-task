import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			globals: globals.browser,
		},
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			'jsx-a11y/no-autofocus': 'off',
			'jsx-a11y/no-static-element-interact': 'off',
			'jsx-a11y/no-static-element-interactions': 'off',
			'jsx-a11y/no-noninteractive-element-interactions': 'off',
			'jsx-a11y/click-events-have-key-events': 'off',
			'jsx-a11y/media-has-caption': 'off',

			'@typescript-eslint/no-unnecessary-type-constraint': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-explicit-any': 'off',

			'react/react-in-jsx-scope': 'off',
			'react/no-array-index-key': 'off',
			'react/display-name': 'off',

			'no-prototype-builtins': 'off',
			'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
			'no-fallthrough': ['error', { allowEmptyCase: true }],

			'simple-import-sort/imports': [
				'warn',
				{
					groups: [
						['^node:.*'],
						['^react', '^@?\\w'],
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						['^.+\\.module\\.scss$', '^.+\\.scss$'],
						['^.+\\.(webp|png)$'],
					],
				},
			],

			'padding-line-between-statements': [
				'warn',
				{ blankLine: 'always', prev: '*', next: 'function' },
				{ blankLine: 'always', prev: '*', next: 'class' },
				{ blankLine: 'always', prev: '*', next: 'export' },
				{ blankLine: 'always', prev: '*', next: 'block-like' },
				{ blankLine: 'always', prev: 'block-like', next: '*' },
			],

			'no-restricted-syntax': [
				'error',
				{
					selector: 'FunctionDeclaration',
					message:
						'The function keyword is forbidden. Use arrow functions instead.',
				},
				{
					selector: 'FunctionExpression',
					message:
						'The function keyword is forbidden. Use arrow functions instead.',
				},
				{
					selector: 'ImportDeclaration[source.value=/\\.(tsx?|jsx?)$/]',
					message: 'Import statements should not include file extensions.',
				},
			],

			curly: ['error', 'all'],
			'brace-style': ['error', '1tbs'],
		},
	},
	{
		files: ['src/components/ui/**/*.{ts,tsx}'],
		rules: {
			'no-restricted-syntax': 'error',
		},
	},
])
