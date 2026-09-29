import { 
  ServiceCenter, 
  Counter, 
  Token, 
  IoTDevice, 
  AIRecommendation, 
  CongestionAlert, 
  SMSNotification, 
  AnalyticsDataPoint,
  HeatmapZone 
} from '../types';

export const INITIAL_SERVICE_CENTERS: ServiceCenter[] = [
  {
    id: 'rto',
    name: 'Regional Transport Office (RTO) - West Zone',
    type: 'Transport & Motor Vehicle Authority',
    address: 'Transport Bhavan, Sector 18, Ring Road',
    isOpen: true,
    operatingHours: '09:30 AM - 05:30 PM',
    currentQueueLength: 38,
    availableCounters: 4,
    totalCounters: 6,
    approxWaitTimeMinutes: 26,
    crowdLevel: 'Moderate',
    status: 'moderate',
    services: [
      {
        id: 'rto-dl-new',
        name: 'Driving License (Learner & Permanent DL)',
        codePrefix: 'DL',
        avgServiceMinutes: 9,
        description: 'New Learner License test, biometric photo capture, and permanent driving test slot',
        department: 'Licensing Division',
        officialFee: '₹200 (LL) / ₹1,000 (Permanent DL)',
        processingTime: 'Same day for LL; 7 days for Smart Card DL',
        instructions: [
          'Applicant must appear in person for physical biometric photograph and road safety test',
          'Medical Form 1A must be signed by registered MBBS doctor if applicant age > 40',
          'Bring your own vehicle matching license class (MCWG/LMV) for driving ground test'
        ],
        requiredDocuments: [
          {
            id: 'dl-med',
            name: 'Form 1 & Form 1A Medical Fitness Certificate',
            category: 'Medical / Fitness',
            isMandatory: true,
            notes: 'Mandatory for commercial transport license or applicants over 40 years old. Doctor stamp required.',
            photocopyCount: 1,
            acceptedExamples: ['Form 1A signed by Registered MBBS Medical Practitioner with MCI Registration Number']
          },
          {
            id: 'dl-age',
            name: 'Proof of Date of Birth (Age Proof)',
            category: 'Date of Birth Proof',
            isMandatory: true,
            notes: 'Must verify applicant is 18+ (or 16+ for 50cc gearless motorcycle)',
            photocopyCount: 1,
            acceptedExamples: ['10th Class SSC Marksheet / Certificate', 'Birth Certificate issued by Municipal Registrar', 'Passport', 'PAN Card']
          },
          {
            id: 'dl-addr',
            name: 'Proof of Current Residential Address',
            category: 'Address Proof',
            isMandatory: true,
            notes: 'Address must fall within this RTO jurisdiction',
            photocopyCount: 1,
            acceptedExamples: ['Aadhaar Card', 'Passport', 'Voter ID Card', 'Registered Rent Agreement + Police Verification', 'Electricity / Water Bill (<2 months old)']
          },
          {
            id: 'dl-photo',
            name: 'Recent Passport Size Photographs (35x45mm)',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: '4 copies with white background, front-facing without tinted glasses',
            photocopyCount: 4,
            acceptedExamples: ['Studio printed colour photos taken within last 30 days']
          },
          {
            id: 'dl-appform',
            name: 'Sarathi Application Form & Fee Receipt',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Online Sarathi Parivahan application printout with barcode',
            photocopyCount: 1,
            acceptedExamples: ['Parivahan Sarathi Form 2 / Form 4 application acknowledgment']
          }
        ]
      },
      {
        id: 'rto-dl-renew',
        name: 'Driving License Renewal & Address Change',
        codePrefix: 'DR',
        avgServiceMinutes: 6,
        description: 'Expired license renewal, category addition, or change of residential address on DL',
        department: 'Licensing Division',
        officialFee: '₹400 renewal fee + ₹200 smart card fee',
        processingTime: '3-5 business days',
        instructions: [
          'If DL expired more than 1 year ago, re-test may be mandated by Motor Vehicle Inspector',
          'Surrender old physical DL booklet/smart card at the verification window'
        ],
        requiredDocuments: [
          {
            id: 'dr-olddl',
            name: 'Original Driving License (Physical Card/Booklet)',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Must surrender the original physical license card to counter officer',
            photocopyCount: 1,
            acceptedExamples: ['Original Smart Card Driving License or laminated legacy license']
          },
          {
            id: 'dr-med',
            name: 'Form 1A Medical Certificate (if age > 40 yrs)',
            category: 'Medical / Fitness',
            isMandatory: true,
            notes: 'Certified by registered medical practitioner with seal and MCI number',
            photocopyCount: 1
          },
          {
            id: 'dr-addr',
            name: 'Proof of New Address (if updating address)',
            category: 'Address Proof',
            isMandatory: false,
            notes: 'Mandatory only if moving or changing residential address',
            photocopyCount: 1,
            acceptedExamples: ['Aadhaar Card with updated address', 'Passport', 'Bank Passbook with photo']
          },
          {
            id: 'dr-photos',
            name: '2 Passport Size Photographs',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: 'Recent passport photos with white background',
            photocopyCount: 2
          }
        ]
      },
      {
        id: 'rto-rc-trans',
        name: 'Vehicle RC Transfer & Ownership Change',
        codePrefix: 'RC',
        avgServiceMinutes: 10,
        description: 'Second-hand vehicle ownership transfer, hypothecation termination (HP remove), or duplicate RC',
        department: 'Registration Authority',
        officialFee: '₹300 - ₹500 depending on vehicle class',
        processingTime: '7-10 working days',
        instructions: [
          'Chassis number pencil print must be taken on Form 29 & Form 30',
          'Both Buyer and Seller signatures must match RTO specimen records'
        ],
        requiredDocuments: [
          {
            id: 'rc-orig',
            name: 'Original Registration Certificate (RC Book / Smart Card)',
            category: 'Vehicle Documents',
            isMandatory: true,
            notes: 'Original vehicle RC book or chip-enabled smart card',
            photocopyCount: 1
          },
          {
            id: 'rc-forms',
            name: 'Form 29 & Form 30 (Notice of Transfer & Application)',
            category: 'Application Form',
            isMandatory: true,
            notes: '2 sets duly signed by both Buyer and Seller with chassis pencil impression',
            photocopyCount: 2
          },
          {
            id: 'rc-ins',
            name: 'Valid Comprehensive / Third-Party Insurance Policy',
            category: 'Vehicle Documents',
            isMandatory: true,
            notes: 'Policy must have remaining validity of at least 30 days',
            photocopyCount: 1
          },
          {
            id: 'rc-puc',
            name: 'Pollution Under Control (PUC) Certificate',
            category: 'Vehicle Documents',
            isMandatory: true,
            notes: 'Must be live and verified on national Vahan portal',
            photocopyCount: 1
          },
          {
            id: 'rc-buyer-id',
            name: 'Buyer Proof of Address & PAN Card',
            category: 'Address Proof',
            isMandatory: true,
            notes: 'Address proof must reside in current RTO territory',
            photocopyCount: 1,
            acceptedExamples: ['Aadhaar Card of Buyer', 'Passport', 'Voter ID', 'Electricity Bill']
          },
          {
            id: 'rc-noc',
            name: 'Bank Form 35 & NOC (if vehicle had loan/finance)',
            category: 'Financial & Tax',
            isMandatory: false,
            notes: 'Mandatory if vehicle was under hypothecation; issued by lending bank',
            photocopyCount: 1
          }
        ]
      },
      {
        id: 'rto-fit',
        name: 'Vehicle Fitness Certificate & State NOC',
        codePrefix: 'VF',
        avgServiceMinutes: 8,
        description: 'Commercial vehicle fitness renewal, interstate transfer NOC, and re-registration',
        department: 'Inspection & Inspection Ground',
        officialFee: '₹600 - ₹1,200',
        processingTime: 'Same day inspection',
        instructions: [
          'Bring vehicle to RTO vehicle inspection ground before 12:00 PM for physical examination',
          'Vehicle must have retro-reflective tapes, valid speed limiter, and pristine chassis engraving'
        ],
        requiredDocuments: [
          {
            id: 'vf-rc',
            name: 'Original Registration Certificate (RC)',
            category: 'Vehicle Documents',
            isMandatory: true,
            notes: 'Original RC card',
            photocopyCount: 1
          },
          {
            id: 'vf-tax',
            name: 'Road Tax Clearance Receipt',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Up-to-date road tax paid proof',
            photocopyCount: 1
          },
          {
            id: 'vf-ins',
            name: 'Valid Insurance & PUC Certificate',
            category: 'Vehicle Documents',
            isMandatory: true,
            notes: 'Commercial/private vehicle insurance',
            photocopyCount: 1
          },
          {
            id: 'vf-form38',
            name: 'Form 38 Application for Inspection',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Duly filled application with chassis pencil print',
            photocopyCount: 1
          }
        ]
      }
    ]
  },
  {
    id: 'aadhaar',
    name: 'Aadhaar Seva Kendra (UIDAI Civic Identity Hub)',
    type: 'National Identity & Biometric Center',
    address: 'Pragati Bhavan, Ground Floor, Central Civic Mall',
    isOpen: true,
    operatingHours: '09:00 AM - 06:00 PM',
    currentQueueLength: 45,
    availableCounters: 5,
    totalCounters: 6,
    approxWaitTimeMinutes: 28,
    crowdLevel: 'High',
    status: 'moderate',
    services: [
      {
        id: 'aadh-new',
        name: 'New Aadhaar Card Enrollment (First-Time)',
        codePrefix: 'AN',
        avgServiceMinutes: 12,
        description: 'Fresh 12-digit Aadhaar enrollment with 10-fingerprints, dual-iris scan, and live digital photograph',
        department: 'UIDAI Citizen Enrollment',
        officialFee: 'FREE (Government Mandated)',
        processingTime: '15-30 days via post & downloadable e-Aadhaar',
        instructions: [
          'Applicant of all ages must appear in person for live digital photograph and biometrics',
          'For children below 5 years, biometrics not required; linked to parent Aadhaar',
          'All supporting documents must be original. Photocopies will be scanned and returned immediately'
        ],
        requiredDocuments: [
          {
            id: 'aadh-poi',
            name: 'Proof of Identity (PoI) Document',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Must contain full applicant name and clear photograph',
            photocopyCount: 1,
            acceptedExamples: ['Passport', 'PAN Card', 'Ration Card with Photo', 'Voter ID Card', 'Driving License', 'Service Photo Identity Card issued by Govt/PSU']
          },
          {
            id: 'aadh-poa',
            name: 'Proof of Address (PoA) Document',
            category: 'Address Proof',
            isMandatory: true,
            notes: 'Must state full residential address and match applicant name',
            photocopyCount: 1,
            acceptedExamples: ['Bank Account Statement / Passbook with photo (last 3 months)', 'Electricity / Water / Landline Bill (not older than 3 months)', 'Voter Identity Card', 'Registered Rent Agreement with Landlord Electricity Bill', 'Passport']
          },
          {
            id: 'aadh-dob',
            name: 'Proof of Date of Birth (DoB) Document',
            category: 'Date of Birth Proof',
            isMandatory: true,
            notes: 'Required to get "Verified" DOB status; otherwise recorded as Declared',
            photocopyCount: 1,
            acceptedExamples: ['Birth Certificate issued by Registrar of Births & Deaths', 'SSLC / 10th Class Board Marksheet', 'Passport', 'PAN Card']
          },
          {
            id: 'aadh-bio',
            name: 'In-Person Biometric Capture (Live at Counter)',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: 'Live high-resolution camera photograph, 10 fingerprints, dual iris scan performed at the desk',
            photocopyCount: 0
          }
        ]
      },
      {
        id: 'aadh-demo',
        name: 'Aadhaar Demographic Update (Name, Address, DOB, Gender)',
        codePrefix: 'AD',
        avgServiceMinutes: 7,
        description: 'Update marital name change, new residential address, date of birth correction, or gender',
        department: 'UIDAI Demographic Services',
        officialFee: '₹50 (Statutory UIDAI Charge)',
        processingTime: '48 hours to 7 business days',
        instructions: [
          'Active mobile phone must be brought to counter to verify instant OTP',
          'Only one DOB change is permitted in a lifetime under UIDAI guidelines; ensure birth proof is pristine'
        ],
        requiredDocuments: [
          {
            id: 'ad-exist',
            name: 'Existing Aadhaar Number / e-Aadhaar Letter',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Physical Aadhaar card, PVC card, or printed e-Aadhaar document',
            photocopyCount: 1
          },
          {
            id: 'ad-supp',
            name: 'Supporting Document for Specific Field Being Updated',
            category: 'Address Proof',
            isMandatory: true,
            notes: 'Address proof for address change, or Birth certificate for DOB, or Gazette/Marriage certificate for Name change',
            photocopyCount: 1,
            acceptedExamples: ['For Address: Bank Statement / Electricity Bill / Rent Agreement', 'For Name: Gazette Notification / Marriage Certificate / Passport', 'For DOB: Birth Certificate / 10th Marksheet']
          },
          {
            id: 'ad-mobile',
            name: 'Registered Mobile Phone for Instant OTP Verification',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Live verification OTP will be sent to applicant mobile at the counter',
            photocopyCount: 0
          }
        ]
      },
      {
        id: 'aadh-bioupdate',
        name: 'Mandatory Child Biometric Update (Age 5 & Age 15)',
        codePrefix: 'AB',
        avgServiceMinutes: 8,
        description: 'Mandatory re-capture of fingerprints, iris, and facial photo for children turning 5 and 15 years old',
        department: 'UIDAI Child Biometric Cell',
        officialFee: 'FREE for Mandatory Child Updates (₹100 for voluntary adult updates)',
        processingTime: '5-7 days',
        instructions: [
          'Mandatory for all children within 1 year of turning age 5 and age 15 to keep Aadhaar active',
          'Parent/Guardian must accompany the child with parent Aadhaar card'
        ],
        requiredDocuments: [
          {
            id: 'ab-childaadhaar',
            name: "Child's Existing Aadhaar Card / UID Number",
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Original Aadhaar card of the child',
            photocopyCount: 1
          },
          {
            id: 'ab-parentid',
            name: "Parent's Aadhaar Card (Father/Mother)",
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Parent Aadhaar card used during original infant enrollment',
            photocopyCount: 1
          },
          {
            id: 'ab-schoolid',
            name: 'School Photo ID Card / Birth Certificate',
            category: 'Date of Birth Proof',
            isMandatory: true,
            notes: 'Verify current age and school identity',
            photocopyCount: 1,
            acceptedExamples: ['School ID Card with photo', 'Birth Certificate', 'Bonafide Certificate from School']
          }
        ]
      },
      {
        id: 'aadh-mobile-link',
        name: 'Aadhaar Mobile & Email Linking Verification',
        codePrefix: 'ML',
        avgServiceMinutes: 4,
        description: 'Link active mobile number with Aadhaar for DigiLocker, banking OTPs, and online tax filing',
        department: 'UIDAI Tele-Link Counter',
        officialFee: '₹50',
        processingTime: 'Within 24-48 hours',
        instructions: [
          'No documentary proof required! Only physical presence of Aadhaar holder with fingerprint verification',
          'Bring mobile handset with working SIM card to receive confirmation SMS'
        ],
        requiredDocuments: [
          {
            id: 'ml-uid',
            name: 'Original Aadhaar Card or 12-Digit UID Number',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Physical card or 12 digit number',
            photocopyCount: 0
          },
          {
            id: 'ml-sim',
            name: 'Physical Mobile Phone with Active SIM',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Handset must be able to receive incoming SMS OTP at the counter',
            photocopyCount: 0
          },
          {
            id: 'ml-bio',
            name: 'Live Fingerprint / Iris Verification at Scanner',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: 'Biometric scan performed on UIDAI edge terminal',
            photocopyCount: 0
          }
        ]
      }
    ]
  },
  {
    id: 'bank',
    name: 'State Bank Regional Service Center',
    type: 'Financial & Banking Institution',
    address: '12 Financial Square, Tower B, Banking Complex',
    isOpen: true,
    operatingHours: '10:00 AM - 04:30 PM',
    currentQueueLength: 28,
    availableCounters: 3,
    totalCounters: 5,
    approxWaitTimeMinutes: 22,
    crowdLevel: 'Moderate',
    status: 'moderate',
    services: [
      {
        id: 'b-kyc',
        name: 'Banking KYC (Full Re-KYC & Document Verification)',
        codePrefix: 'K',
        avgServiceMinutes: 8,
        description: 'RBI-mandated periodic Re-KYC, address update, unfreezing dormant accounts, and video KYC validation',
        department: 'KYC & Compliance Desk',
        officialFee: 'FREE (Bank Mandate)',
        processingTime: 'Instant unfreeze; updated on CBS within 24 hours',
        instructions: [
          'Bring originals of both Identity and Address proofs for in-person verification',
          'Customer must sign in presence of bank officer to match specimen signature in records'
        ],
        requiredDocuments: [
          {
            id: 'kyc-pan',
            name: 'Permanent Account Number (PAN Card)',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Original PAN card + 1 self-attested photocopy. Form 60 if applicant has no PAN.',
            photocopyCount: 1,
            acceptedExamples: ['Physical PAN Card issued by Income Tax Dept / NSDL / UTIITSL']
          },
          {
            id: 'kyc-ovd',
            name: 'Officially Valid Document (OVD) for Identity & Address',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Must contain photo and current address',
            photocopyCount: 1,
            acceptedExamples: ['Aadhaar Card (with masked UID)', 'Passport (valid pages)', 'Voter ID Card', 'Driving License (Smart Card)']
          },
          {
            id: 'kyc-addr',
            name: 'Secondary Proof of Current Address (if OVD has old address)',
            category: 'Address Proof',
            isMandatory: false,
            notes: 'Mandatory only if current stay differs from address on Aadhaar/Passport',
            photocopyCount: 1,
            acceptedExamples: ['Electricity Bill (<2 months old)', 'Piped Gas Bill', 'Water Bill', 'Municipal Property Tax receipt', 'Postpaid Mobile Bill']
          },
          {
            id: 'kyc-photo',
            name: '2 Recent Passport Size Photographs',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: 'Standard passport photographs with white background, signed across',
            photocopyCount: 2
          },
          {
            id: 'kyc-passbook',
            name: 'Bank Passbook / Cheque Leaf / Account Statement',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'To verify existing 11-digit account number and customer relationship number (CIF)',
            photocopyCount: 1
          }
        ]
      },
      {
        id: 'b-acc',
        name: 'New Savings & Current Account Opening',
        codePrefix: 'SA',
        avgServiceMinutes: 11,
        description: 'Individual savings, corporate current accounts, joint accounts, and Jan Dhan zero-balance accounts',
        department: 'Retail Accounts Section',
        officialFee: 'Zero for Savings (Minimum initial deposit ₹1,000 - ₹3,000 for regular accounts)',
        processingTime: 'Instant Welcome Kit & Debit Card; Account active in 2 hours',
        instructions: [
          'Initial funding can be made via cash deposit at cash counter or instant UPI transfer',
          'Nominee name and date of birth details must be provided on Form DA-1'
        ],
        requiredDocuments: [
          {
            id: 'sa-pan',
            name: 'PAN Card (or Form 60 declaration)',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Original PAN card for inspection',
            photocopyCount: 1
          },
          {
            id: 'sa-aadh',
            name: 'Aadhaar Card with linked active mobile',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Instant biometric e-KYC authentication at desk',
            photocopyCount: 1
          },
          {
            id: 'sa-photos',
            name: '2 Recent Passport Size Photographs',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: 'Recent passport photos',
            photocopyCount: 2
          },
          {
            id: 'sa-biz',
            name: 'GST Certificate & Trade License (For Current Accounts Only)',
            category: 'Financial & Tax',
            isMandatory: false,
            notes: 'Mandatory only for Business / Proprietorship Current Accounts',
            photocopyCount: 2,
            acceptedExamples: ['GST Registration Certificate', 'Udyam MSME Registration', 'Shop & Establishment License', 'Partnership Deed']
          }
        ]
      },
      {
        id: 'b-loa',
        name: 'Loan Verification & Collateral Documentation',
        codePrefix: 'L',
        avgServiceMinutes: 15,
        description: 'Home loan, car loan, personal loan processing, and title deed encumbrance verification',
        department: 'Credit & Loans Desk',
        officialFee: '0.25% - 0.50% loan processing charges',
        processingTime: '3-7 working days for sanction',
        instructions: [
          'All co-applicants and guarantors must present original KYC documents',
          'Carry latest 6 months bank statement showing salary credits or business turnover'
        ],
        requiredDocuments: [
          {
            id: 'l-itr',
            name: 'Income Proof: Last 3 Years ITR with Computation Sheet',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'ITR acknowledgement with calculation sheet and Form 26AS',
            photocopyCount: 1
          },
          {
            id: 'l-sal',
            name: 'Salary Slips (Last 3 Months) & Form 16',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Company stamped salary vouchers for salaried applicants',
            photocopyCount: 1
          },
          {
            id: 'l-bankstmt',
            name: 'Bank Account Statements (Last 6 Months)',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Must be bank stamped and reflect all primary transactions',
            photocopyCount: 1
          },
          {
            id: 'l-prop',
            name: 'Property Documents / Collateral Deeds (For Home Loan)',
            category: 'Financial & Tax',
            isMandatory: false,
            notes: 'Sale Agreement, Parent Deed (13 years), Approved Building Sanction Plan, Encumbrance Certificate',
            photocopyCount: 2
          }
        ]
      },
      {
        id: 'b-cas',
        name: 'Cash Counter (High-Value Deposits & Withdrawals)',
        codePrefix: 'C',
        avgServiceMinutes: 4,
        description: 'Cash deposits, cheque clearing, RTGS/NEFT slips, and currency notes exchange',
        department: 'Cashier Bay',
        officialFee: 'FREE (Standard banking limits apply)',
        processingTime: 'Instant receipt',
        instructions: [
          'For cash deposits of ₹50,000 and above, quoting and presenting PAN card is strictly mandatory',
          'Bundle notes by denomination (100, 200, 500) with tally written on pay-in slip'
        ],
        requiredDocuments: [
          {
            id: 'cas-pan',
            name: 'PAN Card (Mandatory for deposits >= ₹50,000)',
            category: 'Financial & Tax',
            isMandatory: false,
            notes: 'Required by tax law whenever cash transaction exceeds ₹49,999 in a day',
            photocopyCount: 1
          },
          {
            id: 'cas-slip',
            name: 'Duly Filled Pay-in Slip / Cheque Leaf',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Filled with account number, account holder name, and denomination tally',
            photocopyCount: 0
          },
          {
            id: 'cas-passbook',
            name: 'Original Passbook or Debit Card',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Required for customer identification during manual branch cash withdrawals',
            photocopyCount: 0
          }
        ]
      }
    ]
  },
  {
    id: 'municipal',
    name: 'Municipal Corporation Citizen Suvidha Kendra',
    type: 'Urban Governance & Civic Registry',
    address: 'Civic Plaza, Block 2, Metro City Center',
    isOpen: true,
    operatingHours: '09:00 AM - 05:00 PM',
    currentQueueLength: 19,
    availableCounters: 4,
    totalCounters: 5,
    approxWaitTimeMinutes: 16,
    crowdLevel: 'Moderate',
    status: 'normal',
    services: [
      {
        id: 'm-cer',
        name: 'Birth & Death Certificate Registration',
        codePrefix: 'BC',
        avgServiceMinutes: 7,
        description: 'Official birth certificate with QR code, death certificate, and name addition on birth records',
        department: 'Civil Registration System (CRS)',
        officialFee: '₹20 (Within 21 days: Free; Late registration: ₹50 - ₹100 penalty)',
        processingTime: 'Same day digital certificate print',
        instructions: [
          'Events reported within 21 days of occurrence are registered without late fee or magistrate orders',
          'For delayed registration after 1 year, Sub-Divisional Magistrate (SDM) order is required'
        ],
        requiredDocuments: [
          {
            id: 'bc-hosp',
            name: 'Hospital Discharge Summary / Birth or Death Report',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Form 1 (Birth) or Form 2 (Death) officially stamped by attending hospital / nursing home',
            photocopyCount: 1
          },
          {
            id: 'bc-parentid',
            name: 'Aadhaar Card / Photo ID of Both Parents or Informant',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Aadhaar of Mother and Father (or spouse/kin in case of death)',
            photocopyCount: 1
          },
          {
            id: 'bc-crem',
            name: 'Cremation / Burial Ground Receipt & Doctor Slip (For Death Cert)',
            category: 'Medical / Fitness',
            isMandatory: false,
            notes: 'Mandatory only for death certificate application; issued by burial ground registrar',
            photocopyCount: 1
          },
          {
            id: 'bc-addr',
            name: 'Proof of Residence within Municipal Limits',
            category: 'Address Proof',
            isMandatory: true,
            notes: 'Electricity bill, water bill, or registered rent agreement',
            photocopyCount: 1
          }
        ]
      },
      {
        id: 'm-inc',
        name: 'Income, Domicile & Caste Certificate',
        codePrefix: 'IC',
        avgServiceMinutes: 8,
        description: 'Revenue certificates for college admissions, scholarships, government jobs, and welfare schemes',
        department: 'Revenue & Tehsildar Division',
        officialFee: '₹30 government fee',
        processingTime: '7-14 working days',
        instructions: [
          'Affidavit must be notarized on non-judicial stamp paper of ₹100',
          'Continuous 10-year residency evidence is required for Domicile / PRC'
        ],
        requiredDocuments: [
          {
            id: 'ic-domicile',
            name: '10-Year Continuous Residence Proof (For Domicile)',
            category: 'Address Proof',
            isMandatory: true,
            notes: 'School leaving certificate from state, ration card, 10-year electricity bills, or land records',
            photocopyCount: 2
          },
          {
            id: 'ic-incproof',
            name: 'Income Proof (Salary Slips / Form 16 / Land Revenue Receipt)',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Employer salary certificate, pension slip, or Tehsildar agriculture income report',
            photocopyCount: 1
          },
          {
            id: 'ic-affidavit',
            name: 'Self-Declaration Affidavit Notarized on Stamp Paper',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Signed in front of Executive Magistrate or Notary Public on ₹100 stamp paper',
            photocopyCount: 1
          },
          {
            id: 'ic-photos',
            name: '2 Recent Passport Size Photographs',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: 'Color passport photos',
            photocopyCount: 2
          }
        ]
      },
      {
        id: 'm-tax',
        name: 'Property Tax Assessment & Khata Mutation',
        codePrefix: 'PT',
        avgServiceMinutes: 9,
        description: 'Property tax payment receipt, Khata transfer after deed registration, and title mutation',
        department: 'Property Tax & Revenue',
        officialFee: 'Varies with annual ratable value',
        processingTime: '15-21 working days for Khata certificate',
        instructions: [
          'Bring latest Registered Sale Deed and prior owner Encumbrance Certificate',
          'Ensure all past property tax arrears are cleared prior to filing mutation request'
        ],
        requiredDocuments: [
          {
            id: 'pt-deed',
            name: 'Registered Sale Deed / Gift Deed / Title Deed Copy',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Attested copy of sale deed registered at Sub-Registrar Office',
            photocopyCount: 1
          },
          {
            id: 'pt-receipt',
            name: 'Previous Year Property Tax Paid Receipts',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Latest tax assessment receipt showing nil dues',
            photocopyCount: 1
          },
          {
            id: 'pt-encum',
            name: 'Encumbrance Certificate (Form 15 for 13 years)',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Issued by Sub-Registrar showing unencumbered ownership history',
            photocopyCount: 1
          },
          {
            id: 'pt-id',
            name: 'Aadhaar Card and PAN Card of New Owner',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Self-attested photocopies of buyer KYC',
            photocopyCount: 1
          }
        ]
      },
      {
        id: 'm-trade',
        name: 'Trade License & Commercial Establishment NOC',
        codePrefix: 'TL',
        avgServiceMinutes: 6,
        description: 'New municipal shop trade license, health trade license, and commercial fire NOC',
        department: 'Health & Licensing Dept',
        officialFee: '₹1,500 - ₹5,000 depending on carpet area',
        processingTime: '5-7 business days',
        instructions: [
          'Commercial lease agreement must be executed on appropriate stamp value',
          'Fire safety clearance needed if shop area exceeds 500 sq ft'
        ],
        requiredDocuments: [
          {
            id: 'tl-rent',
            name: 'Commercial Rent Agreement / Property Ownership Proof',
            category: 'Address Proof',
            isMandatory: true,
            notes: 'Registered lease agreement or commercial property tax receipt',
            photocopyCount: 1
          },
          {
            id: 'tl-plan',
            name: 'Shop Layout Sketch & Key Plan',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Showing emergency exits and carpet area measurement in sq meters',
            photocopyCount: 1
          },
          {
            id: 'tl-pan',
            name: 'PAN Card & GST Registration Certificate of Business',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Business legal entity documentation',
            photocopyCount: 1
          }
        ]
      }
    ]
  },
  {
    id: 'hospital',
    name: 'City General Hospital (Apex Healthcare Center)',
    type: 'Government Apex Healthcare Hospital',
    address: '450 Health Avenue, Central District',
    isOpen: true,
    operatingHours: '08:00 AM - 08:00 PM',
    currentQueueLength: 34,
    availableCounters: 3,
    totalCounters: 4,
    approxWaitTimeMinutes: 24,
    crowdLevel: 'Moderate',
    status: 'moderate',
    services: [
      {
        id: 'h-reg',
        name: 'OPD Registration & Ayushman Bharat Health Card',
        codePrefix: 'A',
        avgServiceMinutes: 6,
        description: 'New outpatient case sheet, follow-up registration, and ABHA 14-digit digital health ID linkage',
        department: 'Central Registration & Medical Records',
        officialFee: '₹10 OPD Card (Free for Senior Citizens & Ayushman Card holders)',
        processingTime: 'Instant token and prescription booklet',
        instructions: [
          'Carry previous hospital visit registration number if returning for review',
          'Keep your ABHA card or mobile phone ready for instant barcode scan'
        ],
        requiredDocuments: [
          {
            id: 'hreg-id',
            name: 'Government Photo Identity (Aadhaar / Voter ID / Passport)',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Required to generate ABHA health ID and link medical records',
            photocopyCount: 1
          },
          {
            id: 'hreg-ayush',
            name: 'Ayushman Bharat PM-JAY Golden Card / ABHA Card',
            category: 'Financial & Tax',
            isMandatory: false,
            notes: 'Required for cashless treatment up to ₹5 Lakhs under government scheme',
            photocopyCount: 1
          },
          {
            id: 'hreg-prev',
            name: 'Previous Discharge Summary / Referral Letter (if follow-up)',
            category: 'Medical / Fitness',
            isMandatory: false,
            notes: 'Hospital records from referral clinic or previous OPD slip',
            photocopyCount: 0
          }
        ]
      },
      {
        id: 'h-con',
        name: 'Doctor Consultation & Clinical Triage',
        codePrefix: 'B',
        avgServiceMinutes: 14,
        description: 'General medicine, pediatric, orthopedic, cardiology, and emergency triage consultation',
        department: 'Clinical OPD Bays',
        officialFee: 'Included in Registration',
        processingTime: '15-20 mins consultation',
        instructions: [
          'Keep diagnostic blood and radiology reports arranged chronologically',
          'Bring all current prescription bottles/strips'
        ],
        requiredDocuments: [
          {
            id: 'hcon-slip',
            name: 'Active OPD Case Paper & Queue Token Receipt',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Issued at registration counter',
            photocopyCount: 0
          },
          {
            id: 'hcon-reports',
            name: 'Recent Diagnostic Lab Reports (Blood, X-Ray, ECG)',
            category: 'Medical / Fitness',
            isMandatory: false,
            notes: 'Reports performed within past 15 days',
            photocopyCount: 0
          }
        ]
      },
      {
        id: 'h-med',
        name: 'Medical Fitness & Disability Assessment Certificate',
        codePrefix: 'MF',
        avgServiceMinutes: 12,
        description: 'Government employment medical fitness certificate, driving fitness, and UDID disability certificate',
        department: 'Medical Board Examination',
        officialFee: '₹150 for employment fitness / Free for Disability Board',
        processingTime: '2-3 working days after medical board review',
        instructions: [
          'Bring official letter from employing department or RTO mandating the certificate',
          'Fasting blood sugar test is required in morning for commercial employment medicals'
        ],
        requiredDocuments: [
          {
            id: 'hmed-photo',
            name: '4 Passport Size Color Photographs',
            category: 'Photographs / Biometrics',
            isMandatory: true,
            notes: 'Photographs will be affixed to the physical fitness certificate with official seal',
            photocopyCount: 4
          },
          {
            id: 'hmed-id',
            name: 'Aadhaar Card / Passport (Original + 1 Copy)',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Government photo identification',
            photocopyCount: 1
          },
          {
            id: 'hmed-letter',
            name: 'Official Requisition Letter from Employer / RTO / University',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Format specifications required by requesting organization',
            photocopyCount: 1
          }
        ]
      },
      {
        id: 'h-bil',
        name: 'Cashless Health Insurance & TPA Clearance',
        codePrefix: 'D',
        avgServiceMinutes: 5,
        description: 'Cashless claims authorization, hospital discharge settlement, and insurance pre-approval',
        department: 'Corporate & Insurance TPA Helpdesk',
        officialFee: 'Nil (Covered by policy)',
        processingTime: '1-3 hours for insurance query resolution',
        instructions: [
          'Present insurance E-Card at least 24 hours prior to planned admission',
          'Verify that hospital is in your insurer preferred provider network (GIPSA / PPN)'
        ],
        requiredDocuments: [
          {
            id: 'hbil-card',
            name: 'Health Insurance Policy Card / TPA E-Card',
            category: 'Financial & Tax',
            isMandatory: true,
            notes: 'Showing policy number, valid dates, and insured patient name',
            photocopyCount: 1
          },
          {
            id: 'hbil-pan',
            name: 'PAN Card & Aadhaar of Proposer and Patient',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Mandatory KYC for insurance claim settlement > ₹1 Lakh',
            photocopyCount: 1
          },
          {
            id: 'hbil-form',
            name: 'Cashless Pre-Authorization Form (Part A signed by patient)',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Filled and signed by patient or family representative',
            photocopyCount: 1
          }
        ]
      }
    ]
  },
  {
    id: 'railway',
    name: 'Railway Passenger Reservation Center',
    type: 'Intercity Rail Transit Authority',
    address: 'Grand Central Junction Terminal, East Concourse',
    isOpen: true,
    operatingHours: '06:00 AM - 10:00 PM',
    currentQueueLength: 42,
    availableCounters: 4,
    totalCounters: 6,
    approxWaitTimeMinutes: 32,
    crowdLevel: 'High',
    status: 'critical',
    services: [
      {
        id: 'r-tat',
        name: 'Tatkal & Premium Emergency Ticket Booking',
        codePrefix: 'T',
        avgServiceMinutes: 5,
        description: 'Urgent quota booking opening at 10:00 AM (AC classes) and 11:00 AM (Non-AC sleeper classes)',
        department: 'Tatkal Reservation Desk',
        officialFee: 'Standard fare + ₹100 - ₹500 Tatkal premium',
        processingTime: 'Instant counter ticketing',
        instructions: [
          'Booking begins promptly at 10:00 AM for AC and 11:00 AM for Sleeper; queue builds early',
          'Only one Tatkal requisition form permitted per passenger per token'
        ],
        requiredDocuments: [
          {
            id: 'rtat-id',
            name: 'Original Photo Identity Proof of One Traveling Passenger',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Aadhaar Card, Passport, Voter ID, PAN Card, or Driving License',
            photocopyCount: 1
          },
          {
            id: 'rtat-form',
            name: 'Railway Requisition Booking Form',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Duly filled with train number, date, passenger name, age, and berth preference',
            photocopyCount: 0
          }
        ]
      },
      {
        id: 'r-pas',
        name: 'Concession Ticket & Pass Counter (Student, Senior, Divyangjan)',
        codePrefix: 'P',
        avgServiceMinutes: 9,
        description: 'Unique Disability ID (UDID) concession, cancer/heart patient pass, student season pass',
        department: 'Concession & Commercial Office',
        officialFee: 'Discounted concession tariff',
        processingTime: 'Same day verification',
        instructions: [
          'Original concession book or UDID card must be presented for verification and stamping',
          'Escort passenger ID is mandatory for categories entitled to free/subsidized escort'
        ],
        requiredDocuments: [
          {
            id: 'rpas-udid',
            name: 'Unique Disability ID Card (UDID) / Medical Certificate',
            category: 'Medical / Fitness',
            isMandatory: true,
            notes: 'Official railway prescribed concession certificate signed by Government Civil Surgeon',
            photocopyCount: 1
          },
          {
            id: 'rpas-id',
            name: 'Photo Identity Proof of Passenger & Accompanying Escort',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Aadhaar Card / Voter ID of both passenger and escort',
            photocopyCount: 1
          },
          {
            id: 'rpas-bonafide',
            name: 'School/College Bonafide Certificate (For Student Pass)',
            category: 'Application Form',
            isMandatory: false,
            notes: 'Signed and stamped by Principal of recognized educational institution',
            photocopyCount: 1
          }
        ]
      },
      {
        id: 'r-can',
        name: 'Ticket Cancellation & TDR Refund Claim',
        codePrefix: 'X',
        avgServiceMinutes: 4,
        description: 'PRS counter ticket surrender, waitlist auto-refund, and train cancellation full refund',
        department: 'Refund & Cashier Bay',
        officialFee: 'Clerkage fee ₹60 for unconfirmed; scaled deductions based on hours before chart',
        processingTime: 'Instant cash refund at window',
        instructions: [
          'Physical ticket must be surrendered in pristine condition without mutilation',
          'Cancellation must take place before chart preparation (4 hours prior to scheduled departure)'
        ],
        requiredDocuments: [
          {
            id: 'rcan-ticket',
            name: 'Original Physical PRS Counter Ticket',
            category: 'Application Form',
            isMandatory: true,
            notes: 'Original printed ticket strip containing PNR and train details',
            photocopyCount: 0
          },
          {
            id: 'rcan-id',
            name: 'Photo ID of Person Surrendering Ticket',
            category: 'Identity Proof',
            isMandatory: true,
            notes: 'Aadhaar / Voter ID / Driving License',
            photocopyCount: 0
          }
        ]
      },
      {
        id: 'r-gen',
        name: 'General Advance Reservation & Berth Allocation',
        codePrefix: 'R',
        avgServiceMinutes: 6,
        description: 'Advance train booking up to 120 days across all express, superfast, and Vande Bharat trains',
        department: 'General Reservation Booking',
        officialFee: 'Standard IRCTC tariff',
        processingTime: 'Instant print',
        instructions: [
          'Up to 6 passengers can be booked on a single requisition slip',
          'Digital UPI, credit/debit card, or cash payment accepted'
        ],
        requiredDocuments: [
          {
            id: 'rgen-form',
            name: 'Duly Filled Reservation Requisition Form',
            category: 'Application Form',
            isMandatory: true,
            notes: 'With train name, class, date of journey, and full passenger details',
            photocopyCount: 0
          },
          {
            id: 'rgen-id',
            name: 'Photo ID for verification (Optional at counter, mandatory on train)',
            category: 'Identity Proof',
            isMandatory: false,
            notes: 'Original photo ID will be verified by Travelling Ticket Examiner (TTE) during journey',
            photocopyCount: 0
          }
        ]
      }
    ]
  }
];

