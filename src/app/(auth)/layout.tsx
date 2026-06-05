export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col bg-clinical-surface">
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <footer className="px-4 pb-6 text-center text-xs text-muted-foreground">
        Plataforma segura para gestão de Terapia ABA
      </footer>
    </div>
  );
}
