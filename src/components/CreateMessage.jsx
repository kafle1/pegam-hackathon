import React, { useState } from 'react'
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Stack, ButtonGroup, IconButton } from "@mui/material";
import { AttachFileRounded, ImageRounded } from "@mui/icons-material";

const CreateMessage = () => {
    const [message, setMessage] = useState("");

    const handleMessage = () => {
      console.log("messageSent");
    };
    return (
        <div className="App">
          <Typography variant="h3" p={2} align="center" color="initial">
            Pegam
          </Typography>
          <Typography variant="h5" align="center" color="primary">
            Create A New Pegam
          </Typography>
          <Typography variant="body1" align="center" color="GrayText">
            The message will be deleted after 72 hours
          </Typography>
    
          <Stack spacing={1} justifyContent="center" alignItems="center">
            <Container maxWidth="xl">
              <TextField
                id="message"
                label="Enter the message"
                multiline
                rows={5}
                value={message}
                fullWidth
                onChange={(e) => setMessage(e.target.value)}
              />
              <ButtonGroup variant="text" color="primary">
                <IconButton
                type=''
                  aria-label="document"
                  color="primary"
                  onClick={() => {}}
                >
                  <AttachFileRounded></AttachFileRounded>
                </IconButton>
                <IconButton aria-label="image" color="primary" onClick={() => {}}>
                  <ImageRounded></ImageRounded>
                </IconButton>
              </ButtonGroup>
            </Container>
            <Button
              style={{ maxWidth: "160px" }}
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Create Pegam
            </Button>
          </Stack>
         
        </div>
      );
}

export default CreateMessage