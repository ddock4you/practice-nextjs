import ChatPeopleList from '@/components/chat/ChatPeopleList';
import ChatScreen from '@/components/chat/ChatScreen';
import Person from '@/components/chat/Person';
import { createServerSupabaseClient } from '@/utils/supabase/server';

export default async function ChatPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // const {
  //   data: { user },
  //   error,
  // } = await supabase.auth.getUser();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ChatPeopleList loggedInUser={session?.user} />
      <ChatScreen />
    </div>
  );
}
