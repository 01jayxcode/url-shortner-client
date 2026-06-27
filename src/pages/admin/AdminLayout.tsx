import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const DRAWER_WIDTH = 240;

const navItems = [
  {
    label: "Overview",
    path: "/admin",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    label: "All Links",
    path: "/admin/links",
    icon: <LinkIcon fontSize="small" />,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: <PeopleIcon fontSize="small" />,
  },
];

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ height: "100%", bgcolor: "#0f172a", color: "white" }}>
      <Box px={2.5} py={2.5} display="flex" alignItems="center" gap={1}>
        <AdminPanelSettingsIcon sx={{ color: "#60a5fa", fontSize: 22 }} />
        <Typography fontWeight={800} fontSize="1rem" letterSpacing={-0.3}>
          Sniply <span style={{ color: "#60a5fa" }}>Admin</span>
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
      <List sx={{ px: 1.5, pt: 1.5 }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  onClose?.();
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: active ? "rgba(96,165,250,0.15)" : "transparent",
                  color: active ? "#60a5fa" : "rgba(255,255,255,0.6)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                    color: "white",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: active ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
      {/* Mobile top bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{ top: 64, bgcolor: "#0f172a", zIndex: theme.zIndex.drawer + 1 }}
        >
          <Toolbar variant="dense">
            <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography fontWeight={700} ml={1}>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar */}
      {isMobile ? (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH, border: "none" } }}
        >
          <SidebarContent onClose={() => setMobileOpen(false)} />
        </Drawer>
      ) : (
        <Box sx={{ width: DRAWER_WIDTH, flexShrink: 0 }}>
          <Box
            sx={{
              width: DRAWER_WIDTH,
              position: "fixed",
              top: 64,
              height: "calc(100vh - 64px)",
            }}
          >
            <SidebarContent />
          </Box>
        </Box>
      )}

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 3 },
          mt: isMobile ? 6 : 0,
          bgcolor: "#f8fafc",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
