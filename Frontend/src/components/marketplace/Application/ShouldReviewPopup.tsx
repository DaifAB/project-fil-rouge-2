import Button from '@/components/Button';
import Popup from '@/components/Popup';
import { Dictionary } from '@/types/interfaces';

interface Props {
  open: boolean;
  onClose: any;
  dict: Dictionary;
}

function ShouldReviewPopup({ open, onClose, dict }: Props) {
  return (
    <Popup
      open={open}
      onClose={onClose}
      outsideClick={false}
      title={dict.marketplace?.brands?.application?.shouldReviewPopupTitle}
      description={dict.marketplace?.brands?.application?.shouldReviewPopupDesc}
    >
      <Button className="bg-heavy-gray" onClick={onClose}>
        {dict.common?.close}
      </Button>
    </Popup>
  );
}

export default ShouldReviewPopup;
