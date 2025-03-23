'use client';

import { useState } from 'react';
import Person from './Person';
import { useRecoilState } from 'recoil';
import { selectedIndexState } from '@/utils/recoil/atoms';

export default function ChatPeopleList() {
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexState);

  return (
    <div className="flex h-screen min-w-60 flex-col bg-gray-50">
      <Person
        onClick={() => setSelectedIndex(0)}
        index={0}
        userId="test"
        name="test name"
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 0}
        onChatScreen={false}
      />
      <Person
        onClick={() => setSelectedIndex(1)}
        index={1}
        userId="test"
        name="test name"
        onlineAt={new Date().toISOString()}
        isActive={selectedIndex === 1}
        onChatScreen={false}
      />
    </div>
  );
}
