import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Chip,
  Divider,
  Fade,
} from "@mui/material";
import MouseIcon from "@mui/icons-material/Mouse";
import LinkIcon from "@mui/icons-material/Link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStats } from "../api/urlApi";
import type { UrlStats } from "../types/url.types";

const StatRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Box display="flex" alignItems="flex-start" gap={2} py={2}>
    <Box
      sx={{
        bgcolor: "primary.light",
        borderRadius: 2,
        p: 1,
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
    </Box>
    <Box flex={1} minWidth={0}>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={600}
        textTransform="uppercase"
        letterSpacing={0.8}
        fontSize={10}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={600}
        mt={0.3}
        sx={{ wordBreak: "break-all" }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

const Stats = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UrlStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;
    getStats(code)
      .then(setStats)
      .catch(() => setError("Could not find stats for this link."))
      .finally(() => setLoading(false));
  }, [code]);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "calc(100vh - 64px)",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3, color: "text.secondary", fontWeight: 600 }}
        >
          Back
        </Button>

        {loading && (
          <Box display="flex" justifyContent="center" py={10}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{ borderRadius: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {stats && (
          <Fade in>
            <Box>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                Link Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Stats for{" "}
                <Box component="span" color="primary.main" fontWeight={600}>
                  /{stats.short_code}
                </Box>
              </Typography>

              {/* Click count hero */}
              <Card
                sx={{
                  mb: 2,
                  border: "none",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                  color: "white",
                  boxShadow: "0 8px 32px rgba(37,99,235,0.25)",
                }}
              >
                <CardContent
                  sx={{ p: { xs: 2.5, sm: 3 }, "&:last-child": { pb: 3 } }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.8,
                      fontWeight: 600,
                      letterSpacing: 1.5,
                      fontSize: 10,
                    }}
                  >
                    TOTAL CLICKS
                  </Typography>
                  <Typography
                    variant="h2"
                    fontWeight={800}
                    sx={{
                      fontSize: { xs: "3rem", sm: "3.5rem" },
                      lineHeight: 1.1,
                      mt: 0.5,
                    }}
                  >
                    {stats.clicks.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75, mt: 0.5 }}>
                    All time clicks on this link
                  </Typography>
                </CardContent>
              </Card>

              {/* Detail card */}
              <Card sx={{ border: "1px solid #e2e8f0", boxShadow: "none" }}>
                <CardContent
                  sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: 2.5 } }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="subtitle2" fontWeight={700}>
                      Link Details
                    </Typography>
                    <Chip
                      label="Active"
                      color="success"
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.7rem", height: 22 }}
                    />
                  </Box>
                  <Divider />
                  <StatRow
                    icon={<MouseIcon fontSize="small" />}
                    label="Short Code"
                    value={`/${stats.short_code}`}
                  />
                  <Divider />
                  <StatRow
                    icon={<LinkIcon fontSize="small" />}
                    label="Original URL"
                    value={stats.long_url}
                  />
                  <Divider />
                  <StatRow
                    icon={<CalendarTodayIcon fontSize="small" />}
                    label="Created"
                    value={new Date(stats.created_at).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  />
                  <Box mt={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      endIcon={<OpenInNewIcon />}
                      onClick={() => window.open(stats.long_url, "_blank")}
                      sx={{ borderRadius: 2, fontWeight: 600 }}
                    >
                      Visit original URL
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Stats;
