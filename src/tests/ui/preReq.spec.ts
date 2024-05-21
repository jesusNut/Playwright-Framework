import { test } from "@playwright/test";
//import { convertCsvFileToJsonFile } from "@utils/CsvtoJsonUtil";
//import { encrypt,decrypt } from "@utils/CryptojsUtil";
import { encryptEnvFile } from "@utils/EncryptEnvFile";
//import {decryptEnvFile} from "@utils/EncryptEnvFile";
//import { env } from "@config/env";
// import { generateTestData, exportToCsv, exportToJson } from "@utils/FakerDataUtil";

// test("sample test to know environment variables health", () => {
//   console.log(process.env.NODE_ENV);
//   console.log(process.env.USER);
//   console.log(process.env.PASSWORD);
//   console.log(decrypt(env.USERNAME));
//   console.log(decrypt(env.PASSWORD));
//   console.log(decrypt(env.BASE_URL));
//   console.log("************************");
//   //   console.log(env.BASE_URL);
//   //   console.log(env.USERNAME);
//   //   console.log(env.PASSWORD);

//   //   const plaintext = "Hello, Mars!";
//   //   console.log(`Salt is : ${process.env.SALT}`);
//   //   const encryptedText = encrypt(plaintext);
//   //   console.log(`Encrypted text is ${encryptedText}`);
//   //   const decryptedtext = decrypt(encryptedText);
//   //   console.log(`Decrypted text is ${decryptedtext}`);
// });

test("Run me to encrypt the env files", () => {
  encryptEnvFile();
});

// test("Run me to decrypt the env files", () => {
//   decryptEnvFile();
// });

// test("Convert csv to JSON", () => {
//   convertCsvFileToJsonFile("logindata.csv", "logindata.json");
// });

// test('Create JSON and CSV data from faker', async () => {

// //******** Generate test data ***********
// const testData = generateTestData(3);

// //******** Export data to JSON file *********
// exportToJson(testData, 'testData_en.json');

// //********* Export data to CSV file
// await exportToCsv(testData, 'testData_en.csv');

// })
