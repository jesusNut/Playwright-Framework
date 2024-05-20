import * as fs from "fs";
import path from "path";

//! 👉 Make sure the project structure is => rootfolder(name of project)\src\testdata\<name of csvfile>.csv
//! 👉 The converted JSON file will be placed @ rootfolder(name of project)\src\testdata\<name of JSON file>.json
//! 👉 Create the CSV data carefully as it does not trim the spaces for values.

const CSVToJSON = (data: string, delimiter = ",") => {
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  const allData: string[] = data.slice(data.indexOf("\n") + 1).split("\n");
  return allData.map((v: any) => {
    const values = v.split(delimiter);
    return titles.reduce(
      (obj: any, title: string, index: number) => (
        (obj[title.trim()] = values[index]), obj
      ),
      {},
    );
  });
};

//   console.log(CSVToJSON('col1,col2\na,b\nc,d'));
// Example usage
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'config' folder
const testdataDir = path.resolve(srcDir, "testdata");
const csvFilePath = `${testdataDir}`;

//! 👉 provide argument with extension while using the below function :
export const convertCsvFileToJsonFile = (
  csvFileName: string,
  jsonFileName: string,
  delimiter = ",",
) => {
  try {
    // Read the CSV file
    const csvData = fs.readFileSync(`${csvFilePath}\\${csvFileName}`, "utf8");

    // Convert CSV to JSON
    const jsonData = CSVToJSON(csvData, delimiter);

    // Write JSON data to a new file
    fs.writeFileSync(
      `${testdataDir}\\${jsonFileName}`,
      JSON.stringify(jsonData, null, 2),
    );

    console.log(
      `Conversion completed. JSON data written to: ${testdataDir}\\${jsonFileName}`,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error converting CSV to JSON:", error.message);
    }
  }
};
