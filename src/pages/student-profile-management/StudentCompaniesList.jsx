import React, { useEffect, useState } from 'react';

const StudentCompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/companies')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch companies');
        return res.json();
      })
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading companies...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">All Companies</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col gap-2 border hover:shadow-lg transition"
          >
            <div className="font-semibold text-lg">{company.name}</div>
            <div className="text-gray-600">Sector: {company.sector}</div>
            {company.size && (
              <div className="text-gray-500 text-sm">Size: {company.size}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCompaniesList;
