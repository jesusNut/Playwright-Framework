import test from "@fixtures/pom_fixtures";

test("Verify Home Link is present on promotion page",{tag : ['@regression']}, async ({
  promotionPage,
}) => {
  await test.step(`Validated Home Link is present on the Promotion page`, async () => {
    await promotionPage.verifyHomeLinkVisible();
  });
});

test("Verify Blog link is present on promotion page",{tag : ['@regression']}, async ({
  promotionPage,
}) => {
  await test.step(`Validated Blog link is present on the Promotion page`, async () => {
    await promotionPage.verifyBlogLinkVisible();
  });
});

test("Verify Signup button is present on promotion page",{tag : ['@regression']}, async ({
  promotionPage,
}) => {
  await test.step(`Validated Signup button is present on the Promotion page`, async () => {
    await promotionPage.verifySignupButtonVisible();
  });
});
