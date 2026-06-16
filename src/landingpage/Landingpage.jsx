// src/screens/LandingPage/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Monitor, Laptop, Download, Shield, Users, Dumbbell, Check,
  ArrowRight, Play, Zap, BarChart3, Bell, Crown, Menu, X,
  ChevronDown, Lock, RefreshCw, MessageSquare, IndianRupee,
  UserCheck, CalendarCheck, Heart, Github, Twitter, Instagram,
  Mail, Phone, MapPin, ArrowUp, Layers, Trophy,
  Smartphone, MapPinned, Wifi, LogIn, LogOut, Fingerprint,
  UserPlus, Users2, Sparkles, Star,
} from 'lucide-react';

/* ── BRAND ── */
const BRAND = {
  name: 'GYMVERSE',
  tagline: 'Gym Management Simplified',
  gold: '#C5A059',
  goldLight: '#EAB308',
  version: 'v1.0.11',
  size: { windows: '81.39 MB', macArm: '98.97 MB', macIntel: '103.29 MB' },
};

const DOWNLOAD_LINKS = {
  windows: 'https://github.com/abdullahahmed-abd/gym-web/releases/latest/download/GymPro.Admin.1.0.0.1.exe',
  macArm: 'https://github.com/abdullahahmed-abd/gym-web/releases/latest/download/GymPro.Admin-1.0.0-mac-arm64.1.dmg',
  macIntel: 'https://github.com/abdullahahmed-abd/gym-web/releases/latest/download/GymPro.Admin-1.0.0-mac-x64.1.dmg',
};

/* ── DATA ── */
const NAV_LINKS = ['Features', 'How It Works', 'Pricing', 'FAQ', 'Download'];

