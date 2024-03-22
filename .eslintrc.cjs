module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ["eslint:recommended"],
    overrides: [
        {
            files: ["**/*.{js,jsx,ts,tsx}"],
            plugins: ["react", "jsx-a11y"],
            extends: [
                "plugin:react/recommended",
                "plugin:react/jsx-runtime",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended",
            ],
            rules: {
                'react/prop-types': 'off',
            },
            settings: {
                react: {
                    version: "detect",
                },
                formComponents: ["Form"],
                linkComponents: [
                    {name: "Link", linkAttribute: "to"},
                    {name: "NavLink", linkAttribute: "to"},
                ],
                "import/resolver": {
                    typescript: {},
                },
            },
        },
        {
            files: [".eslintrc.cjs"],
            env: {
                node: true,
            },
        },
    ],

};
