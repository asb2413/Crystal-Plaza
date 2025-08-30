import { useMemo, useState } from "react";
import {
  AppBar, Toolbar, Container, Box, Button, Stack,
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { getLangFromPath, getDir } from "../../utils/direction.js";
import "bootstrap-icons/font/bootstrap-icons.css"; // للتأكد من ظهور أيقونة اللغة
import "./Navbar.css";

// ✅ استيراد بيانات التواصل
import contact from "../../data/contact.json";

function Navbar({ hideLogo = false, showLang = true }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const dir  = useMemo(() => getDir(lang), [lang]); // "rtl" أو "ltr"

  const labels = useMemo(() => ({
    ar: { home: "الرئيسية", sections: "الأقسام", about: "نبذة عنا", contact: "تواصل معنا", brands: "العلامات التجارية", brandName: "Crystal Plaza" },
    en: { home: "Home", sections: "Sections", about: "About", contact: "Contact", brands: "Brands", brandName: "Crystal Plaza" },
  }), []);
  const L = labels[lang];

  // يحافظ على القسم (hash) عند تبديل اللغة
  const switchLang = (targetLang) => {
    const hash = location.hash || "";
    const base = targetLang === "en" ? "/en" : "/ar";
    navigate(`${base}${hash}`, { replace: false });
  };

  // تمرير ناعم داخل الصفحة + تحديث الـ hash
  const handleAnchor = (e, id) => {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    const base = lang === "en" ? "/en" : "/ar";
    window.history.replaceState(null, "", `${base}#${id}`);
    setOpen(false); // اغلاق Drawer على الموبايل
  };

  const items = [
    { id: "hero",     label: L.home },
    { id: "about",    label: L.about },
    { id: "sections", label: L.sections },
    { id: "brands",   label: L.brands },
    { id: "contact",  label: L.contact },
  ];

  const drawerAnchor = dir === "rtl" ? "right" : "left";

  // قيم افتراضية إذا ما كانت موجودة
  const phone = contact?.phone || "+000 000 0000";
  const email = contact?.email || "info@example.com";

  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="navbar-appbar">
      <Container>
        {/* نثبّت اتجاه الشريط بكلاس rtl/ltr، ونستخدم Grid لمواضع العناصر */}
        <Toolbar disableGutters className={`navbar-toolbar ${dir}`}>
          {/* زر الهامبرغر (موبايل فقط) - في العمود الأوّل */}
          <IconButton
            className="navbar-menu-btn"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            size="large"
          >
            <MenuIcon />
          </IconButton>

          {/* الشعار (العمود الأوّل) */}
          {!hideLogo && (
            <Box
              className="navbar-logo"
              onClick={() => navigate(lang === "en" ? "/en" : "/ar")}
              role="button"
              aria-label="Go Home"
            >
              <img src="/src/assets/images/logos/ChatGPT Image Aug 23, 2025, 05_31_30 PM.png" alt="Crystal Plaza" />
              <span className="brand-text">{L.brandName}</span>
            </Box>
          )}

          {/* الروابط (العمود الثاني - وسط دائمًا) */}
          <Stack
            direction="row"
            spacing={1.25}
            className="navbar-links"
            alignItems="center"
            justifyContent="center"
          >
            {items.map((it) => (
              <Button
                key={it.id}
                variant="text"              // مهم لإلغاء خلفية الـ contained الافتراضية
                onClick={(e) => handleAnchor(e, it.id)}
                className="nav-btn"
              >
                {it.label}
              </Button>
            ))}
          </Stack>

          {/* الأكشنز (العمود الثالث) */}
          <Stack direction="row" spacing={1} className="navbar-actions" alignItems="center">
            {showLang && (
              <IconButton
                className="navbar-lang-btn"
                aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
                onClick={() => switchLang(lang === "ar" ? "en" : "ar")}
                title={lang === "ar" ? "English" : "العربية"}
              >
                <i className="bi bi-globe2"></i>
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </Container>

      {/* Drawer للموبايل - ينعكس يمين/يسار حسب اللغة */}
      <Drawer anchor={drawerAnchor} open={open} onClose={() => setOpen(false)}>
        {/* ✅ ارتفاع كامل + عمود عشان نقدر نثبت التواصل في الأسفل */}
        <Box className={`navbar-drawer ${dir}`} role="presentation" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box className="drawer-header">
            <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
            <span className="drawer-title">{L.brandName}</span>
          </Box>
          <Divider />
          <List>
            {items.map((it) => (
              <ListItem key={it.id} disablePadding>
                <ListItemButton onClick={(e) => handleAnchor(e, it.id)}>
                  <ListItemText
                    primary={it.label}
                    primaryTypographyProps={{ fontWeight: 600 }}
                    className="drawer-link"
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* ✅ أسفل القائمة: معلومات التواصل (تظهر في الموبايل داخل الـ Drawer) */}
          <Divider />
          <Box className="drawer-contact">
            <a href={`tel:${phone}`} className="drawer-contact-link">
              <i className="bi bi-telephone"></i>
              <span>{phone}</span>
            </a>
            <a href={`mailto:${email}`} className="drawer-contact-link">
              <i className="bi bi-envelope"></i>
              <span>{email}</span>
            </a>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
