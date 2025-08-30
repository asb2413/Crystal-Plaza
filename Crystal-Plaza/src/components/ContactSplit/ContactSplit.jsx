import { Box, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { getLangFromPath, getDir } from "/src/utils/direction.js";
import "./ContactSplit.css";

function ContactSplit() {
  const location = useLocation();
  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const dir  = useMemo(() => getDir(lang), [lang]);
  const isAR = lang === "ar";

  // بيانات مؤقتة (لاحقاً من data/contact.json)
  const data = {
    brand: "Crystal Plaza",
    addressAr: "الرياض، المملكة العربية السعودية",
    addressEn: "Riyadh, Saudi Arabia",
    phone: "966500000000",
    email: "info@crystalplaza.com",
    whatsapp: "966500000000",
  };

  const ui = { heading: isAR ? "تواصل معنا" : "Contact Us" };

  // رابط التضمين الذي أرسلته (مع إبقاء نفس القيمة)
  const EMBED_SRC =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232005.42934444686!2d46.661087308119306!3d24.689610337576582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0f00188223b3%3A0x3b8edb528419fd7e!2z2LPZiNmCINmD2LHZitiz2KrYp9mEINio2YTYp9iy2Kc!5e0!3m2!1sen!2ssa!4v1756533419395!5m2!1sen!2ssa";

  return (
    <Box className="contact-band" dir={dir}>
      <div className="contact-inner">
        {/* العنوان */}
        <span className="contact-heading">{ui.heading}</span>

        {/* الصف داخل نفس الحاوية ليتمركز تحت العنوان تمامًا */}
        <div className="wide-row">
          {/* بطاقة المعلومات */}
          <div className="panel info-panel">
            <Stack spacing={2} alignItems="center" textAlign="center">
              <Typography variant="h6" className="contact-title">{data.brand}</Typography>

              <Stack spacing={1} className="contact-lines">
                <Typography variant="body1" className="contact-line">
                  <i className="bi bi-geo-alt-fill" />
                  {isAR ? data.addressAr : data.addressEn}
                </Typography>
                <Typography variant="body1" className="contact-line">
                  <i className="bi bi-telephone-fill" />
                  {data.phone}
                </Typography>
                <Typography variant="body1" className="contact-line">
                  <i className="bi bi-envelope-fill" />
                  {data.email}
                </Typography>
                <Typography variant="body1" className="contact-line">
                  <i className="bi bi-whatsapp" />
                  {data.whatsapp}
                </Typography>
              </Stack>
            </Stack>
          </div>

          {/* الخريطة */}
          <div className="panel map-panel">
            <div className="map-embed">
              <iframe
                title="Google Map"
                src={EMBED_SRC}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default ContactSplit;
