const CDP = require("chrome-remote-interface");

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

module.exports = getUrl;
