const morgan = require('morgan');
const express = require('express');
const mysql = require('mysql');
const multer  = require('multer');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request')
const toString = require('stream-to-string')
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
const cors = require('cors');
app.use(cors());
app.use(morgan('dev'));
//var stream= fs.readStream('filename')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../webProject/src/image')	//need to change after upload to server
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

//create database connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '880818',
  database : 'fyp'
});

db.connect((err)=>{
  if(err){
	  console.log(err);
      throw err;
  }
  console.log('MySQL connected');
});
//edit the article
app.post('/editArticle', async(req, res)=>{
	fs.unlink('./article'+req.body.name+'.json', (err)=>{
		if(err) 
			console.log(err);
		console.log('Successful delete!');
	});
	let object = {};
	object ["article"]= req.body.article;
	fs.writeFile('./article/'+req.body.name+'.json', JSON.stringify(object), (err)=>{
		if (err) {
			console.log('Edit file '+req.body.name+' failed');
			res.send(err)
			console.log(err);
		}else{
			console.log('Edit file '+req.body.name+' successfully');
		}
	})
})
//read the article
app.post('/readArticle', async(req, res)=>{
	let artName = req.body.name;
	fs.readFile('./article/'+artName+".json", (err, data)=>{
		if (err) console.log(err);
		else
			res.body = data;
	});
})
//save the article
app.post('/saveArticle', async(req, res)=>{
	let object = {};
	object ["article"]= req.body.article;
	fs.writeFile('./article/'+req.body.name+'.json', JSON.stringify(object), (err)=>{
		if (err) {
			console.log('Write file '+req.body.name+' failed');
			//res.send(err)
			console.log(err);
		}else{
			console.log('Write file '+req.body.name+' successfully');
			
	
		}
		
		var number = 'SELECT COUNT(*) + 1 as count FROM article' 
	var index;
	db.query(number,function(err, results, fields){
		if(err) 
		{
			console.log(err);
			//res.json({error: 'article already exist', result: err.message, code: 104});
			//throw err;
		}
		else
		{
			console.log('get the count of the table success');
			//res.json({error: 'register success', results, code: 202});
			console.log(results);
			index = results[0].count;
			console.log(index);
			var website = "http://localhost/fyp/NodeBackEnd/article/readArticlePage/" + "/" + index;
			console.log(website);
			var insert = 'INSERT INTO article (articleID, title, eventID, salesID, status, URL) VALUES (?, ?, ?, ?, ?, ?)';
	var info = [index,req.body.name, req.body.eventID, req.body.salesID, req.body.status, website];
  
	db.query(insert,info,function(err, results, fields){
		if(err) 
		{
			console.log(err);
			res.json({error: 'article already exist', result: err.message, code: 104});
			//throw err;
		}
		else
		{
			console.log('register success');
			res.json({error: 'register success', results, website,  code: 202});
		}	
    })
		}	
	})
	console.log(index);
	//index = num
	
	})
	
})
//scrape the article

app.post('/updateArticle', async(req, res)=>{
	let object = {};
	object ["article"]= req.body.article;
	fs.writeFile('./article/'+req.body.name+'.json', JSON.stringify(object), (err)=>{
		if (err) {
			console.log('Write file '+req.body.name+' failed');
			//res.send(err)
			console.log(err);
		}else{
			console.log('Write file '+req.body.name+' successfully');
			
	
		}
	
	var sql = "UPDATE article SET title = ?, status = ?, postTime = NOW() WHERE articleID = ?";
	var param = [req.body.title, req.body.status, req.body.articleID];
	
	db.query(sql, param, function(err, results, fields) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
	
	})
	
});

app.post('/getUserArticle', function(req, res) {
	var sql = "SELECT articleID, title FROM article WHERE salesID = ? AND eventID = ? AND status = 0";
	var param = [req.body.salesID, req.body.eventID];
	
	db.query(sql, param, function(err, results, fields) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(results);
			if(!results[0])
				res.json({results, code: 135});
			else
				res.json({results, code: 235});
		}
	})
});
app.post('/getArticle', async(req, res)=>{
	let url= req.body.url; 
	console.log('my url is: '+ url)
	
	var str = await toString(request(url), (err, msg)=>{
		if(err)
			console.log(err);
		else
	   		return msg;
	})

	var pattern = /<div class="rich_media_content " id="js_content">[^]*?<\/div>/m
	const myarray = str.match( pattern )

	pattern = /<p[^>]*>.*?<\/p>/gm
	const results = myarray[0].match( pattern )
	
	var json ={}
	json["article"] =[]
	var object;
	var i = 0;

	results.forEach(element => {
		object = {id:i,
			p:element}
		json["article"].push(object);
		i++;
	});
	res.json(json); 
})

