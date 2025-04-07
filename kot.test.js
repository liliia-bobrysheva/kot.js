const fs = require("fs");
const path = require("path");
const StockChecker = require("./kot");
const settings = require("./settings");

jest.mock("fs");
jest.mock("path");
jest.mock("node-telegram-bot-api", () => {
  return jest.fn().mockImplementation(() => ({
    sendMessage: jest.fn(),
    sendPhoto: jest.fn(),
  }));
});

describe("StockChecker", () => {
  const mockConfig = settings;

  let stockChecker;

  beforeEach(() => {
    stockChecker = new StockChecker(mockConfig);
    jest.clearAllMocks();
  });

  test("logMessage should append a message to log.txt", () => {
    const message = "Test message";
    stockChecker.logMessage(message);

    expect(fs.appendFileSync).toHaveBeenCalledWith(
      "log.txt",
      expect.stringContaining(message)
    );
  });

  test("notifySubscribers should send messages to all chat IDs", async () => {
    const mockMessage = "Test notification";
    const mockBuffer = Buffer.from("test");

    await stockChecker.notifySubscribers(mockMessage, mockBuffer);

    for (const chatId of settings.CHAT_IDS) {
      expect(stockChecker.bot.sendMessage).toHaveBeenCalledWith(
        chatId,
        expect.stringContaining(mockMessage)
      );
      expect(stockChecker.bot.sendPhoto).toHaveBeenCalledWith(
        chatId,
        mockBuffer
      );
    }
  });

  test("STORES should be an object", () => {
    expect(settings).toHaveProperty("STORES");
    expect(typeof settings.STORES).toBe("object");
    expect(settings.STORES).not.toBeNull();
  });

  test("CHAT_IDS must be an array of integers or an empty array", () => {
    expect(Array.isArray(settings.CHAT_IDS)).toBe(true);
    settings.CHAT_IDS.forEach((id) => {
      expect(Number.isInteger(id)).toBe(true);
    });
  });

  test("should have all required messages defined", () => {
    const requiredMessages = [
      "LAUNCHED",
      "GPU_FOUND",
      "NOT_FOUND",
      "STOPPED",
      "ERROR",
      "NOTIFICATION_ERROR",
      "SCREENSHOT_ERROR",
      "PAGELOAD_ERROR",
    ];

    requiredMessages.forEach((messageKey) => {
      expect(settings.MESSAGES).toHaveProperty(messageKey);
      expect(typeof settings.MESSAGES[messageKey]).toBe("string");
    });
  });

  test("should have valid REFRESH_TIMEOUT", () => {
    expect(settings).toHaveProperty("REFRESH_TIMEOUT");
    expect(typeof settings.REFRESH_TIMEOUT).toBe("number");
    expect(settings.REFRESH_TIMEOUT).toBeGreaterThan(0);
  });

  test("each store should have CONTEXT, URL, and STOCK_INDICATOR", () => {
    const stores = settings.STORES;

    Object.keys(stores).forEach((storeKey) => {
      const store = stores[storeKey];
      expect(store).toHaveProperty("CONTEXT");
      expect(typeof store.CONTEXT).toBe("string");
      expect(store).toHaveProperty("URL");
      expect(typeof store.URL).toBe("string");
      expect(store).toHaveProperty("STOCK_INDICATOR");
      expect(typeof store.STOCK_INDICATOR).toBe("string");
    });
  });
});
