module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        "react/prop-types": "off",
        "no-unused-vars": "warn",

        // "only-export-components": [
        //     "warn",
        //     {
        //         missingExports: true, // Warn when exports are not imported
        //     },
        //     {
        //         allowConstantExport: true,
        //         vars: "all",
        //         args: "after-used",
        //         ignoreRestSiblings: false,
        //         argsIgnorePattern: "^_",
        //         varsIgnorePattern: "^_",
        //     },
        // ],
    },
};
