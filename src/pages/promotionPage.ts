//This page will be opened in a new tab when a link "page.locator( "//app-home-page//div[@class='container']/p/a");" is clicked from Landing Page

import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@pages/basePage";

export class PromotionPage extends BasePage {
  private readonly home_lnk: Locator;
  private readonly blog_lnk: Locator;
  private readonly signup_button: Locator;

  constructor(protected readonly page: Page) {
    super(page);
    this.home_lnk = page.locator('//span[normalize-space()="Home"]');
    this.blog_lnk = page.locator('//span[normalize-space()="Blog"]');
    this.signup_button = page.locator('//button[@id="el_1703104941097_387"]');
  }

  async verifyHomeLinkVisible() {
    await expect(this.home_lnk).toBeVisible();
  }

  async verifyBlogLinkVisible() {
    await expect(this.blog_lnk).toBeVisible();
  }

  async verifySignupButtonVisible() {
    await expect(this.signup_button).toBeVisible();
  }
}
