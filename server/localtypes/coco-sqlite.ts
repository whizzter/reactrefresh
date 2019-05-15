interface CocoSqliteAPI {
	query<T=any>(qs:string,...args:any):Promise<{rowCount:number,rows:[T]}>;
}
declare interface CocoSQLite {
	(dbfile:string):CocoSqliteAPI;
}

// declare module "coco-sqlite" {

// 	export = CocoSqliteBase;
// }