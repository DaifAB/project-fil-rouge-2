import Button from '@/components/Button';
import Footer from '@/components/Footer';
import ImageDescription from '@/components/ImageDescription';
import TransitionPageWrapper from '@/components/TransitionPageWrapper';
import AddressSearch from '@/components/home-page/AddressSearch';
import AnyQuestions from '@/components/home-page/AnyQuestions';
import HeroImage from '@/components/home-page/HeroImage';
import TestimonialsCarousel from '@/components/home-page/TestimonialsCarousel';
import { dictionaries } from '@/i18n';
import { PageProps } from '@/types/interfaces';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const dict = dictionaries[params.lang];
  return {
    title: dict.pagesTitles?.home,
    description: dict.pagesTitles?.homeDesc,
  };
}

export default function Home({ params: { lang } }: PageProps) {
  const dict = dictionaries[lang];

  return (
    <TransitionPageWrapper className="overflow-x-hidden">
      <HeroImage />
      <AddressSearch dict={dict} />
      <ImageDescription
        className="container mx-auto px-5 my-14"
        title={dict?.home?.howDoesThatWork}
        description={dict?.home?.howDoesThatWorkDesc}
        imageUrl="/assets/images/home-page/home-img-1.png"
        invert={false}
      ></ImageDescription>
      <ImageDescription
        className="container mx-auto px-5 mb-14"
        title={dict?.home?.seeAvailableBrands}
        description={dict?.home?.seeAvailableBrandsDesc}
        imageUrl="/assets/images/home-page/home-img-2.png"
        invert={true}
      >
        <Link href={`/${lang}/sign-up/branch`}>
          <Button>{dict?.home?.start}</Button>
        </Link>
      </ImageDescription>
      <TestimonialsCarousel dict={dict}></TestimonialsCarousel>
      <AnyQuestions dict={dict} />
      <Footer dict={dict} />
    </TransitionPageWrapper>
  );
}
