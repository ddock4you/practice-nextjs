'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

export default function SignUp({ setView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  const supabase = createBrowserSupabaseClient();

  const signInWithKaKao = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : 'http://localhost:3000/auth/callback',
      },
    });
    // console.log(data);
  };

  const signMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000/signup/confirm',
        },
      });
      if (data) {
        setConfirmationRequired(true);
      }
      if (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-w-lg flex-col items-center justify-center gap-2 border border-gray-400 bg-white px-10 pb-6 pt-10">
        <img src="/images/inflearngram.png" alt="logo" className="mb-6 w-60" />
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          label="Email"
          type="email"
          className="w-full rounded-sm"
        />
        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          label="password"
          type="password"
          className="w-full rounded-sm"
        />
        <Button
          onClick={() => {
            signMutation.mutate();
          }}
          loading={signMutation.isPending}
          color="light-blue"
          className="text-md w-full py-1"
          disabled={confirmationRequired}
        >
          {confirmationRequired ? '이메일을 확인해주세요.' : '가입하기'}
        </Button>
        <Button
          onClick={signInWithKaKao}
          color="light-blue"
          className="flex h-9 w-full justify-center bg-yellow-500 py-1 text-center text-base text-brown-600"
        >
          카카오 회원가입
        </Button>
      </div>
      <div className="w-full max-w-lg border border-gray-400 bg-white py-4 text-center">
        이미 계정이 있으신가요?{' '}
        <button
          className="font-bold text-light-blue-600"
          onClick={() => {
            setView('SIGNIN');
          }}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
