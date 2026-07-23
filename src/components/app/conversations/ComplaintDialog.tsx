"use client";

import MessageComplaintIcon from "@/assets/icons/message.complaint.svg";
import { ComplaintDialogSkeleton } from "@/components/app/conversations/ComplaintDialogSkeleton";
import { ComplaintEvidenceUpload } from "@/components/app/conversations/ComplaintEvidenceUpload";
import { ComplaintExistingView } from "@/components/app/conversations/ComplaintExistingView";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useComplaints } from "@/hooks/useComplaints";
import { queryKeys } from "@/hooks/queryKeys";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import { ComplaintService } from "@/services/complaint.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { validateComplaintEvidence } from "@/utils/participant.policy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";

const fieldClassName =
  "h-14 rounded-[20px] border-[#f2f2f2] px-4 text-sm text-[#1a1a1a] shadow-none placeholder:text-[#666] focus-visible:border-[#f2f2f2] focus-visible:ring-0";

export const ComplaintDialog = ({
  conversationId,
  contractId,
}: {
  conversationId: string;
  contractId?: string;
}) => {
  const dict = useDict();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const existing = useComplaints(
    { conversationId, page: 1, limit: 1 },
    {
      enabled: open,
      refetchInterval: (query) =>
        open && (query.state.data?.items.length ?? 0) > 0 ? 15_000 : false,
    },
  );
  const current = existing.data?.items[0];

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFiles([]);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  const mutation = useMutation({
    mutationFn: () =>
      ComplaintService.create(
        {
          conversationId,
          title: title.trim(),
          description: description.trim(),
          contractId,
        },
        files,
      ),
    onSuccess: async (complaint) => {
      showSuccessMessage(dict.complaints.created);
      resetForm();
      queryClient.setQueryData(
        [...queryKeys.complaints, { conversationId, page: 1, limit: 1 }],
        (
          currentData: Awaited<
            ReturnType<typeof ComplaintService.findAll>
          > | undefined,
        ) => ({
          items: [complaint],
          meta: currentData?.meta ?? {
            total: 1,
            page: 1,
            limit: 1,
            totalPages: 1,
            hasNext: false,
            hasPrevious: false,
          },
        }),
      );
      await queryClient.invalidateQueries({ queryKey: queryKeys.complaints });
    },
    onError: (error) => showErrorMessage(error.message),
  });

  const updateFiles = (selected: File[]) => {
    if (validateComplaintEvidence(selected)) {
      showErrorMessage(dict.complaints.evidenceHint);
      return;
    }
    setFiles(selected);
  };

  const showExisting = open && !existing.isLoading && Boolean(current);
  const showCreate = open && !existing.isLoading && !current;
  const showLoading = open && existing.isLoading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9.5 rounded-xl"
          aria-label={dict.conversations.complain}
        >
          <MessageComplaintIcon className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="gap-7 rounded-[20px] border-0 bg-white px-6 py-10 shadow-xl sm:max-w-[42vw]"
      >
        {showLoading && <ComplaintDialogSkeleton />}
        {showExisting && current && <ComplaintExistingView complaint={current} />}
        {showCreate && (
          <>
            <div className="flex items-start gap-6">
              <span className="text-primary grid size-15 shrink-0 place-content-center rounded-2xl bg-[#eff1f6]">
                <MessageComplaintIcon className="size-6" />
              </span>
              <div className="grid grow grid-cols-1">
                <div className="min-w-0 flex-1">
                  <div className="grid gap-2 text-start">
                    <DialogTitle className="text-xl leading-[1.6] font-semibold text-black">
                      {dict.complaints.new}
                    </DialogTitle>
                    <DialogDescription className="text-gray text-base leading-[1.7]">
                      {dict.complaints.intro}
                    </DialogDescription>
                  </div>

                  <div className="mt-4 grid gap-5">
                    <Input
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder={dict.complaints.subject}
                      maxLength={200}
                      className={fieldClassName}
                    />
                    <Textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder={dict.complaints.description}
                      className={cn(
                        fieldClassName,
                        "min-h-30 resize-none py-4",
                      )}
                    />
                    <ComplaintEvidenceUpload
                      files={files}
                      evidenceLabel={dict.complaints.evidence}
                      evidenceFormats={dict.complaints.evidenceFormats}
                      evidenceMaxSize={dict.complaints.evidenceMaxSize}
                      removeLabel={dict.complaints.removeEvidence}
                      onChange={updateFiles}
                    />
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-2 gap-4">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      disabled={mutation.isPending}
                      className="bg-border h-12.5 rounded-[20px] text-base font-semibold text-[#4d4d4d] shadow-none hover:bg-[#e9e9e9]"
                    >
                      {dict.common.cancel}
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    disabled={
                      mutation.isPending || !title.trim() || !description.trim()
                    }
                    onClick={() => mutation.mutate()}
                    className="bg-primary h-12.5 rounded-[20px] text-base font-semibold text-white"
                  >
                    {dict.complaints.submit}
                  </Button>
                </div>
              </div>
            </div>

            <DialogClose className="text-gray border-border absolute inset-e-6 top-6 grid size-8 place-content-center rounded-2xl border bg-white transition hover:bg-[#f8f9fb]">
              <X className="size-4" />
              <span className="sr-only">{dict.common.cancel}</span>
            </DialogClose>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
