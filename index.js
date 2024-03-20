const activeWin = require("active-win");

const saveData = require("./Models/saveJson");

const chromeUrl = require("./Controllers/chrome");
const getEdgeUrl = require("./Controllers/edge");
const getFfUrl = require("./Controllers/firefox");

async function monitorActiveWindow() {
  try {
    const activeWindow = await activeWin();
    const appData = {};

    const activeAppName = activeWindow.owner.name;
    if (
      activeAppName.includes("Google Chrome") &&
      activeWindow.platform === "windows"
    ) {
      const url = await chromeUrl();
      appData.url = url;
    } else if (
      activeAppName.includes("Microsoft Edge") &&
      activeWindow.platform === "windows"
    ) {
      const url = await getEdgeUrl();
      appData.url = url;
    } else if (
      activeAppName.includes("Firefox") &&
      activeWindow.platform === "windows"
    ) {
      const url = await getFfUrl();
      appData.url = url;
    }

    appData.activeWindow = activeWindow.title;
    appData.processName = activeWindow.owner.name;
    appData.timeStart = Date.now().toLocaleString();
    saveData(appData);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  setTimeout(monitorActiveWindow, 2000);
}

monitorActiveWindow();
