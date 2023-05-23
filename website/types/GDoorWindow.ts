export interface GDoorWindowObject {
  appName: string;
  appVersion: string;
  initialState: InitialState;
  apolloState: { [key: string]: ApolloState };
}

export interface ApolloState {
  id?: number | string;
  __typename: ApolloStateTypename;
  'employerReviews({"employer":{"id":6036}})'?: EmployerReviewsEmployerID6036;
  membershipByUser?: MembershipByUser;
  userProfileByUser?: UserProfileByUser;
  'userAccess({"employerId":6036})'?: UserAccessEmployerID6036;
  getFishbowLinkStatus?: GetFishbowLinkStatus;
  profileByUser?: EmployerReviewsEmployerID6036;
  'reviewCategories({"employerReviewsInput":{"employer":{"id":6036}}})'?: ReviewCategoriesEmployerReviewsInputEmployerID6036[];
  'employerDivisionReviews({"employer":{"id":6036}})'?: null;
  'employerReviews({"applyDefaultCriteria":true,"division":null,"dynamicProfileId":6088,"employer":{"id":6036},"employmentStatuses":[],"goc":null,"highlight":null,"jobTitle":null,"language":"eng","location":{"cityId":null,"countryId":null,"metroId":null,"stateId":null},"onlyCurrentEmployees":false,"page":{"num":1,"size":10},"preferredTldId":0,"sort":"RELEVANCE","worldwideFilter":false})'?: EmployerReviewsApplyDefaultCriteriaTrueDivisionNullDynamicProfileID6088EmployerID6036EmploymentStatusesGocNullHighlightNullJobTitleNullLanguageEngLocationCityIDNullCountryIDNullMetroIDNullStateIDNullOnlyCurrentEmployeesFalsePageNum1Size10PreferredTLDID0SortRELEVANCEWorldwideFilterFalse;
  pageViewSummary?: PageViewSummary;
  'reviewHighlights({"employer":{"id":6036},"language":"eng"})'?: ReviewHighlightsEmployerID6036LanguageEng;
  'reviewLocationsV2({"employer":{"id":6036}})'?: ReviewLocationsV2EmployerID6036;
  employmentStatuses?: EmploymentStatusElement[];
  'employer({"id":6036})'?: BestProfile;
  'faqQuestionsByEmployer({"employerId":6036})'?: FAQQuestionsByEmployerEmployerID6036;
  getCompanyFollowsForUser?: any[];
  'demographicRatings({"employerId":6036})'?: DemographicRatingsEmployerID6036[];
  'seoRecommendations({"cityId":null,"gdContext":"salaries"})'?: SEORecommendationsCityIDNullGdContextSalaries;
  'getBowlsDetails({"ids":["61faeeaff19ded00265a5498","5fd38d89b5703e00295fe042","6170caf8feebb9002c43d8c6"]})'?: BestProfile[];
  'fishbowlPostsForEmployer({"employer":{"id":6036,"name":"Amazon"}})'?: FishbowlPostsForEmployerEmployerID6036NameAmazon;
  'mlReviewHighlights({"employerId":6036})'?: MlReviewHighlightsEmployerID6036;
  'trendDataGivenStartAndEndYearMonth({"employer":{"id":6036},"monthCount":12})'?: TrendDataGivenStartAndEndYearMonthEmployerID6036MonthCount12[];
  'faqTopicsByEmployerAndSentiment({"employerId":6036})'?: FAQTopicsByEmployerAndSentimentEmployerID6036;
  'seoRecommendations({"cityId":null,"employerId":6036,"gdContext":"salaries"})'?: SEORecommendationsCityIDNullGdContextSalaries;
  'jobTitlesByEmployer({"employerId":6036})'?: JobTitlesByEmployerEmployerID6036[];
  'employerPhotos({"employerId":6036,"page":{"num":1,"size":7},"userROWPreferences":{"isROWProfileEnabled":false,"preferredTldId":0}})'?: EmployerPhotosEmployerID6036PageNum1Size7UserROWPreferencesIsROWProfileEnabledFalsePreferredTLDID0;
  'similarCompaniesRG({"employerReviewsInput":{"employer":{"id":6036},"employmentStatuses":["PART_TIME","REGULAR"]}})'?: SimilarCompaniesRGEmployerReviewsInputEmployerID6036EmploymentStatusesPARTTIMEREGULAR[];
  name?: string;
  title?: string;
  'photoUrl({"size":"REGULAR"})'?: string;
  'photoUrl({"size":"LARGE"})'?: string;
  currentBestCeoAward?: null;
  isContentPaidForTld?: boolean;
  featuredVideoLink?: null;
  profileCoverPhoto?: null;
  diversityContent?: DiversityContent;
  badgesOfShame?: any[];
  bestPlacesToWork?: any[];
  bestProfile?: BestProfile;
  ceo?: BestProfile;
  'employerManagedContent({"parameters":[{"divisionProfileId":6088,"employerId":6036}]})'?: BestProfile[];
  'squareLogoUrl({"size":"LARGE"})'?: string;
  links?: ApolloStateLinks;
  'squareLogoUrl({"size":"REGULAR"})'?: string;
  shortName?: string;
  squareLogoUrl?: null | string;
  website?: string;
  activeStatus?: string;
  'bestPlacesToWork({"onlyCurrent":true})'?: any[];
  coverPhoto?: CoverPhoto;
  counts?: ApolloStateCounts;
  divisions?: Division[];
  requirementsComplete?: boolean;
  officeAddresses?: BestProfile[];
  parent?: null;
  ratings?: ApolloStateRatings;
  subsidiaries?: Subsidiary[];
  relatedEmployers?: RelatedEmployer[];
  text?: string;
  type?: string;
  reviewCount?: number;
  topPhrase?: string;
  keyword?: string;
  atlasType?: AtlasType;
  pageSegment?: PageSegment;
  description?: string;
  handleUrl?: string;
  isJoined?: null;
  memberCount?: number;
  uiConfig?: UIConfig;
  _id?: string;
  commentsCount?: number;
  date?: Date;
  dateRelative?: string;
  feedIconUrl?: string;
  feedName?: string;
  reactions?: Reactions;
  signAccent?: string;
  signText?: string;
  url?: string;
}

