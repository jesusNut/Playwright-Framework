import { Locator, Page, expect } from "@playwright/test";
import { env } from "@config/env";
import { BasePage } from "@pages/basePage";
import findValidElement from "@src/utils/SelfHealingUtils";

export class SigninPage extends BasePage {
  private readonly email_input: Locator;
  private readonly password_input: Locator;
  private readonly signin_btn: string[];
  private readonly errorMessageHolder: Locator;

  constructor(protected readonly page: Page) {
    super(page);
    this.email_input = this.page.locator('//input[@placeholder="Email"]');
    this.password_input = this.page.locator('//input[@placeholder="Password"]');
    this.signin_btn = [
      '//button[normalize-space()="Sign in"]',
      "//button[@type='submit']",
    ];
    this.errorMessageHolder = this.page.locator("//app-list-errors/ul/li");
  }

  async signInToApplication() {
    await this.email_input.fill(env.USERNAME);
    await this.password_input.fill(env.PASSWORD);
    const signInButtonLocator = await findValidElement(
      this.page,
      this.signin_btn,
      "sign-in button on Signin Page",
    );
    await signInButtonLocator?.click();
  }

  async signInToApplicationWithData(email: string, password: string) {
    await this.email_input.fill(email);
    await this.password_input.fill(password);
    const signInButtonLocator = await findValidElement(
      this.page,
      this.signin_btn,
      "sign-in button on Signin Page",
    );
    await signInButtonLocator?.click();
  }

  async verifyErrorMessage(errorMessage: string) {
    await expect(this.errorMessageHolder).toHaveText(errorMessage);
  }
}
