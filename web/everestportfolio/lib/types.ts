export type Category = "Frontend" | "Backend" | "Database" | "DevOps";

export interface Skill {
    name: string,
    category: Category
    icon: string
    alt: string
}
