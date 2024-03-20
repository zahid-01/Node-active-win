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

module.exports = storeData;
