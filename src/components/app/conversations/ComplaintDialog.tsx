"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useComplaints } from "@/hooks/useComplaints";
import { useContracts } from "@/hooks/useContracts";
import { queryKeys } from "@/hooks/queryKeys";
import { useDict } from "@/hooks/useDict";
import { ComplaintService } from "@/services/complaint.service";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { validateComplaintEvidence } from "@/utils/participant.policy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FileWarning } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MessageComplaintIcon from "@/assets/icons/message.complaint.svg";

export const ComplaintDialog = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const dict = useDict();
  const queryClient = useQueryClient();
  const existing = useComplaints({ conversationId, page: 1, limit: 1 });
  const contracts = useContracts({ conversationId, page: 1, limit: 20 });
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contractId, setContractId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const current = existing.data?.items[0];
  const mutation = useMutation({
    mutationFn: () =>
      ComplaintService.create(
        {
          conversationId,
          title: title.trim(),
          description: description.trim(),
          contractId: contractId || undefined,
        },
        files,
      ),
    onSuccess: (complaint) => {
      showSuccessMessage(dict.complaints.created);
      queryClient.invalidateQueries({ queryKey: queryKeys.complaints });
      setOpen(false);
      window.location.href = `/complaints/${complaint.id}`;
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-9.5 rounded-[12px]"
          aria-label={dict.conversations.complain}
        >
          <MessageComplaintIcon className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl rounded-[20px]">
        {current ? (
          <>
            <DialogHeader>
              <DialogTitle>{dict.complaints.duplicate}</DialogTitle>
              <DialogDescription>{current.title}</DialogDescription>
            </DialogHeader>
            <Button asChild className="justify-self-start rounded-xl">
              <Link href={`/complaints/${current.id}`}>
                {dict.complaints.title}
              </Link>
            </Button>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{dict.complaints.new}</DialogTitle>
              <DialogDescription>
                {dict.complaints.evidenceHint}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder={dict.complaints.subject}
                maxLength={200}
                className="h-12 rounded-xl"
              />
              <Textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder={dict.complaints.description}
                className="min-h-32 rounded-[14px]"
              />
              {!!contracts.data?.items.length && (
                <select
                  value={contractId}
                  onChange={(event) => setContractId(event.target.value)}
                  className="h-12 rounded-[14px] border border-[#e5e7eb] px-3"
                >
                  <option value="">{dict.contracts.details}</option>
                  {contracts.data.items.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      #{contract.publicId || contract.id.slice(0, 8)} · v
                      {contract.version}
                    </option>
                  ))}
                </select>
              )}
              <label className="grid cursor-pointer gap-2 rounded-[14px] border border-dashed border-[#d6d9e0] p-4 text-sm">
                <span>{dict.complaints.evidence}</span>
                <span className="text-gray text-xs">
                  {dict.complaints.evidenceHint}
                </span>
                <input
                  type="file"
                  className="text-sm"
                  accept="image/png,image/jpeg"
                  multiple
                  onChange={(event) =>
                    updateFiles(Array.from(event.target.files || []))
                  }
                />
              </label>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                className="rounded-[14px]"
                onClick={() => setOpen(false)}
              >
                {dict.common.cancel}
              </Button>
              <Button
                className="rounded-[14px]"
                disabled={
                  mutation.isPending || !title.trim() || !description.trim()
                }
                onClick={() => mutation.mutate()}
              >
                {dict.common.submit}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
