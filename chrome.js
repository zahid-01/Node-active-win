const CDP = require("chrome-remote-interface");

// Connect to Chrome
CDP((client) => {
  // Extract domains
  const { Page, Runtime } = client;

  // Enable Page domain
  Promise.all([Page.enable(), Runtime.enable()])
    .then(() => {
      // Evaluate JavaScript on the active page to get the URL
      Runtime.evaluate({ expression: "window.location.href" })
        .then((result) => {
          console.log("Active Tab URL:", result.result.value);
          client.close();
        })
        .catch((err) => {
          console.error("Error:", err);
          client.close();
        });
    })
    .catch((err) => {
      console.error("Error:", err);
      client.close();
    });
}).on("error", (err) => {
  console.error("Cannot connect to Chrome:", err);
});
