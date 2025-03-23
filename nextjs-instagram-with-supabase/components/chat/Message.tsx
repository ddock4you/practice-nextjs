'use client';

export default function Message({ isFromMe, message }) {
  return (
    <div
      className={`w-fit rounded-md p-2 ${isFromMe ? 'ml-auto bg-light-blue-600 text-white' : 'bg-gray-100 text-black'}`}
    >
      <p>{message}</p>
    </div>
  );
}
