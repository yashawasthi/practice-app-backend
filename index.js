const express=require("express");
const mongoose=require("mongoose");
const post=require("./post.js");
const cors= require("cors")
require('dotenv').config({
  path:"./config.env"
});

const app=express();

app.use(express.json());
app.use(cors());


(async function connectDB(){
  try {
      await mongoose.connect(`${process.env.MONGO_URL}`);
      console.log("Connect to MongoDB successfully")
  } catch (error) {
      console.log("Connect failed " + error.message )
  }
})()

app.get('/', (req, res) => {
 res.send('Hello, my dear world!');
});

app.get('/posts', async (req, res) => {
    try {
        const data = await post.find({})
    
        if (data) {
          return res.status(200).json({
            msg: "Ok",
            data,
          });
        }
    
        return res.status(404).json({
          msg: "Not Found",
        });
      } catch (error) {
        return res.status(500).json({
          msg: error.message,
        });
      }
   });



 app.post('/savePost',async (req, res) => {
    try {
      console.log(req.body.title )
      console.log(req.body.description )
      const { title,description } = req.body;
      const newPost=new post({title,description});
      const data = await newPost.save();

      return res.status(200).json({
        msg: "Ok",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        msg: error.message,
      });
    }
  })

   
   
app.route("/users").get((req, res,next) => {
    res.status(200).json({
        users:[],
        success:false,
    });
});

const port=process.env.PORT || 3000

app.listen(port, () => {
 console.log(`App listening at port ${port}`);
});