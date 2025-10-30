module.exports = {
  CHAT_IDS: [776745197, 298688122],
  REFRESH_TIMEOUT: 300000,
  MESSAGES: {
    LAUNCHED: "Launched.",
    GPU_FOUND:
      "MEOW! GPU FOUND! Notifications from this store paused for 5 minutes.",
    NOT_FOUND: "Search result did not appear in time.",
    STOPPED: "ALERT! Stopped checking this store. Restart me manually",
    ERROR: "ALERT! Unexpected error occurred. Restart me manually",
    NOTIFICATION_ERROR: "Error notifying subscribers:",
    SCREENSHOT_ERROR: "Error saving screenshot: ",
    PAGELOAD_ERROR: "Error loading page: ",
  },
  STORES: {
    SalmonEnergyTest: {
      CONTEXT: "[Patagonia TEST]",
      DOMAIN: "www.patagonia.ca",
      URL: "https://www.patagonia.ca/product/mens-lightweight-synchilla-snap-t-fleece-pullover/198077124313.html",
      STOCK_INDICATOR: ':text-matches("Add to Bag", "i")',
    },
    SalmonEnergyXXS: {
      CONTEXT: "[Patagonia SALMON ENERGY XXS]",
      DOMAIN: "www.patagonia.ca",
      URL: "https://www.patagonia.ca/product/mens-lightweight-synchilla-snap-t-fleece-pullover/198077208624.html",
      STOCK_INDICATOR: ':text-matches("Add to Bag", "i")',
    },
    SalmonEnergyXS: {
      CONTEXT: "[Patagonia SALMON ENERGY XS]",
      DOMAIN: "www.patagonia.ca",
      URL: "https://www.patagonia.ca/product/mens-lightweight-synchilla-snap-t-fleece-pullover/198077208631.html",
      STOCK_INDICATOR: ':text-matches("Add to Bag", "i")',
    },
    SalmonEnergyS: {
      CONTEXT: "[Patagonia SALMON ENERGY S]",
      DOMAIN: "www.patagonia.ca",
      URL: "https://www.patagonia.ca/product/mens-lightweight-synchilla-snap-t-fleece-pullover/198077208648.html",
      STOCK_INDICATOR: ':text-matches("Add to Bag", "i")',
    },
    SalmonEnergyM: {
      CONTEXT: "[Patagonia SALMON ENERGY M]",
      DOMAIN: "www.patagonia.ca",
      URL: "https://www.patagonia.ca/product/mens-lightweight-synchilla-snap-t-fleece-pullover/198077208655.html",
      STOCK_INDICATOR: ':text-matches("Add to Bag", "i")',
    },
  },
};
