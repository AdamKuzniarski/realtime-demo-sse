import { Form } from "@/components/ui/form";
import Link from "next/link";
import DeleteSessionButton from "./DeleteSessionButton";
import { QuestionForm } from "@/components/forms/QuestionForm";
import QuestionList from "./QuestionList";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SessionDetailPage({ params }: Props) {
  const { id } = await params;

  const response = await fetch(`http://localhost:3000/session/${id}`);
  const session = await response.json();

  if (!session) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Session not found
          </h2>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Overview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Overview
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {session.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {session.description}
          </p>
          <DeleteSessionButton id={id} />
          <QuestionForm sessionId={id} />
          <QuestionList sessionId={id} />
        </article>
      </div>
    </div>
  );
}
