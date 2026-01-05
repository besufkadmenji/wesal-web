/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation forgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input)\n  }\n": typeof types.ForgotPasswordDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      user {\n        cityId\n      }\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation register($input: RegisterInput!) {\n    register(input: $input) {\n      name\n      phone\n      id\n      isActive\n      languageCode\n      latitude\n      longitude\n      phoneVerified\n      role\n      updatedAt\n      emailVerified\n      email\n      dialCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation resendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input)\n  }\n": typeof types.ResendOtpDocument,
    "\n  mutation ResetPassword($input: ResetPasswordWithTokenInput!) {\n    resetPassword(input: $input)\n  }\n": typeof types.ResetPasswordDocument,
    "\n  mutation verifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input)\n  }\n": typeof types.VerifyOtpDocument,
    "\n  mutation verifyPasswordResetOtp($input: VerifyPasswordResetOtpInput!) {\n    verifyPasswordResetOtp(input: $input) {\n      resetToken\n    }\n  }\n": typeof types.VerifyPasswordResetOtpDocument,
    "\n  query categories($input: CategoryPaginationInput) {\n    categories(input: $input) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        createdAt\n        descriptionAr\n        descriptionEn\n        id\n        nameAr\n        nameEn\n        parentId\n        updatedAt\n      }\n    }\n  }\n": typeof types.CategoriesDocument,
    "\n  query cities($pagination: CityPaginationInput) {\n    cities(pagination: $pagination) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        countryId\n        createdAt\n        id\n        nameEn\n        updatedAt\n        nameAr\n        country {\n          code\n          nameEn\n          createdAt\n          dialCode\n          id\n          nameAr\n          updatedAt\n        }\n      }\n    }\n  }\n": typeof types.CitiesDocument,
    "\n  query me {\n    me {\n      id\n      name\n      isActive\n      languageCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n      dialCode\n      email\n      emailVerified\n      latitude\n      longitude\n      phone\n      phoneVerified\n      role\n      updatedAt\n      ibanNumber\n      bankName\n    }\n  }\n": typeof types.MeDocument,
    "\n  mutation removeAvatar($removeAvatarId: ID!) {\n    removeAvatar(id: $removeAvatarId)\n  }\n": typeof types.RemoveAvatarDocument,
    "\n  mutation updateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n    }\n  }\n": typeof types.UpdateUserDocument,
};
const documents: Documents = {
    "\n  mutation forgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input)\n  }\n": types.ForgotPasswordDocument,
    "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      user {\n        cityId\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  mutation register($input: RegisterInput!) {\n    register(input: $input) {\n      name\n      phone\n      id\n      isActive\n      languageCode\n      latitude\n      longitude\n      phoneVerified\n      role\n      updatedAt\n      emailVerified\n      email\n      dialCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation resendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input)\n  }\n": types.ResendOtpDocument,
    "\n  mutation ResetPassword($input: ResetPasswordWithTokenInput!) {\n    resetPassword(input: $input)\n  }\n": types.ResetPasswordDocument,
    "\n  mutation verifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input)\n  }\n": types.VerifyOtpDocument,
    "\n  mutation verifyPasswordResetOtp($input: VerifyPasswordResetOtpInput!) {\n    verifyPasswordResetOtp(input: $input) {\n      resetToken\n    }\n  }\n": types.VerifyPasswordResetOtpDocument,
    "\n  query categories($input: CategoryPaginationInput) {\n    categories(input: $input) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        createdAt\n        descriptionAr\n        descriptionEn\n        id\n        nameAr\n        nameEn\n        parentId\n        updatedAt\n      }\n    }\n  }\n": types.CategoriesDocument,
    "\n  query cities($pagination: CityPaginationInput) {\n    cities(pagination: $pagination) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        countryId\n        createdAt\n        id\n        nameEn\n        updatedAt\n        nameAr\n        country {\n          code\n          nameEn\n          createdAt\n          dialCode\n          id\n          nameAr\n          updatedAt\n        }\n      }\n    }\n  }\n": types.CitiesDocument,
    "\n  query me {\n    me {\n      id\n      name\n      isActive\n      languageCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n      dialCode\n      email\n      emailVerified\n      latitude\n      longitude\n      phone\n      phoneVerified\n      role\n      updatedAt\n      ibanNumber\n      bankName\n    }\n  }\n": types.MeDocument,
    "\n  mutation removeAvatar($removeAvatarId: ID!) {\n    removeAvatar(id: $removeAvatarId)\n  }\n": types.RemoveAvatarDocument,
    "\n  mutation updateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation forgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input)\n  }\n"): (typeof documents)["\n  mutation forgotPassword($input: ForgotPasswordInput!) {\n    forgotPassword(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      user {\n        cityId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: LoginInput!) {\n    login(input: $input) {\n      accessToken\n      user {\n        cityId\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation register($input: RegisterInput!) {\n    register(input: $input) {\n      name\n      phone\n      id\n      isActive\n      languageCode\n      latitude\n      longitude\n      phoneVerified\n      role\n      updatedAt\n      emailVerified\n      email\n      dialCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation register($input: RegisterInput!) {\n    register(input: $input) {\n      name\n      phone\n      id\n      isActive\n      languageCode\n      latitude\n      longitude\n      phoneVerified\n      role\n      updatedAt\n      emailVerified\n      email\n      dialCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation resendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input)\n  }\n"): (typeof documents)["\n  mutation resendOtp($input: ResendOtpInput!) {\n    resendOtp(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResetPassword($input: ResetPasswordWithTokenInput!) {\n    resetPassword(input: $input)\n  }\n"): (typeof documents)["\n  mutation ResetPassword($input: ResetPasswordWithTokenInput!) {\n    resetPassword(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation verifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input)\n  }\n"): (typeof documents)["\n  mutation verifyOtp($input: VerifyOtpInput!) {\n    verifyOtp(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation verifyPasswordResetOtp($input: VerifyPasswordResetOtpInput!) {\n    verifyPasswordResetOtp(input: $input) {\n      resetToken\n    }\n  }\n"): (typeof documents)["\n  mutation verifyPasswordResetOtp($input: VerifyPasswordResetOtpInput!) {\n    verifyPasswordResetOtp(input: $input) {\n      resetToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categories($input: CategoryPaginationInput) {\n    categories(input: $input) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        createdAt\n        descriptionAr\n        descriptionEn\n        id\n        nameAr\n        nameEn\n        parentId\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query categories($input: CategoryPaginationInput) {\n    categories(input: $input) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        createdAt\n        descriptionAr\n        descriptionEn\n        id\n        nameAr\n        nameEn\n        parentId\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query cities($pagination: CityPaginationInput) {\n    cities(pagination: $pagination) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        countryId\n        createdAt\n        id\n        nameEn\n        updatedAt\n        nameAr\n        country {\n          code\n          nameEn\n          createdAt\n          dialCode\n          id\n          nameAr\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query cities($pagination: CityPaginationInput) {\n    cities(pagination: $pagination) {\n      meta {\n        hasNext\n        hasPrevious\n        limit\n        page\n        total\n        totalPages\n      }\n      items {\n        countryId\n        createdAt\n        id\n        nameEn\n        updatedAt\n        nameAr\n        country {\n          code\n          nameEn\n          createdAt\n          dialCode\n          id\n          nameAr\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      id\n      name\n      isActive\n      languageCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n      dialCode\n      email\n      emailVerified\n      latitude\n      longitude\n      phone\n      phoneVerified\n      role\n      updatedAt\n      ibanNumber\n      bankName\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      name\n      isActive\n      languageCode\n      address\n      avatarFilename\n      cityId\n      countryId\n      createdAt\n      dialCode\n      email\n      emailVerified\n      latitude\n      longitude\n      phone\n      phoneVerified\n      role\n      updatedAt\n      ibanNumber\n      bankName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeAvatar($removeAvatarId: ID!) {\n    removeAvatar(id: $removeAvatarId)\n  }\n"): (typeof documents)["\n  mutation removeAvatar($removeAvatarId: ID!) {\n    removeAvatar(id: $removeAvatarId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;