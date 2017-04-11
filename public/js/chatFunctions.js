function addToChat(data) {
    $('#messages').append(data);
    $("#messages").animate({
        scrollTop: $("#messages")[0].scrollHeight
    }, 1);
    $('.collapsible').collapsible();
}

function sumAssured() {
    socket.emit('products', 'sum assured is 10000 and term is 10 years');
}

function userSpeaks(type) {
    inputType = type;
    console.log(inputType);
    let message = $('#m').val();
    console.log(message);
    socket.emit('products', message);
    let botContent =
        "<li class='user-item'>" +
            "<div class='user-message'>" +
                "<div class='user-data'>" +
                    "<div class='user-message-content'>" +
                        message +
                    "</div>" +
                "</div>" +
                "<div class='user-image'>" +
                "</div>" +
            "</div>" +
        "</li>";
    addToChat(botContent);
    $('#m').val('');
}

var botMessageStart = 
    "<li class='bot-item'>" +
    "<div class='bot-message'>" +
        "<div class='bot-image'>" +
        "</div>" +
        "<div class='bot-data'>" +
            "<div class='bot-message-content'>" ;

var botMessageEnd = "</div>" +
                "</div>" +
            "</div>" +
        "</li>";


function botMessage(message) {
    let botContent = '';
    if(targetUser == null) {
        botContent += botMessageStart + message + botMessageEnd;
                    
        return botContent;
    } else {        
        console.log("has entered into function");
        let botStarter =
                "<div class='alternate-header'>"+    
                    "<div class='bot-image'>" +
                    "</div>" +
                "</div>"+
                '<ul class="collapsible popout" data-collapsible="accordion">';
        let botEnd = '</ul>';
        for(let i=0; i<policies.length;i++) {
            if(targetUser == "child") {
                if(policies[i].type == 'child') {
                    botContent +=
                    ' <li>'+
                        '<div class="collapsible-header">'+
                            policies[i].name+
                        '</div>'+
                        ' <div class="collapsible-body">'+
                            "<div class='card-content white-text'>" +
                                "<ul class='collection with-header'>" +
                                    "<li class='collection-header text-color'>"+
                                        "<h6>Sum Assured</h6>"+
                                    "</li>"+
                                    "<li class='collection-item text-color'>" +
                                        "<input class='with-gap' name='group1"+ i +"' type='radio' id='test"+ i +"1'/>" +
                                        "<label for='test"+ i +"1' class='text-color'>50,000</label>" +
                                    "</li>" +
                                    "<li class='collection-item text-color'>" +
                                        "<input class='with-gap' name='group1"+ i +"' type='radio' id='test"+ i +"2'/>" +
                                        "<label for='test"+ i +"2'  class='text-color'>1,00,000</label>" +
                                    "</li>" +
                                "</ul>" +
                                "<ul class='collection with-header'>" +
                                    "<li class='collection-header text-color'><h6>Payment mode</h6></li>" +
                                    "<li class='collection-item text-color'>" +
                                        "<input class='with-gap' name='group2"+ i +"' type='radio' id='test"+ i +"3'/>" +
                                        "<label for='test"+ i +"3'  class='text-color'>Monthly</label>" +
                                    "</li>" +
                                    "<li class='collection-item text-color'>" +
                                        "<input class='with-gap' name='group2"+ i +"' type='radio' id='test"+ i +"4'/>" +
                                        "<label for='test"+ i +"4'  class='text-color'>Yearly</label>" +
                                    "</li>" +
                                "</ul>" +
                                '<a class="waves-effect waves-light btn sum-assured-btn" onclick="sumAssured()">Done</a>'+
                            "</div>" +
                        ' </div>'+
                    ' </li>';
                }
                
            } else if (targetUser == "life") {
                if(policies[i].type == 'life') {
                    botContent +=
                        ' <li>'+
                            '<div class="collapsible-header">'+
                                policies[i].name+
                            '</div>'+
                            ' <div class="collapsible-body">'+
                                "<div class='card-content white-text'>" +
                                    "<ul class='collection with-header'>" +
                                        "<li class='collection-header text-color'>"+
                                            "<h6>Sum Assured</h6>"+
                                        "</li>"+
                                        "<li class='collection-item text-color'>" +
                                            "<input class='with-gap' name='group3"+ i +"' type='radio' id='test"+ i +"1'/>" +
                                            "<label for='test"+ i +"1' class='text-color'>50,000</label>" +
                                        "</li>" +
                                        "<li class='collection-item text-color'>" +
                                            "<input class='with-gap' name='group3"+ i +"' type='radio' id='test"+ i +"2'/>" +
                                            "<label for='test"+ i +"2'  class='text-color'>1,00,000</label>" +
                                        "</li>" +
                                    "</ul>" +
                                    "<ul class='collection with-header'>" +
                                        "<li class='collection-header text-color'><h6>Payment mode</h6></li>" +
                                        "<li class='collection-item text-color'>" +
                                            "<input class='with-gap' name='group4"+ i +"' type='radio' id='test"+ i +"3'/>" +
                                            "<label for='test"+ i +"3'  class='text-color'>Monthly</label>" +
                                        "</li>" +
                                        "<li class='collection-item text-color'>" +
                                            "<input class='with-gap' name='group4"+ i +"' type='radio' id='test"+ i +"4'/>" +
                                            "<label for='test"+ i +"4'  class='text-color'>Yearly</label>" +
                                        "</li>" +
                                    "</ul>" +
                                '<a class="waves-effect waves-light btn sum-assured-btn" onclick="sumAssured()">Done</a>'+
                                "</div>" +
                            ' </div>'+
                        ' </li>';
                }
            } else if(targetUser == "payment") {
               botContent = '<div class="utility-payment-option"><div class="utility-payment-content">Quote Amount: $15000<button class="utility-payment-btn" onclick="paymentDone()">Pay Now</button></div></div>';
                // botContent = '<div class="main"><div id="main-mask" class="main-mask hidden"></div><div id="main-payment" class="main-payment"> <div class="payment-headings"> <span>Enter credit card Details </div> <div class="payment-content"> <input class="card-number" placeholder="XXXX-XXXX-XXXX-XXXX"/> <div class="other-payment-details"> <input class="expiry" placeholder="MM/YY"/> <input class="cvv" placeholder="CVV"/> </div> </div> </div> <div class="heading"> <h4> Insurance </h4> <h6>85 Board St.Apt.10,NewYork NY 10004</h6> </div> <div class="content"> <div class="content1"> <span> <span class="dollar">$</span> <span class="rate">5</span> </span> Per Month </div> <div class="content2"> <div class="data1"> <div class="data11">start date</div> <div class="data12">Today</div> </div> <div class="data2"> <div class="data21">Deductable</div> <div class="data22">$250</div> </div> </div> </div> <div class="dashed"></div> <div class="headings"> <span class="headings1">COVERAGE HIGHLIGHTS</span> <br> <span class="headings2">Click For More Information</span> </div> <div class="coverage-details"> <div class="bubble-payment"> <div class="bubble-section"> <i class="fa fa-plus"></i> </div> <span class="bubble-data">Fire</span> </div> <div class="bubble-payment"> <div class="bubble-section"> <i class="fa fa-plus"></i> </div> <span class="bubble-data">Fire</span> </div> <div class="bubble-payment"> <div class="bubble-section"> <i class="fa fa-plus"></i> </div> <span class="bubble-data">Fire</span> </div> <div class="bubble-payment"> <div class="bubble-section"> <i class="fa fa-plus"></i> </div> <span class="bubble-data">Fire</span> </div> <div class="bubble-payment"> <div class="bubble-section"> <i class="fa fa-plus"></i> </div> <span class="bubble-data">Fire</span> </div> <div class="bubble-payment"> <div class="bubble-section"> <i class="fa fa-plus"></i> </div> <span class="bubble-data">Fire</span> </div> </div> <div class="dashed"></div> <div class="headingsss"> <span class="headings1">COVERAGE AMOUNTS</span> </div> <div class="contentss"> <div class="data1"> <div class="data11">Valuables stuff</div> <div class="data12">$10,000</div> </div> <div class="data1"> <div class="data11">Medical cost</div> <div class="data12">$1000</div> </div> <div class="data1"> <div class="data11">legal cost</div> <div class="data12">$10000</div> </div> </div> <div onclick="payNow()" class="paynow"> <span class="paydata">PAY $5/MONTH</span> </div> </div>';
            }
        }  
        return botStarter+botContent+botEnd;
    }
  
        
}