export enum ApolloStateTypename {
  Bowl = 'Bowl',
  Ceo = 'Ceo',
  City = 'City',
  Employer = 'Employer',
  EmployerManagedContent = 'EmployerManagedContent',
  EmployerManagedContentSection = 'EmployerManagedContentSection',
  EmployerOfficeAddress = 'EmployerOfficeAddress',
  EmployerProfile = 'EmployerProfile',
  FishbowlPost = 'FishbowlPost',
  JobTitle = 'JobTitle',
  Query = 'Query',
  ReviewHighlight = 'ReviewHighlight',
  ReviewLocationsV2Item = 'ReviewLocationsV2Item',
  SEORecommendationItem = 'SeoRecommendationItem',
}

export enum AtlasType {
  C = 'C',
  M = 'M',
  N = 'N',
  S = 'S',
}

export interface BestProfile {
  __ref: string;
}

export interface ApolloStateCounts {
  __typename: string;
  benefitCount: number;
  globalJobCount: GlobalJobCount;
  interviewCount: number;
  photoCount: number;
  reviewCount: number;
  salaryCount: number;
}

export interface GlobalJobCount {
  __typename: string;
  jobCount: number;
}

export interface CoverPhoto {
  __typename: string;
  hiResUrl: null;
}

export interface DemographicRatingsEmployerID6036 {
  __typename: string;
  category: string;
  categoryRatings: CategoryRating[];
}

export interface CategoryRating {
  __typename: CategoryRatingTypename;
  categoryValue: string;
  ratings: CategoryRatingRatings;
}

export enum CategoryRatingTypename {
  DemographicCategoryValueRatings = 'DemographicCategoryValueRatings',
}

export interface CategoryRatingRatings {
  __typename: RatingsTypename;
  reviewCount: number;
  overallRating: number;
  ceoRating: number;
  ceoRatingsCount: number;
  recommendToFriendRating: number;
  businessOutlookRating: number;
  cultureAndValuesRating: number;
  careerOpportunitiesRating: number;
  workLifeBalanceRating: number;
  seniorManagementRating: number;
  compensationAndBenefitsRating: number;
  diversityAndInclusionRating: number;
  diversityAndInclusionRatingCount?: number;
  ratedCeoId?: number;
  ratedCeo: BestProfile;
}

export enum RatingsTypename {
  EmployerRatings = 'EmployerRatings',
}

export interface DiversityContent {
  __typename: string;
  programsAndInitiatives: BestProfile;
}

export interface Division {
  __typename: string;
  employerId: number;
  profileId: number;
  name: string;
  counts: DivisionCounts;
}

export interface DivisionCounts {
  __typename: string;
  reviewCount: number;
}

export interface EmployerPhotosEmployerID6036PageNum1Size7UserROWPreferencesIsROWProfileEnabledFalsePreferredTLDID0 {
  __typename: string;
  photos: Photo[];
}

export interface Photo {
  __typename: string;
  caption: string;
  photoLink: string;
  photoUrl: string;
}

export interface EmployerReviewsApplyDefaultCriteriaTrueDivisionNullDynamicProfileID6088EmployerID6036EmploymentStatusesGocNullHighlightNullJobTitleNullLanguageEngLocationCityIDNullCountryIDNullMetroIDNullStateIDNullOnlyCurrentEmployeesFalsePageNum1Size10PreferredTLDID0SortRELEVANCEWorldwideFilterFalse {
  __typename: string;
  filteredReviewsCountByLang: FilteredReviewsCountByLang[];
  employer: BestProfile;
  queryLocation: null;
  queryJobTitle: null;
  currentPage: number;
  numberOfPages: number;
  lastReviewDateTime: Date;
  allReviewsCount: number;
  ratedReviewsCount: number;
  filteredReviewsCount: number;
  ratings: CategoryRatingRatings;
  reviews: Review[];
}

export interface FilteredReviewsCountByLang {
  __typename: string;
  count: number;
  isoLanguage: string;
}

export interface Review {
  __typename: ReviewTypename;
  isLegal: boolean;
  reviewId: number;
  reviewDateTime: Date;
  ratingOverall: number;
  ratingCeo: null | string;
  ratingBusinessOutlook: null | string;
  ratingWorkLifeBalance: number;
  ratingCultureAndValues: number;
  ratingDiversityAndInclusion: number;
  ratingSeniorLeadership: number;
  ratingRecommendToFriend: null | string;
  ratingCareerOpportunities: number;
  ratingCompensationAndBenefits: number;
  employer: BestProfile;
  isCurrentJob: boolean;
  lengthOfEmployment: number;
  employmentStatus: EmploymentStatusEnum;
  jobEndingYear: number | null;
  jobTitle: BestProfile | null;
  location: BestProfile | null;
  originalLanguageId: null;
  pros: string;
  prosOriginal: null;
  cons: string;
  consOriginal: null;
  summary: string;
  summaryOriginal: null;
  advice: null | string;
  adviceOriginal: null;
  isLanguageMismatch: boolean;
  countHelpful: number;
  countNotHelpful: number;
  employerResponses: any[];
  featured: boolean;
  isCovid19: boolean;
  divisionName: null;
  divisionLink: null;
  topLevelDomainId: number;
  languageId: LanguageID;
  translationMethod: null;
}

export enum ReviewTypename {
  EmployerReview = 'EmployerReview',
}

export enum EmploymentStatusEnum {
  Regular = 'REGULAR',
}

export enum LanguageID {
  Eng = 'eng',
}

