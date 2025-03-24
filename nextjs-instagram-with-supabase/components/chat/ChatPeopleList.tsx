'use client';

import { useState } from 'react';
import Person from './Person';
import { useRecoilState } from 'recoil';
import {
  selectedUserIdState,
  selectedUserIndexState,
} from '@/utils/recoil/atoms';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/actions/chatActions';

export default function ChatPeopleList({ loggedInUser }) {
  const [selectedUserId, setSelectedUserId] =
    useRecoilState(selectedUserIdState);

  const [selectedUserIndex, setSelectedUserIndex] = useRecoilState(
    selectedUserIndexState
  );

  const getAllUsersQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const allUsers = await getAllUsers();
      console.log(allUsers);
      return allUsers.filter(user => user.id !== loggedInUser.id);
    },
  });

  return (
    <div className="flex h-screen min-w-60 flex-col bg-gray-50">
      {getAllUsersQuery.data?.map((user, index) => (
        <Person
          key={user.id}
          onClick={() => {
            setSelectedUserId(user.id);
            setSelectedUserIndex(index);
          }}
          index={index}
          isActive={selectedUserId === user.id}
          name={user.email?.split('@')[0]}
          onChatScreen={false}
          onlineAt={new Date().toISOString()}
          userId={user.id}
        />
      ))}
    </div>
  );
}
