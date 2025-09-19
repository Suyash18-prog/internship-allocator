import React, { useEffect, useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/applications', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch applications');
        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Icon name="ClipboardList" size={28} /> My Applications
        </h1>
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
            <span className="text-lg text-muted-foreground">Loading applications...</span>
          </div>
        ) : error ? (
          <div className="text-error text-center">{error}</div>
        ) : applications.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <Icon name="Inbox" size={40} className="mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
            <p>Apply to internships to see them listed here.</p>
            <Button variant="default" className="mt-6" iconName="Search" onClick={() => window.location.href = '/matchmaking-dashboard'}>
              Find Internships
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map(app => (
              <div key={app.id} className="bg-card border border-border rounded-lg p-5 flex items-center justify-between animate-fade-in">
                <div className="flex items-center gap-4">
                  <Icon name="FileText" size={24} className="text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Internship ID: {app.internshipId}</div>
                    <div className="text-sm text-muted-foreground">Status: <span className="font-medium text-success capitalize">{app.status}</span></div>
                    <div className="text-xs text-muted-foreground">Applied: {new Date(app.appliedAt).toLocaleString()}</div>
                  </div>
                </div>
                <Button variant="outline" iconName="Eye" onClick={() => window.location.href = `/internship-details-view?id=${app.internshipId}`}>View</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
