import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container, IconButton, Box } from "@mui/material";
import { AttachFileRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { database } from "../appwrite/database";

const CreateMessage = () => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();

  const [messageErrorText, setMessageErrorText] = useState("");
  const [pwdErrorText, setpwdErrorText] = useState("");

  const history = useNavigate();
  const createPegam = async (e) => {
    if (message.length <= 5) {
      setMessageErrorText("Message should be greater than 5 characters long");
      setpwdErrorText("");
    } else if (password.length <= 3) {
      setpwdErrorText("Password should be greater than 3 characters long");
      setMessageErrorText("");
    } else {
      setMessageErrorText("");
      setpwdErrorText("");
      const newMessage = await database.createMessage({
        message,
        password,
        file,
      });
      history("/send-message", { state: newMessage.$id });
    }
  };

  return (
    <div className="App">
      <Typography variant="h3" p={2} align="center" color="initial">
        Pegam
      </Typography>
      <Typography variant="h5" align="center" color="primary">
        Create A New Pegam
      </Typography>
      <Typography variant="body1" align="center" gutterBottom color="GrayText">
        The message will be deleted after 72 hours
      </Typography>

      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Box>
            <TextField
              id="message"
              label="Enter the message"
              multiline
              rows={5}
              value={message}
              fullWidth
              error={messageErrorText}
              helperText={messageErrorText && messageErrorText}
              onChange={(e) => setMessage(e.target.value)}
            />

            <IconButton
              type="file"
              aria-label="document"
              color="primary"
              onClick={() => {}}
              component="label"
            >
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />

              <AttachFileRounded />
            </IconButton>
          </Box>
          <TextField
            id="password"
            type="password"
            label="Enter a password"
            error={pwdErrorText}
            helperText={pwdErrorText && pwdErrorText}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={(e) => createPegam(e)}
          >
            Create Pegam
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default CreateMessage;
