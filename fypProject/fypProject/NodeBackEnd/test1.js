const express = require('express');
const mysql = require('mysql');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
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

/*
app.use(function(req,res,next){
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
});
*/

app.get('/',function(req,res){
    connection.query('SELECT * FROM user ORDER by user_ID', function(error, rows, fields){
        if(!!error){
            console.log('Error in the query');
            res.json(302,'fail in getting data');
        }else{
            console.log('Successful query');
            console.log(rows);
            res.json(301,'success in getting data');
        }
    })
});

app.get('/register',function(req,res){
    var add = 'insert into user(user_ID, password) values(?,?)';
    var param = [req.body.user_ID,req.body.password];
    connection.query(add, param, function(error, result){
        if(error)
        {
            console.log(error.message);
            res.json(104);
        }else{
            console.log('register success');
            res.json(202);
        }
    });
    
});

app.get('/login',function(req,res){
    var login = 'SELECT password FROM user WHERE user_ID = ?';
    var param = [req.body.user_ID];
    connection.query(login,param,function(error,rows,field){
        if(rows = '')//
        {
            console.log('account not exist');
            res.json(106);
        }else{
            console.log('login success');
            res.json(203);
            req.cookies.set('userinfo',JSON.stringify({
                "user_ID":userinfo.user_ID
            }));

            var signin = 'SELECT event_ID, date, event_name, company_ID FROM reservation NATURAL JOIN event WHERE user_ID = ?';
            var param = [req.cookies.user_ID];
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
});

app.post('login',function(req,res){
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


app.post('/user_changepwd',function(req,res){
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
                        res.json({rows,code:304});
                        console.log('password update success');
                    }
                })
            }else{
                res.json(305);
                console.log('password input is wrong');
            }
        }
    })
})

app.post('/events',function(req,res){
    var event = 'SELECT * FROM event WHERE event_ID = ?';
    var param = [req.body.event_ID];
    connection.query(event,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json(113);
        }else{
            console.log('loading event success');
            res.json(208);
        }
    });
});

app.post('/events/article',function(req,res){
    var article = 'UPDATE article SET title = ?, post_time = NOW() WHERE sales_ID = ?';
    var param = [req.body.title, req.body.sales_ID];
    connection.query(article,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json(108);
        }else{
            console.log('article update success');
            res.json(204);
        }
    });
});

app.get('/events/article',function(req,res){
    var article = 'DELETE FROM article WHERE article_ID = ? AND status = 0';
    var param = [req.body.article_ID];
    connection.query(article,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json(107);
        }else{
            console.log('article delete success');
            res.json(205);
        }
    });
});

app.get('/salesman_information',function(req,res){
    var information = 'SELECT * FROM salesman WHERE sales_ID = ?';
    var param = [req.body.sales_ID];
    connection.query(information,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json(111);
        }else{
            console.log('information select success');
        }
    });
});

app.post('/salesman_information_edit',function(req,res){
    var article = 'UPDATE salesman SET contact_number = ?, Email = ?, WeChat_ID = ?, website = ?, Introduction = ? WHERE sales_ID = ?';
    var param = [req.body.telNo, req.body.email, req.body.WeChatID, req.body.website, req.body.Introduction];
    connection.query(article,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json(110);
        }else{
            console.log('salesman information update success');
            res.json(207);
        }
    });
});

app.get('/user_information',function(req,res){
    var information = 'SELECT * FROM user WHERE userID = ?';
    var param = [req.body.userID];
    connection.query(information,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json({rows,code:112});
        }else{
            console.log('information select success');
        }
    });
});

app.get('/user_information_edit',function(req,res){
    var user_information = 'UPDATE user SET chiName = ?, engName = ?, email = ? , WeChatID = ?, telNo = ? WHERE userID = ?';
    var param = [req.body.chiName, req.body.engName, req.body.email, req.body.WeChatID, req.body.telNo, req.body.userID];
    connection.query(user_information,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json(109);
        }else{
            console.log('user information update success');
            res.json({rows,code:206});
        }
    });
});

app.listen(3000);
