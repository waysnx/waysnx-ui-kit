export const kpiData = [
  { title: 'Total Users', value: '12,568', trend: 'up' as const, trendValue: '18.5%', trendLabel: 'vs last month' },
  { title: 'Projects', value: '342', trend: 'up' as const, trendValue: '12.4%', trendLabel: 'vs last month' },
  { title: 'Tasks Completed', value: '2,458', trend: 'up' as const, trendValue: '24.6%', trendLabel: 'vs last month' },
  { title: 'Revenue', value: '$48,568', trend: 'up' as const, trendValue: '15.3%', trendLabel: 'vs last month' },
];

export const overviewChartData = [
  { date: 'May 1', users: 45000, pageViews: 65000 },
  { date: 'May 7', users: 52000, pageViews: 72000 },
  { date: 'May 13', users: 48000, pageViews: 68000 },
  { date: 'May 19', users: 70000, pageViews: 85000 },
  { date: 'May 25', users: 62000, pageViews: 78000 },
  { date: 'May 31', users: 95000, pageViews: 98000 },
];

export const tasksByStatus = [
  { name: 'Completed', value: 1245, color: '#22c55e' },
  { name: 'In Progress', value: 876, color: '#3b82f6' },
  { name: 'Pending', value: 231, color: '#f59e0b' },
  { name: 'Overdue', value: 134, color: '#ef4444' },
];

export const topProjects = [
  { name: 'Website Redesign', progress: 75, status: 'In Progress', deadline: 'May 30, 2025' },
  { name: 'Mobile App', progress: 60, status: 'In Progress', deadline: 'Jun 15, 2025' },
  { name: 'Admin Dashboard', progress: 90, status: 'Review', deadline: 'May 25, 2025' },
  { name: 'Marketing Site', progress: 40, status: 'On Hold', deadline: 'Jun 10, 2025' },
];

export const recentActivity = [
  { id: 1, title: 'New user registered', desc: 'John Doe joined the platform', time: '2m ago', color: '#3b82f6', icon: '👤' },
  { id: 2, title: 'Project created', desc: 'Website Redesign project created', time: '15m ago', color: '#8b5cf6', icon: '📁' },
  { id: 3, title: 'Task completed', desc: 'Design System updated', time: '1h ago', color: '#22c55e', icon: '✓' },
  { id: 4, title: 'Payment received', desc: '$2,450 from Acme Corp', time: '2h ago', color: '#f59e0b', icon: '💰' },
  { id: 5, title: 'New comment', desc: 'On Project Apollo task', time: '3h ago', color: '#3b82f6', icon: '💬' },
];

export const quickAccessItems = [
  { label: 'Add Project', icon: '➕', color: '#3b82f6', bg: '#dbeafe' },
  { label: 'Add Task', icon: '✓', color: '#22c55e', bg: '#dcfce7' },
  { label: 'Add User', icon: '👤', color: '#8b5cf6', bg: '#ede9fe' },
  { label: 'Reports', icon: '📊', color: '#f59e0b', bg: '#fef3c7' },
  { label: 'Calendar', icon: '📅', color: '#ef4444', bg: '#fee2e2' },
  { label: 'Settings', icon: '⚙️', color: '#64748b', bg: '#f1f5f9' },
];
