 $(document).ready(function(){
  $('.collapsible').collapsible();
  $('body').chatbot();
});
var speakers = false;
var socket = io();
var inputType;
function letsgo(type) {
  inputType = type;
  
  socket.emit('user command', $('#m').val());
  // $('#messages').append($('<li>').text('YOU: '+$('#m').val()));
  // $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1);
  $('#m').val('');
  return false;
}

function listen() {
  console.log("listening...");
}
$('#send-voice').parent().click(function() {
  console.log("clickkkkk");
});
function speak(el) {
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.onstart = function() { 
      console.log("recognittion started");
      // $(el).parent().addClass('active');
      // $('.radiate').addClass('active-listening');
      // $('.radiate2').addClass('active-listening');
      $(el).parent().addClass('animated flash infinite blue-back');
    }
    recognition.onresult = function(event) { 
      console.log(event);
      var text = event.results["0"]["0"].transcript;
      $('#m').val(text);
      letsgo('voice');
    }
    recognition.onerror = function(event) { 
      console.log(event);
    }
    recognition.onend = function() { 
      console.log("rec end");
      // $(el).parent().removeClass('active');
      // $('.radiate').removeClass('active-listening');
      // $('.radiate2').removeClass('active-listening');
      $(el).parent().removeClass('animated flash infinite blue-back');
    }
    recognition.start(); 
  }
}
function speaking(el) {
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.onstart = function() { 
      console.log("recognittion started");
      // $(el).parent().addClass('active');
      // $('.radiate').addClass('active-listening');
      // $('.radiate2').addClass('active-listening');
      $(el).addClass('animated flash infinite blue-back');
    }
    recognition.onresult = function(event) { 
      console.log(event);
      var text = event.results["0"]["0"].transcript;
      $('#m').val(text);
      $('#jane-questions').val(text);
      letsgo('voice');
    }
    recognition.onerror = function(event) { 
      console.log(event);
    }
    recognition.onend = function() { 
      console.log("rec end");
      // $(el).parent().removeClass('active');
      // $('.radiate').removeClass('active-listening');
      // $('.radiate2').removeClass('active-listening');
      $(el).removeClass('animated flash infinite blue-back');
    }
    recognition.start(); 
  }
    
}
function speakQuote(el) {
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.onstart = function() { 
      console.log("recognittion started");
      // $(el).parent().addClass('active');
      // $('.radiate').addClass('active-listening');
      // $('.radiate2').addClass('active-listening');
      $(el).parent().addClass('animated flash infinite blue-back');
    }
    recognition.onresult = function(event) { 
      console.log(event);
      var text = event.results["0"]["0"].transcript;
      $('#m').val(text);
      userSpeaks('voice');
    }
    recognition.onerror = function(event) { 
      console.log(event);
    }
    recognition.onend = function() { 
      console.log("rec end");
      // $(el).parent().removeClass('active');
      // $('.radiate').removeClass('active-listening');
      // $('.radiate2').removeClass('active-listening');
      $(el).parent().removeClass('animated flash infinite blue-back');
    }
    recognition.start(); 
  }
}

function toggleVoice(el) {
  $('.voice-input').toggleClass('disabled');
}
function toggleBot() {
  $('.input-container').toggleClass('input-container-closed');
  $('.bot').toggleClass('bot-closed');
}
toggleBot();
var personalArrayCheck = [];
var otherArrayCheck = [];
var personalForm = {
  "given-name": "personal-first-name",
  "last-name": "personal-last-name",
  "age": "personal-age",
  "address":"personal-address",
  "education":"personal-education",
  "income":"personal-income",
  "marital-status":"personal-marital-status"
}
var spouseForm = {
  "spouse-name": "spouse-name",
  "spouse-age": "spouse-age",
  "spouse-income":"spouse-income"
}
var familyForm = {
  "father-name": "father-name",
  "father-age": "father-age",
  "mother-name": "mother-name",
  "mother-age": "mother-age"
}
socket.on('message', function(msg, response){
  console.log(msg);
  if(response.result.action == 'personal.details') {
    for(var key in response.result.parameters) {
      var fieldID = "#"+personalForm[key];     
      console.log(key);
      if(key == "age") {
        if(response.result.parameters[key].amount != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key].amount);
          $('#personal-details').focus();
        }        
      } else {
        if(response.result.parameters[key] != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key]);
        }        
      }
    }
  } else if(response.result.action == 'other.details') {
    if($('#other-details').hasClass('hidden-translate')) {
      showOther();
    }
    for(var key in response.result.parameters) {
      var fieldID = "#"+spouseForm[key];
      console.log(key);
      if(key == "spouse\-age") {
        if(response.result.parameters[key].amount != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key].amount);
        }        
      } else {
        if(response.result.parameters[key] != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key]);
        }        
      }
    }
  }else if(response.result.action == 'family.details') {
    if($('#other-details-family').hasClass('hidden-translate')) {
      showFamily();
    }
    for(var key in response.result.parameters) {
      var fieldID = "#"+familyForm[key];
      console.log(key);
      if(key == "father\-age" || key == "mother\-age") {
        if(response.result.parameters[key].amount != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key].amount);
        }        
      } else {
        if(response.result.parameters[key] != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key]);
        }        
      }
    }    
  }
  // $('#messages').append($('<li>').text("JANE: "+msg+""));
  // $('#jane-questions').text(msg);
  $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1);
  if(inputType == 'voice') {
    formSpeakfill(msg);
  } 
});
socket.on('success', function(msg, response){
  console.log(response);
  if(response.result.action == 'personal.details') {
    for(var key in response.result.parameters) {
      var fieldID = "#"+personalForm[key];
      console.log(key);
      if(key == "age") {
        if(response.result.parameters[key].amount != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key].amount);
        }        
      } else {
          if(response.result.parameters[key] != '') {
            $(fieldID).focus();
            $(fieldID).val(response.result.parameters[key]);
          }  
      }      
      
    }
  } else if(response.result.action == 'other.details') {
    for(var key in response.result.parameters) {
      var fieldID = "#"+spouseForm[key];
      console.log(key);
      if(key == "spouse\-age") {
        if(response.result.parameters[key].amount != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key].amount);
        }        
      } else {
        if(response.result.parameters[key] != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key]);
        }        
      }
    }
  }else if(response.result.action == 'family.details') {
    for(var key in response.result.parameters) {
      var fieldID = "#"+familyForm[key];
      console.log(key);
      if(key == "father\-age" || key == "mother\-age") {
        if(response.result.parameters[key].amount != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key].amount);
        }        
      } else {
        if(response.result.parameters[key] != '') {
          $(fieldID).focus();
          $(fieldID).val(response.result.parameters[key]);
        }        
      }
    }   
  }
  $('#jane-question').text('Hello there..');
});



