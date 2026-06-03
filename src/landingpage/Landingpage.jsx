// src/screens/LandingPage/LandingPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Smartphone,
  Download,
  Shield,
  Users,
  Dumbbell,
  Star,
  Check,
  ArrowRight,
  Play,
  Zap,
  BarChart3,
  Bell,
  Crown,
  Menu,
  X,
  ChevronDown,
  Lock,
  RefreshCw,
  MessageSquare,
  IndianRupee,
  UserCheck,
  CalendarCheck,
  Heart,
  Laptop,
  Github,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Globe,
  Layers,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
} from 'lucide-react';

// ─── BRAND ───────────────────────────────────────────────────────────────────

const BRAND = {
  name: 'JEERA',
  tagline: 'Gym Management Simplified',
  gold: '#C5A059',
  goldLight: '#EAB308',
  version: 'v2.1.0',
  size: { windows: '84 MB', mac: '92 MB', android: '45 MB' },
};

const DOWNLOAD_LINKS = {
  windows: '#',
  mac: '#',
  android: '#',
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  'Features',
  'How It Works',
  'Pricing',
  'Testimonials',
  'FAQ',
  'Download',
];

const HERO_STATS = [
  { value: '5,000+', label: 'Gym Owners' },
  { value: '2.5L+', label: 'Members Managed' },
  { value: '4.9★', label: 'Rating' },
  { value: '₹0', label: 'To Start' },
];

const FEATURES = [
  {
    icon: Users,
    title: 'Member Management',
    desc: 'Add, edit, search members instantly. Track plans, joining dates, photos and complete history.',
    color: '#3B82F6',
  },
  {
    icon: IndianRupee,
    title: 'Payment & Billing',
    desc: 'Track every rupee. Pending payments, received amounts, due dates — all automated.',
    color: '#22C55E',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    desc: 'Auto WhatsApp & SMS reminders for renewals, birthdays, and payment dues.',
    color: '#EAB308',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Revenue graphs, member growth trends, monthly reports — everything at a glance.',
    color: '#A855F7',
  },
  {
    icon: CalendarCheck,
    title: 'Attendance Tracking',
    desc: 'Daily check-in/check-out with biometric or manual entry. Know who shows up.',
    color: '#F97316',
  },
  {
    icon: UserCheck,
    title: 'Staff Management',
    desc: 'Manage trainers, assign members, track performance and salary records.',
    color: '#06B6D4',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    desc: 'Bank-level encryption. Your gym data stays on your device. Zero cloud dependency.',
    color: '#EF4444',
  },
  {
    icon: RefreshCw,
    title: 'Auto Backup',
    desc: 'Automatic local + cloud backups. Restore your entire data in one click.',
    color: '#10B981',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    desc: 'Hindi, English, Marathi, Tamil, Telugu and more. Made for all of India.',
    color: '#8B5CF6',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Download App',
    desc: 'Download for Windows, Mac or Android. Install in under 2 minutes.',
    icon: Download,
  },
  {
    step: '02',
    title: 'Register Gym',
    desc: 'Enter gym name, your name, mobile and email. One-time 30 second setup.',
    icon: Dumbbell,
  },
  {
    step: '03',
    title: 'Add Members',
    desc: 'Start adding members with plans and payments. Import existing data easily.',
    icon: Users,
  },
  {
    step: '04',
    title: 'Manage Everything',
    desc: 'Payments, reminders, attendance, reports — autopilot mode activated.',
    icon: Zap,
  },
];

const PLANS = [
  {
    id: '1m',
    duration: '1 Month',
    price: 1500,
    perMonth: 1500,
    popular: false,
    save: null,
  },
  {
    id: '3m',
    duration: '3 Months',
    price: 4000,
    perMonth: 1333,
    popular: true,
    save: '11%',
  },
  {
    id: '6m',
    duration: '6 Months',
    price: 7500,
    perMonth: 1250,
    popular: false,
    save: '17%',
  },
  {
    id: '9m',
    duration: '9 Months',
    price: 10500,
    perMonth: 1167,
    popular: false,
    save: '22%',
  },
  {
    id: '1y',
    duration: '1 Year',
    price: 13500,
    perMonth: 1125,
    popular: false,
    save: '25%',
  },
];

