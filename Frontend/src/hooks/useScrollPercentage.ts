import { useEffect, useState, useRef, RefObject } from 'react';

const useScrollPercentage = (externalRef?: RefObject<HTMLDivElement>) => {
	const [scrollPercentage, setScrollPercentage] = useState(0);
	const internalRef = useRef<HTMLDivElement>(null);
	const ref = externalRef || internalRef;

	const calculateScrollPercentage = () => {
		if (ref.current) {
			const targetElement = ref.current;
			const scrollPosition = targetElement.scrollTop;
			const totalHeight =
				targetElement.scrollHeight - targetElement.clientHeight;

			if (totalHeight === 0) {
				// Avoid division by zero
				setScrollPercentage(0);
			} else {
				const percentage = (scrollPosition / totalHeight) * 100;
				setScrollPercentage(percentage);
			}
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			calculateScrollPercentage();
		};

		if (ref.current) {
			const targetElement = ref.current;
			targetElement.addEventListener('scroll', handleScroll);
			calculateScrollPercentage();

			return () => {
				targetElement.removeEventListener('scroll', handleScroll);
			};
		}
	}, [ref.current]);

	return { ref, scrollPercentage };
};

export default useScrollPercentage;
