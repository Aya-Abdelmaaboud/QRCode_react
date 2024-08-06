import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import QR from "./components/QR";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { useState } from "react";

let theme = createTheme({
  typography: {
    h1: {
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:960px)": {
        fontSize: "3rem",
      },
      "@media (min-width:1280px)": {
        fontSize: "3.5rem",
      },
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "20px",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);
function App() {
  const [urlValues, setUrlValues] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrColor, setQrColor] = useState("#000000");
  const handleChange = (e) => {
    setShowQRCode(false);
    setUrlValues(e.target.value);
  };
  const urls = urlValues
    ? urlValues.split(",").filter((url) => url.trim() !== "")
    : [];
  const handleColorChange = (e) => {
    setShowQRCode(false);
    setQrColor(e.target.value);
  };
  const handleGenerateQRCode = () => {
    if (urls.length > 0) setShowQRCode(true);
  };
  return (
    <>
      <Container>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <ThemeProvider theme={theme}>
            <Typography
              variant={"h1"}
              textAlign={"center"}
              sx={{ padding: 1, marginBottom: 2 }}
            >
              QR Code Generator
            </Typography>
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item xs={12} lg={8}>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography>Select QR Color:</Typography>
                  <TextField
                    type="color"
                    value={qrColor}
                    onChange={handleColorChange}
                    sx={{ width: 30, height: 30, padding: 0, marginLeft: 2 }}
                    InputProps={{
                      sx: {
                        padding: 0,
                        "& input[type=color]": {
                          padding: 0,
                          width: 30,
                          height: 30,
                          cursor: "pointer",
                          border: "none",
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={8}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Enter URLs (seperated by (' , ')"
                  multiline
                  rows={4}
                  value={urlValues}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                lg={8}
                textAlign={"center"}
              >
                <Button
                  onClick={handleGenerateQRCode}
                  variant="contained"
                  color="primary"
                >
                  <Typography fontSize={18}>Generate QR Code</Typography>
                </Button>
              </Grid>
              {showQRCode &&
                urls.map((url, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={6}>
                    <Box sx={{ textAlign: "center", marginRight: 2 }}>
                      <Typography fontSize={15} color={qrColor}>{url}</Typography>
                      <QR urlValue={url} fgColor={qrColor} />
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </ThemeProvider>
        </Box>
      </Container>
    </>
  );
}

export default App;
