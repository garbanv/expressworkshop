const express = require('express');
const { urlencoded } = require('express');
const app = express();
const fs = require('fs');
app.use(urlencoded({extended:true}));
app.use(express.json());
const port = 3000;


app.get('/posts', (req,res)=>{
    const db =require('./db.json');
res.json(db)

})

app.post("/posts", (req,res)=>{
    const db =require('./db.json');
    const newPost = req.body;
    newPost.id=db.length+1;
    db.push(newPost);
    var json = JSON.stringify(db);
    fs.writeFileSync('db.json',json)
    res.json(newPost)
})

app.put("/posts/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const db =require('./db.json');
    const filtered = db.find(post => post.id=== id)
    filtered.title = req.body.title
    var json = JSON.stringify(db);
    fs.writeFile('db.json',json,()=>{console.log("updated")})
    res.json(filtered)
})

app.get('/posts/:id', (req,res)=>{
    const db =require('./db.json');
    const id = parseInt(req.params.id);
    const filterById = db.filter(post => post.id ===id)
    res.json(filterById[0])
    
    })

app.get('/posts/author/:authorName', (req,res)=>{
    const db =require('./db.json');
    const authorName =req.params.authorName;
    const filterById = db.filter(post => post.Author ===authorName)
    res.json(filterById[0])
    
    })

app.delete('/posts/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const db =require('./db.json');
    const index = db.indexOf(db.find(post=>post.id===id))
    if (index > -1) {
    db.splice(index, 1);
    var json = JSON.stringify(db);
    fs.writeFile('db.json',json,()=>{console.log("updated")})
    }
    res.json(db)
})

app.listen(port, ()=> console.log("Server live"));