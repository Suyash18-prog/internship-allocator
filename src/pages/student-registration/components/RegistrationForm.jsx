import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import SkillsInput from './SkillsInput';
import LocationSelect from './LocationSelect';
import SectorSelection from './SectorSelection';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    graduationYear: '',
    skills: [],
    location: '',
    sectors: []
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone?.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData?.college?.trim()) {
      newErrors.college = 'College name is required';
    }

    if (!formData?.course?.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData?.graduationYear) {
      newErrors.graduationYear = 'Graduation year is required';
    } else {
      const year = parseInt(formData?.graduationYear);
      const currentYear = new Date()?.getFullYear();
      if (year < currentYear || year > currentYear + 6) {
        newErrors.graduationYear = `Graduation year must be between ${currentYear} and ${currentYear + 6}`;
      }
    }

    if (formData?.skills?.length === 0) {
      newErrors.skills = 'Please add at least one skill';
    } else if (formData?.skills?.length > 15) {
      newErrors.skills = 'Maximum 15 skills allowed';
    }

    if (!formData?.location) {
      newErrors.location = 'Please select your preferred location';
    }

    if (formData?.sectors?.length === 0) {
      newErrors.sectors = 'Please select at least one sector of interest';
    } else if (formData?.sectors?.length > 5) {
      newErrors.sectors = 'Maximum 5 sectors allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Send student data to backend
      const response = await fetch(`/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          college: formData.college,
          course: formData.course,
          graduationYear: formData.graduationYear,
          skills: formData.skills,
          location: formData.location,
          sectors: formData.sectors,
          registrationDate: new Date()?.toISOString(),
          profileCompletion: 100
        })
      });
      if (!response.ok) throw new Error('Failed to save profile');
      // Success feedback
      alert('Registration successful! Redirecting to matchmaking dashboard...');
      navigate('/matchmaking-dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      course: '',
      graduationYear: '',
      skills: [],
      location: '',
      sectors: []
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="9876543210"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
          
          <Input
            label="College/University"
            type="text"
            placeholder="Enter your college name"
            value={formData?.college}
            onChange={(e) => handleInputChange('college', e?.target?.value)}
            error={errors?.college}
            required
          />
          
          <Input
            label="Course/Degree"
            type="text"
            placeholder="e.g., B.Tech Computer Science"
            value={formData?.course}
            onChange={(e) => handleInputChange('course', e?.target?.value)}
            error={errors?.course}
            required
          />
          
          <Input
            label="Expected Graduation Year"
            type="number"
            placeholder="2025"
            min={new Date()?.getFullYear()}
            max={new Date()?.getFullYear() + 6}
            value={formData?.graduationYear}
            onChange={(e) => handleInputChange('graduationYear', e?.target?.value)}
            error={errors?.graduationYear}
            required
          />
        </div>
      </div>
      {/* Skills Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Code" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Skills & Expertise</h3>
        </div>
        
        <SkillsInput
          skills={formData?.skills}
          onChange={(skills) => handleInputChange('skills', skills)}
          error={errors?.skills}
        />
      </div>
      {/* Preferences Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Internship Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <LocationSelect
            value={formData?.location}
            onChange={(location) => handleInputChange('location', location)}
            error={errors?.location}
          />
          
          <SectorSelection
            value={formData?.sectors}
            onChange={(sectors) => handleInputChange('sectors', sectors)}
            error={errors?.sectors}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
          className="flex-1"
        >
          {isLoading ? 'Creating Profile...' : 'Register for Internships'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          iconName="RotateCcw"
          iconPosition="left"
          disabled={isLoading}
          className="sm:w-auto"
        >
          Reset Form
        </Button>
      </div>
      {/* Help Text */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Registration Tips:</p>
            <ul className="space-y-1 text-xs">
              <li>• Add relevant skills to improve your internship matches</li>
              <li>• Select multiple sectors to see more opportunities</li>
              <li>• Your profile will be used for AI-powered internship matching</li>
              <li>• You can update your preferences anytime after registration</li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;