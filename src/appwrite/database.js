import { account, db, storage } from "../appwriteConfig";
import CryptoJS from "crypto-js";

export const database = {
  createMessage: async (data) => {
    const { message, file, password } = data;
    //Encrypt message and password
    const encryptedMessage = CryptoJS.AES.encrypt(
      message,
      "PEGAM'S_SECRET_KEY"
    ).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "PEGAM'S_SECRET_KEY"
    ).toString();

    if (file) {
      try {
        //Upload file
        const uploadedFile = await storage.createFile(
          "627c7b05896c2286d9dc",
          "unique()",
          file
        );

        //Upload the data
        return await db.createDocument("627c7abfcbcd55c13edb", "unique()", {
          message: encryptedMessage,

          password: encryptedPassword,
          file: uploadedFile.$id,
        });
      } catch (error) {
        return error;
      }
    } else {
      try {
        //Upload the data
        return await db.createDocument("627c7abfcbcd55c13edb", "unique()", {
          message: encryptedMessage,

          password: encryptedPassword,
          file: "",
        });
      } catch (error) {
        return error;
      }
    }
  },
  getMessage: async (docId, pwd) => {
    try {
      //Get message
      const data = await db.getDocument("627c7abfcbcd55c13edb", docId);

      //Decrypt password
      const encryptedPassword = CryptoJS.AES.decrypt(
        data.password,
        "PEGAM'S_SECRET_KEY"
      );
      const password = encryptedPassword.toString(CryptoJS.enc.Utf8);

      //Check the password
      if (pwd == password) {
        //Decrypt message
        const encryptedMessage = CryptoJS.AES.decrypt(
          data.message,
          "PEGAM'S_SECRET_KEY"
        );
        const message = encryptedMessage.toString(CryptoJS.enc.Utf8);

        //Get file
        if (data.file) {
          const link = await storage.getFileDownload(
            "627c7b05896c2286d9dc",
            data.file
          );
          return { message, link };
        } else {
          return { message };
        }
      } else {
        return { message: "Wrong password" };
      }
    } catch (error) {
      return error;
    }
  },
};
