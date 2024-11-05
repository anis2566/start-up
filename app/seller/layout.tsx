import { DashboardLayout } from "./_components/dashboard-layout";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>{children}</DashboardLayout>
    );
}
