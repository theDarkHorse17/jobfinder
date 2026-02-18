import { motion } from 'framer-motion';
import SearchForm from '@/components/SearchForm';
import { Sparkles, TrendingUp, Target } from 'lucide-react';

export const HeroSection = ({ onSearch, loading }) => {
  return (
    <div className="relative min-h-[calc(100vh-73px)] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Your Next Opportunity Awaits</span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Find Your Next
            <br />
            <span className="gradient-text">Career Move</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover real opportunities tailored to your experience.
            Your comeback story starts here.
          </p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-12"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-1.5 rounded-md bg-primary/10">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
              <span>Live Job Listings</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-1.5 rounded-md bg-accent/10">
                <Target className="w-4 h-4 text-accent" />
              </div>
              <span>Smart Matching</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <SearchForm onSearch={onSearch} loading={loading} />
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Powered by real-time job data • 100% free to use
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;