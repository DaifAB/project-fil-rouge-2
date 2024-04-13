'use client';
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { config } from '@/config';
import { Dictionary } from '@/types/interfaces';
import { mapStyle } from '@/config/constants';
import { Branch } from '@/types/interfaces';
import * as turf from '@turf/turf';

interface Props {
  selectedBranch: Branch;
  branches: Branch[];
  dict: Dictionary;
  lang: string;
}

function BrandsMap({ branches, selectedBranch, dict, lang }: Props) {
  const mapContainer = useRef(null);

  const lat = Number(selectedBranch?.address?.geoLocation?.lat);
  const long = Number(selectedBranch?.address?.geoLocation?.long);

  useEffect(() => {
    mapboxgl.accessToken = config.mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: mapStyle,
      center: [long, lat],
      zoom: 11.8,
    });

    map.on('load', () => {
      branches.forEach((branch) => {
        const circleId = `circle-${branch._id}`;
        map?.addLayer({
          id: circleId,
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              properties: {},
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [
                  Number(branch?.address?.geoLocation?.long),
                  Number(branch?.address?.geoLocation?.lat),
                ],
              },
            },
          },
          paint: {
            'circle-radius': 8,
            'circle-color': '#0ec89e',
          },
        });

        let popup = new mapboxgl.Popup({
          offset: 25,
          closeOnMove: true,
          closeButton: true,
          closeOnClick: true,
          className: 'branch-popup',
        });

        map.on('mouseenter', circleId, (e) => {
          var radius = 2;
          var center: any = [
            Number(branch?.address?.geoLocation?.long),
            Number(branch?.address?.geoLocation?.lat),
          ];
          var options: any = {
            steps: 50,
            units: 'kilometers',
          };
          var circle = turf.circle(center, radius, options);

          map.addLayer({
            id: 'delivery-area',
            type: 'fill',
            source: {
              type: 'geojson',
              data: circle,
            },
            paint: {
              'fill-color': 'rgba(0, 128, 255, 0.3)',
              'fill-outline-color': 'rgba(0, 128, 255, 1)',
            },
          });

          map.getCanvas().style.cursor = 'pointer';

          const coordinates = (
            e.features?.[0].geometry as any
          ).coordinates.slice();

          const popupContent = `
            <div class="flex w-full">
              <img class="mr-2" src="${
                branch.logo
              }" alt="" width="120" height="77" />
              <div class="w-full flex flex-col justify-between">
                <div> 
                  <div class="text-base font-bold">${branch.name}</div>
                  <div class="text-xs text-gray mb-3">${
                    branch.address?.address
                  }</div>
                </div>
                <div> 
                  ${
                    selectedBranch._id !== branch._id
                      ? `<a href="/${dict?.lang}/marketplace/branch/brands/search/${branch._id}" class="text-primary">
                    <div class="italic underline capitalize text-sm">
                      ${dict?.common?.seeAvailableBrands}
                    </div>
                  </a>`
                      : ''
                  }
                  ${
                    selectedBranch._id === branch._id
                      ? `<a href="/${dict?.lang}/marketplace/branch/kitchens/create/${branch._id}" class="text-primary" target="_blank">
                    <div class="italic underline capitalize text-sm">
                      ${dict?.common?.manageYourKitchen}
                    </div>
                  </a>`
                      : ''
                  }
                </div>
              </div>
            </div>
          `;

          popup.setLngLat(coordinates).setHTML(popupContent).addTo(map);
        });

        map.on('mouseleave', circleId, () => {
          map.removeLayer('delivery-area');
          map.removeSource('delivery-area');
          map.getCanvas().style.cursor = '';
        });
      });
    });

    return () => {
      map.remove();
    };
  }, [branches, selectedBranch, dict, lat, long]);

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: 'calc(100vh - 80px - 242px)' }}
    />
  );
}

export default BrandsMap;
