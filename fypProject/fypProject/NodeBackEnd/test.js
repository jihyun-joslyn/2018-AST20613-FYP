const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
var router = express.Router();
app.use(router);
//var cookies = require('cookies');

const connection = mysql.createConnection({
    //properties...
    host:'localhost',
    user:'root',
    password:'880818',
    database:'fyp',
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected');
    }
});

/*app.use(function(req,res,next){
    req.cookies = new cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        var str1 = req.cookies.get('userinfo');
        req.userInfo = JSON.parse(str1);
        User.findById(req.userinfo.user_id).then(function(userInfodata){
            req.userInfo.isadmin = Boolean(userInfodata.isadmin);
        });
    }
    next();
});*/

app.get('getArticleList', function(req, res) {
	var artList = 'SELECT title, status FROM article WHERE salesID = ?';
	var param = [req.body.salesID];
	
	connection.query(artList, param, function(err, rows, field) {
		if(err)
		{
			console.log(err.message);
			res.json({error: err.message, code: 400});
		}
		else
		{	
			console.log('success search');
			res.json({rows, code: 200});
		}
	})
});
			

/*app.post('login',function(req,res){
    var login = 'SELECT password FROM salesman WHERE sales_ID = ?';
    var param = [req.body.sales_ID];
    connection.query(login,param,function(error,rows,field){
        if(rows = '')//
        {
            console.log('account not exist');
            res.json(106);
        }else{
            console.log('login success');
            res.json(203);
            req.cookies.set('userinfo',JSON.stringify({
                "user_ID":userinfo.sales_ID
            }));

            var signin = 'SELECT article_ID, post_time, title, sales_ID, status FROM article WHERE sales_ID = ?';
            var param = [req.cookies.sales_ID];
            connection.query(signin,param,function(error, rows, field){
                if(error)
                {
                    console.log(error.message);
                }else{
                    console.log('loading success');
                    res.json(201);
                }
            })
        }
    });
})
*/

/*app.post('/user_changepwd',function(req,res){
    var v_pwd = 'SELECT password FROM user WHERE userID = ?';
    var param = [req.body.userID];
    connection.query(v_pwd,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
        }else{
            res.json(303);
            if(req.body.password == rows){
                var n_pwd = 'UPDATE user SET password = ? WHERE userID = ?';
                var param = [req.body.password, req.body.userID];
                connection.query(n_pwd,param,function(error,rows,field){
                    if(error)
                    {
                        console.log(error.message);
                    }else{
                        res.json(304);
                        console.log('password update success');
                    }
                })
            }else{
                res.json(305);
                console.log('password input is wrong');
            }
        }
    })
})*/

app.get('/userIDPWD', function(req, res) {
	var getID = 'SELECT userID, password FROM user WHERE userID = ?';
	var param = [req.body.userID];
	
	connection.query(getID, param, function(err, rows,field) {
		if(err) 
		{
			console.log(err.message);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(getID, param);
			console.log('success search');
			res.json({rows, code: 200});
		}
	})
});

app.post('updatePWD', function(req, res) {
	var upID = 'UPDATE user SET password = ? WHERE userID = ?';
	var param = [req.body.password, req.body.userID];
	
	connection.query(upID, param, function(err, rows, field) {
		if(err)
		{
			console.log(err.message);
			res.json({error: 'update fail!', code: 308});
		}
		else
		{
			console.log('success');
			res.json({error: 'update success', code: 304});
		}
	})
});

app.get('/events/article',function(req,res){
    var article = 'DELETE FROM article WHERE articleID = ? AND status = 0';
    var param = [req.body.articleID];
    connection.query(article,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json({error: 'delete error', code: 107});
        }else{
            console.log('article delete success');
            res.json({error: 'delete success', code: 205});
        }
    });
});

app.get('/salesman_information',function(req,res){
    var information = 'SELECT * FROM salesmen WHERE salesID = ?';
    var param = [req.body.salesID];
    connection.query(information,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json({error: 'error', code: 111});	//can login then must hv info 
        }else{
            console.log('information select success');
			res.json({rows, code: 200});
        }
    });
});

app.post('/salesman_information_edit',function(req,res){
    var article = 'UPDATE salesmen SET engName = ?, chiName = ?, telNo = ?, email = ?, WeChatID = ?, slogan = ?, introduction = ? WHERE salesID = ?';
    var param = [req.body.engName, req.body.chiName, req.body.telNo, req.body.email, req.body.WeChatID, req.body.slogan, req.body.introduction, req.body.salesID];
    connection.query(article,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json({error: 'update fail', code: 110});
        }else{
            console.log('salesman information update success');
            res.json({error: 'update success', code: 207});
        }
    });
});

app.post('/user_information',function(req,res){
    var information = 'SELECT * FROM user WHERE userID = ?';
    var param = [req.body.userID];
    connection.query(information,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json({error: 'error', code: 112});
        }else{
            console.log('information select success');
			res.json({rows, code: 200});
        }
    });
});

app.post('/user_information_edit',function(req,res){
    var user_information = 'UPDATE user SET engName = ?, chiName = ?, telNo = ?, email = ? , WeChatID = ? WHERE userID = ?';
    var param = [res.body.engName, res.body.chiName, req.body.telNo, req.body.email, req.body.WeChatID, req.body.userID];
    connection.query(article,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json({error: 'update error', code: 102});
        }else{
            console.log('user information update success');
            res.json({error: 'update success', code: 206});
        }
    });
});

app.listen(3000);