import React from 'react';
import Select from '../../../components/ui/Select';

const SectorSelection = ({ value, onChange, error }) => {
  const sectors = [
    { 
      value: 'technology', 
      label: 'Technology & IT',
      description: 'Software development, AI, cybersecurity, data science'
    },
    { 
      value: 'finance', 
      label: 'Finance & Banking',
      description: 'Investment banking, fintech, accounting, insurance'
    },
    { 
      value: 'healthcare', 
      label: 'Healthcare & Pharmaceuticals',
      description: 'Medical research, biotechnology, healthcare services'
    },
    { 
      value: 'manufacturing', 
      label: 'Manufacturing & Engineering',
      description: 'Automotive, aerospace, industrial engineering'
    },
    { 
      value: 'consulting', 
      label: 'Consulting & Strategy',
      description: 'Management consulting, business strategy, operations'
    },
    { 
      value: 'marketing', 
      label: 'Marketing & Advertising',
      description: 'Digital marketing, brand management, content creation'
    },
    { 
      value: 'retail', 
      label: 'Retail & E-commerce',
      description: 'Online retail, supply chain, customer experience'
    },
    { 
      value: 'media', 
      label: 'Media & Entertainment',
      description: 'Content production, journalism, digital media'
    },
    { 
      value: 'education', 
      label: 'Education & Training',
      description: 'EdTech, curriculum development, corporate training'
    },
    { 
      value: 'nonprofit', 
      label: 'Non-profit & Social Impact',
      description: 'NGOs, social enterprises, community development'
    },
    { 
      value: 'energy', 
      label: 'Energy & Sustainability',
      description: 'Renewable energy, environmental consulting, green tech'
    },
    { 
      value: 'telecommunications', 
      label: 'Telecommunications',
      description: '5G networks, telecom infrastructure, mobile services'
    },
    { 
      value: 'agriculture', 
      label: 'Agriculture & Food Tech',
      description: 'AgTech, food processing, sustainable farming'
    },
    { 
      value: 'transportation', 
      label: 'Transportation & Logistics',
      description: 'Supply chain, logistics, mobility solutions'
    },
    { 
      value: 'realestate', 
      label: 'Real Estate & Construction',
      description: 'Property development, construction tech, urban planning'
    },
    { 
      value: 'government', 
      label: 'Government & Public Sector',
      description: 'Public administration, policy research, civic tech'
    },
    { 
      value: 'sports', 
      label: 'Sports & Fitness',
      description: 'Sports management, fitness tech, athletic performance'
    },
    { 
      value: 'travel', 
      label: 'Travel & Hospitality',
      description: 'Tourism, hotel management, travel technology'
    }
  ];

  return (
    <Select
      label="Sector Interest"
      description="Select sectors you're interested in for internships"
      placeholder="Choose sectors..."
      options={sectors}
      value={value}
      onChange={onChange}
      error={error}
      multiple
      searchable
      clearable
      required
      className="w-full"
    />
  );
};

export default SectorSelection;