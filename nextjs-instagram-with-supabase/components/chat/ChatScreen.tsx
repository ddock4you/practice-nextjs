'use client';
import Person from './Person';
import Message from './Message';
import { useRecoilValue } from 'recoil';
import {
  presenceState,
  selectedUserIdState,
  selectedUserIndexState,
} from '@/utils/recoil/atoms';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserById } from '@/actions/chatActions';
import { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';

export async function sendMessage({ message, chatUserId }) {
  const supabase = createBrowserSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session.user) {
    throw new Error('User not authenticated');
  }

  const { data, error: sendMessageError } = await supabase
    .from('message')
    .insert({
      message,
      receiver: chatUserId,
      // sender: session!.user.id,
    });

  if (sendMessageError) {
    throw new Error(sendMessageError.message);
  }

  return data;
}

export async function getAllMessages({ chatUserId }) {
  const supabase = createBrowserSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) {
    throw new Error('User not authenticated');
  }

  const { data, error: getMessageError } = await supabase
    .from('message')
    .select('*')
    .or(`receiver.eq.${chatUserId}, receiver.eq.${session!.user.id}`)
    .or(`sender.eq.${chatUserId}, sender.eq.${session!.user.id}`)
    .order('created_at', { ascending: true });

  if (getMessageError) {
    console.log({ getMessageError });
    throw getMessageError.message;
  }

  return data;
}

export default function ChatScreen() {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const [message, setMessage] = useState('');
  const presence = useRecoilValue(presenceState);
  const supabase = createBrowserSupabaseClient();
  // console.log({ selectedUserId });
  const selectedUserQuery = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return sendMessage({ message, chatUserId: selectedUserId });
    },
    onSuccess: () => {
      setMessage('');
      getAllMessageQuery.refetch();
    },
  });

  const getAllMessageQuery = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: async () => getAllMessages({ chatUserId: selectedUserId }),
  });

  useEffect(() => {
    const channel = supabase
      .channel('message_postgres_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
        },
        payload => {
          console.log({ payload });
          if (payload.eventType === 'INSERT' && !payload.errors) {
            getAllMessageQuery.refetch();
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  console.log(selectedUserQuery.data);
  return selectedUserQuery.data !== undefined ? (
    <div className="flex h-screen w-full flex-col">
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split('@')[0]}
        onChatScreen={true}
        onlineAt={new Date().toISOString()}
        userId={presence?.selectedUserId?.[0].onlineAt}
      />
      <div className="flex w-full flex-1 flex-col gap-3 overscroll-y-auto p-4">
        {getAllMessageQuery.data?.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            isFromMe={message.sender === selectedUserId}
          />
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="w-full border-2 border-light-blue-600 p-3"
          placeholder="메세지를 입력하세요."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          onClick={() => sendMessageMutation.mutate()}
          className="min-w-20 bg-light-blue-600 p-1 text-white"
        >
          {sendMessageMutation.isPending ? <Spinner /> : <span>전송</span>}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
