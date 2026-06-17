export type ApiErrorKind =
  | 'network'
  | 'timeout'
  | 'unauthorized'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'validation'
  | 'rate_limited'
  | 'server_error'
  | 'cancelled'
  | 'unknown';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly ref?: string;
  readonly fieldErrors?: Record<string, string>;

  constructor(params: {
    message: string;
    kind: ApiErrorKind;
    status?: number;
    ref?: string;
    fieldErrors?: Record<string, string>;
  }) {
    super(params.message);
    this.name = 'ApiError';
    this.kind = params.kind;
    this.status = params.status;
    this.ref = params.ref;
    this.fieldErrors = params.fieldErrors;
  }
}

function statusToKind(status: number): ApiErrorKind {
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'not_found';
  if (status === 409) return 'conflict';
  if (status === 422) return 'validation';
  if (status === 429) return 'rate_limited';
  if (status >= 500) return 'server_error';
  return 'unknown';
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  // Axios errors have an isAxiosError flag
  const axiosErr = error as {
    isAxiosError?: boolean;
    response?: {
      status: number;
      data?: {
        message?: string;
        errors?: Record<string, string[]> | Array<{ detail: string }>;
      };
    };
    code?: string;
    message?: string;
    config?: { url?: string };
  };

  if (axiosErr.isAxiosError) {
    if (axiosErr.code === 'ECONNABORTED') {
      return new ApiError({ message: 'Request timed out', kind: 'timeout' });
    }
    if (axiosErr.code === 'ERR_CANCELED') {
      return new ApiError({ message: 'Request cancelled', kind: 'cancelled' });
    }
    if (!axiosErr.response) {
      return new ApiError({ message: 'Network error', kind: 'network' });
    }

    const status = axiosErr.response.status;
    const kind = statusToKind(status);
    const data = axiosErr.response.data;
    const message = data?.message ?? axiosErr.message ?? `HTTP ${status}`;

    // Parse field-level validation errors (422)
    let fieldErrors: Record<string, string> | undefined;
    if (kind === 'validation' && data?.errors && !Array.isArray(data.errors)) {
      fieldErrors = {};
      for (const [field, msgs] of Object.entries(data.errors)) {
        fieldErrors[field] = Array.isArray(msgs) ? (msgs[0] ?? '') : String(msgs);
      }
    }

    return new ApiError({ message, kind, status, fieldErrors });
  }

  if (error instanceof Error) {
    return new ApiError({ message: error.message, kind: 'unknown' });
  }

  return new ApiError({ message: String(error), kind: 'unknown' });
}
