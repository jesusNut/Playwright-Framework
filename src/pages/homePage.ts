import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@pages/basePage";

type articleData = {
  "article-name"?: string;
  "article-about": string;
  "article-content": string;
  "article-tag": string;
  errorMessage?: string;
};

export class HomePage extends BasePage {
  private readonly USER_LINK: Locator;
  private readonly SETTINGS_LINK: Locator;
  private readonly NEWPOST_LINK: Locator;
  private readonly HOME_LINK: Locator;
  private readonly YOURFEED_SECTION_HEADER: Locator;
  private readonly GLOBALFEED_SECTION_HEADER: Locator;
  private readonly ARTICLETITLE_INPUT: Locator;
  private readonly ARTICLEABOUT_INPUT: Locator;
  private readonly ARTICLEBODY_INPUT: Locator;
  private readonly ARTICLETAGS_INPUT: Locator;
  private readonly PUBLISHARTICLE_BUTTON: Locator;
  private readonly ARTICLEPUBLISHERROR_HOLDER: Locator;
  private readonly PUBISHEDARTICLEHEADER_HOLDER: Locator;
  private readonly DELETEPUBLISHEDARTICLE_BTN: Locator;

  constructor(protected readonly page: Page) {
    super(page);
    this.USER_LINK = page.locator("//div[@class='container']/ul/li/a[./img]");
    this.SETTINGS_LINK = page.locator('//a[@routerlink="/settings"]');
    this.NEWPOST_LINK = page.locator('//a[@routerlink="/editor"]');
    this.HOME_LINK = page.locator('//a[normalize-space()="Home"]');
    this.YOURFEED_SECTION_HEADER = page.locator(
      '//a[normalize-space()="Your Feed"]',
    );
    this.GLOBALFEED_SECTION_HEADER = page.locator(
      '//a[normalize-space()="Global Feed"]',
    );
    this.ARTICLETITLE_INPUT = page.locator(
      '//input[@placeholder="Article Title"]',
    );
    this.ARTICLEABOUT_INPUT = page.locator(
      "//input[@formcontrolname='description']",
    );
    this.ARTICLEBODY_INPUT = page.locator(
      '//textarea[@placeholder="Write your article (in markdown)"]',
    );
    this.ARTICLETAGS_INPUT = page.locator('//input[@placeholder="Enter tags"]');
    this.PUBLISHARTICLE_BUTTON = page.locator(
      '//button[normalize-space()="Publish Article"]',
    );
    this.ARTICLEPUBLISHERROR_HOLDER = page.locator(
      "body app-root app-editor-page li:nth-child(1)",
    );
    this.PUBISHEDARTICLEHEADER_HOLDER = page.locator(
      'div[class="container"] h1',
    );
    this.DELETEPUBLISHEDARTICLE_BTN = page.locator(
      'div[class="container"] button[class="btn btn-sm btn-outline-danger"]',
    );
  }

  async expectUserLinkToBeVisibleOnHomePage() {
    await expect(this.USER_LINK, "Login failed !!!").toBeVisible();
  }

  async expectUserLinkToContainUsername(username: string) {
    const elementText = await this.fetchTextContent(this.USER_LINK);
    expect(elementText!.trim()).toMatch(username);
  }

  async clickOnNewPostLink() {
    await this.NEWPOST_LINK.click();
    await this.page.waitForURL("https://conduit.bondaracademy.com/editor");
  }

  async createValidArticleandValidate(expectedArticleData: articleData) {
    if (expectedArticleData["article-name"]) {
      await this.ARTICLETITLE_INPUT.fill(expectedArticleData["article-name"]);
    }
    await this.ARTICLEABOUT_INPUT.fill(expectedArticleData["article-about"]);
    await this.ARTICLEBODY_INPUT.fill(expectedArticleData["article-content"]);
    await this.ARTICLETAGS_INPUT.fill(expectedArticleData["article-tag"]);
    await this.PUBLISHARTICLE_BUTTON.click();
    await expect(() => {
      expect(this.page.url()).toContain("article");
    }).toPass();
    await expect(this.PUBISHEDARTICLEHEADER_HOLDER).toHaveText(
      expectedArticleData["article-name"]!,
    );
    await this.DELETEPUBLISHEDARTICLE_BTN.click();
    await expect(() => {
      expect(this.page.url()).not.toContain("article");
    }).toPass();
  }

  async validateIncompleteArticles(expectedArticleData: articleData) {
    if (expectedArticleData["article-name"]) {
      await this.ARTICLETITLE_INPUT.fill(expectedArticleData["article-name"]);
    }
    await this.ARTICLEABOUT_INPUT.fill(expectedArticleData["article-about"]);
    await this.ARTICLEBODY_INPUT.fill(expectedArticleData["article-content"]);
    await this.ARTICLETAGS_INPUT.fill(expectedArticleData["article-tag"]);
    await this.PUBLISHARTICLE_BUTTON.click();
    await expect(this.ARTICLEPUBLISHERROR_HOLDER).toHaveText(
      expectedArticleData.errorMessage!,
    );
  }
}
