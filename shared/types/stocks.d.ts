export interface CreateAdvisoryInput {
    intro: string
    country: string
    industry: string
    description:string
    image: File
}

export interface CreateAdvisoryOutput {
    success: boolean
    data: {
        id: string
        industry: string
        updatedAt: string
        createdAt: string
    }
}

export interface GetAdvisory{
    success: boolean
    data: Advisory[]
}

export interface Advisory {
    country: string
    createdAt: string
    deletedAt: string | null
    description: string
    id: string
    image: string
    industry: string
    intro: string
    status: string
    updatedAt: string
}

export interface DraftsToMain {
    stockAdvisoryId: string
}