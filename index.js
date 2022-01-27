const express=require('express'),
      mongoose=require('mongoose'),
      bodyparser=require('body-parser'),
      cors = require("cors")
const PORT=process.env.PORT||5000;

app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
require('dotenv').config()

app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/user'));


mongoose.connect(process.env.MONGOURI,{ useNewUrlParser: true,useUnifiedTopology: true })
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo !!')
})
mongoose.connection.on('error',(err)=>{
    console.log('error connecting to mongo ???',err);
})


app.get('/',(req,res)=>{

    res.send('Hello World')
})

app.listen(PORT,(err)=>{

if(err)
console.log(err)
else console.log('Server Started ...')
}) 