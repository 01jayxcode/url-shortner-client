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
  Avatar,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { adminGetUsers } from "../../api/urlApi";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    adminGetUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} mb={0.5}>
        Users
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        {users.length} registered users
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
                    User
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                    Links
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                    Clicks
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ fontWeight: 700, fontSize: "0.78rem" }}>
                      Joined
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          sx={{ width: 30, height: 30, fontSize: "0.75rem" }}
                        >
                          {user.name?.[0]}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            fontSize="0.82rem"
                          >
                            {user.name}
                          </Typography>
                          {!isMobile && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {user.email}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        color={user.role === "admin" ? "primary" : "default"}
                        variant="outlined"
                        sx={{
                          fontSize: "0.7rem",
                          height: 20,
                          textTransform: "capitalize",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {user.linkCount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {user.totalClicks}
                      </Typography>
                    </TableCell>
                    {!isMobile && (
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(user.created_at).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  );
};

export default AdminUsers;