export const INITIAL_COUNTERS: Counter[] = [
  {
    id: 1,
    name: 'Counter 1',
    assignedServiceId: 'h-reg',
    assignedServiceName: 'Registration',
    status: 'Serving',
    currentTokenNumber: 'A-149',
    customerName: 'Robert Vance',
    elapsedSeconds: 384, // 06:24
    utilizationRate: 92,
    servedTodayCount: 42,
    isOccupiedByIoT: true,
  },
  {
    id: 2,
    name: 'Counter 2',
    assignedServiceId: 'h-reg',
    assignedServiceName: 'Registration',
    status: 'Serving',
    currentTokenNumber: 'A-150',
    customerName: 'Elena Rostova',
    elapsedSeconds: 195, // 03:15
    utilizationRate: 88,
    servedTodayCount: 38,
    isOccupiedByIoT: true,
  },
  {
    id: 3,
    name: 'Counter 3',
    assignedServiceId: 'h-reg',
    assignedServiceName: 'Registration',
    status: 'Idle',
    currentTokenNumber: undefined,
    customerName: undefined,
    elapsedSeconds: 0,
    utilizationRate: 12,
    servedTodayCount: 14,
    isOccupiedByIoT: false,
  },
  {
    id: 4,
    name: 'Counter 4',
    assignedServiceId: 'h-reg',
    assignedServiceName: 'Registration',
    status: 'High Load',
    currentTokenNumber: 'A-148',
    customerName: 'Marcus Wright',
    elapsedSeconds: 285, // 04:45
    utilizationRate: 76,
    servedTodayCount: 31,
    isOccupiedByIoT: true,
  }
];

