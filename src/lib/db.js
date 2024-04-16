import mongoose from 'mongoose'

export default async function connectDB() {
    const uri = 'mongodb+srv://mercenary:gx4vE6fZ1F9zCT7m@mercenarycluster.k8r01yr.mongodb.net/ShortenDB?retryWrites=true&w=majority';
    try {
        if (mongoose.connections[0].readyState) {
            return
        }
        console.log("Mongo DB Connected")
        await mongoose.connect(uri)
    } catch (e) {
        console.error(e)
    }
}