export interface EmployerReviewsEmployerID6036 {
  __typename: string;
  employer: Employer | null;
}

export interface Employer {
  __typename: ApolloStateTypename;
  activeStatus: string;
  approvalStatus: string;
  headquarters: string;
  size: string;
  shortName: string;
  bestProfile: BestProfile;
  restOfWorldProfile: BestProfile;
  primaryIndustry: PrimaryIndustry;
}

export interface PrimaryIndustry {
  __typename: string;
  industryId: number;
  industryName: string;
  sectorId: number;
  sectorName: string;
}

export interface EmploymentStatusElement {
  __typename: string;
  value: string;
  label: string;
}

export interface FAQQuestionsByEmployerEmployerID6036 {
  __typename: string;
  totalQuestions: number;
}

export interface FAQTopicsByEmployerAndSentimentEmployerID6036 {
  __typename: string;
  pros: FAQTopicsByEmployerAndSentimentEmployerID6036_Con[];
  cons: FAQTopicsByEmployerAndSentimentEmployerID6036_Con[];
}

export interface FAQTopicsByEmployerAndSentimentEmployerID6036_Con {
  __typename: string;
  name: string;
  docCount: number;
}

export interface FishbowlPostsForEmployerEmployerID6036NameAmazon {
  __typename: string;
  resultsType: string;
  feedRecommendation: FeedRecommendation;
  posts: BestProfile[];
}

export interface FeedRecommendation {
  __typename: string;
  iconUrl: string;
  memberCount: number;
  memberCountDisplay: string;
  name: string;
  url: string;
}

export interface GetFishbowLinkStatus {
  __typename: string;
  fishbowlUserId: null;
}

export interface JobTitlesByEmployerEmployerID6036 {
  __typename: JobTitlesByEmployerEmployerID6036___Typename;
  jobTitle: string;
  jobTitleId: number;
  jobTitleUrl: string;
  numOfJobTitlesForEmployer: number;
}

export enum JobTitlesByEmployerEmployerID6036___Typename {
  JobTitlesByEmployer = 'JobTitlesByEmployer',
}

export interface ApolloStateLinks {
  __typename: LinksTypename;
  jobsUrl?: string;
  reviewsUrl?: string;
  faqUrl?: string;
  benefitsUrl?: string;
  interviewUrl?: string;
  locationsUrl?: string;
  orgStructureUrl?: string;
  overviewUrl?: string;
  photosUrl?: string;
  salariesUrl?: string;
  highlightPhraseUrl?: string;
}

export enum LinksTypename {
  EiEmployerLinks = 'EiEmployerLinks',
  ReviewHighlightLinks = 'ReviewHighlightLinks',
}

export interface MembershipByUser {
  __typename: string;
  isAdmin: boolean;
  isBasic: boolean;
  isUnlimited: boolean;
  isActive: boolean;
  isMemberRoleActive: boolean;
  isContributor: boolean;
  isValidated: boolean;
}

export interface MlReviewHighlightsEmployerID6036 {
  __typename: string;
  pros: MlReviewHighlightsEmployerID6036_Con[];
  cons: MlReviewHighlightsEmployerID6036_Con[];
}

export interface MlReviewHighlightsEmployerID6036_Con {
  __typename: ConTypename;
  phrase: string;
  aspect: string;
  sentence: string;
  reviewCount: number;
  highlightSpans: HighlightSpan[];
  links: ConLinks;
}

export enum ConTypename {
  MLReviewHighlight = 'MLReviewHighlight',
}

export interface HighlightSpan {
  __typename: HighlightSpanTypename;
  position: number;
  length: number;
}

export enum HighlightSpanTypename {
  TextSpan = 'TextSpan',
}

export interface ConLinks {
  __typename: LinksTypename;
  highlightPhraseUrl: string;
}

export enum PageSegment {
  O = 'O',
}

export interface PageViewSummary {
  __typename: string;
  totalCount: number;
}

export interface ApolloStateRatings {
  __typename: string;
  diversityAndInclusionRatingCount: number;
}

export interface Reactions {
  __typename: string;
  count: number;
  icons: string[];
}

export interface RelatedEmployer {
  __typename: RelatedEmployerTypename;
  employerId: number;
  employer: BestProfile;
}

export enum RelatedEmployerTypename {
  RelatedEmployer = 'RelatedEmployer',
}

export interface ReviewCategoriesEmployerReviewsInputEmployerID6036 {
  __typename: ReviewCategoriesEmployerReviewsInputEmployerID6036___Typename;
  displayName: string;
  enumValue: string;
}

export enum ReviewCategoriesEmployerReviewsInputEmployerID6036___Typename {
  ReviewCategory = 'ReviewCategory',
}

export interface ReviewHighlightsEmployerID6036LanguageEng {
  __typename: string;
  pros: BestProfile[];
  cons: BestProfile[];
}

export interface ReviewLocationsV2EmployerID6036 {
  __typename: string;
  locations: BestProfile[];
  employerHQLocation: BestProfile;
}

export interface SEORecommendationsCityIDNullGdContextSalaries {
  __typename: string;
  recommendations: BestProfile[];
}

export interface SimilarCompaniesRGEmployerReviewsInputEmployerID6036EmploymentStatusesPARTTIMEREGULAR {
  __typename: SimilarCompaniesRGEmployerReviewsInputEmployerID6036EmploymentStatusesPARTTIMEREGULARTypename;
  ratings: SimilarCompaniesRGEmployerReviewsInputEmployerID6036EmploymentStatusesPARTTIMEREGULARRatings;
  employerId: number;
  interestEmployerId: number;
  reviewCount: number;
  shortName: string;
  squareLogoUrl: string;
}

export enum SimilarCompaniesRGEmployerReviewsInputEmployerID6036EmploymentStatusesPARTTIMEREGULARTypename {
  SimilarCompanyRG = 'SimilarCompanyRG',
}

