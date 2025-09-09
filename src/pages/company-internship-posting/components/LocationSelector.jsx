import React from 'react';
import Select from '../../../components/ui/Select';

const LocationSelector = ({ value, onChange, error, required = false }) => {
  const locationOptions = [
    { value: 'mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'delhi', label: 'New Delhi, Delhi' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana' },
    { value: 'pune', label: 'Pune, Maharashtra' },
    { value: 'chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'kolkata', label: 'Kolkata, West Bengal' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'surat', label: 'Surat, Gujarat' },
    { value: 'lucknow', label: 'Lucknow, Uttar Pradesh' },
    { value: 'kanpur', label: 'Kanpur, Uttar Pradesh' },
    { value: 'nagpur', label: 'Nagpur, Maharashtra' },
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'thane', label: 'Thane, Maharashtra' },
    { value: 'bhopal', label: 'Bhopal, Madhya Pradesh' },
    { value: 'visakhapatnam', label: 'Visakhapatnam, Andhra Pradesh' },
    { value: 'pimpri', label: 'Pimpri-Chinchwad, Maharashtra' },
    { value: 'patna', label: 'Patna, Bihar' },
    { value: 'vadodara', label: 'Vadodara, Gujarat' },
    { value: 'ghaziabad', label: 'Ghaziabad, Uttar Pradesh' },
    { value: 'ludhiana', label: 'Ludhiana, Punjab' },
    { value: 'agra', label: 'Agra, Uttar Pradesh' },
    { value: 'nashik', label: 'Nashik, Maharashtra' },
    { value: 'faridabad', label: 'Faridabad, Haryana' },
    { value: 'meerut', label: 'Meerut, Uttar Pradesh' },
    { value: 'rajkot', label: 'Rajkot, Gujarat' },
    { value: 'kalyan', label: 'Kalyan-Dombivali, Maharashtra' },
    { value: 'vasai', label: 'Vasai-Virar, Maharashtra' },
    { value: 'varanasi', label: 'Varanasi, Uttar Pradesh' },
    { value: 'remote', label: 'Remote Work' },
    { value: 'hybrid', label: 'Hybrid (Office + Remote)' }
  ];

  return (
    <Select
      label="Internship Location"
      description="Select the primary location for this internship"
      placeholder="Choose location..."
      options={locationOptions}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      searchable
      className="w-full"
    />
  );
};

export default LocationSelector;