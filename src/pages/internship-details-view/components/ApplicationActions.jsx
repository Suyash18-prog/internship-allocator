import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationActions = ({ internship, onApply, onExpressInterest, onSave, isSaved }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const handleApplyClick = async () => {
    setIsApplying(true);
    try {
      await onApply(internship?.id);
      setApplicationStatus('success');
      setTimeout(() => {
        setApplicationStatus(null);
        setShowApplicationModal(false);
      }, 2000);
    } catch (error) {
      setApplicationStatus('error');
    } finally {
      setIsApplying(false);
    }
  };

  const handleExpressInterest = async () => {
    try {
      await onExpressInterest(internship?.id);
      setApplicationStatus('interest');
      setTimeout(() => setApplicationStatus(null), 2000);
    } catch (error) {
      setApplicationStatus('error');
    }
  };

  const isDeadlinePassed = new Date(internship.applicationDeadline) < new Date();
  const daysLeft = Math.ceil((new Date(internship.applicationDeadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <div className="space-y-4">
        {/* Application Deadline */}
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Clock" size={16} className={isDeadlinePassed ? "text-error" : "text-warning"} />
            <span className="font-medium text-foreground">Application Deadline</span>
          </div>
          <div className="text-lg font-semibold text-foreground mb-1">
            {internship?.applicationDeadline}
          </div>
          <div className={`text-sm ${isDeadlinePassed ? "text-error" : daysLeft <= 3 ? "text-warning" : "text-success"}`}>
            {isDeadlinePassed ? "Deadline passed" : `${daysLeft} days left`}
          </div>
        </div>

        {/* Application Status */}
        {applicationStatus && (
          <div className={`p-4 rounded-lg text-center ${
            applicationStatus === 'success' ? 'bg-success/10 text-success' :
            applicationStatus === 'interest'? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'
          }`}>
            <Icon 
              name={
                applicationStatus === 'success' ? "CheckCircle" :
                applicationStatus === 'interest' ? "Heart" : "AlertCircle"
              } 
              size={20} 
              className="mx-auto mb-2" 
            />
            <p className="font-medium">
              {applicationStatus === 'success' && "Application submitted successfully!"}
              {applicationStatus === 'interest' && "Interest expressed successfully!"}
              {applicationStatus === 'error' && "Something went wrong. Please try again."}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isDeadlinePassed ? (
            <>
              <Button
                variant="default"
                size="lg"
                fullWidth
                loading={isApplying}
                iconName="Send"
                iconPosition="left"
                onClick={handleApplyClick}
                disabled={applicationStatus === 'success'}
              >
                {applicationStatus === 'success' ? 'Application Submitted' : 'Apply Now'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                fullWidth
                iconName="Heart"
                iconPosition="left"
                onClick={handleExpressInterest}
                disabled={applicationStatus === 'interest'}
              >
                {applicationStatus === 'interest' ? 'Interest Expressed' : 'Express Interest'}
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="lg"
              fullWidth
              disabled
              iconName="Clock"
              iconPosition="left"
            >
              Application Closed
            </Button>
          )}

          <Button
            variant="ghost"
            size="lg"
            fullWidth
            iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
            iconPosition="left"
            onClick={onSave}
            className={isSaved ? "text-accent" : ""}
          >
            {isSaved ? 'Saved' : 'Save for Later'}
          </Button>
        </div>

        {/* Application Requirements */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">Application Requirements</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Icon name="FileText" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Updated Resume</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Cover Letter</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="GraduationCap" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Academic Transcripts</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Award" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Portfolio (if applicable)</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">Quick Stats</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted rounded">
              <div className="text-sm font-semibold text-foreground">{internship?.applicationsCount}</div>
              <div className="text-xs text-muted-foreground">Applications</div>
            </div>
            <div className="text-center p-2 bg-muted rounded">
              <div className="text-sm font-semibold text-foreground">{internship?.viewsCount}</div>
              <div className="text-xs text-muted-foreground">Views</div>
            </div>
          </div>
        </div>

        {/* Share Options */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">Share This Internship</h4>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              iconName="Share2"
              onClick={() => navigator.share && navigator.share({
                title: internship?.title,
                text: `Check out this internship at ${internship?.companyName}`,
                url: window.location?.href
              })}
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="Copy"
              onClick={() => navigator.clipboard?.writeText(window.location?.href)}
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="Mail"
              onClick={() => window.location.href = `mailto:?subject=${internship?.title}&body=Check out this internship: ${window.location?.href}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationActions;