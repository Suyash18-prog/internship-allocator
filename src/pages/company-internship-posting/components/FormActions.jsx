import React from 'react';
import Button from '../../../components/ui/Button';


const FormActions = ({ 
  onSubmit, 
  onSaveDraft, 
  isSubmitting = false, 
  isSavingDraft = false,
  canSubmit = false 
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
      <div className="flex-1 space-y-3 sm:space-y-0 sm:flex sm:gap-3">
        <Button
          variant="outline"
          onClick={onSaveDraft}
          loading={isSavingDraft}
          iconName="Save"
          iconPosition="left"
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          Save Draft
        </Button>
        
        <Button
          variant="default"
          onClick={onSubmit}
          loading={isSubmitting}
          iconName="Send"
          iconPosition="left"
          className="w-full sm:flex-1"
          disabled={!canSubmit || isSavingDraft}
        >
          Post Internship
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground sm:text-right">
        <p>By posting, you agree to our terms and conditions.</p>
        <p>Your internship will be visible to students immediately.</p>
      </div>
    </div>
  );
};

export default FormActions;