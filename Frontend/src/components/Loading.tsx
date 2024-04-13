import Loader from './Loader';

interface Props {
	children: React.ReactNode;
	loading: boolean;
	className?: string;
}

function Loading({ children, loading = false, className }: Props) {
	if (loading) {
		return <Loader className={className} />;
	}

	return children;
}

export default Loading;
