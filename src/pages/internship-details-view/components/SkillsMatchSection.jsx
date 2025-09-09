import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsMatchSection = ({ requiredSkills, studentSkills }) => {
  const getSkillStatus = (skill) => {
    const isMatched = studentSkills?.some(studentSkill => 
      studentSkill?.toLowerCase()?.includes(skill?.toLowerCase()) || 
      skill?.toLowerCase()?.includes(studentSkill?.toLowerCase())
    );
    return isMatched;
  };

  const matchedSkills = requiredSkills?.filter(skill => getSkillStatus(skill));
  const unmatchedSkills = requiredSkills?.filter(skill => !getSkillStatus(skill));

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Required Skills</h2>
      <div className="space-y-6">
        {/* Matched Skills */}
        {matchedSkills?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <h3 className="font-medium text-success">Skills You Have ({matchedSkills?.length})</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills?.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-success/10 text-success border border-success/20"
                >
                  <Icon name="Check" size={12} className="mr-1" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unmatched Skills */}
        {unmatchedSkills?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <h3 className="font-medium text-warning">Skills to Develop ({unmatchedSkills?.length})</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {unmatchedSkills?.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-warning/10 text-warning border border-warning/20"
                >
                  <Icon name="Plus" size={12} className="mr-1" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Summary */}
        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Skill Match Rate</span>
            <span className="text-sm font-semibold text-primary">
              {Math.round((matchedSkills?.length / requiredSkills?.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${(matchedSkills?.length / requiredSkills?.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            You match {matchedSkills?.length} out of {requiredSkills?.length} required skills
          </p>
        </div>

        {/* Your Additional Skills */}
        {studentSkills?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Star" size={16} className="text-accent" />
              <h3 className="font-medium text-foreground">Your Additional Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {studentSkills?.filter(skill => !requiredSkills?.some(reqSkill => 
                  reqSkill?.toLowerCase()?.includes(skill?.toLowerCase()) || 
                  skill?.toLowerCase()?.includes(reqSkill?.toLowerCase())
                ))?.slice(0, 8)?.map((skill, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {skill}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsMatchSection;