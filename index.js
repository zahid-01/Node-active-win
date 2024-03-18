const activeWin = require("active-win");
const fs = require("fs");

const filePath = "processes.json";

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
    const activeWindow = await activeWin(options);
    console.log(activeWindow);
    storeData({
      activeWindow: activeWindow.title,
      processName: activeWindow.owner.name,
      timeStart: Date.now().toLocaleString(),
      url: activeWin,
    });
    // console.log("Active Window:", activeWindow.title);
    // console.log("Process Name:", activeWindow.owner.name);
  } catch (error) {
    console.error("Error occurred:", error);
  }

  setTimeout(monitorActiveWindow, 2000);
}

monitorActiveWindow();
