module.exports = {
  CHAT_IDS: [776745197, 298688122],
  REFRESH_TIMEOUT: 240000,
  MESSAGES: {
    LAUNCHED: "Launched.",
    GPU_FOUND: "MEOW! GPU FOUND! Notifications from this store paused for 5 minutes.",
    NOT_FOUND: "Search result did not appear in time.",
    STOPPED: "ALERT! Stopped checking this store. Restart me manually",
    ERROR: "ALERT! Unexpected error occurred. Restart me manually",
    NOTIFICATION_ERROR: "Error notifying subscribers:",
    SCREENSHOT_ERROR: "Error saving screenshot: ",
    PAGELOAD_ERROR: "Error loading page: ",
  },
  STORES: {
    MemexBurnaby: {
      CONTEXT: "[MEMEX BURNABY]",
      URL: "https://www.memoryexpress.com/Category/VideoCards?FilterID=b6b90ad4-e07c-39ee-6b38-76eaffc7f8ef&InventoryType=InStock&Inventory=BBBC",
      STOCK_INDICATOR: ".c-cact-product-list__body .c-shca-icon-item",
    },
    MemexVancouver: {
      CONTEXT: "[MEMEX VANCOUVER]",
      URL: "https://www.memoryexpress.com/Category/VideoCards?FilterID=b6b90ad4-e07c-39ee-6b38-76eaffc7f8ef&InventoryType=InStock&Inventory=VBBC",
      STOCK_INDICATOR: ".c-cact-product-list__body .c-shca-icon-item",
    },
    CCBurnaby: {
      CONTEXT: "[CC BURNABY]",
      URL: "https://www.canadacomputers.com/en/915/desktop-graphics-cards?pickup=56&q=GPU-GeForce+RTX+5090-GeForce+RTX+5080",
      STOCK_INDICATOR: ".products.product-list .product",
    },
    CCVancouver: {
      CONTEXT: "[CC VANCOUVER]",
      URL: "https://www.canadacomputers.com/en/915/desktop-graphics-cards?pickup=51&q=GPU-GeForce+RTX+5090-GeForce+RTX+5080",
      STOCK_INDICATOR: ".products.product-list .product",
    },
    CCSurrey: {
      CONTEXT: "[CC SURREY]",
      URL: "https://www.canadacomputers.com/en/915/desktop-graphics-cards?pickup=72&q=GPU-GeForce+RTX+5090-GeForce+RTX+5080",
      STOCK_INDICATOR: ".products.product-list .product",
    },
    CCBurnabyAMD: {
      CONTEXT: "[CC BURNABY AMD]",
      URL: "https://www.canadacomputers.com/en/914/graphics-cards?id_manufacturer=1796&ship=1&pickup=56&q=GPU-Radeon+RX+9070+XT&minp=1&maxp=900",
      STOCK_INDICATOR: ".products.product-list .product",
    },
    CCVancouverAMD: {
      CONTEXT: "[CC VANCOUVER AMD]",
      URL: "https://www.canadacomputers.com/en/914/graphics-cards?id_manufacturer=1796&ship=1&pickup=51&q=GPU-Radeon+RX+9070+XT&minp=1&maxp=900",
      STOCK_INDICATOR: ".products.product-list .product",
    },
    CCRichmondAMD: {
      CONTEXT: "[CC RICHMOND AMD]",
      URL: "https://www.canadacomputers.com/en/914/graphics-cards?id_manufacturer=1796&ship=1&pickup=58&q=GPU-Radeon+RX+9070+XT&minp=1&maxp=900",
      STOCK_INDICATOR: ".products.product-list .product",
    },
  },
};
