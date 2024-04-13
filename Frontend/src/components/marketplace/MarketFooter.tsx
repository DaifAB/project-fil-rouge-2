import { twMerge } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function MarketFooter({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        'w-full flex flex-col md:flex-row gap-3 justify-between py-3 px-5 border-solid border-t border-heavy-gray bg-white',
        className
      )}
    >
      {children}
    </div>
  );
}

export default MarketFooter;
