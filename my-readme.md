# Issue
## WalletConnect
### Problem
```

EventEmitter' is not exported by __vite-browser-external, imported by node_modules/@walletconnect/jsonrpc-provider/dist/esm/provider.js

```

### Solution
Fix it using vite configs

or

Fix by manual importing Lit-Ceramic integration

### Real Solution

 https://github.com/vitejs/vite/issues/7257

 npm run dev doesn't work (in progress)

## Buffer not defined

something went wrong decrypting: ReferenceError: Buffer is not defined 

## Theory

Problem a solution with vite

https://github.com/vitejs/vite/issues/5970


## Solution
https://stackoverflow.com/questions/67804053/uncaught-referenceerror-buffer-is-not-defined-in-react

Forced buffer into window. Fucking hell 