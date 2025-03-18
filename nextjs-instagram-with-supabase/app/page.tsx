import LogoutButton from '@/components/LogoutButton';
import { createServerSupabaseClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className="flex w-full flex-col items-center justify-center gap-2">
      <h1 className="text-xl font-bold">
        welcome {session?.user?.email?.split('@')?.[0]}!
      </h1>
      <LogoutButton />
    </main>
  );
}
