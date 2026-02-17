export enum Category {
    Frontend = "Frontend",
    Backend = "Backend",
    Database =  "Database",
    DevOps = "DevOps",
    Framework = "Framework",
}
export interface Skill {
    name: string,
    category: Category
}
