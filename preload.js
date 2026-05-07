const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("nscApp", {
  appName: "NSC Employee Records Management System",
  version: "0.1.0",
});