export interface SimilarCompaniesRGEmployerReviewsInputEmployerID6036EmploymentStatusesPARTTIMEREGULARRatings {
  __typename: RatingsTypename;
  overallRating: number;
}

export interface Subsidiary {
  __typename: RelatedEmployerTypename;
  employerId: number;
}

export interface TrendDataGivenStartAndEndYearMonthEmployerID6036MonthCount12 {
  __typename: TrendDataGivenStartAndEndYearMonthEmployerID6036MonthCount12___Typename;
  overallRatingPercentChangeOverTime: number;
  compAndBenefitsRatingPercentChangeOverTime: number;
}

export enum TrendDataGivenStartAndEndYearMonthEmployerID6036MonthCount12___Typename {
  EmployerRatingsWrapperV2 = 'EmployerRatingsWrapperV2',
}

export interface UIConfig {
  __typename: string;
  icon: Icon;
}

export interface Icon {
  __typename: string;
  imageUrl: string;
}

export interface UserAccessEmployerID6036 {
  __typename: string;
  hasEmployerAccess: boolean;
}

export interface UserProfileByUser {
  __typename: string;
  emailAddress: string;
  jobTitle: null;
}

export interface InitialState {
  context: Context;
  deviceInfo: DeviceInfo;
  garnish: Garnish;
  parsedRequest: ParsedRequest;
  seoConfig: SEOConfig;
  oz: Oz;
  dos2: Dos2;
  employerId: number;
  profileId: number;
  rowProfileId: number;
  displayAds: DisplayAds;
  isWebviewNative: boolean;
  i18nStrings: { [key: string]: string };
  gdToken: string;
}

export interface Context {
  gdId: string;
  ip: string;
  domain: string;
  locale: string;
  userId: number;
  userRoles: number[];
  lastLoggedIn: number;
  isAdmin: boolean;
  isGdContentAdmin: boolean;
}

export interface DeviceInfo {
  tldId: number;
  gdId: string;
  domain: string;
  locationType: AtlasType;
  locationId: number;
  platform: string;
  view: string;
  device: string;
  knownBot: boolean;
  botStatus: string;
  skipTracking: boolean;
  sessionStateId: string;
  countryId: number;
}

export interface DisplayAds {
  adSlots: AdSlot[];
  spotlightAdSlots: SpotlightAdSlots;
}

export interface AdSlot {
  name: string;
  id: string;
  width: number;
  height: number;
  fluid: boolean;
}

export interface SpotlightAdSlots {
  reviews: LowResults;
  reviewDetails: LowResults;
  lowResults: LowResults;
}

export interface LowResults {
  name: string;
  id: string;
  fluid: boolean;
}

export interface Dos2 {
  content_company_updates_mesh_graph: ContentCompanyUpdatesMeshGraph;
  content_dni: ContentDni;
  content_ei_fishbowl_branded_cta_module: ContentEiFishbowlBrandedCtaModule;
  content_ei_fishbowl_carousel_cta: ContentEiFishbowlCarouselCta;
  content_ei_fishbowl_carousel_v2: ContentEiFishbowlCarouselV2;
  content_ei_fishbowl_co_reg_flow: ContentEiFishbowlCoRegFlow;
  content_ei_fishbowl_pop_up: ContentEiFishbowlPopUp;
  content_ei_fishbowl_recommended_bowls: ContentEiFishbowlRecommendedBowls;
  content_ei_header: ContentEiHeader;
  content_ei_header_overview_cta: ContentEiHeaderOverviewCta;
  content_ei_header_right_rail: ContentEiHeaderRightRail;
  content_ei_header_right_rail_interviews: ContentEiHeaderRightRailInterviews;
  content_ei_header_right_rail_photos: ContentEiHeaderRightRailPhotos;
  content_ei_header_right_rail_polls: ContentEiHeaderRightRailPolls;
  content_ei_ui_kit_conversion: ContentEiUIKitConversion;
  content_indeed: ContentIndeed;
  content_interviews_graph: ContentInterviewsGraph;
  content_location_ui_kit_conversion: ContentLocationUIKitConversion;
  content_locations_ui_kit_conversion: ContentLocationsUIKitConversion;
  content_new_interviews_survey_redirect: ContentNewInterviewsSurveyRedirect;
  content_overview_dni_module: ContentOverviewDniModule;
  content_photos_ui_kit_conversion: ContentPhotosUIKitConversion;
  content_review_details_ui_kit_conversion: ContentReviewDetailsUIKitConversion;
  content_review_highlights: ContentReviewHighlights;
  content_reviews_aa_test: ContentReviewsAaTest;
  content_reviews_demographic: ContentReviewsDemographic;
  content_reviews_fishbowl_keyword_search: ContentReviewsFishbowlKeywordSearch;
  content_reviews_sort: ContentReviewsSort;
  content_reviews_text_search: ContentReviewsTextSearch;
  content_salaries_node: ContentSalariesNode;
  content_single_page_survey: ContentSinglePageSurvey;
  content_survey_global_context: ContentSurveyGlobalContext;
  content_survey_visibility: ContentSurveyVisibility;
  content_survey_visibility_employer: ContentSurveyVisibilityEmployer;
  nuf_gd_logo: NufGdLogo;
  nuf_steps: NufSteps;
  seo_ab_test: SEOAbTest;
  talent_relationships_company_follow: TalentRelationshipsCompanyFollow;
  talent_relationships_update_redesign: TalentRelationshipsUpdateRedesign;
  brand_ads_company_compare: BrandAdsCompanyCompare;
  brand_ads_company_explorer: BrandAdsCompanyExplorer;
  generic_ad_slot: GenericAdSlot;
  homepage_highlight: HomepageHighlight;
  indeed_brand_ads: IndeedBrandAds;
  existing_users_community_registration: ExistingUsersCommunityRegistration;
  growth_global: GrowthGlobal;
  growth_hardsell_wall: GrowthHardsellWall;
  growth_header: GrowthHeader;
  growth_jobs: GrowthJobs;
  growth_spycloud: GrowthSpycloud;
  growth_us_tech: GrowthUsTech;
  growth_user_activation: GrowthUserActivation;
  growth_user_login_hfa: GrowthUserLoginHfa;
}

