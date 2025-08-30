import "./BrandMarquee.css";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getLangFromPath, getDir } from "/src/utils/direction.js";

// مؤقتًا صور ثابتة — لاحقًا من لوحة التحكم
import p1 from "/src/assets/images/brands/Almanea Logo Design(1).png";
import p2 from "/src/assets/images/brands/alkaffary.png";
import p3 from "/src/assets/images/brands/Almanea Logo Design(1).png";
import p4 from "/src/assets/images/brands/alkaffary.png";
import p5 from "/src/assets/images/brands/fakelogo.png";
import p6 from "/src/assets/images/brands/fakelogo.png";
import p7 from "/src/assets/images/brands/fakelogo.png";
import p8 from "/src/assets/images/brands/fakelogo.png";

const LOGOS = [
  { src: p1, key: "one" },
  { src: p2, key: "two" },
  { src: p3, key: "three" },
  { src: p4, key: "four" },
  
];

function BrandMarquee() {
  const { t } = useTranslation();
  const location = useLocation();

  // استنتاج اللغة من المسار وتحديثها عند تغيّر الـ pathname
  const lang = useMemo(() => getLangFromPath(location.pathname), [location.pathname]);
  const dir  = useMemo(() => getDir(lang), [lang]);

  const [/*scrollX*/, setScrollX] = useState(0);

  const scroll = (dirKey) => {
    const container = document.querySelector(".logos-row");
    if (!container) return;
    const width = container.clientWidth;
    const newScroll =
      dirKey === "left" ? container.scrollLeft - width : container.scrollLeft + width;
    container.scrollTo({ left: newScroll, behavior: "smooth" });
    setScrollX(newScroll);
  };

  return (
    <section className="partners" id="brands" dir={dir}>
      <div className="partners-inner">
        <h2 className="partners-title">
          {t("partners.title", {
            lng: lang,
            defaultValue: lang === "ar" ? "شركاؤنا" : "Our Partners",
          })}
        </h2>

        <div className="slider-wrap">
          <button
            className="nav prev"
            onClick={() => scroll("left")}
            aria-label={t("partners.prev", {
              lng: lang,
              defaultValue: lang === "ar" ? "السابق" : "Prev",
            })}
            type="button"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="viewport">
            <div className="logos-row">
              {LOGOS.map((it, i) => (
                <div className="logo-card" key={i}>
                  <img
                    src={it.src}
                    alt={t(`partners.names.${it.key}`, {
                      lng: lang,
                      defaultValue: "Partner",
                    })}
                  />
                  <div className="logo-name">
                    {t(`partners.names.${it.key}`, {
                      lng: lang,
                      defaultValue: "",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="nav next"
            onClick={() => scroll("right")}
            aria-label={t("partners.next", {
              lng: lang,
              defaultValue: lang === "ar" ? "التالي" : "Next",
            })}
            type="button"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default BrandMarquee;
