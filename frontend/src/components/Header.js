import { motion } from 'framer-motion';
import { Briefcase, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Header = ({ savedJobsCount = 0 }) => {
  const handleViewSaved = () => {
    const savedJobs = localStorage.getItem('savedJobs');
    if (savedJobs) {
      console.log('Saved Jobs:', JSON.parse(savedJobs));
      // In a full implementation, this would open a modal or navigate to saved jobs page
      alert(`You have ${savedJobsCount} saved jobs. Check console for details.`);
    } else {
      alert('No saved jobs yet!');
    }
  };

  return (
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
            <Badge 
              variant="default" 
              className="ml-2 bg-primary text-primary-foreground h-5 px-1.5 text-xs"
            >
              {savedJobsCount}
            </Badge>
          )}
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;