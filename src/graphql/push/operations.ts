import { gql } from "@apollo/client";

export const REGISTER_PUSH_DEVICE_MUTATION = gql`
  mutation RegisterPushDevice($input: RegisterPushDeviceInput!) {
    registerPushDevice(input: $input)
  }
`;

export const UNREGISTER_PUSH_DEVICE_MUTATION = gql`
  mutation UnregisterPushDevice($token: String!) {
    unregisterPushDevice(token: $token)
  }
`;