function paymentDone() {
    swal({
        title: "Payment Done!!",
        text: "$15000 paid using your default payment option.",
        type: 'success',
        timer: 2000
    }).then(function() {

    });
}

function showDiv() {
    console.log("has entered into function");
    let botContent =
        "<div class='row'>" +
            "<div>" +
                "<div class='card-content white-text'>" +
                    "<div>" +
                        "<ul class='collection with-header'>" +
                            "<li class='collection-header text-color'>"+
                                "<h6>Sum Assured</h6>"+
                            "</li>"+
                            "<li class='collection-item text-color'>" +
                                "<input class='with-gap' name='group1' type='radio' id='test1'/>" +
                                "<label for='test1' class='text-color'>50,000</label>" +
                            "</li>" +
                            "<li class='collection-item text-color'>" +
                                "<input class='with-gap' name='group1' type='radio' id='test2'/>" +
                                "<label for='test2'  class='text-color'>1,00,000</label>" +
                            "</li>" +
                        "</ul>" +
                    "</div>" +
                    "<div>" +
                        "<ul class='collection with-header'>" +
                            "<li class='collection-header text-color'><h6>Payment mode</h6></li>" +
                            "<li class='collection-item text-color'>" +
                                "<input class='with-gap' name='group1' type='radio' id='test3'/>" +
                                "<label for='test3'  class='text-color'>Monthly</label>" +
                            "</li>" +
                            "<li class='collection-item text-color'>" +
                                "<input class='with-gap' name='group1' type='radio' id='test4'/>" +
                                "<label for='test4'  class='text-color'>Yearly</label>" +
                            "</li>" +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>";

    addToChat(botContent);
}

var policies = [{
    "name": "Child Education",
    "type": "child"
},{
    "name": "Child Health",
    "type": "child"
},{
    "name": "Child Marriage",
    "type": "child"
},{
    "name": "Child Life",
    "type": "child"
},{
    "name": "Personal Health",
    "type": "life"
},{
    "name": "Family Health",
    "type": "life"
},{
    "name": "Retirement",
    "type": "life"
}];

function payNow() {
    $("#main-payment").toggleClass("main-payment-active");
    $("#main-mask").toggleClass("hidden");
}

function selectedPayment(type) {
    console.log(type);
    $("#payment-method-container").toggleClass("hide-payment-container");
    document.getElementById("payment-dynamic-heading").innerHTML = "Enter Card Details";
    $("#payment-dynamic-heading").val("Enter Card Details");
    setTimeout(function() {
        $("#payment-method-container").toggleClass("hidden");
    }, 1000);
}