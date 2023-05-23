import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gdoorResponse = await fetch('https://www.glassdoor.es/graph', {
    headers: {
      accept: '*/*',
      'accept-language': 'es-ES,es;q=0.9',
      'apollographql-client-name': 'ei-overview',
      'apollographql-client-version': '4.0.0',
      'content-type': 'application/json',
      'gd-csrf-token':
        'dyF9mwPXREHpxiTeR34cFg:hpHlxamfda_oi3422u25Y5Y4yst8t_cW8ojRPohdF-xSK21UswuRALz2fSzQ6QfQWf7s1NFgH4CQwUMwP-FVcg:71Dm7MfP1OxYvU8GFHc70Rp4BrVzAUl1qEt2FCO4ecs',
      'sec-ch-ua':
        '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      cookie:
        'gdsid=1684434500811:1684434500811:71E2A90D1CAE47361532E6D19C78199F; asst=1684434500.0; gdId=8b58a128-0943-4515-8588-cf2fee768cab; bs=G3C0zzp3CdMyNTlaAZl7xw:2f6UFb2m2iapRLVbEXNVsPoCueaq-vFhlkmXjzxpEvnaHqzGDRTYNp8Watzd0BM9lPvjTuKQ6QHZHGtT96opz6HRVgyfH_2AkmCA9-67Z6Q:Qt8BEejDPftFn_hDCywPW9jIr5sVCqYPAds5Bh70Owg; __cf_bm=.ITtvkwwPiGwn9O5X9MAiQtStY2HmAZoL.id0Lb.EkA-1684434500-0-AdNPaCN5MUY3ERIL890If0ugodJbFftJP7AAF4dpx6j6gAyOejUWyCIjCs2LR1IkNtAlOsLOtoSypBcZwV/PUTM=; _cfuvid=670RMNv9jpH_QNnihsXmJr4Ej8NmZfQr1czrb0GaEn0-1684434500898-0-604800000; GSESSIONID=undefined; rl_page_init_referrer=RudderEncrypt%3AU2FsdGVkX19gaErXmaWfLZP3vNhcuVe%2FOQ%2FUpD4NX3g%3D; rl_page_init_referring_domain=RudderEncrypt%3AU2FsdGVkX19Z3z%2FTQH5DpSffpOR%2B8uEL4hjGUXncn08%3D; rsSessionId=1684434501461; JSESSIONID=644A3E1A46A993A876D8B118CA44CAB9; cass=1; _ga=GA1.2.1798920373.1684434502; _gid=GA1.2.1781491825.1684434502; _dc_gtm_UA-2595786-1=1; _optionalConsent=false; AWSALB=gMyBOZ13rGarqR2oCMVC54HCGreePeTF9KUwvPFtA5ZpxIuvfLceVkxYxMhEXEZLUpbXqSTmmZfA7roPIFZuydBUQd9Np5H8VR17Clb+SeCeWufA9QSWHnn7VRNo; AWSALBCORS=gMyBOZ13rGarqR2oCMVC54HCGreePeTF9KUwvPFtA5ZpxIuvfLceVkxYxMhEXEZLUpbXqSTmmZfA7roPIFZuydBUQd9Np5H8VR17Clb+SeCeWufA9QSWHnn7VRNo; OptanonConsent=isGpcEnabled=0&datestamp=Thu+May+18+2023+20%3A28%3A28+GMT%2B0200+(Central+European+Summer+Time)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=2fda26c0-7964-4c00-b259-ffd0bf3853c8&interactionCount=1&landingPath=https%3A%2F%2Fwww.glassdoor.es%2FResumen%2FTrabajar-en-Santander-EI_IE828048.12%2C21.htm&groups=C0001%3A1%2CC0003%3A0%2CC0002%3A0%2CC0004%3A0%2CC0017%3A0; rl_session=RudderEncrypt%3AU2FsdGVkX19vV%2BG7lCN%2FqbB8%2BYTo9EP1nz1ppucnzyfmmepIA8ZMc0js83UEXHQhgWO0GJzVxYRGDXD47YH1CKX%2FkyNeVRwQaam1l68awg4pBJ3JfiU%2FYYnoH%2FVlNjdavYGjuREp6DmqokOD1%2Bg1lA%3D%3D; rl_user_id=RudderEncrypt%3AU2FsdGVkX1%2FRiT8bOYcE30cP7YiXUV62lHlzOMVeASI%3D; rl_trait=RudderEncrypt%3AU2FsdGVkX1%2B9TfqeOg8SAe5riOTwqQ69tOFdUgMqONw%3D; rl_group_id=RudderEncrypt%3AU2FsdGVkX1%2B4HCxsNqOM06gsloIOXEpP2Bb3iJa2Myk%3D; rl_group_trait=RudderEncrypt%3AU2FsdGVkX18tcolxwZfRNtH4BVp8A16zajKcCfzrOUI%3D; rl_anonymous_id=RudderEncrypt%3AU2FsdGVkX1%2BZZH8aNOMFWrMrAze50t9NvGpXW7eo6Aqel4Hp9dzYLsWvNKeG1w20eoIFP7NF9bvOmvGLprawDQ%3D%3D',
      Referer: 'https://www.glassdoor.es/',
      'Referrer-Policy': 'origin',
    },
    body: '[{"operationName":"OverviewFaqQuery","variables":{"employerId":828048},"query":"query OverviewFaqQuery($employerId: Int!) {\\n  employerReviews(employer: {id: $employerId}, applyDefaultCriteria: true) {\\n    allReviewsCount\\n    employer {\\n      bestPlacesToWork(onlyCurrent: false) {\\n        id\\n        name\\n        timePeriod\\n        __typename\\n      }\\n      __typename\\n    }\\n    ratings {\\n      overallRating\\n      reviewCount\\n      recommendToFriendRating\\n      businessOutlookRating\\n      __typename\\n    }\\n    __typename\\n  }\\n  employerInterviews: employerInterviewsIG(\\n    employerInterviewsInput: {employer: {id: $employerId}}\\n  ) {\\n    difficultySubmissionCount\\n    difficultySum\\n    interviewExperienceCounts {\\n      type\\n      count\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"},{"operationName":"TopCompensationAndBenefitsQuery","variables":{"minInclusive":3.5,"maxInclusive":5,"locationId":2648738,"locationType":"C","industryId":200048,"sectorId":10010},"query":"query TopCompensationAndBenefitsQuery($minInclusive: Float, $maxInclusive: Float, $locationId: Int, $locationType: String, $industryId: Int!, $sectorId: Int!) {\\n  employerSearch(\\n    employerSearchRangeFilters: [{filterType: RATING_COMP_AND_BENEFITS, minInclusive: $minInclusive, maxInclusive: $maxInclusive}]\\n    industries: [{id: $industryId}]\\n    sectors: [{id: $sectorId}]\\n    location: {locationId: $locationId, locationType: $locationType}\\n    numPerPage: 5\\n  ) {\\n    employer {\\n      id\\n      shortName\\n      squareLogoUrl\\n      links {\\n        overviewUrl\\n        __typename\\n      }\\n      __typename\\n    }\\n    employerRatings {\\n      compensationAndBenefitsRating\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"},{"operationName":"RecordPageView","variables":{"employerId":"828048","pageIdent":"INFOSITE_OVERVIEW"},"query":"mutation RecordPageView($employerId: String!, $pageIdent: String!) {\\n  recordPageView(\\n    pageIdent: $pageIdent\\n    metaData: {key: \\"employerId\\", value: $employerId}\\n  ) {\\n    totalCount\\n    __typename\\n  }\\n}\\n"}]',
    method: 'POST',
  });

  console.log(await gdoorResponse.text());

  const gdoorJson = await gdoorResponse.json();

  res.setHeader('Content-Type', 'application/json');

  res.status(200).json(gdoorJson);
}
