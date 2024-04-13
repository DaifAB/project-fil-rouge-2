'use client';

import BrandsMap from '@/components/marketplace/kitchen/brands/BrandsMap';
import { Dictionary } from '@/types/interfaces';
import { GetAvailableBrandsResponse } from '@/types/responses';
import { Locale } from '@/types/types';
import { Branch } from '@/types/interfaces';
import { useState } from 'react';
import AvailableBrandsList from './AvailableBrandsList';

interface Props {
  dict: Dictionary;
  brands: GetAvailableBrandsResponse[];
  branches: Branch[];
  selectedBranch: Branch;
  lang: Locale;
}

function GeoSearchBrands({
  dict,
  brands,
  branches,
  selectedBranch,
  lang,
}: Props) {
  const [open, setOpen] = useState(true);
  const handleToggleOpen = () => {
    setOpen(!open);
  };

  const lat = Number(selectedBranch?.address?.geoLocation?.lat);
  const long = Number(selectedBranch?.address?.geoLocation?.long);

  if (!lat || !long) {
    return null;
  }

  return (
    <>
      <BrandsMap
        branches={branches}
        selectedBranch={selectedBranch}
        dict={dict}
        lang={lang}
      ></BrandsMap>

      <AvailableBrandsList
        onToggleOpen={handleToggleOpen}
        open={open}
        dict={dict}
        brands={brands}
        branch={selectedBranch}
        lang={lang}
      />
    </>
  );
}

export default GeoSearchBrands;
