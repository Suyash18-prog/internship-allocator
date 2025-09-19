import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useParams } from 'react-router-dom';

const ApplicantsPage = () => {
  const { id } = useParams(); // internship id
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/internships/${id}/applications`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch applicants');
        const data = await response.json();
        setApplicants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchApplicants();
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Icon name="Users" size={28} /> Applicants
        </h1>
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
            <span className="text-lg text-muted-foreground">Loading applicants...</span>
          </div>
        ) : error ? (
          <div className="text-error text-center">{error}</div>
        ) : applicants.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <Icon name="Inbox" size={40} className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Applicants Yet</h3>
            <p>Applicants will appear here as students apply to this internship.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {applicants.map(app => (
              <div key={app.id} className="bg-card border border-border rounded-lg p-5 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-4">
                  <Icon name="User" size={24} className="text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Student ID: {app.userId}</div>
                    <div className="text-sm text-muted-foreground">Status: <span className={`font-medium capitalize ${app.status === 'accepted' ? 'text-success' : app.status === 'rejected' ? 'text-error' : 'text-warning'}`}>{app.status}</span></div>
                    <div className="text-xs text-muted-foreground">Applied: {new Date(app.appliedAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="success"
                    iconName="Check"
                    size="sm"
                    disabled={app.status === 'accepted'}
                    onClick={async () => {
                      const token = localStorage.getItem('token');
                      await fetch(`/api/applications/${app.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify({ status: 'accepted' })
                      });
                      setApplicants(prev => prev.map(a => a.id === app.id ? { ...a, status: 'accepted' } : a));
                    }}
                  >Accept</Button>
                  <Button
                    variant="danger"
                    iconName="X"
                    size="sm"
                    disabled={app.status === 'rejected'}
                    onClick={async () => {
                      const token = localStorage.getItem('token');
                      await fetch(`/api/applications/${app.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify({ status: 'rejected' })
                      });
                      setApplicants(prev => prev.map(a => a.id === app.id ? { ...a, status: 'rejected' } : a));
                    }}
                  >Reject</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsPage;
