import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Pagination,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyJournals = () => {
  const navigate = useNavigate();

  const [journals, setJournals] = useState([]);
  const [tags, setTags] = useState(["Personal", "Travel", "Work"]);
  const [years, setYears] = useState([2023, 2022, 2021]);
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);

  const [selectedTag, setSelectedTag] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); // Simulated total pages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const journalsPerPage = 6;

  // Simulate fetching journals
  useEffect(() => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      const sampleJournals = Array.from({ length: journalsPerPage }, (_, i) => ({
        _id: i + (page - 1) * journalsPerPage,
        title: `Journal Title ${i + 1}`,
        tags: ["Personal", "Travel"],
        visibility: i % 2 === 0 ? "private" : "public",
        image: "https://via.placeholder.com/150",
      }));
      setJournals(sampleJournals);
      setLoading(false);
    }, 1000);
  }, [page, selectedTag, selectedYear, selectedMonth]);

  const handleEdit = (id) => {
    navigate(`/edit-journal/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this journal?")) {
      setJournals((prev) => prev.filter((journal) => journal._id !== id));
      alert("Journal deleted successfully.");
    }
  };

  const handleVisibilityToggle = (id, currentVisibility) => {
    const newVisibility = currentVisibility === "private" ? "public" : "private";
    setJournals((prev) =>
      prev.map((journal) =>
        journal._id === id ? { ...journal, visibility: newVisibility } : journal
      )
    );
  };

  const handleCreateNewJournal = () => {
    navigate("/create-journal");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6", padding: 4 }}>
      <Box
        sx={{
          background: "linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)",
          borderRadius: 3,
          boxShadow: 2,
          padding: 4,
          marginBottom: 4,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          My Journals
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          Organize and manage your personal journals.
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: "#fff",
            color: "#2575fc",
            "&:hover": { backgroundColor: "#e5e5e5" },
          }}
          onClick={handleCreateNewJournal}
        >
          Create New Journal
        </Button>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          marginBottom: 4,
          backgroundColor: "#fff",
          borderRadius: 3,
          padding: 2,
          boxShadow: 2,
        }}
      >
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: 1,
            maxWidth: "150px",
          }}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: 1,
            maxWidth: "150px",
          }}
        >
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={index + 1} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
              sx={{
                cursor: "pointer",
                backgroundColor: selectedTag === tag ? "#6a11cb" : "#f3f4f6",
                color: selectedTag === tag ? "#fff" : "#6a11cb",
                "&:hover": {
                  backgroundColor: selectedTag === tag ? "#5a0fc9" : "#e2e2e2",
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Journal Cards */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {journals.map((journal) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={journal._id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/journal/${journal._id}`)}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": { boxShadow: 4, transform: "translateY(-5px)" },
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
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {journal.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {journal.tags.slice(0, 2).map((tag) => (
                      <Chip
                        key={tag}
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <Button size="small" onClick={() => handleEdit(journal._id)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(journal._id)}>
                      Delete
                    </Button>
                    <Button
                      size="small"
                      color={journal.visibility === "private" ? "success" : "warning"}
                      onClick={() => handleVisibilityToggle(journal._id, journal.visibility)}
                    >
                      {journal.visibility === "private" ? "Make Public" : "Make Private"}
                    </Button>
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

export default MyJournals;
