import React from 'react';
import Input from '../../../components/ui/Input';
import FormSection from './FormSection';

const CompanyInfoSection = ({ formData, onChange, errors }) => {
  const handleInputChange = (field) => (e) => {
    onChange(field, e?.target?.value);
  };

  return (
    <FormSection
      title="Company Information"
      description="Provide details about your company to help students understand the opportunity"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          type="text"
          placeholder="Enter company name"
          value={formData?.companyName || ''}
          onChange={handleInputChange('companyName')}
          error={errors?.companyName}
          required
        />
        
        <Input
          label="Company Website"
          type="url"
          placeholder="https://www.company.com"
          value={formData?.companyWebsite || ''}
          onChange={handleInputChange('companyWebsite')}
          error={errors?.companyWebsite}
          description="Optional: Company website URL"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="HR Contact Name"
          type="text"
          placeholder="Enter HR contact name"
          value={formData?.hrContactName || ''}
          onChange={handleInputChange('hrContactName')}
          error={errors?.hrContactName}
          required
        />
        
        <Input
          label="Contact Email"
          type="email"
          placeholder="hr@company.com"
          value={formData?.contactEmail || ''}
          onChange={handleInputChange('contactEmail')}
          error={errors?.contactEmail}
          required
        />
      </div>
      <Input
        label="Company Size"
        type="text"
        placeholder="e.g., 50-100 employees"
        value={formData?.companySize || ''}
        onChange={handleInputChange('companySize')}
        error={errors?.companySize}
        description="Approximate number of employees"
      />
    </FormSection>
  );
};

export default CompanyInfoSection;