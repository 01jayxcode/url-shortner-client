import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ShortenResponse } from "../types/url.types";

interface Props {
  data: ShortenResponse;
}

const ShortUrlCard = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.short_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card
      sx={{
        mt: 3,
        border: "1px solid",
        borderColor: "primary.light",
        bgcolor: "#fafcff",
        boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={0.5}
        >
          <Chip
            label="Link ready"
            color="success"
            size="small"
            icon={<CheckIcon style={{ fontSize: 13 }} />}
            sx={{ fontWeight: 600, fontSize: 11 }}
          />
          <Box>
            <Tooltip title="View stats">
              <IconButton
                size="small"
                onClick={() => navigate(`/stats/${data.short_code}`)}
              >
                <BarChartIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Open in new tab">
              <IconButton
                size="small"
                onClick={() => window.open(data.short_url, "_blank")}
              >
                <OpenInNewIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography
          variant="h6"
          color="primary.main"
          fontWeight={700}
          sx={{
            wordBreak: "break-all",
            fontSize: { xs: "1rem", sm: "1.15rem" },
          }}
        >
          {data.short_url}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, mb: 2, wordBreak: "break-all", fontSize: "0.8rem" }}
        >
          ↳ {data.long_url}
        </Typography>

        <Button
          fullWidth
          variant={copied ? "outlined" : "contained"}
          color={copied ? "success" : "primary"}
          startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
          onClick={handleCopy}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          {copied ? "Copied!" : "Copy short link"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShortUrlCard;
