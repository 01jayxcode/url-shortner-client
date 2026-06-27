import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Fade,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { shortenUrl } from "../api/urlApi";
import ShortUrlCard from "../components/ShortUrlCard";
import type { ShortenResponse } from "../types/url.types";

const Home = () => {
  const [longUrl, setLongUrl] = useState("");
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!longUrl.trim()) return setError("Paste a URL to shorten");
    setError("");
    setLoading(true);
    try {
      const data = await shortenUrl(longUrl.trim());
      setResult(data);
      const history = JSON.parse(localStorage.getItem("url_history") || "[]");
      localStorage.setItem("url_history", JSON.stringify([data, ...history]));
      setLongUrl("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 64px)" }}
    >
      {/* Hero */}
      <Box
        sx={{
          background: "linear-gradient(160deg, #eff6ff 0%, #f8fafc 60%)",
          borderBottom: "1px solid #e2e8f0",
          py: { xs: 7, md: 11 },
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: 2,
              fontSize: 11,
            }}
          >
            Free URL Shortener
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.6rem" },
              lineHeight: 1.2,
              color: "text.primary",
              mt: 1,
              mb: 1.5,
            }}
          >
            Short links that{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              actually work
            </Box>
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, fontSize: { xs: "0.95rem", md: "1.05rem" } }}
          >
            Paste your long URL and get a clean, shareable link in one click.
          </Typography>

          {/* Input row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1.5,
            }}
          >
            <TextField
              fullWidth
              placeholder="https://your-very-long-url.com/..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                  </InputAdornment>
                ),
                sx: {
                  bgcolor: "white",
                  borderRadius: 2,
                  fontSize: "0.95rem",
                  "& fieldset": { borderColor: "#e2e8f0" },
                  "&:hover fieldset": { borderColor: "primary.main" },
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleShorten}
              disabled={loading}
              endIcon={!loading && <ArrowForwardIcon />}
              sx={{
                minWidth: { xs: "100%", sm: 150 },
                height: 56,
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 2,
                boxShadow: "0 4px 14px rgba(37,99,235,0.25)",
                "&:hover": { boxShadow: "0 6px 20px rgba(37,99,235,0.35)" },
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Shorten"
              )}
            </Button>
          </Box>

          {error && (
            <Fade in>
              <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            </Fade>
          )}

          {result && (
            <Fade in>
              <Box>
                <ShortUrlCard data={result} />
              </Box>
            </Fade>
          )}
        </Container>
      </Box>

      {/* Stats bar */}
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 4, sm: 8 },
            py: 5,
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "Fast", label: "Instant redirect" },
            { value: "Free", label: "No account needed" },
            { value: "Live", label: "Click analytics" },
          ].map((s) => (
            <Box key={s.label} textAlign="center">
              <Typography variant="h5" fontWeight={800} color="primary.main">
                {s.value}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
              >
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
