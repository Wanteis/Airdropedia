// This file contains SVG icon components for the dashboard sidebar
import React from 'react';

export const DashboardIcon = (props) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="2" fill="currentColor"/>
    <rect x="14" y="3" width="7" height="7" rx="2" fill="currentColor" fillOpacity=".6"/>
    <rect x="14" y="14" width="7" height="7" rx="2" fill="currentColor"/>
    <rect x="3" y="14" width="7" height="7" rx="2" fill="currentColor" fillOpacity=".6"/>
  </svg>
);

export const TasksIcon = (props) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"/>
    <rect x="8" y="8" width="8" height="8" rx="2" fill="#fff"/>
  </svg>
);

export const PaymentsIcon = (props) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}>
    <rect x="2" y="7" width="20" height="10" rx="2" fill="currentColor"/>
    <rect x="6" y="11" width="4" height="2" rx="1" fill="#fff"/>
  </svg>
);

export const NotesIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
    {/* Sticky note base, inherits sidebar color */}
    <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
    {/* Folded corner, slightly lighter for effect */}
    <path d="M21 17c-2 2-2 2-4 2h-8c-2 0-2 0-4-2v-8c0-2 0-2 2-4h8c2 0 2 0 4 2v8z" fill="white" fillOpacity=".08"/>
    <path d="M21 17c-2 2-2 2-4 2h-1c2 0 2 0 4-2z" fill="white" fillOpacity=".16"/>
    {/* Underline and squiggle use accent color (inherits CSS) */}
    <path d="M7 14c2-1 6-1 10 0" stroke="#8bb6f9" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M7 11c1-.5 2.5-.5 4 0" stroke="#8bb6f9" strokeWidth="1.2" strokeLinecap="round"/>
    {/* Text 'Notes' */}
    <text x="12" y="13.5" textAnchor="middle" fontFamily="sans-serif" fontWeight="bold" fontSize="5.5" fill="#8bb6f9">Notes</text>
  </svg>
);

export const QuestsIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M5 21V4a1 1 0 0 1 1-1h7.5a1 1 0 0 1 .8 1.6l-1.3 1.8a1 1 0 0 0 0 1.2l1.3 1.8A1 1 0 0 1 13.5 11H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="5" cy="21" r="1.5" fill="currentColor"/>
  </svg>
);

export const DailyCheckinIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="6" y="8" width="12" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 13l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="7" cy="4.5" r="1.5" fill="currentColor"/>
    <circle cx="17" cy="4.5" r="1.5" fill="currentColor"/>
  </svg>
);

export const QuizIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 512 512" fill="none" {...props}>
    <circle cx="256" cy="256" r="216" stroke="currentColor" strokeWidth="40" fill="none"/>
    <path d="M256 355v-22c0-36 64-38 64-112 0-44-36-80-80-80s-80 36-80 80" stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="256" cy="400" r="24" fill="currentColor"/>
  </svg>
);

export const AnalyticsIcon = (props) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4" fill="currentColor"/>
    <rect x="8" y="8" width="2" height="8" rx="1" fill="#fff"/>
    <rect x="14" y="12" width="2" height="4" rx="1" fill="#fff"/>
    <rect x="11" y="10" width="2" height="6" rx="1" fill="#fff"/>
  </svg>
);

export const SettingsIcon = (props) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" fill="currentColor"/>
    <circle cx="12" cy="12" r="4" fill="#fff"/>
  </svg>
);

export const LogoutIcon = (props) => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" {...props}>
    <path d="M16 17l5-5m0 0l-5-5m5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