//login(user) 
//success code:203, error code:106
app.post('/login',function(req,res){
	var info = [req.body.userID];
	var sql = 'SELECT userID, password FROM user WHERE userID = ?';
  
	db.query(sql,info,function(err,results, fields){
		if(err) 
		{
			console.log(err);
			res.send(err);
		}
		else
		{
			console.log(results);
  
			if(!results[0])
			{
				console.log('error'); 
				res.json({error: "account not exist", results, code: 106});
			}
			else 
				res.json({results, code: 203}); 
		}
	})
})

//register(user)
//success code:202, error code:104
app.post('/register',function(req,res){
	var insert = 'INSERT INTO user(userID, password, telNo) VALUES(?, ?, ?)';
	var info = [req.body.userID, req.body.password, req.body.telNo];

	db.query(insert,info,function(err, results){
		if(err) 
		{
			console.log(err);
			res.json({error: 'account already exist', result: err.message, code: 104});
			
			//throw err;
		}
		else
		{
			console.log('register success');
			res.json({error: 'register success', results, code: 202});
		}
	})
})

//login(sales)
//success code:203, error code:106
app.post('/sales_login',function(req,res){
	var info = [req.body.salesID];
	var sql = 'SELECT salesID,password FROM salesmen WHERE salesID = ?';
	
	db.query(sql,info,function(err,results){
		if(err) 
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(results);
			
			if(!results[0]) 
				res.json({error: 'account not exist', result: err.message, code: 106});
			else 
				res.json({results, code: 203});
		}
	})
});

//register(sales)
//success code:202, error code:104
app.post('/sales_register',function(req,res){
	var insert = 'INSERT INTO salesmen (salesID, password, companyID, telNo, QRcode) VALUES (?, ?, ?, ?, ?)';
	var info = [req.body.salesID, req.body.password,req.body.companyID, req.body.telNo, req.body.QRcode];
  
	db.query(insert,info,function(err, results, fields){
		if(err) 
		{
			console.log(err);
			res.json({error: 'account already exist', result: err.message, code: 104});
			//throw err;
		}
		else
		{
			console.log('register success');
			res.json({error: 'register success', results, code: 202});
		}	
    })
});

app.get('/getCompany', function(req,res) {
	var sql = 'SELECT companyID, companyName FROM company';
	db.query(sql, function(err, result) {
		if(err)
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(result);
			res.json({result, code: 200});
		}
	})
});

//login(company)
//success code:203, error code:106
app.post('/company_login',function(req,res){
	var info = [req.body.companyID];
	var sql = 'SELECT companyID,password FROM company WHERE companyID = ?';
  
	db.query(sql,info,function(err,results){
		if(err) 
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(results);
			
			if(!results[0]) 
				res.json({error: 'account not exist', results, code: 106});
			else 
				res.json({results, code: 203});
		}
  })
});

//register(company)
//success code:202, error code:104
app.post('/company_register',function(req,res){
	var insert = 'INSERT INTO company VALUES (?, ?, ?, ?)';
	var info = [req.body.companyID,req.body.password,req.body.companyName,req.body.website];
	
    db.query(insert,info,function(err, results, fields){
		if(err) 
		{
			console.log(err);
			res.json({error: 'account already exist', result: err.message, code: 104});
			//throw err;
		}
		else
		{
			console.log('register success');
			res.json({error: 'register success', results, code: 202});
		}
    })
});