const PLAN_FEATURES = [
  'All Features Unlocked',
  'Unlimited Members',
  'WhatsApp & SMS Alerts',
  'Analytics & Reports',
  'Auto Backup',
  'Priority Support',
];

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    gym: 'Iron Paradise Gym',
    city: 'Delhi',
    text: 'Collection increased by 40% just because of auto reminders. Earlier we used to write in registers, now everything in one click.',
    rating: 5,
    members: '350+',
  },
  {
    name: 'Priya Sharma',
    gym: 'FitZone Studio',
    city: 'Mumbai',
    text: 'Managing 500+ members was a nightmare. Now everything is automated. Best investment for my gym.',
    rating: 5,
    members: '500+',
  },
  {
    name: 'Vikram Singh',
    gym: 'PowerHouse Fitness',
    city: 'Jaipur',
    text: 'Analytics helps us understand which plan sells the most. We are making data-driven decisions now.',
    rating: 5,
    members: '200+',
  },
  {
    name: 'Amit Patel',
    gym: 'Muscle Factory',
    city: 'Ahmedabad',
    text: 'Renewal rate increased from 60% to 85% thanks to WhatsApp reminders. This app is a game changer.',
    rating: 5,
    members: '400+',
  },
  {
    name: 'Sneha Reddy',
    gym: 'CoreFit Studio',
    city: 'Hyderabad',
    text: 'Simple, fast, no lag. Tried 3 apps — this is the best. Even works in Hindi!',
    rating: 5,
    members: '150+',
  },
  {
    name: 'Deepak Yadav',
    gym: 'D-Fitness Hub',
    city: 'Lucknow',
    text: 'Staff management feature is excellent. Trainer salary, attendance — everything is tracked.',
    rating: 5,
    members: '280+',
  },
];

