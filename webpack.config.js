const p=require('path');
const h=require('html-webpack-plugin')
module.exports={
    module:{
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "sass-loader" 
                ]
            }
        ]
        
    },
    devServer:{
        contentBase:p.join(__dirname,"dist"),
        compress:true,
        port:3000,
        before:function(app,server){
            app.get('/data',function(req,res){
                res.json(["red"]);
            })
        }
    },
    plugins:[
       new h({
           filename:'app.html',
           template:'./index.html',
       })
    ]
    
}