import AdminLayout from "../../../layouts/AdminLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "../../../components/ui/table";

export default function AdminAuditLogPage() {
  const logs: Array<{
    id: string;
    actor: string;
    action: string;
    target: string;
    createdAt: string;
  }> = [];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Audit Log</h1>
        <p className="text-sm text-slate-500">
          Track all platform activities and changes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity log</CardTitle>
          <CardDescription>
            Every important admin action will be recorded here in a real build.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="h-40 rounded-lg border border-dashed border-slate-200 flex flex-col items-center justify-center text-sm text-slate-400 gap-2">
              <span className="text-3xl">📄</span>
              <p>No audit logs found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Actor</Th>
                    <Th>Action</Th>
                    <Th>Target</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {logs.map((log) => (
                    <Tr key={log.id}>
                      <Td>
                        {new Date(log.createdAt).toLocaleString("en-GB")}
                      </Td>
                      <Td>{log.actor}</Td>
                      <Td>{log.action}</Td>
                      <Td>{log.target}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