app.post('/companyHome',function(req,res){
	var sql = "SELECT eventID, eventName, eventDes, DATE_FORMAT(startDateTime, '%Y-%m-%d %T') as start, startDateTime, DATE_FORMAT(endDateTime, '%Y-%m-%d %T') as end, endDateTime FROM event WHERE companyID = ?";
	var param = [req.body.companyID];
  
	db.query(sql,param,function(err,results,fields) {
		if(err) 
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
  })
});

app.get('/getEventNo', function(req, res) {
	var getNo = 'SELECT (COUNT(eventID) + 1) as newNum FROM event';
	db.query(getNo, function(err, result) {
		if(err)
		{
			console.log(err)
			throw err;
		}
		else
		{
			console.log(result);
			res.json({result, code: 200});
		}
	})
});
	
//success code:208, error code:105
app.post('/createEvent',function(req,res){
	var insert = 'INSERT INTO event (eventID, eventName, location, eventDes, companyID, startDateTime, endDateTime, resStart, resEnd, eventCap, resLength) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
	var info = [req.body.eventID, req.body.eventName, req.body.location, req.body.eventDes, req.body.companyID, req.body.startDateTime, req.body.endDateTime, req.body.resStart, req.body.resEnd, req.body.eventCap, req.body.resLength];
    
	db.query(insert,info,function(err, results, fields){
		if(err) 
		{
			console.log(err);
			res.json({error: 'create event fail', result: err.message, code: 105});
			throw err;
		}
		else
		{
			console.log(results);
			res.json({error: 'create event success', results, code: 208});
		}
	})
});

//event info
app.post('/eventInfo', function(req,res){
	var param = [req.body.eventID];
	var sql = "SELECT eventName, location, eventCap, eventDes, DATE_FORMAT(startDateTime, '%Y-%m-%d %T') as start, startDateTime, DATE_FORMAT(endDateTime, '%Y-%m-%d %T') as end, endDateTime, resStart, resEnd, DATE(NOW()) AS curr FROM event WHERE eventID = ?";
  
	db.query(sql,param,function(err,results,fields){
		if(err)
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
});

app.post('/getUserEvent', function(req, res) {
	var sql = 'SELECT event.eventID as eveID, eventName, resDate, startTime, endTime, status FROM event INNER JOIN reservation ON event.eventID = reservation.eventID WHERE reservation.userID = ?';
	var param = [req.body.userID];
	
	db.query(sql, param, function(err, results, fields) {
		if(err)
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(results);
			
			if(!results[0])
			{
				console.log('error'); 
				res.json({error: "no registered event", results, code: 115});
			}
			else 
				res.json({results, code: 210});
		}
	})
});

app.post('/getEventTime', function(req, res) {
	var sql = "SELECT DATE_FORMAT(startDateTime, '%Y-%m-%d %T') as start, DATE_FORMAT(endDateTime, '%Y-%m-%d %T') as end, resLength, DATE_FORMAT(startDateTime, '%Y-%m-%d') as startDate, DATE_FORMAT(endDateTime, '%k') as endHour, DATE_FORMAT(startDateTime, '%k') as startHour FROM event WHERE eventID = ?";
	var param = [req.body.eventID];
	
	db.query(sql, param, function(err, results, fields) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
});

app.post('/getUserRes', function(req, res) {
	var sql = "SELECT DATE_FORMAT(resDate, '%Y-%m-%d') as resDate, startTime, status, resID FROM reservation WHERE userID = ? AND eventID = ?";
	var param = [req.body.userID, req.body.eventID];
	
	db.query(sql, param, function(err, results, fields) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(results);
			if(!results[0])
				res.json({results, code: 135});
			else
				res.json({results, code: 235});
		}
	})
});

app.post('/getReservationPeriod', function(req, res) {
	var sql = 'SELECT resStart, resEnd, DATE(NOW()) AS curr FROM event WHERE eventID = ?';
	var param = [req.body.eventID];
	
	db.query(sql, param, function(err, result, fields) {
		if(err)
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(result);
			
			res.json({result, code: 200});
		}
	})
});

