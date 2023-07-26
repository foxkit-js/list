import fs from "fs/promises";
import path from "path";
import * as esbuild from "esbuild";

/**
 * Base config for esbuild
 */
const config = {
  /**
   * Entrypoints for your package.
   * If you are doing multiple exports list all their files here like:
   * `["src/index.ts", "src/foobar.ts"]
   */
  entryPoints: ["src/index.ts"],
  /**
   * Directory in which your build is created.
   * Should match values in .prettierignore, esbuild.config.js and package.json
   */
  outdir: "dist",
  /**
   * This option will bundle all of your code into a single file
   * (or multiple if you specified more entrypoints).
   * Disable this if you use multiple exports which share utils a lot.
   */
  bundle: true,
  /**
   * Builds modules for use with Node.js
   */
  platform: "node",
  /**
   * This option with the "external" value excludes dependencies
   * from the bundling process.
   */
  packages: "external",
  /**
   * Enable this if you prefer optimizing for package size and don't
   * care about readable code in packages.
   */
  minify: false,
  /**
   * This target should match the one set in ESLint and TypeScript
   */
  target: "es2022"
};

async function build() {
  // Clean dist directory
  console.log("Cleaning");
  await fs.rm(config.outdir, { recursive: true, force: true });

  // Build esm bundles
  console.log("Building esm bundles");
  await esbuild.build({
    ...config,
    format: "esm"
  });

  // Build cjs bundles
  console.log("Building cjs bundles");
  await esbuild.build({
    ...config,
    format: "cjs",
    outExtension: { ".js": ".cjs" }
  });

  // Copy README file
  console.log("Copying README.md");
  await fs.cp("./README.md", path.join(config.outdir, "README.md"));

  // Copy Documentation
  console.log("Copying Documentation");
  const distDocs = path.join(config.outdir, "docs");
  await fs.mkdir(distDocs);
  const docsDir = await fs
    .readdir("docs")
    .then(files => files.filter(file => file.endsWith(".md")));
  await Promise.all(
    docsDir.map(file =>
      fs.cp(path.join("docs", file), path.join(distDocs, file))
    )
  );
}

build().then(() => {
  console.log("Completed build");
});