export const INITIAL_USER_TOKEN: Token = {
  id: 'tok-usr-01',
  tokenNumber: 'A-157',
  centerId: 'hospital',
  serviceId: 'h-reg',
  serviceName: 'Registration',
  customerName: 'Alex Mercer',
  customerPhone: '+1 (555) 349-2810',
  preferredTime: 'Immediate',
  status: 'WAITING',
  queuePosition: 9,
  peopleAhead: 8,
  estimatedWaitMinutes: 24,
  estimatedServiceTime: '10:35 AM',
  createdAt: '10:11 AM',
  assignedCounterId: 3,
  assignedCounterName: 'Counter 3',
  requiredDocuments: [
    {
      id: 'hreg-id',
      name: 'Government Photo Identity (Aadhaar / Voter ID / Passport)',
      category: 'Identity Proof',
      isMandatory: true,
      notes: 'Required to generate ABHA health ID and link medical records',
      photocopyCount: 1,
      acceptedExamples: ['Aadhaar Card', 'Voter ID', 'Passport', 'Driving License']
    },
    {
      id: 'hreg-ayush',
      name: 'Ayushman Bharat PM-JAY Golden Card / ABHA Card',
      category: 'Financial & Tax',
      isMandatory: false,
      notes: 'Required for cashless treatment up to ₹5 Lakhs under government scheme',
      photocopyCount: 1
    },
    {
      id: 'hreg-prev',
      name: 'Previous Discharge Summary / Referral Letter (if follow-up)',
      category: 'Medical / Fitness',
      isMandatory: false,
      notes: 'Hospital records from referral clinic or previous OPD slip',
      photocopyCount: 0
    }
  ],
  readyDocumentIds: ['hreg-id']
};

