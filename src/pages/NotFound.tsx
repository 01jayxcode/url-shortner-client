import { Box, Container, Typography, Button } from "@mui/material";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ bgcolor: "background.default", minHeight: "calc(100vh - 64px)" }}
    >
      <Container maxWidth="sm">
        <Box textAlign="center" py={12}>
          <LinkOffIcon sx={{ fontSize: 56, color: "text.secondary", mb: 2 }} />
          <Typography variant="h4" fontWeight={800} mb={1}>
            404
          </Typography>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Link not found
          </Typography>
          <Typography color="text.secondary" mb={4}>
            This short link doesn't exist or may have been deleted.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ borderRadius: 2 }}
          >
            Back to home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
