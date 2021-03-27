export interface News {
    id:number,
    tags:Tag[],
    createdAt:string,
    updatedAt:string,
    news:NewsContent
}
export interface NewsContent{
    id:number,
    title:string,
    description:string,
    source:string,
    veracityAI:number,
    veracityUser:number
}
export interface Tag{
    id:number,
    tagname:string
}