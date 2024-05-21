import { Locator, Page, expect } from "@playwright/test";
import { env } from "@config/env";
import { BasePage } from "@pages/basePage";

export class LandingPage extends BasePage {
  private readonly signin_lnk: Locator;
  private readonly header_txt: Locator;
  private readonly sidebar_text: Locator;
  private readonly signup_lnk: Locator;
  private readonly promotionPageLink: Locator;

  constructor(protected readonly page: Page) {
    super(page);
    this.signin_lnk = page.locator('//a[normalize-space()="Sign in"]');
    this.header_txt = page.locator('//h1[normalize-space()="conduit"]');
    this.sidebar_text = page.getByText("Popular Tags");
    this.signup_lnk = page.locator('//a[normalize-space()="Sign up"]');
    this.promotionPageLink = page.locator(
      "//app-home-page//div[@class='container']/p/a",
    );
  }

  async visit() {
    await this.page.goto(env.BASE_URL);
  }

  async clickSignInLink() {
    await this.signin_lnk.click();
  }

  async clickSignUpLink() {
    await this.signup_lnk.click();
  }

  async validateTitle(expectedTitle: string) {
    await expect(async () => {
      expect(await this.page.title()).toBe(expectedTitle);
    }).toPass();
  }

  async validateHeaderText(expectedText: string) {
    await expect(this.header_txt).toContainText(expectedText);
  }

  async validateSideBarText(expectedText: string) {
    await expect(this.sidebar_text).toContainText(expectedText);
  }

  async verifyPromotionPageURL(expectedNewWindowUrl: string) {
    await this.verifyNewWindow(expectedNewWindowUrl, this.promotionPageLink);
  }

  async returnPromotionPage() {
    await this.visit();
    return await this.returnNewWindow(this.promotionPageLink);
  }
}
