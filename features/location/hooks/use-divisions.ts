'use client';

import { useQuery } from '@tanstack/react-query';
import { BdDivision, BdDistrict } from '../types/location.types';
import { getDivisions } from '../api/get-divisions';
import { getDistricts } from '../api/get-districts';

// ── Query keys ─────────────────────────────────────────────────────────────

export const locationKeys = {
  divisions: () => ['bd-locations', 'divisions'] as const,
  districts: (division: string) => ['bd-locations', 'districts', division] as const,
};

// ── useDivisions ───────────────────────────────────────────────────────────

/**
 * Fetch all Bangladesh divisions.
 * Cached for 24h — divisions never change.
 */
export function useDivisions() {
  return useQuery<BdDivision[]>({
    queryKey: locationKeys.divisions(),
    queryFn: getDivisions,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
}

// ── useDistricts ───────────────────────────────────────────────────────────

/**
 * Fetch districts for a given division.
 * Only runs when divisionName is provided (enabled: !!divisionName).
 * Cached per-division for 24h — switching back to the same division = no API call.
 */
export function useDistricts(divisionName: string | null) {
  return useQuery<BdDistrict[]>({
    queryKey: locationKeys.districts(divisionName ?? ''),
    queryFn: () => getDistricts(divisionName!),
    enabled: !!divisionName,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });
}
