// Simple recommendation engine based on Jaccard similarity of skills and preference filters

function normalize(arr) {
  return Array.from(new Set((arr || []).map(s => String(s).trim().toLowerCase()).filter(Boolean)));
}

export function matchScore(student, opportunity) {
  const sSkills = normalize(student.skills);
  const rSkills = normalize(opportunity.requiredSkills);
  const inter = sSkills.filter(s => rSkills.includes(s));
  const union = Array.from(new Set([...sSkills, ...rSkills]));
  const skillScore = union.length ? Math.round((inter.length / union.length) * 100) : 0;

  let bonus = 0;
  if (student.location && opportunity.location && String(student.location).toLowerCase() === String(opportunity.location).toLowerCase()) bonus += 5;
  if (student.sector && opportunity.sector && String(student.sector).toLowerCase() === String(opportunity.sector).toLowerCase()) bonus += 5;

  return Math.min(100, skillScore + bonus);
}

export function recommend(student, opportunities, filters = {}) {
  return (opportunities || [])
    .map(o => ({ ...o, matchScore: matchScore(student, o) }))
    .filter(o => {
      if (filters.minScore && o.matchScore < Number(filters.minScore)) return false;
      if (filters.location && String(o.location).toLowerCase() !== String(filters.location).toLowerCase()) return false;
      if (filters.sector && String(o.sector).toLowerCase() !== String(filters.sector).toLowerCase()) return false;
      return true;
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