/* ── Multi-Language REMOVED, Friends ADDED ── */
const FEATURES = [
  { icon: Users,       title: 'Member Management',  desc: 'Add, edit, search members instantly. Track plans, joining dates, photos and complete history.',                            color: '#3B82F6' },
  { icon: IndianRupee, title: 'Payment & Billing',   desc: 'Track every rupee. Pending payments, received amounts, due dates — all automated.',                                       color: '#22C55E' },
  { icon: Bell,        title: 'Smart Reminders',     desc: 'Auto WhatsApp & SMS reminders for renewals, birthdays, and payment dues.',                                              color: '#EAB308' },
  { icon: BarChart3,   title: 'Analytics Dashboard', desc: 'Revenue graphs, member growth trends, monthly reports — everything at a glance.',                                        color: '#A855F7' },
  { icon: MapPinned,   title: 'Auto Check-In/Out',   desc: 'Members auto check-in within 200m of gym. Auto checkout when they leave. Manual option available too.',                  color: '#F97316' },
  { icon: UserCheck,   title: 'Staff & Trainers',    desc: 'Manage trainers, assign members, track performance and salary records.',                                               color: '#06B6D4' },
  { icon: Smartphone,  title: 'Member App',          desc: 'Dedicated app for members — view plans, track attendance, receive notifications & manage their profile.',               color: '#EC4899' },
  { icon: Users2,      title: 'Friends at Gym',      desc: 'Members connect via Gym ID. Send friend requests, get notified when friends check in — workout together!',             color: '#8B5CF6' },
  { icon: Lock,        title: 'Secure & Private',    desc: 'Bank-level encryption. Your data stays on your device. Zero cloud dependency.',                                        color: '#EF4444' },
  { icon: RefreshCw,   title: 'Auto Backup',         desc: 'Automatic local + cloud backups. Restore your entire data in one click.',                                             color: '#10B981' },
  { icon: Monitor,     title: '3 Device Access',     desc: 'Use on up to 3 devices — Desktop, Laptop & Mobile. Same email login across all devices.',                             color: '#C5A059' },
  { icon: Fingerprint, title: 'Same Email Login',    desc: 'One email, all devices. Login from any registered device with the same credentials seamlessly.',                       color: '#0EA5E9' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Download App',       desc: 'Download for Windows or Mac. Install in under 2 minutes. Members download their app from Play Store / App Store.',                         icon: Download },
  { step: '02', title: 'Register Gym',       desc: 'Enter gym name, your details, set gym location for auto check-in radius. One-time 30 second setup.',                                      icon: Dumbbell },
  { step: '03', title: 'Add Members',        desc: 'Start adding members with plans. Each member gets a unique Gym ID to connect with friends in the Member App.',                             icon: Users    },
  { step: '04', title: 'Everything on Auto', desc: 'Payments, reminders, geo check-in/out, friends notifications, reports — autopilot mode. Members manage from their app.', icon: Zap      },
];

const PLANS = [
  { id: '1m', duration: '1 Month',  price: 1500,  perMonth: 1500, popular: false, save: null  },
  { id: '3m', duration: '3 Months', price: 4000,  perMonth: 1333, popular: true,  save: '11%' },
  { id: '6m', duration: '6 Months', price: 7500,  perMonth: 1250, popular: false, save: '17%' },
  { id: '9m', duration: '9 Months', price: 10500, perMonth: 1167, popular: false, save: '22%' },
  { id: '1y', duration: '1 Year',   price: 13500, perMonth: 1125, popular: false, save: '25%' },
];

const PLAN_FEATURES = [
  'All Features Unlocked', 'Unlimited Members', 'WhatsApp & SMS Alerts',
  'Analytics & Reports',   'Auto Backup',       'Priority Support',
  '3 Device Access',       'Member App + Friends',
];

const MEMBERSHIP_TIERS = [
  {
    name: 'ELITE TIER',
    icon: Crown,
    color: '#C5A059',
    glow: 'rgba(197,160,89,0.08)',
    border: 'rgba(197,160,89,0.25)',
    badge: 'ELITE',
    tagline: 'Cardio + Weight Training',
    perks: [
      'Full gym access — cardio + weights',
      'Unlimited daily sessions',
      'Personal locker included',
      'Fitness assessment monthly',
      'WhatsApp renewal reminders',
      'Friends check-in notifications',
    ],
    desc: 'The complete package. Full access to all gym equipment — cardio machines, free weights, and everything in between.',
  },
  {
    name: 'LEGENDARY TIER',
    icon: Sparkles,
    color: '#A855F7',
    glow: 'rgba(168,85,247,0.08)',
    border: 'rgba(168,85,247,0.25)',
    badge: 'LEGENDARY',
    tagline: 'Weight Training Only',
    perks: [
      'Weight zone full access',
      'Free weights & all machines',
      'Strength program support',
      'Progress tracking in app',
      'Personal trainer support',
      'Friends check-in notifications',
    ],
    desc: 'Built for serious lifters. Unlimited access to the weight zone — free weights, cables, machines, and more.',
  },
];

const FAQS = [
  { q: 'Is the app free?',             a: 'Yes! Download and basic features are completely free. Premium plans unlock all features at affordable prices.' },
  { q: 'Do I need internet?',          a: 'The admin app works offline. Internet is needed for WhatsApp reminders, cloud backup, and member app sync.' },
  { q: 'Is my data safe?',             a: 'Absolutely! Data is stored in encrypted form on your device. We never access your data.' },
  { q: 'How many members can I add?',  a: 'Unlimited! Whether you have 10 or 10,000 members — there is no limit in any plan.' },
  { q: 'How does auto check-in work?', a: 'Members auto check-in when within 200m of your gym location. When they move beyond 200m, they auto checkout. Manual check-in/out is also available.' },
  { q: 'How does the Friends feature work?', a: 'Every member gets a unique Gym ID. Members can search and send friend requests using that ID in the Member App. When a friend checks in to the gym, all their connected friends get an instant notification — so they can coordinate workouts!' },
  { q: 'What is the Member App?',      a: 'A separate app for members to view their plans, attendance history, receive notifications, connect with gym friends, and manage their gym profile.' },
  { q: 'How many devices can I use?',  a: 'Up to 3 devices with the same email — Desktop, Laptop & Mobile. All data syncs automatically.' },
  { q: 'Will I get a refund?',         a: "7-day full refund policy. If you don't like it, 100% refund — no questions asked." },
  { q: 'How do I get support?',        a: 'WhatsApp, Email and Phone support. Premium users get guaranteed response within 2 hours.' },
];

/* ── Helpers ── */
const scrollToId = id => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const GradientText = ({ children, className = '' }) => (
  <span className={className}
    style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`,
             WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
    {children}
  </span>
);

const SectionBadge = ({ icon: Icon, text, color }) => (
  <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
    style={{
      background: color ? `${color}08` : 'rgba(197,160,89,0.06)',
      border: `1px solid ${color ? `${color}20` : 'rgba(197,160,89,0.15)'}`,
    }}>
    <Icon size={13} color={color || BRAND.gold} />
    <span className="font-rajdhani text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold"
      style={{ color: color || BRAND.gold }}>{text}</span>
  </div>
);

/* ── Scroll to Top ── */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, boxShadow: '0 4px 24px rgba(197,160,89,0.35)' }}>
      <ArrowUp size={18} color="#000" />
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* NAVBAR                                                          */
/* ═══════════════════════════════════════════════════════════════ */
const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const go = id => { setIsOpen(false); scrollToId(id); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2.5' : 'py-4'}`}
      style={{
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(197,160,89,0.06)' : '1px solid transparent',
      }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => go('hero')}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: `${BRAND.gold}20`, border: `1px solid ${BRAND.gold}25` }}>
            <Dumbbell size={17} color={BRAND.gold} />
          </div>
          <div>
            <span className="font-orbitron text-[15px] md:text-[17px] font-bold tracking-[0.12em]">
              <span className="text-white">GYM</span><span style={{ color: BRAND.gold }}>VERSE</span>
            </span>
            <p className="font-rajdhani text-zinc-600 text-[8px] tracking-[0.2em] uppercase -mt-0.5 hidden md:block">{BRAND.tagline}</p>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map(item => (
            <button key={item} onClick={() => go(item.toLowerCase().replace(/\s+/g, '-'))}
              className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase hover:text-[#C5A059] transition-colors">
              {item}
            </button>
          ))}
          <a href="#/login"
            className="px-5 py-2 rounded-lg font-rajdhani text-[#C5A059] text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 hover:scale-105 transition-all"
            style={{ background: 'rgba(197,160,89,0.06)', border: '1px solid rgba(197,160,89,0.18)' }}>
            <Shield size={12} />Login
          </a>
          <button onClick={() => go('download')}
            className="px-5 py-2 rounded-lg font-rajdhani text-black text-[10px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 hover:scale-105 transition-all"
            style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})` }}>
            <Download size={12} />Download
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {isOpen ? <X size={18} color="#fff" /> : <Menu size={18} color="#fff" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="mt-2 mx-4 p-5 rounded-2xl" style={{ background: 'rgba(5,5,5,0.98)', border: '1px solid rgba(197,160,89,0.10)' }}>
          {NAV_LINKS.map(item => (
            <button key={item} onClick={() => go(item.toLowerCase().replace(/\s+/g, '-'))}
              className="block w-full text-left font-rajdhani text-zinc-300 text-[13px] tracking-[0.12em] uppercase py-2.5 px-3 rounded-lg hover:bg-white/[0.03]">
              {item}
            </button>
          ))}
          <div className="h-px bg-white/[0.06] my-3" />
          <a href="#/login" onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-lg font-rajdhani text-[#C5A059] text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2"
            style={{ background: 'rgba(197,160,89,0.06)', border: '1px solid rgba(197,160,89,0.15)' }}>
            <Shield size={13} />Login
          </a>
          <button onClick={() => go('download')}
            className="w-full mt-2 py-2.5 rounded-lg font-rajdhani text-black text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})` }}>
            <Download size={13} />Download Free
          </button>
        </div>
      </div>
    </nav>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* HERO                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
    <div className="absolute inset-0" style={{ background: '#000' }} />
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(197,160,89,0.06) 0%, transparent 100%)' }} />
    <div className="absolute inset-0 opacity-[0.015]"
      style={{ backgroundImage: `linear-gradient(rgba(197,160,89,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.5) 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />

    <div className="relative text-center max-w-5xl mx-auto">

      {/* Dual app badge */}
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10"
        style={{ background: 'rgba(197,160,89,0.06)', border: '1px solid rgba(197,160,89,0.18)' }}>
        <div className="flex items-center gap-1.5">
          <Monitor size={12} color={BRAND.gold} />
          <span className="font-rajdhani text-[#C5A059] text-[9px] tracking-[0.15em] uppercase font-bold">Admin App</span>
        </div>
        <div className="w-px h-4 bg-white/[0.12]" />
        <div className="flex items-center gap-1.5">
          <Smartphone size={12} color={BRAND.gold} />
          <span className="font-rajdhani text-[#C5A059] text-[9px] tracking-[0.15em] uppercase font-bold">Member App</span>
        </div>
      </div>

      <h1 className="font-orbitron text-white text-[30px] md:text-[46px] lg:text-[58px] font-bold leading-[1.05] tracking-[0.04em] mb-3">
        YOUR GYM.
      </h1>
      <h1 className="font-orbitron text-[30px] md:text-[46px] lg:text-[58px] font-bold leading-[1.05] tracking-[0.04em] mb-3">
        <GradientText>YOUR RULES.</GradientText>
      </h1>
      <h2 className="font-orbitron text-zinc-400 text-[18px] md:text-[26px] lg:text-[20px] font-bold tracking-[0.06em] mb-8">
        TWO POWERFUL APPS.
      </h2>

      <p className="font-rajdhani text-zinc-500 text-[14px] md:text-[16px] tracking-[0.04em] max-w-3xl mx-auto mb-5 leading-[1.8]">
        Members, payments, attendance, reminders, analytics — everything in one place.
        <span className="text-white font-semibold"> Separate Member App</span> with plans, attendance tracking,
        geo check-in & a <span className="text-white font-semibold">Friends feature</span> to connect with gym buddies.
      </p>

      {/* Friends highlight */}
      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-4"
        style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.18)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.22)' }}>
          <Users2 size={15} color="#8B5CF6" />
        </div>
        <div className="text-left">
          <p className="font-rajdhani text-purple-400 text-[11px] font-bold tracking-[0.10em] uppercase">
            Friends at Gym — New Feature
          </p>
          <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">
            Connect via Gym ID · Get notified when friends check in · Workout together
          </p>
        </div>
      </div>

      {/* Geo check-in highlight */}
      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl mb-10 ml-0 md:ml-3"
        style={{ background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.20)' }}>
          <MapPinned size={15} color="#F97316" />
        </div>
        <div className="text-left">
          <p className="font-rajdhani text-orange-400 text-[11px] font-bold tracking-[0.10em] uppercase">
            Auto Geo Check-In / Check-Out
          </p>
          <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">
            Within 200m → Auto Check-In · Beyond 200m → Auto Checkout
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
        <button onClick={() => scrollToId('download')}
          className="group px-8 py-3.5 rounded-xl font-rajdhani text-black text-[12px] md:text-[13px] font-bold tracking-[0.15em] uppercase flex items-center gap-3 transition-all hover:scale-105 w-full sm:w-auto justify-center"
          style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, boxShadow: '0 8px 40px rgba(197,160,89,0.20)' }}>
          <Download size={16} />Download Free
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={() => scrollToId('features')}
          className="px-8 py-3.5 rounded-xl font-rajdhani text-zinc-400 text-[12px] md:text-[13px] tracking-[0.15em] uppercase flex items-center gap-3 transition-all hover:scale-105 hover:text-white w-full sm:w-auto justify-center"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Play size={14} />See Features
        </button>
      </div>

      {/* Key highlights grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
        {[
          { icon: Monitor,    label: '3 Device Access', sub: 'Same email login'     },
          { icon: Smartphone, label: 'Member App',       sub: 'Separate for members' },
          { icon: Users2,     label: 'Friends Feature',  sub: 'Gym ID connect'      },
          { icon: MapPinned,  label: 'Auto Check-In',    sub: '200m geo-fence'      },
        ].map(item => (
          <div key={item.label} className="text-center py-4 px-3 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2.5"
              style={{ background: `${BRAND.gold}10`, border: `1px solid ${BRAND.gold}18` }}>
              <item.icon size={16} color={BRAND.gold} />
            </div>
            <p className="font-orbitron text-white text-[10px] font-bold tracking-[0.08em] mb-0.5">{item.label}</p>
            <p className="font-rajdhani text-zinc-600 text-[9px] tracking-[0.10em] uppercase">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 flex-wrap">
        {[{ icon: Monitor, label: 'Windows' }, { icon: Laptop, label: 'macOS' }, { icon: Smartphone, label: 'Member App' }].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 opacity-35">
            <Icon size={12} color="#fff" />
            <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.12em] uppercase">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* FEATURES                                                        */
/* ═══════════════════════════════════════════════════════════════ */
const FeaturesSection = () => (
  <section id="features" className="py-20 md:py-28 px-6" style={{ background: '#030303' }}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <SectionBadge icon={Zap} text="Powerful Features" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          EVERYTHING YOUR GYM <GradientText>NEEDS</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] max-w-2xl mx-auto mb-6">
          Admin app for management. Member app with friends & geo check-in. Both work seamlessly together.
        </p>

        <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl mb-14"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <Monitor size={14} color={BRAND.gold} />
            <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-bold">Admin App</span>
          </div>
          <div className="w-5 h-px bg-white/[0.08]" />
          <div className="flex items-center gap-2">
            <Smartphone size={14} color="#EC4899" />
            <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-bold">Member App</span>
          </div>
          <div className="w-5 h-px bg-white/[0.08]" />
          <div className="flex items-center gap-2">
            <Users2 size={14} color="#8B5CF6" />
            <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-bold">Friends</span>
          </div>
          <div className="w-5 h-px bg-white/[0.08]" />
          <div className="flex items-center gap-2">
            <MapPinned size={14} color="#F97316" />
            <span className="font-rajdhani text-zinc-400 text-[10px] tracking-[0.12em] uppercase font-bold">Geo Check-In</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {FEATURES.map(f => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="group p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `${f.color}10`, border: `1px solid ${f.color}18` }}>
                <Icon size={18} color={f.color} />
              </div>
              <h3 className="font-orbitron text-white text-[11px] md:text-[12px] tracking-[0.10em] mb-2 font-bold">
                {f.title.toUpperCase()}
              </h3>
              <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.02em] leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* FRIENDS FEATURE SECTION (NEW)                                   */
/* ═══════════════════════════════════════════════════════════════ */
const FriendsSection = () => (
  <section className="py-16 md:py-24 px-6"
    style={{ background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.04) 0%, #000 70%)' }}>
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <SectionBadge icon={Users2} text="Friends at Gym" color="#8B5CF6" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          WORKOUT WITH <GradientText>FRIENDS</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] max-w-xl mx-auto">
          Every member gets a unique Gym ID. Connect, get notified, and train together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: UserPlus, color: '#8B5CF6', badge: 'CONNECT',
            title: 'ADD VIA GYM ID',
            desc: 'Every member has a unique Gym ID. Search and send friend requests directly from the Member App.',
          },
          {
            icon: Bell, color: '#EC4899', badge: 'NOTIFY',
            title: 'CHECK-IN ALERT',
            desc: 'When a friend checks in to the gym, all connected friends receive an instant push notification.',
          },
          {
            icon: Users2, color: '#22C55E', badge: 'TOGETHER',
            title: 'TRAIN TOGETHER',
            desc: 'Know who\'s at the gym right now. Coordinate your workout sessions with your gym crew.',
          },
        ].map(item => (
          <div key={item.title} className="group p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 group-hover:rotate-6"
              style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
              <item.icon size={22} style={{ color: item.color }} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg mb-3"
              style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
              <span className="font-orbitron text-[8px] font-bold tracking-widest" style={{ color: item.color }}>{item.badge}</span>
            </div>
            <h3 className="font-orbitron text-white text-[12px] tracking-[0.10em] mb-2 font-bold">{item.title}</h3>
            <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.02em] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* How it works strip */}
      <div className="p-5 rounded-2xl"
        style={{ background: 'rgba(139,92,246,0.04)', border: '1px solid rgba(139,92,246,0.15)' }}>
        <p className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-semibold text-center mb-4">How Friends Work</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { n: '1', text: 'Each member gets unique Gym ID on signup' },
            { n: '2', text: 'Search friend by Gym ID in Member App'    },
            { n: '3', text: 'Send & accept friend request'              },
            { n: '4', text: 'Get notified when friend checks in!'       },
          ].map(s => (
            <div key={s.n} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 font-orbitron text-[11px] font-bold"
                style={{ background: 'rgba(139,92,246,0.15)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.22)' }}>
                {s.n}
              </div>
              <span className="font-rajdhani text-zinc-400 text-[11px] tracking-wide leading-tight">{s.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* GEO CHECK-IN SECTION                                            */
/* ═══════════════════════════════════════════════════════════════ */
const GeoCheckInSection = () => (
  <section className="py-16 md:py-24 px-6" style={{ background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.03) 0%, #000 70%)' }}>
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <SectionBadge icon={MapPinned} text="Smart Attendance" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          AUTO <GradientText>CHECK-IN / CHECK-OUT</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] max-w-xl mx-auto">
          No more manual attendance. Members just walk in — the app does the rest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: LogIn,     color: '#22C55E', badge: 'ENTRY', title: 'AUTO CHECK-IN',  desc: 'Member enters 200m radius of gym → automatically marked as checked in'  },
          { icon: LogOut,    color: '#EAB308', badge: 'EXIT',  title: 'AUTO CHECK-OUT', desc: 'Member moves beyond 200m from gym → automatically marked as checked out' },
          { icon: UserCheck, color: '#3B82F6', badge: 'ADMIN', title: 'MANUAL MODE',    desc: 'Admin can also manually check-in or check-out any member from dashboard'  },
        ].map(item => (
          <div key={item.title} className="group p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 group-hover:rotate-6"
              style={{ background: `${item.color}10`, border: `1px solid ${item.color}18` }}>
              <item.icon size={22} style={{ color: item.color }} />
            </div>
            <div className="inline-flex px-3 py-1 rounded-lg mb-3"
              style={{ background: `${item.color}10`, border: `1px solid ${item.color}18` }}>
              <span className="font-orbitron text-[8px] font-bold tracking-widest" style={{ color: item.color }}>{item.badge}</span>
            </div>
            <h3 className="font-orbitron text-white text-[12px] tracking-[0.10em] mb-2 font-bold">{item.title}</h3>
            <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.02em] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-5 rounded-2xl flex flex-col md:flex-row items-center gap-4 md:gap-6"
        style={{ background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.15)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.20)' }}>
            <Wifi size={16} color="#F97316" />
          </div>
          <div>
            <p className="font-orbitron text-orange-400 text-[11px] font-bold tracking-[0.10em]">200M GEO-FENCE</p>
            <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">GPS-based automatic radius detection</p>
          </div>
        </div>
        <div className="hidden md:block w-px h-8 bg-white/[0.06]" />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.18)' }}>
            <Smartphone size={16} color="#22C55E" />
          </div>
          <div>
            <p className="font-orbitron text-green-400 text-[11px] font-bold tracking-[0.10em]">MEMBER APP</p>
            <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">Works from the member's own phone automatically</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* MEMBERSHIP TIERS SECTION (NEW — Elite + Legendary)             */
/* ═══════════════════════════════════════════════════════════════ */
const MembershipTiersSection = () => (
  <section className="py-16 md:py-24 px-6" style={{ background: '#030303' }}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <SectionBadge icon={Crown} text="Membership Tiers" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          TWO POWERFUL <GradientText>MEMBERSHIPS</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] max-w-xl mx-auto">
          Every gym can offer two tiers — Elite and Legendary. Each member gets their own Gym ID, Member App access & friends feature.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MEMBERSHIP_TIERS.map(tier => {
          const TierIcon = tier.icon;
          return (
            <div key={tier.name} className="relative p-7 rounded-3xl overflow-hidden"
              style={{ background: '#000', border: `1px solid ${tier.border}`, boxShadow: `0 8px 40px ${tier.glow}` }}>

              {/* Top accent */}
              <div className="absolute top-0 left-8 right-8 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${tier.color}50, transparent)` }} />

              {/* Watermark icon */}
              <div className="absolute -top-6 -right-6 pointer-events-none" style={{ opacity: 0.04 }}>
                <TierIcon size={140} color={tier.color} />
              </div>

              <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${tier.color}12`, border: `1px solid ${tier.color}25` }}>
                    <TierIcon size={26} style={{ color: tier.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-orbitron text-[9px] font-bold tracking-[0.20em] px-2.5 py-1 rounded-lg"
                        style={{ background: `${tier.color}12`, color: tier.color, border: `1px solid ${tier.color}22` }}>
                        {tier.badge}
                      </span>
                    </div>
                    <h3 className="font-orbitron font-bold text-[20px] tracking-[0.08em]" style={{ color: tier.color }}>
                      {tier.name}
                    </h3>
                    <p className="font-rajdhani text-[12px] tracking-[0.10em] uppercase font-semibold mt-0.5"
                      style={{ color: `${tier.color}80` }}>
                      {tier.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="font-rajdhani text-zinc-400 text-[13px] tracking-wide leading-relaxed mb-5">
                  {tier.desc}
                </p>

                {/* Divider */}
                <div className="h-px mb-5" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}20, transparent)` }} />

                {/* Perks */}
                <div className="space-y-2.5">
                  {tier.perks.map(perk => (
                    <div key={perk} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: `${tier.color}12`, border: `1px solid ${tier.color}20` }}>
                        <Check size={10} color={tier.color} strokeWidth={3} />
                      </div>
                      <span className="font-rajdhani text-zinc-400 text-[12px] tracking-wide">{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom info */}
                <div className="mt-6 p-3.5 rounded-2xl flex items-center gap-3"
                  style={{ background: `${tier.color}05`, border: `1px solid ${tier.color}12` }}>
                  <Smartphone size={14} style={{ color: `${tier.color}80` }} />
                  <span className="font-rajdhani text-[11px] tracking-wider" style={{ color: `${tier.color}90` }}>
                    Includes Member App + Gym ID + Friends Feature
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* HOW IT WORKS                                                    */
/* ═══════════════════════════════════════════════════════════════ */
const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-28 px-6"
    style={{ background: 'radial-gradient(ellipse at bottom left, rgba(197,160,89,0.03) 0%, #000 60%)' }}>
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <SectionBadge icon={Layers} text="Simple Setup" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          START IN <GradientText>4 STEPS</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-14">
          From download to managing your gym — under 5 minutes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HOW_IT_WORKS.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.step} className="relative p-6 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <span className="font-orbitron text-[36px] font-bold" style={{ color: `${BRAND.gold}10` }}>{item.step}</span>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: `${BRAND.gold}10`, border: `1px solid ${BRAND.gold}18` }}>
                    <Icon size={18} color={BRAND.gold} />
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-orbitron text-white text-[13px] tracking-[0.08em] mb-1.5 font-bold">{item.title.toUpperCase()}</h3>
                  <p className="font-rajdhani text-zinc-500 text-[13px] tracking-[0.02em] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* DEVICE SECTION                                                  */
