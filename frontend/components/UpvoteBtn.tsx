"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { upvoteQuestion } from "@/lib/actions";
import { useState } from "react";

interface UpvoteBtnProps {
  questionId: string;
  initialUpvotes: number;
}

const UpvoteBtn = ({ questionId, initialUpvotes }: UpvoteBtnProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpvote = async () => {
    setIsLoading(true);
    try {
      const updatedQuestion = await upvoteQuestion(questionId);
      setUpvotes(updatedQuestion.upvotes);
    } catch (error) {
      console.error("Failed to upvote:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="gap-2 w-24  "
      variant="destructive"
      onClick={handleUpvote}
      disabled={isLoading}
    >
      Upvote
      <Badge className=" rounded-full bg-white/20 text-white hover:bg-white/20">
        {upvotes}
      </Badge>
    </Button>
  );
};

export default UpvoteBtn;
