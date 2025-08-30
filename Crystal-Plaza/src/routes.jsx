// src/routes.jsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import SectionDetail from "./pages/SectionDetail/SectionDetail.jsx";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/ar" replace />} />
        <Route path="/ar" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/ar/الأثاث/:slug" element={<SectionDetail />} />
        <Route path="/en/furniture/:slug" element={<SectionDetail />} />
        <Route path="*" element={<Navigate to="/ar" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
