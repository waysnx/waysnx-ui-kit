import type { JSONSchema, FormLayout } from '@waysnx/ui-form-builder';

// Step 1: Personal Information
export const personalInfoSchema: JSONSchema = {
  type: 'object',
  title: 'Personal Information',
  properties: {
    firstName: { type: 'string', title: 'First Name', minLength: 2 },
    middleName: { type: 'string', title: 'Middle Name' },
    lastName: { type: 'string', title: 'Last Name', minLength: 2 },
    preferredName: { type: 'string', title: 'Preferred Name' },
    email: { type: 'string', format: 'email', title: 'Email Address' },
    phone: { type: 'string', title: 'Phone Number', 'x-mask': '+91 00000 00000' },
    dob: { type: 'string', format: 'date', title: 'Date of Birth' },
    gender: { type: 'string', title: 'Gender', enum: ['Male', 'Female', 'Other'] },
    maritalStatus: { type: 'string', title: 'Marital Status', enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
    nationality: { type: 'string', title: 'Nationality', enum: ['Indian', 'American', 'British', 'Canadian', 'Australian'] },
    aadhaarNumber: { type: 'string', title: 'Aadhaar Number', 'x-mask': '0000 0000 0000' },
    panNumber: { type: 'string', title: 'PAN Number' },
  },
  required: ['firstName', 'lastName', 'email', 'phone', 'dob', 'gender'],
};

export const personalInfoLayout: FormLayout = {
  rows: [
    {
      cells: [
        { settings: { fieldName: 'firstName', title: 'First Name', controlType: 'input', inputType: 'text', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'middleName', title: 'Middle Name', controlType: 'input', inputType: 'text', 'x-col-size': 3 } },
        { settings: { fieldName: 'lastName', title: 'Last Name', controlType: 'input', inputType: 'text', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'preferredName', title: 'Preferred Name', controlType: 'input', inputType: 'text', 'x-col-size': 3 } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'email', title: 'Email Address', controlType: 'input', inputType: 'email', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'phone', title: 'Phone Number', controlType: 'input', inputType: 'tel', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'dob', title: 'Date of Birth', controlType: 'input', inputType: 'date', 'x-col-size': 4, required: true } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'gender', title: 'Gender', controlType: 'radio', 'x-col-size': 4, 'x-columns': 3, required: true } },
        { settings: { fieldName: 'maritalStatus', title: 'Marital Status', controlType: 'select', 'x-col-size': 4 } },
        { settings: { fieldName: 'nationality', title: 'Nationality', controlType: 'select', 'x-col-size': 4 } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'aadhaarNumber', title: 'Aadhaar Number', controlType: 'input', inputType: 'text', 'x-col-size': 6 } },
        { settings: { fieldName: 'panNumber', title: 'PAN Number', controlType: 'input', inputType: 'text', 'x-col-size': 6 } },
      ],
    },
  ],
  settings: {
    fieldGroup: 'Personal Information',
    buttonsPosition: 'bottom',
    buttonsAlignment: 'text-right',
    buttons: [
      { label: 'Save as Draft', name: 'saveDraft', type: 'button', appearance: 'accent' },
      { label: 'Next', name: 'next', type: 'submit', appearance: 'primary' },
    ],
  },
};

// Step 2: Employment Details
export const employmentSchema: JSONSchema = {
  type: 'object',
  title: 'Employment Details',
  properties: {
    employeeId: { type: 'string', title: 'Employee ID' },
    department: { type: 'string', title: 'Department', enum: ['Engineering', 'Product', 'Design', 'Marketing', 'HR', 'Finance'] },
    designation: { type: 'string', title: 'Designation', enum: ['Senior Developer', 'Product Manager', 'UI/UX Designer', 'Marketing Manager', 'DevOps Engineer', 'HR Executive', 'Accountant', 'QA Engineer'] },
    employmentType: { type: 'string', title: 'Employment Type', enum: ['Full Time', 'Part Time', 'Contract', 'Intern'] },
    joiningDate: { type: 'string', format: 'date', title: 'Joining Date' },
    reportingManager: { type: 'string', title: 'Reporting Manager', enum: ['Sarah Johnson', 'David Wilson', 'Emily Davis', 'Robert Taylor'] },
    workLocation: { type: 'string', title: 'Work Location', enum: ['Bangalore - India', 'Mumbai - India', 'Pune - India', 'Remote'] },
    probationPeriod: { type: 'number', title: 'Probation Period (Months)' },
  },
  required: ['employeeId', 'department', 'designation', 'employmentType', 'joiningDate'],
};

