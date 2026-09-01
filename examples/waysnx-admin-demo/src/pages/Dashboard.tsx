import { DashboardProvider, StatCard, ChartWidget, TableWidget } from '@waysnx/ui-dashboard';
import { Grid, Card } from '@waysnx/ui-layout';
import { Header, QuickActions } from '@waysnx/ui-navigation';
import type { BreadcrumbItem, QuickAction } from '@waysnx/ui-navigation';
import { Progress } from '@waysnx/ui-feedback';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppTranslation } from '../hooks/useAppTranslation';
import { kpiData, overviewChartData, tasksByStatus, topProjects, recentActivity } from '../data/dashboard';

export function Dashboard() {
  const { t } = useAppTranslation();
  const totalTasks = tasksByStatus.reduce((sum, task) => sum + task.value, 0);

  const kpiLabels = [t('dashboard.totalUsers'), t('dashboard.projects'), t('dashboard.tasksCompleted'), t('dashboard.revenue')];
  const kpiIcons = [
    { bg: '#dbeafe', color: '#1e40af', icon: '👥' },
    { bg: '#ede9fe', color: '#7c3aed', icon: '📁' },
    { bg: '#dcfce7', color: '#166534', icon: '✓' },
    { bg: '#fef3c7', color: '#92400e', icon: '💰' },
  ];

  const statusLabels: Record<string, string> = {
    Completed: t('dashboard.completed'),
    'In Progress': t('dashboard.inProgress'),
    Pending: t('dashboard.pending'),
    Overdue: t('dashboard.overdue'),
    Review: t('dashboard.review'),
    'On Hold': t('dashboard.onHold'),
  };

  const activityIcons = ['👤', '📁', '✓', '💰', '💬'];
  const activityLabels = [
    { title: t('activity.newUserRegistered'), desc: t('activity.johnDoeJoined') },
    { title: t('activity.projectCreated'), desc: t('activity.websiteRedesign') },
    { title: t('activity.taskCompleted'), desc: t('activity.designSystemUpdated') },
    { title: t('activity.paymentReceived'), desc: t('activity.acmeCorp') },
    { title: t('activity.newComment'), desc: t('activity.projectApollo') },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { id: 'home', label: t('common.home'), href: '/' },
    { id: 'dashboard', label: t('dashboard.title') },
  ];

  const quickActions: QuickAction[] = [
    { id: 'add-project', label: t('dashboard.addProject'), icon: <span style={{ fontSize: '20px' }}>➕</span> },
    { id: 'add-task', label: t('dashboard.addTask'), icon: <span style={{ fontSize: '20px' }}>✓</span> },
    { id: 'add-user', label: t('dashboard.addUser'), icon: <span style={{ fontSize: '20px' }}>👤</span> },
    { id: 'reports', label: t('dashboard.reports'), icon: <span style={{ fontSize: '20px' }}>📊</span> },
    { id: 'calendar', label: t('dashboard.calendar'), icon: <span style={{ fontSize: '20px' }}>📅</span> },
    { id: 'settings', label: t('dashboard.settings'), icon: <span style={{ fontSize: '20px' }}>⚙️</span> },
  ];

  return (
    <div>
      <Header title={t('dashboard.title')} breadcrumbs={breadcrumbs} />

      <DashboardProvider config={{ theme: 'light' }}>
        {/* KPI Stats Row */}
        <Grid columns={4} gap="20px">
          {kpiData.map((kpi, idx) => (
            <StatCard
              key={idx}
              data={{ label: kpiLabels[idx], value: kpi.value, trend: kpi.trend, change: parseFloat(kpi.trendValue), icon: <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: kpiIcons[idx].bg, color: kpiIcons[idx].color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{kpiIcons[idx].icon}</span> }}
            />
          ))}
        </Grid>

        {/* Overview Chart + Recent Activity */}
        <Grid columns="1.6fr 1fr" gap="20px">
          <Card title={t('dashboard.overview')}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', marginBottom: '16px' }}>
              {[t('dashboard.thisMonth'), t('dashboard.day'), t('dashboard.week'), t('dashboard.month')].map((label, i) => (
                <button key={label} style={{ padding: '5px 12px', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', border: i === 3 ? 'none' : '1px solid var(--wx-color-border)', borderRadius: '6px', background: i === 3 ? 'var(--wx-color-primary)' : 'transparent', color: i === 3 ? 'white' : 'var(--wx-color-text-muted)', cursor: 'pointer', fontWeight: i === 3 ? 500 : 400 }}>
                  {label}
                </button>
              ))}
            </div>
            <ChartWidget id="overview-chart">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={overviewChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} name="Users" />
                  <Line type="monotone" dataKey="pageViews" stroke="#22c55e" strokeWidth={2} dot={false} name="Page Views" />
                </LineChart>
              </ResponsiveContainer>
            </ChartWidget>
          </Card>

          <Card title={t('dashboard.recentActivity')}>
            <ul className="activity-list">
              {recentActivity.map((item, idx) => (
                <li key={item.id} className="activity-item">
                  <div className="activity-item__icon" style={{ background: `${item.color}15`, color: item.color }}>{activityIcons[idx]}</div>
                  <div className="activity-item__content">
                    <div className="activity-item__title">{activityLabels[idx].title}</div>
                    <div className="activity-item__desc">{activityLabels[idx].desc}</div>
                  </div>
                  <span className="activity-item__time">{item.time}</span>
                </li>
              ))}
            </ul>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <a href="#" style={{ fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-primary)', textDecoration: 'none', fontWeight: 500 }}>
                View All Notifications
              </a>
            </div>
          </Card>
        </Grid>

        {/* Top Projects + Tasks by Status */}
        <Grid columns="1fr 1fr" gap="20px">
          <Card title={t('dashboard.topProjects')}>
            <TableWidget id="top-projects">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--wx-color-border)' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500, color: 'var(--wx-color-text-muted)' }}>{t('dashboard.project')}</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500, color: 'var(--wx-color-text-muted)' }}>{t('dashboard.progress')}</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500, color: 'var(--wx-color-text-muted)' }}>{t('dashboard.status')}</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500, color: 'var(--wx-color-text-muted)' }}>{t('dashboard.deadline')}</th>
                  </tr>
                </thead>
                <tbody>
                  {topProjects.map((project, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--wx-color-border)' }}>
                      <td style={{ padding: '12px 0', fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', fontWeight: 500 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.progress >= 80 ? '#22c55e' : project.progress >= 50 ? '#3b82f6' : '#f59e0b' }} />
                          {project.name}
                        </div>
                      </td>
                      <td style={{ padding: '12px 0', width: '120px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Progress value={project.progress} max={100} />
                          <span style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)' }}>{project.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))' }}>
                        <span style={{ padding: '3px 10px', borderRadius: '4px', fontWeight: 500, background: project.status === 'In Progress' ? '#dbeafe' : project.status === 'Review' ? '#dcfce7' : '#fef3c7', color: project.status === 'In Progress' ? '#1d4ed8' : project.status === 'Review' ? '#166534' : '#92400e' }}>
                          {statusLabels[project.status] || project.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)' }}>{project.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWidget>
          </Card>

          <Card title={t('dashboard.tasksByStatus')}>
            <ChartWidget id="tasks-by-status">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={tasksByStatus} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" nameKey="name">
                    {tasksByStatus.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ textAlign: 'center', marginTop: '8px' }}>
                <div style={{ fontSize: 'calc(22px * var(--wx-accessibility-font-scale, 1))', fontWeight: 700 }}>{totalTasks.toLocaleString()}</div>
                <div style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)' }}>{t('dashboard.totalTasks')}</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px', justifyContent: 'center' }}>
                {tasksByStatus.map((task, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: task.color, display: 'inline-block' }} />
                    <span style={{ color: 'var(--wx-color-text-muted)' }}>{statusLabels[task.name] || task.name}</span>
                    <span style={{ fontWeight: 500 }}>{task.value} ({Math.round((task.value / totalTasks) * 100)}%)</span>
                  </div>
                ))}
              </div>
            </ChartWidget>
          </Card>
        </Grid>

        {/* Quick Access + Accessibility Center */}
        <Grid columns="1fr 1fr" gap="20px">
          <Card title={t('dashboard.quickAccess')}>
            <QuickActions actions={quickActions} variant="grid" size="md" showLabels showIcons />
          </Card>

          <Card title={t('accessibility.title')}>
            <div
              onClick={() => {
                const btn = document.querySelector('.wx-floating-button') as HTMLButtonElement;
                if (btn) btn.click();
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--wx-color-surface-alt)', borderRadius: '8px', cursor: 'pointer' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#dbeafe', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>♿</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 'calc(13px * var(--wx-accessibility-font-scale, 1))', fontWeight: 600 }}>{t('accessibility.title')}</div>
                <div style={{ fontSize: 'calc(12px * var(--wx-accessibility-font-scale, 1))', color: 'var(--wx-color-text-muted)' }}>{t('accessibility.desc')}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </Card>
        </Grid>
      </DashboardProvider>
    </div>
  );
}
