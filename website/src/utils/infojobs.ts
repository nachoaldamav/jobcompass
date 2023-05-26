import { InfojobsProfile } from '../../types/Infojobs';
import type {
  GetOffersRequest,
  GetOffersResponse,
} from '../../types/infojobs/getOffers';

type InfojobsOptions = {
  clientId: string;
  clientSecret: string;
  basicAuth: string;
  accessToken: string;
};

export class Infojobs {
  constructor(readonly options: InfojobsOptions) {}

  private get headers() {
    return {
      Authorization: `Bearer ${this.options.accessToken}, Basic ${this.options.basicAuth}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private parametersAsQueryString(parameters: any): string {
    return Object.keys(parameters)
      .map((key) => `${key}=${parameters[key]}`)
      .join('&');
  }

  async getOffers(request: GetOffersRequest): Promise<GetOffersResponse> {
    const response = await fetch(
      'https://api.infojobs.net/api/9/offer' +
        '?' +
        this.parametersAsQueryString(request),
      {
        method: 'GET',
        headers: this.headers,
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as GetOffersResponse;
  }

  async getCurrentUser() {
    const response = await fetch('https://api.infojobs.net/api/6/candidate', {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      console.error(await response.json());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as InfojobsProfile;
  }

  async getOffer(id: string) {
    const response = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
      method: 'GET',
      headers: this.headers,
    });

    if (!response.ok) {
      console.error(await response.json());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }
}
