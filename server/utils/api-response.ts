import { H3Event } from "h3";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
  path?: string;
}

export const createApiResponse = <T>(
  event: H3Event,
  statusCode: number,
  success: boolean,
  message: string,
  data?: T,
): ApiResponse<T> => {
  setResponseStatus(event, statusCode);

  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
    path: event.path,
  };
};
