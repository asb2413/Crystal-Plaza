// src/App.jsx
import { useMemo, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getLangFromPath, getDir, setDocumentDir } from "./utils/direction.js";
import { makeMuiTheme } from "./theme/muiTheme.js";
import { createEmotionCache } from "./theme/rtlCache.js";
import "bootstrap-icons/font/bootstrap-icons.css";
function App({ children }) {
  const lang = useMemo(() => getLangFromPath(window.location.pathname), []);
  const dir = useMemo(() => getDir(lang), [lang]);

  useEffect(() => {
    setDocumentDir(dir);
  }, [dir]);

  const theme = useMemo(() => makeMuiTheme(lang), [lang]);
  const cache = useMemo(() => createEmotionCache(dir), [dir]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
