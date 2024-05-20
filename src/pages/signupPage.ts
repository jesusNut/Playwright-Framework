import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@pages/basePage";

export class SignUpPage extends BasePage {
  private readonly signUp_headerText: Locator;
  private readonly username_txtbox: Locator;
  private readonly email_txtbox: Locator;
  private readonly password_txtbox: Locator;
  private readonly signUp_btn: Locator;

  constructor(protected readonly page: Page) {
    super(page);
    this.signUp_headerText = page.locator('//h1[normalize-space()="Sign up"]');
    this.username_txtbox = page.locator('//input[@placeholder="Username"]');
    this.email_txtbox = page.locator('//input[@placeholder="Email"]');
    this.password_txtbox = page.locator('//input[@placeholder="Password"]');
    this.signUp_btn = page.locator('//button[normalize-space()="Sign up"]');
  }

  async expectSignupHeaderToBeVisible() {
    await expect(this.signUp_headerText).toBeVisible();
  }

  async doSignUp(signUpdata: {
    username: string;
    email: string;
    password: string;
  }) {
    await this.username_txtbox.fill(signUpdata.username);
    await this.email_txtbox.fill(signUpdata.email);
    await this.password_txtbox.fill(signUpdata.password);
    await this.signUp_btn.click();
  }
}
