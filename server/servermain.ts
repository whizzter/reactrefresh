import * as Koa from "koa";
import * as KoaRouter from "koa-router";

import * as CoBody from "co-body";
import CocoSQLite from "coco-sqlite";

import {TodoItem} from "../shared/sharedtododefs";

const app=new Koa();
const router=new KoaRouter();

let db=CocoSQLite("db.sqlite");

router.get("/hw",async (ctx) => {
	ctx.body="Hello world";
});

router.get("/api/1/items",async (ctx) =>{
	try {
		let data=await db.query<TodoItem>("SELECT * FROM items");
		ctx.body={items:data.rows};
	} catch (err) {
		console.log(err);
		ctx.throw(500,err);
	}
});


let maxItemSize=10000;

router.put("/api/1/items/:id",async (ctx)=>{
	try {
		//console.log("Update item "+ctx.params.id);
		const body=await CoBody.json(ctx,{limit:maxItemSize}) as TodoItem;
		body.id=(ctx.params.id|0) as any;
		await db.update("items",body,(item)=>{
			// TODO: check item ownership,etc
			return true;
		});
		ctx.body=body;
	} catch (err) {
		console.log(err);
		ctx.throw(500,err);		
	}

});

app.use( require("koa-static")("../public") );
app.use(router.middleware());
app.listen(8080);