import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
  Button,
  Fade,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BarChartIcon from "@mui/icons-material/BarChart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyLinks } from "../api/urlApi";
import type { ShortenResponse } from "../types/url.types";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [links, setLinks] = useState<ShortenResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    getMyLinks()
      .then(setLinks)
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = (url: string, code: string) => {
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const totalClicks = links.reduce(
    (sum, l) => sum + ((l as any).clicks || 0),
    0,
  );

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "calc(100vh - 64px)",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="sm">
        {/* Profile header */}
        <Card sx={{ mb: 3, border: "1px solid #e2e8f0", boxShadow: "none" }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 }, "&:last-child": { pb: 3 } }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ width: 52, height: 52, border: "2px solid #e2e8f0" }}
              />
              <Box flex={1}>
                <Typography variant="h6" fontWeight={700}>
                  {user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
              <Chip
                label={user?.role}
                size="small"
                color={user?.role === "admin" ? "primary" : "default"}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  textTransform: "capitalize",
                }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" gap={4}>
              <Box>
                <Typography variant="h5" fontWeight={800} color="primary.main">
                  {links.length}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Links created
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={800} color="primary.main">
                  {totalClicks.toLocaleString()}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Total clicks
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Links */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight={700}>
            My Links
          </Typography>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2, margin: 2 }}
          >
            + New link
          </Button>
        </Box>

        {loading && (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        )}

        {!loading && links.length === 0 && (
          <Box
            textAlign="center"
            py={8}
            sx={{ border: "1px dashed #cbd5e1", borderRadius: 3 }}
          >
            <LinkOffIcon
              sx={{ fontSize: 40, color: "text.secondary", mb: 1.5 }}
            />
            <Typography color="text.secondary" fontWeight={500}>
              No links yet
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, borderRadius: 2 }}
              onClick={() => navigate("/")}
            >
              Shorten your first link
            </Button>
          </Box>
        )}

        <Box display="flex" flexDirection="column" gap={2}>
          {links.map((item, i) => (
            <Fade
              in
              key={item.short_code}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <Card sx={{ border: "1px solid #e2e8f0", boxShadow: "none" }}>
                <CardContent
                  sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: 2.5 } }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    gap={1}
                  >
                    <Box flex={1} minWidth={0}>
                      <Typography
                        variant="subtitle2"
                        color="primary.main"
                        fontWeight={700}
                        sx={{ wordBreak: "break-all" }}
                      >
                        {`https://url-shortner-z1nl.onrender.com/${item.short_code}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ fontSize: "0.78rem", mt: 0.3 }}
                      >
                        {item.long_url}
                      </Typography>
                    </Box>
                    <Box display="flex" flexShrink={0}>
                      <Tooltip
                        title={
                          copiedCode === item.short_code ? "Copied!" : "Copy"
                        }
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleCopy(item.short_url, item.short_code)
                          }
                          color={
                            copiedCode === item.short_code
                              ? "success"
                              : "default"
                          }
                        >
                          {copiedCode === item.short_code ? (
                            <CheckIcon fontSize="small" />
                          ) : (
                            <ContentCopyIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Open">
                        <IconButton
                          size="small"
                          onClick={() => window.open(item.short_url, "_blank")}
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Stats">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/stats/${item.short_code}`)}
                        >
                          <BarChartIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Chip
                      label="Active"
                      color="success"
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.7rem", height: 22 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {(item as any).clicks || 0} clicks
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
