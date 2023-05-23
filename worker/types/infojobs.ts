export interface UserProfile {
  id: number;
  email: string;
  emailHash: string;
  userKey: string;
  hasPhoto: boolean;
  photo: string;
  name: string;
  surname1: string;
  surname2: string;
  fullName: string;
  city: string;
  province: Province;
  publicProfileLink: string;
  status: number;
  validatedMail: number;
  accountCreation: string;
  lastCVUpdate: string;
  lastInscripcion: string;
  extendedBannerAttributes: string;
  subSegment: string;
  doesNotWantNotifications: boolean;
  photoAccepted: boolean;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface Province {
  id: number;
  value: string;
}

export interface Offer {
  title: string;
  id: string;
  state: number;
  creationDate: string;
  updateDate: string;
  city: string;
  externalUrlForm: string;
  blocked: boolean;
  applications: number;
  province: Province;
  experienceMin: ExperienceMin;
  category: Category;
  subcategory: Subcategory;
  studiesMin: StudiesMin;
  residence: Residence;
  country: Country;
  contractType: ContractType;
  journey: Journey;
  subSegment: number;
  profile: Profile;
  cityPD: number;
  zipCode: string;
  latitude: number;
  longitude: number;
  exactLocation: boolean;
  department: string;
  vacancies: number;
  minRequirements: string;
  description: string;
  desiredRequirements: string;
  commissions: string;
  contractDuration: string;
  referenceId: string;
  detailedStudiesId: number;
  studying: boolean;
  showPay: boolean;
  multiProvince: boolean;
  maxPay: MaxPay;
  minPay: MinPay;
  schedule: string;
  jobLevel: JobLevel;
  staffInCharge: StaffInCharge;
  hasKillerQuestions: number;
  hasOpenQuestions: number;
  upsellings: Upsellings;
  epreselec: boolean;
  fiscalAddress: string;
  shouldAskExportConsent: boolean;
  exportConsentName: string;
  link: string;
  active: boolean;
  archived: boolean;
  deleted: boolean;
  disponibleForFullVisualization: boolean;
  availableForVisualization: boolean;
  skillsList: any[];
  salaryDescription: string;
}

export interface Province {
  id: number;
  value: string;
}

export interface ExperienceMin {
  id: number;
  value: string;
}

export interface Category {
  id: number;
  value: string;
}

export interface Subcategory {
  id: number;
  value: string;
}

export interface StudiesMin {
  id: number;
  value: string;
}

export interface Residence {
  id: number;
  value: string;
}

export interface Country {
  id: number;
  value: string;
}

export interface ContractType {
  id: number;
  value: string;
}

export interface Journey {
  id: number;
  value: string;
}

export interface Profile {
  id: string;
  name: string;
  description: string;
  province: Province2;
  web: string;
  numberWorkers: number;
  url: string;
  corporateWebsiteUrl: string;
  websiteUrl: string;
  hidden: boolean;
  typeIndustry: TypeIndustry;
  country: Country2;
  corporateResponsive: boolean;
  showCorporativeHeader: boolean;
  clientId: number;
  followable: boolean;
}

export interface Province2 {
  id: number;
  value: string;
}

export interface TypeIndustry {
  id: number;
  value: string;
}

export interface Country2 {
  id: number;
  value: string;
}

export interface MaxPay {
  amount: number;
  amountId: number;
  periodId: number;
  periodValue: string;
  amountValue: string;
}

export interface MinPay {
  amount: number;
  amountId: number;
  periodId: number;
  periodValue: string;
  amountValue: string;
}

export interface JobLevel {
  id: number;
  value: string;
}

export interface StaffInCharge {
  id: number;
  value: string;
}

export interface Upsellings {
  highlightHomeMonth: boolean;
  highlightHomeWeek: boolean;
  highlightSubcategory: boolean;
  highlightLogo: boolean;
  highlightColor: boolean;
  highlightUrgent: boolean;
  highlightStandingOffer: boolean;
}
