import { Grid as DataGrid } from '@waysnx/ui-grid-builder';
import type { GridColumn, GridAction } from '@waysnx/ui-grid-builder';
import { Button } from '@waysnx/ui-core';
import { useToast } from '@waysnx/ui-feedback';
import { Header } from '@waysnx/ui-navigation';
import type { BreadcrumbItem } from '@waysnx/ui-navigation';
import { useNavigate } from 'react-router-dom';
import { useAppTranslation } from '../hooks/useAppTranslation';
import { employees } from '../data/employees';

export function EmployeeListing() {
  const toast = useToast();
  const { t } = useAppTranslation();
  const navigate = useNavigate();

  const columns: GridColumn[] = [
    {
      key: 'name',
      title: t('employees.employee'),
      sortable: true,
      filterable: true,
      render: (value: string, row: Record<string, unknown>) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: '#1e40af' }}>
            {row.avatar as string}
          </div>
          <div>
            <div style={{ fontWeight: 500, fontSize: '13px' }}>{value}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{row.empId as string}</div>
          </div>
        </div>
      ),
    },
    { key: 'department', title: t('employees.department'), sortable: true, filterable: true },
    { key: 'designation', title: t('employees.designation'), sortable: true, filterable: true },
    {
      key: 'status',
      title: t('employees.status'),
      type: 'badge',
      filterable: true,
      badgeMap: {
        active: { label: t('employees.active'), color: '#166534', bg: '#dcfce7' },
        onLeave: { label: t('employees.onLeave'), color: '#92400e', bg: '#fef3c7' },
        inactive: { label: t('employees.inactive'), color: '#991b1b', bg: '#fee2e2' },
      },
    },
    { key: 'joiningDate', title: t('employees.joiningDate'), sortable: true, type: 'date' },
    { key: 'salary', title: t('employees.salary'), type: 'currency', currencySymbol: '₹', currencyPosition: 'start', sortable: true, align: 'right' },
  ];

  const actions: GridAction[] = [
    { label: t('employees.view'), onClick: (row) => toast.info(`${t('employees.viewing')} ${row.name}`), variant: 'ghost' },
    { label: t('employees.edit'), onClick: (row) => toast.info(`${t('employees.editing')} ${row.name}`), variant: 'primary' },
    { label: t('employees.delete'), onClick: (row) => toast.warning(`${t('employees.deleteConfirm')} ${row.name}?`), variant: 'destructive' },
  ];

  const selectionActions: GridAction[] = [
    { label: t('employees.exportSelected'), onClick: () => toast.success(t('employees.exported')), variant: 'primary' },
    { label: t('employees.deleteSelected'), onClick: () => toast.warning(t('employees.deleteSelectedConfirm')), variant: 'destructive' },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    { id: 'home', label: t('common.home'), href: '/' },
    { id: 'grid', label: t('nav.gridListing') },
    { id: 'employees', label: t('employees.title') },
  ];

  const headerRight = (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="outline" onClick={() => toast.success(t('employees.exported'))}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t('employees.export')}
        </span>
      </Button>
      <Button variant="primary" onClick={() => navigate('/onboarding')}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {t('employees.addEmployee')}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </Button>
    </div>
  );

  return (
    <div>
      <Header title={t('employees.title')} breadcrumbs={breadcrumbs} right={headerRight} />

      {/* Data Grid */}
      <DataGrid
        data={employees}
        columns={columns}
        actions={actions}
        pageSize={10}
        pageSizeOptions={[10, 25, 50]}
        showGlobalFilter
        showColumnToggle
        showRowSelection
        selectionMode="checkbox"
        selectionActions={selectionActions}
        onSelectionChange={(rows) => console.log('Selected:', rows)}
        actionsAsMenu
      />
    </div>
  );
}
