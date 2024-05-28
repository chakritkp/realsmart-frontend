import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h3" component="h1" color="error">
        404 - Not Found
      </Typography>
      <Typography variant="h6" component="p">
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
