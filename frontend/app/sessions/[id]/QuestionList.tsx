import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getQuestionsBySession, Question } from "@/lib/data";

interface QuestionListProps {
  sessionId: string;
}

export default async function QuestionList({ sessionId }: QuestionListProps) {
  const questions = await getQuestionsBySession(sessionId);

  return (
    <div className="space-y-3 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Questions</h2>
      {questions?.length === 0 ? (
        <p className="text-gray-500">No questions yet.</p>
      ) : (
        questions?.map((question: Question) => (
          <Link key={question.id} href={`/sessions/${question.sessionId}`}>
            <Card className="my-5 hover:bg-gray-50  transition-colors cursor-pointer">
              <CardHeader>

                <CardTitle className="text-lg">{question.author}</CardTitle>
                <CardDescription>{question.content}</CardDescription>
                
              </CardHeader>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
