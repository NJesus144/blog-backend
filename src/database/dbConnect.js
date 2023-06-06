import mongoose from "mongoose";


console.log()
const connectDatabase = () => {
    console.log("Wait connecting to the database");

    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }) 
        .then(() => console.log("MongoDB Atlas Connected"))
        .catch((error) => console.log(error));
};

export default connectDatabase;
