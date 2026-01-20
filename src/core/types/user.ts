export type UserRole = "blood_banks" | "donor" | "facilities" | "admin";

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

export type User = BloodBank | Donor | Hospital | Admin;
