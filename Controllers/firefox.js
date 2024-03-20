const puppeteer = require("puppeteer-core");

const getUrl = async () => {
  try {
    // Connect to an existing Firefox instance
    const browser = await puppeteer.connect({
      browserURL: "http://localhost:9223", // URL of the Firefox DevTools server
    });

    // Get the active page
    const pages = await browser.pages();
    const currentPage = pages.find((page) => page.url() !== "about:blank"); // Filter out about:blank pages

    // Get the URL of the active page
    const currentUrl = currentPage ? currentPage.url() : "";

    return currentUrl;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

module.exports = getUrl;
