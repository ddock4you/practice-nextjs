'use client';

import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import { Button } from '@material-tailwind/react';

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();

  return (
    <Button
      color="red"
      onClick={() => {
        supabase.auth.signOut();
      }}
    >
      로그아웃
    </Button>
  );
}
