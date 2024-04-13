'use client';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Popup from './Popup';

interface Props {
  medias: any[];
  setSelected: any;
  selected?: any;
  open: boolean;
  onClose: any;
}

function MediaPreviewPopup({
  open,
  onClose,
  medias,
  selected,
  setSelected,
}: Props) {
  const navigate = (direction: number) => {
    const index = medias.indexOf(selected);
    if (index === 0 && direction === -1) {
      return setSelected(medias[medias.length - 1]);
    }
    if (index === medias.length - 1 && direction === 1) {
      return setSelected(medias[0]);
    }
    setSelected(medias[index + direction]);
  };

  return (
    <Popup open={open} onClose={onClose}>
      <div className="flex justify-between items-center">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="w-5 h-5 cursor-pointer text-secondary"
          onClick={() => navigate(-1)}
        />
        {selected?.type === 'video' ? (
          <video width={500} height={500} controls>
            <source src={selected?.url} type={selected?.mimeType} />
          </video>
        ) : (
          <Image
            src={selected?.url}
            alt=""
            className="mx-auto"
            width={500}
            height={500}
          />
        )}
        <FontAwesomeIcon
          icon={faChevronRight}
          className="w-5 h-5 cursor-pointer text-secondary"
          onClick={() => navigate(+1)}
        />
      </div>
    </Popup>
  );
}

export default MediaPreviewPopup;