export interface BrandAdsCompanyCompare {
  treatment: string;
  experiment: string;
  params: BrandAdsCompanyCompareParams;
}

export interface BrandAdsCompanyCompareParams {
  nativeAdsOnCompare: string;
}

export interface BrandAdsCompanyExplorer {
  treatment: string;
  experiment: string;
  params: BrandAdsCompanyExplorerParams;
}

export interface BrandAdsCompanyExplorerParams {
  nativeAdsOnExplore: string;
}

export interface ContentCompanyUpdatesMeshGraph {
  treatment: string;
  experiment: string;
  params: ContentCompanyUpdatesMeshGraphParams;
}

export interface ContentCompanyUpdatesMeshGraphParams {
  applyCompanyUpdatesMeshGraph: string;
}

export interface ContentDni {
  treatment: string;
  experiment: string;
  params: ContentDniParams;
}

export interface ContentDniParams {
  showDni: string;
}

export interface ContentEiFishbowlBrandedCtaModule {
  treatment: string;
  experiment: string;
  params: ContentEiFishbowlBrandedCtaModuleParams;
}

export interface ContentEiFishbowlBrandedCtaModuleParams {
  enableBrandedCtaModule: string;
}

export interface ContentEiFishbowlCarouselCta {
  treatment: string;
  experiment: string;
  params: ContentEiFishbowlCarouselCtaParams;
}

export interface ContentEiFishbowlCarouselCtaParams {
  showCtaVariant: string;
}

export interface ContentEiFishbowlCarouselV2 {
  treatment: string;
  experiment: string;
  params: ContentEiFishbowlCarouselV2Params;
}

export interface ContentEiFishbowlCarouselV2Params {
  fishbowlCarouselV2: string;
}

export interface ContentEiFishbowlCoRegFlow {
  treatment: string;
  experiment: string;
  params: ContentEiFishbowlCoRegFlowParams;
}

export interface ContentEiFishbowlCoRegFlowParams {
  enableCoRegistrationFlow: string;
}

export interface ContentEiFishbowlPopUp {
  treatment: string;
  experiment: string;
  params: ContentEiFishbowlPopUpParams;
}

export interface ContentEiFishbowlPopUpParams {
  fishbowlCtaPopUp: string;
}

export interface ContentEiFishbowlRecommendedBowls {
  treatment: string;
  experiment: string;
  params: ContentEiFishbowlRecommendedBowlsParams;
}

export interface ContentEiFishbowlRecommendedBowlsParams {
  enableRecommendedBowls: string;
}

export interface ContentEiHeader {
  treatment: string;
  experiment: string;
  params: ContentEiHeaderParams;
}

export interface ContentEiHeaderParams {
  nodeComponent: string;
}

export interface ContentEiHeaderOverviewCta {
  treatment: string;
  experiment: string;
  params: ContentEiHeaderOverviewCtaParams;
}

export interface ContentEiHeaderOverviewCtaParams {
  fishbowlCtaOverview: string;
}

export interface ContentEiHeaderRightRail {
  treatment: string;
  experiment: string;
  params: ContentEiHeaderRightRailParams;
}

export interface ContentEiHeaderRightRailParams {
  hideHeaderRightRail: string;
}

export interface ContentEiHeaderRightRailInterviews {
  treatment: string;
  experiment: string;
  params: ContentEiHeaderRightRailInterviewsParams;
}

export interface ContentEiHeaderRightRailInterviewsParams {
  showHeaderRightRailInterviews: string;
}

export interface ContentEiHeaderRightRailPhotos {
  treatment: string;
  experiment: string;
  params: ContentEiHeaderRightRailPhotosParams;
}

export interface ContentEiHeaderRightRailPhotosParams {
  showHeaderRightRailPhotos: string;
}

export interface ContentEiHeaderRightRailPolls {
  treatment: string;
  experiment: string;
  params: ContentEiHeaderRightRailPollsParams;
}

export interface ContentEiHeaderRightRailPollsParams {
  showHeaderRightRailPolls: string;
}

export interface ContentEiUIKitConversion {
  treatment: string;
  experiment: string;
  params: ContentEiUIKitConversionParams;
}

export interface ContentEiUIKitConversionParams {
  showNewUiEi: string;
}

export interface ContentIndeed {
  treatment: string;
  experiment: string;
  params: ContentIndeedParams;
}

export interface ContentIndeedParams {
  apply: string;
}

export interface ContentInterviewsGraph {
  treatment: string;
  experiment: string;
  params: ContentInterviewsGraphParams;
}

export interface ContentInterviewsGraphParams {
  applyOSGraph: string;
}

export interface ContentLocationUIKitConversion {
  treatment: string;
  experiment: string;
  params: ContentLocationUIKitConversionParams;
}

export interface ContentLocationUIKitConversionParams {
  showNewUiLocation: string;
}

export interface ContentLocationsUIKitConversion {
  treatment: string;
  experiment: string;
  params: ContentLocationsUIKitConversionParams;
}

export interface ContentLocationsUIKitConversionParams {
  showNewUiLocations: string;
}

export interface ContentNewInterviewsSurveyRedirect {
  treatment: string;
  experiment: string;
  params: ContentNewInterviewsSurveyRedirectParams;
}

export interface ContentNewInterviewsSurveyRedirectParams {
  redirectToNewSurveysInterviews: string;
}

export interface ContentOverviewDniModule {
  treatment: string;
  experiment: string;
  params: ContentOverviewDniModuleParams;
}

