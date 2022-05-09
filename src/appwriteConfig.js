import { Appwrite } from "appwrite";

const appwrite = new Appwrite();

appwrite
  .setEndpoint("http://localhost:90/v1") // Your API Endpoint
  .setProject("62792e3fb4c39769fbe9"); // Your project ID

export const db = appwrite.database;
export const storage = appwrite.storage;
export const account = appwrite.account;
