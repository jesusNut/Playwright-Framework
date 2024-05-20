import { defineConfig, devices } from "@playwright/test";
import { config } from "dotenv";
import { join } from "path";
import { getPlayWrightVersion } from "./src/utils/fetchDependencyVersionUtil";

//************************** HANDLE ENVIRONMENT FILES **********************/

const ENV = process.env.NODE_ENV;

const setEnvironment = () => {
  if (!ENV) {
    const path: string = join(__dirname, "src", "config", ".env");
    console.log(`******* RUNNING USING ENV FILE PLACED @ : ${path}`);
    config({ path });
  } else if (ENV === "qa" || ENV === "uat") {
    const path: string = join(
      __dirname,
      "src",
      "config",
      `.env.${process.env.NODE_ENV}`,
    );
    console.log(
      `******* RUNNING USING ENV FILE USING ENVIRONMENT ${process.env.NODE_ENV} PLACED @  : ${path}`,
    );
    config({ path });
  } else {
    throw new Error(
      "******* Please provide a valid environment -> 'qa' or 'uat' ONLY !!! *******",
    );
  }
};

setEnvironment();

//****************************************************************************/

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 40 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        environmentInfo: {
          NODE_VERSION: process.version,
          OS: process.platform,
          TEST_ENV: process.env.NODE_ENV ?? "Default .env file",
          PLAYWRIGHT_VERSION: getPlayWrightVersion(),
        },
      },
    ],
  ],
  use: {
    trace: "retain-on-first-failure",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1500, height: 730 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
      },
    },
  ],
});
