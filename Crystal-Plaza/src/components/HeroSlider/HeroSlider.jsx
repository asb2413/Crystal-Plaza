// src/components/HeroSlider/HeroSlider.jsx
import { useMemo } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getLangFromPath } from "../../utils/direction.js";
import "./HeroSlider.css";

function HeroSlider() {
  const location = useLocation();
  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const isRTL = lang === "ar";

  // محتوى النصوص (ثابت لأننا ما عاد عندنا سلايدر متعدد)
  const content = {
    title: isRTL ? "تصاميم راقية لبيتك" : "Elegant Designs for Your Home",
    desc: isRTL
      ? "اختيارات مميزة من الأثاث والمفروشات لدى Crystal Plaza"
      : "A curated selection of furniture and textiles at Crystal Plaza",
  };

  return (
    <Box className="hero">
      {/* الفيديو بالخلفية */}
      <video
        className="hero-video"
        src="/src/assets/vids/hero-vid.mp4"
        autoPlay
        loop
        muted
        playsInline
        ref={(vid) => { if (vid) vid.playbackRate = 0.90; }} 
      />

      {/* المحتوى */}
      <Container
        className={`hero-content ${isRTL ? "rtl" : "ltr"}`}
        maxWidth={false}
        disableGutters
      >
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Typography variant="h3" className="hero-title">
            {content.title}
          </Typography>
          <Typography variant="subtitle1" className="hero-desc">
            {content.desc}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default HeroSlider;
