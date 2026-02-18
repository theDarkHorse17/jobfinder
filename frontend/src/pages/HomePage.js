import { useState, useEffect } from "react";
import SearchForm from "@/components/SearchForm";
import JobResults from "@/components/JobResults";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  // ✅ Load saved jobs safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem("savedJobs");
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load saved jobs:", err);
    }
  }, []);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);

    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

      if (!BACKEND_URL) {
        throw new Error("Backend URL not configured");
      }

      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await fetch(
        `${BACKEND_URL}/api/jobs?${queryParams}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data?.jobs || []);

      console.log("Search submitted:", searchParams);
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = (job) => {
  const isAlreadySaved = savedJobs.some(
    (saved) => saved.id === job.id
  );

  let newSavedJobs;

  if (isAlreadySaved) {
    newSavedJobs = savedJobs.filter(
      (saved) => saved.id !== job.id
    );
  } else {
    const jobToSave = {
      id: job.id,
      title: job.title,
      company: job.company,
      applyLink: job.apply_url || job.applyLink || job.url // adjust based on your API
    };

    newSavedJobs = [...savedJobs, jobToSave];
  }

  setSavedJobs(newSavedJobs);

  try {
    localStorage.setItem(
      "savedJobs",
      JSON.stringify(newSavedJobs)
    );
  } catch (err) {
    console.error("Failed to save job:", err);
  }
};


  const isJobSaved = (jobId) => {
    return savedJobs.some((saved) => saved.id === jobId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">

      <Header savedJobsCount={savedJobs.length} />

      <main className="flex-1 w-full">

        <AnimatePresence mode="wait">

          {!hasSearched ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-4 sm:px-6 lg:px-8"
            >
              <HeroSection
                onSearch={handleSearch}
                loading={loading}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
            >
              <div className="mb-6 sm:mb-8">
                <SearchForm
                  onSearch={handleSearch}
                  loading={loading}
                  compact
                />
              </div>

              <JobResults
                jobs={jobs}
                loading={loading}
                error={error}
                onSaveJob={handleSaveJob}
                isJobSaved={isJobSaved}
              />
            </motion.div>
          )}

        </AnimatePresence>

      </main>
    </div>
  );
}
