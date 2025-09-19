import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileEditForm = ({ student, onSave, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: student?.name,
    email: student?.email,
    phone: student?.phone,
    location: student?.location,
    skills: student?.skills?.join(', '),
    sectors: student?.sectors,
    notificationPrefs: student?.notificationPrefs || {
      applicationStatus: true,
      general: true
    }
  });
  const handleNotifPrefChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notificationPrefs: {
        ...prev.notificationPrefs,
        [type]: !prev.notificationPrefs[type]
      }
    }));
  };

  const [errors, setErrors] = useState({});

  const locationOptions = [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Jaipur', label: 'Jaipur' },
    { value: 'Lucknow', label: 'Lucknow' }
  ];

  const sectorOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Education', label: 'Education' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Media', label: 'Media' },
    { value: 'Government', label: 'Government' },
    { value: 'Non-Profit', label: 'Non-Profit' }
  ];

  const suggestedSkills = [
    'Project Management', 'Data Analysis', 'Communication', 'Leadership',
    'Problem Solving', 'Strategic Planning', 'Agile Methodology', 'Stakeholder Management',
    'Risk Management', 'Business Analysis', 'Digital Marketing', 'Product Management'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const addSuggestedSkill = (skill) => {
    const currentSkills = formData?.skills?.split(',')?.map(s => s?.trim())?.filter(s => s);
    if (!currentSkills?.includes(skill)) {
      const newSkills = [...currentSkills, skill]?.join(', ');
      handleInputChange('skills', newSkills);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.location) {
      newErrors.location = 'Location preference is required';
    }

    if (!formData?.skills?.trim()) {
      newErrors.skills = 'At least one skill is required';
    }

    if (formData?.sectors?.length === 0) {
      newErrors.sectors = 'At least one sector interest is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const updatedStudent = {
        ...student,
        ...formData,
        skills: formData?.skills?.split(',')?.map(s => s?.trim())?.filter(s => s),
        notificationPrefs: formData.notificationPrefs
      };
      onSave(updatedStudent);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Edit" size={20} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Edit Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
            <Select
              label="Location Preference"
              options={locationOptions}
              value={formData?.location}
              onChange={(value) => handleInputChange('location', value)}
              error={errors?.location}
              required
            />
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Skills
          </h3>
          <Input
            label="Skills (comma-separated)"
            type="text"
            value={formData?.skills}
            onChange={(e) => handleInputChange('skills', e?.target?.value)}
            placeholder="e.g., Project Management, Data Analysis, Communication"
            description="Enter your skills separated by commas"
            error={errors?.skills}
            required
          />
          
          {/* Suggested Skills */}
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground mb-2">Suggested Skills:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills?.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSuggestedSkill(skill)}
                  className="px-3 py-1 text-sm bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-colors duration-150 border border-border"
                >
                  + {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Interests */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Sector Interests
          </h3>
          <Select
            label="Select Sectors"
            options={sectorOptions}
            value={formData?.sectors}
            onChange={(value) => handleInputChange('sectors', value)}
            multiple
            searchable
            error={errors?.sectors}
            description="Choose sectors you're interested in for internships"
            required
          />
        </div>

        {/* Notification Settings */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Notification Settings
          </h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPrefs.applicationStatus}
                onChange={() => handleNotifPrefChange('applicationStatus')}
                className="form-checkbox h-4 w-4 text-primary"
              />
              <span className="text-sm">Application status updates</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notificationPrefs.general}
                onChange={() => handleNotifPrefChange('general')}
                className="form-checkbox h-4 w-4 text-primary"
              />
              <span className="text-sm">General platform updates</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            iconName="X"
            iconPosition="left"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;