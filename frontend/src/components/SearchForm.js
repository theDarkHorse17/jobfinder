import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Loader2, Briefcase, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const SearchForm = ({ onSearch, loading, compact = false }) => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    location: 'Remote',
    jobType: 'Full-time'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.role.trim()) {
      toast.error('Please enter a job role');
      return;
    }
    
    if (!formData.experience) {
      toast.error('Please select your experience level');
      return;
    }
    
    onSearch(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (compact) {
    return (
      <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <Input
                  placeholder="Job Role"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="bg-background/50"
                  disabled={loading}
                />
              </div>
              
              <div>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => handleChange('experience', value)}
                  disabled={loading}
                >
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry">Entry Level</SelectItem>
                    <SelectItem value="1-3 years">1-3 Years</SelectItem>
                    <SelectItem value="3-5 years">3-5 Years</SelectItem>
                    <SelectItem value="5+ years">5+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="bg-background/50"
                  disabled={loading}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card/80 backdrop-blur-md border-border shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <CardContent className="p-8 relative z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Input */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Job Role
                </Label>
                <Input
                  id="role"
                  placeholder="e.g., Software Engineer, Product Manager"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                  disabled={loading}
                  required
                />
              </div>

              {/* Experience Select */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Experience Level
                </Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) => handleChange('experience', value)}
                  disabled={loading}
                  required
                >
                  <SelectTrigger id="experience" className="h-12 bg-background/50 border-border focus:border-primary">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry">Entry Level</SelectItem>
                    <SelectItem value="1-3 years">1-3 Years</SelectItem>
                    <SelectItem value="3-5 years">3-5 Years</SelectItem>
                    <SelectItem value="5+ years">5+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="Remote, New York, London..."
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                  disabled={loading}
                />
              </div>

              {/* Job Type Select */}
              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-sm font-medium">
                  Job Type
                </Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleChange('jobType', value)}
                  disabled={loading}
                >
                  <SelectTrigger id="jobType" className="h-12 bg-background/50 border-border focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Searching Opportunities...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search Opportunities
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SearchForm;