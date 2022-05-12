import { Appwrite } from "appwrite";

const appwrite = new Appwrite();

appwrite
  .setEndpoint("http://178.62.239.177/v1") // Your API Endpoint
  .setProject("627c7a76569e5e93393d"); // Your project ID

export const db = appwrite.database;
export const storage = appwrite.storage;
export const account = appwrite.account;
