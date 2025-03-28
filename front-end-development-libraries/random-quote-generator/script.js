// generate a color RGB format
const randomNumber = () => Math.floor(Math.random() * (255 - 0 + 1));
const changeBGColor = () =>  `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;

function getQuote() {
$.ajax({
    url: "https://api.quotable.io/quotes/random",
    method: "GET",
    dataType: "json"
})
.done(function(json) {
    $("#text").html(json[0].content);
    $("#author").html(`- ${json[0].author}`);
})
.fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
});
}

$("body, #new-quote").css("background", changeBGColor());
$("#tweet-quote").attr({
    href: "twitter.com/intent/tweet",
    title: "Tweet the quote!",
    target: "_blank"
})

getQuote();

$("#new-quote").click(function(){
    getQuote();
    const currentColor = changeBGColor();
    $("body, #new-quote").animate({backgroundColor: currentColor}, 1000);
});