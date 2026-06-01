'use client';

import { useEffect, useState } from 'react';

const key = 'revenue-operator-email';

export function useLocalUser() {
  const [email, setEmailState] = useState('founder@example.com');

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored) setEmailState(stored);
  }, []);

  function setEmail(next: string) {
    setEmailState(next);
    window.localStorage.setItem(key, next);
  }

  return { email, setEmail };
}