function formSpeaking(message) {
  var utterance = new SpeechSynthesisUtterance(message);
  window.speechSynthesis.speak(utterance);
  
}
function formSpeaks(message) {
  var utterance = new SpeechSynthesisUtterance(message);
  window.speechSynthesis.speak(utterance);
  
}

function formSpeakfill(message) {
  document.getElementById("bubble-text").innerHTML = message;
  var utterance = new SpeechSynthesisUtterance(message);
  window.speechSynthesis.speak(utterance);
  utterance.onend = function(e) {
  console.log('Finished in ' + event.elapsedTime + ' seconds.');
  speakers= true;
  console.log("inside formspeaks"+speakers);
  if(speakers==true){
      speaking("#add");
      speakers= false;
      console.log("inside if loop"+speakers);
  }
};
  
  
}
function check(testtext) {
    console.log(testtext);
    var tests = {"testtext":testtext};
  $.ajax(
  {url: "/ping",
   
   data: tests,
  success: function(result){
      console.log(result);
      var wrongtexts="Sorry this not an existing policy ID";
      if(result== wrongtexts){
          let text = wrongtexts;
          dynamic(text, "dynamic-result")
          formSpeaking(text) 
      }
      if(requesttype=="claim" && result!= wrongtexts){
          let text = "The Claim Status is " + result[0].claimstatus;
          dynamic(text, "dynamic-result")
          formSpeaking(text) 
      }
      
      if(requesttype=="personal" && result!= wrongtexts){
          let text =  "your name is " + 
                      result[0].name + 
                      " your age is " + 
                      result[0].age + 
                      " and your address is " + 
                      result[0].address + 
                      " your marital status is "+ 
                      result[0].martialstatus;
          dynamic(text, "dynamic-result")
          formSpeaking(text)
      }
      
      if(requesttype=="policy" && result!= wrongtexts){
          let text =  "The Policy name is " + 
                      result[0].policyname;
          dynamic(text, "dynamic-result")
          formSpeaking(text)
      }
      if(requesttype=="address" && result!= wrongtexts){
          let text =  "Ok your request has been registered. Here is the reference number 88661  " ;
          dynamic(text, "dynamic-result")
          formSpeaking(text)
      }
  },
  error: function(jqXHR, exception) {

  }
  });
}
var nextForm = '';
function maritalStatus() {
  if($('#personal-marital-status').val() == 'married') {
    if($('#other-details').hasClass('hidden-translate')) {
      showOther();
    }
    if(!$('#other-details-family').hasClass('hidden-translate')) {
      hidefamily();     
    }
  } else if($('#personal-marital-status').val() == 'single') {
    if($('#other-details-family').hasClass('hidden-translate')) {
      showFamily();
    }
    if(!$('#other-details').hasClass('hidden-translate')) {
      hideOther();
    }
  } else {
    if(!$('#other-details-family').hasClass('hidden-translate')) {
      hidefamily();
    }
    if(!$('#other-details').hasClass('hidden-translate')) {
      hideOther();
    }
  }
}

var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

function showOther() {
  $('#other-details').removeClass('hidden-translate');
  $('#other-details').addClass('animated zoomInDown').one(animationEnd, function() {
      $('#other-details').removeClass('animated zoomInDown');
  });
}

