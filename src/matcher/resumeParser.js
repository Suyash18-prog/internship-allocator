// Basic resume parsing from plain text/PDF (text extraction via browser for now)
// Extracts emails, phone, and skills by keyword matching

const KNOWN_SKILLS = [
  'react','javascript','typescript','node','python','java','c++','sql','mongodb','postgres','aws','docker','kubernetes','git','html','css','graphql','django','flask','spring','agile','scrum','project management','communication','leadership','excel','power bi','tableau','data analysis','ml','machine learning','nlp'
];

function uniqueLower(items) {
  return Array.from(new Set(items.map(s => s.toLowerCase())));
}

export async function parseResumeFile(file) {
  const text = await file.text();
  return parseResumeText(text);
}

export function parseResumeText(text) {
  const emails = Array.from(text.matchAll(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)).map(m => m[0]);
  const phones = Array.from(text.matchAll(/(?:\+\d{1,3}[- ]?)?(?:\d{10}|\d{3}[- ]\d{3}[- ]\d{4})/g)).map(m => m[0]);
  const lower = text.toLowerCase();
  const skills = uniqueLower(KNOWN_SKILLS.filter(k => lower.includes(k))).sort();
  return {
    emails: Array.from(new Set(emails)),
    phones: Array.from(new Set(phones)),
    skills,
    rawLength: text.length,
  };
}
