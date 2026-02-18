import { motion, AnimatePresence } from 'framer-motion';
import JobCard from '@/components/JobCard';
import { Loader2, SearchX, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const JobResults = ({ jobs, loading, error, onSaveJob, isJobSaved }) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
        </div>
        <p className="mt-6 text-lg text-muted-foreground">Finding the best opportunities for you...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <Card className="max-w-md w-full bg-destructive/10 border-destructive/20">
          <CardContent className="pt-6 text-center">
            <div className="p-3 rounded-full bg-destructive/20 w-fit mx-auto mb-4">
              <SearchX className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">Unable to Fetch Jobs</h3>
            <p className="text-muted-foreground">
              We couldn't retrieve job listings right now. Please try again in a moment.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <Card className="max-w-md w-full bg-card/50 border-border">
          <CardContent className="pt-6 text-center">
            <div className="p-3 rounded-full bg-muted w-fit mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Roles Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria to find more opportunities.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Found {jobs.length} Opportunities
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Click on any job to learn more
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {jobs.map((job, index) => (
            <motion.div
              key={job.id || index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4 }}
            >
              <JobCard 
                job={job} 
                onSave={onSaveJob}
                isSaved={isJobSaved(job.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default JobResults;