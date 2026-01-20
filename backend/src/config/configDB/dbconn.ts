import mongoose from "mongoose"

const DBConnect = async () => {
  try{
    mongoose.connect(process.env.DATABASE_URI!)

  }catch(err) {
    console.log(err)
  }
}

export default DBConnect