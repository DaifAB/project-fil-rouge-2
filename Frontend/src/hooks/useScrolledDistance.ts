import { useEffect, useRef, useState } from 'react';

const useScrolledDistance = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [scrollDistanceFromTop, setScrollDistanceFromTop] = useState(0);
	const [scrollDistanceFromBottom, setScrollDistanceFromBottom] = useState(0);

	const handleScroll = () => {
		if (ref.current) {
			const { scrollTop, scrollHeight, clientHeight } = ref.current;
			setScrollDistanceFromTop(scrollTop);
			setScrollDistanceFromBottom(scrollHeight - clientHeight - scrollTop);
		}
	};

	useEffect(() => {
		ref.current?.addEventListener('scroll', handleScroll);
		// Clean up event listener on component unmount
		return () => {
			ref.current?.removeEventListener('scroll', handleScroll);
		};
	}, [ref.current]);

	return { ref, scrollDistanceFromTop, scrollDistanceFromBottom };
};

export default useScrolledDistance;
