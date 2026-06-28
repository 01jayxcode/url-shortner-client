import {
  Box,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Container,
  useScrollTrigger,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 10 });

  const navItems = [
    { label: "Shorten", path: "/" },
    {
      label: "History",
      path: "/history",
      icon: <HistoryIcon sx={{ fontSize: 15 }} />,
    },
  ];

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        bgcolor: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
        transition: "all 0.2s ease",
        py: 1.5,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              cursor: "pointer",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                borderRadius: 1.5,
                p: 0.6,
                display: "flex",
              }}
            >
              <LinkIcon sx={{ color: "white", fontSize: 17 }} />
            </Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1rem",
                color: "text.primary",
                letterSpacing: -0.3,
              }}
            >
              Snip<span style={{ color: "#2563eb" }}>ly</span>
            </Typography>
          </Box>

          {/* Pill nav */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "100px",
              px: 0.75,
              py: 0.75,
              gap: 0.5,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  size="small"
                  startIcon={item.icon}
                  sx={{
                    borderRadius: "100px",
                    px: { xs: 1.5, sm: 2 },
                    py: 0.6,
                    minWidth: 0,
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    bgcolor: active ? "primary.main" : "transparent",
                    color: active ? "white" : "text.secondary",
                    boxShadow: active
                      ? "0 2px 8px rgba(37,99,235,0.2)"
                      : "none",
                    "&:hover": {
                      bgcolor: active ? "primary.dark" : "#f1f5f9",
                      color: active ? "white" : "text.primary",
                    },
                    transition: "all 0.15s ease",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    {item.label}
                  </Box>
                </Button>
              );
            })}

            {/* Divider */}
            <Box
              sx={{ width: "1px", height: 20, bgcolor: "#e2e8f0", mx: 0.25 }}
            />

            {/* Auth */}
            {user ? (
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                  border: "2px solid #e2e8f0",
                  ml: 0.25,
                  "&:hover": { borderColor: "primary.main" },
                  transition: "border-color 0.15s",
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              />
            ) : (
              <Button
                size="small"
                startIcon={<GoogleIcon sx={{ fontSize: "16px !important" }} />}
                onClick={handleLogin}
                sx={{
                  borderRadius: "100px",
                  px: 1.75,
                  py: 0.6,
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  color: "text.primary",
                  "&:hover": { bgcolor: "#f1f5f9" },
                }}
              >
                <Box
                  component="span"
                  sx={{ display: { xs: "none", sm: "inline" } }}
                >
                  Login
                </Box>
              </Button>
            )}
          </Box>
        </Box>
      </Container>

      {/* User menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 210,
            borderRadius: 2,
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        <Box px={2} py={1.5} sx={{ padding: 2 }}>
          <Typography variant="subtitle2" fontWeight={700} noWrap>
            {user?.name}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate("/dashboard");
            setAnchorEl(null);
          }}
          sx={{ gap: 1.5, fontSize: "0.875rem", py: 1 }}
        >
          <DashboardIcon fontSize="small" sx={{ color: "text.secondary" }} />
          My dashboard
        </MenuItem>
        {isAdmin && (
          <MenuItem
            onClick={() => {
              navigate("/admin");
              setAnchorEl(null);
            }}
            sx={{ gap: 1.5, fontSize: "0.875rem", py: 1 }}
          >
            <AdminPanelSettingsIcon
              fontSize="small"
              sx={{ color: "primary.main" }}
            />
            Admin panel
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ gap: 1.5, fontSize: "0.875rem", py: 1, color: "error.main" }}
        >
          <LogoutIcon fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Navbar;
