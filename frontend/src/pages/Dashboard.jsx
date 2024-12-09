import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
  Container,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import Streaks from "../components/Streaks";

const Dashboard = () => {
  const navigate = useNavigate();

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loadingQuote, setLoadingQuote] = useState(true);

  const fetchRandomQuote = async () => {
    setLoadingQuote(true);
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      setQuote(data[0]?.q || "Your daily inspiration awaits!");
      setAuthor(data[0]?.a || "ZenQuotes");
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Journaling helps you discover who you are. Start your journey today!");
      setAuthor("Anonymous");
    } finally {
      setLoadingQuote(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", paddingY: 4 }}>
      {/* Banner Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "#fff",
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          marginBottom: 6,
          boxShadow: 3,
        }}
      >
        {loadingQuote ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ lineHeight: 1.5, marginBottom: 2 }}
            >
              "{quote}"
            </Typography>
            <Typography variant="subtitle1" sx={{ fontStyle: "italic", opacity: 0.8 }}>
              - {author}
            </Typography>
          </>
        )}
      </Box>

      {/* Cards Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => handleNavigation("/public-journals")}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              backgroundColor: "#6a11cb",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: "#fff",
                  color: "#6a11cb",
                  width: 60,
                  height: 60,
                  margin: "16px auto",
                }}
              >
                <BookIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" marginTop={2}>
                View Public Journals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => handleNavigation("/my-journals")}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              backgroundColor: "#2575fc",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: "#fff",
                  color: "#2575fc",
                  width: 60,
                  height: 60,
                  margin: "16px auto",
                }}
              >
                <CollectionsBookmarkIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" marginTop={2}>
                View My Journals
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            onClick={() => handleNavigation("/profile")}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              textAlign: "center",
              backgroundColor: "#ff758c",
              color: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.3s",
              "&:hover": { transform: "scale(1.05)", boxShadow: 4 },
            }}
          >
            <CardContent>
              <Avatar
                sx={{
                  backgroundColor: "#fff",
                  color: "#ff758c",
                  width: 60,
                  height: 60,
                  margin: "16px auto",
                }}
              >
                <PersonOutlineIcon fontSize="large" />
              </Avatar>
              <Typography variant="h6" fontWeight="bold" marginTop={2}>
                My Profile
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Streak Section */}
      <Box sx={{ marginBottom: 6 }}>
        <Streaks />
      </Box>
    </Container>
  );
};

export default Dashboard;
