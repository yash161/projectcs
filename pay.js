/*eslint-disable no-undef-expression, no-unused-params, semi*/
const express=require('express');
const app=express();
const router=express.Router();
const path=__dirname + '/views/';
var port = process.env.VCAP_APP_PORT || 8000;
router.use(function (req, res,next){
 console.log('/' +req.method);
 next();
});
router.get('/pay',function(req,res){
    res.sendFile(path + 'pay.html') 
});
app.use(express.static(path));
app.use('/',router);
app.listen(port,function()
{
    console.log('port 8080')
})