"use client";

import { AppWrapper } from "@/components/app/shared/AppWrapper";
import {
  EmptyState,
  LoadingList,
  StatusBadge,
  useLocalizedFormat,
} from "@/components/app/shared/ParticipantUI";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ComplaintMessageAuthorType,
  ComplaintStatus,
  type Complaint,
} from "@/gql/graphql";
import { useComplaint, useComplaints } from "@/hooks/useComplaints";
import { queryKeys } from "@/hooks/queryKeys";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import { ComplaintService } from "@/services/complaint.service";
import { showErrorMessage } from "@/utils/show.messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, ImageIcon, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { isComplaintThreadClosed } from "@/utils/participant.policy";

export const ComplaintsPage = () => {
  const dict = useDict();
  const [status, setStatus] = useState<ComplaintStatus | "">("");
  const complaints = useComplaints({ status: status || undefined });
  return (
    <AppWrapper>
      <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">
              {dict.complaints.title}
            </h1>
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ComplaintStatus | "")
              }
              className="h-11 rounded-[14px] border border-[#e5e7eb] bg-white px-4"
            >
              <option value="">{dict.complaints.title}</option>
              {Object.values(ComplaintStatus).map((value) => (
                <option key={value} value={value}>
                  {(dict.status as Record<string, string>)[value]}
                </option>
              ))}
            </select>
          </div>
          {complaints.isLoading ? (
            <LoadingList rows={5} />
          ) : !complaints.data?.items.length ? (
            <EmptyState title={dict.complaints.empty} />
          ) : (
            <div className="grid gap-4">
              {complaints.data.items.map((complaint) => (
                <ComplaintRow key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </div>
      </main>
    </AppWrapper>
  );
};

const ComplaintRow = ({ complaint }: { complaint: Complaint }) => {
  const format = useLocalizedFormat();
  return (
    <Link
      href={`/complaints/${complaint.id}`}
      className="grid gap-3 rounded-[20px] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm md:grid-cols-[1fr_auto] md:items-center"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="truncate font-semibold">{complaint.title}</h2>
          <StatusBadge status={complaint.status} />
        </div>
        <p className="text-gray mt-2 line-clamp-2 text-sm">
          {complaint.description}
        </p>
        <p className="text-gray mt-2 text-xs">{complaint.listing.name}</p>
      </div>
      <time className="text-gray text-xs">{format.date(complaint.createdAt)}</time>
    </Link>
  );
};

export const ComplaintDetailPage = ({ id }: { id: string }) => {
  const dict = useDict();
  const router = useAppRouter();
  const format = useLocalizedFormat();
  const queryClient = useQueryClient();
  const complaint = useComplaint(id);
  const [reply, setReply] = useState("");
  const mutation = useMutation({
    mutationFn: (content: string) =>
      ComplaintService.reply(id, content),
    onSuccess: () => {
      setReply("");
      queryClient.invalidateQueries({ queryKey: queryKeys.complaint(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.complaints });
    },
    onError: (error) => showErrorMessage(error.message),
  });
  if (complaint.isLoading)
    return (
      <AppWrapper>
        <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw]">
          <LoadingList rows={6} />
        </main>
      </AppWrapper>
    );
  if (!complaint.data)
    return (
      <AppWrapper>
        <EmptyState title={dict.complaints.empty} />
      </AppWrapper>
    );
  const item = complaint.data;
  const closed = isComplaintThreadClosed(item.status);
  const attachments = normalizeAttachments(item.attachments);
  return (
    <AppWrapper>
      <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
        <div className="mx-auto grid max-w-4xl gap-6">
          <header className="grid gap-4 rounded-[20px] bg-white p-5 md:p-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/complaints")}
              >
                <span className="rtl:hidden"><ArrowLeft /></span>
                <span className="ltr:hidden"><ArrowRight /></span>
              </Button>
              <div className="grow">
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <p className="text-gray text-sm">{item.listing.name}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
            <p className="leading-7 whitespace-pre-wrap">{item.description}</p>
            <time className="text-gray text-xs">{format.date(item.createdAt)}</time>
            {!!attachments.length && (
              <div className="flex flex-wrap gap-3">
                {attachments.map((attachment) => (
                  <a
                    key={attachment.filename}
                    href={`${process.env.NEXT_PUBLIC_DATA}/files/${attachment.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary flex items-center gap-2 rounded-[12px] border border-[#e5e7eb] px-3 py-2 text-sm"
                  >
                    <ImageIcon className="size-4" />
                    {attachment.originalFilename || attachment.filename}
                  </a>
                ))}
              </div>
            )}
          </header>

          <section className="grid min-h-96 grid-rows-[1fr_auto] overflow-hidden rounded-[20px] bg-white">
            <div className="grid content-start gap-4 p-5 md:p-6">
              {item.messages.map((message) => {
                const admin = message.authorType === ComplaintMessageAuthorType.Admin;
                return (
                  <div
                    key={message.id}
                    className={cn("flex", admin ? "justify-start" : "justify-end")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-[14px] bg-[#f2f2f2] px-4 py-3",
                        !admin && "bg-[#eff1f6]",
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {message.content}
                      </p>
                      <time className="text-gray mt-1 block text-[10px]">
                        {format.date(message.createdAt)}
                      </time>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-[#f2f2f2] p-4">
              {closed ? (
                <p className="text-gray rounded-[14px] bg-[#f6f7fa] p-4 text-center text-sm">
                  {dict.complaints.threadClosed}
                </p>
              ) : (
                <div className="flex items-end gap-3 rounded-[14px] bg-[#f6f7fa] p-2">
                  <Textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder={dict.complaints.replyPlaceholder}
                    className="min-h-11 resize-none border-0 shadow-none focus-visible:ring-0"
                    maxLength={2_000}
                  />
                  <Button
                    size="icon"
                    className="size-11 rounded-[12px]"
                    disabled={!reply.trim() || mutation.isPending}
                    onClick={() => mutation.mutate(reply.trim())}
                  >
                    <Send className="size-5 rtl:rotate-180" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </AppWrapper>
  );
};

const normalizeAttachments = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (attachment): attachment is { filename: string; originalFilename?: string } =>
      Boolean(
        attachment &&
          typeof attachment === "object" &&
          "filename" in attachment &&
          typeof attachment.filename === "string",
      ),
  );
};