export interface ContentOverviewDniModuleParams {
  hideDni: string;
}

export interface ContentPhotosUIKitConversion {
  treatment: string;
  experiment: string;
  params: ContentPhotosUIKitConversionParams;
}

export interface ContentPhotosUIKitConversionParams {
  showNewUiPhotos: string;
}

export interface ContentReviewDetailsUIKitConversion {
  treatment: string;
  experiment: string;
  params: ContentReviewDetailsUIKitConversionParams;
}

export interface ContentReviewDetailsUIKitConversionParams {
  showNewUiReviewDetails: string;
}

export interface ContentReviewHighlights {
  treatment: string;
  experiment: string;
  params: ContentReviewHighlightsParams;
}

export interface ContentReviewHighlightsParams {
  highlights: string;
}

export interface ContentReviewsAaTest {
  treatment: string;
  experiment: string;
  params: Dos2SEOExperiments;
}

export interface Dos2SEOExperiments {}

export interface ContentReviewsDemographic {
  treatment: string;
  experiment: string;
  params: ContentReviewsDemographicParams;
}

export interface ContentReviewsDemographicParams {
  reviewsDemographic: string;
}

export interface ContentReviewsFishbowlKeywordSearch {
  treatment: string;
  experiment: string;
  params: ContentReviewsFishbowlKeywordSearchParams;
}

export interface ContentReviewsFishbowlKeywordSearchParams {
  showFishbowlCarousel: string;
}

export interface ContentReviewsSort {
  treatment: string;
  experiment: string;
  params: ContentReviewsSortParams;
}

export interface ContentReviewsSortParams {
  reviewLengthMultiplier: string;
  reviewLengthLimit: string;
  reviewLengthConstant: string;
  recencyFunctionMultiplier: string;
  recencyFunctionExponentiator: string;
  recencyFunctionLimit: string;
  recencyFunctionConstant: string;
  ratingModifierMultiplier: string;
}

export interface ContentReviewsTextSearch {
  treatment: string;
  experiment: string;
  params: ContentReviewsTextSearchParams;
}

export interface ContentReviewsTextSearchParams {
  enableKWS: string;
}

export interface ContentSalariesNode {
  treatment: string;
  experiment: string;
  params: ContentSalariesNodeParams;
}

export interface ContentSalariesNodeParams {
  showSalariesSgocFilters: string;
  showSalariesBySgoc: string;
  showSalaryRangeBar: string;
  showPreferredSgoc: string;
}

export interface ContentSinglePageSurvey {
  treatment: string;
  experiment: string;
  params: ContentSinglePageSurveyParams;
}

export interface ContentSinglePageSurveyParams {
  singlePage: string;
}

export interface ContentSurveyGlobalContext {
  treatment: string;
  experiment: string;
  params: ContentSurveyGlobalContextParams;
}

export interface ContentSurveyGlobalContextParams {
  showNewSuggestedComp: string;
}

export interface ContentSurveyVisibility {
  treatment: string;
  experiment: string;
  params: ContentSurveyVisibilityParams;
}

export interface ContentSurveyVisibilityParams {
  surveyVisiblity: string;
}

export interface ContentSurveyVisibilityEmployer {
  treatment: string;
  experiment: string;
  params: ContentSurveyVisibilityEmployerParams;
}

export interface ContentSurveyVisibilityEmployerParams {
  empSurveyVisiblity: string;
}

export interface ExistingUsersCommunityRegistration {
  treatment: string;
  experiment: string;
  params: ExistingUsersCommunityRegistrationParams;
}

export interface ExistingUsersCommunityRegistrationParams {
  redirectToCommunityReg: string;
}

export interface GenericAdSlot {
  treatment: string;
  experiment: string;
  params: GenericAdSlotParams;
}

export interface GenericAdSlotParams {
  useIta: string;
}

export interface GrowthGlobal {
  treatment: string;
  experiment: string;
  params: GrowthGlobalParams;
}

export interface GrowthGlobalParams {
  inlineAppInstall: string;
  showNUFInPeekMode: string;
  regToEasyApplyTreatment: string;
  facebookNoIframe: string;
  appInstallBannerTreatment: string;
  growthAA: string;
  GDPRSignin: string;
  paginationV2: string;
  oneTapV2Enabled: string;
  singularAuth: string;
  enableSiwa: string;
}

export interface GrowthHardsellWall {
  treatment: string;
  experiment: string;
  params: GrowthHardsellWallParams;
}

export interface GrowthHardsellWallParams {
  updateHardsellWalltextContent: string;
}

export interface GrowthHeader {
  treatment: string;
  experiment: string;
  params: GrowthHeaderParams;
}

export interface GrowthHeaderParams {
  searchBoxV1: string;
}

export interface GrowthJobs {
  treatment: string;
  experiment: string;
  params: GrowthJobsParams;
}

export interface GrowthJobsParams {
  g4jL2APostApply: string;
}

export interface GrowthSpycloud {
  treatment: string;
  experiment: string;
  params: GrowthSpycloudParams;
}

export interface GrowthSpycloudParams {
  secureCheck: string;
}

export interface GrowthUsTech {
  treatment: string;
  experiment: string;
  params: GrowthUsTechParams;
}

export interface GrowthUsTechParams {
  enableUSTechSurvey: string;
}

export interface GrowthUserActivation {
  treatment: string;
  experiment: string;
  params: GrowthUserActivationParams;
}

export interface GrowthUserActivationParams {
  postAuthSurveyUrl: string;
  isCrossroads: string;
}

export interface GrowthUserLoginHfa {
  treatment: string;
  experiment: string;
  params: GrowthUserLoginHfaParams;
}

export interface GrowthUserLoginHfaParams {
  enableUserLoginHFA: string;
}

export interface HomepageHighlight {
  treatment: string;
  experiment: string;
  params: HomepageHighlightParams;
}

