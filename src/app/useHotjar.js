// hooks/useHotjar.js
"use client"

import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

function useHotjar(siteId, hotjarVersion) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
        Hotjar.init(siteId, hotjarVersion);
    }
  }, [siteId, hotjarVersion]);
}

export default useHotjar;
