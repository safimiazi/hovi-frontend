'use client';

import { useState } from 'react';
import { BdDivision, BdDistrict } from '../types/location.types';
import { useDivisions, useDistricts } from '../hooks/use-divisions';

/**
 * Cascade selection hook: Division → District → Upazila
 *
 * Combines useDivisions + useDistricts with local selection state.
 * Districts auto-fetch when a division is selected (TanStack Query, cached 24h).
 *
 * @example
 * ```tsx
 * const {
 *   divisions, districts, upazilas,
 *   selectedDivision, selectedDistrict,
 *   selectDivision, selectDistrict,
 *   divLoading, distLoading,
 * } = useBdLocations();
 * ```
 */
export function useBdLocations() {
  const [selectedDivision, setSelectedDivision] = useState<BdDivision | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<BdDistrict | null>(null);

  const { data: divisions = [], isLoading: divLoading } = useDivisions();
  const { data: districts = [], isLoading: distLoading } = useDistricts(
    selectedDivision?.division ?? null,
  );

  const upazilas = selectedDistrict?.upazilla ?? [];

  const selectDivision = (divisionName: string | null) => {
    const div = divisions.find((d: BdDivision) => d.division === divisionName) ?? null;
    setSelectedDivision(div);
    setSelectedDistrict(null);
  };

  const selectDistrict = (districtName: string | null) => {
    const dist = districts.find((d: BdDistrict) => d.district === districtName) ?? null;
    setSelectedDistrict(dist);
  };

  return {
    divisions,
    districts,
    upazilas,
    selectedDivision,
    selectedDistrict,
    selectDivision,
    selectDistrict,
    divLoading,
    distLoading,
    loading: divLoading || distLoading,
  };
}
