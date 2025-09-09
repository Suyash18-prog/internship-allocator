import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsInput = ({ skills, onChange, error }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const commonSkills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'HTML', 'CSS', 'SQL',
    'MongoDB', 'Express.js', 'Git', 'AWS', 'Docker', 'TypeScript', 'Angular',
    'Vue.js', 'PHP', 'Laravel', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Redis',
    'GraphQL', 'REST API', 'Microservices', 'Agile', 'Scrum', 'JIRA', 'Figma',
    'Adobe XD', 'Photoshop', 'UI/UX Design', 'Product Management', 'Data Analysis',
    'Machine Learning', 'AI', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Pandas',
    'NumPy', 'R', 'Tableau', 'Power BI', 'Excel', 'Digital Marketing', 'SEO',
    'Content Writing', 'Social Media Marketing', 'Google Analytics', 'Facebook Ads',
    'Google Ads', 'Email Marketing', 'Copywriting', 'Brand Management'
  ];

  useEffect(() => {
    if (inputValue?.length > 0) {
      const filtered = commonSkills?.filter(skill =>
        skill?.toLowerCase()?.includes(inputValue?.toLowerCase()) &&
        !skills?.includes(skill)
      );
      setSuggestions(filtered?.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, skills]);

  const handleInputChange = (e) => {
    setInputValue(e?.target?.value);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' || e?.key === ',') {
      e?.preventDefault();
      addSkill();
    } else if (e?.key === 'Backspace' && inputValue === '' && skills?.length > 0) {
      removeSkill(skills?.length - 1);
    }
  };

  const addSkill = (skillToAdd = null) => {
    const skill = skillToAdd || inputValue?.trim();
    if (skill && !skills?.includes(skill)) {
      onChange([...skills, skill]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const removeSkill = (index) => {
    const newSkills = skills?.filter((_, i) => i !== index);
    onChange(newSkills);
  };

  const handleSuggestionClick = (skill) => {
    addSkill(skill);
    inputRef?.current?.focus();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Skills <span className="text-error">*</span>
      </label>
      <div className="relative">
        <div className={`
          min-h-[42px] w-full rounded-md border bg-input px-3 py-2 text-sm
          ${error ? 'border-error' : 'border-border'}
          focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent
          flex flex-wrap gap-2 items-center
        `}>
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-md"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="hover:bg-primary/80 rounded-full p-0.5 transition-colors"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={skills?.length === 0 ? "Type skills and press Enter or comma to add..." : "Add more skills..."}
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
        
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
            {suggestions?.map((skill, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(skill)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between"
              >
                <span>{skill}</span>
                <Icon name="Plus" size={14} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground">
        Type skills and press Enter or comma to add them. Click suggestions to add quickly.
      </p>
      {error && (
        <p className="text-sm text-error flex items-center gap-1">
          <Icon name="AlertCircle" size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export default SkillsInput;