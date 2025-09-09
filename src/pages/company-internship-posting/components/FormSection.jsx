import React from 'react';

const FormSection = ({ title, description, children, className = "" }) => {
  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default FormSection;