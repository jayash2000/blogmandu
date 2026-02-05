import { H3Event } from "h3";

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, any> | Record<string, any>[];
}

export const createApiResponse = (
  event: H3Event,
  code: number,
  success: boolean,
  message: string,
  data?: any,
) => {
  setResponseStatus(event, code);
  return { success, message, data };
};
