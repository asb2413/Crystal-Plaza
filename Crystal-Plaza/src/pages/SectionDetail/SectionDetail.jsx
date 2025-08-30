// src/pages/SectionDetail/SectionDetail.jsx
import { useMemo } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container, Box, Typography, Grid, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import sections from "../../data/sections.json";
import { getLangFromPath } from "../../utils/direction.js";
import "./SectionDetail.css";

function SectionDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // اللغة من المسار (/ar أو /en)
  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);

  // slug القادم من الـ URL قد يكون مُرمّزًا (خصوصًا العربية)
  const normalizedSlug = useMemo(() => decodeURIComponent(slug || ""), [slug]);

  // ابحث عن القسم المطابق حسب اللغة
  const sec = useMemo(() => {
    if (!normalizedSlug) return null;
    return sections.find((s) =>
      lang === "ar"
        ? s.slugAr === normalizedSlug
        : (s.slugEn || "").toLowerCase() === normalizedSlug.toLowerCase()
    );
  }, [lang, normalizedSlug]);

  const title = sec ? (lang === "ar" ? sec.titleAr : sec.titleEn) : "";
  const hero = sec?.heroImage || "";
  const samples = sec?.samples || [];

  const backHref = lang === "ar" ? "/ar#sections" : "/en#sections";
  const notFoundText = lang === "ar" ? "القسم غير موجود" : "Section not found";
  const backText = lang === "ar" ? "رجوع للأقسام" : "Back to Sections";

  if (!sec) {
    return (
      <>
        <Navbar />
        
        <Footer />
      </>
    );
  }

  return (
    <>
      
    </>
  );
}

export default SectionDetail;
