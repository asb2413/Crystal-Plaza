// src/components/IntroSplit/IntroSplit.jsx
import { useMemo } from "react";
import { Container, Box, Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getLangFromPath } from "../../utils/direction.js";
import aboutAr from "../../data/about.ar.json";
import aboutEn from "../../data/about.en.json";
import "./IntroSplit.css";

function IntroSplit() {
  const location = useLocation();
  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const isRTL = lang === "ar";
  const data = isRTL ? aboutAr : aboutEn;

  return (
    <Container className="intro-row" maxWidth="lg">
      <Box className={`intro-flex ${isRTL ? "rtl" : "ltr"}`}>
        {/* الصورة */}
        <Box className="col col-media">
          <div className="media-frame">
            <img
              src="/src/assets/images/logos/cristal-intro.png"
              alt="Crystal Plaza"
              loading="lazy"
            />
          </div>
        </Box>

        {/* النص */}
        <Box className="col col-copy">
          <Stack spacing={2} className={`copy ${isRTL ? "rtl" : "ltr"}`}>
            <Typography variant="overline" className="kicker">
              {isRTL ? "نبذة عنا" : "About Us"}
            </Typography>

            <Typography variant="h4" component="h2" className="title">
              {data.title}
            </Typography>

            <Typography variant="body1" className="text">
              {data.text}
            </Typography>

            <span className="gold-rule" />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default IntroSplit;
