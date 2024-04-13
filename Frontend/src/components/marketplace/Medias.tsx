'use client';

import MediaPreviewPopup from '@/components/MediaPreviewPopup';
import usePopup from '@/hooks/usePopup';
import { Dictionary, Media } from '@/types/interfaces';
import { useState } from 'react';

function Medias({ medias, dict }: { medias: Media[]; dict: Dictionary }) {
  const [openMediaPreviewPopup, handleToggleMediaPreviewPopup] =
    usePopup(false);

  const [selectedMedia, setSelectedMedia] = useState(medias[0]);

  const handleSelectMedia = (media: any) => {
    setSelectedMedia(media);
    handleToggleMediaPreviewPopup();
  };

  return (
    <>
      <MediaPreviewPopup
        medias={medias}
        selected={selectedMedia}
        setSelected={setSelectedMedia}
        open={openMediaPreviewPopup}
        onClose={handleToggleMediaPreviewPopup}
      />

      <div className="w-full md:w-1/3">
        <div className="h4 mb-1">{dict.common?.gallery}</div>
        {medias.length === 0 && (
          <div className="text-gray">{dict.common?.noMedia}</div>
        )}
        <div className="flex gap-2 flex-wrap w-full">
          {medias.map((media, index) =>
            media.type === 'image' ? (
              <div
                key={index}
                className="bg-cover bg-center cursor-pointer"
                onClick={() => handleSelectMedia(media)}
                style={{
                  backgroundImage: `url(${media.url})`,
                  height: 'calc(147px - 4px)',
                  width: 'calc(147px - 4px)',
                }}
              ></div>
            ) : (
              <div
                key={index}
                className="flex justify-center items-center cursor-pointer"
                onClick={() => handleSelectMedia(media)}
              >
                <video
                  style={{
                    height: 'calc(147px - 4px)',
                    width: 'calc(147px - 4px)',
                  }}
                >
                  <source src={media.url} type={media.mimeType} />
                </video>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Medias;
