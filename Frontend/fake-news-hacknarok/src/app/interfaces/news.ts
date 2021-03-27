export interface News {
    id:number,
    tags:Tag[],
    createdAt:string,
    updatedAt:string,
    publishDate:string,
    url:string,
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