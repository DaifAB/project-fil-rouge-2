import { storage } from '@/config/firebase-config';
import { AlertContext } from '@/contexts';
import { Dictionary } from '@/types/interfaces';
import {
  faAdd,
  faEdit,
  faFileEdit,
  faPen,
  faPenAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  onImageUpload: any;
  value: string | null;
  dict: Dictionary;
  className?: string;
  from?: string;
}

function AvatarPicker({
  onImageUpload,
  value,
  dict,
  className,
  from = 'avatar',
}: Props) {
  const handleShowAlert = useContext(AlertContext);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [loading, setloading] = useState(false);

  const pointerClass = loading ? 'cursor-wait' : 'cursor-pointer';

  const chooseImage = () => {
    if (loading) {
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setUploadedImageUrl(value);
  }, [value]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setloading(true);

    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const storageRef = ref(storage, `public/${selectedFile.name}`);
      uploadBytes(storageRef, selectedFile)
        .then((snapshot) => {
          getDownloadURL(storageRef)
            .then((downloadURL) => {
              setUploadedImageUrl(downloadURL);
              onImageUpload(downloadURL);
              setloading(false);
            })
            .catch((error) => {
              setloading(false);
              console.error(error);
              handleShowAlert({
                color: 'danger',
                message: dict.errors?.fileUploadFailure,
              });
            });
        })
        .catch((error) => {
          setloading(false);
          console.error(error);
          handleShowAlert({
            color: 'danger',
            message: dict.errors?.fileUploadFailure,
          });
        });
    }
  };

  return (
    <div
      className={twMerge('flex justify-center items-center mb-4', className)}
    >
      <div
        className={`relative h-36 w-36 rounded-full bg-cover bg-center ${pointerClass}`}
        style={{
          backgroundImage: loading
            ? 'none'
            : `url(${
                uploadedImageUrl ||
                (from === 'avatar'
                  ? '/assets/images/signup-page/avatar-placeholder.png'
                  : '/assets/images/rounded-placeholder.png')
              })`,
        }}
        onClick={chooseImage}
      >
        <div className="h-16 w-16 absolute -bottom-3 right-0 text-white rounded-full border-4 border-white flex justify-center items-center bg-[#c0c0c0]">
          <FontAwesomeIcon
            icon={uploadedImageUrl ? faEdit : faAdd}
            className="h-8 w-8"
          />
        </div>
        {loading && (
          <Image
            src={'/assets/images/loader1.gif'}
            width={144}
            height={144}
            alt="loading"
          />
        )}
      </div>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default AvatarPicker;
