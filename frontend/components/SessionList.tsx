import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getSessions } from "@/lib/data";

export default async function SessionList() {
  const sessions = await getSessions();
  return (
    <div className="space-y-3">
      {sessions?.map((session: any) => (
        <Link key={session.id} href={`/sessions/${session.id}`}>
          <Card className="my-5 hover:bg-gray-50  transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-lg">{session.title}</CardTitle>
              <CardDescription>{session.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
