const { exec } = require("child_process");

const getEdgeUrl = async () => {
  exec(
    "powershell \"Get-Process | Where-Object { $_.MainWindowTitle } | Where-Object { $_.ProcessName -eq 'msedge' } | Select-Object MainWindowTitle\"",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      const titles = stdout.split("\n").filter((title) => title.trim());
      console.log("Active tab URL:");
      titles.forEach((title) => {
        const match = title.match(/https?:\/\/[^ ]+/); // Regex to extract URL
        if (match) {
          console.log(match[0]);
        }
      });
    }
  );
};

module.exports = getEdgeUrl;
