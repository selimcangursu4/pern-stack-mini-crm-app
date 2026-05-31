export interface CreateCustomerDTO {
    fullname: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    country?: string;
    agent_id?: number;
    data_status_id?: number;
    data_source_id?: number;
    notes?: string;
}

export interface UpdateCustomerDTO {
    fullname?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    agent_id?: number;
    data_status_id?: number;
    data_source_id?: number;
    notes?: string;
}

export interface CustomerFilterDTO {
    search?: string;
    city?: string;
    country?: string;
    agent_id?: number;
    data_status_id?: number;
    data_source_id?: number;
    limit?: number;
    offset?: number;
}