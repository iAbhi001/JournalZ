import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const ManageJournals = () => {
  const [journals, setJournals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        const { data } = await API.get("/admin/journals", {
          params: { page: currentPage, limit: 10 },
        });
        setJournals(data.journals);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Failed to fetch journals.");
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Journals
      </Typography>
      {journals.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {journals.map((journal) => (
              <Grid item xs={12} sm={6} md={4} key={journal._id}>
                <Card
                  onClick={() => navigate(`/admin/journal/${journal._id}`)}
                  sx={{ cursor: "pointer", backgroundColor: "#f9f9f9", "&:hover": { boxShadow: 3 } }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {journal.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(journal.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <Typography variant="body1" align="center">
          No journals available.
        </Typography>
      )}
    </Box>
  );
};

export default ManageJournals;
