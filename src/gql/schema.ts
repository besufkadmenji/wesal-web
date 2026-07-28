export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: unknown; output: unknown; }
};

export type AcceptContractInput = {
  contractId: Scalars['String']['input'];
  deliveryTimeDays: Scalars['Int']['input'];
  signatureData: Scalars['String']['input'];
};

/** Type of user action (view or click) */
export enum ActionType {
  Click = 'CLICK',
  View = 'VIEW'
}

export type Admin = {
  adminPermissions?: Maybe<Array<AdminPermission>>;
  avatarFilename?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deactivationReason?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organizationName: Scalars['String']['output'];
  permissionType: AdminPermissionType;
  phoneNumber: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  roleName: Scalars['String']['output'];
  status: AdminStatus;
  updatedAt: Scalars['DateTime']['output'];
  userType: AdminUserType;
};

export type AdminAuthResponse = {
  accessToken: Scalars['String']['output'];
  admin: Admin;
};

export type AdminChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type AdminForgotPasswordInput = {
  email: Scalars['String']['input'];
};

export type AdminLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AdminPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  permissionType?: InputMaybe<AdminPermissionType>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<AdminSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<AdminStatus>;
};

export type AdminPermission = {
  admin?: Maybe<Admin>;
  adminId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  permission: Permission;
  permissionId: Scalars['ID']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/** Admin permission types */
export enum AdminPermissionType {
  Administrator = 'ADMINISTRATOR',
  Custom = 'CUSTOM',
  Moderator = 'MODERATOR',
  SuperAdmin = 'SUPER_ADMIN',
  Viewer = 'VIEWER'
}

export type AdminResetPasswordInput = {
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};

export type AdminResolveContractInput = {
  contractId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  resolution: ContractResolution;
};

/** Available fields to sort admins by */
export enum AdminSortField {
  CreatedAt = 'createdAt',
  Email = 'email',
  FullName = 'fullName',
  Id = 'id',
  PermissionType = 'permissionType',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

/** Admin account status */
export enum AdminStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  PendingApproval = 'PENDING_APPROVAL',
  Suspended = 'SUSPENDED'
}

export type AdminTerminateContractInput = {
  providerId: Scalars['String']['input'];
  terminationReason: Scalars['String']['input'];
};

/** Admin user types */
export enum AdminUserType {
  Organization = 'ORGANIZATION',
  Platform = 'PLATFORM'
}

export type AssignPermissionInput = {
  adminId: Scalars['ID']['input'];
  permissionId: Scalars['ID']['input'];
};

export type AuthResponse = {
  accessToken: Scalars['String']['output'];
  user: User;
};

export type Bank = {
  createdAt: Scalars['DateTime']['output'];
  deactivationReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nameAr: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  status: BankStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type BankPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<BankStatus>;
};

/** Status of the bank */
export enum BankStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type BulkAssignPermissionsInput = {
  adminId: Scalars['ID']['input'];
  permissionIds: Array<Scalars['ID']['input']>;
};

export type BulkUpdateFaqOrderInput = {
  items: Array<UpdateFaqOrderInput>;
};

export type CancelContractInput = {
  contractId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type Category = {
  commissionEnabled: Scalars['Boolean']['output'];
  commissionPercent?: Maybe<Scalars['Float']['output']>;
  contractDocumentEnabled: Scalars['Boolean']['output'];
  contractDocumentText: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerConversationFee?: Maybe<Scalars['Float']['output']>;
  customerConversationFeeEnabled: Scalars['Boolean']['output'];
  depositEnabled: Scalars['Boolean']['output'];
  depositPercent?: Maybe<Scalars['Float']['output']>;
  descriptionAr: Scalars['String']['output'];
  descriptionEn: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  maxCompletionDays?: Maybe<Scalars['Int']['output']>;
  maxCompletionDaysEnabled: Scalars['Boolean']['output'];
  maxTerminationDays?: Maybe<Scalars['Int']['output']>;
  maxTerminationDaysEnabled: Scalars['Boolean']['output'];
  minCommissionAmount?: Maybe<Scalars['Float']['output']>;
  minCommissionEnabled: Scalars['Boolean']['output'];
  nameAr: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  providerConversationFee?: Maybe<Scalars['Float']['output']>;
  providerConversationFeeEnabled: Scalars['Boolean']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  refundPolicyAr: Scalars['String']['output'];
  refundPolicyEn: Scalars['String']['output'];
  refundPolicyEnabled: Scalars['Boolean']['output'];
  rulesAr: Scalars['String']['output'];
  rulesEn: Scalars['String']['output'];
  status: CategoryStatus;
  undertakingEnabled: Scalars['Boolean']['output'];
  undertakingTextAr: Scalars['String']['output'];
  undertakingTextEn: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<CategoryStatus>;
};

/** Category publication status */
export enum CategoryStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type ChangeEmailInput = {
  newEmail: Scalars['String']['input'];
};

export type ChangeEmailResponse = {
  changeToken: Scalars['String']['output'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
};

export type ChangePhoneInput = {
  countryCode: Scalars['String']['input'];
  newPhone: Scalars['String']['input'];
};

export type ChangePhoneResponse = {
  changeToken: Scalars['String']['output'];
};

export type City = {
  country?: Maybe<Country>;
  countryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  geoBoundary?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  nameAr: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  status: CityStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type CityPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<CitySortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<CityStatus>;
};

/** Available fields to sort cities by */
export enum CitySortField {
  CountryId = 'countryId',
  CreatedAt = 'createdAt',
  Id = 'id',
  NameAr = 'nameAr',
  NameEn = 'nameEn',
  UpdatedAt = 'updatedAt'
}

/** City activation status */
export enum CityStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Complaint = {
  attachments: Scalars['JSON']['output'];
  contract?: Maybe<Contract>;
  contractId?: Maybe<Scalars['ID']['output']>;
  conversation: Conversation;
  conversationId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  listing: Listing;
  listingId: Scalars['ID']['output'];
  messages: Array<ComplaintMessage>;
  publicId?: Maybe<Scalars['Int']['output']>;
  reporterId: Scalars['ID']['output'];
  reporterType: ComplaintReporterType;
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewedByAdminId?: Maybe<Scalars['ID']['output']>;
  reviewer?: Maybe<Admin>;
  status: ComplaintStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ComplaintMessage = {
  authorId: Scalars['ID']['output'];
  authorType: ComplaintMessageAuthorType;
  complaintId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
};

export enum ComplaintMessageAuthorType {
  Admin = 'ADMIN',
  Reporter = 'REPORTER'
}

export type ComplaintPaginationInput = {
  conversationId?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  reporterType?: InputMaybe<ComplaintReporterType>;
  reviewerId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ComplaintSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ComplaintStatus>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum ComplaintReporterType {
  Provider = 'PROVIDER',
  User = 'USER'
}

export enum ComplaintSortField {
  CreatedAt = 'createdAt',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

/** Complaint status */
export enum ComplaintStatus {
  Closed = 'CLOSED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Resolved = 'RESOLVED',
  UnderReview = 'UNDER_REVIEW'
}

export type CompleteContractInput = {
  contractId: Scalars['String']['input'];
};

export type ContactMessage = {
  attachmentFilename?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dialCode?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messageContent: Scalars['String']['output'];
  messageType: MessageType;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  reply: Scalars['String']['output'];
  senderId?: Maybe<Scalars['String']['output']>;
  senderType: SenderType;
  status: ContactMessageStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type ContactMessagePaginationInput = {
  /** Filter messages from this date */
  dateFrom?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter messages until this date */
  dateTo?: InputMaybe<Scalars['DateTime']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  messageType?: InputMaybe<MessageType>;
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Search across name, email, phone, and message content */
  search?: InputMaybe<Scalars['String']['input']>;
  senderType?: InputMaybe<SenderType>;
  sortBy?: InputMaybe<ContactMessageSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ContactMessageStatus>;
};

/** Fields to sort contact messages by */
export enum ContactMessageSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Status = 'status'
}

/** Status of a contact message */
export enum ContactMessageStatus {
  Read = 'READ',
  Replied = 'REPLIED',
  Sent = 'SENT'
}

export type Contract = {
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  agreedPrice: Scalars['Float']['output'];
  audits: Array<ContractAudit>;
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancellationRequestedAt?: Maybe<Scalars['DateTime']['output']>;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  categoryId: Scalars['String']['output'];
  categoryRulesAr: Scalars['String']['output'];
  categoryRulesEn: Scalars['String']['output'];
  client: User;
  clientId: Scalars['String']['output'];
  commissionAmount: Scalars['Float']['output'];
  commissionPercent: Scalars['Float']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  confirmationDeadlineAt?: Maybe<Scalars['DateTime']['output']>;
  contractDocumentText: Scalars['String']['output'];
  conversation: Conversation;
  conversationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customerAddress: Scalars['String']['output'];
  customerLatitude?: Maybe<Scalars['Float']['output']>;
  customerLongitude?: Maybe<Scalars['Float']['output']>;
  deliveryCompanyId?: Maybe<Scalars['ID']['output']>;
  deliveryCompanyNameAr?: Maybe<Scalars['String']['output']>;
  deliveryCompanyNameEn?: Maybe<Scalars['String']['output']>;
  deliveryEstimateDays?: Maybe<Scalars['Int']['output']>;
  deliveryStartedAt?: Maybe<Scalars['DateTime']['output']>;
  deliveryTimeDays?: Maybe<Scalars['Int']['output']>;
  depositPercent: Scalars['Float']['output'];
  disputeReason?: Maybe<Scalars['String']['output']>;
  disputedAt?: Maybe<Scalars['DateTime']['output']>;
  document?: Maybe<ContractDocument>;
  downPayment: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  listingId: Scalars['String']['output'];
  maxCompletionDays?: Maybe<Scalars['Int']['output']>;
  maxTerminationDays?: Maybe<Scalars['Int']['output']>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  pricingVersion: Scalars['Int']['output'];
  provider: Provider;
  providerAddress?: Maybe<Scalars['String']['output']>;
  providerCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  providerId: Scalars['String']['output'];
  providerLatitude?: Maybe<Scalars['Float']['output']>;
  providerLongitude?: Maybe<Scalars['Float']['output']>;
  providerNetAmount: Scalars['Float']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  refundPolicyAr: Scalars['String']['output'];
  refundPolicyEn: Scalars['String']['output'];
  rejectedAt?: Maybe<Scalars['DateTime']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  settlements: Array<ContractSettlement>;
  signatures: Array<ContractSignature>;
  status: ContractStatus;
  supersedesContract?: Maybe<Contract>;
  supersedesContractId?: Maybe<Scalars['ID']['output']>;
  totalPayable: Scalars['Float']['output'];
  undertakingTextAr: Scalars['String']['output'];
  undertakingTextEn: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vatAmount: Scalars['Float']['output'];
  vatRate: Scalars['Float']['output'];
  version: Scalars['Int']['output'];
};

export enum ContractActorType {
  Admin = 'ADMIN',
  Provider = 'PROVIDER',
  System = 'SYSTEM',
  User = 'USER'
}

export type ContractAudit = {
  action: ContractAuditAction;
  actorId: Scalars['ID']['output'];
  actorType: ContractActorType;
  contractId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  newStatus: ContractStatus;
  previousStatus: ContractStatus;
  reason?: Maybe<Scalars['String']['output']>;
};

export enum ContractAuditAction {
  CancellationRequested = 'CANCELLATION_REQUESTED',
  ContractAccepted = 'CONTRACT_ACCEPTED',
  ContractCreated = 'CONTRACT_CREATED',
  ContractRejected = 'CONTRACT_REJECTED',
  ContractResent = 'CONTRACT_RESENT',
  CustomerCompleted = 'CUSTOMER_COMPLETED',
  DeliveryRefused = 'DELIVERY_REFUSED',
  DeliveryStarted = 'DELIVERY_STARTED',
  DisputeRefunded = 'DISPUTE_REFUNDED',
  DisputeReleased = 'DISPUTE_RELEASED',
  PaymentCompleted = 'PAYMENT_COMPLETED',
  ProviderCompleted = 'PROVIDER_COMPLETED',
  TimeoutCancelled = 'TIMEOUT_CANCELLED',
  TimeoutCompleted = 'TIMEOUT_COMPLETED'
}

export type ContractDocument = {
  contractId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  path: Scalars['String']['output'];
  sha256: Scalars['String']['output'];
  version: Scalars['Float']['output'];
};

export type ContractFinancialReport = {
  completedCount: Scalars['Int']['output'];
  items: Array<ContractFinancialReportRow>;
  meta: ReportPageMeta;
  totalCommission: Scalars['Float']['output'];
  totalCustomerRefunds: Scalars['Float']['output'];
  totalPaid: Scalars['Float']['output'];
  totalProviderNet: Scalars['Float']['output'];
  totalProviderReleases: Scalars['Float']['output'];
  totalVat: Scalars['Float']['output'];
};

export type ContractFinancialReportRow = {
  commission: Scalars['Float']['output'];
  contractId: Scalars['String']['output'];
  contractNumber?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customerName?: Maybe<Scalars['String']['output']>;
  customerRefund: Scalars['Float']['output'];
  deliveryCompanyName?: Maybe<Scalars['String']['output']>;
  providerName?: Maybe<Scalars['String']['output']>;
  providerNet: Scalars['Float']['output'];
  providerRelease: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  totalPaid: Scalars['Float']['output'];
  vat: Scalars['Float']['output'];
};

export type ContractPaginationInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<ContractSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ContractStatus>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ContractPaymentResponse = {
  contract: Contract;
  payment: Payment;
};

export type ContractQuote = {
  agreedPrice: Scalars['Float']['output'];
  commissionAmount: Scalars['Float']['output'];
  commissionPercent: Scalars['Float']['output'];
  contractDocumentText: Scalars['String']['output'];
  depositPercent: Scalars['Float']['output'];
  downPayment: Scalars['Float']['output'];
  maxCompletionDays?: Maybe<Scalars['Int']['output']>;
  maxTerminationDays?: Maybe<Scalars['Int']['output']>;
  providerNetAmount: Scalars['Float']['output'];
  totalPayable: Scalars['Float']['output'];
  vatAmount: Scalars['Float']['output'];
  vatRate: Scalars['Float']['output'];
};

export type ContractQuoteInput = {
  agreedPrice: Scalars['Float']['input'];
  conversationId: Scalars['String']['input'];
};

export enum ContractResolution {
  Cancel = 'CANCEL',
  Complete = 'COMPLETE',
  RefundCustomer = 'REFUND_CUSTOMER',
  ReleaseProvider = 'RELEASE_PROVIDER'
}

export type ContractRule = {
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ContractRuleInput = {
  label: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ContractSettlement = {
  amount: Scalars['Float']['output'];
  contractId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdById?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  idempotencyKey: Scalars['String']['output'];
  paymentId: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  type: ContractSettlementType;
};

/** Append-only mock allocation of a settled contract payment */
export enum ContractSettlementType {
  CustomerRefund = 'CUSTOMER_REFUND',
  Hold = 'HOLD',
  PlatformCommission = 'PLATFORM_COMMISSION',
  ProviderRelease = 'PROVIDER_RELEASE',
  Vat = 'VAT'
}

export type ContractSignature = {
  contract: Contract;
  contractId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  signatureData: Scalars['String']['output'];
  signatureType: ContractSignatureType;
  signedAt: Scalars['DateTime']['output'];
  signerId: Scalars['String']['output'];
  signerType: ContractSignerType;
};

/** Contract acceptance or completion signature purpose */
export enum ContractSignatureType {
  CustomerAcceptance = 'CUSTOMER_ACCEPTANCE',
  CustomerCompletion = 'CUSTOMER_COMPLETION',
  ProviderAcceptance = 'PROVIDER_ACCEPTANCE',
  ProviderCompletion = 'PROVIDER_COMPLETION'
}

/** Entity type of the contract signer */
export enum ContractSignerType {
  Provider = 'PROVIDER',
  User = 'USER'
}

/** Available fields to sort contracts by */
export enum ContractSortField {
  AgreedPrice = 'agreedPrice',
  CreatedAt = 'createdAt',
  DownPayment = 'downPayment',
  Id = 'id',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

/** Contract status */
export enum ContractStatus {
  Accepted = 'ACCEPTED',
  AwaitingCustomerConfirmation = 'AWAITING_CUSTOMER_CONFIRMATION',
  CancellationRequested = 'CANCELLATION_REQUESTED',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  DeliveryInProgress = 'DELIVERY_IN_PROGRESS',
  Disputed = 'DISPUTED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Conversation = {
  access?: Maybe<ConversationAccess>;
  closeReason?: Maybe<Scalars['String']['output']>;
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customerFeePaidAt?: Maybe<Scalars['DateTime']['output']>;
  customerLastReadAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  feeCycle: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lastActivityAt: Scalars['DateTime']['output'];
  lastMessage?: Maybe<Message>;
  listing: Listing;
  listingId: Scalars['String']['output'];
  messages?: Maybe<Array<Message>>;
  provider: Provider;
  providerFeePaidAt?: Maybe<Scalars['DateTime']['output']>;
  providerId: Scalars['String']['output'];
  providerLastReadAt?: Maybe<Scalars['DateTime']['output']>;
  publicId?: Maybe<Scalars['Int']['output']>;
  status: ConversationStatus;
  unreadCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ConversationAccess = {
  canSend: Scalars['Boolean']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  feeAmount: Scalars['Float']['output'];
  feeCycle: Scalars['Float']['output'];
  feeRequired: Scalars['Boolean']['output'];
  paidAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ConversationFeePaymentResponse = {
  access: ConversationAccess;
  conversation: Conversation;
  payment?: Maybe<Payment>;
};

export type ConversationFeeReport = {
  items: Array<ConversationFeeReportRow>;
  meta: ReportPageMeta;
  totalCustomerFees: Scalars['Float']['output'];
  totalProviderFees: Scalars['Float']['output'];
};

export type ConversationFeeReportRow = {
  conversationId: Scalars['String']['output'];
  conversationNumber?: Maybe<Scalars['Int']['output']>;
  customerFee: Scalars['Float']['output'];
  customerName?: Maybe<Scalars['String']['output']>;
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  providerFee: Scalars['Float']['output'];
  providerName?: Maybe<Scalars['String']['output']>;
  providerPhone?: Maybe<Scalars['String']['output']>;
  startedAt: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
};

export type ConversationPaginationInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  listingId?: InputMaybe<Scalars['String']['input']>;
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<ConversationSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ConversationStatus>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Whether a message sender is a User, Provider, or the platform */
export enum ConversationSenderType {
  Provider = 'PROVIDER',
  System = 'SYSTEM',
  User = 'USER'
}

/** Available fields to sort conversations by */
export enum ConversationSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  LastActivityAt = 'lastActivityAt',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

export type ConversationStats = {
  unreadCount: Scalars['Int']['output'];
};

/** Conversation lifecycle status */
export enum ConversationStatus {
  Active = 'ACTIVE',
  Closed = 'CLOSED'
}

export type Country = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dialCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nameAr: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CountryPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<CountrySortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
};

/** Available fields to sort countries by */
export enum CountrySortField {
  Code = 'code',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type CreateAdminInput = {
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  permissionType: AdminPermissionType;
  phoneNumber: Scalars['String']['input'];
  roleName: Scalars['String']['input'];
  status?: AdminStatus;
  userType: AdminUserType;
};

export type CreateBankInput = {
  nameAr: Scalars['String']['input'];
  nameEn: Scalars['String']['input'];
  status: BankStatus;
};

export type CreateCategoryInput = {
  commissionEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  commissionPercent?: InputMaybe<Scalars['Float']['input']>;
  contractDocumentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  contractDocumentText?: InputMaybe<Scalars['String']['input']>;
  customerConversationFee?: InputMaybe<Scalars['Float']['input']>;
  customerConversationFeeEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  depositEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  depositPercent?: InputMaybe<Scalars['Float']['input']>;
  descriptionAr: Scalars['String']['input'];
  descriptionEn: Scalars['String']['input'];
  image: Scalars['String']['input'];
  maxCompletionDays?: InputMaybe<Scalars['Int']['input']>;
  maxCompletionDaysEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  maxTerminationDays?: InputMaybe<Scalars['Int']['input']>;
  maxTerminationDaysEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  minCommissionAmount?: InputMaybe<Scalars['Float']['input']>;
  minCommissionEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  nameAr: Scalars['String']['input'];
  nameEn: Scalars['String']['input'];
  providerConversationFee?: InputMaybe<Scalars['Float']['input']>;
  providerConversationFeeEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  refundPolicyAr?: InputMaybe<Scalars['String']['input']>;
  refundPolicyEn?: InputMaybe<Scalars['String']['input']>;
  refundPolicyEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  rulesAr?: InputMaybe<Scalars['String']['input']>;
  rulesEn?: InputMaybe<Scalars['String']['input']>;
  undertakingEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  undertakingTextAr?: InputMaybe<Scalars['String']['input']>;
  undertakingTextEn?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCityInput = {
  countryId: Scalars['ID']['input'];
  geoBoundary?: InputMaybe<Scalars['JSON']['input']>;
  nameAr: Scalars['String']['input'];
  nameEn: Scalars['String']['input'];
};

export type CreateComplaintInput = {
  contractId?: InputMaybe<Scalars['ID']['input']>;
  conversationId: Scalars['ID']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateContactMessageInput = {
  attachmentFilename?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  messageContent: Scalars['String']['input'];
  messageType?: MessageType;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateContractInput = {
  agreedPrice: Scalars['Float']['input'];
  contractId?: InputMaybe<Scalars['String']['input']>;
  conversationId: Scalars['String']['input'];
  customerAddress: Scalars['String']['input'];
  customerLatitude?: InputMaybe<Scalars['Float']['input']>;
  customerLongitude?: InputMaybe<Scalars['Float']['input']>;
  deliveryCompanyId?: InputMaybe<Scalars['String']['input']>;
  signatureData?: InputMaybe<Scalars['String']['input']>;
};

export type CreateConversationInput = {
  listingId: Scalars['String']['input'];
};

export type CreateCountryInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateDeliveryCompanyInput = {
  nameAr: Scalars['String']['input'];
  nameEn: Scalars['String']['input'];
  status: DeliveryCompanyStatus;
};

export type CreateFaqInput = {
  answerAr: Scalars['String']['input'];
  answerEn: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  questionAr: Scalars['String']['input'];
  questionEn: Scalars['String']['input'];
};

export type CreateListingInput = {
  categoryId: Scalars['String']['input'];
  cityId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  photos?: InputMaybe<Array<CreateListingMediaInput>>;
  price: Scalars['Float']['input'];
  status?: InputMaybe<ListingStatus>;
  story?: InputMaybe<CreateListingMediaInput>;
  type: ListingType;
};

export type CreateListingMediaInput = {
  filename: Scalars['String']['input'];
  id: Scalars['String']['input'];
  originalFilename: Scalars['String']['input'];
  size: Scalars['Int']['input'];
  sortOrder: Scalars['Int']['input'];
  type: MediaType;
};

export type CreateMessageInput = {
  content: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
};

export type CreateNotificationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  message: Scalars['String']['input'];
  relatedEntityId?: InputMaybe<Scalars['String']['input']>;
  relatedEntityType?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: NotificationType;
  userId: Scalars['String']['input'];
};

export type CreatePermissionInput = {
  action: Scalars['String']['input'];
  description: Scalars['String']['input'];
  module: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nameAr: Scalars['String']['input'];
  permissionPlatform?: PermissionPlatform;
  resource: Scalars['String']['input'];
};

export type CreateProviderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  commercialName?: InputMaybe<Scalars['String']['input']>;
  commercialRegistrationFilename?: InputMaybe<Scalars['String']['input']>;
  commercialRegistrationNumber?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  ibanNumber?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  withAbsher?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CreateRatingInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  listingId: Scalars['String']['input'];
  rating: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type DeactivateAdminInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type DeactivateBankInput = {
  reason: Scalars['String']['input'];
};

export type DeactivateDeliveryCompanyInput = {
  reason: Scalars['String']['input'];
};

export type DeactivateUserInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteProviderInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteUserInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type DeliveryCompany = {
  createdAt: Scalars['DateTime']['output'];
  deactivationReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nameAr: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  status: DeliveryCompanyStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type DeliveryCompanyPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<DeliveryCompanyStatus>;
};

/** Status of the delivery company */
export enum DeliveryCompanyStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Faq = {
  answerAr: Scalars['String']['output'];
  answerEn: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  order: Scalars['Float']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  questionAr: Scalars['String']['output'];
  questionEn: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Favorite = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  provider: Provider;
  providerId: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type FavoritePaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<FavoriteSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
};

/** Available fields to sort favorites by */
export enum FavoriteSortField {
  CreatedAt = 'createdAt',
  Id = 'id'
}

export type FeeReportInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  listingId?: InputMaybe<Scalars['String']['input']>;
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<Scalars['String']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ForgotPasswordInput = {
  emailOrPhone: Scalars['String']['input'];
};

export type InitializeContractInput = {
  conversationId: Scalars['String']['input'];
};

export type Listing = {
  category?: Maybe<Category>;
  categoryId: Scalars['String']['output'];
  city?: Maybe<City>;
  cityId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deactivationReason?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  featuredEndsAt?: Maybe<Scalars['DateTime']['output']>;
  featuredStartsAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photos: Array<ListingMedia>;
  price: Scalars['Float']['output'];
  promotionCycle: Scalars['Int']['output'];
  promotionStatus: PromotionStatus;
  provider?: Maybe<Provider>;
  providerId: Scalars['String']['output'];
  status: ListingStatus;
  story?: Maybe<ListingMedia>;
  tags: Scalars['String']['output'];
  type: ListingType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ListingMedia = {
  filename: Scalars['String']['output'];
  id: Scalars['String']['output'];
  originalFilename: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  sortOrder: Scalars['Float']['output'];
  type: MediaType;
};

export type ListingPaginationInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<ListingSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ListingStatus>;
  type?: InputMaybe<ListingType>;
};

/** Available fields to sort listings by */
export enum ListingSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  Price = 'price',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

/** Listing publication status */
export enum ListingStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  PendingPayment = 'PENDING_PAYMENT'
}

/** Listing type (free or featured) */
export enum ListingType {
  Featured = 'FEATURED',
  Free = 'FREE'
}

export type LoginInput = {
  emailOrPhone: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginProviderInput = {
  emailOrPhone: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** Media file type */
export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type Message = {
  content: Scalars['String']['output'];
  conversation: Conversation;
  conversationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  kind: MessageKind;
  metadata?: Maybe<Scalars['JSON']['output']>;
  publicId?: Maybe<Scalars['Int']['output']>;
  /** The message sender, either a User (customer) or a Provider */
  sender?: Maybe<MessageSender>;
  senderId?: Maybe<Scalars['ID']['output']>;
  senderType: ConversationSenderType;
  updatedAt: Scalars['DateTime']['output'];
};

/** User text or a typed system event in a conversation */
export enum MessageKind {
  ChatFeePaid = 'CHAT_FEE_PAID',
  ContractAccepted = 'CONTRACT_ACCEPTED',
  ContractCancellationRequested = 'CONTRACT_CANCELLATION_REQUESTED',
  ContractCancelled = 'CONTRACT_CANCELLED',
  ContractCompleted = 'CONTRACT_COMPLETED',
  ContractCreated = 'CONTRACT_CREATED',
  ContractDeliveryStarted = 'CONTRACT_DELIVERY_STARTED',
  ContractDisputed = 'CONTRACT_DISPUTED',
  ContractPaid = 'CONTRACT_PAID',
  ContractProviderCompleted = 'CONTRACT_PROVIDER_COMPLETED',
  ContractRejected = 'CONTRACT_REJECTED',
  ContractResent = 'CONTRACT_RESENT',
  Text = 'TEXT'
}

export type MessagePaginationInput = {
  conversationId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  senderId?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<MessageSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
};

export type MessageSender = Provider | User;

/** Available fields to sort messages by */
export enum MessageSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

/** Type of contact message */
export enum MessageType {
  Complaint = 'COMPLAINT',
  Inquiry = 'INQUIRY',
  Other = 'OTHER',
  Request = 'REQUEST',
  Suggestion = 'SUGGESTION'
}

export type Mutation = {
  /** Provider accepts a pending contract */
  acceptContract: Contract;
  activateAdmin: Admin;
  activateBank: Bank;
  activateCategory: Category;
  activateCity: City;
  activateDeliveryCompany: DeliveryCompany;
  activateListing: Listing;
  /** Activate provider by ID */
  activateProvider: Provider;
  /** Activate user by ID */
  activateUser: User;
  addComplaintMessage: ComplaintMessage;
  adminChangePassword: Scalars['Boolean']['output'];
  adminForgotPassword: Scalars['Boolean']['output'];
  adminLogin: AdminAuthResponse;
  /** Admin reactivates a provider whose contract was terminated by admin */
  adminReactivateProvider: Provider;
  adminReplyToComplaint: ComplaintMessage;
  adminResetPassword: Scalars['Boolean']['output'];
  /** Resolve a disputed or overdue contract as an authorized admin */
  adminResolveContract: Contract;
  adminSetComplaintStatus: Complaint;
  /** Admin terminates provider contract */
  adminTerminateProviderContract: Provider;
  adminVerifyPasswordResetOtp: VerifyAdminPasswordResetOtpResponse;
  assignPermissionToAdmin: AdminPermission;
  bulkAssignPermissionsToAdmin: Array<AdminPermission>;
  bulkRevokePermissionsFromAdmin: Scalars['Boolean']['output'];
  /** Bulk update FAQ order (admin only) */
  bulkUpdateOrder: Array<Faq>;
  /** Change password for authenticated user */
  changePassword: Scalars['Boolean']['output'];
  /** Change password for authenticated provider */
  changeProviderPassword: Scalars['Boolean']['output'];
  /** Customer signs and completes an in-progress contract */
  completeContract: Contract;
  createAdmin: Admin;
  createBank: Bank;
  createCategory: Category;
  createCity: City;
  createComplaint: Complaint;
  /** Create contact message (public) */
  createContactMessage: ContactMessage;
  createContract: Contract;
  createConversation: Conversation;
  createCountry: Country;
  createDeliveryCompany: DeliveryCompany;
  /** Create FAQ (admin only) */
  createFaq: Faq;
  createListing: Listing;
  createMessage: Message;
  createNotification: Notification;
  createPermission: Permission;
  /** Create a new provider */
  createProvider: Provider;
  createRating: Rating;
  deactivateAdmin: Admin;
  deactivateBank: Bank;
  deactivateCategory: Category;
  deactivateCity: City;
  deactivateDeliveryCompany: DeliveryCompany;
  deactivateListing: Listing;
  /** Deactivate provider */
  deactivateProvider: Provider;
  /** Deactivate user by ID */
  deactivateUser: User;
  /** Delete all notifications for a user */
  deleteAllNotificationsForUser: Scalars['Boolean']['output'];
  deleteSignedContract: SignedContract;
  /** Request password reset OTP */
  forgotPassword: Scalars['Boolean']['output'];
  /** Request password reset OTP for provider */
  forgotProviderPassword: Scalars['Boolean']['output'];
  /** Creates or returns the customer draft for a conversation so the contract ID and public number are available before submission */
  initializeContract: Contract;
  /** Initiate email change - sends OTP to new email and returns change token */
  initiateEmailChange: ChangeEmailResponse;
  /** Initiate phone change - sends OTP to new phone and returns change token */
  initiatePhoneChange: ChangePhoneResponse;
  /** Initiate provider email change - sends OTP to new email and returns change token */
  initiateProviderEmailChange: ChangeEmailResponse;
  /** Initiate provider phone change - sends OTP to new phone and returns change token */
  initiateProviderPhoneChange: ChangePhoneResponse;
  /** Login with email and password */
  login: AuthResponse;
  /** Login as provider with email/phone and password */
  loginProvider: ProviderAuthResponse;
  /** Mark all notifications as read for a user */
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  /** Mark message as read (admin only) */
  markAsRead: ContactMessage;
  /** Mark the conversation as read for the authenticated side */
  markConversationRead: Conversation;
  /** Mark multiple notifications as read */
  markMultipleNotificationsAsRead: Scalars['Boolean']['output'];
  /** Mark a notification as read */
  markNotificationAsRead: Notification;
  /** Mark a notification as unread */
  markNotificationAsUnread: Notification;
  /** Settle an accepted contract using the Sprint 3 mock */
  payContract: ContractPaymentResponse;
  /** Settle the authenticated participant conversation fee */
  payConversationFee: ConversationFeePaymentResponse;
  /** Provider signs and submits completed work or delivery */
  providerCompleteContract: Contract;
  /** Customer refuses a delivered contract and opens a dispute */
  refuseContractDelivery: Contract;
  /** Register a new user and send verification OTPs */
  register: User;
  /** Register a new provider and send verification OTPs */
  registerProvider: Provider;
  /** Provider rejects a pending contract */
  rejectContract: Contract;
  /** Reject a pending provider join request */
  rejectProviderJoinRequest: Provider;
  removeAdmin: Scalars['Boolean']['output'];
  /** Delete user avatar by ID */
  removeAvatar: Scalars['Boolean']['output'];
  removeBank: Bank;
  removeCategory: Category;
  removeCity: City;
  /** Delete contact message (admin only) */
  removeContactMessage: Scalars['Boolean']['output'];
  removeCountry: Country;
  removeDeliveryCompany: DeliveryCompany;
  /** Remove FAQ (admin only) */
  removeFaq: Scalars['Boolean']['output'];
  removeListing: RemoveListingResponse;
  /** Remove own avatar (self-service) */
  removeMyAvatar: Scalars['Boolean']['output'];
  removeNotification: Notification;
  removePermission: Scalars['Boolean']['output'];
  /** Remove provider */
  removeProvider: Provider;
  /** Remove own provider avatar */
  removeProviderAvatar: Scalars['Boolean']['output'];
  removeRating: Rating;
  /** Delete user by ID */
  removeUser: User;
  /** Reply to contact message (admin only) */
  replyToContactMessage: ContactMessage;
  /** Customer requests cancellation before final completion */
  requestContractCancellation: Contract;
  /** Customer resends a rejected contract as a new version */
  resendContract: Contract;
  /** Resend OTP for email or phone verification */
  resendOtp: Scalars['Boolean']['output'];
  /** Resend OTP for provider email or phone verification */
  resendProviderOtp: Scalars['Boolean']['output'];
  /** Reset password using reset token */
  resetPassword: Scalars['Boolean']['output'];
  /** Reset provider password using reset token */
  resetProviderPassword: Scalars['Boolean']['output'];
  /** Restart an expired conversation using a new fee cycle */
  restartConversation: Conversation;
  revokeAllPermissionsFromAdmin: Scalars['Boolean']['output'];
  revokePermissionFromAdmin: Scalars['Boolean']['output'];
  setProviderFavorite: Scalars['Boolean']['output'];
  /** Create or update application settings (admin only) */
  setSetting: Setting;
  /** Sign contract as provider */
  signProviderContract: Provider;
  /** Terminate provider contract */
  terminateProviderContract: Provider;
  trackAction: Tracking;
  updateAdmin: Admin;
  updateBank: Bank;
  updateCategory: Category;
  updateCity: City;
  /** Update contact message (admin only) */
  updateContactMessage: ContactMessage;
  updateCountry: Country;
  updateDeliveryCompany: DeliveryCompany;
  /** Update FAQ (admin only) */
  updateFaq: Faq;
  updateListing: Listing;
  /** Update own profile (self-service) */
  updateMe: User;
  updatePermission: Permission;
  /** Update provider */
  updateProvider: Provider;
  updateRating: Rating;
  /** Update user */
  updateUser: User;
  /** Verify email change with OTP and change token */
  verifyEmailChange: Scalars['Boolean']['output'];
  /** Verify email or phone with OTP */
  verifyOtp: Scalars['Boolean']['output'];
  /** Verify password reset OTP and get reset token */
  verifyPasswordResetOtp: VerifyPasswordResetOtpResponse;
  /** Verify phone change with OTP and change token */
  verifyPhoneChange: Scalars['Boolean']['output'];
  /** Verify email change with OTP and change token */
  verifyProviderEmailChange: Scalars['Boolean']['output'];
  /** Verify provider email or phone with OTP */
  verifyProviderOtp: Scalars['Boolean']['output'];
  /** Verify provider password reset OTP and get reset token */
  verifyProviderPasswordResetOtp: VerifyPasswordResetOtpResponse;
  /** Verify phone change with OTP and change token */
  verifyProviderPhoneChange: Scalars['Boolean']['output'];
};


export type MutationAcceptContractArgs = {
  input: AcceptContractInput;
};


export type MutationActivateAdminArgs = {
  id: Scalars['ID']['input'];
};


export type MutationActivateBankArgs = {
  id: Scalars['ID']['input'];
};


export type MutationActivateCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationActivateCityArgs = {
  id: Scalars['ID']['input'];
};


export type MutationActivateDeliveryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationActivateListingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationActivateProviderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationActivateUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAddComplaintMessageArgs = {
  complaintId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};


export type MutationAdminChangePasswordArgs = {
  input: AdminChangePasswordInput;
};


export type MutationAdminForgotPasswordArgs = {
  input: AdminForgotPasswordInput;
};


export type MutationAdminLoginArgs = {
  input: AdminLoginInput;
};


export type MutationAdminReactivateProviderArgs = {
  providerId: Scalars['ID']['input'];
};


export type MutationAdminReplyToComplaintArgs = {
  complaintId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};


export type MutationAdminResetPasswordArgs = {
  input: AdminResetPasswordInput;
};


export type MutationAdminResolveContractArgs = {
  input: AdminResolveContractInput;
};


export type MutationAdminSetComplaintStatusArgs = {
  complaintId: Scalars['String']['input'];
  status: ComplaintStatus;
};


export type MutationAdminTerminateProviderContractArgs = {
  input: AdminTerminateContractInput;
};


export type MutationAdminVerifyPasswordResetOtpArgs = {
  input: VerifyAdminPasswordResetOtpInput;
};


export type MutationAssignPermissionToAdminArgs = {
  input: AssignPermissionInput;
};


export type MutationBulkAssignPermissionsToAdminArgs = {
  input: BulkAssignPermissionsInput;
};


export type MutationBulkRevokePermissionsFromAdminArgs = {
  adminId: Scalars['ID']['input'];
  permissionIds: Array<Scalars['ID']['input']>;
};


export type MutationBulkUpdateOrderArgs = {
  input: BulkUpdateFaqOrderInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangeProviderPasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCompleteContractArgs = {
  input: CompleteContractInput;
};


export type MutationCreateAdminArgs = {
  createAdminInput: CreateAdminInput;
};


export type MutationCreateBankArgs = {
  input: CreateBankInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationCreateComplaintArgs = {
  evidence?: InputMaybe<Array<Scalars['Upload']['input']>>;
  input: CreateComplaintInput;
};


export type MutationCreateContactMessageArgs = {
  createContactMessageInput: CreateContactMessageInput;
};


export type MutationCreateContractArgs = {
  input: CreateContractInput;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


export type MutationCreateDeliveryCompanyArgs = {
  input: CreateDeliveryCompanyInput;
};


export type MutationCreateFaqArgs = {
  createFaqInput: CreateFaqInput;
};


export type MutationCreateListingArgs = {
  createListingInput: CreateListingInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreatePermissionArgs = {
  createPermissionInput: CreatePermissionInput;
};


export type MutationCreateProviderArgs = {
  createProviderInput: CreateProviderInput;
};


export type MutationCreateRatingArgs = {
  input: CreateRatingInput;
};


export type MutationDeactivateAdminArgs = {
  id: Scalars['ID']['input'];
  input: DeactivateAdminInput;
};


export type MutationDeactivateBankArgs = {
  id: Scalars['ID']['input'];
  input: DeactivateBankInput;
};


export type MutationDeactivateCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeactivateCityArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeactivateDeliveryCompanyArgs = {
  id: Scalars['ID']['input'];
  input: DeactivateDeliveryCompanyInput;
};


export type MutationDeactivateListingArgs = {
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationDeactivateProviderArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeactivateUserArgs = {
  id: Scalars['ID']['input'];
  input: DeactivateUserInput;
};


export type MutationDeleteAllNotificationsForUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationDeleteSignedContractArgs = {
  id: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationForgotProviderPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationInitializeContractArgs = {
  input: InitializeContractInput;
};


export type MutationInitiateEmailChangeArgs = {
  input: ChangeEmailInput;
};


export type MutationInitiatePhoneChangeArgs = {
  input: ChangePhoneInput;
};


export type MutationInitiateProviderEmailChangeArgs = {
  input: ChangeEmailInput;
};


export type MutationInitiateProviderPhoneChangeArgs = {
  input: ChangePhoneInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLoginProviderArgs = {
  input: LoginProviderInput;
};


export type MutationMarkAllNotificationsAsReadArgs = {
  userId: Scalars['String']['input'];
};


export type MutationMarkAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkConversationReadArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationMarkMultipleNotificationsAsReadArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationMarkNotificationAsUnreadArgs = {
  id: Scalars['String']['input'];
};


export type MutationPayContractArgs = {
  contractId: Scalars['String']['input'];
};


export type MutationPayConversationFeeArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationProviderCompleteContractArgs = {
  input: ProviderCompleteContractInput;
};


export type MutationRefuseContractDeliveryArgs = {
  input: RefuseDeliveryInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRegisterProviderArgs = {
  input: RegisterProviderInput;
};


export type MutationRejectContractArgs = {
  input: RejectContractInput;
};


export type MutationRejectProviderJoinRequestArgs = {
  id: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};


export type MutationRemoveAdminArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveAvatarArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveBankArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCityArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveContactMessageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveDeliveryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveFaqArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveListingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePermissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveProviderArgs = {
  id: Scalars['ID']['input'];
  input: DeleteProviderInput;
};


export type MutationRemoveRatingArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
  input: DeleteUserInput;
};


export type MutationReplyToContactMessageArgs = {
  id: Scalars['ID']['input'];
  message: Scalars['String']['input'];
};


export type MutationRequestContractCancellationArgs = {
  input: CancelContractInput;
};


export type MutationResendContractArgs = {
  input: ResendContractInput;
};


export type MutationResendOtpArgs = {
  input: ResendOtpInput;
};


export type MutationResendProviderOtpArgs = {
  input: ResendOtpInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordWithTokenInput;
};


export type MutationResetProviderPasswordArgs = {
  input: ResetPasswordWithTokenInput;
};


export type MutationRestartConversationArgs = {
  conversationId: Scalars['String']['input'];
};


export type MutationRevokeAllPermissionsFromAdminArgs = {
  adminId: Scalars['ID']['input'];
};


export type MutationRevokePermissionFromAdminArgs = {
  adminId: Scalars['ID']['input'];
  permissionId: Scalars['ID']['input'];
};


export type MutationSetProviderFavoriteArgs = {
  favorite: Scalars['Boolean']['input'];
  providerId: Scalars['String']['input'];
};


export type MutationSetSettingArgs = {
  input: SettingInput;
};


export type MutationSignProviderContractArgs = {
  input: SignContractInput;
};


export type MutationTerminateProviderContractArgs = {
  terminationReason: Scalars['String']['input'];
};


export type MutationTrackActionArgs = {
  input: TrackActionInput;
};


export type MutationUpdateAdminArgs = {
  id: Scalars['ID']['input'];
  updateAdminInput: UpdateAdminInput;
};


export type MutationUpdateBankArgs = {
  input: UpdateBankInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateCityArgs = {
  input: UpdateCityInput;
};


export type MutationUpdateContactMessageArgs = {
  updateContactMessageInput: UpdateContactMessageInput;
};


export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationUpdateDeliveryCompanyArgs = {
  input: UpdateDeliveryCompanyInput;
};


export type MutationUpdateFaqArgs = {
  updateFaqInput: UpdateFaqInput;
};


export type MutationUpdateListingArgs = {
  updateListingInput: UpdateListingInput;
};


export type MutationUpdateMeArgs = {
  updateMeInput: UpdateMeInput;
};


export type MutationUpdatePermissionArgs = {
  id: Scalars['ID']['input'];
  updatePermissionInput: UpdatePermissionInput;
};


export type MutationUpdateProviderArgs = {
  updateProviderInput: UpdateProviderInput;
};


export type MutationUpdateRatingArgs = {
  input: UpdateRatingInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationVerifyEmailChangeArgs = {
  input: VerifyChangeEmailInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};


export type MutationVerifyPasswordResetOtpArgs = {
  input: VerifyPasswordResetOtpInput;
};


export type MutationVerifyPhoneChangeArgs = {
  input: VerifyChangePhoneInput;
};


export type MutationVerifyProviderEmailChangeArgs = {
  input: VerifyChangeEmailInput;
};


export type MutationVerifyProviderOtpArgs = {
  input: VerifyOtpInput;
};


export type MutationVerifyProviderPasswordResetOtpArgs = {
  input: VerifyPasswordResetOtpInput;
};


export type MutationVerifyProviderPhoneChangeArgs = {
  input: VerifyChangePhoneInput;
};

export type Notification = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  recipientId: Scalars['String']['output'];
  recipientType: NotificationRecipientType;
  relatedEntityId?: Maybe<Scalars['String']['output']>;
  relatedEntityType?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: NotificationType;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type NotificationPaginationInput = {
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<NotificationSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  type?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum NotificationRecipientType {
  Provider = 'PROVIDER',
  User = 'USER'
}

/** Available fields to sort notifications by */
export enum NotificationSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  IsRead = 'isRead',
  Type = 'type'
}

export type NotificationStats = {
  readCount: Scalars['Int']['output'];
  totalNotifications: Scalars['Int']['output'];
  unreadCount: Scalars['Int']['output'];
};

/** Type of notification */
export enum NotificationType {
  ComplaintResolved = 'COMPLAINT_RESOLVED',
  ComplaintResponse = 'COMPLAINT_RESPONSE',
  ComplaintSubmitted = 'COMPLAINT_SUBMITTED',
  ContractCreated = 'CONTRACT_CREATED',
  ContractSigned = 'CONTRACT_SIGNED',
  ContractUpdate = 'CONTRACT_UPDATE',
  ListingApproved = 'LISTING_APPROVED',
  ListingRejected = 'LISTING_REJECTED',
  NewMessage = 'NEW_MESSAGE',
  NewRating = 'NEW_RATING',
  PaymentCompleted = 'PAYMENT_COMPLETED',
  PaymentReceived = 'PAYMENT_RECEIVED',
  SystemAnnouncement = 'SYSTEM_ANNOUNCEMENT'
}

/** Type of OTP */
export enum OtpType {
  EmailVerification = 'EMAIL_VERIFICATION',
  PasswordReset = 'PASSWORD_RESET',
  PhoneVerification = 'PHONE_VERIFICATION'
}

export type PaginatedAdminResponse = {
  /** List of items */
  items: Array<Admin>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedBankResponse = {
  /** List of items */
  items: Array<Bank>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedCategoryResponse = {
  /** List of items */
  items: Array<Category>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedCityResponse = {
  /** List of items */
  items: Array<City>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedComplaintResponse = {
  /** List of items */
  items: Array<Complaint>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedContactMessageResponse = {
  /** List of items */
  items: Array<ContactMessage>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedContractResponse = {
  /** List of items */
  items: Array<Contract>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedConversationResponse = {
  /** List of items */
  items: Array<Conversation>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedCountryResponse = {
  /** List of items */
  items: Array<Country>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedDeliveryCompanyResponse = {
  /** List of items */
  items: Array<DeliveryCompany>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedFavoriteResponse = {
  /** List of items */
  items: Array<Favorite>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedListingResponse = {
  /** List of items */
  items: Array<Listing>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedMessageResponse = {
  /** List of items */
  items: Array<Message>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedNotificationResponse = {
  /** List of items */
  items: Array<Notification>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedPaymentResponse = {
  /** List of items */
  items: Array<Payment>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedProviderResponse = {
  items: Array<Provider>;
  meta: PaginationMeta;
};

export type PaginatedRatingResponse = {
  /** List of items */
  items: Array<Rating>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedSignedContractResponse = {
  /** List of items */
  items: Array<SignedContract>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginatedUserResponse = {
  /** List of items */
  items: Array<User>;
  /** Pagination metadata */
  meta: PaginationMeta;
};

export type PaginationMeta = {
  /** Whether there is a next page */
  hasNext: Scalars['Boolean']['output'];
  /** Whether there is a previous page */
  hasPrevious: Scalars['Boolean']['output'];
  /** Number of items per page */
  limit: Scalars['Int']['output'];
  /** Current page number */
  page: Scalars['Int']['output'];
  /** Total number of items */
  total: Scalars['Int']['output'];
  /** Total number of pages */
  totalPages: Scalars['Int']['output'];
};

/** Entity type that owns the payment */
export enum PayerType {
  Provider = 'PROVIDER',
  User = 'USER'
}

export type Payment = {
  amount: Scalars['Float']['output'];
  categoryId?: Maybe<Scalars['ID']['output']>;
  commissionAmount: Scalars['Float']['output'];
  commissionPercent: Scalars['Float']['output'];
  configSnapshot?: Maybe<Scalars['JSON']['output']>;
  contract?: Maybe<Contract>;
  contractId?: Maybe<Scalars['ID']['output']>;
  conversation?: Maybe<Conversation>;
  conversationId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  gatewayResponse?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  listing?: Maybe<Listing>;
  listingId?: Maybe<Scalars['ID']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  payer?: Maybe<PaymentPayer>;
  payerId: Scalars['String']['output'];
  payerType: PayerType;
  paymentMethod: PaymentMethod;
  publicId?: Maybe<Scalars['Int']['output']>;
  purpose: PaymentPurpose;
  status: PaymentStatus;
  transactionReference?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  vatAmount: Scalars['Float']['output'];
  vatRate: Scalars['Float']['output'];
};

/** Payment method */
export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  Mock = 'MOCK',
  Wallet = 'WALLET'
}

export type PaymentPaginationInput = {
  contractId?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
  purpose?: InputMaybe<PaymentPurpose>;
  /** Sort field name */
  sortBy?: InputMaybe<PaymentSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<PaymentStatus>;
};

export type PaymentPayer = Provider | User;

/** Business obligation settled by a payment */
export enum PaymentPurpose {
  ChatCustomer = 'CHAT_CUSTOMER',
  ChatProvider = 'CHAT_PROVIDER',
  Contract = 'CONTRACT',
  PremiumAd = 'PREMIUM_AD'
}

/** Available fields to sort payments by */
export enum PaymentSortField {
  Amount = 'amount',
  CreatedAt = 'createdAt',
  Id = 'id',
  PaymentMethod = 'paymentMethod',
  Status = 'status',
  UpdatedAt = 'updatedAt'
}

/** Payment status */
export enum PaymentStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED'
}

export type Permission = {
  action: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  module: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nameAr: Scalars['String']['output'];
  permissionPlatform: PermissionPlatform;
  publicId?: Maybe<Scalars['Int']['output']>;
  resource: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** Permission platform types */
export enum PermissionPlatform {
  Admin = 'ADMIN',
  Global = 'GLOBAL'
}

export type PremiumAdFeeReport = {
  items: Array<PremiumAdFeeReportRow>;
  meta: ReportPageMeta;
  totalFees: Scalars['Float']['output'];
};

export type PremiumAdFeeReportRow = {
  createdAt: Scalars['DateTime']['output'];
  featuredEndsAt?: Maybe<Scalars['DateTime']['output']>;
  featuredStartsAt?: Maybe<Scalars['DateTime']['output']>;
  fee: Scalars['Float']['output'];
  listingId: Scalars['String']['output'];
  listingName: Scalars['String']['output'];
  paymentId: Scalars['String']['output'];
  providerName?: Maybe<Scalars['String']['output']>;
  providerPhone?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

/** Featured advertisement payment and expiry state */
export enum PromotionStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  None = 'NONE',
  PendingPayment = 'PENDING_PAYMENT'
}

export type Provider = {
  address?: Maybe<Scalars['String']['output']>;
  avatarFilename?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Category>>;
  city?: Maybe<City>;
  cityId?: Maybe<Scalars['String']['output']>;
  commercialName?: Maybe<Scalars['String']['output']>;
  commercialRegistrationFilename?: Maybe<Scalars['String']['output']>;
  commercialRegistrationNumber?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deactivationReason?: Maybe<Scalars['String']['output']>;
  deleteReason?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  dialCode?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  ibanNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  languageCode?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  phoneVerified: Scalars['Boolean']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  signedContract?: Maybe<SignedContract>;
  status: ProviderStatus;
  updatedAt: Scalars['DateTime']['output'];
  withAbsher?: Maybe<Scalars['Boolean']['output']>;
};

export type ProviderAuthResponse = {
  accessToken: Scalars['String']['output'];
  provider: Provider;
};

export type ProviderCompleteContractInput = {
  contractId: Scalars['String']['input'];
  deliveryEstimateDays?: InputMaybe<Scalars['Int']['input']>;
  signatureData: Scalars['String']['input'];
};

export type ProviderPaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProviderStatus>;
};

/** Provider status enumeration */
export enum ProviderStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE',
  PendingApproval = 'PENDING_APPROVAL',
  Rejected = 'REJECTED',
  Suspended = 'SUSPENDED'
}

export type Query = {
  /** Active delivery companies available to authenticated users */
  activeDeliveryCompanies: Array<DeliveryCompany>;
  admin: Admin;
  adminComplaint: Complaint;
  adminComplaints: PaginatedComplaintResponse;
  adminContract: Contract;
  adminContracts: PaginatedContractResponse;
  adminConversation: Conversation;
  adminConversations: PaginatedConversationResponse;
  adminPermissions: Array<AdminPermission>;
  admins: PaginatedAdminResponse;
  bank: Bank;
  banks: PaginatedBankResponse;
  categories: PaginatedCategoryResponse;
  category: Category;
  /** Get all cities with pagination */
  cities: PaginatedCityResponse;
  /** Get cities by country with pagination */
  citiesByCountry: PaginatedCityResponse;
  city: City;
  /** Get single contact message (admin only) */
  contactMessage: ContactMessage;
  /** Get contact messages (admin only) with pagination */
  contactMessages: PaginatedContactMessageResponse;
  contract: Contract;
  contractFinancialReport: ContractFinancialReport;
  /** Preview server-calculated contract financial terms */
  contractQuote: ContractQuote;
  contracts: PaginatedContractResponse;
  conversation: Conversation;
  conversationFeeReport: ConversationFeeReport;
  /** Get aggregate conversation statistics for the authenticated participant */
  conversationStats: ConversationStats;
  conversations: PaginatedConversationResponse;
  /** Get all countries with pagination */
  countries: PaginatedCountryResponse;
  country: Country;
  deliveryCompanies: PaginatedDeliveryCompanyResponse;
  deliveryCompany: DeliveryCompany;
  faq: Faq;
  /** Get all active FAQs (or all if admin) */
  faqs: Array<Faq>;
  /** Get application settings */
  getSetting: Setting;
  isProviderFavorite: Scalars['Boolean']['output'];
  listing?: Maybe<Listing>;
  listings: PaginatedListingResponse;
  meAdmin: Admin;
  /** Get current authenticated provider */
  meProvider?: Maybe<Provider>;
  /** Get current authenticated user */
  meUser?: Maybe<User>;
  message: Message;
  messages: PaginatedMessageResponse;
  myComplaint: Complaint;
  myComplaints: PaginatedComplaintResponse;
  myFavoriteProviders: PaginatedFavoriteResponse;
  myListing: Listing;
  myListings: PaginatedListingResponse;
  myPopularCategories: Array<Scalars['String']['output']>;
  myPopularListings: Array<Scalars['String']['output']>;
  notification: Notification;
  /** Get notification statistics for a user */
  notificationStats: NotificationStats;
  notifications: PaginatedNotificationResponse;
  payment: Payment;
  payments: PaginatedPaymentResponse;
  permission: Permission;
  permissionAdmins: Array<AdminPermission>;
  permissions: Array<Permission>;
  premiumAdFeeReport: PremiumAdFeeReport;
  /** Get provider by ID */
  provider: Provider;
  /** Get provider by email */
  providerByEmail: Provider;
  /** Get provider by phone */
  providerByPhone: Provider;
  /** Get all providers with pagination */
  providers: PaginatedProviderResponse;
  rating: Rating;
  /** Get rating statistics for an listing */
  ratingStatistics: RatingStatistics;
  ratings: PaginatedRatingResponse;
  signedContractById?: Maybe<SignedContract>;
  signedContractByProviderId?: Maybe<SignedContract>;
  signedContracts: PaginatedSignedContractResponse;
  /** Get user by ID */
  user: User;
  /** Get all users with pagination by role */
  users: PaginatedUserResponse;
};


export type QueryAdminArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminComplaintArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminComplaintsArgs = {
  input?: InputMaybe<ComplaintPaginationInput>;
};


export type QueryAdminContractArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminContractsArgs = {
  input?: InputMaybe<ContractPaginationInput>;
};


export type QueryAdminConversationArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminConversationsArgs = {
  input?: InputMaybe<ConversationPaginationInput>;
};


export type QueryAdminPermissionsArgs = {
  adminId: Scalars['ID']['input'];
};


export type QueryAdminsArgs = {
  paginationInput?: InputMaybe<AdminPaginationInput>;
};


export type QueryBankArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBanksArgs = {
  input?: InputMaybe<BankPaginationInput>;
};


export type QueryCategoriesArgs = {
  input?: InputMaybe<CategoryPaginationInput>;
};


export type QueryCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryCitiesArgs = {
  pagination?: InputMaybe<CityPaginationInput>;
};


export type QueryCitiesByCountryArgs = {
  countryId: Scalars['ID']['input'];
  pagination?: InputMaybe<CityPaginationInput>;
};


export type QueryCityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryContactMessagesArgs = {
  paginationInput?: InputMaybe<ContactMessagePaginationInput>;
};


export type QueryContractArgs = {
  id: Scalars['String']['input'];
};


export type QueryContractFinancialReportArgs = {
  input?: InputMaybe<FeeReportInput>;
};


export type QueryContractQuoteArgs = {
  input: ContractQuoteInput;
};


export type QueryContractsArgs = {
  input?: InputMaybe<ContractPaginationInput>;
};


export type QueryConversationArgs = {
  id: Scalars['String']['input'];
};


export type QueryConversationFeeReportArgs = {
  input?: InputMaybe<FeeReportInput>;
};


export type QueryConversationsArgs = {
  input?: InputMaybe<ConversationPaginationInput>;
};


export type QueryCountriesArgs = {
  pagination?: InputMaybe<CountryPaginationInput>;
};


export type QueryCountryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDeliveryCompaniesArgs = {
  input?: InputMaybe<DeliveryCompanyPaginationInput>;
};


export type QueryDeliveryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFaqArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIsProviderFavoriteArgs = {
  providerId: Scalars['String']['input'];
};


export type QueryListingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryListingsArgs = {
  paginationInput: ListingPaginationInput;
};


export type QueryMessageArgs = {
  id: Scalars['String']['input'];
};


export type QueryMessagesArgs = {
  input?: InputMaybe<MessagePaginationInput>;
};


export type QueryMyComplaintArgs = {
  id: Scalars['String']['input'];
};


export type QueryMyComplaintsArgs = {
  input?: InputMaybe<ComplaintPaginationInput>;
};


export type QueryMyFavoriteProvidersArgs = {
  input?: InputMaybe<FavoritePaginationInput>;
};


export type QueryMyListingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMyListingsArgs = {
  paginationInput: ListingPaginationInput;
};


export type QueryMyPopularCategoriesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryMyPopularListingsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryNotificationArgs = {
  id: Scalars['String']['input'];
};


export type QueryNotificationStatsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  input?: InputMaybe<NotificationPaginationInput>;
};


export type QueryPaymentArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentsArgs = {
  input?: InputMaybe<PaymentPaginationInput>;
};


export type QueryPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPermissionAdminsArgs = {
  permissionId: Scalars['ID']['input'];
};


export type QueryPremiumAdFeeReportArgs = {
  input?: InputMaybe<FeeReportInput>;
};


export type QueryProviderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProviderByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryProviderByPhoneArgs = {
  phone: Scalars['String']['input'];
};


export type QueryProvidersArgs = {
  pagination: ProviderPaginationInput;
};


export type QueryRatingArgs = {
  id: Scalars['String']['input'];
};


export type QueryRatingStatisticsArgs = {
  listingId: Scalars['String']['input'];
};


export type QueryRatingsArgs = {
  input?: InputMaybe<RatingPaginationInput>;
};


export type QuerySignedContractByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySignedContractByProviderIdArgs = {
  providerId: Scalars['String']['input'];
};


export type QuerySignedContractsArgs = {
  input?: InputMaybe<SignedContractPaginationInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  pagination: UserPaginationInput;
};

export type Rating = {
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  listing: Listing;
  listingId: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type RatingPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  listingId?: InputMaybe<Scalars['String']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<RatingSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Available fields to sort ratings by */
export enum RatingSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Rating = 'rating',
  UpdatedAt = 'updatedAt'
}

export type RatingStatistics = {
  averageRating: Scalars['Float']['output'];
  fiveStars: Scalars['Int']['output'];
  fourStars: Scalars['Int']['output'];
  oneStar: Scalars['Int']['output'];
  threeStars: Scalars['Int']['output'];
  totalRatings: Scalars['Int']['output'];
  twoStars: Scalars['Int']['output'];
};

export type RefuseDeliveryInput = {
  contractId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type RegisterInput = {
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName: Scalars['String']['input'];
  cityId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  ibanNumber: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  withAbsher?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegisterProviderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  commercialName: Scalars['String']['input'];
  commercialRegistrationFilename?: InputMaybe<Scalars['String']['input']>;
  commercialRegistrationNumber?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  ibanNumber?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  withAbsher?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RejectContractInput = {
  contractId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
};

export type RemoveListingResponse = {
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ReportPageMeta = {
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ResendContractInput = {
  agreedPrice: Scalars['Float']['input'];
  customerAddress: Scalars['String']['input'];
  customerLatitude?: InputMaybe<Scalars['Float']['input']>;
  customerLongitude?: InputMaybe<Scalars['Float']['input']>;
  deliveryCompanyId?: InputMaybe<Scalars['String']['input']>;
  rejectedContractId: Scalars['String']['input'];
  signatureData?: InputMaybe<Scalars['String']['input']>;
};

export type ResendOtpInput = {
  target: Scalars['String']['input'];
  type: OtpType;
};

export type ResetPasswordWithTokenInput = {
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};

/** Type of contact message sender */
export enum SenderType {
  Guest = 'GUEST',
  Provider = 'PROVIDER',
  User = 'USER'
}

export type Setting = {
  aboutAr: Scalars['String']['output'];
  aboutEn: Scalars['String']['output'];
  completionConfirmationGraceHours: Scalars['Int']['output'];
  contractAcceptanceWindowDays: Scalars['Int']['output'];
  contractAcceptanceWindowEnabled: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  phones: Array<Scalars['String']['output']>;
  platformManagerName?: Maybe<Scalars['String']['output']>;
  platformManagerSignature?: Maybe<Scalars['String']['output']>;
  premiumAdDurationDays: Scalars['Int']['output'];
  premiumAdEnabled: Scalars['Boolean']['output'];
  premiumAdFee: Scalars['Float']['output'];
  privacyPolicyAr: Scalars['String']['output'];
  privacyPolicyEn: Scalars['String']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  rulesAr: Scalars['String']['output'];
  rulesEn: Scalars['String']['output'];
  socialMediaLinks: Array<SocialMediaLink>;
  termsAr: Scalars['String']['output'];
  termsEn: Scalars['String']['output'];
  vatEnabled: Scalars['Boolean']['output'];
  vatRate: Scalars['Float']['output'];
  whatsappNumber: Scalars['String']['output'];
};

export type SettingInput = {
  aboutAr?: InputMaybe<Scalars['String']['input']>;
  aboutEn?: InputMaybe<Scalars['String']['input']>;
  completionConfirmationGraceHours?: InputMaybe<Scalars['Int']['input']>;
  contractAcceptanceWindowDays?: InputMaybe<Scalars['Int']['input']>;
  contractAcceptanceWindowEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  phones?: InputMaybe<Array<Scalars['String']['input']>>;
  platformManagerName?: InputMaybe<Scalars['String']['input']>;
  platformManagerSignature?: InputMaybe<Scalars['String']['input']>;
  premiumAdDurationDays?: InputMaybe<Scalars['Int']['input']>;
  premiumAdEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  premiumAdFee?: InputMaybe<Scalars['Float']['input']>;
  privacyPolicyAr?: InputMaybe<Scalars['String']['input']>;
  privacyPolicyEn?: InputMaybe<Scalars['String']['input']>;
  rulesAr?: InputMaybe<Scalars['String']['input']>;
  rulesEn?: InputMaybe<Scalars['String']['input']>;
  socialMediaLinks?: InputMaybe<Array<SocialMediaLinkInput>>;
  termsAr?: InputMaybe<Scalars['String']['input']>;
  termsEn?: InputMaybe<Scalars['String']['input']>;
  vatEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  vatRate?: InputMaybe<Scalars['Float']['input']>;
  whatsappNumber?: InputMaybe<Scalars['String']['input']>;
};

export type SignContractInput = {
  acceptedRulesAr?: InputMaybe<Array<ContractRuleInput>>;
  acceptedRulesEn?: InputMaybe<Array<ContractRuleInput>>;
  serviceProviderSignature: Scalars['String']['input'];
};

export type SignedContract = {
  acceptedRulesAr?: Maybe<Array<ContractRule>>;
  acceptedRulesEn?: Maybe<Array<ContractRule>>;
  contractExpiresAt?: Maybe<Scalars['String']['output']>;
  contractSignedAt: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deleteReason?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  platformManagerName?: Maybe<Scalars['String']['output']>;
  platformManagerSignature?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Provider>;
  providerId?: Maybe<Scalars['String']['output']>;
  publicId?: Maybe<Scalars['Int']['output']>;
  serviceProviderSignature: Scalars['String']['output'];
  status: SignedContractStatus;
  terminationReason?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SignedContractPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<SignedContractSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
};

/** Available fields to sort signed contracts by */
export enum SignedContractSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  ProviderId = 'providerId',
  UpdatedAt = 'updatedAt'
}

/** Provider account status */
export enum SignedContractStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  TerminatedByAdmin = 'TERMINATED_BY_ADMIN',
  TerminatedByProvider = 'TERMINATED_BY_PROVIDER'
}

export type SocialMediaLink = {
  link: Scalars['String']['output'];
  name: SocialMediaPlatform;
};

export type SocialMediaLinkInput = {
  link: Scalars['String']['input'];
  name: SocialMediaPlatform;
};

export enum SocialMediaPlatform {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Tiktok = 'TIKTOK',
  Twitter = 'TWITTER'
}

/** Sort order direction */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Subscription = {
  /** Subscribe to new messages in a conversation (participants only) */
  messageAdded: Message;
  /** Subscribe to notifications for the authenticated participant */
  notificationAdded: Notification;
  /** Subscribe to all new messages for the authenticated participant */
  participantMessageAdded: Message;
  /** Subscribe to real-time updates for the authenticated provider */
  providerUpdated: Provider;
  /** Subscribe to real-time updates for the authenticated user */
  userUpdated: User;
};


export type SubscriptionMessageAddedArgs = {
  conversationId: Scalars['String']['input'];
};

/** Type of target being tracked (category or listing) */
export enum TargetType {
  Category = 'CATEGORY',
  Listing = 'LISTING'
}

export type TrackActionInput = {
  actionType: ActionType;
  targetId: Scalars['String']['input'];
  targetType: TargetType;
};

export type Tracking = {
  actionType: ActionType;
  count: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  targetId: Scalars['String']['output'];
  targetType: TargetType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type UpdateAdminInput = {
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  organizationName?: InputMaybe<Scalars['String']['input']>;
  permissionType?: InputMaybe<AdminPermissionType>;
  phoneNumber: Scalars['String']['input'];
  roleName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AdminStatus>;
  userType?: InputMaybe<AdminUserType>;
};

export type UpdateBankInput = {
  id: Scalars['String']['input'];
  nameAr?: InputMaybe<Scalars['String']['input']>;
  nameEn?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BankStatus>;
};

export type UpdateCategoryInput = {
  commissionEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  commissionPercent?: InputMaybe<Scalars['Float']['input']>;
  contractDocumentEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  contractDocumentText?: InputMaybe<Scalars['String']['input']>;
  customerConversationFee?: InputMaybe<Scalars['Float']['input']>;
  customerConversationFeeEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  depositEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  depositPercent?: InputMaybe<Scalars['Float']['input']>;
  descriptionAr?: InputMaybe<Scalars['String']['input']>;
  descriptionEn?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  maxCompletionDays?: InputMaybe<Scalars['Int']['input']>;
  maxCompletionDaysEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  maxTerminationDays?: InputMaybe<Scalars['Int']['input']>;
  maxTerminationDaysEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  minCommissionAmount?: InputMaybe<Scalars['Float']['input']>;
  minCommissionEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  nameAr?: InputMaybe<Scalars['String']['input']>;
  nameEn?: InputMaybe<Scalars['String']['input']>;
  providerConversationFee?: InputMaybe<Scalars['Float']['input']>;
  providerConversationFeeEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  refundPolicyAr?: InputMaybe<Scalars['String']['input']>;
  refundPolicyEn?: InputMaybe<Scalars['String']['input']>;
  refundPolicyEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  rulesAr?: InputMaybe<Scalars['String']['input']>;
  rulesEn?: InputMaybe<Scalars['String']['input']>;
  undertakingEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  undertakingTextAr?: InputMaybe<Scalars['String']['input']>;
  undertakingTextEn?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCityInput = {
  countryId?: InputMaybe<Scalars['ID']['input']>;
  geoBoundary?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  nameAr?: InputMaybe<Scalars['String']['input']>;
  nameEn?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactMessageInput = {
  attachmentFilename?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  messageContent?: InputMaybe<Scalars['String']['input']>;
  messageType?: InputMaybe<MessageType>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCountryInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDeliveryCompanyInput = {
  id: Scalars['String']['input'];
  nameAr?: InputMaybe<Scalars['String']['input']>;
  nameEn?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<DeliveryCompanyStatus>;
};

export type UpdateFaqInput = {
  answerAr?: InputMaybe<Scalars['String']['input']>;
  answerEn?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  order?: InputMaybe<Scalars['Float']['input']>;
  questionAr?: InputMaybe<Scalars['String']['input']>;
  questionEn?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateFaqOrderInput = {
  id: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};

export type UpdateListingInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  photos?: InputMaybe<Array<CreateListingMediaInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ListingStatus>;
  story?: InputMaybe<CreateListingMediaInput>;
  type?: InputMaybe<ListingType>;
};

export type UpdateMeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ibanNumber?: InputMaybe<Scalars['String']['input']>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  withAbsher?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePermissionInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  module?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nameAr?: InputMaybe<Scalars['String']['input']>;
  permissionPlatform?: InputMaybe<PermissionPlatform>;
  resource?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProviderInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  commercialName?: InputMaybe<Scalars['String']['input']>;
  commercialRegistrationFilename?: InputMaybe<Scalars['String']['input']>;
  commercialRegistrationNumber?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ibanNumber?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  languageCode?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  withAbsher?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateRatingInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  listingId?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ibanNumber?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  languageCode?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  withAbsher?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  address?: Maybe<Scalars['String']['output']>;
  avatarFilename?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  cityId?: Maybe<Scalars['String']['output']>;
  contractSignature?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Country>;
  countryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deactivationReason?: Maybe<Scalars['String']['output']>;
  deleteReason?: Maybe<Scalars['String']['output']>;
  deletedAt?: Maybe<Scalars['String']['output']>;
  dialCode?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  ibanNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  languageCode?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  phoneVerified: Scalars['Boolean']['output'];
  publicId?: Maybe<Scalars['Int']['output']>;
  status: UserStatus;
  updatedAt: Scalars['DateTime']['output'];
  withAbsher?: Maybe<Scalars['Boolean']['output']>;
};

export type UserPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<UserSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<UserStatus>;
};

/** Available fields to sort users by */
export enum UserSortField {
  CreatedAt = 'createdAt',
  Email = 'email',
  FullName = 'fullName',
  Id = 'id',
  IsActive = 'isActive',
  Phone = 'phone',
  UpdatedAt = 'updatedAt'
}

/** User account status */
export enum UserStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE',
  PendingApproval = 'PENDING_APPROVAL',
  Suspended = 'SUSPENDED'
}

export type VerifyAdminPasswordResetOtpInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type VerifyAdminPasswordResetOtpResponse = {
  resetToken: Scalars['String']['output'];
};

export type VerifyChangeEmailInput = {
  changeToken: Scalars['String']['input'];
  code: Scalars['String']['input'];
};

export type VerifyChangePhoneInput = {
  changeToken: Scalars['String']['input'];
  code: Scalars['String']['input'];
  countryCode: Scalars['String']['input'];
};

export type VerifyOtpInput = {
  code: Scalars['String']['input'];
  target: Scalars['String']['input'];
  type: OtpType;
};

export type VerifyPasswordResetOtpInput = {
  code: Scalars['String']['input'];
  target: Scalars['String']['input'];
};

export type VerifyPasswordResetOtpResponse = {
  resetToken: Scalars['String']['output'];
};
