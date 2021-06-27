import util from "util";
import fs from "fs";
import path from "path";
import dotenv from "dotenv"

dotenv.config()

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

// Defines the path for the database file `items.json`.
const entryDB = path.resolve(`${process.env.entryDbRoute}`);
const userDB = path.resolve(`${process.env.userDbRoute}`);

async function readEntries() {
  try {
    await fs.promises.readFile(entryDB)
  } catch (error) {
    await fs.promises.writeFile(entryDB, "[]")
  }
  const json = await readFile(entryDB);
  return JSON.parse(json);
}

async function writeEntries(items) {
  // The `null` and `2` here are so the JSON is formatted in a readable format, it's not required.
  const json = JSON.stringify(items, null, 2);

  // We return the promise here so the promise returned by `writeItems` doesn't resolve until
  // all the items are actually written.
  return writeFile(entryDB, json);
}

async function readUsers() {
  try {
    await fs.promises.readFile(userDB)
  } catch (error) {
    await fs.promises.writeFile(userDB, "[]")
  }
    const json = await readFile(userDB);
    return JSON.parse(json);
  }
  
  async function writeUsers(items) {
    // The `null` and `2` here are so the JSON is formatted in a readable format, it's not required.
    const json = JSON.stringify(items, null, 2);
  
    // We return the promise here so the promise returned by `writeItems` doesn't resolve until
    // all the items are actually written.
    return writeFile(userDB, json);
  }

export { readEntries, writeEntries, readUsers, writeUsers };
