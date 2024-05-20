import test from "@fixtures/pom_fixtures";
import { faker } from "@faker-js/faker";

test(
  "Validate successful signUp",
  { tag: ["@regression"] },
  async ({ landingPage, signUpPage, homePage }) => {
    const signUpdata: {
      username: string;
      email: string;
      password: string;
    } = {
      username: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 9 }),
    };

    await test.step(`Navigated to Application`, async () => {
      await landingPage.visit();
    });
    await test.step(`Clicked on signup button on Landing page`, async () => {
      await landingPage.clickSignUpLink();
    });
    await test.step(`Validated Header on the Signup page`, async () => {
      await signUpPage.expectSignupHeaderToBeVisible();
    });
    await test.step(`Signed up in the application using Faker generated data`, async () => {
      await signUpPage.doSignUp(signUpdata);
    });
    await test.step(`Verified logged in user icon is displayed on Home page after successful signup`, async () => {
      await homePage.expectUserLinkToBeVisibleOnHomePage();
    });
    await test.step(`Verified user icon is displayed & contains username on Homepage`, async () => {
      await homePage.expectUserLinkToContainUsername(signUpdata.username);
    });
  },
);
