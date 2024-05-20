import test from "@fixtures/pom_fixtures";

test(
  "Validate the title of landing page",
  { tag: ["@smoke", "@regression"] },
  async ({ landingPage }) => {
    await test.step(`Navigated to Application`, async () => {
      await landingPage.visit();
    });
    await test.step(`Validated that correct title is displayed on Landing page`, async () => {
      await landingPage.validateTitle("Conduit");
    });
  },
);

test(
  "Validate the Header Text of landing page",
  { tag: ["@smoke", "@regression"] },
  async ({ landingPage }) => {
    await test.step(`Navigated to Application`, async () => {
      await landingPage.visit();
    });
    await test.step(`Validated that correct header text is displayed on Landing page`, async () => {
      await landingPage.validateHeaderText("conduit");
    });
  },
);

test(
  "Validate the Sidebar text of landing page",
  { tag: ["@smoke", "@regression"] },
  async ({ landingPage }) => {
    await test.step(`Navigated to Application`, async () => {
      await landingPage.visit();
    });
    await test.step(`Validated that correct sidebar text is displayed on Landing page`, async () => {
      await landingPage.validateSideBarText("Popular Tags");
    });
  },
);

test(
  "Validate promotion page URL is opening ",
  { tag: ["@regression"] },
  async ({ landingPage }) => {
    await test.step(`Navigated to Application`, async () => {
      await landingPage.visit();
    });
    await test.step(`Verified promotion page URL opening in new Window`, async () => {
      await landingPage.verifyPromotionPageURL(
        "https://www.bondaracademy.com/?utm_source=conduitapp&utm_medium=subdomain&utm_campaign=subdomain_traffic",
      );
    });
  },
);
