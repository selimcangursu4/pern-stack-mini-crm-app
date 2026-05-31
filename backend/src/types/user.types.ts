export interface RegisterDTO {
    id: string
    fullname: string
    business_email: string
    password?: string
    department_id?: number
    role_id?: number
    birthday?: Date
    tc_no?: string
    individual_email?: string
    birthplace?: string
    gender_id?: number
    marital_status_id?: string
    phone?: string
    business_phone?: string
    address?: string
    city_id?: number
    district_id?: number
    starting_work?: Date
    date_of_leaving?: Date
    employee_status_id?: string
    created_at?: Date
}

export interface UpdateUserDTO{
    fullname: string
    business_email: string
    birthday?: Date
    tc_no?: string
    individual_email?: string
    birthplace?: string
    gender_id?: number
    marital_status_id?: string
    phone?: string
    business_phone?: string
    address?: string
    city_id?: number
    district_id?: number
    starting_work?: Date
    date_of_leaving?: Date
}