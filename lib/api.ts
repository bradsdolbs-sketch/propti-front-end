export type TenantStatus = "PENDING" | "ACTIVE";
export type AgentStatus = "PENDING" | "VERIFIED";

export interface Tenancy {
  id: string;
  landlordId: string;
  propertyId: string;
  tenantId: string;
  tenantName?: string;
  tenantEmail?: string;
  ownerId?: string;
  ownerEmail?: string;
  startDate?: string;
  monthlyRent?: number;
  tenantStatus: TenantStatus;
  inviteSentAt?: string;
  inviteAcceptedAt?: string;
  referenceStatus?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  agreementStatus?: "NOT_SENT" | "SENT" | "SIGNED";
}

export interface Invite {
  id: string;
  tenantEmail: string;
  tenantId?: string;
  tenancyId?: string;
  inviterRole?: string;
  inviteeRole?: string;
  inviterName?: string;
  propertyAddress?: string;
  status: "PENDING" | "SENT" | "ACCEPTED";
  createdAt: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";

const jsonFetch = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
};

export const api = {
  getCurrentUser: () =>
    jsonFetch<{ id: string; role: string; email?: string; name?: string; phone?: string; companyName?: string }>("/api/me"),
  getTenancyForTenant: (tenantId: string) =>
    jsonFetch<Tenancy>(`/api/tenants/${tenantId}/tenancy`),
  listProperties: (landlordId: string) =>
    jsonFetch<
      {
        id: string;
        landlordId: string;
        name: string;
        address: string;
        postcode: string;
        rent: number | null;
        status: string;
        paid?: boolean;
        tenancyId?: string;
        tenantName?: string;
        tenantEmail?: string;
        tenantStatus?: TenantStatus;
        referenceStatus?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
        agreementStatus?: "NOT_SENT" | "SENT" | "SIGNED";
        createdAt: string;
      }[]
    >(`/api/landlords/${landlordId}/properties`),
  createProperty: (landlordId: string, payload: { name: string; address?: string; postcode?: string; rent?: number; paid?: boolean }) =>
    jsonFetch(`/api/landlords/${landlordId}/properties`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getProperty: (id: string) =>
    jsonFetch<{
      id: string;
      landlordId: string;
      name: string;
      address: string;
      postcode: string;
      rent: number | null;
      status: string;
      paid?: boolean;
      tenancyId?: string;
      tenantName?: string;
      tenantEmail?: string;
      tenantStatus?: TenantStatus;
      referenceStatus?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
      agreementStatus?: "NOT_SENT" | "SENT" | "SIGNED";
      createdAt: string;
    }>(`/api/properties/${id}`),
  updateProperty: (id: string, payload: { name?: string; address?: string; postcode?: string; rent?: number; paid?: boolean }) =>
    jsonFetch(`/api/properties/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteProperty: (id: string) =>
    fetch(`${API_BASE}/api/properties/${id}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
    }),
  activateTenancy: (tenancyId: string) =>
    jsonFetch<Tenancy>(`/api/tenancies/${tenancyId}/activate`, { method: "POST" }),
  createTenancy: (params: {
    landlordId: string;
    propertyId: string;
    tenantId: string;
    tenantName?: string;
    tenantEmail?: string;
    ownerId?: string;
    ownerEmail?: string;
    startDate?: string;
    monthlyRent?: number;
  }) =>
    jsonFetch<Tenancy>(
      `/api/landlords/${params.landlordId}/properties/${params.propertyId}/tenancies`,
      {
        method: "POST",
        body: JSON.stringify({
          tenantId: params.tenantId,
          tenantName: params.tenantName,
          tenantEmail: params.tenantEmail,
          ownerId: params.ownerId,
          ownerEmail: params.ownerEmail,
          startDate: params.startDate,
          monthlyRent: params.monthlyRent,
        }),
      }
    ),
  getAgentStatus: (agentId: string) =>
    jsonFetch<{ agentId: string; status: AgentStatus; updatedAt: string | null }>(
      `/api/agents/${agentId}`
    ),
  verifyAgent: (agentId: string) =>
    jsonFetch<{ agentId: string; status: AgentStatus; updatedAt: string | null }>(
      `/api/agents/${agentId}/verify`,
      { method: "POST" }
    ),
  completeReferences: (tenancyId: string) =>
    jsonFetch<Tenancy>(`/api/tenancies/${tenancyId}/references/complete`, { method: "POST" }),
  sendAgreement: (tenancyId: string) =>
    jsonFetch<Tenancy>(`/api/tenancies/${tenancyId}/agreement/send`, { method: "POST" }),
  signAgreement: (tenancyId: string) =>
    jsonFetch<Tenancy>(`/api/tenancies/${tenancyId}/agreement/sign`, { method: "POST" }),
  listDocuments: (tenancyId: string) =>
    jsonFetch<
      {
        id: string;
        name: string;
        type: string;
        url: string;
        sharedWith: string;
        createdAt: string;
      }[]
    >(`/api/tenancies/${tenancyId}/documents`),
  createDocument: (tenancyId: string, payload: { name: string; type: string; url?: string; sharedWith: string }) =>
    jsonFetch(`/api/tenancies/${tenancyId}/documents`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  sendTenantInvite: (payload: { tenantEmail: string; inviterRole: string; tenancyId?: string; inviteeRole?: string }) =>
    jsonFetch<Invite>("/api/invites/tenant", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  listTenantInvites: (tenantId: string) => jsonFetch<Invite[]>(`/api/invites/tenant/${tenantId}`),
  acceptInvite: (inviteId: string) =>
    jsonFetch<Invite>(`/api/invites/${inviteId}/accept`, { method: "POST" }),
  declineInvite: (inviteId: string) =>
    jsonFetch<Invite>(`/api/invites/${inviteId}/decline`, { method: "POST" }),
  getUserByEmail: (email: string) =>
    jsonFetch<{ id: string; email: string; role: string; name?: string }>(
      `/api/users/by-email/${encodeURIComponent(email)}`
    ),
  updateMyName: (name: string) =>
    jsonFetch<{ id: string; email: string; role: string; name?: string }>(
      "/api/users/me/name",
      {
        method: "PUT",
        body: JSON.stringify({ name }),
      }
    ),
  updateMyRole: (role: string) =>
    jsonFetch<{ id: string; email: string; role: string; name?: string }>(
      "/api/users/me/role",
      {
        method: "PUT",
        body: JSON.stringify({ role }),
      }
    ),
  updateMyProfile: (payload: { name?: string; phone?: string; companyName?: string; email?: string }) =>
    jsonFetch<{ id: string; email: string; role: string; name?: string; phone?: string; companyName?: string }>(
      "/api/users/me/profile",
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    ),
};
