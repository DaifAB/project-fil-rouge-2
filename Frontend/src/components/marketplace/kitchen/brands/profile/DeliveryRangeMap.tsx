import { config } from '@/config';
import { mapStyle } from '@/config/constants';
import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

const Map = ({ long, lat }: any) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = config.mapboxToken;

    var radius = 2;
    var center: any = [long, lat];
    var options: any = {
      steps: 50,
      units: 'kilometers',
    };
    var circle = turf.circle(center, radius, options);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [long, lat],
      zoom: 12,
    });

    map.on('load', () => {
      map?.addLayer({
        id: 'point-layer',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            properties: {},
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [Number(long), Number(lat)],
            },
          },
        },
        paint: {
          'circle-radius': 8,
          'circle-color': '#0ec89e',
        },
      });
      map.addLayer({
        id: 'delivery-layer',
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
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', minHeight: '350px' }} />
  );
};

export default Map;
