export type OfferingId = "plan" | "design" | "implement";

export interface Offering {
  id: OfferingId;
  label: string;
  index: string;
  headline: string;
  primaryText: string;
  secondaryText: string;
  bullets: string[];
}

export type QueryType = "General enquiry" | "New project" | "Partnership" | "Support";

export interface ContactFormData {
  name: string;
  email: string;
  queryType: QueryType;
  message: string;
}

export interface CachedSubmission extends ContactFormData {
  submittedAt: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  copy: string;
}
