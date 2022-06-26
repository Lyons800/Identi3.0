import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webExtension from "@samrum/vite-plugin-web-extension";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import path from "path";
import { getManifest } from "./src/manifest";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {  
      define: {
    global: "globalThis",
  },
    plugins: [
      react(),
      webExtension({
        manifest: getManifest(),
      }),
    ],
    resolve: {
      alias: {
        stream: "stream-browserify",
        "~": path.resolve(__dirname, "./src"),
          // Alias paths for wallectconnect : Error 'EventEmitter' is not exported by __vite-browser-external,
        // https://github.com/vitejs/vite/issues/7257
        //
        "@walletconnect/jsonrpc-provider": "@walletconnect/jsonrpc-provider/dist/umd/index.min.js",
        "@walletconnect/jsonrpc-http-connection": "@walletconnect/jsonrpc-http-connection/dist/umd/index.min.js",
      }, 
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer")
    }
    },
    optimizeDeps: {
      esbuildOptions: {
          // Node.js global to browser globalThis
          define: {
              global: 'globalThis'
          },
          // Enable esbuild polyfill plugins
          plugins: [
              NodeGlobalsPolyfillPlugin({
                  buffer: true
              })
          ]
      }
  }
  };
});
