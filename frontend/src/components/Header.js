import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Bookmark, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = ({ savedJobsCount = 0, onRemoveSaved }) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const loadSavedJobs = () => {
    try {
      const stored = localStorage.getItem("savedJobs");
      setSavedJobs(stored ? JSON.parse(stored) : []);
    } catch {
      setSavedJobs([]);
    }
  };

  const handleViewSaved = () => {
    loadSavedJobs();
    setIsOpen(true);
  };

  const handleRemove = (id) => {
    const updated = savedJobs.filter((job) => job.id !== id);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    setSavedJobs(updated);
    if (onRemoveSaved) onRemoveSaved(updated.length);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">
              <span className="gradient-text">Income</span>
              <span className="text-foreground"> Recovery</span>
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleViewSaved}
            className="relative hover:bg-primary/10 hover:border-primary transition-all"
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Saved Jobs
            {savedJobsCount > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground h-5 px-1.5 text-xs">
                {savedJobsCount}
              </Badge>
            )}
          </Button>
        </div>
      </motion.header>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-card w-full max-w-lg rounded-xl p-6 shadow-xl relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-lg font-bold mb-4">Saved Jobs</h2>

            {savedJobs.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No saved jobs yet.
              </p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {savedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border rounded-lg p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.company}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(job.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