export const INITIAL_IOT_DEVICES: IoTDevice[] = [
  {
    id: 'IOT-ENT-01',
    name: 'Entrance Optical Gate LiDAR',
    type: 'entrance_counter',
    location: 'Main North Vestibule',
    status: 'ONLINE',
    currentReading: '186 visitors today',
    numericValue: 186,
    unit: 'people',
    batteryPercentage: 98,
    signalStrength: 95,
    lastUpdate: 'Just now (10s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-OCC-04',
    name: 'Waiting Area PIR Occupancy Grid',
    type: 'waiting_occupancy',
    location: 'Zone B Central Lounge',
    status: 'WARNING',
    currentReading: '72% capacity utilized',
    numericValue: 72,
    unit: '%',
    batteryPercentage: 91,
    signalStrength: 89,
    lastUpdate: 'Just now (5s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-QUE-02',
    name: 'Queue Depth Ultrasonic Stanchion',
    type: 'queue_lidar',
    location: 'Registration Stanchion #3',
    status: 'ONLINE',
    currentReading: '34 persons in line',
    numericValue: 34,
    unit: 'people',
    batteryPercentage: 86,
    signalStrength: 92,
    lastUpdate: 'Just now (3s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-CTR-01',
    name: 'Counter 1 Chair Pressure Sensor',
    type: 'counter_sensor',
    location: 'Service Counter Bay 1',
    status: 'ONLINE',
    currentReading: 'Occupied (Active Service)',
    numericValue: 1,
    unit: 'state',
    batteryPercentage: 99,
    signalStrength: 98,
    lastUpdate: 'Just now (8s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-CTR-02',
    name: 'Counter 2 Chair Pressure Sensor',
    type: 'counter_sensor',
    location: 'Service Counter Bay 2',
    status: 'ONLINE',
    currentReading: 'Occupied (Active Service)',
    numericValue: 1,
    unit: 'state',
    batteryPercentage: 94,
    signalStrength: 96,
    lastUpdate: 'Just now (12s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-CTR-03',
    name: 'Counter 3 Chair Pressure Sensor',
    type: 'counter_sensor',
    location: 'Service Counter Bay 3',
    status: 'ONLINE',
    currentReading: 'Empty (Idle/Unassigned)',
    numericValue: 0,
    unit: 'state',
    batteryPercentage: 97,
    signalStrength: 94,
    lastUpdate: 'Just now (15s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-CTR-04',
    name: 'Counter 4 Chair Pressure Sensor',
    type: 'counter_sensor',
    location: 'Service Counter Bay 4',
    status: 'ONLINE',
    currentReading: 'Occupied (Active Service)',
    numericValue: 1,
    unit: 'state',
    batteryPercentage: 88,
    signalStrength: 91,
    lastUpdate: 'Just now (4s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-INF-01',
    name: 'Turnstile Dynamic Inflow Monitor',
    type: 'footfall_inflow',
    location: 'Lobby Security Turnstiles',
    status: 'ONLINE',
    currentReading: '21 people/min',
    numericValue: 21,
    unit: 'pax/min',
    batteryPercentage: 95,
    signalStrength: 97,
    lastUpdate: 'Just now (1s ago)',
    isSimulated: true
  },
  {
    id: 'IOT-EXT-01',
    name: 'South Exit Thermal Outflow Sensor',
    type: 'exit_sensor',
    location: 'Pharmacy South Concourse',
    status: 'ONLINE',
    currentReading: '14 people/min',
    numericValue: 14,
    unit: 'pax/min',
    batteryPercentage: 92,
    signalStrength: 90,
    lastUpdate: 'Just now (7s ago)',
    isSimulated: true
  }
];

