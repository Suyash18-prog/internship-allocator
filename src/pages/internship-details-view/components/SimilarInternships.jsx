import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SimilarInternships = ({ similarInternships }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Similar Internships</h2>
        <Link to="/matchmaking-dashboard">
          <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {similarInternships?.map((internship) => (
          <div
            key={internship?.id}
            className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-150 group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-border">
                  <Image
                    src={internship?.companyLogo}
                    alt={`${internship?.companyName} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-150 line-clamp-1">
                      {internship?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{internship?.companyName}</p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    <Icon name="Target" size={12} />
                    {internship?.matchScore}%
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    <span>{internship?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    <span>{internship?.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="IndianRupee" size={12} />
                    <span>₹{internship?.stipend?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {internship?.requiredSkills?.slice(0, 3)?.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                  {internship?.requiredSkills?.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                      +{internship?.requiredSkills?.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{internship?.applicationsCount} applications</span>
                    <span>Posted {internship?.postedDaysAgo} days ago</span>
                  </div>
                  <Link to={`/internship-details-view?id=${internship?.id}`}>
                    <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link to="/matchmaking-dashboard">
          <Button variant="outline" iconName="Search" iconPosition="left">
            Explore More Internships
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SimilarInternships;