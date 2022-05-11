import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container, Paper } from "@mui/material";
import { Download, Key } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { database } from "../appwrite/database";

const ShowMessage = () => {
  const params = useParams();
  const messageID = params.messageId;

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fileUrl, setfileUrl] = useState("");

  const [errorText, setErrorText] = useState("");

  const handleDecrypt = async (e) => {
    const data = await database.getMessage(messageID, password);
    if (data.message == "Wrong password") {
      setErrorText("Wrong password, Please enter correct password !!");
    } else {
      setMessage(data.message);
      setfileUrl(data.link);
      setIsAuthenticated(true);
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
        {isAuthenticated ? (
          <Paper style={{ margin: "20px 0px" }} elevation={2}>
            <Stack p={2} spacing={3}>
              <Typography variant="h5" color="primary">
                Pegam :
              </Typography>

              <TextField
                id="message"
                label="Message"
                multiline
                rows={5}
                value={message}
                fullWidth
                disabled
              />
              <Button
                size="large"
                variant="contained"
                color="primary"
                disabled={fileUrl == undefined ? true : false}
                onClick={(e) => (window.location.href = fileUrl)}
                startIcon={<Download />}
              >
                Download Files
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Paper style={{ margin: "20px 0px" }} elevation={2}>
            <Stack p={2} spacing={3}>
              <Typography variant="h5" color="primary">
                Decrypt your message :
              </Typography>
              <TextField
                id="password"
                type="password"
                label="Enter the password"
                value={password}
                error={errorText}
                helperText={errorText && errorText}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={(e) => handleDecrypt(e)}
                startIcon={<Key />}
              >
                Decrypt Pegam
              </Button>
            </Stack>
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default ShowMessage;
