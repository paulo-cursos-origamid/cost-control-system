export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header style={{ padding: 16, borderBottom: "1px solid #ccc" }}>
        CCP - Centro de Custo Pessoal
      </header>

      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
}