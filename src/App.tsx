import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lazy, Suspense } from "react";
import theme from "./theme/theme";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { CircularProgress } from "@mui/material";

const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const Stats = lazy(() => import("./pages/Stats"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLinks = lazy(() => import("./pages/admin/AdminLinks"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "rgba(255,255,255,0.5)", // optional overlay
      zIndex: 9999,
    }}
  >
    <CircularProgress />
  </Box>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/stats/:code" element={<Stats />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="*" element={<NotFound />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="links" element={<AdminLinks />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            </Routes>
          </Suspense>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
