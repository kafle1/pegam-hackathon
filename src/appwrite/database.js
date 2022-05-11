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
          "62793b484aa1cdf81b25",
          "unique()",
          file
        );

        //Upload the data
        return await db.createDocument("62792e4d59faf1d4fdb4", "unique()", {
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
        return await db.createDocument("62792e4d59faf1d4fdb4", "unique()", {
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
      const data = await db.getDocument("62792e4d59faf1d4fdb4", docId);

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
            "62793b484aa1cdf81b25",
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
