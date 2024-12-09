import React from "react";
import { Box, Button, Typography, Grid, Card, CardContent, Container } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SecurityIcon from "@mui/icons-material/Security";
import InsightsIcon from "@mui/icons-material/Insights";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import LockIcon from "@mui/icons-material/Lock";

const LandingPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "80vh",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to Journalify
        </Typography>
        <Typography variant="h5" mb={4} sx={{ maxWidth: "600px" }}>
          Your secure, AI-powered journaling companion to help you reflect, grow, and thrive every day.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="/signup"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ff758c",
              "&:hover": { backgroundColor: "#ff7eb3" },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            href="/login"
            sx={{
              borderRadius: "8px",
              borderColor: "#fff",
              color: "#fff",
              "&:hover": { borderColor: "#ff7eb3", color: "#ff7eb3" },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ paddingY: 6 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Why Journalify?
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Designed to make journaling easy, insightful, and secure for everyone.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", padding: 3 }}>
              <SecurityIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Advanced Security
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Encrypted journals ensure your privacy and peace of mind.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", padding: 3 }}>
              <InsightsIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  AI Insights
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  AI-based reflections provide valuable insights into your journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", padding: 3 }}>
              <StarIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Streak Tracking
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Visualize your consistency and grow your journaling habit.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", padding: 3 }}>
              <AccessibilityNewIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Accessible Everywhere
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Enjoy a seamless journaling experience across all devices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ textAlign: "center", padding: 3 }}>
              <LockIcon color="primary" sx={{ fontSize: 50 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Role-Based Access Control
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Separate access for admins and users to ensure secure functionality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box
        sx={{
          paddingY: 6,
          background: "linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          What Our Users Say
        </Typography>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: 3 }}>
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "Journalify is a game-changer for my mental health. I can track my thoughts and stay consistent."
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "bold" }}>
                  - Sarah T.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: 3 }}>
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "The insights feature helps me understand myself better every day."
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "bold" }}>
                  - Mike J.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", padding: 3 }}>
              <CardContent>
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                  "I love the streak tracker! It motivates me to journal daily."
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: "bold" }}>
                  - Emma K.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          paddingY: 6,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Start Your Journaling Journey Today!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Transform your thoughts into a powerful tool for self-reflection and growth.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/signup"
          sx={{
            borderRadius: "8px",
            backgroundColor: "#6a11cb",
            "&:hover": { backgroundColor: "#2575fc" },
          }}
        >
          Join Now
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
