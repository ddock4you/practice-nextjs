'use client';
import Person from './Person';
import Message from './Message';
import { useRecoilValue } from 'recoil';
import {
  presenceState,
  selectedUserIdState,
  selectedUserIndexState,
} from '@/utils/recoil/atoms';
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/actions/chatActions';

export default function ChatScreen() {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);
  const presence = useRecoilValue(presenceState);
  // console.log({ selectedUserId });
  const selectedUserQuery = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });
  // console.log(selectedUserQuery.data);
  return selectedUserQuery.data !== null ? (
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
        <Message isFromMe={true} message="안녕하세요." />
        <Message isFromMe={false} message="안녕하세요." />
      </div>
      <div className="flex">
        <input
          type="text"
          className="w-full border-2 border-light-blue-600 p-3"
          placeholder="메세지를 입력하세요."
        />
        <button className="min-w-20 bg-light-blue-600 p-1 text-white">
          <span>전송</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