export const INITIAL_AI_RECOMMENDATION: AIRecommendation = {
  id: 'REC-2026-0922',
  title: 'Counter Congestion Relief Optimization',
  serviceName: 'Registration',
  description: 'Queue demand is increasing at the Registration service.',
  reason: 'Registration queue has reached 34 persons with average wait 24 mins. Inflow (21/min) exceeds counter throughput (14/min). Counter 3 is currently underutilized at 12% capacity.',
  activeCounters: 3,
  recommendedAction: 'Activate Counter 3 for Registration',
  targetCounterId: 3,
  targetAction: 'open',
  expectedEffect: 'Reduce estimated waiting time by approximately 12 minutes (down to 12-14 mins).',
  estimatedWaitReductionMinutes: 12,
  applied: false,
  timestamp: '2 mins ago',
  priority: 'high'
};

export const INITIAL_ALERTS: CongestionAlert[] = [
  {
    id: 'ALT-101',
    time: '10:14 AM',
    location: 'Registration Counter Bay',
    severity: 'Moderate',
    message: 'Queue length increasing rapidly at Registration service.',
    cause: 'Arrival burst of 21 people/min over last 15 minutes.',
    recommendedAction: 'Activate standby Counter 3 or reassign General counter.',
    resolved: false
  },
  {
    id: 'ALT-102',
    time: '10:08 AM',
    location: 'Central Waiting Lounge',
    severity: 'Warning',
    message: 'Waiting area occupancy has reached 72% capacity.',
    cause: 'Concentration of outpatient registrants waiting for physician triage.',
    recommendedAction: 'Direct mobile token holders to outdoor terrace or cafeteria via virtual queue SMS.',
    resolved: false
  },
  {
    id: 'ALT-103',
    time: '09:45 AM',
    location: 'Counters 1 & 2',
    severity: 'Warning',
    message: 'Counter utilization is above 88% threshold.',
    cause: 'Continuous high load with 6m average document verification.',
    recommendedAction: 'Schedule staff rotation or split token flow.',
    resolved: false
  },
  {
    id: 'ALT-104',
    time: '09:00 AM',
    location: 'Main North Entrance',
    severity: 'Normal',
    message: 'Morning opening footfall nominal at 45 pax/hr.',
    cause: 'Regular opening schedule.',
    recommendedAction: 'Standard operational monitoring.',
    resolved: true
  }
];

