import { Container, Box } from "@mui/material";
import TopBar from "../../components/TopBar/TopBar.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import HeroSlider from "../../components/HeroSlider/HeroSlider.jsx";
import IntroSplit from "../../components/IntroSplit/IntroSplit.jsx";
import SectionsGrid from "../../components/SectionsGrid/SectionsGrid.jsx";
import BrandMarquee from "../../components/BrandMarquee/BrandMarquee.jsx";
import ContactSplit from "../../components/ContactSplit/ContactSplit.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Home.css";

function Home() {
  return (
    <>
      {/* الشريط العلوي */}
      <TopBar />

      {/* شريط الروابط */}
      <Navbar hideLogo showLang={false} />

      {/* الهيرو */}
      <Box component="section" id="hero" className="section">
        <HeroSlider />
      </Box>

      {/* نبذة */}
      <Container component="section" id="about" className="section">
        <IntroSplit />
      </Container>

      {/* الأقسام */}
      <Container component="section" id="sections" className="section">
        <SectionsGrid />
      </Container>

      {/* العلامات التجارية */}
      <Container component="section" id="brands" className="section">
        <BrandMarquee />
      </Container>

      {/* تواصل + الخريطة */}
      <Container component="section" id="contact" className="section">
        <ContactSplit />
      </Container>

      {/* الفوتر */}
      <Footer />
    </>
  );
}

export default Home;
