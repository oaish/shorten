import Url from "@/models/Url";
import connectDB from "@/lib/db";
import {getRandomHex} from "@/lib/helpers";

export async function POST(req) {
    let {url : urlString} = await req.json();
    await connectDB();

    const urlExists = await Url.findOne({longUrl: urlString});
    if (urlExists) {
        return new Response(JSON.stringify({ url: urlExists.shortUrl }), { status: 200 });
    }

    const domain = 'https://shx.vercel.app/'
    let shortUrl = domain + getRandomHex();
    while (await Url.findOne({shortUrl})) {
        shortUrl = domain + getRandomHex();
    }

    const url = new Url({longUrl: urlString, shortUrl: shortUrl});
    await url.save();
    return new Response(JSON.stringify({ url: shortUrl }), { status: 200 });
}