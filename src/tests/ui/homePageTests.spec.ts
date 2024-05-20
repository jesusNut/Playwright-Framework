import test from "@fixtures/pom_fixtures";
import articleData from "@testdata/articleData.json";

test("Validate user not able to submit article without title",{tag : ['@regression']}, async ({
  landingPage,
  signinPage,
  homePage,
}) => {
  await test.step(`Navigated to Application`, async () => {
    await landingPage.visit();
  });
  await test.step(`Clicked on signin button on Landing page`, async () => {
    await landingPage.clickSignInLink();
  });
  await test.step(`Waited for signin page to successfully load`, async () => {
    await landingPage.waitForURLToBePresent(
      "https://conduit.bondaracademy.com/login",
    );
  });
  await test.step(`Signed in to application`, async () => {
    await signinPage.signInToApplication();
  });
  await test.step(`Verified if logged in user icon is present on Home page after successful login`, async () => {
    await homePage.expectUserLinkToBeVisibleOnHomePage();
  });
  await test.step(`Clicked on New Article link on Home page`, async () => {
    await homePage.clickOnNewPostLink();
  });
  await test.step(`Validated that incomplete articles are not getting submitted `, async () => {
    await homePage.validateIncompleteArticles(articleData[0]);
  });
});

test("Validate user able to submit article with title",{tag : ['@regression']}, async ({
  landingPage,
  signinPage,
  homePage,
}) => {
  await test.step(`Navigated to Application`, async () => {
    await landingPage.visit();
  });
  await test.step(`Clicked on signin button on Landing page`, async () => {
    await landingPage.clickSignInLink();
  });
  await test.step(`Waited for signin page to successfully load`, async () => {
    await landingPage.waitForURLToBePresent(
      "https://conduit.bondaracademy.com/login",
    );
  });
  await test.step(`Signed in to application`, async () => {
    await signinPage.signInToApplication();
  });
  await test.step(`Verified if logged in user icon is present on Home page after successful login`, async () => {
    await homePage.expectUserLinkToBeVisibleOnHomePage();
  });
  await test.step(`Clicked on New Article link on Home page`, async () => {
    await homePage.clickOnNewPostLink();
  });
  await test.step(`Validated that complete articles are getting submitted successfully `, async () => {
    await homePage.createValidArticleandValidate(articleData[1]);
  });
});
