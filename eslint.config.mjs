import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-useless-assignment": "error",
      "arrow-body-style": ["error", "as-needed"],
      camelcase: "error",
      eqeqeq: ["error", "smart"],
      "func-name-matching": "error",
      "func-style": ["error", "expression"],
      "no-else-return": ["error", { allowElseIf: false }],
      "no-magic-numbers": [
        "warn",
        {
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreClassFieldInitialValues: true,
          enforceConst: true,
        },
      ],
      "no-useless-constructor": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-spread": "error",
    },

    languageOptions: { globals: globals.browser },
  },
];
