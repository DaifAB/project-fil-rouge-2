import Image from 'next/image';

function HeroImage() {
  return (
    <div className="w-full">
      <Image
        src="/assets/images/home-page/hero-image.webp"
        alt="hero image"
        width={0}
        height={0}
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        className="w-full h-[250px] md:h-[33vh]"
      />
    </div>
  );
}

export default HeroImage;
