import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FooterSection from '../home-landing/components/FooterSection';
import Input from '../../components/ui/Input';

import Icon from '../../components/AppIcon';
import FormSection from './components/FormSection';
import SkillsInput from './components/SkillsInput';
import LocationSelector from './components/LocationSelector';
import SectorSelector from './components/SectorSelector';
import DurationSelector from './components/DurationSelector';
import StipendInput from './components/StipendInput';
import FormActions from './components/FormActions';
import CompanyInfoSection from './components/CompanyInfoSection';


const CompanyInternshipPosting = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, formState: { errors }, reset, setError } = useForm({
    defaultValues: {
      companyName: '',
      companyWebsite: '',
      hrContactName: '',
      contactEmail: '',
      companySize: '',
      internshipTitle: '',
      requiredSkills: [],
      location: '',
      sector: '',
      duration: '',
      capacity: '',
      stipend: '',
      description: '',
      requirements: '',
      benefits: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock existing internships for demonstration
  const [existingInternships] = useState([
    {
      id: 1,
      companyName: 'TechCorp Solutions',
      internshipTitle: 'Frontend Developer Intern',
      location: 'bangalore',
      sector: 'technology',
      capacity: 5,
      postedDate: '2025-01-08'
    },
    {
      id: 2,
      companyName: 'FinanceFlow Ltd',
      internshipTitle: 'Data Analyst Intern',
      location: 'mumbai',
      sector: 'finance',
      capacity: 3,
      postedDate: '2025-01-07'
    }
  ]);

  useEffect(() => {
    // Load draft from localStorage if exists
    const savedDraft = localStorage.getItem('internship-draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        reset(draftData);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, [reset]);

  const handleInputChange = (field, value) => {
    setValue(field, value);
  };



  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: data.internshipTitle,
          company: data.companyName,
          location: data.location,
          sector: data.sector,
          duration: String(data.duration),
          stipend: data.stipend ? parseInt(data.stipend, 10) : null,
          description: data.description,
          requirements: data.requirements || null,
          benefits: data.benefits || null,
          capacity: parseInt(data.capacity, 10),
          postedBy: 1 // TODO: Replace with actual user id
        })
      });
      if (!response.ok) throw new Error('Failed to post internship');
      localStorage.removeItem('internship-draft');
      setShowSuccessMessage(true);
      reset();
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/matchmaking-dashboard');
      }, 3000);
    } catch (error) {
      setError('submit', { type: 'manual', message: error.message || 'Failed to post internship. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      localStorage.setItem('internship-draft', JSON.stringify(getValues()));
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeout(() => {
        setIsSavingDraft(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setTimeout(() => setIsSavingDraft(false), 1000);
    }
  };

  const canSubmit = getValues('companyName') && getValues('internshipTitle') && 
                   getValues('requiredSkills')?.length > 0 && getValues('location') && 
                   getValues('sector') && getValues('duration') && getValues('capacity') && 
                   getValues('description') && getValues('hrContactName') && getValues('contactEmail');

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <Header />
        <main className="flex-1 pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center justify-center">
            <div className="bg-card rounded-lg shadow-md p-8 w-full max-w-lg text-center animate-fade-in">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Internship Posted Successfully!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your internship opportunity has been posted and is now visible to students. 
                You'll be redirected to the dashboard shortly.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Redirecting in 3 seconds...</span>
              </div>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="Plus" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Post New Internship</h1>
                <p className="text-muted-foreground">
                  Create a detailed internship opportunity to connect with talented students
                </p>
              </div>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{existingInternships?.length}</p>
                <p className="text-sm text-muted-foreground">Active Postings</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">1,247</p>
                <p className="text-sm text-muted-foreground">Registered Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">89%</p>
                <p className="text-sm text-muted-foreground">Match Success Rate</p>
              </div>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Company Information Section */}
            <CompanyInfoSection
              formData={getValues()}
              onChange={handleInputChange}
              errors={errors}
            />

            {/* Internship Details Section */}
            <FormSection
              title="Internship Details"
              description="Provide comprehensive details about the internship opportunity"
            >
              <Input
                label="Internship Title"
                type="text"
                placeholder="e.g., Frontend Developer Intern, Data Science Intern"
                value={getValues('internshipTitle')}
                onChange={(e) => handleInputChange('internshipTitle', e?.target?.value)}
                error={errors?.internshipTitle?.message}
                required
                description="Create a clear, descriptive title that attracts the right candidates"
                {...register('internshipTitle', { required: 'Internship title is required' })}
              />

              <SkillsInput
                value={getValues('requiredSkills')}
                onChange={(skills) => handleInputChange('requiredSkills', skills)}
                error={errors?.requiredSkills?.message}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LocationSelector
                  value={getValues('location')}
                  onChange={(location) => handleInputChange('location', location)}
                  error={errors?.location?.message}
                  required
                />

                <SectorSelector
                  value={getValues('sector')}
                  onChange={(sector) => handleInputChange('sector', sector)}
                  error={errors?.sector?.message}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DurationSelector
                  value={getValues('duration')}
                  onChange={(duration) => handleInputChange('duration', duration)}
                  error={errors?.duration?.message}
                  required
                />

                <Input
                  label="Number of Positions"
                  type="number"
                  placeholder="e.g., 5"
                  value={getValues('capacity')}
                  onChange={(e) => handleInputChange('capacity', e?.target?.value)}
                  error={errors?.capacity?.message}
                  required
                  min="1"
                  max="50"
                  description="How many interns will you hire?"
                  {...register('capacity', { required: 'Capacity is required', min: { value: 1, message: 'Capacity must be at least 1' } })}
                />

                <StipendInput
                  value={getValues('stipend')}
                  onChange={(stipend) => handleInputChange('stipend', stipend)}
                  error={errors?.stipend?.message}
                />
              </div>
            </FormSection>

            {/* Detailed Description Section */}
            <FormSection
              title="Detailed Information"
              description="Provide comprehensive information to help students understand the opportunity"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Internship Description <span className="text-error">*</span>
                  </label>
                  <textarea
                    placeholder={`Describe the internship opportunity in detail. Include:\n• What the intern will work on\n• Learning objectives and outcomes\n• Team structure and mentorship\n• Project examples or case studies\n• Growth opportunities`}
                    value={getValues('description')}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    {...register('description', { required: 'Description is required', minLength: { value: 50, message: 'Description must be at least 50 characters' } })}
                  />
                  {errors?.description && (
                    <p className="mt-1 text-sm text-error">{errors?.description.message}</p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    Minimum 50 characters. Current: {getValues('description')?.length}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Requirements & Qualifications
                  </label>
                  <textarea
                    placeholder={`List specific requirements:\n• Educational background (e.g., pursuing Computer Science)\n• Technical skills and proficiency levels\n• Soft skills and personal qualities\n• Previous experience (if any)\n• Language requirements`}
                    value={getValues('requirements')}
                    onChange={(e) => handleInputChange('requirements', e?.target?.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    {...register('requirements')}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Optional: Specify additional requirements beyond the skills listed above
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Benefits & Perks
                  </label>
                  <textarea
                    placeholder={`Highlight what makes this internship attractive:\n• Learning and development opportunities\n• Mentorship and guidance\n• Networking opportunities\n• Potential for full-time conversion\n• Additional perks (flexible hours, remote work, etc.)`}
                    value={getValues('benefits')}
                    onChange={(e) => handleInputChange('benefits', e?.target?.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                    {...register('benefits')}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Optional: Describe the benefits and learning opportunities
                  </p>
                </div>
              </div>
            </FormSection>

            {/* Form Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <FormActions
                onSubmit={handleSubmit(onSubmit)}
                onSaveDraft={handleSaveDraft}
                isSubmitting={isSubmitting}
                isSavingDraft={isSavingDraft}
                canSubmit={canSubmit}
              />
              {errors?.submit && (
                <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-md">
                  <p className="text-sm text-error">{errors?.submit.message}</p>
                </div>
              )}
            </div>
          </form>

          {/* Recent Postings Preview */}
          {existingInternships?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Recent Postings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {existingInternships?.map((internship) => (
                  <div key={internship?.id} className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">{internship?.internshipTitle}</h3>
                      <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{internship?.companyName}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{internship?.capacity} positions</span>
                      <span>Posted {internship?.postedDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInternshipPosting;
