'use client';
import { Button } from '@material-tailwind/react';
import Person from './Person';
import Message from './Message';
import { useRecoilValue } from 'recoil';
import { selectedIndexState } from '@/utils/recoil/atoms';

export default function ChatScreen() {
  const selectedIndex = useRecoilValue(selectedIndexState);

  return selectedIndex !== null ? (
    <div className="flex h-screen w-full flex-col">
      <Person
        index={selectedIndex}
        userId="test"
        name="test name"
        onlineAt={new Date().toISOString()}
        isActive={false}
        onChatScreen={true}
      />
      <div className="flex w-full flex-1 flex-col gap-3 p-4">
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
