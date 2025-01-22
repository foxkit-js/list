import foxkit from "eslint-config-foxkit/flat.js";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist/**"] },
  foxkit.base,
  foxkit.typescript,
  foxkit.configureTS({ tsconfigRootDir: import.meta.dirname }),
  prettier
];
