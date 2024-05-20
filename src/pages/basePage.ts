import { Locator, Page, expect } from "@playwright/test";

export class BasePage {
  //put all command methods related to wait etc, which can be utilized in each Page Class.

  constructor(protected readonly page: Page) {}

  async waitForURLToBePresent(expectedURL: string) {
    await this.page.waitForURL(expectedURL);
  }

  async waitForElementToBeVisisble(element: Locator) {
    await element.waitFor({ state: "visible" });
  }

  async fetchTextContent(element: Locator) {
    return await element.textContent();
  }

  async fetchInnerTextContent(element: Locator) {
    return await element.innerText();
  }

  protected async verifyNewWindow(expectedNewWindowUrl: string, link: Locator) {
    const pagePromise = this.page.waitForEvent("popup");
    await link.click();
    const newWindow = await pagePromise;
    await newWindow.waitForLoadState();
    const newWindowUrlActual = newWindow.url();
    expect(newWindowUrlActual == expectedNewWindowUrl).toBeTruthy();
    await newWindow.close();
  }

  protected async returnNewWindow(link: Locator) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      link.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }
}