export const INITIAL_NOTIFICATIONS: SMSNotification[] = [
  {
    id: 'notif-1',
    timestamp: '10:11 AM',
    phoneNumber: '+1 (555) 349-2810',
    message: 'Your token A-157 has been generated at City General Hospital for Registration. Queue position #9.',
    type: 'creation',
    read: true
  },
  {
    id: 'notif-2',
    timestamp: '10:12 AM',
    phoneNumber: '+1 (555) 349-2810',
    message: '8 people are ahead of you in the Registration queue. Estimated wait is 24 minutes. You can relax in the lounge.',
    type: 'congestion',
    read: true
  },
  {
    id: 'notif-3',
    timestamp: '10:14 AM',
    phoneNumber: '+1 (555) 349-2810',
    message: 'Notice: Queue congestion detected in lobby. Live AI adjustments are routing staff to accelerate service.',
    type: 'congestion',
    read: false
  }
];

export const INITIAL_HEATMAP_ZONES: HeatmapZone[] = [
  {
    id: 'zone-ent',
    name: 'Entrance & Turnstiles',
    densityLevel: 'Moderate',
    occupancyPercentage: 58,
    peopleCount: 29,
    capacity: 50,
    statusColor: '#f59e0b'
  },
  {
    id: 'zone-wai',
    name: 'Main Waiting Lounge',
    densityLevel: 'High',
    occupancyPercentage: 72,
    peopleCount: 86,
    capacity: 120,
    statusColor: '#ea580c'
  },
  {
    id: 'zone-que',
    name: 'Registration Stanchion Line',
    densityLevel: 'Critical',
    occupancyPercentage: 85,
    peopleCount: 34,
    capacity: 40,
    statusColor: '#dc2626'
  },
  {
    id: 'zone-ctr',
    name: 'Counter Bay Area (1-4)',
    densityLevel: 'Moderate',
    occupancyPercentage: 65,
    peopleCount: 13,
    capacity: 20,
    statusColor: '#f59e0b'
  },
  {
    id: 'zone-ext',
    name: 'South Exit & Pharmacy Foyer',
    densityLevel: 'Low',
    occupancyPercentage: 28,
    peopleCount: 14,
    capacity: 50,
    statusColor: '#10b981'
  }
];

