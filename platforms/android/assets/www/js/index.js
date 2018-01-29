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
var sameTime = 1;


//EXAMEN
var time = 1000;

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
                    frequency: 2000
                };
                watchID = navigator.compass.watchHeading(onSuccess, onError, options);
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
                updating();
                myVar = setInterval(myTimer, 1000);
            })


            //EXAMEN

            //1 - OK
            $("#change").click(function () {
                $("#change").attr("class","btn btn-danger");
                navigator.vibrate(1500)
                window.setTimeout( returnClass, 1500 );
            });
            //2 - OK
            $("#first").click(function () {
                navigator.vibrate(1000)
                createButton();
            });
            //3 -
            $("#sud").click(function () {
                var watchID2;
                var options2 = {
                    frequency: 1000
                };
                watchID2 = navigator.compass.watchHeading(onSuccess2, onError, options2);
            })

        },


        // Update DOM on a Received Event
        receivedEvent: function (id) {
            var parentElement = document.getElementById(id);

            console.log('Received Event: ' + id);
        }
    };

function myTimer() {

    var count = 0;
    while(count < sameTime) {
        count++;
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

        var one = $("#game").width() - 45;
        var two = $("#game").height() - 45;

        //console.log("geeey: " + one + " heeey: " + two)

        let left = Math.floor(Math.random() * one);
        let top = Math.floor(Math.random() * two);

        //console.log("left: " + left + " top: " + top)

        div.css({"margin-left": left, "margin-top": top});

        $("#game").append(div);

        div.click(remove);
        elements++;
        updating();

        if (elements == 11) clearInterval(myVar);
    }

    if (sameTime < 6)sameTime++;
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
    updating();

    console.log("puntos: " + score + " elements: " + elements);
    $(this).remove();
    sameTime--;
}
function updating() {
    $("#progress").animate({
        width: elements+"0%"
    },500);

    $("#numDanger").text(elements);
    $("#points").text("POINTS:" + score);
}

//EXAMEN
function returnClass() {
    $("#change").attr("class","btn btn-warning");
}

function createButton() {
    time += 1000;
    var div = $("<div class='btn btn-primary'>"+ time +"</div>");

    div.click(vibrarX);

    $("#buttons").append(div);
}
function vibrarX() {
    navigator.vibrate($(this).text());
    createButton();
}

function onSuccess2(heading) {
    console.log(heading);

    if(heading.magneticHeading < 5 && heading.magneticHeading > -5){
        navigator.notification.beep(2);
    }

}

app.initialize();