/* ═══════════════════════════════════════════════════════════════ */
const DeviceSection = () => (
  <section className="py-16 md:py-24 px-6" style={{ background: '#000' }}>
    <div className="max-w-4xl mx-auto text-center">
      <SectionBadge icon={Monitor} text="Multi-Device" />
      <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
        3 DEVICES. <GradientText>ONE EMAIL.</GradientText>
      </h2>
      <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] max-w-xl mx-auto mb-12">
        Login from up to 3 devices with the same email. All data syncs automatically.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Monitor,    label: 'Desktop', sub: 'Windows PC'       },
          { icon: Laptop,     label: 'Laptop',  sub: 'Windows / macOS' },
          { icon: Smartphone, label: 'Mobile',   sub: 'Admin on the go' },
        ].map((d, i) => (
          <div key={d.label} className="group p-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1"
            style={{
              background: i === 0 ? 'rgba(197,160,89,0.04)' : 'rgba(255,255,255,0.01)',
              border: i === 0 ? '1px solid rgba(197,160,89,0.20)' : '1px solid rgba(255,255,255,0.05)',
            }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110 group-hover:rotate-6"
              style={{ background: `${BRAND.gold}10`, border: `1px solid ${BRAND.gold}18` }}>
              <d.icon size={24} color={BRAND.gold} />
            </div>
            <h3 className="font-orbitron text-white text-[13px] tracking-[0.10em] mb-1 font-bold">{d.label.toUpperCase()}</h3>
            <p className="font-rajdhani text-zinc-600 text-[11px] tracking-[0.08em] uppercase">{d.sub}</p>
          </div>
        ))}
      </div>

      <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl"
        style={{ background: 'rgba(197,160,89,0.05)', border: '1px solid rgba(197,160,89,0.15)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${BRAND.gold}12`, border: `1px solid ${BRAND.gold}20` }}>
          <Fingerprint size={15} color={BRAND.gold} />
        </div>
        <div className="text-left">
          <p className="font-orbitron text-[#C5A059] text-[11px] font-bold tracking-[0.10em]">SAME EMAIL LOGIN</p>
          <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">One account · All devices · Auto sync</p>
        </div>
        <div className="w-px h-8 bg-white/[0.08] mx-2" />
        <div className="text-center">
          <span className="font-orbitron text-[#C5A059] text-[22px] font-bold block">3</span>
          <span className="font-rajdhani text-zinc-600 text-[9px] tracking-widest uppercase">Max Devices</span>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* PRICING                                                         */
/* ═══════════════════════════════════════════════════════════════ */
const PricingSection = () => (
  <section id="pricing" className="py-20 md:py-28 px-6" style={{ background: '#030303' }}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center">
        <SectionBadge icon={Crown} text="Affordable Pricing" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          SIMPLE & <GradientText>TRANSPARENT</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-14">
          Start free. Upgrade from inside the app. All plans include 3 devices + Member App + Friends feature.
        </p>
      </div>

      {/* Free tier */}
      <div className="p-5 md:p-7 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-5"
        style={{ background: 'rgba(34,197,94,0.03)', border: '1px solid rgba(34,197,94,0.10)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(34,197,94,0.08)' }}>
            <Heart size={20} color="#22C55E" />
          </div>
          <div>
            <h3 className="font-orbitron text-white text-[14px] tracking-[0.08em] font-bold">FREE FOREVER</h3>
            <p className="font-rajdhani text-zinc-500 text-[12px] tracking-[0.06em] mt-0.5">Basic features. No credit card. Upgrade anytime.</p>
          </div>
        </div>
        <button onClick={() => scrollToId('download')}
          className="px-5 py-2.5 rounded-lg font-rajdhani text-green-400 text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 hover:scale-105 transition-all whitespace-nowrap"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
          <Download size={13} />Start Free
        </button>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {PLANS.map(plan => (
          <div key={plan.id} className="relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              background: plan.popular ? 'rgba(197,160,89,0.03)' : 'rgba(255,255,255,0.01)',
              border: plan.popular ? '1px solid rgba(197,160,89,0.30)' : '1px solid rgba(255,255,255,0.04)',
            }}>
            {plan.popular && (
              <>
                <div className="absolute -top-px left-6 right-6 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)` }} />
                <div className="text-center mb-3">
                  <span className="px-3 py-1 rounded-full font-rajdhani text-[9px] font-bold tracking-[0.18em] uppercase"
                    style={{ background: `${BRAND.gold}15`, color: BRAND.gold }}>★ Popular</span>
                </div>
              </>
            )}
            <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.15em] uppercase text-center">{plan.duration}</p>
            <div className="text-center my-3">
              <span className="font-rajdhani text-zinc-600 text-[14px]">₹</span>
              <span className="font-orbitron text-white text-[26px] font-bold">{plan.price.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-center font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase">₹{plan.perMonth.toLocaleString('en-IN')}/mo</p>
            {plan.save && (
              <div className="text-center mt-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full font-rajdhani text-[9px] tracking-[0.12em] uppercase font-bold"
                  style={{ background: 'rgba(34,197,94,0.08)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.15)' }}>
                  Save {plan.save}
                </span>
              </div>
            )}
            <div className="space-y-2 my-4">
              {PLAN_FEATURES.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <Check size={10} color={BRAND.gold} />
                  <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.04em]">{f}</span>
                </div>
              ))}
            </div>
            <button onClick={() => scrollToId('download')}
              className="block w-full py-2.5 rounded-lg text-center font-rajdhani text-[10px] font-bold tracking-[0.15em] uppercase transition-all hover:scale-[1.03]"
              style={plan.popular
                ? { background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: '#000' }
                : { background: `${BRAND.gold}06`, color: BRAND.gold, border: `1px solid ${BRAND.gold}15` }
              }>Get Started</button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
        {[
          { icon: Shield,    text: 'Razorpay Secured' },
          { icon: RefreshCw, text: '7-Day Refund'     },
          { icon: Lock,      text: 'No Auto-Renewal'  },
          { icon: Users2,    text: 'Friends Included' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5 opacity-40">
            <Icon size={12} />
            <span className="font-rajdhani text-zinc-500 text-[10px] tracking-[0.1em] uppercase">{text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* FAQ                                                             */
/* ═══════════════════════════════════════════════════════════════ */
const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="rounded-xl overflow-hidden transition-all duration-300"
    style={{
      background: isOpen ? 'rgba(197,160,89,0.02)' : 'rgba(255,255,255,0.01)',
      border: isOpen ? '1px solid rgba(197,160,89,0.18)' : '1px solid rgba(255,255,255,0.04)',
    }}>
    <button onClick={onToggle} className="w-full p-5 flex items-center justify-between gap-4 text-left">
      <span className="font-rajdhani text-white text-[13px] md:text-[14px] tracking-[0.02em] font-bold">{faq.q}</span>
      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{ background: isOpen ? `${BRAND.gold}12` : 'rgba(255,255,255,0.03)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
        <ChevronDown size={14} color={isOpen ? BRAND.gold : '#52525B'} />
      </div>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[240px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-5 pb-5">
        <p className="font-rajdhani text-zinc-500 text-[13px] tracking-[0.02em] leading-relaxed">{faq.a}</p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="py-20 md:py-28 px-6" style={{ background: '#000' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <SectionBadge icon={MessageSquare} text="FAQ" />
          <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
            COMMON <GradientText>QUESTIONS</GradientText>
          </h2>
          <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-14">
            Everything you need to know.
          </p>
        </div>
        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.06em] mb-2">Still have questions?</p>
          <a href="mailto:support@gymverse.app"
            className="inline-flex items-center gap-2 font-rajdhani text-[#C5A059] text-[12px] tracking-[0.1em] uppercase font-bold hover:underline underline-offset-4">
            <Mail size={13} />Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* DOWNLOAD                                                        */
/* ═══════════════════════════════════════════════════════════════ */
const DownloadSection = () => {
  const platforms = [
    { icon: Monitor, name: 'Windows', sub: 'Windows 10/11', file: '.exe', size: BRAND.size.windows, link: DOWNLOAD_LINKS.windows, primary: true },
    { icon: Laptop,  name: 'macOS (Apple Silicon)', sub: 'M1/M2/M3', file: '.dmg', size: BRAND.size.macArm, link: DOWNLOAD_LINKS.macArm, primary: false },
    { icon: Laptop,  name: 'macOS (Intel)', sub: 'Intel x64', file: '.dmg', size: BRAND.size.macIntel, link: DOWNLOAD_LINKS.macIntel, primary: false },
  ];

  return (
    <section id="download" className="py-20 md:py-28 px-6"
      style={{ background: 'radial-gradient(ellipse at center, rgba(197,160,89,0.04) 0%, #030303 70%)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <SectionBadge icon={Download} text="Get Started" />
        <h2 className="font-orbitron text-white text-[22px] md:text-[30px] lg:text-[36px] font-bold tracking-[0.08em] mb-4">
          DOWNLOAD <GradientText>{BRAND.name}</GradientText>
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[13px] md:text-[15px] tracking-[0.04em] mb-3">
          Admin app for Desktop. Member app coming on Play Store & App Store.
        </p>
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.12em] uppercase">{BRAND.version} • Latest</span>
          <div className="w-px h-3 bg-white/[0.08]" />
          <span className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.12em] uppercase">3 Device Limit</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {platforms.map(p => {
            const Icon = p.icon;
            return (
              <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer"
                className="group p-6 md:p-7 rounded-2xl text-center transition-all duration-300 hover:-translate-y-2 block"
                style={{
                  background: p.primary ? 'rgba(197,160,89,0.03)' : 'rgba(255,255,255,0.01)',
                  border: p.primary ? '1px solid rgba(197,160,89,0.25)' : '1px solid rgba(255,255,255,0.04)',
                }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{
                    background: p.primary ? `${BRAND.gold}10` : 'rgba(255,255,255,0.03)',
                    border: p.primary ? `1px solid ${BRAND.gold}18` : '1px solid rgba(255,255,255,0.06)',
                  }}>
                  <Icon size={24} color={p.primary ? BRAND.gold : '#fff'} />
                </div>
                <h3 className="font-orbitron text-white text-[11px] tracking-[0.10em] mb-0.5 font-bold">{p.name.toUpperCase()}</h3>
                <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase mb-4">{p.sub}</p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-rajdhani text-[10px] font-bold tracking-[0.12em] uppercase group-hover:scale-105 transition-all"
                  style={p.primary
                    ? { background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, color: '#000' }
                    : { background: `${BRAND.gold}06`, color: BRAND.gold, border: `1px solid ${BRAND.gold}15` }
                  }>
                  <Download size={12} />Download {p.file}
                </div>
                <p className="font-rajdhani text-zinc-700 text-[9px] tracking-[0.1em] uppercase mt-2.5">{p.size} • {BRAND.version}</p>
              </a>
            );
          })}
        </div>

        {/* Member app teaser */}
        <div className="mt-8 p-5 rounded-2xl max-w-md mx-auto"
          style={{ background: 'rgba(139,92,246,0.03)', border: '1px solid rgba(139,92,246,0.15)' }}>
          <div className="flex items-center gap-4 justify-center">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.22)' }}>
              <Smartphone size={16} color="#8B5CF6" />
            </div>
            <div className="text-left">
              <p className="font-orbitron text-purple-400 text-[11px] font-bold tracking-[0.08em]">MEMBER APP</p>
              <p className="font-rajdhani text-zinc-600 text-[10px] tracking-wider">Play Store & App Store — Coming Soon · Includes Friends feature</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl max-w-md mx-auto"
          style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <p className="font-rajdhani text-zinc-600 text-[10px] tracking-[0.1em] uppercase mb-1">Minimum Requirements</p>
          <p className="font-rajdhani text-zinc-500 text-[11px] tracking-[0.04em]">4 GB RAM · 200 MB Storage · 3 Device Limit</p>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* CTA                                                             */
/* ═══════════════════════════════════════════════════════════════ */
const CTASection = () => (
  <section className="py-20 md:py-28 px-6" style={{ background: '#000' }}>
    <div className="max-w-3xl mx-auto p-8 md:p-14 rounded-3xl text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(197,160,89,0.05) 0%, rgba(0,0,0,0.98) 100%)', border: '1px solid rgba(197,160,89,0.12)' }}>
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[100px] opacity-[0.06]" style={{ background: BRAND.gold }} />
      <div className="relative">
        <Trophy size={40} color={BRAND.gold} className="mx-auto mb-5 opacity-25" />
        <h2 className="font-orbitron text-white text-[20px] md:text-[28px] lg:text-[20px] font-bold tracking-[0.08em] mb-3">
          READY TO <GradientText>TRANSFORM</GradientText><br />YOUR GYM?
        </h2>
        <p className="font-rajdhani text-zinc-500 text-[14px] tracking-[0.04em] mb-8 max-w-md mx-auto">
          Admin + Member App + Auto Check-In + Friends feature. Download free today.
        </p>
        <button onClick={() => scrollToId('download')}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-rajdhani text-black text-[12px] font-bold tracking-[0.15em] uppercase transition-all hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.goldLight})`, boxShadow: '0 8px 40px rgba(197,160,89,0.20)' }}>
          <Download size={16} />Download {BRAND.name} Free<ArrowRight size={14} />
        </button>
        <p className="font-rajdhani text-zinc-700 text-[10px] tracking-[0.12em] uppercase mt-4">
          Free forever · No credit card · 3 devices
        </p>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════ */
/* FOOTER                                                          */
/* ═══════════════════════════════════════════════════════════════ */
const Footer = () => {
  const links = {
    Product: [
      { label: 'Features',   id: 'features' },
      { label: 'Pricing',    id: 'pricing'  },
      { label: 'Download',   id: 'download' },
      { label: 'Member App', id: null       },
    ],
    Support: [
      { label: 'Help Center', id: null  },
      { label: 'FAQ',         id: 'faq' },
      { label: 'Contact',     id: null  },
      { label: 'Bug Report',  id: null  },
    ],
    Legal: [
      { label: 'Privacy', id: null },
      { label: 'Terms',   id: null },
      { label: 'Refund',  id: null },
      { label: 'License', id: null },
    ],
  };

  return (
    <footer className="pt-14 pb-6 px-6" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${BRAND.gold}12`, border: `1px solid ${BRAND.gold}18` }}>
                <Dumbbell size={15} color={BRAND.gold} />
              </div>
              <span className="font-orbitron text-[15px] font-bold tracking-[0.12em]">
                <span className="text-white">GYM</span><span style={{ color: BRAND.gold }}>VERSE</span>
              </span>
            </div>
            <p className="font-rajdhani text-zinc-600 text-[13px] tracking-[0.02em] leading-relaxed mb-5 max-w-xs">
              Admin app + Member app with Friends, Geo Check-In & 3 device access. Built for gym owners.
            </p>
            <div className="space-y-2.5">
              {[
                { icon: Mail, text: 'abdullah@gmail.com' },
                { icon: Phone, text: '+91 88171 59218 '     },
                { icon: MapPin, text: 'India'               },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={12} color="#3F3F46" />
                  <span className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.04em]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-orbitron text-zinc-400 text-[10px] tracking-[0.15em] uppercase mb-4 font-bold">{title}</h4>
              <ul className="space-y-2.5">
                {items.map(link => (
                  <li key={link.label}>
                    {link.id ? (
                      <button onClick={() => scrollToId(link.id)}
                        className="font-rajdhani text-zinc-600 text-[12px] tracking-[0.04em] hover:text-[#C5A059] transition-colors">
                        {link.label}
                      </button>
                    ) : (
                      <span className="font-rajdhani text-zinc-700 text-[12px] tracking-[0.04em]">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-white/[0.04] mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-rajdhani text-zinc-700 text-[11px] tracking-[0.04em]">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5">
            {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
              <a key={i} href="#"
                className="w-8 h-8 rounded-md flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                <Icon size={13} color="#3F3F46" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/* MAIN                                                            */
/* ═══════════════════════════════════════════════════════════════ */
const LandingPage = () => {
  useEffect(() => {
    const origBody = document.body.style.cssText;
    const origHtml = document.documentElement.style.cssText;
    const root = document.getElementById('root');
    const origRoot = root ? root.style.cssText : '';

    document.body.style.cssText      = `margin:0;padding:0;overflow-x:hidden;overflow-y:auto;height:auto;background:#000;`;
    document.documentElement.style.cssText = `overflow-x:hidden;overflow-y:auto;height:auto;scroll-behavior:smooth;`;
    if (root) root.style.cssText     = `min-height:100vh;overflow-x:hidden;overflow-y:auto;height:auto;`;

    return () => {
      document.body.style.cssText      = origBody;
      document.documentElement.style.cssText = origHtml;
      if (root) root.style.cssText     = origRoot;
    };
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', width: '100%' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FriendsSection />
      <GeoCheckInSection />
      <MembershipTiersSection />
      <HowItWorksSection />
      <DeviceSection />
      <PricingSection />
      <FAQSection />
      <DownloadSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;