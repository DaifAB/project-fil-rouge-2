import { faCameraAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ImageUpload() {
	return (
		<div className='t4 w-12 h-12 absolute text-white bg-black opacity-50 flex flex-col items-center justify-center uppercase cursor-pointer'>
			<FontAwesomeIcon icon={faCameraAlt} className='w-5 h-5 scale-75' />
			<div>Edit</div>
		</div>
	);
}

export default ImageUpload;
