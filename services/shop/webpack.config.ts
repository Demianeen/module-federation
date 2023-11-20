import path from "path";
import type {
  BuildEnv,
  BuildMode,
  BuildOptions,
  BuildPath,
} from "@packages/build-config";
import { buildWebpackConfig } from "@packages/build-config";
import packageJson from "./package.json";
import webpack from "webpack";

const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
  if (apiUrl) {
    return apiUrl;
  }

  if (mode === "production") {
    return "/api";
  }

  return "http://localhost:8000";
};

export default (env?: BuildEnv) => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    locales: path.resolve(__dirname, "public", "locales"),
    buildLocales: path.resolve(__dirname, "build", "locales"),
  };

  const mode: BuildOptions["mode"] = env?.mode ?? "development";
  const PORT = env?.port ?? 3001;
  const apiURL = getApiUrl(mode, env?.apiUrl);
  const isAnalyze = env?.analyze ?? false;

  const isDev = mode === "development";

  const config = buildWebpackConfig({
    mode,
    paths,
    isDev,
    isAnalyze,
    port: PORT,
    apiURL,
    project: "frontend",
  });

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "shop",
      filename: "remoteEntry.js",
      exposes: {
        "./router": "./src/app/providers/router/config/router.tsx",
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
