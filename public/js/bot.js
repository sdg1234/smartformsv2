(function ( $ ) {    
    $.fn.chatbot = function() {
        var content = 
          "<div id='chatbot-trigger'>"+
            "<i id='open-chat' class='fa fa-comments fa-2x'></i>"+
            "<i id='close-chat' class='fa fa-times hidden-icon'></i>"+
          "</div>"+
          "<div id='chatbot-main'>"+
            "<div class='chatbot-header'>"+
                "<h6 id='flip-chat'>Chatbot</h6>"+
            "</div>"+
            "<div class='chatbot-body'>"+
                "<div id='chatbot-payment-main'>"+
                    "<h4 id='payment-dynamic-heading'>Select a Payment Method</h4>"+
                    "<div class='payment-method-container' id='payment-method-container'>"+
                        "<div class='payment-method-box visa-mastercard-box' onclick='selectedPayment(\"card\")'>"+
                            "<div class='payment-method-mask'>Debit/Credit Card</div>"+
                        "</div>"+
                        "<div class='payment-method-box paypal-box' onclick='selectedPayment(\"paypal\")'>"+
                            "<div class='payment-method-mask'>Paypal</div>"+
                        "</div>"+
                        "<div class='payment-method-box cheque-box' onclick='selectedPayment(\"cheque\")'>"+
                            "<div class='payment-method-mask'>Cheque</div>"+
                        "</div>"+
                        "<div class='payment-method-box wallets-box' onclick='selectedPayment(\"wallet\")'>"+
                            "<div class='payment-method-mask'>Online Wallets</div>"+
                        "</div>"+
                    "</div>"+
                    "<div class='payment-method-main'>"+
                        "<div class='payment-method-main-button'>"+
                            "Go"+
                        "</div>"+
                        "<div class='payment-method-main-header'>"+
                            "<span>Card Details</span>"+
                            "<i class='fa fa-cc-visa' aria-hidden='true'></i>"+
                            "<i class='fa fa-cc-mastercard' aria-hidden='true'></i>"+
                            "<i class='fa fa-cc-discover' aria-hidden='true'></i>"+
                        "</div>"+
                        "<div class='payment-method-main-body'>"+
                            "<input placeholder='1234 5678 8765 4321'/>"+
                        "</div>"+
                        "<div class='payment-method-main-footer'>"+
                            "<input class='expiry' placeholder='MM/YY'/>"+
                            "<input class='cvv' type='password' placeholder='CVV'/>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
               "<ul id='messages'>"+
                  "<li class='bot-item'>" +
                    "<div class='bot-message'>" +
                        "<div class='bot-image'>" +
                        "</div>" +
                        "<div class='bot-data'>" +
                            "<div class='bot-message-content'>" +
                                "Hi John, how may I help you..?"+
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</li>"+
               "</ul>"+
            "</div>"+
            "<div class='chatbot-footer'>"+
                "<input id='m' class='chatbot-input-message' />"+
                "<div class='chatbot-send-message' onclick='userSpeaks(\"text\")'>"+
                    "<i id='open-chat' class='fa fa-chevron-right'></i>"+
                "</div>"+
            "</div>"+
          "</div>";
        $(this).append(content);
        $("#chatbot-trigger").click(function(){
            $("#chatbot-main").toggleClass('chat-active');
            $('#open-chat').toggleClass('hidden-icon');
            $('#close-chat').toggleClass('hidden-icon');
        });
        $("#flip-chat").click(function(){
            $(".chatbot-body").toggleClass('chat-payment-active');
        });
        
        return this;
    }; 
}( jQuery ));