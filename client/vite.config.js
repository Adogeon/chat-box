import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        rewrite: (path) => path.replace(/\/api/, ""),
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("error", function (err, req, res) {
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });

            res.end(
              "Something went wrong. And we are reporting a custom error message." +
                err
            );
          });
        },
      },
      "/socket.io": {
        target: "ws://localhost:8000",
        ws: true,
      },
    },
  },
  css: {
    modules: {
      localsConvention: "dashes",
    },
  },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      {
        find: "@services",
        replacement: path.resolve(__dirname, "src/services"),
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
      },
    ],
  },
});
