'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface JobRole {
  id: string;
  title: string;
  department: 'Engineering' | 'Design' | 'Product & Curriculum';
  type: string;
  workMode: string;
  location: string;
  experience: string;
  description: string;
  highlights: string[];
  tags: string[];
}

const ROLES_DATA: JobRole[] = [
  {
    id: 'frontend-dev',
    title: 'Frontend Web Developer',
    department: 'Engineering',
    type: 'Full-time',
    workMode: 'Remote',
    location: 'Indonesia (WIB)',
    experience: '1–3 Years',
    description:
      'Build fast, accessible, and responsive web interfaces for Sekolah Karir learning platforms and internal career tools.',
    highlights: [
      'Translate product briefs into modular, responsive React/Next.js components',
      'Collaborate closely with UI/UX designers and backend engineers',
      'Optimize core web vitals and mobile usability across devices',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
  },
  {
    id: 'fullstack-dev',
    title: 'Fullstack Engineer',
    department: 'Engineering',
    type: 'Full-time',
    workMode: 'Remote',
    location: 'Indonesia (WIB)',
    experience: '2–4 Years',
    description:
      'Architect and ship end-to-end product features across our digital products, from database schema design to intuitive user interfaces.',
    highlights: [
      'Design scalable APIs and data models for student & talent workflows',
      'Maintain high code quality with automated testing and code reviews',
      'Ship practical product iterations rapidly with measurable impact',
    ],
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Next.js'],
  },
  {
    id: 'uiux-designer',
    title: 'Product UI/UX Designer',
    department: 'Design',
    type: 'Full-time',
    workMode: 'Hybrid',
    location: 'Jakarta / Remote',
    experience: '1–3 Years',
    description:
      'Design intuitive, human-centered user journeys and maintain a cohesive, scalable design system across Sekolah Karir digital products.',
    highlights: [
      'Conduct user research and usability testing with learners and mentors',
      'Create mobile-first wireframes, interactive prototypes, and UI specs',
      'Partner with engineers to ensure pixel-accurate implementation',
    ],
    tags: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
  },
  {
    id: 'product-associate',
    title: 'Associate Product Manager',
    department: 'Product & Curriculum',
    type: 'Full-time',
    workMode: 'Hybrid',
    location: 'Jakarta / WIB',
    experience: '1–2 Years',
    description:
      'Bridge user needs, curriculum outcomes, and engineering execution to deliver impactful career-readiness tools.',
    highlights: [
      'Write clear, scoped product briefs and user stories',
      'Analyze user funnel metrics and gather qualitative learner feedback',
      'Coordinate cross-functional sprints across engineering and curriculum teams',
    ],
    tags: ['Product Discovery', 'Agile', 'Analytics', 'EdTech'],
  },
  {
    id: 'curriculum-lead',
    title: 'Tech Curriculum & Assessment Lead',
    department: 'Product & Curriculum',
    type: 'Full-time',
    workMode: 'Remote',
    location: 'Indonesia (WIB)',
    experience: '2+ Years',
    description:
      'Structure industry-aligned bootcamps, practical mini-assignments, and mentor evaluation rubrics for aspiring tech talents.',
    highlights: [
      'Design practical case studies that mirror real-world engineering challenges',
      'Calibrate assessment rubrics with hiring partners and industry mentors',
      'Continuously improve learner completion and job-placement outcomes',
    ],
    tags: ['Curriculum Design', 'Web Development', 'Mentorship'],
  },
  {
    id: 'qa-engineer',
    title: 'Quality Assurance Engineer',
    department: 'Engineering',
    type: 'Contract / Full-time',
    workMode: 'Remote',
    location: 'Indonesia (WIB)',
    experience: '1–3 Years',
    description:
      'Ensure every release across desktop and mobile viewports meets high standards of reliability, responsiveness, and usability.',
    highlights: [
      'Create comprehensive test plans for web applications and responsive layouts',
      'Build automated end-to-end test suites for critical user flows',
      'Identify edge cases early in the development cycle',
    ],
    tags: ['Playwright', 'Testing', 'CI/CD', 'Web QA'],
  },
];

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Product & Curriculum'] as const;

export default function RecruitmentSection() {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRole, setActiveRole] = useState<JobRole | null>(null);
  const [isOpenApplication, setIsOpenApplication] = useState<boolean>(false);
  const [submittedRoleTitle, setSubmittedRoleTitle] = useState<string | null>(null);

  // Form states (mock data only)
  const [applicantName, setApplicantName] = useState<string>('');
  const [applicantEmail, setApplicantEmail] = useState<string>('');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const [shortNote, setShortNote] = useState<string>('');

  const filteredRoles = ROLES_DATA.filter((role) => {
    const matchesDept = selectedDept === 'All' || role.department === selectedDept;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      role.title.toLowerCase().includes(query) ||
      role.description.toLowerCase().includes(query) ||
      role.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesDept && matchesSearch;
  });

  const closeModal = useCallback(() => {
    setActiveRole(null);
    setIsOpenApplication(false);
    setApplicantName('');
    setApplicantEmail('');
    setPortfolioUrl('');
    setShortNote('');
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (activeRole || isOpenApplication) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRole, isOpenApplication, closeModal]);

  const openApplyModal = (role: JobRole) => {
    setSubmittedRoleTitle(null);
    setIsOpenApplication(false);
    setActiveRole(role);
  };

  const openGeneralModal = () => {
    setSubmittedRoleTitle(null);
    setActiveRole(null);
    setIsOpenApplication(true);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetTitle = activeRole ? activeRole.title : 'Open Talent Pool Application';
    setSubmittedRoleTitle(targetTitle);
  };

  const getCountByDept = (dept: string) => {
    if (dept === 'All') return ROLES_DATA.length;
    return ROLES_DATA.filter((r) => r.department === dept).length;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Brand Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              SK
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight block leading-none">
                Sekolah Karir
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                Careers &amp; Talent Ecosystem
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#open-roles"
              className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Open Roles ({ROLES_DATA.length})
            </a>
            <button
              type="button"
              onClick={openGeneralModal}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-slate-900 text-white hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Join Talent Pool
            </button>
          </div>
        </div>
      </header>

      {/* Recruitment Landing Section */}
      <section
        id="open-roles"
        aria-labelledby="recruitment-headline"
        className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          {/* Section Headline & Value Proposition */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              We Are Hiring &bull; Batch 2
            </div>

            <h1
              id="recruitment-headline"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Build Practical Products Empowering Thousands of Careers
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              At Sekolah Karir, we develop websites, tools, and digital learning products with clear
              reasoning and real-world impact. Explore our open roles and help shape the future of
              career readiness.
            </p>

            {/* Quick Highlights Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Remote-friendly (WIB)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Practical, Low-Ego Culture
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                High-Impact EdTech Products
              </span>
            </div>
          </div>

          {/* Filter & Search Controls */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Department Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter roles by department"
              className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar"
            >
              {DEPARTMENTS.map((dept) => {
                const isSelected = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedDept(dept)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <span>{dept}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-blue-700 text-blue-100'
                          : 'bg-white text-slate-600'
                      }`}
                    >
                      {getCountByDept(dept)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <label htmlFor="role-search" className="sr-only">
                Search roles or tech stack
              </label>
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
              <input
                id="role-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search role or skill (e.g. Next.js)..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Role Cards Grid */}
          {filteredRoles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
              <p className="text-base font-semibold text-slate-800">
                No matching roles found
              </p>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                We couldn&apos;t find any position matching your current filter. Try resetting your
                search or submit an open application below.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept('All');
                  setSearchQuery('');
                }}
                className="mt-2 inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoles.map((role) => (
                <article
                  key={role.id}
                  className="group bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200"
                >
                  <div className="space-y-4">
                    {/* Top Meta Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                        {role.department}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <svg
                          className="w-3.5 h-3.5 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {role.location}
                      </span>
                    </div>

                    {/* Role Title & Sub-meta */}
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {role.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1.5 text-xs font-medium text-slate-500">
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                          {role.type}
                        </span>
                        <span>&bull;</span>
                        <span>{role.workMode}</span>
                        <span>&bull;</span>
                        <span>{role.experience}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {role.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {role.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-50 text-slate-700 border border-slate-200/80 px-2.5 py-0.5 rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA */}
                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openApplyModal(role)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl text-white bg-slate-900 hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                    >
                      <span>View &amp; Apply</span>
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom General CTA Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 sm:p-10 text-white shadow-md">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 text-left">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Open Talent Pool
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Don&apos;t see a role that fits your profile yet?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  We are always looking for pragmatic developers, designers, and educators. Share
                  your portfolio in our talent pool and we&apos;ll reach out when a matching role
                  opens up.
                </p>
              </div>

              <div className="w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={openGeneralModal}
                  className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-slate-900 hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
                >
                  Submit Open Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>&copy; 2026 Sekolah Karir. Mini Assignment &mdash; Web Developer Batch 2.</p>
          <p>All candidate submissions in this demo use simulated mock state.</p>
        </div>
      </footer>

      {/* Interactive Role Detail & Quick Apply Modal */}
      {(activeRole || isOpenApplication) && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {activeRole ? `${activeRole.department} • ${activeRole.location}` : 'General Application'}
                </span>
                <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {activeRole ? activeRole.title : 'Join Sekolah Karir Talent Pool'}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submittedRoleTitle ? (
              /* Confirmation State */
              <div className="py-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-lg font-bold text-slate-900">
                    Application Received (Demo)
                  </h4>
                  <p className="text-sm text-slate-600">
                    Thank you, <span className="font-semibold text-slate-800">{applicantName || 'Candidate'}</span>! Your mock application for{' '}
                    <span className="font-semibold text-blue-700">{submittedRoleTitle}</span> has been recorded locally.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    Back to Open Roles
                  </button>
                </div>
              </div>
            ) : (
              /* Role Highlights + Quick Form */
              <>
                {activeRole && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      What You Will Do
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {activeRole.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">&bull;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label htmlFor="applicant-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name (Mock Data) *
                    </label>
                    <input
                      id="applicant-name"
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Alex Pratama"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="applicant-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Mock Data) *
                    </label>
                    <input
                      id="applicant-email"
                      type="email"
                      required
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="e.g. alex.candidate@example.com"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio-url" className="block text-xs font-semibold text-slate-700 mb-1">
                      GitHub / Portfolio Link *
                    </label>
                    <input
                      id="portfolio-url"
                      type="url"
                      required
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="short-note" className="block text-xs font-semibold text-slate-700 mb-1">
                      Why Sekolah Karir? (Optional)
                    </label>
                    <textarea
                      id="short-note"
                      rows={2}
                      value={shortNote}
                      onChange={(e) => setShortNote(e.target.value)}
                      placeholder="Share briefly what excites you about building EdTech products..."
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Note: This is a front-end demonstration using mock data. No personal data is stored or transmitted.
                  </p>

                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