app.post('/deleteEvent', function(req, res) {
	var sql = 'DELETE FROM reservation where userID = ? AND eventID = ?';
	var param = [req.body.userID, req.body.eventID];
	
	db.query(sql, param, function(err, results, fields) {
		if(err)
		{
			console.log(err);
			res.json({error: 'delete fail', result: err.message, code: 120});
			//throw err;
		}
		else
		{
			console.log(results);
			console.log('delete success');
			res.json({error: 'delete success', result: results, code: 200});
		}
	})
});
	

app.get('/getResNo', function(req, res) {
        var getNo = 'SELECT (COUNT(resID) + 1) as newNum FROM reservation';
        db.query(getNo, function(err, result) {
                if(err)
                {
                        console.log(err);
                        //throw err;
                }
                else
                {
                        console.log(result);
                        res.json({result, code: 200});
                }
        })
});
//view event reservation info according to eventID
app.post('/reservationInfo',function(req,res){
	var param = [req.body.eventID];
	var sql = 'SELECT user.userID as uID, startTime, endTime, user.profileIMG as proPic FROM reservation INNER JOIN user ON reservation.userID = user.userID WHERE eventID = ? && status = 1';
	
	db.query(sql,param,function(err,results,fields) {
		if(err) 
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
  })
});

//view reservation time according to date
app.post('/reservation_time', function(req,res){
	var param = [req.body.date, req.body.eventID];
	var sql = 'SELECT startTime,endTime FROM reservation WHERE resDate = ? AND eventID = ?';
	
	db.query(sql,param,function(err,results,fields){
		if(err) 
		{
			console.log(err);
			//throw err;
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
});

//reserve event
//success code:113, error code:210 //reverse
app.post('/reserve',function(req,res){
	var insert = 'INSERT INTO reservation VALUES (?, ?, ?, ?, ?, ?, ?)';
	var info = [req.body.resID, req.body.userID, req.body.eventID, req.body.resDate, req.body.startTime, req.body.endTime, req.body.status];
        
	db.query(insert,info,function(err, results, fields){
        if(err) 
		{
			console.log(err);
			res.json({error: 'add reservation fail', result: err.message, code: 113});
			//throw err;
		}
		else
		{
			console.log('add reservation success');
			res.json({error: 'add reservation success', result: results, code: 210});
		}
    })
});

app.post('/user_changepwd',function(req,res){
    var v_pwd = 'SELECT password FROM user WHERE userID = ?';
    var param = [req.body.userID];
    db.query(v_pwd,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
        }else{
            if(req.body.password == rows[0].password){
                var n_pwd = 'UPDATE user SET password = ? WHERE userID = ?';
                var param = [req.body.newPassword, req.body.userID];
                db.query(n_pwd,param,function(error,rows,field){
                    if(error)
                    {
                        console.log(error.message);
                    }else{
                        res.json({rows,code:304});
                        console.log('password update success');
                    }
                })
            }else{
                res.json({code:305});
                console.log('password input is wrong');
            }
        }
    })
});


app.post('/upArticle',function(req,res){
    var article = 'UPDATE article SET title = ?, postTime = NOW() WHERE salesID = ?';
    var param = [req.body.title, req.body.salesID];
    db.query(article,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json({code:108});
        }else{
            console.log('article update success');
            res.json({rows,cod:204});
        }
    });
});

app.post('/delArticle',function(req,res){
    var article = 'DELETE FROM article WHERE articleID = ? AND status = 0';
    var param = [req.body.articleID];
    db.query(article,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json({code:107});
        }else{
            console.log('article delete success');
            res.json({code:205});
        }
    });
});

app.post('/salesman_information',function(req,res){
    var information = 'SELECT * FROM salesmen WHERE salesID = ?';
    var param = [req.body.salesID];
    db.query(information,param,function(error,rows,field){
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
    var article = 'UPDATE salesmen SET engName = ?, chiName = ?, telNo = ?, email = ?, WeChatID = ?, introduction = ? WHERE salesID = ?';
    var param = [req.body.engName, req.body.chiName, req.body.telNo, req.body.email, req.body.WeChatID, req.body.introduction, req.body.salesID];
    db.query(article,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json({error: 'update fail', code: 110});
        }else{
            console.log('salesman information update success');
            res.json({rows,error: 'update success', code: 207});
        }
    });
});

