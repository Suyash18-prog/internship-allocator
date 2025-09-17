import React, { useRef, useEffect, useState } from 'react';

const companies = [
  { name: 'Qualcomm', type: 'Machine Learning Intern', stipend: '₹57–89k/mo' },
  { name: 'Nike, Inc.', type: 'Product Design Intern', stipend: '₹32–40k/mo' },
  { name: 'The Walt Disney Company', type: 'Show Technician Intern', stipend: '₹33–35k/mo' },
  { name: 'USDA Forest Service', type: 'Wildland Firefighter Intern', stipend: '₹32–78k/mo' },
  { name: 'Waffle House, Inc.', type: 'Ops Management Intern', stipend: '₹63–80k/mo' },
  { name: 'Gap, Inc.', type: 'Brand Marketing Intern', stipend: '₹33–35k/mo' },
  { name: 'McKinsey & Company', type: 'Business Analyst Intern', stipend: '₹80–120k/mo' },
  { name: 'Activision', type: 'Game Dev Intern', stipend: '₹45–65k/mo' },
  { name: 'Adobe', type: 'Digital Media Intern', stipend: '₹50–90k/mo' },
  { name: 'Google', type: 'Software Engineering Intern', stipend: '₹80–120k/mo' },
  { name: 'Microsoft', type: 'Data Science Intern', stipend: '₹70–110k/mo' },
  { name: 'Amazon', type: 'Operations Intern', stipend: '₹40–70k/mo' },
  { name: 'Meta', type: 'AR/VR Intern', stipend: '₹75–115k/mo' },
  { name: 'Salesforce', type: 'CRM Engineering Intern', stipend: '₹60–90k/mo' },
  { name: 'Stripe', type: 'Payments Intern', stipend: '₹85–125k/mo' },
  { name: 'Uber', type: 'Maps & ML Intern', stipend: '₹55–85k/mo' },
  { name: 'Airbnb', type: 'Experience Design Intern', stipend: '₹45–70k/mo' },
  { name: 'Intuit', type: 'Fintech Intern', stipend: '₹50–85k/mo' },
  { name: 'NVIDIA', type: 'GPU Intern', stipend: '₹85–130k/mo' },
  { name: 'AMD', type: 'Chip Design Intern', stipend: '₹75–115k/mo' }
];

const Logo = ({ name, logoUrl }) => {
  const colors = ['bg-primary', 'bg-accent', 'bg-success', 'bg-secondary'];
  const idx = Math.abs([...name].reduce((a, c) => a + c.charCodeAt(0), 0)) % colors.length;
  const initials = name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
  return logoUrl ? (
    <img src={logoUrl} alt={`${name} logo`} className="w-10 h-10 rounded-lg object-cover" />
  ) : (
    <div className={`w-10 h-10 ${colors[idx]} rounded-lg flex items-center justify-center text-primary-foreground font-bold`}>{initials}</div>
  );
};

const Card = ({ name, type, stipend, logoUrl }) => (
  <div className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] bg-card rounded-xl border border-border shadow-sm p-4">
    <div className="flex items-start gap-3">
      <Logo name={name} logoUrl={logoUrl} />
      <div className="flex-1">
        <p className="font-semibold text-foreground leading-snug">{name}</p>
        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded-full bg-muted text-foreground/80">{type}</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{stipend}</span>
        </div>
      </div>
    </div>
  </div>
);

const Row = ({ reverse = false, baseSpeed = 60, hoverAll = false, hoverTargetSec = 120 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

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

  const playState = inView ? 'running' : 'paused';

  // Smoothly interpolate duration between baseSpeed and hoverTargetSec
  const marqueeRef = useRef(null);
  const currentDurationRef = useRef(baseSpeed);
  useEffect(() => {
    const el = marqueeRef.current;
    if (el) {
      el.style.setProperty('--marquee-duration', `${baseSpeed}s`);
      el.style.setProperty('--marquee-play', playState);
    }
  }, [baseSpeed, playState]);

  const animateTo = (targetSec, durationMs = 700) => {
    const el = marqueeRef.current;
    if (!el) return;
    const start = performance.now();
    const from = currentDurationRef.current;
    const to = targetSec;
    const step = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const val = from + (to - from) * eased;
      el.style.setProperty('--marquee-duration', `${val}s`);
      if (t < 1) requestAnimationFrame(step);
      else currentDurationRef.current = to;
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    animateTo(hoverAll ? hoverTargetSec : baseSpeed, 800);
  }, [hoverAll, baseSpeed]);

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        ref={marqueeRef}
        className={`${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} w-max flex gap-4 pr-4`}
        style={{ ['--marquee-play']: playState }}
      >
        {items.map((item, idx) => (
          <Card key={`${item.name}-${idx}-${reverse ? 'r' : 'f'}`} {...item} />
        ))}
      </div>
    </div>
  );
};

const CompaniesMarquee = () => {
  const [hoverAll, setHoverAll] = useState(false);
  const hoverTargetSec = 140; // unified slower speed on hover for both rows
  return (
    <section
      className="py-8 md:py-12 bg-transparent"
      onMouseEnter={() => setHoverAll(true)}
      onMouseLeave={() => setHoverAll(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Jobs and internships you actually want
        </h2>
        <div className="space-y-4">
          <Row reverse={false} baseSpeed={70} hoverAll={hoverAll} hoverTargetSec={hoverTargetSec} />
          <Row reverse={true} baseSpeed={80} hoverAll={hoverAll} hoverTargetSec={hoverTargetSec} />
        </div>
      </div>
    </section>
  );
};

export default CompaniesMarquee;
