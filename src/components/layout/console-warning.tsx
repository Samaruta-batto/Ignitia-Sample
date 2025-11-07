'use client';

import { useEffect } from 'react';

export function ConsoleWarning() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      console.log(
        '%c⚠️ WARNING! ⚠️',
        'color: red; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
      );
      console.log(
        "%cThis is a browser feature intended for Ignitia developers. If someone told you to copy-paste something here to enable a free feature or 'hack' someone's account, it is a scam and your Ignitia Account may be compromised.",
        'color: yellow; font-size: 16px;'
      );
    }
  }, []);

  return null;
}
