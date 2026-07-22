"use client";

import { useActiveDeliveryCompanies } from "@/hooks/useDeliveryCompanies";
import { useContract } from "@/hooks/useContracts";
import { useConversation } from "@/hooks/useConversations";
import { queryKeys } from "@/hooks/queryKeys";
import { useAppRouter } from "@/hooks/use.app.router";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { ContractService } from "@/services/contract.service";
import UserService from "@/services/user.service";
import { uploadFile } from "@/utils/file.upload";
import { showErrorMessage } from "@/utils/show.messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useContractForm = ({
  conversationId,
  rejectedContractId,
}: {
  conversationId?: string;
  rejectedContractId?: string;
}) => {
  const dict = useDict();
  const router = useAppRouter();
  const queryClient = useQueryClient();
  const { me, isLoading: meLoading } = useMe();
  const signatureProfile = useQuery({
    queryKey: ["me", "contract-signature"],
    queryFn: UserService.me,
    enabled: Boolean(me?.user),
    staleTime: 0,
    refetchOnMount: "always",
  });
  const customerSignature =
    signatureProfile.data?.contractSignature ||
    me?.user?.contractSignature ||
    null;
  const rejected = useContract(rejectedContractId);
  const resolvedConversationId =
    conversationId || rejected.data?.conversationId;
  const conversation = useConversation(resolvedConversationId);
  const companies = useActiveDeliveryCompanies();
  const initialized = useQuery({
    queryKey: queryKeys.contractDraft(resolvedConversationId || ""),
    queryFn: () =>
      ContractService.initialize({ conversationId: resolvedConversationId! }),
    enabled: Boolean(resolvedConversationId && !rejectedContractId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const [step, setStep] = useState<1 | 2>(1);
  const [agreedPrice, setAgreedPrice] = useState("");
  const [debouncedPrice, setDebouncedPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [deliveryCompanyId, setDeliveryCompanyId] = useState("");
  const [signature, setSignature] = useState<File | null>(null);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [showProviderMap, setShowProviderMap] = useState(false);
  const [acceptedBinding, setAcceptedBinding] = useState(false);
  const [acceptedCommitment, setAcceptedCommitment] = useState(false);
  const [acceptedRefund, setAcceptedRefund] = useState(false);

  useEffect(() => {
    if (!rejected.data) return;
    // Populate the resend form once the immutable rejected version arrives.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgreedPrice(String(rejected.data.agreedPrice));
    setAddress(rejected.data.customerAddress);
    setLatitude(rejected.data.customerLatitude || undefined);
    setLongitude(rejected.data.customerLongitude || undefined);
    setDeliveryCompanyId(rejected.data.deliveryCompanyId || "");
  }, [rejected.data]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedPrice(Number(agreedPrice) || 0),
      350,
    );
    return () => window.clearTimeout(timer);
  }, [agreedPrice]);

  useEffect(() => {
    if (initialized.error) {
      showErrorMessage(initialized.error.message);
    }
  }, [initialized.error]);

  const quote = useQuery({
    queryKey: queryKeys.contractQuote(
      resolvedConversationId || "",
      debouncedPrice,
    ),
    queryFn: () =>
      ContractService.quote({
        conversationId: resolvedConversationId!,
        agreedPrice: debouncedPrice,
      }),
    enabled: Boolean(resolvedConversationId && debouncedPrice > 0),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (
        !resolvedConversationId ||
        (!customerSignature && (!signature || !signatureSaved))
      ) {
        throw new Error(dict.contracts.signature);
      }
      if (!rejectedContractId && !initialized.data?.id) {
        throw new Error(dict.contracts.contractNumber);
      }
      const finalQuote = await ContractService.quote({
        conversationId: resolvedConversationId,
        agreedPrice: Number(agreedPrice),
      });
      const uploaded = customerSignature
        ? null
        : await uploadFile(signature as File);
      const common = {
        agreedPrice: finalQuote.agreedPrice,
        customerAddress: address.trim(),
        customerLatitude: latitude,
        customerLongitude: longitude,
        deliveryCompanyId: deliveryCompanyId || undefined,
        signatureData: uploaded?.filename,
      };
      return rejectedContractId
        ? ContractService.resend({
            rejectedContractId,
            ...common,
          })
        : ContractService.create({
            contractId: initialized.data?.id,
            conversationId: resolvedConversationId,
            ...common,
          });
    },
    onSuccess: async (contract) => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: queryKeys.contracts });
      queryClient.invalidateQueries({
        queryKey: queryKeys.conversation(contract.conversationId),
      });
      router.push(`/contracts/${contract.id}`);
    },
    onError: (error) => showErrorMessage(error.message),
  });

  const category = conversation.data?.listing.category;
  const documentText =
    quote.data?.contractDocumentText || category?.contractDocumentText || "";
  const commissionPercent =
    category?.commissionPercent ?? quote.data?.commissionPercent ?? 0;
  const minCommission = category?.minCommissionAmount ?? 0;
  const publicId = rejected.data?.publicId ?? initialized.data?.publicId;
  const contractNumber = publicId ? `#${publicId}` : "—";
  const client = conversation.data?.user;
  const provider = conversation.data?.provider;
  const termsReady =
    acceptedBinding &&
    acceptedCommitment &&
    acceptedRefund &&
    Boolean(rejectedContractId || initialized.data?.id);
  const step2Valid =
    Number(agreedPrice) > 0 &&
    address.trim().length > 0 &&
    Boolean(customerSignature || (signature && signatureSaved)) &&
    Boolean(rejectedContractId || initialized.data?.id);
  const pageTitle = rejectedContractId
    ? dict.contracts.resend
    : dict.contracts.new;
  const isLoading =
    conversation.isLoading ||
    (Boolean(rejectedContractId) && rejected.isLoading) ||
    (!rejectedContractId && initialized.isLoading) ||
    meLoading ||
    (Boolean(me?.user) && signatureProfile.isLoading);

  return {
    dict,
    rejectedContractId,
    resolvedConversationId,
    conversation,
    companies,
    initialized,
    quote,
    mutation,
    step,
    setStep,
    agreedPrice,
    setAgreedPrice,
    address,
    setAddress,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    deliveryCompanyId,
    setDeliveryCompanyId,
    signature,
    setSignature,
    signatureSaved,
    setSignatureSaved,
    customerSignature,
    showProviderMap,
    setShowProviderMap,
    acceptedBinding,
    setAcceptedBinding,
    acceptedCommitment,
    setAcceptedCommitment,
    acceptedRefund,
    setAcceptedRefund,
    documentText,
    commissionPercent,
    minCommission,
    contractNumber,
    client,
    provider,
    termsReady,
    step2Valid,
    pageTitle,
    isLoading,
  };
};

export type ContractFormState = ReturnType<typeof useContractForm>;