app.post('/user_information',function(req,res){
    var information = 'SELECT * FROM user WHERE userID = ?';
    var param = [req.body.userID];
    db.query(information,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json({rows,code:112});
        }else{
            console.log(rows);
			res.json({rows, code:200});
        }
    });
});

app.post('/user_information_edit',function(req,res){
    var user_information = 'UPDATE user SET chiName = ?, engName = ?, email = ? , WeChatID = ?, telNo = ? WHERE userID = ?';
    var param = [req.body.chiName, req.body.engName, req.body.email, req.body.WeChatID, req.body.telNo, req.body.userID];
    db.query(user_information,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json({code:109});
        }else{
            console.log('user information update success');
            res.json({rows,code:206});
        }
    });
});

app.post('/salesmen_changepwd',function(req,res){
    var v_pwd = 'SELECT password FROM salesmen WHERE salesID = ?';
    var param = [req.body.salesID];
    db.query(v_pwd,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
        }else{
            if(req.body.password == rows[0].password){
                var n_pwd = 'UPDATE salesmen SET password = ? WHERE salesID = ?';
                var param = [req.body.newPassword, req.body.salesID];
                db.query(n_pwd,param,function(error,rows,field){
                    if(error)
                    {
                        console.log(error.message);
                    }else{
                        res.json({rows,code:304});
                        console.log('password update success');
                    }
                })
            }else{
                res.json({code:305});
                console.log('password input is wrong');
            }
        }
    })
})

app.post('/company_information',function(req,res){
    var information = 'SELECT * FROM company WHERE companyID = ?';
    var param = [req.body.companyID];
    db.query(information,param,function(error,rows,field){
        if(error){
            console.log(error.message);
            res.json({rows,code:113});
        }else{
            console.log('information select success');
			res.json({rows, code: 200});
        }
    });
});

app.post('/companyPWD',function(req,res){
	var info = [req.body.companyID];
	var sql = 'SELECT companyID,password FROM company WHERE companyID = ?';
  
	db.query(sql,info,function(err,results){
		if(err) 
		{
			console.log(err);
			throw err;
		}
		else
		{
			console.log(results);
			
			if(!results[0]) 
				res.json({error: 'account not exist', results, code: 106});
			else 
				res.json({results, code: 203});
		}
  })
});

app.post('/company_information_edit',function(req,res){
    var user_information = 'UPDATE company SET companyName = ?, website = ? WHERE companyID = ?';
    var param = [req.body.companyName, req.body.website, req.body.companyID];
    db.query(user_information,param,function(error,rows,field){
        if(error)
        {
            console.log(error.message);
            res.json({code:114});
        }else{
            console.log('user information update success');
            res.json({rows,code:209});
        }
    });
});

app.post('/comNewPWD', function(req, res) {
	var sql = 'UPDATE company SET password = ? WHERE companyID = ?';
	var param = [req.body.password, req.body.companyID];
	
	db.query(sql, param, function(err, result, field) {
		if(err)
		{
			console.log(err);
			res.json({result: err.message, code: 114});
		}
		else
		{
			console.log(result);
			res.json({result, code: 209});
		}
	});
});

app.post('/getArticleList', function(req, res) {
	var artList = 'SELECT articleID, eventID, title, status FROM article WHERE salesID = ?';
	var param = [req.body.salesID];
	
	db.query(artList, param, function(err, rows, field) {
		if(err)
		{
			console.log(err.message);
			res.json({error: err.message, code: 400});
		}
		else
		{	
				
			if(!rows[0]) 
				res.json({error: 'zero article', rows, code: 121});
			else 
				res.json({rows, code: 200});
		}
	})
});

app.post('/eventCal', function(req, res) {
	var eve = "SELECT DATE_FORMAT(startDateTime, '%Y-%m-%d') AS start, DATE_FORMAT(endDateTime, '%Y-%m-%d') AS end, eventName AS title, eventDes AS content FROM event WHERE companyID = ?";
	var param = [req.body.companyID];
	
	db.query(eve, param, function(err, rows, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(rows);
			res.json({rows, code: 200});
		}
	})
});

