import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";

const AuthCallback = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      login(token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      navigate(payload.role === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography color="text.secondary">Signing you in...</Typography>
    </Box>
  );
};

export default AuthCallback;
