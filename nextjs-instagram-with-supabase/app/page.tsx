import LogoutButton from '@/components/LogoutButton';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-2">
      <h1 className="text-xl font-bold">welcome {'RedbenMilk'}!</h1>
      <LogoutButton />
    </main>
  );
}
