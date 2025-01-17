import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import liveServer from "live-server";

const isDev = process.env.NODE_ENV === "development";

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  entryPoints: ["src/main.scss", "src/main.js"],
  outdir: "src/public",
  bundle: true,
  minify: !isDev,
  sourcemap: isDev,
  metafile: true,
  loader: {
    ".png": "file",
    ".jpg": "file",
    ".svg": "file",
    ".gif": "file",
    ".woff": "file",
    ".woff2": "file",
  },
  plugins: [
    sassPlugin({
      sourceMap: isDev,
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source);
        return css;
      },
    }),
  ],
};

const liveServerParams = {
  port: 3000,
  host: "localhost",
  root: "src",
  open: true,
  file: "index.html",
  wait: 100,
  logLevel: 2,
};

async function runBuild() {
  try {
    const context = await esbuild.context(buildOptions);

    const result = await context.rebuild();
    console.log("⚡ Build complete! ⚡");

    if (result.metafile) {
      console.log("📦 Bundle size:", await esbuild.analyzeMetafile(result.metafile));
    }

    if (isDev) {
      await context.watch();
      console.log("👀 Watching for changes...");

      liveServer.start(liveServerParams);
      console.log("🌐 Live server started on http://localhost:3000");
    } else {
      await context.dispose();
    }
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

runBuild();
