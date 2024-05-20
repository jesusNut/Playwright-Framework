import { test as baseTest } from "@playwright/test";
import { LandingPage } from "@pages/landingPage";
import { SigninPage } from "@pages/signinPage";
import { HomePage } from "@pages/homePage";
import { SignUpPage } from "@pages/signupPage";
import { PromotionPage } from "@pages/promotionPage";

type pages = {
  landingPage: LandingPage;
  signinPage: SigninPage;
  homePage: HomePage;
  signUpPage: SignUpPage;
  promotionPage: PromotionPage;
};

const test = baseTest.extend<pages>({
  landingPage: async ({ page }, use) => {
    const landingPageObj = new LandingPage(page);
    await use(landingPageObj);
  },
  signinPage: async ({ page }, use) => {
    await use(new SigninPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },
  promotionPage: async ({ landingPage }, use) => {
    const returnedPage = await landingPage.returnPromotionPage();
    await use(new PromotionPage(returnedPage));
  },
});

export default test;
export const expect = test.expect;
