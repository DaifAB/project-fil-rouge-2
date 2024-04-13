import { config } from '@/config';
import { mapStyle } from '@/config/constants';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

const GeolocationSelector = ({
  initialLong = -9.235106594378124,
  initialLat = 32.29312835422695,
  onMapClick,
}: any) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = config.mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [initialLong, initialLat],
      zoom: 12,
    });

    const marker = new mapboxgl.Marker();
    marker.setLngLat([initialLong, initialLat]).addTo(map);

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.setLngLat([lng, lat]).addTo(map);
      onMapClick({ long: lng, lat });
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div className="w-full h-[350px]" ref={mapContainerRef} />;
};

export default GeolocationSelector;
