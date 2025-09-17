import React from 'react';

const companies = [
  'Qualcomm', 'Nike, Inc.', 'The Walt Disney Company', 'USDA Forest Service', 'Waffle House, Inc.',
  'Gap, Inc.', 'McKinsey & Company', 'Activision', 'Adobe', 'Google', 'Microsoft',
  'Amazon', 'Meta', 'Salesforce', 'Stripe', 'Uber', 'Airbnb', 'Intuit', 'NVIDIA', 'AMD'
];

const Card = ({ name }) => (
  <div className="min-w-[260px] md:min-w-[320px] bg-card rounded-xl border border-border shadow-sm p-4">
    <p className="text-sm text-muted-foreground mb-1">Company</p>
    <p className="font-semibold text-foreground">{name}</p>
    <p className="text-xs text-muted-foreground mt-2">Internships available • Apply now</p>
  </div>
);

const Row = ({ reverse = false, speed = '30s' }) => {
  // Duplicate content for seamless loop (total width ~200%)
  const items = [...companies, ...companies];
  return (
    <div className="overflow-hidden">
      <div
        className={`${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} w-max flex gap-4 pr-4`}
        style={{ animationDuration: speed }}
      >
        {items.map((name, idx) => (
          <Card key={`${name}-${idx}-${reverse ? 'r' : 'f'}`} name={name} />
        ))}
      </div>
    </div>
  );
};

const CompaniesMarquee = () => {
  return (
    <section className="py-10 md:py-14 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Jobs and internships you actually want
        </h2>
        <div className="space-y-4">
          <Row reverse={false} speed="32s" />
          <Row reverse={true} speed="38s" />
        </div>
      </div>
    </section>
  );
};

export default CompaniesMarquee;
