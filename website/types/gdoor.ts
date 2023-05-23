export interface EmployerReviews {
  __typename: string;
  filteredReviewsCountByLang: FilteredReviewsCountByLang[];
  employer: Employer;
  queryLocation: any;
  queryJobTitle: any;
  currentPage: number;
  numberOfPages: number;
  lastReviewDateTime: string;
  allReviewsCount: number;
  ratedReviewsCount: number;
  filteredReviewsCount: number;
  ratings: Ratings;
  reviews: Review[];
}

export interface FilteredReviewsCountByLang {
  __typename: string;
  count: number;
  isoLanguage: string;
}

export interface Employer {
  __ref: string;
}

export interface Ratings {
  __typename: string;
  overallRating: number;
  reviewCount: number;
  ceoRating: number;
  recommendToFriendRating: number;
  cultureAndValuesRating: number;
  diversityAndInclusionRating: number;
  careerOpportunitiesRating: number;
  workLifeBalanceRating: number;
  seniorManagementRating: number;
  compensationAndBenefitsRating: number;
  businessOutlookRating: number;
  ceoRatingsCount: number;
  ratedCeo: RatedCeo;
}

export interface RatedCeo {
  __ref: string;
}

export interface Review {
  __typename: string;
  isLegal: boolean;
  reviewId: number;
  reviewDateTime: string;
  ratingOverall: number;
  ratingCeo?: string;
  ratingBusinessOutlook?: string;
  ratingWorkLifeBalance: number;
  ratingCultureAndValues: number;
  ratingDiversityAndInclusion: number;
  ratingSeniorLeadership: number;
  ratingRecommendToFriend?: string;
  ratingCareerOpportunities: number;
  ratingCompensationAndBenefits: number;
  employer: Employer2;
  isCurrentJob: boolean;
  lengthOfEmployment: number;
  employmentStatus: string;
  jobEndingYear?: number;
  jobTitle?: JobTitle;
  location?: Location;
  originalLanguageId: any;
  pros: string;
  prosOriginal: any;
  cons: string;
  consOriginal: any;
  summary: string;
  summaryOriginal: any;
  advice?: string;
  adviceOriginal: any;
  isLanguageMismatch: boolean;
  countHelpful: number;
  countNotHelpful: number;
  employerResponses: any[];
  featured: boolean;
  isCovid19: boolean;
  divisionName: any;
  divisionLink: any;
  topLevelDomainId: number;
  languageId: string;
  translationMethod: any;
}

export interface Employer2 {
  __ref: string;
}

export interface JobTitle {
  __ref: string;
}

export interface Location {
  __ref: string;
}
