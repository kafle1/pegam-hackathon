import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container, Paper } from "@mui/material";
import { Download, Key } from "@mui/icons-material";
import { useParams } from "react-router-dom";

const ShowMessage = () => {
  const params = useParams();
  const messageID = params.messageId;

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={(e) => createPegam(e)}
              startIcon={<Key />}
            >
              Decrypt Pegam
            </Button>
          </Stack>
        </Paper>
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
              onClick={(e) => createPegam(e)}
              startIcon={<Download />}
            >
              Download Files
            </Button>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default ShowMessage;
