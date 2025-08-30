// src/components/ProductSampleCard/ProductSampleCard.jsx
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { getLangFromPath } from "../../utils/direction.js";
import "./ProductSampleCard.css";

function ProductSampleCard({ section }) {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = getLangFromPath(location.pathname);

  const title = lang === "ar" ? section.titleAr : section.titleEn;
  const slug = lang === "ar" ? section.slugAr : section.slugEn;
  const path = lang === "ar" ? `/ar/الأثاث/${slug}` : `/en/furniture/${slug}`;

  return (
    <Card className="product-card">
      <CardActionArea onClick={() => navigate(path)}>
        <CardMedia component="img" height="180" image={section.img} alt={title} />
        <CardContent>
          <Typography variant="h6" className="product-title">{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductSampleCard;
