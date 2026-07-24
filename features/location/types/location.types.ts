/**
 * Bangladesh location types for bdapis.com API
 */

export interface BdDivision {
  /** English name, e.g. "Dhaka" */
  division: string;
  /** Bangla name, e.g. "ঢাকা" */
  divisionbn: string;
  coordinates?: string;
}

export interface BdDistrict {
  /** English name, e.g. "Gazipur" */
  district: string;
  /** Bangla name, e.g. "গাজীপুর" */
  districtbn: string;
  /** Upazila list */
  upazilla: string[];
  coordinates?: string;
}

export interface BdApiResponse<T> {
  status: { code: number; message: string; date: string };
  data: T;
}
