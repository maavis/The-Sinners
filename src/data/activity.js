/**
 * PARRHESIA ADMIN ACTIVITY LOG SERVICE
 * Logs real administrative CRUD actions for audit trail.
 */

const STORAGE_KEY = 'parrhesia_admin_activity_log';

const INITIAL_ACTIVITIES = [
  {
    id: 'act_1',
    action: 'RELEASE CREATED',
    details: 'Release "9MM HATE" (Album) published',
    user: 'ADMIN',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'act_2',
    action: 'TOUR DATE UPDATED',
    details: 'Tour Event "Sick New World Festival" set to SATIŞTA',
    user: 'ADMIN',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'act_3',
    action: 'TRANSMISSION PUBLISHED',
    details: 'Transmission "THE ANALOG RESONANCE OF 9MM HATE" published',
    user: 'ADMIN',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export function getActivities() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ACTIVITIES));
    return INITIAL_ACTIVITIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_ACTIVITIES;
  }
}

export function logActivity(action, details) {
  const activities = getActivities();
  const newActivity = {
    id: 'act_' + Date.now(),
    action,
    details,
    user: 'ADMIN',
    timestamp: new Date().toISOString()
  };
  activities.unshift(newActivity);
  if (activities.length > 50) activities.pop();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  window.dispatchEvent(new CustomEvent('activity-log-updated'));
}
