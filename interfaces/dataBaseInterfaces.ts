
export interface IUserdata {
    id?:number ;
    username?: string;
    password?: string;
    email?: string;
    phone?: number;
} ;

export interface IPostData {
    id?:number ;
    content?:string ;
    description?:string ;
    url?:string ;
    created_at?:string ;
    updated_at?:string ;
    title?:string ;
    user_id?:number ;
}