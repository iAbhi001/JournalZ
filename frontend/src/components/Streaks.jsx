import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import API from "../api/axios";

const Streaks = () => {
  const [activityDates, setActivityDates] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        const { data } = await API.get("/users/streak");
        setActivityDates(data.activityDates);
        // console.log(data)
        setStreak(data.streak);
      } catch (err) {
        setError("Failed to load streak data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStreakData();
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
