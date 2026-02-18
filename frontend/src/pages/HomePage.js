import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import JobResults from '@/components/JobResults';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);

  // Load saved jobs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${BACKEND_URL}/api/jobs?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.json();
      setJobs(data.jobs || []);
      
      // Log analytics
      console.log('Search submitted:', searchParams);
      // TODO: Integrate analytics here
    } catch (err) {
      setError(err.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = (job) => {
    const isAlreadySaved = savedJobs.some(saved => saved.id === job.id);
    
    let newSavedJobs;
    if (isAlreadySaved) {
      newSavedJobs = savedJobs.filter(saved => saved.id !== job.id);
    } else {
      newSavedJobs = [...savedJobs, job];
    }
    
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  const isJobSaved = (jobId) => {
    return savedJobs.some(saved => saved.id === jobId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header savedJobsCount={savedJobs.length} />
      
      <AnimatePresence mode="wait">
        {!hasSearched ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onSearch={handleSearch} loading={loading} />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8 max-w-7xl"
          >
            <div className="mb-8">
              <SearchForm onSearch={handleSearch} loading={loading} compact />
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
    </div>
  );
}