app.get('/getToday', function(req, res) {
	var getDate = "SELECT DATE_FORMAT(NOW(), '%Y-%m-%d') as now";
	
	db.query(getDate, function(err, result) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(result);
			res.json({result, code: 200});
		}
	})
});

app.post('/getEvent', function(req, res) {
	var getEve = "SELECT eventID, eventName FROM event WHERE companyID = (SELECT companyID FROM salesmen WHERE salesID = ?)";
	var param = [req.body.salesID];
	
	db.query(getEve, param, function(err, rows, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(rows);
			res.json({rows, code: 200});
		}
	})
});

app.post('/uploadImage', upload.single('avatar'), (req, res) => {
	if (!req.file) 
	{
		console.log("No file received");
		res.json({success: false, code: 174});

	} 
	else 
	{
		console.log('file received');
		//console.log(req);
		return res.json({success: true, result: req.file.filename, code: 237});
	
	}
});

app.post('/salesImageDB', function(req, res) {
	var sql = 'UPDATE salesmen SET profileIMG = ? WHERE salesID = ?';
	var param = [req.body.profileIMG, req.body.salesID];

	db.query(sql, param, function(err, results, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 174});
		}
		else
		{
			console.log(results);
			res.json({result: results, code: 237});
		}
	})
});

app.post('/userImageDB', function(req, res) {
	var sql = 'UPDATE user SET profileIMG = ? WHERE userID = ?';
	var param = [req.body.profileIMG, req.body.userID];

	db.query(sql, param, function(err, results, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 174});
		}
		else
		{
			console.log(results);
			res.json({result: results, code: 237});
		}
	})
});

app.post('/getUserIMG', function(req, res) {
	var sql = 'SELECT profileIMG FROM user WHERE userID = ?';
	var param = [req.body.userID];

	db.query(sql, param, function(err, rows, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(rows);
			res.json({rows, code: 200});
		}
	})
});


app.post('/getSalesIMG', function(req, res) {
	var sql = 'SELECT profileIMG FROM salesmen WHERE salesID = ?';
	var param = [req.body.salesID];

	db.query(sql, param, function(err, rows, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(rows);
			res.json({rows, code: 200});
		}
	})
});

app.post('/upUserEvent', function(req, res) {
	var sql = 'UPDATE reservation SET resDate = ?, startTime = ?, endTime = ?, status = ? WHERE resID = ?';
	var param = [req.body.resDate, req.body.startTime, req.body.endTime, req.body.status, req.body.resID];
	
	db.query(sql, param, function(err, results, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
});

app.post('/getEventName', function(req, res) {
	var sql = 'SELECT eventName FROM event WHERE eventID = ?';
	var param = [req.body.eventID];
	
	db.query(sql, param, function(err, results, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
});

app.post('/infoCard', function(req, res) {
	var sql = "SELECT WeChatID, email, engName, chiName, introduction, profileIMG FROM salesmen WHERE salesID = ?";
	var param = [req.body.salesID];
	
	db.query(sql, param, function(err, results, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
});

app.post('/getArticleName', function(req, res) {
	var sql = "SELECT title, eventID , salesID FROM article WHERE articleID = ?";
	var param = [req.body.articleID];
	
	db.query(sql, param, function(err, results, field) {
		if(err)
		{
			console.log(err);
			res.json({error: err.message, code: 400});
		}
		else
		{
			console.log(results);
			res.json({results, code: 200});
		}
	})
});

app.get('/eventList', function(req, res) {
	var sql = "SELECT eventID, DATE_FORMAT(startDateTime, '%Y-%m-%d %T') as start,  DATE_FORMAT(endDateTime, '%Y-%m-%d %T') as end, eventName FROM event";
	
	db.query(sql, function(err, result) {
         if(err)
        {
			console.log(err);
			//throw err;
        }
        else
        {
            console.log(result);
            res.json({result, code: 200});
        }
    })
});

app.listen('3000',()=>{
	console.log('server is running at http://localhost:3000')
})