import React from 'react';
import Input from '../../../components/ui/Input';

const StipendInput = ({ value, onChange, error }) => {
  const handleStipendChange = (e) => {
    const inputValue = e?.target?.value;
    // Allow only numbers and format as currency
    const numericValue = inputValue?.replace(/[^\d]/g, '');
    onChange(numericValue);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '';
    const num = parseInt(amount);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(num);
  };

  return (
    <div className="space-y-2">
      <Input
        label="Monthly Stipend"
        type="text"
        placeholder="Enter amount in INR"
        value={value ? formatCurrency(value) : ''}
        onChange={handleStipendChange}
        description="Enter the monthly stipend amount. Leave blank if unpaid internship."
        error={error}
        className="w-full"
      />
      
      {value && (
        <div className="text-xs text-muted-foreground">
          Amount: {formatCurrency(value)} per month
        </div>
      )}
    </div>
  );
};

export default StipendInput;