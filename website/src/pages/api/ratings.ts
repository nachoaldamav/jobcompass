import type { NextApiRequest, NextApiResponse } from 'next';
import { launchChromium } from 'playwright-aws-lambda';
import { EmployerReviews } from '../../../types/gdoor';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await launchChromium({
    headless: true,
  });
  const context = await browser.newContext({
    viewport: {
      width: 1280,
      height: 720,
    },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();
  await page.goto(
    'https://www.glassdoor.es/Resumen/Trabajar-en-BBVA-EI_IE1237.12,16.htm'
  );

  const windowObject = await page.evaluate(() => {
    return (window as any).appCache;
  });

  await browser.close();

  const object = JSON.parse(JSON.stringify(windowObject));

  const employerReviews = getEmployerReviews(object.apolloState.ROOT_QUERY);

  if (!employerReviews) {
    res.status(500).json({ error: 'No employer reviews found' });
    return;
  }

  const ratings = employerReviews.ratings;
  const reviews = employerReviews.reviews;

  res.setHeader('Content-Type', 'application/json');

  res.status(200).json({
    ratings: {
      overallRating: ratings.overallRating,
      reviewCount: ratings.reviewCount,
      ceoRating: ratings.ceoRating,
      recommendToFriendRating: ratings.recommendToFriendRating,
      cultureAndValuesRating: ratings.cultureAndValuesRating,
      diversityAndInclusionRating: ratings.diversityAndInclusionRating,
      careerOpportunitiesRating: ratings.careerOpportunitiesRating,
      workLifeBalanceRating: ratings.workLifeBalanceRating,
      seniorManagementRating: ratings.seniorManagementRating,
      compensationAndBenefitsRating: ratings.compensationAndBenefitsRating,
      businessOutlookRating: ratings.businessOutlookRating,
      ceoRatingsCount: ratings.ceoRatingsCount,
    },
    reviews: reviews
      ? reviews.map((review) => ({
          reviewId: review.reviewId,
          reviewDateTime: review.reviewDateTime,
          ratingOverall: review.ratingOverall,
          pros: review.pros,
          cons: review.cons,
          summary: review.summary,
          advice: review.advice,
          workLifeBalance: review.ratingWorkLifeBalance,
          cultureAndValues: review.ratingCultureAndValues,
          diversityAndInclusion: review.ratingDiversityAndInclusion,
          seniorLeadership: review.ratingSeniorLeadership,
          careerOpportunities: review.ratingCareerOpportunities,
          compensationAndBenefits: review.ratingCompensationAndBenefits,
        }))
      : [],
  });
}

function getEmployerReviews(query: { [key: string]: any }) {
  // find the object that starts with employerReviews and it has a "allReviewsCount" property
  const employerReviewsKey = Object.keys(query).find(
    (key) =>
      key.startsWith('employerReviews') &&
      query[key].allReviewsCount &&
      query[key].reviews &&
      query[key].ratings
  );

  if (!employerReviewsKey) {
    return null;
  }

  return query[employerReviewsKey] as EmployerReviews;
}
