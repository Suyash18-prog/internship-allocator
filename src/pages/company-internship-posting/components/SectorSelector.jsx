import React from 'react';
import Select from '../../../components/ui/Select';

const SectorSelector = ({ value, onChange, error, required = false }) => {
  const sectorOptions = [
    { value: 'technology', label: 'Technology & Software', description: 'IT, Software Development, Tech Startups' },
    { value: 'finance', label: 'Finance & Banking', description: 'Banking, Insurance, Investment, Fintech' },
    { value: 'healthcare', label: 'Healthcare & Pharmaceuticals', description: 'Medical, Pharma, Biotech, Health Tech' },
    { value: 'education', label: 'Education & EdTech', description: 'Educational Institutions, Online Learning' },
    { value: 'ecommerce', label: 'E-commerce & Retail', description: 'Online Retail, Marketplace, Consumer Goods' },
    { value: 'manufacturing', label: 'Manufacturing & Industrial', description: 'Production, Engineering, Automotive' },
    { value: 'consulting', label: 'Consulting & Professional Services', description: 'Management Consulting, Advisory' },
    { value: 'media', label: 'Media & Entertainment', description: 'Digital Media, Content, Gaming, Advertising' },
    { value: 'nonprofit', label: 'Non-Profit & Social Impact', description: 'NGOs, Social Enterprises, Public Sector' },
    { value: 'energy', label: 'Energy & Sustainability', description: 'Renewable Energy, Clean Tech, Environment' },
    { value: 'logistics', label: 'Logistics & Supply Chain', description: 'Transportation, Warehousing, Delivery' },
    { value: 'realestate', label: 'Real Estate & Construction', description: 'Property, Infrastructure, Architecture' },
    { value: 'agriculture', label: 'Agriculture & Food Tech', description: 'Farming, Food Processing, AgriTech' },
    { value: 'telecommunications', label: 'Telecommunications', description: 'Telecom, Networking, Communication Tech' },
    { value: 'aerospace', label: 'Aerospace & Defense', description: 'Aviation, Space Technology, Defense' },
    { value: 'other', label: 'Other', description: 'Other sectors not listed above' }
  ];

  return (
    <Select
      label="Industry Sector"
      description="Select the industry sector for this internship"
      placeholder="Choose sector..."
      options={sectorOptions}
      value={value}
      onChange={onChange}
      error={error}
      required={required}
      searchable
      className="w-full"
    />
  );
};

export default SectorSelector;