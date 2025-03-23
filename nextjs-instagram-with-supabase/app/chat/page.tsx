import ChatPeopleList from '@/components/chat/ChatPeopleList';
import ChatScreen from '@/components/chat/ChatScreen';
import Person from '@/components/chat/Person';

export default function ChatPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ChatPeopleList />
      <ChatScreen />
    </div>
  );
}
