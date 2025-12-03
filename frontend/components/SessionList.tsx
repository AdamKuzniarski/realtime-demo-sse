"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SessionList() {
  const {
    data: sessions,
    error,
    isLoading,
  } = useSWR("http://localhost:3000/session", fetcher);

  if (error) return <div className="text-red-500">Failed to load sessions</div>;
  if (isLoading) return <div className="text-gray-500">Loading...</div>;

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