function showFamily() {
  $('#other-details-family').removeClass('hidden-translate');
  $('#other-details-family').addClass('animated zoomInDown').one(animationEnd, function() {
      $('#other-details-family').removeClass('animated zoomInDown');
  });
}

function hidefamily() {
  $('#other-details-family').addClass('animated zoomOutDown').one(animationEnd, function() {
      $('#other-details-family').addClass('hidden-translate')
      $('#other-details-family').removeClass('animated zoomOutDown');
  });  
}

function hideOther() {
  $('#other-details').addClass('animated zoomOutDown').one(animationEnd, function() {
      $('#other-details').addClass('hidden-translate')
      $('#other-details').removeClass('animated zoomOutDown');
  }); 
}

var invalid;  

$("#modal1").click(function () {
    let text = "In order to file a  claim on a Prudential policy,  contact our Prudential professional or call our Customer Service Center   1-800-778-2255.";
    formSpeaking(text);
    dynamic(text, "dynamic-text");    
    $('#voicebot').toggleClass('hidden');
    $('#voicebot').toggleClass('animated');
    $('#voicebot').toggleClass('zoomInDown');    
});
$("#modal4").click(function () {
    let text = "Please  tell us your policy ID..";
    formSpeaking(text);
    dynamic(text, "dynamic-text");    
    $('#voicebot').toggleClass('hidden');
    $('#voicebot').toggleClass('animated');
    $('#voicebot').toggleClass('zoomInDown');
    requesttype="policy";
});
$("#modal2").click(function () {
    let text = "Please  tell us your policy ID..";
    formSpeaking(text);
    dynamic(text, "dynamic-text");    
    $('#voicebot').toggleClass('hidden');
    $('#voicebot').toggleClass('animated');
    $('#voicebot').toggleClass('zoomInDown');
    requesttype="claim";
});
$("#modal3").click(function () {
    let text = "Please  tell us your policy ID..";
    formSpeaking(text);
    dynamic(text, "dynamic-text");    
    $('#voicebot').toggleClass('hidden');
    $('#voicebot').toggleClass('animated');
    $('#voicebot').toggleClass('zoomInDown');
    requesttype="personal";
});
var addressAction = false;
$("#modal5").click(function () {
    let text = "Please tell us your new address.";
    formSpeaking(text);
    dynamic(text, "dynamic-text");    
    $('#voicebot').toggleClass('hidden');
    $('#voicebot').toggleClass('animated');
    $('#voicebot').toggleClass('zoomInDown');
    requesttype="address";
    addressAction = true;
});
$("#closing").click(function () {   
    $('#voicebot').toggleClass('hidden');    
    $('#dynamic-result').text('');
    window.speechSynthesis.cancel();
    invalid = true;  
});  

function speaks(el) {
  if (!('webkitSpeechRecognition' in window)) {
    upgrade();
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.onstart = function() { 
      console.log("recognittion started");
      $(el).parent().addClass('active');
      $('.radiate').addClass('active-listening');
      $('.radiate2').addClass('active-listening');
    }
    recognition.onresult = function(event) { 
      console.log(event);
      if(!addressAction) {
        check(event.results["0"]["0"].transcript);
      } else {
        let text =  "Ok your request has been registered. Here is the reference number 88661  " ;
          dynamic(text, "dynamic-result")
          formSpeaking(text)
        addressAction = false;
      }
      
    }
    recognition.onerror = function(event) { 
      console.log(event);
    }
    recognition.onend = function() { 
      console.log("rec end");
      $(el).parent().removeClass('active');
      $('.radiate').removeClass('active-listening');
      $('.radiate2').removeClass('active-listening');
    }
    recognition.start(); 
  }
}

function dynamic(text, id) {
  document.getElementById(id).innerHTML = "";
  invalid = false; 
  showText(id, text, 0, 50);  
  $("#audio-image").attr("src", "images/animated-sound-waves.gif")
  setTimeout(function(){
    $("#audio-image").attr("src", "images/animated-sound-waves.jpg")
  },(text.length*50+100))     
}

var showText = function (target, message, index, interval) { 
  if (index < message.length) {    
    document.getElementById(target).innerHTML += message[index++];
    if(!invalid) {
      setTimeout(function () { 
        showText(target, message, index, interval); 
      }, interval);
    } else {
      return;
    }    
  } 
}

var targetUser = null;
socket.on('product response', function(msg, response){
  console.log(response);
  formSpeaks(msg);
  var planFor = "plan-for";
  if(msg == 'Select a policy, and then select sum assured and payment mode.') {
    targetUser = response.result.parameters[planFor];
  } else if(msg.includes('the final quote is $15000.')) {
    targetUser = "payment";
  } else {
    targetUser = null;
  }
  
  var botData = botMessage(msg);
  addToChat(botData);
  // if(response.result.action == 'product.details') {
  //   // action
  // } 
  // $('#messages').append($('<li>').text("JANE: "+msg+""));
  // // $('#jane-question').text(msg);
  // $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1);
  // if(inputType == 'voice') {
  //   formSpeaks(msg);
  // } 
});

// var botData = botMessage("Hi John, how may I help you..?");

addToChat(botData);