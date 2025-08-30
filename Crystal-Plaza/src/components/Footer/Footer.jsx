import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getLangFromPath, getDir } from "/src/utils/direction.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const dir  = useMemo(() => getDir(lang), [lang]);
  const year = new Date().getFullYear();
  const isAR = lang === "ar";

  // عناوين وروابط حسب اللغة
  const ui = isAR
    ? {
        
        tagline: "نستلهم تصاميمنا من الفخامة لتقديم تجربة أثاث راقية.",
        contactTitle: "تواصل معنا",
        companyTitle: "الشركة",
        serviceTitle: "خدمة العملاء",
        address: "الرياض، المملكة العربية السعودية",
        phoneLabel: "الهاتف",
        emailLabel: "البريد",
        phone: "+966500000000",
        email: "info@crystalplaza.com",
        linksCompany: [
          { label: "نبذة عنا", href: "#" },
          { label: "الأخبار", href: "#" },
          { label: "سياسة الخصوصية", href: "#" },
          { label: "الشروط والأحكام", href: "#" },
        ],
        linksService: [
          { label: "الطلبات والاسترجاع", href: "#" },
          { label: "اتصل بنا", href: "#contact" },
          { label: "الأسئلة الشائعة", href: "#" },
        ],
        mapText: "الموقع الجغرافي على خرائط Google",
        copyright: `جميع الحقوق محفوظة © ${year} Crystal Plaza`,
      }
    : {
        
        tagline: "We craft luxurious designs for a premium furniture experience.",
        contactTitle: "Contact Us",
        companyTitle: "Company",
        serviceTitle: "Customer Service",
        address: "Riyadh, Saudi Arabia",
        phoneLabel: "Phone",
        emailLabel: "Email",
        phone: "+966500000000",
        email: "info@crystalplaza.com",
        linksCompany: [
          { label: "About Us", href: "#" },
          { label: "News", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "Terms & Conditions", href: "#" },
        ],
        linksService: [
          { label: "Orders & Returns", href: "#" },
          { label: "Contact", href: "#contact" },
          { label: "FAQ", href: "#" },
        ],
        mapText: "View on Google Maps",
        copyright: `© ${year} Crystal Plaza. All rights reserved.`,
      };

  // رابط الموقع الجغرافي (يفتح Google Maps)
  const MAP_LINK =
    "https://www.google.com/maps/place/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%E2%80%AD/@24.68961,46.661087,11z";

  return (
    <footer className="site-footer" dir={dir}>
      <Container className="foot-inner">
        <Grid container spacing={4}>
          {/* العمود 1: اللوجو + نبذة + الموقع */}
          <Grid item xs={12} md={3}>
            <Stack spacing={1.5} alignItems="center" className="brand-block">
              <Stack direction="row" spacing={1} alignItems="center" className="brand-row">
                <img
                  src="/src/assets/images/logos/crystalLogo.png"
                  alt="Crystal Plaza"
                  className="foot-logo"
                />
                <Typography variant="h6" className="foot-brand">{ui.brand}</Typography>
              </Stack>

              <Typography variant="body2" className="foot-desc">
                {ui.tagline}
              </Typography>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="foot-line"
                title={ui.mapText}
              >
                <i className="bi bi-geo-alt-fill" />
                <span>{ui.address}</span>
              </a>
            </Stack>
          </Grid>

          {/* العمود 2: تواصل + سوشيال */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" className="foot-title">{ui.contactTitle}</Typography>

            <Stack spacing={1.2} className="foot-lines">
              <a className="foot-line" href={`tel:${ui.phone.replace(/\s+/g, "")}`}>
                <i className="bi bi-telephone-fill" />
                <span>{ui.phoneLabel}: {ui.phone}</span>
              </a>
              <a className="foot-line" href={`mailto:${ui.email}`}>
                <i className="bi bi-envelope-fill" />
                <span>{ui.emailLabel}: {ui.email}</span>
              </a>
            </Stack>

            <Stack direction="row" spacing={1} className="social">
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a href="#" aria-label="TikTok"><i className="bi bi-tiktok" /></a>
              <a href="#" aria-label="Snapchat"><i className="bi bi-snapchat" /></a>
              <a href="#" aria-label="X / Twitter"><i className="bi bi-twitter-x" /></a>
              <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp" /></a>
            </Stack>
          </Grid>

          {/* العمود 3: خدمة العملاء */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" className="foot-title">{ui.serviceTitle}</Typography>
            <Stack component="ul" className="foot-list">
              {ui.linksService.map((l, i) => (
                <li key={i}><a href={l.href}>{l.label}</a></li>
              ))}
            </Stack>
          </Grid>

          {/* العمود 4: الشركة */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" className="foot-title">{ui.companyTitle}</Typography>
            <Stack component="ul" className="foot-list">
              {ui.linksCompany.map((l, i) => (
                <li key={i}><a href={l.href}>{l.label}</a></li>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* الشريط السفلي */}
      <Box className="foot-bottom">
        <Container>
          <Typography variant="caption" className="foot-copy">
            {ui.copyright}
          </Typography>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
