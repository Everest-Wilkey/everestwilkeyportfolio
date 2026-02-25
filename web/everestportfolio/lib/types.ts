export enum Category {
    Frontend = "Frontend",
    Backend = "Backend",
    Database =  "Database",
    DevOps = "DevOps",
}
export interface Skill {
    name: string,
    category: Category
    icon: string
    alt: string
}
