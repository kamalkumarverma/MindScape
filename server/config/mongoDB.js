// import mongoose from 'mongoose'


// const connectdb = async ()=>{

//     mongoose.connection.on('connected',()=>{
//         console.log('database connected');
//     })

//     await mongoose.connect(`${process.env.MONGODb_URI}/imagify`)
// }

// export default connectdb

import mongoose from 'mongoose'

const connectdb = async () => {
    try {
        // await mongoose.connect(`${process.env.MONGODb_URI}/imagify`, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        await mongoose.connect(`${process.env.MONGODB_URI}/imagify`);

        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default connectdb;
