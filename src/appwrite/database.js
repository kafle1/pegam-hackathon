import { account, db, storage } from "../appwriteConfig";

export const database = {
  createMessage: async (data) => {
    const { message, messageId, file, password } = data;
    //Encrypt message and password

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
          message,
          messageId,
          password,
          file: uploadedFile.$id,
        });
      } catch (error) {
        return error;
      }
    } else {
      try {
        //Upload the data
        return await db.createDocument("62792e4d59faf1d4fdb4", "unique()", {
          message,
          messageId,
          password,
          file: "",
        });
      } catch (error) {
        return error;
      }
    }
  },
};
