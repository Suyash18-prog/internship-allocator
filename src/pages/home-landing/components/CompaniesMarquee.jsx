import React, { useRef, useEffect, useState } from 'react';

const companies = [
  'Qualcomm', 'Nike, Inc.', 'The Walt Disney Company', 'USDA Forest Service', 'Waffle House, Inc.',
  'Gap, Inc.', 'McKinsey & Company', 'Activision', 'Adobe', 'Google', 'Microsoft',
  'Amazon', 'Meta', 'Salesforce', 'Stripe', 'Uber', 'Airbnb', 'Intuit', 'NVIDIA', 'AMD'
];

const Card = ({ name }) => (
  <div className="min-w-[220px] md:min-w-[260px] lg:min-w-[320px] bg-card rounded-xl border border-border shadow-sm p-4">
    <p className="text-sm text-muted-foreground mb-1">Company</p>
    <p className="font-semibold text-foreground">{name}</p>
    <p className="text-xs text-muted-foreground mt-2">Internships available • Apply now</p>
  </div>
);

const Row = ({ reverse = false, baseSpeed = 40 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => setInView(entry.isIntersecting));
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const items = [...companies, ...companies];

  // compute duration
  const duration = hover ? `${baseSpeed * 2}s` : `${baseSpeed}s`;
  const playState = inView ? 'running' : 'paused';

  return (
    <div
      ref={ref}
      className="overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} w-max flex gap-4 pr-4`}
        style={{ ['--marquee-duration']: duration, ['--marquee-play']: playState }}
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
    <section className="py-8 md:py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Jobs and internships you actually want
        </h2>
        <div className="space-y-4">
          <Row reverse={false} baseSpeed={42} />
          <Row reverse={true} baseSpeed={52} />
        </div>
      </div>
    </section>
  );
};

export default CompaniesMarquee;
