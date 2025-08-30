// src/components/SectionsGrid/SectionsGrid.jsx
import { Container, Box, Typography } from "@mui/material";
import "./SectionsGrid.css";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getLangFromPath, getDir } from "/src/utils/direction.js";

function SectionsGrid() {
  const location = useLocation();
  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const dir  = useMemo(() => getDir(lang), [lang]);

  // البيانات حسب اللغة (عناوين + Slugs)
  const sections = useMemo(() => {
    if (lang === "ar") {
      return [
        {
          id: "a",
          title: "الأثاث",
          slug: "الأثاث",
          img: "/src/assets/images/sections/furniture2.jpg",
        },
        {
          id: "b",
          title: " المفروشات والسجاد",
          slug: "المفروشات",
          img: "/src/assets/images/sections/carpt2.jpg",
        },
        {
          id: "c",
          title: " الدواليب",
          slug: "الدواليب",
          img: "/src/assets/images/sections/Wardrobes.jpg",
        },
        {
          id: "d",
          title: "الأقمشة ",
          slug: "الأقمشة",
          img: "/src/assets/images/sections/fabric.jpg",
        },
      ];
    }
    // EN
    return [
      {
        id: "a",
        title: "Furniture",
        slug: "Furniture",
        img: "/src/assets/images/sections/sofa.jpg",
      },
      {
        id: "b",
        title: "Furnishings & Carpets",
        slug: "Furnishings & Carpets",
        img: "/src/assets/images/sections/furniture.jpg",
      },
      {
        id: "c",
        title: "Wardrobes",
        slug: "Wardrobes",
        img: "/src/assets/images/sections/sleeproom.jpg",
      },
      {
        id: "d",
        title: "Fabrics",
        slug: "Fabrics",
        img: "/src/assets/images/sections/carpt.jpg",
      },
    ];
  }, [lang]);

  // المسار الأساسي حسب اللغة
  const basePath = lang === "ar" ? "/ar/الأثاث" : "/en/furniture";

  // نصوص الواجهة
  const titleLabel = lang === "ar" ? "الاقسام" : "Sections";
  const moreLabel  = lang === "ar" ? "المزيد <" : "More >";

  return (
    <Container className="sections-wrap" maxWidth="lg" dir={dir}>
      <Typography variant="h5" component="h2" className="sections-title">
        {titleLabel}
      </Typography>

      <Box className="sections-masonry">
        {sections.map((s) => (
          <a
            key={s.id}
            className={`sec-card area-${s.id}`}
            href={`${basePath}/${s.slug}`}
            style={{ "--bg": `url(${s.img})` }}
          >
            <div className="sec-overlay">
              <Typography component="div" className="sec-title">
                {s.title}
              </Typography>
            </div>
          </a>
        ))}
      </Box>
    </Container>
  );
}

export default SectionsGrid;
