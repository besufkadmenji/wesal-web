/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Advertisement = {
  attributes?: Maybe<Array<AdvertisementAttributes>>;
  category: Category;
  categoryId: Scalars['String']['output'];
  city: City;
  cityId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  media?: Maybe<Array<AdvertisementMedia>>;
  price: Scalars['Float']['output'];
  status: AdvertisementStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type AdvertisementAttributes = {
  advertisement: Advertisement;
  advertisementId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AdvertisementAttributesInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type AdvertisementMedia = {
  advertisement: Advertisement;
  advertisementId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sortOrder: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type AdvertisementMediaInput = {
  sortOrder: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type AdvertisementPaginationInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<AdvertisementSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<AdvertisementStatus>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Available fields to sort advertisements by */
export enum AdvertisementSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Price = 'price',
  Status = 'status',
  Title = 'title',
  UpdatedAt = 'updatedAt'
}

/** Advertisement status */
export enum AdvertisementStatus {
  Draft = 'DRAFT',
  Expired = 'EXPIRED',
  Published = 'PUBLISHED',
  Suspended = 'SUSPENDED'
}

export type AuthResponse = {
  accessToken: Scalars['String']['output'];
  user: User;
};

export type Category = {
  children?: Maybe<Array<Category>>;
  createdAt: Scalars['DateTime']['output'];
  descriptionAr: Scalars['String']['output'];
  descriptionEn: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  nameAr: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
};

export type City = {
  country: Country;
  countryId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  nameAr: Scalars['String']['output'];
  nameEn: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CityPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<CitySortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
};

/** Available fields to sort cities by */
export enum CitySortField {
  CountryId = 'countryId',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type Complaint = {
  adminResponse?: Maybe<Scalars['String']['output']>;
  advertisement: Advertisement;
  advertisementId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  reason: ComplaintReason;
  reviewedAt?: Maybe<Scalars['DateTime']['output']>;
  reviewedBy?: Maybe<Scalars['String']['output']>;
  reviewer?: Maybe<User>;
  status: ComplaintStatus;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ComplaintPaginationInput = {
  advertisementId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  reason?: InputMaybe<ComplaintReason>;
  reviewedBy?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<ComplaintSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ComplaintStatus>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Reason for complaint */
export enum ComplaintReason {
  CopyrightViolation = 'COPYRIGHT_VIOLATION',
  Fraud = 'FRAUD',
  InappropriateContent = 'INAPPROPRIATE_CONTENT',
  MisleadingInformation = 'MISLEADING_INFORMATION',
  Offensive = 'OFFENSIVE',
  Other = 'OTHER',
  Spam = 'SPAM'
}

/** Available fields to sort complaints by */
export enum ComplaintSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Reason = 'reason',
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

export type Contract = {
  agreedPrice: Scalars['Float']['output'];
  client: User;
  clientId: Scalars['String']['output'];
  conversation: Conversation;
  conversationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  downPayment: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  provider: User;
  providerId: Scalars['String']['output'];
  signatures?: Maybe<Array<ContractSignature>>;
  status: ContractStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type ContractPaginationInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<ContractSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<ContractStatus>;
};

export type ContractSignature = {
  contract: Contract;
  contractId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  signatureData: Scalars['String']['output'];
  signedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ContractSignatureInput = {
  signatureData: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

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
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type Conversation = {
  advertisement: Advertisement;
  advertisementId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isPaid: Scalars['Boolean']['output'];
  messages?: Maybe<Array<Message>>;
  provider: User;
  providerId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type ConversationPaginationInput = {
  advertisementId?: InputMaybe<Scalars['String']['input']>;
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  /** Sort field name */
  sortBy?: InputMaybe<ConversationSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Available fields to sort conversations by */
export enum ConversationSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  IsPaid = 'isPaid',
  UpdatedAt = 'updatedAt'
}

export type Country = {
  code: Scalars['String']['output'];
  codeEn: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dialCode?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  nameAr: Scalars['String']['output'];
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

export type CreateAdvertisementInput = {
  attributes?: InputMaybe<Array<AdvertisementAttributesInput>>;
  categoryId: Scalars['String']['input'];
  cityId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  media?: InputMaybe<Array<AdvertisementMediaInput>>;
  price: Scalars['Float']['input'];
  status?: InputMaybe<AdvertisementStatus>;
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateCategoryInput = {
  descriptionAr: Scalars['String']['input'];
  descriptionEn: Scalars['String']['input'];
  nameAr: Scalars['String']['input'];
  nameEn: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCityInput = {
  countryId: Scalars['ID']['input'];
  nameAr: Scalars['String']['input'];
  nameEn: Scalars['String']['input'];
};

export type CreateComplaintInput = {
  advertisementId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  reason: ComplaintReason;
  status?: InputMaybe<ComplaintStatus>;
  userId: Scalars['String']['input'];
};

export type CreateContractInput = {
  agreedPrice: Scalars['Float']['input'];
  clientId: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  downPayment: Scalars['Float']['input'];
  providerId: Scalars['String']['input'];
  signatures?: InputMaybe<Array<ContractSignatureInput>>;
  status?: InputMaybe<ContractStatus>;
};

export type CreateConversationInput = {
  advertisementId: Scalars['String']['input'];
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  providerId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateCountryInput = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateFavoriteInput = {
  advertisementId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateMessageInput = {
  content: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
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

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  contractId: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: PaymentMethod;
  status?: InputMaybe<PaymentStatus>;
  transactionReference?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateRatingInput = {
  advertisementId: Scalars['String']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type Favorite = {
  advertisement: Advertisement;
  advertisementId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type FavoritePaginationInput = {
  advertisementId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<FavoriteSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** Available fields to sort favorites by */
export enum FavoriteSortField {
  CreatedAt = 'createdAt',
  Id = 'id'
}

export type ForgotPasswordInput = {
  emailOrPhone: Scalars['String']['input'];
};

export type LoginInput = {
  emailOrPhone: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Message = {
  content: Scalars['String']['output'];
  conversation: Conversation;
  conversationId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  sender: User;
  senderId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

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

/** Available fields to sort messages by */
export enum MessageSortField {
  CreatedAt = 'createdAt',
  Id = 'id',
  UpdatedAt = 'updatedAt'
}

export type Mutation = {
  createAdvertisement: Advertisement;
  createCategory: Category;
  createCity: City;
  createComplaint: Complaint;
  createContract: Contract;
  createConversation: Conversation;
  createCountry: Country;
  createFavorite: Favorite;
  createMessage: Message;
  createNotification: Notification;
  createPayment: Payment;
  createRating: Rating;
  /** Delete all notifications for a user */
  deleteAllNotificationsForUser: Scalars['Boolean']['output'];
  /** Request password reset OTP */
  forgotPassword: Scalars['Boolean']['output'];
  /** Login with email and password */
  login: AuthResponse;
  /** Mark all notifications as read for a user */
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  /** Mark multiple notifications as read */
  markMultipleNotificationsAsRead: Scalars['Boolean']['output'];
  /** Mark a notification as read */
  markNotificationAsRead: Notification;
  /** Mark a notification as unread */
  markNotificationAsUnread: Notification;
  /** Process a refund for a completed payment */
  refundPayment: Payment;
  /** Register a new user and send verification OTPs */
  register: User;
  /** Reject a complaint */
  rejectComplaint: Complaint;
  removeAdvertisement: Advertisement;
  removeCategory: Category;
  removeCity: City;
  removeComplaint: Complaint;
  removeContract: Contract;
  removeConversation: Conversation;
  removeCountry: Country;
  removeFavorite: Favorite;
  /** Remove favorite by user and advertisement IDs */
  removeFavoriteByUserAndAdvertisement: Favorite;
  removeMessage: Message;
  removeNotification: Notification;
  removePayment: Payment;
  removeRating: Rating;
  /** Delete user by ID */
  removeUser: User;
  /** Resend OTP for email or phone verification */
  resendOtp: Scalars['Boolean']['output'];
  /** Reset password using reset token */
  resetPassword: Scalars['Boolean']['output'];
  /** Review and resolve a complaint */
  reviewComplaint: Complaint;
  updateAdvertisement: Advertisement;
  updateCategory: Category;
  updateCity: City;
  updateComplaint: Complaint;
  updateContract: Contract;
  updateConversation: Conversation;
  updateCountry: Country;
  updateMessage: Message;
  updatePayment: Payment;
  updateRating: Rating;
  /** Update user */
  updateUser: User;
  /** Verify email or phone with OTP */
  verifyOtp: Scalars['Boolean']['output'];
  /** Verify password reset OTP and get reset token */
  verifyPasswordResetOtp: VerifyPasswordResetOtpResponse;
};


export type MutationCreateAdvertisementArgs = {
  input: CreateAdvertisementInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateCityArgs = {
  input: CreateCityInput;
};


export type MutationCreateComplaintArgs = {
  input: CreateComplaintInput;
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


export type MutationCreateFavoriteArgs = {
  input: CreateFavoriteInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateRatingArgs = {
  input: CreateRatingInput;
};


export type MutationDeleteAllNotificationsForUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationMarkAllNotificationsAsReadArgs = {
  userId: Scalars['String']['input'];
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


export type MutationRefundPaymentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRejectComplaintArgs = {
  complaintId: Scalars['String']['input'];
  reason: Scalars['String']['input'];
  reviewerId: Scalars['String']['input'];
};


export type MutationRemoveAdvertisementArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCityArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveComplaintArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveContractArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveConversationArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveCountryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveFavoriteArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveFavoriteByUserAndAdvertisementArgs = {
  advertisementId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationRemoveMessageArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemovePaymentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveRatingArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResendOtpArgs = {
  input: ResendOtpInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordWithTokenInput;
};


export type MutationReviewComplaintArgs = {
  input: ReviewComplaintInput;
};


export type MutationUpdateAdvertisementArgs = {
  input: UpdateAdvertisementInput;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateCityArgs = {
  input: UpdateCityInput;
};


export type MutationUpdateComplaintArgs = {
  input: UpdateComplaintInput;
};


export type MutationUpdateContractArgs = {
  input: UpdateContractInput;
};


export type MutationUpdateConversationArgs = {
  input: UpdateConversationInput;
};


export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdatePaymentArgs = {
  input: UpdatePaymentInput;
};


export type MutationUpdateRatingArgs = {
  input: UpdateRatingInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyOtpInput;
};


export type MutationVerifyPasswordResetOtpArgs = {
  input: VerifyPasswordResetOtpInput;
};

export type Notification = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  relatedEntityId?: Maybe<Scalars['String']['output']>;
  relatedEntityType?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: NotificationType;
  user: User;
  userId: Scalars['String']['output'];
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
  AdvertisementApproved = 'ADVERTISEMENT_APPROVED',
  AdvertisementRejected = 'ADVERTISEMENT_REJECTED',
  ComplaintResolved = 'COMPLAINT_RESOLVED',
  ComplaintSubmitted = 'COMPLAINT_SUBMITTED',
  ContractCreated = 'CONTRACT_CREATED',
  ContractSigned = 'CONTRACT_SIGNED',
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

export type PaginatedAdvertisementResponse = {
  /** List of items */
  items: Array<Advertisement>;
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

export type PaginatedFavoriteResponse = {
  /** List of items */
  items: Array<Favorite>;
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

export type PaginatedRatingResponse = {
  /** List of items */
  items: Array<Rating>;
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

export type Payment = {
  amount: Scalars['Float']['output'];
  contract: Contract;
  contractId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  gatewayResponse?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionReference?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

/** Payment method */
export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  Wallet = 'WALLET'
}

export type PaymentPaginationInput = {
  contractId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  paymentMethod?: InputMaybe<PaymentMethod>;
  /** Sort field name */
  sortBy?: InputMaybe<PaymentSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
  status?: InputMaybe<PaymentStatus>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

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

export type Query = {
  advertisement: Advertisement;
  advertisements: PaginatedAdvertisementResponse;
  categories: PaginatedCategoryResponse;
  category: Category;
  /** Get all cities with pagination */
  cities: PaginatedCityResponse;
  /** Get cities by country with pagination */
  citiesByCountry: PaginatedCityResponse;
  city: City;
  complaint: Complaint;
  complaints: PaginatedComplaintResponse;
  contract: Contract;
  contracts: PaginatedContractResponse;
  conversation: Conversation;
  conversations: PaginatedConversationResponse;
  /** Get all countries with pagination */
  countries: PaginatedCountryResponse;
  country: Country;
  favorite: Favorite;
  favorites: PaginatedFavoriteResponse;
  /** Check if advertisement is favorited by user */
  isFavorite: Scalars['Boolean']['output'];
  /** Get current authenticated user */
  me: User;
  message: Message;
  messages: PaginatedMessageResponse;
  notification: Notification;
  /** Get notification statistics for a user */
  notificationStats: NotificationStats;
  notifications: PaginatedNotificationResponse;
  payment: Payment;
  payments: PaginatedPaymentResponse;
  rating: Rating;
  /** Get rating statistics for an advertisement */
  ratingStatistics: RatingStatistics;
  ratings: PaginatedRatingResponse;
  /** Get user by ID */
  user: User;
  /** Get all users with pagination */
  users: PaginatedUserResponse;
};


export type QueryAdvertisementArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdvertisementsArgs = {
  input?: InputMaybe<AdvertisementPaginationInput>;
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


export type QueryComplaintArgs = {
  id: Scalars['String']['input'];
};


export type QueryComplaintsArgs = {
  input?: InputMaybe<ComplaintPaginationInput>;
};


export type QueryContractArgs = {
  id: Scalars['String']['input'];
};


export type QueryContractsArgs = {
  input?: InputMaybe<ContractPaginationInput>;
};


export type QueryConversationArgs = {
  id: Scalars['String']['input'];
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


export type QueryFavoriteArgs = {
  id: Scalars['String']['input'];
};


export type QueryFavoritesArgs = {
  input?: InputMaybe<FavoritePaginationInput>;
};


export type QueryIsFavoriteArgs = {
  advertisementId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryMessageArgs = {
  id: Scalars['String']['input'];
};


export type QueryMessagesArgs = {
  input?: InputMaybe<MessagePaginationInput>;
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


export type QueryRatingArgs = {
  id: Scalars['String']['input'];
};


export type QueryRatingStatisticsArgs = {
  advertisementId: Scalars['String']['input'];
};


export type QueryRatingsArgs = {
  input?: InputMaybe<RatingPaginationInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  pagination?: InputMaybe<UserPaginationInput>;
};

export type Rating = {
  advertisement: Advertisement;
  advertisementId: Scalars['String']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type RatingPaginationInput = {
  advertisementId?: InputMaybe<Scalars['String']['input']>;
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
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

export type RegisterInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  dialCode?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  ibanNumber?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
};

export type ResendOtpInput = {
  target: Scalars['String']['input'];
  type: OtpType;
};

export type ResetPasswordWithTokenInput = {
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};

export type ReviewComplaintInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  adminResponse: Scalars['String']['input'];
  complaintId: Scalars['String']['input'];
  reviewerId: Scalars['String']['input'];
};

/** Sort order direction */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateAdvertisementInput = {
  attributes?: InputMaybe<Array<AdvertisementAttributesInput>>;
  categoryId?: InputMaybe<Scalars['String']['input']>;
  cityId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  media?: InputMaybe<Array<AdvertisementMediaInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<AdvertisementStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  descriptionAr?: InputMaybe<Scalars['String']['input']>;
  descriptionEn?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  nameAr?: InputMaybe<Scalars['String']['input']>;
  nameEn?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCityInput = {
  countryId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  nameAr?: InputMaybe<Scalars['String']['input']>;
  nameEn?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateComplaintInput = {
  advertisementId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  reason?: InputMaybe<ComplaintReason>;
  status?: InputMaybe<ComplaintStatus>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContractInput = {
  agreedPrice?: InputMaybe<Scalars['Float']['input']>;
  clientId?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  downPayment?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['String']['input'];
  providerId?: InputMaybe<Scalars['String']['input']>;
  signatures?: InputMaybe<Array<ContractSignatureInput>>;
  status?: InputMaybe<ContractStatus>;
};

export type UpdateConversationInput = {
  advertisementId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCountryInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  conversationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  senderId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePaymentInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  contractId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  status?: InputMaybe<PaymentStatus>;
  transactionReference?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRatingInput = {
  advertisementId?: InputMaybe<Scalars['String']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  rating?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatarFilename?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
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
};

export type User = {
  address?: Maybe<Scalars['String']['output']>;
  avatarFilename?: Maybe<Scalars['String']['output']>;
  bankName?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Category>>;
  cityId?: Maybe<Scalars['String']['output']>;
  countryId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
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
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserPaginationInput = {
  /** Number of items per page */
  limit?: Scalars['Int']['input'];
  /** Page number (1-based) */
  page?: Scalars['Int']['input'];
  /** Sort field name */
  sortBy?: InputMaybe<UserSortField>;
  /** Sort order: ASC or DESC */
  sortOrder?: InputMaybe<SortOrder>;
};

/** User role enumeration */
export enum UserRole {
  Provider = 'PROVIDER',
  User = 'USER'
}

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

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { login: { accessToken: string, user: { cityId?: string | null } } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { register: { name?: string | null, phone: string, id: string, isActive: boolean, languageCode?: string | null, latitude?: number | null, longitude?: number | null, phoneVerified: boolean, role: UserRole, updatedAt: any, emailVerified: boolean, email: string, dialCode?: string | null, address?: string | null, avatarFilename?: string | null, cityId?: string | null, countryId?: string | null, createdAt: any } };

export type ResendOtpMutationVariables = Exact<{
  input: ResendOtpInput;
}>;


export type ResendOtpMutation = { resendOtp: boolean };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordWithTokenInput;
}>;


export type ResetPasswordMutation = { resetPassword: boolean };

export type VerifyOtpMutationVariables = Exact<{
  input: VerifyOtpInput;
}>;


export type VerifyOtpMutation = { verifyOtp: boolean };

export type VerifyPasswordResetOtpMutationVariables = Exact<{
  input: VerifyPasswordResetOtpInput;
}>;


export type VerifyPasswordResetOtpMutation = { verifyPasswordResetOtp: { resetToken: string } };

export type CategoriesQueryVariables = Exact<{
  input?: InputMaybe<CategoryPaginationInput>;
}>;


export type CategoriesQuery = { categories: { meta: { hasNext: boolean, hasPrevious: boolean, limit: number, page: number, total: number, totalPages: number }, items: Array<{ createdAt: any, descriptionAr: string, descriptionEn: string, id: string, nameAr: string, nameEn: string, parentId?: string | null, updatedAt: any }> } };

export type CitiesQueryVariables = Exact<{
  pagination?: InputMaybe<CityPaginationInput>;
}>;


export type CitiesQuery = { cities: { meta: { hasNext: boolean, hasPrevious: boolean, limit: number, page: number, total: number, totalPages: number }, items: Array<{ countryId: string, createdAt: any, id: string, nameEn: string, updatedAt: any, nameAr: string, country: { code: string, codeEn: string, createdAt: any, dialCode?: string | null, id: string, nameAr: string, updatedAt: any } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, name?: string | null, isActive: boolean, languageCode?: string | null, address?: string | null, avatarFilename?: string | null, cityId?: string | null, countryId?: string | null, createdAt: any, dialCode?: string | null, email: string, emailVerified: boolean, latitude?: number | null, longitude?: number | null, phone: string, phoneVerified: boolean, role: UserRole, updatedAt: any } };


export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"forgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cityId"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"phoneVerified"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"dialCode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatarFilename"}},{"kind":"Field","name":{"kind":"Name","value":"cityId"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ResendOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resendOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResendOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ResendOtpMutation, ResendOtpMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordWithTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const VerifyPasswordResetOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyPasswordResetOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyPasswordResetOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetToken"}}]}}]}}]} as unknown as DocumentNode<VerifyPasswordResetOtpMutation, VerifyPasswordResetOtpMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevious"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"descriptionAr"}},{"kind":"Field","name":{"kind":"Name","value":"descriptionEn"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAr"}},{"kind":"Field","name":{"kind":"Name","value":"nameEn"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"cities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CityPaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrevious"}},{"kind":"Field","name":{"kind":"Name","value":"limit"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameEn"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"nameAr"}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"codeEn"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dialCode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameAr"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CitiesQuery, CitiesQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"languageCode"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"avatarFilename"}},{"kind":"Field","name":{"kind":"Name","value":"cityId"}},{"kind":"Field","name":{"kind":"Name","value":"countryId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dialCode"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"phoneVerified"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;