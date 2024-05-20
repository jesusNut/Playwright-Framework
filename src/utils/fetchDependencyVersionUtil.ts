import { readFileSync } from "fs";

function fetchVersionOfDependency(dependencyName: string): string {
  try {
    // Load package.json file
    const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

    // Get Dependency/DevDependency version
    const version: string | null =
      packageJson.devDependencies?.[dependencyName] ||
      packageJson.dependencies?.[dependencyName] ||
      null;

    if (version === null) {
      throw new Error(`Dependency ${dependencyName} not found in package.json`);
    }

    return version;
  } catch (error) {
    throw new Error(
      `Error while reading version of a dependency ${dependencyName} : ${error}`,
    );
  }
}

export function getPlayWrightVersion() {
  return fetchVersionOfDependency("@playwright/test").substring(1);
}
