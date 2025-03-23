import { getRandomImage } from '@/utils/random';
import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo('ko-KR');

export default function Person({
  index,
  userId,
  name,
  onlineAt,
  isActive = false,
  onChatScreen = false,
  onClick = null,
}) {
  return (
    <div
      className={`flex min-w-40 items-center gap-4 p-4 ${onClick && 'cursor-pointer'} ${!onChatScreen && isActive && 'bg-light-blue-50'} ${!onChatScreen && !isActive && 'bg-gray-50'} ${onChatScreen && 'bg-gray-50'} `}
      onClick={onClick}
    >
      <img
        src={getRandomImage(index)}
        alt={name}
        className="h-10 w-10 rounded-full"
      />
      <div>
        <p className="text-xl font-bold text-black">{name}</p>
        <p className="text-gray-500">{timeAgo.format(Date.parse(onlineAt))}</p>
      </div>
    </div>
  );
}
