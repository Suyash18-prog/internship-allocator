import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Ahmedabad', label: 'Ahmedabad' },
    { value: 'Remote', label: 'Remote' }
  ];

  const sectorOptions = [
    { value: '', label: 'All Sectors' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Media', label: 'Media' },
    { value: 'Government', label: 'Government' }
  ];

  const minScoreOptions = [
    { value: '', label: 'Any Match Score' },
    { value: '90', label: '90%+ Match' },
    { value: '80', label: '80%+ Match' },
    { value: '70', label: '70%+ Match' },
    { value: '60', label: '60%+ Match' },
    { value: '50', label: '50%+ Match' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value && value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="text-lg font-semibold text-foreground">Filter Internships</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by company name or internship title..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Quick Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location || ''}
          onChange={(value) => handleFilterChange('location', value)}
          placeholder="Select location"
        />
        
        <Select
          label="Sector"
          options={sectorOptions}
          value={filters?.sector || ''}
          onChange={(value) => handleFilterChange('sector', value)}
          placeholder="Select sector"
        />
        
        <Select
          label="Minimum Match Score"
          options={minScoreOptions}
          value={filters?.minScore || ''}
          onChange={(value) => handleFilterChange('minScore', value)}
          placeholder="Select minimum score"
        />
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Duration Filter */}
            <Select
              label="Duration"
              options={[
                { value: '', label: 'Any Duration' },
                { value: '1-3 months', label: '1-3 months' },
                { value: '3-6 months', label: '3-6 months' },
                { value: '6+ months', label: '6+ months' }
              ]}
              value={filters?.duration || ''}
              onChange={(value) => handleFilterChange('duration', value)}
            />

            {/* Stipend Filter */}
            <Select
              label="Stipend Range"
              options={[
                { value: '', label: 'Any Stipend' },
                { value: '0-10000', label: '₹0 - ₹10,000' },
                { value: '10000-25000', label: '₹10,000 - ₹25,000' },
                { value: '25000-50000', label: '₹25,000 - ₹50,000' },
                { value: '50000+', label: '₹50,000+' }
              ]}
              value={filters?.stipend || ''}
              onChange={(value) => handleFilterChange('stipend', value)}
            />

            {/* Company Size */}
            <Select
              label="Company Size"
              options={[
                { value: '', label: 'Any Size' },
                { value: 'startup', label: 'Startup (1-50)' },
                { value: 'medium', label: 'Medium (51-500)' },
                { value: 'large', label: 'Large (500+)' }
              ]}
              value={filters?.companySize || ''}
              onChange={(value) => handleFilterChange('companySize', value)}
            />

            {/* Work Mode */}
            <Select
              label="Work Mode"
              options={[
                { value: '', label: 'Any Mode' },
                { value: 'remote', label: 'Remote' },
                { value: 'onsite', label: 'On-site' },
                { value: 'hybrid', label: 'Hybrid' }
              ]}
              value={filters?.workMode || ''}
              onChange={(value) => handleFilterChange('workMode', value)}
            />
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters)?.map(([key, value]) => {
              if (!value || value === '') return null;
              
              let displayValue = value;
              if (key === 'minScore') displayValue = `${value}%+ Match`;
              if (key === 'search') displayValue = `"${value}"`;
              
              return (
                <span
                  key={key}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  <span>{displayValue}</span>
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;