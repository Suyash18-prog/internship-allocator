import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [phone, setPhone] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // Basic phone validation then route to signup
    const clean = phone.replace(/[^\d+]/g, '');
    if (clean.length < 8) return;
    window.location.href = '/auth/signup';
  };

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="text-accent text-lg md:text-xl font-semibold mb-4">PM Internship</p>

          <h1 className="font-extrabold tracking-tight text-foreground leading-[0.95] mb-6
                         text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
            Careers
            <span className="block">start here</span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl md:max-w-3xl mb-10">
            Find your next internship and launch your career with AI-matched opportunities.
          </p>

          {/* Phone capture bar */}
          <form onSubmit={onSubmit} className="w-full max-w-xl">
            <div className="flex items-stretch rounded-xl overflow-hidden border border-border bg-card shadow-md">
              <input
                type="tel"
                inputMode="tel"
                placeholder="Phone number"
                aria-label="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 md:px-6 bg-accent text-accent-foreground font-semibold hover:brightness-110 transition"
              >
                Get the app
              </button>
            </div>
          </form>

          {/* Background floating cards (simple) */}
          <div className="pointer-events-none select-none w-full max-w-5xl mx-auto mt-10 grid grid-cols-3 gap-3 opacity-20">
            <div className="h-28 bg-card rounded-lg border border-border" />
            <div className="h-28 bg-card rounded-lg border border-border" />
            <div className="h-28 bg-card rounded-lg border border-border" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
