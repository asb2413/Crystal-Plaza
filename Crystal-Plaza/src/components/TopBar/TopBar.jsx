import { useMemo } from "react";
import { AppBar, Toolbar, Container, Box, Stack, Link, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getLangFromPath, getDir } from "../../utils/direction.js";
import contact from "../../data/contact.json"; // يتوقع phone / email
import "./TopBar.css";

function TopBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const dir  = useMemo(() => getDir(lang), [lang]);

  const switchLang = (targetLang) => {
    const hash = location.hash || "";
    const base = targetLang === "en" ? "/en" : "/ar";
    navigate(`${base}${hash}`, { replace: false });
  };

  const phone = contact?.phone || "+000 000 0000";
  const email = contact?.email || "info@example.com";

  return (
    <AppBar position="static" color="inherit" elevation={0} className="topbar-appbar">
      <Container>
        <Toolbar disableGutters className={`topbar-toolbar ${dir}`}>
          {/* يسار: تواصل — عمودي (تحت بعض) */}
          <Stack
            className="topbar-contact"
            direction="column"
            spacing={0.5}
            alignItems="flex-start"
          >
            <Link href={`tel:${phone}`} underline="none" className="contact-link">
              <i className="bi bi-telephone" />
              <span>{phone}</span>
            </Link>
            <Link href={`mailto:${email}`} underline="none" className="contact-link">
              <i className="bi bi-envelope" />
              <span>{email}</span>
            </Link>
          </Stack>

          {/* وسط: الشعار */}
          <Box
            className="topbar-logo"
            onClick={() => navigate(lang === "en" ? "/en" : "/ar")}
            role="button"
            aria-label="Go Home"
          >
            <img src="/src/assets/images/logos/crystalLogo.png" alt="Crystal Plaza" />
          </Box>

          {/* يمين: تبديل اللغة */}
          <Stack direction="row" spacing={1} className="topbar-lang" alignItems="center">
            <IconButton
              className="topbar-lang-btn"
              aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              onClick={() => switchLang(lang === "ar" ? "en" : "ar")}
            >
              <i className="bi bi-translate"></i>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>
      <div className="topbar-divider" />
    </AppBar>
  );
}

export default TopBar;
