const activeWin = require("active-win");
const fs = require("fs");
const CDP = require("chrome-remote-interface");

const filePath = "processes.json";

const getUrl = async () => {
  try {
    const client = await CDP();

    // Extract necessary domains
    const { Page, Runtime } = client;

    // Enable necessary domains
    await Promise.all([Page.enable(), Runtime.enable()]);

    // Evaluate script to get current URL
    const result = await Runtime.evaluate({
      expression: "window.location.href",
    });

    // console.log("Current URL:", result.result.value);
    await client.close();
    return result.result.value;
  } catch (err) {
    console.error("Error:", err);
  }
};

const storeData = async (activeWin) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      if (
        jsonData.length &&
        jsonData[jsonData.length - 1].processName === activeWin.processName
      )
        return;

      jsonData.push(activeWin);
      let d = JSON.stringify(jsonData);
      fs.writeFileSync(filePath, d);
    } catch (parseError) {
      console.error("Error parsing JSON data:", parseError);
    }
  });
};

async function monitorActiveWindow() {
  try {
    const activeWindow = await activeWin();
    const appData = {};

    const activeAppName = activeWindow.owner.name;
    if (
      activeAppName.includes("Google Chrome") &&
      activeWindow.platform === "windows"
    ) {
      const url = await getUrl();
      appData.url = url;
    }

    appData.activeWindow = activeWindow.title;
    appData.processName = activeWindow.owner.name;
    appData.timeStart = Date.now().toLocaleString();
    storeData(appData);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  setTimeout(monitorActiveWindow, 2000);
}

monitorActiveWindow();
