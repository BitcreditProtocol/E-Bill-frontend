export default function Default({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-xs w-full h-full flex flex-col items-center p-[24px]">
      {children}
    </div>
  );
}
