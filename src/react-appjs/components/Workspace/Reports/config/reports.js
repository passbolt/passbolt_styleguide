import Dashboard from '../reports/Dashboard';
import React, {Component} from "react";

const categories = {
  onboarding : "On-boarding",
  users_activity: "Users Activity",
  groups_activity: "Groups Activity",
  passwords_usage: "Passwords Usage",
};

const reports_prod = [
  {
    "name": "Dashboard",
    "slug": "dashboard",
    "component": <Dashboard />
  },
  {
    "name": "MFA On-boarding report",
    "slug": "mfa-users-onboarding",
    "category": categories.onboarding,
  }
];

const reports_dev = [
  {
    "name": "Dashboard",
    "slug": "dashboard",
    "component": <Dashboard />
  },
  {
    "name": "MFA On-boarding report",
    "slug": "mfa-users-onboarding",
    "category": categories.onboarding,
  },
  {
    "name": "Report not available on server",
    "slug": "not-available-on-server",
    "category": categories.onboarding,
  },
  {
    "name": "HTML report loading",
    "slug": "report-loading",
    "category": categories.onboarding,
  },
  {
    "name": "Employees On-boarding report",
    "slug": "users-onboarding",
    "category": categories.onboarding,
  },
  {
    "name": "Employees drop-out report",
    "slug": "users-dropout",
    "category": categories.onboarding,
  },
  {
    "name": "Users log-in report",
    "slug": "todo",
    "category": categories.users_activity,
  },
  {
    "name": "Users activity report",
    "slug": "todo",
    "category": categories.users_activity,

  },
  {
    "name": "Users evolution report",
    "slug": "todo",
    "category": categories.users_activity,
  },
  {
    "name": "report 1",
    "slug": "todo",
    "category": categories.groups_activity,
  },
  {
    "name": "report 2",
    "slug": "todo",
    "category": categories.groups_activity,
  },
  {
    "name": "report 3",
    "slug": "todo",
    "category": categories.groups_activity,
  },
  {
    "name": "report 1",
    "slug": "todo",
    "category": categories.passwords_usage,
  },
  {
    "name": "report 2",
    "slug": "todo",
    "category": categories.passwords_usage,
  },
  {
    "name": "report 3",
    "slug": "todo",
    "category": categories.passwords_usage,
  }
];

const config = process.env.NODE_ENV === 'development' ? reports_dev : reports_prod;

export default config;