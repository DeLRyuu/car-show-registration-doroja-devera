import type {
  RegistrationFilters,
  RegistrationsResponse,
  Summary,
} from "../types/registration";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}


export function getRegistrations(
  filters: RegistrationFilters,
): Promise<RegistrationsResponse> {
  const params = new URLSearchParams();

  if (filters.participantName) {
    params.set("participantName", filters.participantName);
  }
  if (filters.type) params.set("type", filters.type);
  if (filters.status) params.set("status", filters.status);
  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));

  return request<RegistrationsResponse>(`/api/registrations?${params}`);
}


export function getSummary(): Promise<Summary> {
  return request<Summary>("/api/registrations/summary");
}