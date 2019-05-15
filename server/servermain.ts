import * as Koa from "koa";
import * as KoaRouter from "koa-router";

import * as CoBody from "co-body";

const app=new Koa();
const router=new KoaRouter();

let db=(require("coco-sqlite") as CocoSQLite)("db.sqlite");


router.get("/hw",async (ctx) => {
	try {
		let data=await db.query<{id:number,done:number,text:string}>("SELECT * FROM items");
		//data.rows[0].
		console.log(data);
	} catch (err) {
		console.log(err);
		ctx.body="Error:"+err;
	}
	ctx.body="Hello world";
});

router.get("/api/1/items",async (ctx) =>{

});

app.use( require("koa-static")("../public") );
app.use(router.middleware());
app.listen(8080);