const FAQS = [
  {
    q: 'Is the app free?',
    a: 'Yes! Download and basic features are completely free. Premium plans are available at affordable prices.',
  },
  {
    q: 'Do I need internet?',
    a: 'No! App works completely offline. Internet is only needed for WhatsApp reminders and cloud backup.',
  },
  {
    q: 'Is my data safe?',
    a: 'Absolutely! Data is stored in encrypted form on your device. We never access your data.',
  },
  {
    q: 'How many members can I add?',
    a: 'Unlimited! Whether you have 10 or 10,000 members — there is no limit in any plan.',
  },
  {
    q: 'Does it work on mobile?',
    a: 'Yes! Android app is available. Windows and Mac apps are also available. Everything syncs.',
  },
  {
    q: 'How do I make payment?',
    a: 'From the Upgrade button inside the app, scan UPI QR. Razorpay powered secure payment.',
  },
  {
    q: 'Will I get a refund?',
    a: '7-day full refund policy. If you don\'t like it, 100% refund — no questions asked.',
  },
  {
    q: 'How do I get support?',
    a: 'WhatsApp, Email and Phone support. Premium users get guaranteed response within 2 hours.',
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const GradientText = ({ children, className = '' }) => (
  <span
    className={className}
    style={{
      background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    {children}
  </span>
);

const SectionBadge = ({ icon: Icon, text }) => (
  <div
    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
    style={{
      background: 'rgba(197,160,89,0.06)',
      border: '1px solid rgba(197,160,89,0.15)',
    }}
  >
    <Icon size={13} color={BRAND.gold} />
    <span className="font-rajdhani text-[#C5A059] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold">
      {text}
    </span>
  </div>
);

// ─── SCROLL TO TOP ───────────────────────────────────────────────────────────

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{
        background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
        boxShadow: '0 4px 24px rgba(197,160,89,0.35)',
      }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} color="#000" />
    </button>
  );
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
      style={{
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(197,160,89,0.06)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => scrollTo('hero')}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${BRAND.gold}20, ${BRAND.gold}08)`,
              border: `1px solid ${BRAND.gold}25`,
            }}
          >
            <Dumbbell size={17} color={BRAND.gold} />
          </div>
          <div>
            <span className="font-orbitron text-[15px] md:text-[17px] font-bold tracking-[0.12em]">
              <span className="text-white">JE</span>
              <span style={{ color: BRAND.gold }}>ERA</span>
            </span>
            <p className="font-rajdhani text-zinc-600 text-[8px] tracking-[0.2em] uppercase -mt-0.5 hidden md:block">
              {BRAND.tagline}
            </p>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollTo(item.toLowerCase().replace(/\s+/g, '-'))
              }
              className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase hover:text-[#C5A059] transition-colors duration-300"
            >
              {item}
            </button>
          ))}

          <a
            href="#/login"
            className="px-5 py-2 rounded-lg font-rajdhani text-[#C5A059] text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{
              background: 'rgba(197,160,89,0.06)',
              border: '1px solid rgba(197,160,89,0.18)',
            }}
          >
            <Shield size={12} />
            Login
          </a>

          <button
            onClick={() => scrollTo('download')}
            className="px-5 py-2 rounded-lg font-rajdhani text-black text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
            }}
          >
            <Download size={12} />
            Download
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {isOpen ? (
            <X size={18} color="#fff" />
          ) : (
            <Menu size={18} color="#fff" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="mt-2 mx-4 p-5 rounded-2xl"
          style={{
            background: 'rgba(5,5,5,0.98)',
            border: '1px solid rgba(197,160,89,0.10)',
          }}
        >
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              onClick={() =>
                scrollTo(item.toLowerCase().replace(/\s+/g, '-'))
              }
              className="block w-full text-left font-rajdhani text-zinc-300 text-[13px] tracking-[0.12em] uppercase py-2.5 px-3 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              {item}
            </button>
          ))}

          <div className="h-px bg-white/[0.06] my-3" />

          <a
            href="#/login"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-lg font-rajdhani text-[#C5A059] text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2"
            style={{
              background: 'rgba(197,160,89,0.06)',
              border: '1px solid rgba(197,160,89,0.15)',
            }}
          >
            <Shield size={13} />
            Login
          </a>

          <button
            onClick={() => scrollTo('download')}
            className="w-full mt-2 py-2.5 rounded-lg font-rajdhani text-black text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
            }}
          >
            <Download size={13} />
            Download Free
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─── HERO ────────────────────────────────────────────────────────────────────

const HeroSection = () => (
  <section
    id="hero"
    className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-16"
  >
    {/* Background Layers */}
    <div className="absolute inset-0" style={{ background: '#000000' }} />
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(197,160,89,0.06) 0%, transparent 100%)',
      }}
    />
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(197,160,89,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(197,160,89,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
      }}
    />

    {/* Floating Orbs */}
    <div
      className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px] opacity-[0.04]"
      style={{ background: BRAND.gold }}
    />
    <div
      className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[150px] opacity-[0.03]"
      style={{ background: BRAND.goldLight }}
    />

    <div className="relative text-center max-w-5xl mx-auto">
      {/* Live Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10"
        style={{
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid rgba(34,197,94,0.15)',
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <div className="w-2 h-2 rounded-full bg-green-400 absolute animate-ping" />
        </div>
        <span className="font-rajdhani text-green-400 text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-bold">
          5,000+ Gym Owners Active
        </span>
      </div>

      {/* Heading */}
      <h1 className="font-orbitron text-white text-[30px] md:text-[46px] lg:text-[58px] font-bold leading-[1.05] tracking-[0.04em] mb-3">
        YOUR GYM.
      </h1>
      <h1 className="font-orbitron text-[30px] md:text-[46px] lg:text-[58px] font-bold leading-[1.05] tracking-[0.04em] mb-3">
        <GradientText>YOUR RULES.</GradientText>
      </h1>
      <h2 className="font-orbitron text-zinc-400 text-[18px] md:text-[28px] lg:text-[34px] font-bold tracking-[0.06em] mb-8">
        ONE POWERFUL APP.
      </h2>

      {/* Subtitle */}
      <p className="font-rajdhani text-zinc-500 text-[14px] md:text-[17px] tracking-[0.04em] max-w-2xl mx-auto mb-10 leading-[1.7]">
        Members, payments, attendance, reminders, analytics — everything in one place.
        Built for{' '}
        <span className="text-white font-semibold">
          Indian gym owners
        </span>{' '}
        who mean business.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
        <a
          href="#download"
          className="group px-8 py-3.5 rounded-xl font-rajdhani text-black text-[12px] md:text-[13px] font-bold tracking-[0.15em] uppercase flex items-center gap-3 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
          style={{
            background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
            boxShadow: '0 8px 40px rgba(197,160,89,0.20)',
          }}
        >
          <Download size={16} />
          Download Free
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>

        <a
          href="#features"
          className="px-8 py-3.5 rounded-xl font-rajdhani text-zinc-400 text-[12px] md:text-[13px] tracking-[0.15em] uppercase flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:text-white w-full sm:w-auto justify-center"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Play size={14} />
          See Features
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto mb-10">
        {HERO_STATS.map((stat) => (
          <div
            key={stat.label}
            className="text-center py-4 px-3 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <GradientText className="font-orbitron text-[20px] md:text-[24px] font-bold block">
              {stat.value}
            </GradientText>
            <p className="font-rajdhani text-zinc-600 text-[9px] md:text-[10px] tracking-[0.15em] uppercase mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Platforms */}
      <div className="flex items-center justify-center gap-8">
        {[
          { icon: Monitor, label: 'Windows' },
          { icon: Laptop, label: 'macOS' },
          { icon: Smartphone, label: 'Android' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 opacity-40">
            <Icon size={12} color="#fff" />
            <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── FEATURES ────────────────────────────────────────────────────────────────

const FeaturesSection = () => (
  <section
    id="features"
    className="py-20 md:py-28 px-6"
    style={{ background: '#030303' }}
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <SectionBadge icon={Zap} text="Powerful Features" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          EVERYTHING YOUR GYM{' '}
          <GradientText>NEEDS</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] max-w-xl mx-auto mb-14">
          No bloat. Only features that help Indian gym owners
          grow their business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${f.color}10`, border: `1px solid ${f.color}18` }}
              >
                <Icon size={20} color={f.color} />
              </div>
              <h3 className="font-orbitron text-white text-[12px] md:text-[13px] tracking-[0.10em] mb-2.5 font-bold">
                {f.title.toUpperCase()}
              </h3>
              <p className="font-rajdhani text-zinc-500 text-[13px] tracking-[0.02em] leading-relaxed">
                {f.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────

const HowItWorksSection = () => (
  <section
    id="how-it-works"
    className="py-20 md:py-28 px-6"
    style={{
      background:
        'radial-gradient(ellipse at bottom left, rgba(197,160,89,0.03) 0%, #000 60%)',
    }}
  >
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <SectionBadge icon={Layers} text="Simple Setup" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          START IN{' '}
          <GradientText>4 STEPS</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-14">
          From download to managing your gym — under 5 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HOW_IT_WORKS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative p-6 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <span
                    className="font-orbitron text-[36px] font-bold"
                    style={{ color: `${BRAND.gold}10` }}
                  >
                    {item.step}
                  </span>
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      background: `${BRAND.gold}10`,
                      border: `1px solid ${BRAND.gold}18`,
                    }}
                  >
                    <Icon size={18} color={BRAND.gold} />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-orbitron text-white text-[13px] tracking-[0.08em] mb-1.5 font-bold">
                    {item.title.toUpperCase()}
                  </h3>
                  <p className="font-rajdhani text-zinc-500 text-[13px] tracking-[0.02em] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── PRICING ─────────────────────────────────────────────────────────────────

