import { Page, Locator } from "@playwright/test";

export default async function findValidElement(
  page: Page,
  locators: string[],
  locatorName: string,
): Promise<Locator | null> {
  let validElement: Locator | null = null;
  const TIMEOUT_MS = 5000;

  for (const locator of locators) {
    const element = page.locator(locator);
    await element.waitFor({ state: "attached", timeout: TIMEOUT_MS });
    validElement = element;
    break; // Exit loop if valid element found
  }

  if (!validElement) {
    throw Error(
      `*********** Self Healing Utility : All locators are invalid for ${locatorName} ***********`,
    );
  }
  return validElement;
}

// Usage example:
// async function exampleUsage(page: Page) {
//     const locators = ["#selector1", "#selector2", "#selector3"];
//     const validElement = await findValidElement(page, locators);
//     if (validElement) {
// Perform actions on validElement
//     }
// }
