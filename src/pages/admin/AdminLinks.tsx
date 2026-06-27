import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminGetLinks, adminDeleteLink } from "../../api/urlApi";

const AdminLinks = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const load = (p: number) => {
    setLoading(true);
    adminGetLinks(p)
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(page);
  }, [page]);

  const handleDelete = async (code: string) => {
    if (!confirm(`Delete /${code}?`)) return;
    await adminDeleteLink(code);
    load(page);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={0.5}>
        All Links
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {data?.total ?? 0} links total
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Card sx={{ border: "1px solid #e2e8f0", boxShadow: "none" }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                    Short Code
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                      Original URL
                    </TableCell>
                  )}
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                    Clicks
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                      User
                    </TableCell>
                  )}
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.data?.map((link: any) => (
                  <TableRow key={link.short_code} hover>
                    <TableCell>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="primary.main"
                      >
                        /{link.short_code}
                      </Typography>
                    </TableCell>
                    {!isMobile && (
                      <TableCell>
                        <Typography
                          variant="body2"
                          noWrap
                          sx={{ maxWidth: 200, fontSize: "0.78rem" }}
                        >
                          {link.long_url}
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell>
                      <Chip
                        label={link.clicks}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    </TableCell>
                    {!isMobile && (
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {link.users?.email || "Guest"}
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell>
                      <Tooltip title="Stats">
                        <IconButton
                          size="small"
                          onClick={() => navigate(`/stats/${link.short_code}`)}
                        >
                          <BarChartIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Open">
                        <IconButton
                          size="small"
                          onClick={() => window.open(link.short_url, "_blank")}
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(link.short_code)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1.5}
          >
            <Typography variant="caption" color="text.secondary">
              Page {page} of {Math.ceil((data?.total ?? 0) / 20)}
            </Typography>
            <Box display="flex" gap={1}>
              <Button
                size="small"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </Button>
              <Button
                size="small"
                disabled={data?.data?.length < 20}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default AdminLinks;
