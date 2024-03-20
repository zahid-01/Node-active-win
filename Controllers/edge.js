const puppeteer = require("puppeteer-core");

const getUrl = async () => {
  try {
    // Connect to an existing Edge instance on port 9222
    const browser = await puppeteer.connect({
      browserURL: "http://localhost:9224", // URL of the Edge DevTools server
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
