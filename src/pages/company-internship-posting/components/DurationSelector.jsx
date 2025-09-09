import React from 'react';
import Select from '../../../components/ui/Select';

const DurationSelector = ({ value, onChange, error, required = false }) => {
  const durationOptions = [
    { value: '1', label: '1 Month', description: 'Short-term project-based internship' },
    { value: '2', label: '2 Months', description: 'Standard summer internship duration' },
    { value: '3', label: '3 Months', description: 'Most common internship duration' },
    { value: '4', label: '4 Months', description: 'Extended learning opportunity' },
    { value: '5', label: '5 Months', description: 'Comprehensive skill development' },
    { value: '6', label: '6 Months', description: 'Full semester internship program' },
    { value: '9', label: '9 Months', description: 'Academic year internship' },
    { value: '12', label: '12 Months', description: 'Full-year internship program' },
    { value: 'flexible', label: 'Flexible Duration', description: 'Duration can be adjusted based on performance' }
  ];

  return (
    <Select
      label="Internship Duration"
      description="Select the expected duration for this internship"
      placeholder="Choose duration..."
      options={durationOptions}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      className="w-full"
    />
  );
};

export default DurationSelector;