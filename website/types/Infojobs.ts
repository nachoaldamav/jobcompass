export interface InfojobsProfile {
  id: number;
  email: string;
  emailHash: string;
  key: string;
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
}

export interface Province {
  id: number;
  value: string;
}