export interface HomepageHighlightParams {
  useEba: string;
}

export interface IndeedBrandAds {
  treatment: string;
  experiment: string;
  params: IndeedBrandAdsParams;
}

export interface IndeedBrandAdsParams {
  indeedTopRightRailAd: string;
}

export interface NufGdLogo {
  treatment: string;
  experiment: string;
  params: NufGdLogoParams;
}

export interface NufGdLogoParams {
  logoEnabled: string;
}

export interface NufSteps {
  treatment: string;
  experiment: string;
  params: NufStepsParams;
}

export interface NufStepsParams {
  orderVariant: string;
}

export interface SEOAbTest {
  treatment: string;
  experiment: string;
  params: SEOAbTestParams;
}

export interface SEOAbTestParams {
  variant: string;
}

export interface TalentRelationshipsCompanyFollow {
  treatment: string;
  experiment: string;
  params: TalentRelationshipsCompanyFollowParams;
}

export interface TalentRelationshipsCompanyFollowParams {
  showNewCompanyFollowCTA: string;
}

export interface TalentRelationshipsUpdateRedesign {
  treatment: string;
  experiment: string;
  params: TalentRelationshipsUpdateRedesignParams;
}

export interface TalentRelationshipsUpdateRedesignParams {
  showNewUpdateRedesign: string;
}

export interface Garnish {
  useErrorPages: boolean;
}

export interface Oz {
  employersInfosite: EmployersInfosite;
  employerQAndC: EmployerQAndC;
  richTextFAQs: RichTextFAQs;
  genericAdSlot: GenericAdSlotClass;
  careerOverview: CareerOverview;
  content: Content;
  eiFishbowlBlockedEmployers: EiFishbowlBlockedEmployers;
  eiFishbowlRecommended: EiFishbowlRecommended;
  eiFishbowl: EiFishbowl;
  reviewsSgocFilter: ReviewsSgocFilter;
  contentLockSettings: ContentLockSettings;
  eiProxy: EiProxy;
  employerFAQ: EmployerFAQ;
  tldConfig: TLDConfig;
  infositeCommon: InfositeCommon;
}

export interface CareerOverview {
  default: CareerOverviewDefault;
}

export interface CareerOverviewDefault {
  enableCareerOverview: boolean;
  _enabled: boolean;
}

export interface Content {
  default: ContentDefault;
}

export interface ContentDefault {
  bestPlacesToWorkUrl: string;
  thirteenthMonthEnabled: boolean;
  hideCeoInfoEnabled: boolean;
  enableTechSurvey: boolean;
  employerReviewJobTitleEnabled: boolean;
  _enabled: boolean;
}

export interface ContentLockSettings {
  default: ContentLockSettingsDefault;
}

export interface ContentLockSettingsDefault {
  maxFreePageViews: number;
  softSellPageTrigger: number;
  hardSellPageTrigger: number;
  persistHardSell: boolean;
  eiJobsContentLockPassThroughEmployerList: number[];
  salariesContentLockPassThroughEmployerList: any[];
  allowedAppList: string[];
  verbosePageViewLogging: boolean;
  _enabled: boolean;
}

export interface EiFishbowl {
  default: EiFishbowlDefault;
}

export interface EiFishbowlDefault {
  enableCarouselInterviews: boolean;
  enableCarouselOverview: boolean;
  enableCarouselReviews: boolean;
  enableCompanyBowlBrand: boolean;
  enableCoRegistrationFlow: boolean;
  _enabled: boolean;
}

export interface EiFishbowlBlockedEmployers {
  blockedEmployerIds: BlockedEmployerIDS;
}

export interface BlockedEmployerIDS {
  employerIds: number[];
  _enabled: boolean;
}

export interface EiFishbowlRecommended {
  eiFishbowlRecommendedBowls: EiFishbowlRecommendedBowls;
}

export interface EiFishbowlRecommendedBowls {
  recommendedBowlIds: string[];
  _enabled: boolean;
}

export interface EiProxy {
  default: EiProxyDefault;
}

export interface EiProxyDefault {
  enableProxyReviews: boolean;
  _enabled: boolean;
}

export interface EmployerFAQ {
  default: EmployerFAQDefault;
}

export interface EmployerFAQDefault {
  enableFAQ: boolean;
  _enabled: boolean;
}

export interface EmployerQAndC {
  default: EmployerQAndCDefault;
}

export interface EmployerQAndCDefault {
  qAndCEmployerIds: number[];
  qAndCLocales: string[];
  _enabled: boolean;
}

export interface EmployersInfosite {
  rowProfileSwitcherEnabled: RowProfileSwitcherEnabled;
}

export interface RowProfileSwitcherEnabled {
  rowProfileSwitcherEnabled: boolean;
  _enabled: boolean;
}

export interface GenericAdSlotClass {
  adProvider: AdProvider;
}

export interface AdProvider {
  source: string;
  _enabled: boolean;
}

export interface InfositeCommon {
  compBenefitRating: CompBenefitRating;
}

export interface CompBenefitRating {
  min: number;
  max: number;
  _enabled: boolean;
}

export interface ReviewsSgocFilter {
  default: ReviewsSgocFilterDefault;
}

export interface ReviewsSgocFilterDefault {
  enableReviewsSgocFilter: boolean;
  _enabled: boolean;
}

export interface RichTextFAQs {
  enableReviewsFAQs: EnableReviewsFAQs;
  enableReviewsOccFAQs: EnableReviewsOccFAQs;
  enableReviewsLocFAQs: EnableReviewsLOCFAQs;
  enableReviewsFAQsProsAndCons: EnableReviewsFAQsProsAndCons;
}

export interface EnableReviewsFAQs {
  enabled: boolean;
  _enabled: boolean;
}

export interface EnableReviewsFAQsProsAndCons {
  showProsCons: string[];
  _enabled: boolean;
}

