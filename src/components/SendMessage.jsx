import { ContentCopyRounded, Send } from "@mui/icons-material";
import {
  Typography,
  Container,
  TextField,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";

const SendMessage = () => {
  const [url, setUrl] = useState("dfsf");
  const [mail, setMail] = useState("");

  const [errorText, setErrorText] = useState("");
  return (
    <div>
      <Typography variant="h3" p={2} align="center" color="initial">
        Pegam
      </Typography>
      <Typography variant="h5" align="center" color="primary">
        Send Pegam
      </Typography>
      <Typography variant="body1" align="center" color="GrayText">
        The message will be deleted after 72 hours
      </Typography>

      <Container maxWidth="xl">
        <Paper style={{ margin: "20px 0px" }} elevation={2}>
          <Stack p={2} spacing={2}>
            <Typography variant="body2" color="secondary">
              Share this link to the one you want to send this pegam !
            </Typography>
            <TextField
              fullWidth
              disabled
              id="url"
              label="Your Pegam's URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton color="primary" size="large" onClick={() => {}}>
                      <ContentCopyRounded />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Paper>
      </Container>

      <Container maxWidth="xl">
        <Paper style={{ margin: "20px 0px" }} elevation={2}>
          <Stack p={2} spacing={2}>
            <Typography variant="body2" color="primary">
              Send this Pegam as a mail to your friend !
            </Typography>
            <TextField
              fullWidth
              id="mail"
              label="Enter Mail Address"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              error={errorText}
              helperText={errorText && errorText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton color="primary" size="large" onClick={() => {}}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Paper>
      </Container>
    </div>
  );
};

export default SendMessage;
