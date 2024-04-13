'use client';

import Input from '@/components/form/Input';
import { Dictionary } from '@/types/interfaces';

interface Props {
  dict: Dictionary;
  register: any;
}

function MessageProposal({ dict, register }: Props) {
  return (
    <div>
      <div className="h3 font-normal mb-2">
        {dict.marketplace?.brands?.application?.messageToKitchen}
      </div>
      <p className="t1 text-black mb-6">
        {dict.marketplace?.brands?.application?.messageToKitchenDesc}
      </p>
      <Input
        {...register('kitchenMessage')}
        label={dict?.contactUs?.typeMessage}
        rows={5}
      ></Input>
    </div>
  );
}

export default MessageProposal;
