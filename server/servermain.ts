import * as Koa from "koa";
import * as KoaRouter from "koa-router";

import * as CoBody from "co-body";

const app=new Koa();
const router=new KoaRouter();

import {TodoItem} from "../shared/sharedtododefs";

let db=(require("coco-sqlite") as CocoSQLite)("db.sqlite");


router.get("/hw",async (ctx) => {
	try {
		let data=await db.query<TodoItem>("SELECT * FROM items");
		ctx.body={items:data.rows};
	} catch (err) {
		console.log(err);
		ctx.throw(500,err);
	}
//	ctx.body="Hello world";
});

router.get("/api/1/items",async (ctx) =>{

});

app.use( require("koa-static")("../public") );
app.use(router.middleware());
app.listen(8080);