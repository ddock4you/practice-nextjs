import SideBar from '../SideBar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SideBar />
      {children}
    </main>
  );
}
