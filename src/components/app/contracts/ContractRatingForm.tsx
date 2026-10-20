"use client";

import { StarRatingInput } from "@/components/app/contracts/StarRatingInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDict } from "@/hooks/useDict";
import { RatingService } from "@/services/rating.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const COMMENT_MAX_LENGTH = 1000;

export const ContractRatingForm = ({
  contractId,
  onRated,
}: {
  contractId: string;
  onRated: () => void;
}) => {
  const dict = useDict();
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const rate = useMutation({
    mutationFn: () =>
      RatingService.rateContract({
        contractId,
        rating: stars,
        comment: comment.trim() || undefined,
      }),
    onSuccess: () => {
      showSuccessMessage(dict.contracts.ratingSubmitted);
      onRated();
    },
    onError: (error) => showErrorMessage(error.message),
  });

  return (
    <form
      className="grid justify-items-center gap-4 rounded-2xl border border-[#f2f2f2] bg-[#fbfbfb] p-4 text-center"
      onSubmit={(event) => {
        event.preventDefault();
        if (stars > 0 && !rate.isPending) rate.mutate();
      }}
    >
      <div className="grid gap-2">
        <p className="text-base font-medium text-[#1a1a1a]">
          {dict.contracts.ratingPrompt}
        </p>
        <p className="text-gray text-sm">{dict.contracts.ratingDescription}</p>
      </div>
      <StarRatingInput
        value={stars}
        onChange={setStars}
        disabled={rate.isPending}
      />
      <div className="grid w-full gap-1">
        <Textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          maxLength={COMMENT_MAX_LENGTH}
          placeholder={dict.contracts.ratingCommentPlaceholder}
          disabled={rate.isPending}
          className="min-h-28 rounded-[20px] bg-white text-start"
        />
        <p className="text-gray text-end text-xs">
          {comment.length}/{COMMENT_MAX_LENGTH}
        </p>
      </div>
      <Button
        type="submit"
        disabled={stars === 0 || rate.isPending}
        className="h-[50px] w-full max-w-[285px] rounded-[20px] px-6 text-base font-semibold"
      >
        {rate.isPending ? dict.contracts.submitting : dict.contracts.publishRating}
      </Button>
    </form>
  );
};
