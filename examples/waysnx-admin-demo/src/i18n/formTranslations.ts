/**
 * Marathi translations for DynamicForm field labels.
 * Keyed by fieldName, passed via the `translations` prop.
 */

export const personalInfoTranslations: Record<string, { label?: string; placeholder?: string; options?: Record<string, string> }> = {
  firstName: { label: 'पहिले नाव', placeholder: 'पहिले नाव प्रविष्ट करा' },
  middleName: { label: 'मधले नाव', placeholder: 'मधले नाव प्रविष्ट करा' },
  lastName: { label: 'आडनाव', placeholder: 'आडनाव प्रविष्ट करा' },
  preferredName: { label: 'पसंतीचे नाव', placeholder: 'पसंतीचे नाव प्रविष्ट करा' },
  email: { label: 'ईमेल पत्ता', placeholder: 'ईमेल प्रविष्ट करा' },
  phone: { label: 'फोन नंबर', placeholder: 'फोन नंबर प्रविष्ट करा' },
  dob: { label: 'जन्मतारीख', placeholder: 'तारीख निवडा' },
  gender: { label: 'लिंग', options: { Male: 'पुरुष', Female: 'स्त्री', Other: 'इतर' } },
  maritalStatus: { label: 'वैवाहिक स्थिती', options: { Single: 'अविवाहित', Married: 'विवाहित', Divorced: 'घटस्फोटित', Widowed: 'विधवा/विधुर' } },
  nationality: { label: 'राष्ट्रीयत्व', options: { Indian: 'भारतीय', American: 'अमेरिकन', British: 'ब्रिटिश', Canadian: 'कॅनेडियन', Australian: 'ऑस्ट्रेलियन' } },
  aadhaarNumber: { label: 'आधार क्रमांक', placeholder: 'आधार क्रमांक प्रविष्ट करा' },
  panNumber: { label: 'पॅन क्रमांक', placeholder: 'पॅन क्रमांक प्रविष्ट करा' },
};

export const employmentTranslations: Record<string, { label?: string; placeholder?: string; options?: Record<string, string> }> = {
  employeeId: { label: 'कर्मचारी आयडी', placeholder: 'कर्मचारी आयडी प्रविष्ट करा' },
  department: { label: 'विभाग', options: { Engineering: 'अभियांत्रिकी', Product: 'उत्पादन', Design: 'डिझाइन', Marketing: 'विपणन', HR: 'मानव संसाधन', Finance: 'वित्त' } },
  designation: { label: 'पदनाम', options: { 'Senior Developer': 'वरिष्ठ विकासक', 'Product Manager': 'उत्पादन व्यवस्थापक', 'UI/UX Designer': 'UI/UX डिझायनर', 'Marketing Manager': 'विपणन व्यवस्थापक', 'DevOps Engineer': 'DevOps अभियंता', 'HR Executive': 'HR कार्यकारी', Accountant: 'लेखापाल', 'QA Engineer': 'QA अभियंता' } },
  employmentType: { label: 'रोजगार प्रकार', options: { 'Full Time': 'पूर्णवेळ', 'Part Time': 'अर्धवेळ', Contract: 'कंत्राट', Intern: 'इंटर्न' } },
  joiningDate: { label: 'सामील तारीख', placeholder: 'तारीख निवडा' },
  reportingManager: { label: 'रिपोर्टिंग व्यवस्थापक', placeholder: 'व्यवस्थापक शोधा' },
  workLocation: { label: 'कार्य स्थान', options: { 'Bangalore - India': 'बंगळुरू - भारत', 'Mumbai - India': 'मुंबई - भारत', 'Pune - India': 'पुणे - भारत', Remote: 'रिमोट' } },
  probationPeriod: { label: 'प्रोबेशन कालावधी (महिने)', placeholder: 'महिने प्रविष्ट करा' },
};

export const contactTranslations: Record<string, { label?: string; placeholder?: string; options?: Record<string, string> }> = {
  addressLine1: { label: 'पत्ता ओळ 1', placeholder: 'पत्ता प्रविष्ट करा' },
  addressLine2: { label: 'पत्ता ओळ 2', placeholder: 'पत्ता प्रविष्ट करा' },
  country: { label: 'देश', options: { India: 'भारत', USA: 'अमेरिका', UK: 'ब्रिटन', Canada: 'कॅनडा', Australia: 'ऑस्ट्रेलिया' } },
  state: { label: 'राज्य', options: { Karnataka: 'कर्नाटक', Maharashtra: 'महाराष्ट्र', 'Tamil Nadu': 'तमिळनाडू', Delhi: 'दिल्ली', Gujarat: 'गुजरात' } },
  city: { label: 'शहर', placeholder: 'शहर प्रविष्ट करा' },
  pincode: { label: 'पिनकोड', placeholder: 'पिनकोड प्रविष्ट करा' },
  alternateEmail: { label: 'पर्यायी ईमेल', placeholder: 'पर्यायी ईमेल प्रविष्ट करा' },
  emergencyContact: { label: 'आणीबाणी संपर्क', placeholder: 'आणीबाणी संपर्क क्रमांक' },
};

export const additionalTranslations: Record<string, { label?: string; placeholder?: string; options?: Record<string, string> }> = {
  skills: { label: 'कौशल्ये', placeholder: 'कौशल्ये निवडा' },
  experience: { label: 'अनुभव (वर्षे)', placeholder: 'वर्षे प्रविष्ट करा' },
  currentSalary: { label: 'सध्याचे वेतन (₹)', placeholder: 'रक्कम प्रविष्ट करा' },
  expectedSalary: { label: 'अपेक्षित वेतन (₹)', placeholder: 'रक्कम प्रविष्ट करा' },
  qualification: { label: 'सर्वोच्च पात्रता', options: { 'Bachelor of Engineering': 'अभियांत्रिकी पदवी', 'Master of Engineering': 'अभियांत्रिकी पदव्युत्तर', MBA: 'MBA', BCA: 'BCA', MCA: 'MCA', PhD: 'पीएचडी' } },
  university: { label: 'विद्यापीठ/संस्था', placeholder: 'विद्यापीठ प्रविष्ट करा' },
  yearOfPassing: { label: 'उत्तीर्ण वर्ष', placeholder: 'वर्ष प्रविष्ट करा' },
  resume: { label: 'रेझ्युमे अपलोड करा' },
  languages: { label: 'ज्ञात भाषा', options: { English: 'इंग्रजी', Hindi: 'हिंदी', Marathi: 'मराठी', Tamil: 'तमिळ', Telugu: 'तेलुगू', Kannada: 'कन्नड' } },
  bloodGroup: { label: 'रक्तगट' },
  linkedinProfile: { label: 'LinkedIn प्रोफाइल', placeholder: 'LinkedIn URL प्रविष्ट करा' },
  disability: { label: 'कोणते अपंगत्व?' },
  notes: { label: 'टिपण', placeholder: 'टिपण प्रविष्ट करा' },
};
