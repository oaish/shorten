import Url from "@/models/Url";
import {NextResponse} from "next/server";

export async function GET(req) {
    try {
        const {pathname} = new URL(req.url);
        const parts = pathname.split('/');
        const url = 'https://shnx.vercel.app/' + parts[1];
        const res = await Url.findOne({shortUrl: url});
        console.log(res.longUrl)
         return NextResponse.redirect(res.longUrl);
    } catch (e) {
        console.log(e)
        return new Response(JSON.stringify({error: e}), {status: 500});
    }
}