export const HOURLY_ANALYTICS: AnalyticsDataPoint[] = [
  { time: '08:00 AM', footfall: 42, inflow: 10, outflow: 4, queueLength: 8, avgWaitMinutes: 8, counterUtilization: 45 },
  { time: '09:00 AM', footfall: 88, inflow: 16, outflow: 9, queueLength: 16, avgWaitMinutes: 12, counterUtilization: 68 },
  { time: '10:00 AM', footfall: 145, inflow: 21, outflow: 14, queueLength: 28, avgWaitMinutes: 20, counterUtilization: 86 },
  { time: '11:00 AM', footfall: 186, inflow: 23, outflow: 17, queueLength: 34, avgWaitMinutes: 24, counterUtilization: 92 },
  { time: '12:00 PM', footfall: 160, inflow: 18, outflow: 20, queueLength: 22, avgWaitMinutes: 18, counterUtilization: 79 },
  { time: '01:00 PM', footfall: 110, inflow: 12, outflow: 18, queueLength: 14, avgWaitMinutes: 11, counterUtilization: 62 },
  { time: '02:00 PM', footfall: 135, inflow: 17, outflow: 13, queueLength: 20, avgWaitMinutes: 15, counterUtilization: 74 },
  { time: '03:00 PM', footfall: 120, inflow: 14, outflow: 16, queueLength: 15, avgWaitMinutes: 12, counterUtilization: 65 }
];

