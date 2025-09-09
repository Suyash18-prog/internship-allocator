import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SkillsInput = ({ value = [], onChange, error, required = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const skillSuggestions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'HTML', 'CSS',
    'TypeScript', 'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
    'Kotlin', 'Flutter', 'React Native', 'MongoDB', 'MySQL', 'PostgreSQL',
    'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'Jenkins',
    'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX Design',
    'Product Management', 'Data Analysis', 'Machine Learning', 'AI',
    'Digital Marketing', 'SEO', 'Content Writing', 'Social Media Marketing'
  ];

  useEffect(() => {
    if (inputValue?.trim()) {
      const filtered = skillSuggestions?.filter(skill =>
        skill?.toLowerCase()?.includes(inputValue?.toLowerCase()) &&
        !value?.includes(skill)
      );
      setSuggestions(filtered?.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, value]);

  const handleInputChange = (e) => {
    setInputValue(e?.target?.value);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      e?.preventDefault();
      addSkill(inputValue?.trim());
    } else if (e?.key === 'Backspace' && !inputValue && value?.length > 0) {
      removeSkill(value?.length - 1);
    }
  };

  const addSkill = (skill) => {
    if (skill && !value?.includes(skill)) {
      onChange([...value, skill]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeSkill = (index) => {
    const newSkills = value?.filter((_, i) => i !== index);
    onChange(newSkills);
  };

  const handleSuggestionClick = (skill) => {
    addSkill(skill);
    inputRef?.current?.focus();
  };

  return (
    <div className="relative">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Required Skills {required && <span className="text-error">*</span>}
        </label>
        <p className="text-xs text-muted-foreground">
          Type skills and press Enter or comma to add. Click suggestions to add quickly.
        </p>
        
        {/* Skills Display */}
        {value?.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md border border-border">
            {value?.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="hover:bg-primary/80 rounded-full p-0.5 transition-colors"
                >
                  <Icon name="X" size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Input Field */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter or comma..."
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
              {suggestions?.map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(skill)}
                  className="w-full px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
};

export default SkillsInput;