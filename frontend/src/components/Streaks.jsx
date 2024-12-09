import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";

const Streaks = () => {
  const [activityDates, setActivityDates] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate fetching streak data
    setLoading(true);
    setError("");
    setTimeout(() => {
      const simulatedData = {
        activityDates: [
          "2024-12-01",
          "2024-12-02",
          "2024-12-03",
          "2024-12-05",
          "2024-12-07",
        ],
        streak: 3, // Simulated current streak
      };

      setActivityDates(simulatedData.activityDates);
      setStreak(simulatedData.streak);
      setLoading(false);
    }, 1000);
  }, []);

  const transformData = () => {
    return activityDates.map((date) => ({
      date: new Date(date).toISOString().split("T")[0],
      count: 1,
    }));
  };

  return (
    <Box sx={{ textAlign: "center", padding: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Typography variant="h4" fontWeight="bold" color="#6a11cb" gutterBottom>
            Current Streak: {streak} Day{streak > 1 && "s"} 🔥
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Keep up the momentum! Journaling daily improves mental health and boosts productivity.
          </Typography>
          <CalendarHeatmap
            startDate={new Date(new Date().getFullYear(), 0, 1)}
            endDate={new Date()}
            values={transformData()}
            classForValue={(value) => {
              if (!value) return "color-empty";
              return "color-scale-1";
            }}
            showMonthLabels={true}
            showWeekdayLabels={true}
          />
        </>
      )}
    </Box>
  );
};

export default Streaks;
