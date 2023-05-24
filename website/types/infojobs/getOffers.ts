// Request Types
export interface GetOffersRequest {
  q?: string;
  province?: string;
  category?: string;
  subcategory?: string;
  city?: string;
  country?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string;
  study?: string;
  contractType?: string;
  experienceMin?: string;
  workday?: string;
  employerId?: string;
  emph?: string;
  order?: string;
  page?: number;
  maxResults?: number;
  facets?: boolean;
  sinceDate?: string;
  teleworking?: string;
}

export interface GetOffersResponse {
  currentPage: number;
  pageSize: number;
  totalResults: number;
  currentResults: number;
  totalPages: number;
  availableSortingMethods: string[];
  sortBy: string;
  sinceDate: string;
  items: Item[];
  dataLayer: DataLayer;
  queryParameters: GetOffersRequest;
  eligibleForAutomaticAlertCreation: boolean;
  offers: Offer[];
}

interface Item {
  id: string;
  title: string;
  province: Province;
  city: string;
  link: string;
  category: Category;
  contractType: ContractType;
  subcategory: Subcategory;
  salaryMin: SalaryMin;
  salaryMax: SalaryMax;
  salaryPeriod: SalaryPeriod;
  experienceMin: ExperienceMin;
  workDay: WorkDay;
  study: Study;
  teleworking: Teleworking;
  published: string;
  updated: string;
  author: Author;
  requirementMin: string;
  bold: boolean;
  applications: string;
  subSegment: number;
  executive: boolean;
  salaryDescription: string;
  priority: boolean;
  multiProvince: boolean;
  urgent: boolean;
  color: boolean;
}

export interface Province {
  id: number;
  value: string;
}

export interface Category {
  id: number;
  value: string;
}

export interface ContractType {
  id: number;
  value: string;
}

export interface Subcategory {
  id: number;
  value: string;
}

export interface SalaryMin {
  id: number;
  value: string;
}

export interface SalaryMax {
  id: number;
  value: string;
}

export interface SalaryPeriod {
  id: number;
  value: string;
}

export interface ExperienceMin {
  id: number;
  value: string;
}

export interface WorkDay {
  id: number;
  value: string;
}

export interface Study {
  id: number;
  value: string;
}

export interface Teleworking {
  id: number;
  value: string;
}

export interface Author {
  id: string;
  privateId: number;
  name: string;
  uri: string;
  logoUrl?: string;
  corporateResponsive: boolean;
  showCorporativeHeader: boolean;
}

export interface DataLayer {
  offer_search_page: string;
  offer_search_page_limit: string;
  region_level2_id: string;
}

export interface QueryParameters {
  study: any[];
  province: string[];
  salaryPeriod: string;
  city: any[];
  contractType: any[];
  query: string;
  experienceMin: any[];
  category: string[];
  workDay: any[];
  teleworking: any[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  province: Province2;
  city: string;
  link: string;
  category: Category2;
  contractType: ContractType2;
  subcategory: Subcategory2;
  salaryMin: SalaryMin2;
  salaryMax: SalaryMax2;
  salaryPeriod: SalaryPeriod2;
  experienceMin: ExperienceMin2;
  workDay: WorkDay2;
  study: Study2;
  teleworking: Teleworking2;
  published: string;
  vacancies: number;
  updated: string;
  profile: Author2;
  requirementMin: string;
  bold: boolean;
  applications: string;
  subSegment: number;
  executive: boolean;
  salaryDescription: string;
  priority: boolean;
  multiProvince: boolean;
  urgent: boolean;
  color: boolean;
}

export interface Province2 {
  id: number;
  value: string;
}

export interface Category2 {
  id: number;
  value: string;
}

export interface ContractType2 {
  id: number;
  value: string;
}

export interface Subcategory2 {
  id: number;
  value: string;
}

export interface SalaryMin2 {
  id: number;
  value: string;
}

export interface SalaryMax2 {
  id: number;
  value: string;
}

export interface SalaryPeriod2 {
  id: number;
  value: string;
}

export interface ExperienceMin2 {
  id: number;
  value: string;
}

export interface WorkDay2 {
  id: number;
  value: string;
}

export interface Study2 {
  id: number;
  value: string;
}

export interface Teleworking2 {
  id: number;
  value: string;
}

export interface Author2 {
  id: string;
  privateId: number;
  name: string;
  uri: string;
  logoUrl?: string;
  corporateResponsive: boolean;
  showCorporativeHeader: boolean;
}
