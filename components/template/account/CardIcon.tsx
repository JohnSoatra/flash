import React from 'react';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';
import { BsCreditCardFill } from 'react-icons/bs';

const Icon = 'w-10 h-10 opacity-75';

const CardIcon = ({ type }: { type: number }) => {
    switch(type) {
        default:
            return <BsCreditCardFill className={Icon} />

        case 0:
            return  <FaCcVisa className={Icon} />

        case 1:
            return <FaCcMastercard className={Icon} />
    }
}

export default CardIcon;