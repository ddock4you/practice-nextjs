'use client';

import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Auth() {
  const [view, setView] = useState('SIGNIN');
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-50 to-light-blue-50">
      {view === 'SIGNIN' ? (
        <SignIn setView={setView} />
      ) : (
        <SignUp setView={setView} />
      )}
    </main>
  );
}