export const SEVEN_DAYS_ANALYTICS: AnalyticsDataPoint[] = [
  { time: 'Mon', footfall: 680, inflow: 680, outflow: 660, queueLength: 38, avgWaitMinutes: 26, counterUtilization: 89 },
  { time: 'Tue', footfall: 640, inflow: 640, outflow: 635, queueLength: 31, avgWaitMinutes: 22, counterUtilization: 82 },
  { time: 'Wed', footfall: 710, inflow: 710, outflow: 695, queueLength: 42, avgWaitMinutes: 29, counterUtilization: 94 },
  { time: 'Thu', footfall: 590, inflow: 590, outflow: 585, queueLength: 26, avgWaitMinutes: 19, counterUtilization: 77 },
  { time: 'Fri', footfall: 750, inflow: 750, outflow: 730, queueLength: 46, avgWaitMinutes: 32, counterUtilization: 96 },
  { time: 'Sat', footfall: 420, inflow: 420, outflow: 410, queueLength: 18, avgWaitMinutes: 14, counterUtilization: 58 },
  { time: 'Sun', footfall: 210, inflow: 210, outflow: 205, queueLength: 10, avgWaitMinutes: 8, counterUtilization: 35 }
];

export const THIRTY_DAYS_ANALYTICS: AnalyticsDataPoint[] = [
  { time: 'Week 1', footfall: 4250, inflow: 4250, outflow: 4200, queueLength: 35, avgWaitMinutes: 24, counterUtilization: 86 },
  { time: 'Week 2', footfall: 4410, inflow: 4410, outflow: 4380, queueLength: 38, avgWaitMinutes: 27, counterUtilization: 89 },
  { time: 'Week 3', footfall: 3980, inflow: 3980, outflow: 3950, queueLength: 29, avgWaitMinutes: 21, counterUtilization: 78 },
  { time: 'Week 4', footfall: 4620, inflow: 4620, outflow: 4570, queueLength: 41, avgWaitMinutes: 30, counterUtilization: 92 }
];
