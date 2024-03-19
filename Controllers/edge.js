const { exec } = require("child_process");

const getEdgeUrl = async () => {
  exec(
    "powershell \"Get-Process | Where-Object { $_.Name -eq 'msedge' } | ForEach-Object { $_.MainWindowTitle }\"",
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
      console.log("Open tabs:");
      titles.forEach((title) => {
        console.log(title);
      });
    }
  );
};

module.exports = getEdgeUrl;
