//beeps
var beept = "BEEPS: ";
var beepn = 0;
//posicion
var rotate = 0;
var guardar;
//game
var elements = 0;
var myVar;
var score = 0;
var app =
    {
        initialize: function () {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },
        // Application Constructor
        initialize: function () {
            this.receivedEvent('deviceready');

            $("#lessbeep").click(function () {
                if (beepn != 0) {
                    beepn--;
                    $("#beeps").text(beept + beepn);
                    $("#beeps").appendTo("#left")
                }
            });
            $("#sumbeep").click(function () {
                if (beepn != 5) {
                    beepn++;
                    $("#beeps").text(beept + beepn);
                    $("#beeps").appendTo("#right")
                }
            });
            $("#playbeep").click(function () {
                console.log("num bibps " + beepn);
                navigator.notification.beep(2);
            });

            $("#turnleft").click(function () {
                rotate -= 10;
                document.getElementById("brujula").style.transform = "rotate(" + rotate + "deg)"
            });
            $("#turnright").click(function () {
                rotate += 10;
                document.getElementById("brujula").style.transform = "rotate(" + rotate + "deg)"
            });

            $("#keep").click(function () {
                var watchID;
                var options = {
                    frequency: 1000
                };
                watchID = navigator.compass.watchHeading(onSuccess, onError, options);
                /*console.log(
                    navigator.compass.getCurrentHeading() + " aqui");*/

            });

            $("#score").css("width", window.screen.width);
            $("#game").css("width", window.screen.width);
            $("#game").css("height", window.screen.height-50);
            $("#game").css("position", "relative");

            console.log(window.screen.width + " + " + window.screen.height);

            $("#start").click(function () {
                score = 0;
                elements = 0;
                $("#game").empty();
                myVar = setInterval(myTimer, 1000);
            })
        },


        // Update DOM on a Received Event
        receivedEvent: function (id) {
            var parentElement = document.getElementById(id);

            console.log('Received Event: ' + id);
        }
    };

function myTimer() {

    let random = Math.floor((Math.random() * 3) + 1);

    var div;
    switch (random) {
        case 1:
             div = $("<div class='target'></div>");
            break;
        case 2:
             div = $("<div class='end'></div>");
            break;
        case 3:
             div = $("<div class='clear'></div>");
            break;
    }

    var one =$("#game").width()-45;
    var two = $("#game").height()-45;

    //console.log("geeey: " + one + " heeey: " + two)

    let left = Math.floor(Math.random() * one);
    let top = Math.floor(Math.random() * two);

    //console.log("left: " + left + " top: " + top)

    div.css({"margin-left": left, "margin-top": top});

    $("#game").append(div);

    div.click(remove);

    elements++;

    if(elements == 11) clearInterval(myVar);
}

function onSuccess(heading) {
    console.log(heading);
    /*console.log(
        navigator.compass.getCurrentHeading + " aqui");*/

    document.getElementById("brujula").style.transform = "rotate(" + heading.magneticHeading + "deg)";
    guardar = rotate;

    console.log(" guardar " + guardar + " heading " + heading.magneticHeading)

}

function onError(compassError) {
    alert('Compass error: ' + compassError.code);
}


function remove() {
    var type = $(this).attr("class");
    switch (type) {
        case "target":
            score++;
            elements--;
            break;
        case "clear":
            score += $("#game").children().length;
            elements -= $("#game").children().length;
            $("#game").empty();
            break;
        case "end":
            clearInterval(myVar);
            $("#game").empty();
            break;
    }
    console.log("puntos: " + score + " elements: " + elements);
    $(this).remove();
}
app.initialize();