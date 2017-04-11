var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/ping', function(req, res) {
    var testingtext = req.query.testtext;
    var testeddata = [];
    var servertext = false;
    // console.log(testingtext);
    var servicedata = [{
        "policyid": 121,
        "policyname": "death policy",
        "name": "john",
        "age": 75,
        "address": " 22-1-12 Avenue road new york",
        "claim": "death claim",
        "claimstatus": "pending",
        "date": "29-02-2010",
        "martialstatus": "married"

    }, {
        "policyid": 221,
        "policyname": "health policy",
        "name": "Bruce",
        "age": "35",
        "address": " 221 B Baker Street London",
        "claim": "health claim",
        "claimstatus": "completed",
        "date": "29-11-2009",
        "martialstatus": "married"

    }, {
        "policyid": 91,
        "policyname": "Car Insurance policy",
        "name": "wayne",
        "age": 25,
        "address": " 44 street Gotam city",
        "claim": "Car claim",
        "claimstatus": "pending",
        "date": "20-12-2012",
        "martialstatus": "single"

    }, {
        "policyid": 100,
        "policyname": "health policy",
        "name": "tony",
        "age": 30,
        "address": " 22-1-12 malibu point new york",
        "claim": "health claim",
        "claimstatus": "pending",
        "date": "29-02-2010",
        "martialstatus": "married"

    }, {
        "policyid": 162,
        "policyname": "death policy",
        "name": "stark",
        "age": 79,
        "address": " 22-1-12 Avenue road California",
        "claim": "death claim",
        "claimstatus": "pending",
        "date": "29-10-2010",
        "martialstatus": "married"

    }, {
        "policyid": 10,
        "policyname": "Car Insurance policy",
        "name": "waston",
        "age": 25,
        "address": " 22",
        "claim": "death claim",
        "claimstatus": "pending",
        "date": "29-02-2010",
        "martialstatus": "married"

    }]

    for (var k in servicedata) {
        //  console.log(k, servicedata[k].policyid);
        if (testingtext == servicedata[k].policyid) {
            servertext = true;
            testeddata = [{
                "policyid": servicedata[k].policyid,
                "policyname": servicedata[k].policyname,
                "name": servicedata[k].name,
                "age": servicedata[k].age,
                "address": servicedata[k].address,
                "claim": servicedata[k].claim,
                "claimstatus": servicedata[k].claimstatus,
                "date": servicedata[k].date,
                "martialstatus": servicedata[k].martialstatus
            }];
            // console.log(testeddata);

        }

    }
    if (servertext == true) {
        res.send(testeddata);
    } else {
        res.send("Sorry this not an existing policy ID");
    }
});

var personalDetails;
var otherDetails;

io.on('connection', function(socket) {

    socket.on('disconnect', function() {
        console.log('user ' + socket.id + ' disconnected');
    });
    socket.on('user command', function(msg) {
        // console.log(socket);
        msg = encodeURIComponent(msg.trim());

        ask(msg, socket);

        console.log('user command: ' + msg);
    });
    socket.on('products', function(msg) {
        // console.log(socket);
        msg = encodeURIComponent(msg.trim());

        products(msg, socket);

        console.log('user command: ' + msg);
    });
});


function products(msg, socket) {
    var headers = {
        'Authorization': 'Bearer 86d176b986294f52844de270bb9f0ba8'
    };

    var options = {
        url: 'https://api.api.ai/api/query?v=20150910&query=' + msg + '&lang=en&sessionId=b8638dd9-84f9-4f70-a03a-456323b9d447&timezone=2017-02-20T15:11:12+0530',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var response = body;
            // *response* should be 'JSON.parse()'-ed
            response = JSON.parse(response);
            // -----------------------------
            result = response.result.fulfillment.speech;
            // -----------------------------------------
            io.to(socket.id).emit("product response", result, response);
        }
    }

    request(options, callback);
}


var result;

function ask(msg, socket) {
    var headers = {
        'Authorization': 'Bearer 10437f8038704f63936a27a6016135f0'
    };

    var options = {
        url: 'https://api.api.ai/api/query?v=20150910&query=' + msg + '&lang=en&sessionId=80d4e750-8fde-4a14-b6dc-6467fe78b5d2&timezone=2017-02-13T21:49:55+0530',
        headers: headers
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var response = body;
            // *response* should be 'JSON.parse()'-ed
            response = JSON.parse(response);
            // -------------------------------------------------------------
            // checking the action to understand in which intent the user is
            switch (response.result.action) {
                case 'personal.details':
                    // the user is in the intent whose action is 'personal.details'
                    personalDetails = response;
                    result = response.result.fulfillment.speech;
                    // ---------------------------------------------
                    // check if the action of the intent is complete
                    if (response.result.actionIncomplete) {
                        // intent's action INCOMPLETE
                        // --------------------------             
                        io.to(socket.id).emit("message", result, response);
                    } else {
                        io.to(socket.id).emit("success", result, response);
                        // intent's action COMPLETE
                        console.log(response);
                        var tempText = 'marital\-status';
                        switch (response.result.parameters[tempText]) {
                            case 'single':
                                // calling *UNmarried* intent automatically 
                                msg = "i am by myself";
                                ask(msg, socket);
                                break;
                            case 'married':
                                // calling *married* intent automatically
                                msg = "i have a spouse";
                                ask(msg, socket);
                                break;
                            case 'divorced':
                                //code 
                                break;
                            case 'widowed':
                                //code 
                                break;
                            default:
                                //default action
                        }
                    }
                    break;
                case 'family.details':
                case 'other.details':
                    // the user is in the intent whose action is 'other.details'
                    // --------------------------------------------------------
                    // both 'married' and 'unmarried' intents has same action
                    // the code will be same for both the intents -> hence the same action
                    // only the questions are different for both intents bot processing is same
                    otherDetails = response;
                    if (response.result.actionIncomplete) {
                        /* 
                          search this file for "#check-repeat" to understand the purpose
                          the following if&else condition                    
                         */
                        result = response.result.fulfillment.speech;
                        io.to(socket.id).emit("message", result, response);
                    } else {
                        console.log(response);
                        io.to(socket.id).emit("success", result, response);
                    }
                    break;
                default:
                    //default action
            }
        }
    }
    request(options, callback);
}

// var myCustomModule = require('./esub/index.js');

// myCustomModule.readEsub();


var port = Number(process.env.PORT || 3002);
http.listen(port, function() {
    console.log('listening on port: *' + port);
});