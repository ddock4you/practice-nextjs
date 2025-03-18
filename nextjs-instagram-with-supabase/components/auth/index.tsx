'use client';

import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Auth() {
  const [view, setView] = useState('SIGNIN');
  return (
    <main className="to-light-blue-50 flex h-screen w-screen items-center justify-center bg-gradient-to-br from-purple-50">
      {view === 'SIGNUP' ? (
        <SignIn setView={setView} />
      ) : (
        <SignUp setView={setView} />
      )}
    </main>
  );
}
