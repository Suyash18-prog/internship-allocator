// Simple CSV CRUD utilities using localStorage-backed storage
// Files: students.csv, companies.csv

const STORAGE_KEYS = {
  students: 'csv_students',
  companies: 'csv_companies',
};

export function parseCSV(csvText) {
  const lines = csvText.trim() ? csvText.trim().split(/\r?\n/) : [];
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const cols = splitCsvLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = cols[i] ?? ''; });
    return obj;
  });
  return { headers, rows };
}

export function toCSV(headers, rows) {
  const head = headers.join(',');
  const body = rows.map(r => headers.map(h => escapeCsv(r[h] ?? '')).join(',')).join('\n');
  return [head, body].filter(Boolean).join('\n');
}

function escapeCsv(value) {
  const s = String(value);
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function splitCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { current += '"'; i++; } else { inQuotes = false; }
      } else {
        current += ch;
      }
    } else {
      if (ch === ',') { result.push(current); current = ''; }
      else if (ch === '"') { inQuotes = true; }
      else { current += ch; }
    }
  }
  result.push(current);
  return result;
}

function ensureHeaders(kind, row) {
  const key = STORAGE_KEYS[kind];
  const csv = localStorage.getItem(key) || '';
  if (!csv) {
    const headers = Object.keys(row);
    const text = toCSV(headers, []);
    localStorage.setItem(key, text);
    return headers;
  }
  const { headers } = parseCSV(csv);
  return headers.length ? headers : Object.keys(row);
}

export function appendRow(kind, row) {
  const key = STORAGE_KEYS[kind];
  const headers = ensureHeaders(kind, row);
  const existing = localStorage.getItem(key) || headers.join(',');
  const newLine = '\n' + headers.map(h => escapeCsv(row[h] ?? '')).join(',');
  localStorage.setItem(key, existing + newLine);
}

export function readAll(kind) {
  const key = STORAGE_KEYS[kind];
  const csv = localStorage.getItem(key) || '';
  if (!csv) return { headers: [], rows: [] };
  return parseCSV(csv);
}

export function upsertRow(kind, matchFn, updater) {
  const key = STORAGE_KEYS[kind];
  const csv = localStorage.getItem(key) || '';
  if (!csv) return;
  const { headers, rows } = parseCSV(csv);
  const updated = rows.map(r => (matchFn(r) ? updater({ ...r }) : r));
  localStorage.setItem(key, toCSV(headers, updated));
}

export function deleteWhere(kind, matchFn) {
  const key = STORAGE_KEYS[kind];
  const csv = localStorage.getItem(key) || '';
  if (!csv) return;
  const { headers, rows } = parseCSV(csv);
  const remaining = rows.filter(r => !matchFn(r));
  localStorage.setItem(key, toCSV(headers, remaining));
}

export function exportCsv(kind, filename) {
  const key = STORAGE_KEYS[kind];
  const csv = localStorage.getItem(key) || '';
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function importCsv(kind, csvText) {
  const key = STORAGE_KEYS[kind];
  localStorage.setItem(key, csvText);
}

export function clearCsv(kind) {
  const key = STORAGE_KEYS[kind];
  localStorage.removeItem(key);
}

export const KINDS = {
  STUDENTS: 'students',
  COMPANIES: 'companies',
};
