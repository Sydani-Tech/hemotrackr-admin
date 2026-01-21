export type UserRole = "blood_banks" | "donor" | "facilities" | "admin" | "regulatory_body";

export interface BaseUser {
  id: number;
  email: string;
  phone: string;
  role: UserRole;
  address?: string | null;
  latitude?: string | null;
  longitude?: string | null;
}

export interface BloodBank extends BaseUser {
  role: "blood_banks";
  name: string;
  type: string;
  license_number: string;
  status: string;
  logo_url?: string | null;
  cover_photo_url?: string | null;
  description?: string | null;
  services?: string | null;
  operating_hours?: string | null;
  facebook_link?: string | null;
  twitter_link?: string | null;
  instagram_link?: string | null;
  linkedin_link?: string | null;
}

export interface DonorProfile {
  id: number;
  blood_group: string;
  genotype?: string | null;
  height?: string | null;
  address?: string | null;
  total_donations: number;
  next_eligible_date: string;
  is_active?: boolean | null;
}

export interface Donor extends BaseUser {
  role: "donor";
  first_name: string;
  last_name: string;
  profile_picture?: string | null;
  profile_picture_url?: string | null;
  date_of_birth: string;
  gender: string;
  email_verified_at?: string | null;
  donor: DonorProfile;
}

export interface Hospital extends BaseUser {
  role: "facilities";
  name: string;
  type: string;
  license_number: string;
  status: string;
  logo_url?: string | null;
  cover_photo_url?: string | null;
  description?: string | null;
  services?: string | null;
  operating_hours?: string | null;
  facebook_link?: string | null;
  twitter_link?: string | null;
  instagram_link?: string | null;
  linkedin_link?: string | null;
}

// Assuming Admin structure based on common fields, to be adjusted if needed
export interface Admin extends BaseUser {
    role: "admin";
    name: string;
    // Add specific fields if known, otherwise base user fields apply
}

export interface RegulatoryBodyProfile {
  id: number;
  institution_name: string;
  license_number: string;
  level: string;
  state_id: number;
  email: string;
  phone_number: string;
  address: string;
  notification_preferences: {
      blood_stock_alerts: boolean;
      fraud_detection: boolean;
      emergency_requests: boolean;
      event_participation: boolean;
      donor_retention: boolean;
      donor_feedback: boolean;
      donation_drive: boolean;
      emergency_notification: boolean;
      new_donor_registrations: boolean;
  };
  is_active: boolean;
  state?: {
    id: number;
    name: string;
    code: string;
    region: string;
  };
}

export interface RegulatoryBody extends BaseUser {
  role: "regulatory_body";
  first_name: string; // The user object has first_name/last_name even if it's an organization name
  regulatory_body: RegulatoryBodyProfile;
}

export type User = BloodBank | Donor | Hospital | Admin | RegulatoryBody;