export interface EnableReviewsLOCFAQs {
  showReviewsLocFAQs: string[];
  _enabled: boolean;
}

export interface EnableReviewsOccFAQs {
  showReviewsOccFAQs: string[];
  _enabled: boolean;
}

export interface TLDConfig {
  default: TLDConfigDefault;
}

export interface TLDConfigDefault {
  delayWatcherAndCf: number;
  enableGlobalMktUnsub: number;
  enableAfsKeywordAppend: number;
  enableCareerAdvice: number;
  enableCareerMenu: number;
  enableContentOnMweb: number;
  enableCustomSurveyQuestions: number;
  enableDepartmentFilters: number;
  enableDynamicProfile: number;
  enableEcKeyWordsAnalytics: number;
  enableEiJobsSalaryEstimate: number;
  enableEULegalFooterLink_stringValue: string;
  enableEULegalFooterLink_longValue: number;
  enableFeaForm: number;
  enableFooterAwardLink: number;
  enableGdprOptout: number;
  enableGuidesFooterLink_stringValue: string;
  enableGuidesFooterLink_longValue: number;
  enableHideCeoInfo: number;
  enableHideRatingsFilterOnSerp: number;
  enableINGrievanceFooterLinkUrl: string;
  enableINGrievanceFooterLink: number;
  enableInfositeLiveEdit: number;
  enableJobAwareness: number;
  enableJobDescPages: number;
  enableJobDescriptions: number;
  enableJobViewToSerpRedirect: number;
  enableKywi: number;
  enableLazyLoadSimilarCompanies: number;
  enableNewEc: number;
  enableNewTypeahead: number;
  enablePendo: number;
  enablePostAJobMenu: number;
  enableResumeExampleLinks: number;
  enableSelfServiceEepPricing: number;
  excludeEmpBranding: number;
  excludeEmpRecruiting: number;
  excludeFinancialInfo: number;
  excludeInterviewTags: number;
  excludeLatestNews: number;
  excludeResumeService: number;
  excludeSjp: number;
  includeCovid_19Sort: number;
  includeCustomReporting: number;
  includeEcSalesContactNumberForProfiles: number;
  includeGlassdoorResearch: number;
  includeGocsReports: number;
  includeJobviewCta: number;
  includeKywiDroid: number;
  includeKywiIos: number;
  includeLeftNavPhoneNumber: number;
  includePublisherTag: number;
  includeRealTimeProxy: number;
  includeSelfServe: number;
  includeStudents: number;
  knowYourWorthEmail: number;
  localizeCanonicalToUs: number;
  marketingBestPlacesToInterviewPage: number;
  marketingTopCeosPage: number;
  newBptwBadge: number;
  showMarketingBptwNav: number;
  trendingJobs: number;
  useUkPrivacyPolicy: number;
  appStoreCountry: string;
  blogUrl: string;
  contactSalesUrl: string;
  currency: string;
  emailDateLongFormat: string;
  emailDateShortFormat: string;
  emailEasyapplyBlogLink: string;
  employerBlogUrl: string;
  employerBrandingMarketingUrl: string;
  enableSweepstakeTermsUrl: string;
  feaSignupUrl: string;
  jobAdsMarketingUrl: string;
  legalTextApply: string;
  legalTextHomepage: string;
  legalTextLogin: string;
  localizeSolutionsEmployersUrl: string;
  playStoreHumanLanguage: string;
  ratingsArticlePath: string;
  salarySearchBounce: number;
  enableGoogleTranslateReviews: number;
  excludePhotoApply: number;
  includeSiteNotifications: number;
  servePlaceholderHomepage: number;
  showTopCompaniesFor: number;
  enableStudentVideo: number;
  helpCenterDomain: string;
  helpCenterLocale: string;
  communityGuidelinesUrl: string;
  includeEcSalesContactSupportDomain_stringValue: string;
  includeEcSalesContactSupportDomain_longValue: number;
  localizeFeaTracking: string;
  appStoresIconsLanguage: string;
  enablePrebid: number;
  enableHeaderBidder: number;
  enableHeaderBidderPrebid: number;
  enableHeaderBidderAmazon: number;
  enableHeaderBidderIndexExchange: number;
  enableAdMidUnit: number;
  enableCompanySpotlight: number;
  reviews_longValue: number;
  reviews_floatValue: number;
  salarySearch_longValue: number;
  salarySearch_floatValue: number;
  salaryInfosite_longValue: number;
  salaryInfosite_floatValue: number;
  interviewSearch_longValue: number;
  interviewSearch_floatValue: number;
  interviewInfosite_longValue: number;
  interviewInfosite_floatValue: number;
  enableSalesforceContactForm: number;
  employerHowToUrl: string;
  employerResourcesUrl: string;
  enableUserProfile: number;
  addingAnEmployerResponseUrl: string;
  distanceUnit: AtlasType;
  enableBlackLogo: number;
  _enabled: boolean;
}

export interface ParsedRequest {
  urlData: URLData;
}

export interface URLData {
  url: string;
  params: URLDataParams;
  pagePrefix: string;
  origin: string;
}

export interface URLDataParams {
  employerId: number;
  page: null;
}

export interface SEOConfig {
  appName: string;
  staticPaths: any[];
  seoABTest: Dos2SEOExperiments;
  urlRegexMatchers: null[];
  generators: Dos2SEOExperiments;
  parsedData: ParsedData;
  dos2SEOExperiments: Dos2SEOExperiments;
}

export interface ParsedData {
  params: ParsedDataParams;
  helpers: Dos2SEOExperiments;
  urlParams: URLParams;
  url: string;
  pageSegment: string;
}

export interface ParsedDataParams {
  path: Path;
}

export interface Path {
  employer: string;
  employerId: string;
}

export interface URLParams {
  pageType: string;
  contentType: string;
  locale: string;
}
