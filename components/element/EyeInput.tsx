import React, { ForwardedRef, forwardRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const EyeInput = forwardRef((
  { ...rest }: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [showText, setShowText] = useState(false);

  return (
    <div className="relative">
        <input
          type={showText ? "text" : "password"}
          ref={ref}
          {
            ...rest
          }
        />
        <div
          className='absolute top-1/2 -translate-y-1/2 right-2'
          onClick={() => setShowText(!showText)}>
          {
            showText ?
              <EyeIcon className="w-4 h-4 opacity-75" /> :
              <EyeSlashIcon className="w-4 h-4 opacity-75"/>
          }
        </div>
    </div>
  );
});

<EyeInput />

export default EyeInput;