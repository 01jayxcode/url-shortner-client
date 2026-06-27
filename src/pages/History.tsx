import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip,
  Button,
  Divider,
  Fade,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BarChartIcon from "@mui/icons-material/BarChart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ShortenResponse } from "../types/url.types";

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<ShortenResponse[]>(
    JSON.parse(localStorage.getItem("url_history") || "[]"),
  );
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (url: string, code: string) => {
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDelete = (code: string) => {
    const updated = history.filter((item) => item.short_code !== code);
    setHistory(updated);
    localStorage.setItem("url_history", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem("url_history");
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "calc(100vh - 64px)",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              Link History
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {history.length} link{history.length !== 1 ? "s" : ""} created
            </Typography>
          </Box>
          {history.length > 0 && (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={handleClearAll}
              sx={{ borderRadius: 2, fontSize: "0.78rem" }}
            >
              Clear all
            </Button>
          )}
        </Box>

        {history.length === 0 ? (
          <Box
            textAlign="center"
            py={10}
            sx={{ border: "1px dashed #cbd5e1", borderRadius: 3 }}
          >
            <LinkOffIcon
              sx={{ fontSize: 40, color: "text.secondary", mb: 1.5 }}
            />
            <Typography color="text.secondary" fontWeight={500}>
              No links yet
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Shorten your first URL to see it here
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{ borderRadius: 2 }}
            >
              Shorten a link
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {history.map((item, i) => (
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
                          {item.short_url}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 0.3,
                            wordBreak: "break-all",
                            fontSize: "0.78rem",
                          }}
                          noWrap
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
                            onClick={() =>
                              window.open(item.short_url, "_blank")
                            }
                          >
                            <OpenInNewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Stats">
                          <IconButton
                            size="small"
                            onClick={() =>
                              navigate(`/stats/${item.short_code}`)
                            }
                          >
                            <BarChartIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(item.short_code)}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 1.5 }} />
                    <Chip
                      label="Active"
                      color="success"
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.7rem", height: 22 }}
                    />
                  </CardContent>
                </Card>
              </Fade>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default History;