export const employmentLayout: FormLayout = {
  rows: [
    {
      cells: [
        { settings: { fieldName: 'employeeId', title: 'Employee ID', controlType: 'input', inputType: 'text', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'department', title: 'Department', controlType: 'select', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'designation', title: 'Designation', controlType: 'select', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'employmentType', title: 'Employment Type', controlType: 'select', 'x-col-size': 3, required: true } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'joiningDate', title: 'Joining Date', controlType: 'input', inputType: 'date', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'reportingManager', title: 'Reporting Manager', controlType: 'autocomplete', 'x-col-size': 3 } },
        { settings: { fieldName: 'workLocation', title: 'Work Location', controlType: 'select', 'x-col-size': 3 } },
        { settings: { fieldName: 'probationPeriod', title: 'Probation Period (Months)', controlType: 'input', inputType: 'number', 'x-col-size': 3 } },
      ],
    },
  ],
  settings: {
    fieldGroup: 'Employment Details',
    buttonsPosition: 'bottom',
    buttonsAlignment: 'text-right',
    buttons: [
      { label: 'Previous', name: 'previous', type: 'button', appearance: 'accent' },
      { label: 'Save as Draft', name: 'saveDraft', type: 'button', appearance: 'accent' },
      { label: 'Next', name: 'next', type: 'submit', appearance: 'primary' },
    ],
  },
};

// Step 3: Contact & Address
export const contactSchema: JSONSchema = {
  type: 'object',
  title: 'Contact & Address',
  properties: {
    addressLine1: { type: 'string', title: 'Address Line 1' },
    addressLine2: { type: 'string', title: 'Address Line 2' },
    country: { type: 'string', title: 'Country', enum: ['India', 'USA', 'UK', 'Canada', 'Australia'] },
    state: { type: 'string', title: 'State', enum: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi', 'Gujarat'] },
    city: { type: 'string', title: 'City' },
    pincode: { type: 'string', title: 'Pincode' },
    alternateEmail: { type: 'string', format: 'email', title: 'Alternate Email' },
    emergencyContact: { type: 'string', title: 'Emergency Contact', 'x-mask': '+91 00000 00000' },
  },
  required: ['addressLine1', 'country', 'state', 'city', 'pincode'],
};

export const contactLayout: FormLayout = {
  rows: [
    {
      cells: [
        { settings: { fieldName: 'addressLine1', title: 'Address Line 1', controlType: 'input', inputType: 'text', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'addressLine2', title: 'Address Line 2', controlType: 'input', inputType: 'text', 'x-col-size': 4 } },
        { settings: { fieldName: 'country', title: 'Country', controlType: 'select', 'x-col-size': 4, required: true } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'state', title: 'State', controlType: 'select', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'city', title: 'City', controlType: 'input', inputType: 'text', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'pincode', title: 'Pincode', controlType: 'input', inputType: 'text', 'x-col-size': 3, required: true } },
        { settings: { fieldName: 'alternateEmail', title: 'Alternate Email', controlType: 'input', inputType: 'email', 'x-col-size': 3 } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'emergencyContact', title: 'Emergency Contact', controlType: 'input', inputType: 'tel', 'x-col-size': 4 } },
      ],
    },
  ],
  settings: {
    fieldGroup: 'Contact & Address',
    buttonsPosition: 'bottom',
    buttonsAlignment: 'text-right',
    buttons: [
      { label: 'Previous', name: 'previous', type: 'button', appearance: 'accent' },
      { label: 'Save as Draft', name: 'saveDraft', type: 'button', appearance: 'accent' },
      { label: 'Next', name: 'next', type: 'submit', appearance: 'primary' },
    ],
  },
};

