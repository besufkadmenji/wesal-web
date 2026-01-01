interface GraphQLError {
  message?: string;
  extensions?: {
    code?: string;
    originalError?: {
      statusCode?: number;
      message?: string;
      errors?: (string | { message?: string })[];
    };
  };
  path?: (string | number)[];
}

interface ApolloError {
  graphQLErrors?: GraphQLError[];
  networkError?: Error | null;
  message?: string;
  errors?: GraphQLError[];
}

/**
 * Parses GraphQL error responses and extracts meaningful error messages
 * @param error - The error from GraphQL Apollo client
 * @param defaultMessage - Fallback message if no error is found
 * @returns Extracted error message
 */
export const parseGraphQLError = (
  error: unknown,
  defaultMessage: string = "An error occurred. Please try again."
): string => {
  const err = error as ApolloError | null;
  if (!err) return defaultMessage;

  // Handle network errors
  if (err.networkError) {
    return err.networkError.message || defaultMessage;
  }

  // Handle GraphQL errors array
  if (err.graphQLErrors && err.graphQLErrors.length > 0) {
    const firstError = err.graphQLErrors[0];

    // Check for nested validation errors in originalError.errors
    if (firstError?.extensions?.originalError?.errors) {
      const validationErrors = firstError.extensions.originalError.errors;
      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const firstValidationError = validationErrors[0];
        if (typeof firstValidationError === 'string') {
          return firstValidationError;
        } else if (firstValidationError?.message) {
          return firstValidationError.message;
        }
      }
    }

    // Try to get message from originalError first (more detailed)
    if (firstError?.extensions?.originalError?.message) {
      return firstError.extensions.originalError.message;
    }

    // Fall back to main error message
    if (firstError?.message) {
      return firstError.message;
    }
  }

  // Handle direct error message
  if (err.message) {
    return err.message;
  }

  // Handle errors array directly (for non-Apollo errors)
  if (Array.isArray(err.errors) && err.errors.length > 0) {
    const firstError = err.errors[0];

    // Check for nested validation errors in originalError.errors
    if (firstError?.extensions?.originalError?.errors) {
      const validationErrors = firstError.extensions.originalError.errors;
      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const firstValidationError = validationErrors[0];
        if (typeof firstValidationError === 'string') {
          return firstValidationError;
        } else if (firstValidationError?.message) {
          return firstValidationError.message;
        }
      }
    }

    if (firstError?.extensions?.originalError?.message) {
      return firstError.extensions.originalError.message;
    }

    if (firstError?.message) {
      return firstError.message;
    }
  }

  return defaultMessage;
};

/**
 * Extracts all error messages from a GraphQL response
 * @param error - The error from GraphQL Apollo client
 * @returns Array of error messages
 */
export const parseAllGraphQLErrors = (error: unknown): string[] => {
  const messages: string[] = [];
  const err = error as ApolloError | null;
  if (!err) return messages;

  // Handle GraphQL errors array
  if (err.graphQLErrors && Array.isArray(err.graphQLErrors)) {
    err.graphQLErrors.forEach((gqlErr: GraphQLError) => {
      // Check for nested validation errors in originalError.errors
      if (gqlErr?.extensions?.originalError?.errors) {
        const validationErrors = gqlErr.extensions.originalError.errors;
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach((validationError) => {
            if (typeof validationError === 'string') {
              messages.push(validationError);
            } else if (validationError?.message) {
              messages.push(validationError.message);
            }
          });
        }
      } else if (gqlErr?.extensions?.originalError?.message) {
        messages.push(gqlErr.extensions.originalError.message);
      } else if (gqlErr?.message) {
        messages.push(gqlErr.message);
      }
    });
  }

  // Handle direct errors array
  if (Array.isArray(err.errors)) {
    err.errors.forEach((gqlErr: GraphQLError) => {
      // Check for nested validation errors in originalError.errors
      if (gqlErr?.extensions?.originalError?.errors) {
        const validationErrors = gqlErr.extensions.originalError.errors;
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach((validationError) => {
            if (typeof validationError === 'string') {
              messages.push(validationError);
            } else if (validationError?.message) {
              messages.push(validationError.message);
            }
          });
        }
      } else if (gqlErr?.extensions?.originalError?.message) {
        messages.push(gqlErr.extensions.originalError.message);
      } else if (gqlErr?.message) {
        messages.push(gqlErr.message);
      }
    });
  }

  // Handle network errors
  if (err.networkError?.message) {
    messages.push(err.networkError.message);
  }

  // Handle direct message
  if (err.message && messages.length === 0) {
    messages.push(err.message);
  }

  return messages;
};

/**
 * Gets the HTTP status code from a GraphQL error
 * @param error - The error from GraphQL Apollo client
 * @returns HTTP status code or null
 */
export const getGraphQLErrorStatus = (error: unknown): number | null => {
  const err = error as ApolloError | null;
  if (!err) return null;

  if (err.graphQLErrors?.[0]?.extensions?.originalError?.statusCode) {
    return err.graphQLErrors[0].extensions.originalError.statusCode;
  }

  if (err.errors?.[0]?.extensions?.originalError?.statusCode) {
    return err.errors[0].extensions.originalError.statusCode;
  }

  return null;
};

/**
 * Checks if error is a specific type (by status code or error code)
 * @param error - The error from GraphQL Apollo client
 * @param statusCode - HTTP status code to check for
 * @returns Boolean indicating if error matches the status code
 */
export const isGraphQLError = (
  error: unknown,
  statusCode: number
): boolean => {
  return getGraphQLErrorStatus(error) === statusCode;
};
