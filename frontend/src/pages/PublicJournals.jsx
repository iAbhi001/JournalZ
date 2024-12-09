import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Button,
  CircularProgress,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = Array.from(
  { length: 10 },
  (_, i) => new Date().getFullYear() - i
); // Generate last 10 years dynamically

const PublicJournals = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [tags, setTags] = useState(["Inspiration", "Travel", "Life"]);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); // Simulated total pages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const journalsPerPage = 6;

  // Simulate journal data
  useEffect(() => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      const sampleJournals = Array.from({ length: journalsPerPage }, (_, i) => ({
        _id: i + (page - 1) * journalsPerPage,
        title: `Journal Title ${i + 1}`,
        tags: ["Inspiration", "Travel"],
        image: "https://via.placeholder.com/150",
      }));
      setJournals(sampleJournals);
      setLoading(false);
    }, 1000);
  }, [page, selectedTag, selectedMonth, selectedYear]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? "" : tag); // Toggle the selected tag
    setPage(1);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9", padding: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          borderRadius: 3,
          boxShadow: 2,
          padding: 4,
          marginBottom: 4,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Public Journals
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          Filter journals by tags, months, or years to find what inspires you.
        </Typography>
      </Box>

      {/* Back Button */}
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{
          marginBottom: 4,
          backgroundColor: "#6a11cb",
          "&:hover": { backgroundColor: "#2575fc" },
        }}
      >
        Back to Dashboard
      </Button>

      {/* Filters Section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          marginBottom: 4,
          padding: 2,
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        {/* Month Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <MenuItem value="">All Months</MenuItem>
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="">All Years</MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Tag Filter */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "center",
            marginTop: 1,
          }}
        >
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onClick={() => handleTagClick(tag)}
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem",
                color: selectedTag === tag ? "#fff" : "#6a11cb",
                backgroundColor: selectedTag === tag ? "#6a11cb" : "#f0f0f0",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Journals Display */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : journals.length === 0 ? (
        <Typography align="center">No journals found.</Typography>
      ) : (
        <Grid container spacing={4}>
          {journals.map((journal) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={journal._id}
              onClick={() => navigate(`/journal/${journal._id}`)}
              style={{ cursor: "pointer" }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  position: "relative",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 4 },
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    backgroundImage: `url(${journal.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: 150,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {journal.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {journal.tags.slice(0, 2).map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: "#6a11cb",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default PublicJournals;