// Step 4: Additional Information
export const additionalSchema: JSONSchema = {
  type: 'object',
  title: 'Additional Information',
  properties: {
    skills: { type: 'array', title: 'Skills', enum: ['React', 'TypeScript', 'Node.js', 'UI/UX', 'Python', 'Java', 'AWS', 'Docker'], items: { type: 'string' } },
    experience: { type: 'number', title: 'Experience (Years)', minimum: 0, maximum: 40 },
    currentSalary: { type: 'number', title: 'Current Salary (₹)', 'x-currency-symbol': '₹', 'x-currency-position': 'start' },
    expectedSalary: { type: 'number', title: 'Expected Salary (₹)', 'x-currency-symbol': '₹', 'x-currency-position': 'start' },
    qualification: { type: 'string', title: 'Highest Qualification', enum: ['Bachelor of Engineering', 'Master of Engineering', 'MBA', 'BCA', 'MCA', 'PhD'] },
    university: { type: 'string', title: 'University/Institute' },
    yearOfPassing: { type: 'number', title: 'Year of Passing' },
    resume: { type: 'string', format: 'binary', title: 'Upload Resume', 'x-accept': '.pdf,.doc,.docx', 'x-file-size': 5 },
    languages: { type: 'array', title: 'Languages Known', enum: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada'], items: { type: 'string' } },
    bloodGroup: { type: 'string', title: 'Blood Group', enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    linkedinProfile: { type: 'string', title: 'LinkedIn Profile' },
    disability: { type: 'boolean', title: 'Any Disability?' },
    notes: { type: 'string', title: 'Notes', 'x-component': 'speech-to-text-textarea' },
  },
  required: ['skills', 'experience', 'currentSalary', 'qualification'],
};

export const additionalLayout: FormLayout = {
  rows: [
    {
      cells: [
        { settings: { fieldName: 'skills', title: 'Skills', controlType: 'multiselect', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'experience', title: 'Experience (Years)', controlType: 'input', inputType: 'number', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'currentSalary', title: 'Current Salary (₹)', controlType: 'input', inputType: 'number', 'x-col-size': 4, required: true } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'expectedSalary', title: 'Expected Salary (₹)', controlType: 'input', inputType: 'number', 'x-col-size': 4 } },
        { settings: { fieldName: 'qualification', title: 'Highest Qualification', controlType: 'select', 'x-col-size': 4, required: true } },
        { settings: { fieldName: 'university', title: 'University/Institute', controlType: 'input', inputType: 'text', 'x-col-size': 4 } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'yearOfPassing', title: 'Year of Passing', controlType: 'input', inputType: 'number', 'x-col-size': 3 } },
        { settings: { fieldName: 'resume', title: 'Upload Resume', controlType: 'file-upload', 'x-col-size': 3 } },
        { settings: { fieldName: 'languages', title: 'Languages Known', controlType: 'select', 'x-col-size': 3 } },
        { settings: { fieldName: 'bloodGroup', title: 'Blood Group', controlType: 'select', 'x-col-size': 3 } },
      ],
    },
    {
      cells: [
        { settings: { fieldName: 'linkedinProfile', title: 'LinkedIn Profile', controlType: 'input', inputType: 'text', 'x-col-size': 4 } },
        { settings: { fieldName: 'disability', title: 'Any Disability?', controlType: 'toggle', 'x-col-size': 4 } },
        { settings: { fieldName: 'notes', title: 'Notes', controlType: 'textarea', 'x-col-size': 4 } },
      ],
    },
  ],
  settings: {
    fieldGroup: 'Additional Information',
    buttonsPosition: 'bottom',
    buttonsAlignment: 'text-right',
    buttons: [
      { label: 'Previous', name: 'previous', type: 'button', appearance: 'accent' },
      { label: 'Save as Draft', name: 'saveDraft', type: 'button', appearance: 'accent' },
      { label: 'Next', name: 'next', type: 'submit', appearance: 'primary' },
    ],
  },
};

// Helper to apply translated button labels and fieldGroup to a layout
export function applyLayoutTranslations(
  layout: FormLayout,
  translations: {
    fieldGroup?: string;
    saveDraft?: string;
    next?: string;
    previous?: string;
  }
): FormLayout {
  return {
    ...layout,
    settings: {
      ...layout.settings,
      ...(translations.fieldGroup ? { fieldGroup: translations.fieldGroup } : {}),
      buttons: layout.settings?.buttons?.map((btn) => {
        if (btn.name === 'saveDraft' && translations.saveDraft) return { ...btn, label: translations.saveDraft };
        if (btn.name === 'next' && translations.next) return { ...btn, label: translations.next };
        if (btn.name === 'previous' && translations.previous) return { ...btn, label: translations.previous };
        return btn;
      }),
    },
  };
}
