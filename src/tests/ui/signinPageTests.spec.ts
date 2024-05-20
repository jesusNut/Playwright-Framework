import test from "@fixtures/pom_fixtures";
import loginData from "@testdata/logindata.json";

test(
  "Validate user able to sign in successfully with valid credentials & self heal",
  { tag: ["@regression"] },
  async ({ landingPage, signinPage, homePage }) => {
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
  },
);

loginData.forEach(data => {
  test(
    `Validate error messages while login with ${data.scenario}`,
    { tag: ["@regression"] },
    async ({ landingPage, signinPage }) => {
      await test.step(`Navigated to Application`, async () => {
        await landingPage.visit();
      });
      await test.step(`Clicked on signin button on Landing page`, async () => {
        await landingPage.clickSignInLink();
      });
      await test.step(`Waited for signin page to successfuly load`, async () => {
        await landingPage.waitForURLToBePresent(
          "https://conduit.bondaracademy.com/login",
        );
      });
      await test.step(`Attempting signin using incorrect data set`, async () => {
        await signinPage.signInToApplicationWithData(data.email, data.password);
      });
      await test.step(`Verified expected error messages are displayed on Signin page`, async () => {
        await signinPage.verifyErrorMessage(data.expectedMessage);
      });
    },
  );
});
