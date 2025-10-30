const { firefox } = require("@playwright/test");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");
const settings = require("./settings");

const { CHAT_IDS, REFRESH_TIMEOUT, MESSAGES } = settings;
const BOT = new TelegramBot(process.env.TG_TOKEN, {
  polling: true,
});

class StockChecker {
  constructor(config) {
    this.config = config;
    this.paused = false;
    this.pausedAt = false;
    this.bot = BOT;
    this.screenshotsDir = path.join(__dirname, "screenshots");
  }

  logMessage(message) {
    const line = `${new Date().toLocaleString()} ${
      this.config.CONTEXT
    } ${message} ... \n`;
    fs.appendFileSync("log.txt", line);
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async notifySubscribers(message, buffer) {
    const modified_message = `${this.config.CONTEXT} ${message}`;
    try {
      for (const chat_id of CHAT_IDS) {
        await this.bot.sendMessage(chat_id, modified_message);
        if (buffer) await this.bot.sendPhoto(chat_id, buffer);
      }
    } catch (error) {
      this.logMessage(`${MESSAGES.NOTIFICATION_ERROR}: ${error}`);
    }
  }

  async saveScreenshot(filename) {
    try {
      const screenshot = path.join(
        this.screenshotsDir,
        `${filename}-${new Date().toISOString().replace(/[:.]/g, "-")}.png`
      );
      await this.page.screenshot({
        path: screenshot,
        fullPage: true,
      });
    } catch (error) {
      this.logMessage(`${MESSAGES.SCREENSHOT_ERROR} ${error}`);
    }
  }

  async randomScreenshot(filename) {
    if (Math.random() < 0.01) {
      await this.saveScreenshot(filename);
    }
  }

  async launchBrowser() {
    try {
      this.browser = await firefox.launch({ headless: true });
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    } catch (error) {
      this.notifySubscribers(`${MESSAGES.ERROR} ${this.config.URL} ${error}`);
      this.logMessage(
        `${new Date().toLocaleString()} ${MESSAGES.ERROR}: ${error} \n`
      );
    }
  }

  async onLoopStop() {
    this.notifySubscribers(`${MESSAGES.STOPPED}`, buffer);
    this.logMessage(`${MESSAGES.STOPPED}: `);
  }

  async checkStock() {
    await this.launchBrowser();
    this.logMessage(MESSAGES.LAUNCHED);
    const { page } = this;
    let loop = true;

    while (loop) {
      try {
        await page.goto(this.config.URL, { timeout: 60000 });

        // await if page has any items
        try {
          this.randomScreenshot("DEBUG-WAITING-FOR-ITEMS");

          await page.waitForSelector(this.config.STOCK_INDICATOR, {
            timeout: REFRESH_TIMEOUT,
          });

          if (this.paused && new Date() - this.pausedAt < 300000) {
            this.logMessage(`Skipping...`);
            await this.delay(60000); // Wait for 60 seconds
          } else {
            // if it has any items stop loop and notify me
            const buffer = await page.screenshot({ fullPage: true });
            await this.notifySubscribers(
              `${MESSAGES.GPU_FOUND} ${this.config.URL}`,
              buffer
            );
            this.logMessage(`${MESSAGES.GPU_FOUND}`);
            this.saveScreenshot("SUCCESS");

            this.paused = true;
            this.pausedAt = new Date();
          }
        } catch (error) {
          this.logMessage(
            `${MESSAGES.NOT_FOUND}. Timeout: (${REFRESH_TIMEOUT} ms)`
          );
          this.randomScreenshot("DEBUG-ITEMS-NOT-FOUND");
        }
      } catch (error) {
        this.logMessage(`${MESSAGES.PAGELOAD_ERROR}: ${error}`);
      }
    }

    if (!loop) this.onLoopStop();
  }
}

const SalmonEnergyTest = new StockChecker(settings.STORES.SalmonEnergyTest);
const SalmonEnergyXXS = new StockChecker(settings.STORES.SalmonEnergyXXS);
const SalmonEnergyXS = new StockChecker(settings.STORES.SalmonEnergyXS);
const SalmonEnergyS = new StockChecker(settings.STORES.SalmonEnergyS);
const SalmonEnergyM = new StockChecker(settings.STORES.SalmonEnergyM);

SalmonEnergyTest.checkStock()
  .then(() => console.log("job completed"))
  .catch(console.error);
SalmonEnergyXXS.checkStock()
  .then(() => console.log("job completed"))
  .catch(console.error);
SalmonEnergyXS.checkStock()
  .then(() => console.log("job completed"))
  .catch(console.error);
SalmonEnergyS.checkStock()
  .then(() => console.log("job completed"))
  .catch(console.error);
SalmonEnergyM.checkStock()
  .then(() => console.log("job completed"))
  .catch(console.error);

/*
// Bot responds to restart command
BOT.on("message", (msg) => {
  const chatId = msg.chat.id;

  fs.appendFileSync("log.txt", `${msg.text} ${msg.chat.id} \n`);

  if (msg.text === "restart") {
    fs.appendFileSync("log.txt", `msg.text === "restart" \n`);

    // respond to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, "Koshka restarting...");

    // Execute a Unix shell command
    exec("pm2 restart kot", (error, stdout, stderr) => {
      if (error) {
        BOT.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        BOT.sendMessage(chatId, `Stderr: ${stderr}`);
        return;
      }
      BOT.sendMessage(chatId, `Stdout: ${stdout}`);
    });
  }
}); */

module.exports = StockChecker;
