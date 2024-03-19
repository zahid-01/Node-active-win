const fs = require("fs");
const os = require("os");
const path = require("path");

const getFirefoxUrl = () => {
  // Get the path to the Firefox profile directory
  const firefoxProfileDir = path.join(
    os.homedir(),
    "AppData",
    "Roaming",
    "Mozilla",
    "Firefox",
    "Profiles"
  );

  // Find the active Firefox profile directory
  const profiles = fs.readdirSync(firefoxProfileDir);
  let activeProfileDir;
  profiles.forEach((profile) => {
    if (
      fs.existsSync(
        path.join(firefoxProfileDir, profile, "sessionstore.jsonlz4")
      )
    ) {
      activeProfileDir = profile;
    }
  });

  if (!activeProfileDir) {
    console.error("No active Firefox profile found.");
    return;
  }

  // Read the sessionstore.jsonlz4 file
  const sessionstoreFile = path.join(
    firefoxProfileDir,
    activeProfileDir,
    "sessionstore.jsonlz4"
  );
  const sessionData = fs.readFileSync(sessionstoreFile);

  // Parse the session data
  const sessionJSON = JSON.parse(require("lz4").decompress(sessionData));

  // Get the URL of the currently active tab
  const activeTab = sessionJSON.windows.find((window) => window.selected);
  if (activeTab) {
    const activeTabEntry = activeTab.tabs.find(
      (tab) =>
        tab.entries.length > 0 && !tab.entries[0].url.startsWith("about:")
    );
    if (activeTabEntry) {
      console.log(
        "URL of currently active tab:",
        activeTabEntry.entries[0].url
      );
    } else {
      console.error("No active tab found with a valid URL.");
    }
  } else {
    console.error("No active tab found.");
  }
};

module.exports = getFirefoxUrl;
