import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
});

let Url =  null;

try {
    Url = mongoose.model('Url');
} catch (e) {
    Url = mongoose.model('Url', urlSchema);
}

export default Url