const PricingSection = () => (
  <section id="pricing" className="py-20 md:py-28 px-6" style={{ background: '#030303' }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center">
        <SectionBadge icon={Crown} text="Affordable Pricing" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          SIMPLE &{' '}
          <GradientText>TRANSPARENT</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-14">
          Start free. Upgrade from inside the app. Pay via UPI.
        </p>
      </div>

      {/* Free Banner */}
      <div
        className="p-5 md:p-7 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-5"
        style={{
          background: 'rgba(34,197,94,0.03)',
          border: '1px solid rgba(34,197,94,0.10)',
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(34,197,94,0.08)' }}
          >
            <Heart size={20} color="#22C55E" />
          </div>
          <div>
            <h3 className="font-orbitron text-white text-[14px] tracking-[0.08em] font-bold">
              FREE FOREVER
            </h3>
            <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.06em] mt-0.5">
              Basic features. No credit card. Upgrade anytime.
            </p>
          </div>
        </div>
        <a
          href="#download"
          className="px-5 py-2.5 rounded-lg font-rajdhani text-green-400 text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 hover:scale-105 transition-all whitespace-nowrap"
          style={{
            background: 'rgba(34,197,94,0.06)',
            border: '1px solid rgba(34,197,94,0.15)',
          }}
        >
          <Download size={13} />
          Start Free
        </a>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className="relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              background: plan.popular
                ? 'rgba(197,160,89,0.03)'
                : 'rgba(255,255,255,0.01)',
              border: plan.popular
                ? '1px solid rgba(197,160,89,0.30)'
                : '1px solid rgba(255,255,255,0.04)',
            }}
          >
            {plan.popular && (
              <>
                <div
                  className="absolute -top-px left-6 right-6 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)`,
                  }}
                />
                <div className="text-center mb-3">
                  <span
                    className="px-3 py-1 rounded-full font-rajdhani text-[9px] font-bold tracking-[0.18em] uppercase"
                    style={{
                      background: `${BRAND.gold}15`,
                      color: BRAND.gold,
                    }}
                  >
                    ★ Popular
                  </span>
                </div>
              </>
            )}

            <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase text-center">
              {plan.duration}
            </p>

            <div className="text-center my-3">
              <span className="font-rajdhani text-zinc-600 text-[14px]">
                ₹
              </span>
              <span className="font-orbitron text-white text-[26px] font-bold">
                {plan.price.toLocaleString('en-IN')}
              </span>
            </div>

            <p className="text-center font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase">
              ₹{plan.perMonth.toLocaleString('en-IN')}/mo
            </p>

            {plan.save && (
              <div className="text-center mt-2 mb-3">
                <span
                  className="px-2.5 py-0.5 rounded-full font-rajdhani text-[9px] tracking-[0.12em] uppercase font-bold"
                  style={{
                    background: 'rgba(34,197,94,0.08)',
                    color: '#22C55E',
                    border: '1px solid rgba(34,197,94,0.15)',
                  }}
                >
                  Save {plan.save}
                </span>
              </div>
            )}

            <div className="space-y-2 my-4">
              {PLAN_FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={10} color={BRAND.gold} />
                  <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.04em]">
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#download"
              className="block w-full py-2.5 rounded-lg text-center font-rajdhani text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-[1.03]"
              style={
                plan.popular
                  ? {
                      background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                      color: '#000',
                    }
                  : {
                      background: `${BRAND.gold}06`,
                      color: BRAND.gold,
                      border: `1px solid ${BRAND.gold}15`,
                    }
              }
            >
              Get Started
            </a>
          </div>
        ))}
      </div>

      {/* Trust */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        {[
          { icon: Shield, text: 'Razorpay Secured' },
          { icon: RefreshCw, text: '7-Day Refund' },
          { icon: Lock, text: 'No Auto-Renewal' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5 opacity-40">
            <Icon size={12} />
            <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────

const TestimonialsSection = () => (
  <section
    id="testimonials"
    className="py-20 md:py-28 px-6"
    style={{
      background:
        'radial-gradient(ellipse at top right, rgba(197,160,89,0.02) 0%, #000 60%)',
    }}
  >
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <SectionBadge icon={Heart} text="Loved by Gym Owners" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          REAL OWNERS.{' '}
          <GradientText>REAL RESULTS.</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-14">
          Trusted by gym owners across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="p-5 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  color={BRAND.gold}
                  fill={BRAND.gold}
                />
              ))}
            </div>

            <p className="font-rajdhani text-zinc-400 text-[13px] tracking-[0.02em] leading-relaxed mb-5 min-h-[72px]">
              &ldquo;{t.text}&rdquo;
            </p>

            <div
              className="flex items-center gap-3 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-orbitron text-[12px] font-bold flex-shrink-0"
                style={{
                  background: `${BRAND.gold}10`,
                  color: BRAND.gold,
                  border: `1px solid ${BRAND.gold}18`,
                }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-orbitron text-white text-[10px] tracking-[0.06em] font-bold">
                  {t.name}
                </p>
                <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.06em] uppercase">
                  {t.gym} • {t.city} •{' '}
                  <span style={{ color: BRAND.gold }}>
                    {t.members} members
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div
    className="rounded-xl overflow-hidden transition-all duration-300"
    style={{
      background: isOpen
        ? 'rgba(197,160,89,0.02)'
        : 'rgba(255,255,255,0.01)',
      border: isOpen
        ? '1px solid rgba(197,160,89,0.18)'
        : '1px solid rgba(255,255,255,0.04)',
    }}
  >
    <button
      onClick={onToggle}
      className="w-full p-5 flex items-center justify-between gap-4 text-left"
    >
      <span className="font-rajdhani text-white text-[13px] md:text-[14px] tracking-[0.02em] font-bold">
        {faq.q}
      </span>
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: isOpen
            ? `${BRAND.gold}12`
            : 'rgba(255,255,255,0.03)',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
        }}
      >
        <ChevronDown
          size={14}
          color={isOpen ? BRAND.gold : '#52525B'}
        />
      </div>
    </button>

    <div
      className={`overflow-hidden transition-all duration-500 ${
        isOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-5 pb-5">
        <p className="font-rajdhani text-zinc-500 text-[13px] tracking-[0.02em] leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 px-6"
      style={{ background: '#030303' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <SectionBadge icon={MessageSquare} text="FAQ" />
          <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
            COMMON{' '}
            <GradientText>QUESTIONS</GradientText>
          </h2>
          <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-14">
            Everything you need to know.
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(openIndex === i ? -1 : i)
              }
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.06em] mb-2">
            Still have questions?
          </p>
          <a
            href="mailto:support@jeera.app"
            className="inline-flex items-center gap-2 font-rajdhani text-[#C5A059] text-[12px] tracking-[0.1em] uppercase font-bold hover:underline underline-offset-4"
          >
            <Mail size={13} />
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── DOWNLOAD ────────────────────────────────────────────────────────────────

const DownloadSection = () => {
  const platforms = [
    {
      icon: Monitor,
      name: 'Windows',
      sub: 'Windows 10/11',
      file: '.exe',
      size: BRAND.size.windows,
      link: DOWNLOAD_LINKS.windows,
      primary: true,
    },
    {
      icon: Laptop,
      name: 'macOS',
      sub: 'macOS 12+',
      file: '.dmg',
      size: BRAND.size.mac,
      link: DOWNLOAD_LINKS.mac,
      primary: false,
    },
    {
      icon: Smartphone,
      name: 'Android',
      sub: 'Android 10+',
      file: '.apk',
      size: BRAND.size.android,
      link: DOWNLOAD_LINKS.android,
      primary: false,
    },
  ];

  return (
    <section
      id="download"
      className="py-20 md:py-28 px-6"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(197,160,89,0.04) 0%, #000 70%)',
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <SectionBadge icon={Download} text="Get Started" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          DOWNLOAD{' '}
          <GradientText>JEERA</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-3">
          All platforms. Free. 2 minutes setup.
        </p>

        {/* Version */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.12em] uppercase">
            {BRAND.version} • Latest
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {platforms.map((p) => {
            const Icon = p.icon;
            return (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 md:p-7 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 block"
                style={{
                  background: p.primary
                    ? 'rgba(197,160,89,0.03)'
                    : 'rgba(255,255,255,0.01)',
                  border: p.primary
                    ? '1px solid rgba(197,160,89,0.25)'
                    : '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: p.primary
                      ? `${BRAND.gold}10`
                      : 'rgba(255,255,255,0.03)',
                    border: p.primary
                      ? `1px solid ${BRAND.gold}18`
                      : '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <Icon
                    size={24}
                    color={p.primary ? BRAND.gold : '#fff'}
                  />
                </div>

                <h3 className="font-orbitron text-white text-[13px] tracking-[0.10em] mb-0.5 font-bold">
                  {p.name.toUpperCase()}
                </h3>
                <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase mb-4">
                  {p.sub}
                </p>

                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-rajdhani text-[10px] font-bold tracking-[0.12em] uppercase group-hover:scale-105 transition-all"
                  style={
                    p.primary
                      ? {
                          background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
                          color: '#000',
                        }
                      : {
                          background: `${BRAND.gold}06`,
                          color: BRAND.gold,
                          border: `1px solid ${BRAND.gold}15`,
                        }
                  }
                >
                  <Download size={12} />
                  Download {p.file}
                </div>

                <p className="font-rajdhani text-zinc-700 text-[9px] tracking-[0.1em] uppercase mt-2.5">
                  {p.size} • {BRAND.version}
                </p>
              </a>
            );
          })}
        </div>

        {/* Requirements */}
        <div
          className="mt-10 p-4 rounded-xl max-w-md mx-auto"
          style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase mb-1">
            Minimum Requirements
          </p>
          <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.04em]">
            4 GB RAM • 200 MB Storage
          </p>
        </div>
      </div>
    </section>
  );
};

// ─── CTA ─────────────────────────────────────────────────────────────────────

const CTASection = () => (
  <section className="py-20 md:py-28 px-6" style={{ background: '#000' }}>
    <div
      className="max-w-3xl mx-auto p-8 md:p-14 rounded-3xl text-center relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(197,160,89,0.05) 0%, rgba(0,0,0,0.98) 100%)',
        border: '1px solid rgba(197,160,89,0.12)',
      }}
    >
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] opacity-[0.06]"
        style={{ background: BRAND.gold }}
      />

      <div className="relative">
        <Trophy
          size={40}
          color={BRAND.gold}
          className="mx-auto mb-5 opacity-25"
        />
        <h2 className="font-orbitron text-white text-[20px] md:text-[28px] lg:text-[32px] font-bold tracking-[0.08em] mb-3">
          READY TO{' '}
          <GradientText>TRANSFORM</GradientText>
          <br />
          YOUR GYM?
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[14px] tracking-[0.04em] mb-8 max-w-md mx-auto">
          Join 5,000+ gym owners. Download free. See results
          from day one.
        </p>

        <a
          href="#download"
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-rajdhani text-black text-[12px] font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
            boxShadow: '0 8px 40px rgba(197,160,89,0.20)',
          }}
        >
          <Download size={16} />
          Download JEERA Free
          <ArrowRight size={14} />
        </a>

        <p className="font-rajdhani text-zinc-700 text-[10px] tracking-[0.12em] uppercase mt-4">
          Free forever • No credit card
        </p>
      </div>
    </div>
  </section>
);

// ─── FOOTER ──────────────────────────────────────────────────────────────────

const Footer = () => {
  const links = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Download', href: '#download' },
      { label: 'Changelog', href: '#' },
    ],
    Support: [
      { label: 'Help Center', href: '#' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#' },
      { label: 'Bug Report', href: '#' },
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Refund', href: '#' },
      { label: 'License', href: '#' },
    ],
  };

  return (
    <footer
      className="pt-14 pb-6 px-6"
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `${BRAND.gold}12`,
                  border: `1px solid ${BRAND.gold}18`,
                }}
              >
                <Dumbbell size={15} color={BRAND.gold} />
              </div>
              <span className="font-orbitron text-[15px] font-bold tracking-[0.12em]">
                <span className="text-white">JE</span>
                <span style={{ color: BRAND.gold }}>ERA</span>
              </span>
            </div>

            <p className="font-rajdhani text-zinc-600 text-[13px] tracking-[0.02em] leading-relaxed mb-5 max-w-xs">
              India's most powerful gym management software.
              Built with ❤️ for gym owners.
            </p>

            <div className="space-y-2.5">
              {[
                { icon: Mail, text: 'support@jeera.app' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: MapPin, text: 'Bangalore, India' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={12} color="#3F3F46" />
                  <span className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.04em]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-orbitron text-zinc-400 text-[10px] tracking-[0.15em] uppercase mb-4 font-bold">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.04em] hover:text-[#C5A059] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-white/[0.04] mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-rajdhani text-zinc-700 text-[11px] tracking-[0.04em]">
            © {new Date().getFullYear()} JEERA. All rights
            reserved. Made in India 🇮🇳
          </p>

          <div className="flex items-center gap-2.5">
            {[Twitter, Instagram, Github, Mail].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-md flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                  aria-label="Social"
                >
                  <Icon size={13} color="#3F3F46" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ─── MAIN ────────────────────────────────────────────────────────────────────

const LandingPage = () => {
  useEffect(() => {
    const origBody = document.body.style.cssText;
    const origHtml = document.documentElement.style.cssText;
    const root = document.getElementById('root');
    const origRoot = root ? root.style.cssText : '';

    document.body.style.cssText = `
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      overflow-y: auto;
      height: auto;
      background: #000000;
    `;
    document.documentElement.style.cssText = `
      overflow-x: hidden;
      overflow-y: auto;
      height: auto;
      scroll-behavior: smooth;
    `;
    if (root) {
      root.style.cssText = `
        min-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        height: auto;
      `;
    }

    return () => {
      document.body.style.cssText = origBody;
      document.documentElement.style.cssText = origHtml;
      if (root) root.style.cssText = origRoot;
    };
  }, []);

  return (
    <div
      style={{
        background: '#000000',
        color: '#ffffff',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <DownloadSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;