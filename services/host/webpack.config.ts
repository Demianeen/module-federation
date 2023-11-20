import path from "path";
import type {
  BuildEnv,
  BuildMode,
  BuildOptions,
  BuildPath,
} from "@packages/build-config";
import { buildWebpackConfig } from "@packages/build-config";
import webpack from "webpack";
import packageJson from "./package.json";

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
  const PORT = env?.port ?? 3000;
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

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3002";

  config.plugins.push(
    new webpack.container.ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          // requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          // requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          // requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
