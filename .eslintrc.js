module.exports = {
	"extends": [
		"react-app",
		"plugin:prettier/recommended"
	],
	"plugins": [
		"prettier"
	],
	"rules": {
		"indent": 0,
		"linebreak-style": [
			"error",
			"unix"
		],
		"semi": ["error", "always"],
        "quotes": ["error", "double"],
		"no-fallthrough": 0,
		"default-case": 0,
		"react/no-direct-mutation-state": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"jsx-a11y/alt-text": 0,
		"no-console": 2,
		"no-debugger": 2,
		"no-unused-vars": 2,
		"max-len": [1, { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true, tabWidth: 2 }],
		"comma-dangle": [2, "never"],
		"space-in-parens": [2, "never"],
		"comma-spacing": 2,
		"object-curly-spacing": [2, "never"],
		"eqeqeq": 0,
		"react/jsx-no-target-blank": 2
	}
};
