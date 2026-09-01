export interface Employee {
  id: string;
  name: string;
  empId: string;
  avatar: string;
  department: string;
  designation: string;
  status: 'active' | 'onLeave' | 'inactive';
  joiningDate: string;
  salary: number;
  email: string;
}

export const employees: Employee[] = [
  { id: '1', name: 'John Doe', empId: 'EMP-2025-1001', avatar: 'JD', department: 'Engineering', designation: 'Senior Developer', status: 'active', joiningDate: 'May 20, 2024', salary: 1200000, email: 'john.doe@example.com' },
  { id: '2', name: 'Sarah Johnson', empId: 'EMP-2025-1002', avatar: 'SJ', department: 'Product', designation: 'Product Manager', status: 'active', joiningDate: 'Mar 15, 2024', salary: 1500000, email: 'sarah.johnson@example.com' },
  { id: '3', name: 'Michael Smith', empId: 'EMP-2025-1003', avatar: 'MS', department: 'Design', designation: 'UI/UX Designer', status: 'active', joiningDate: 'Feb 10, 2024', salary: 1050000, email: 'michael.smith@example.com' },
  { id: '4', name: 'Emily Davis', empId: 'EMP-2025-1004', avatar: 'ED', department: 'Marketing', designation: 'Marketing Manager', status: 'active', joiningDate: 'Jan 05, 2024', salary: 900000, email: 'emily.davis@example.com' },
  { id: '5', name: 'David Wilson', empId: 'EMP-2025-1005', avatar: 'DW', department: 'Engineering', designation: 'DevOps Engineer', status: 'active', joiningDate: 'Dec 12, 2023', salary: 1150000, email: 'david.wilson@example.com' },
  { id: '6', name: 'Jessica Brown', empId: 'EMP-2025-1006', avatar: 'JB', department: 'HR', designation: 'HR Executive', status: 'onLeave', joiningDate: 'Nov 01, 2023', salary: 650000, email: 'jessica.brown@example.com' },
  { id: '7', name: 'Robert Taylor', empId: 'EMP-2025-1007', avatar: 'RT', department: 'Finance', designation: 'Accountant', status: 'inactive', joiningDate: 'Oct 18, 2023', salary: 700000, email: 'robert.taylor@example.com' },
  { id: '8', name: 'Lisa Anderson', empId: 'EMP-2025-1008', avatar: 'LA', department: 'Engineering', designation: 'QA Engineer', status: 'active', joiningDate: 'Sep 30, 2023', salary: 850000, email: 'lisa.anderson@example.com' },
  { id: '9', name: 'James Martinez', empId: 'EMP-2025-1009', avatar: 'JM', department: 'Engineering', designation: 'Frontend Developer', status: 'active', joiningDate: 'Aug 15, 2023', salary: 950000, email: 'james.martinez@example.com' },
  { id: '10', name: 'Amanda Lee', empId: 'EMP-2025-1010', avatar: 'AL', department: 'Design', designation: 'Graphic Designer', status: 'active', joiningDate: 'Jul 22, 2023', salary: 750000, email: 'amanda.lee@example.com' },
];
