export interface WorkshopItem {
    _id: string
    name: string
    description: string
    instructor: string
    workshopDate: string
    location: string
    capacity: number
    isActive?: boolean
}

export interface WorkshopJson {
    success: boolean
    count: number
    data: WorkshopItem[]
}

export interface RegistrationItem {
    _id: string
    workshop: WorkshopItem | null
    user: {
        _id: string
        name: string
        email: string
        tel: string
        role: string
    }
    createdAt: string
}

export interface RegistrationJson {
    success: boolean
    count: number
    data: RegistrationItem[]
}

// item stored in the redux cart before the member confirms the registration
export interface CartItem {
    workshopId: string
    workshopName: string
    workshopDate: string
    location: string
    instructor: string
}
