import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, DollarSign, ExternalLink, Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const JobCard = ({ job, onSave, isSaved }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleApply = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      console.log('Job link clicked:', job.title);
      // TODO: Integrate analytics here
      toast.success('Opening application page...');
    }
  };

  const handleSave = () => {
    onSave(job);
    if (!isSaved) {
      toast.success('Job saved!');
    } else {
      toast.info('Job removed from saved');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 flex flex-col overflow-hidden group">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="hover:bg-primary/10 shrink-0"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-primary fill-primary" />
              ) : (
                <Bookmark className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">{job.company}</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-3 relative space-y-3">
          {job.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              <span>{job.location}</span>
            </div>
          )}

          {job.salary && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {job.salary}
              </Badge>
            </div>
          )}
        </CardContent>

        <CardFooter className="relative pt-3 mt-auto">
          <Button
            onClick={() => handleApply(job.apply_url)}
            disabled={!job.apply_url}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group/btn transition-all"
          >
            <span>Apply Now</span>
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default JobCard;