import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InternshipDescription = ({ internship }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncateText = (text, maxLength = 300) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">About This Internship</h2>
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="font-medium text-foreground mb-2">Description</h3>
          <div className="text-muted-foreground leading-relaxed">
            {showFullDescription ? (
              <p className="whitespace-pre-line">{internship?.description}</p>
            ) : (
              <p>{truncateText(internship?.description)}</p>
            )}
            {internship?.description?.length > 300 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDescription}
                className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>
        </div>

        {/* Key Responsibilities */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Key Responsibilities</h3>
          <ul className="space-y-2">
            {internship?.responsibilities?.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-3">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Learning Outcomes */}
        <div>
          <h3 className="font-medium text-foreground mb-3">What You'll Learn</h3>
          <ul className="space-y-2">
            {internship?.learningOutcomes?.map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Requirements</h3>
          <ul className="space-y-2">
            {internship?.requirements?.map((requirement, index) => (
              <li key={index} className="flex items-start gap-3">
                <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Benefits & Perks</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {internship?.benefits?.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Icon name="Gift" size={16} className="text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDescription;