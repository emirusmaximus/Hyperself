export const metadata = { title: 'HyperSelf', description: 'Gerçek hayat, en zor oyun.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, Arial' }}>
        {children}
      </body>
    </html>
  );
}
