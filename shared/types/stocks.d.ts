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
    data: any[]
}