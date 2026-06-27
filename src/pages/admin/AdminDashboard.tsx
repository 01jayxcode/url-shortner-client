import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import MouseIcon from "@mui/icons-material/Mouse";
import PeopleIcon from "@mui/icons-material/People";
import { useEffect, useState } from "react";
import { adminGetStats } from "../../api/urlApi";

interface Stats {
  totalLinks: number;
  totalClicks: number;
  totalUsers: number;
}

const StatCard = ({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card sx={{ border: "1px solid #e2e8f0", boxShadow: "none" }}>
    <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: 2.5 } }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
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
          <Typography variant="h4" fontWeight={800} mt={0.5} sx={{ color }}>
            {value?.toLocaleString() ?? "—"}
          </Typography>
        </Box>
        <Box sx={{ bgcolor: `${color}18`, borderRadius: 2, p: 1, color }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={0.5}>
        Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Platform-wide stats
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="Total Links"
            value={stats?.totalLinks ?? 0}
            icon={<LinkIcon />}
            color="#2563eb"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="Total Clicks"
            value={stats?.totalClicks ?? 0}
            icon={<MouseIcon />}
            color="#16a34a"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            label="Total Users"
            value={stats?.totalUsers ?? 0}
            icon={<PeopleIcon />}
            color="#9333ea"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
