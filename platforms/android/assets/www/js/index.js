var beept = "BEEPS: "
var beepn = 0
var rotate = 0;
var guardar;
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
                    beepn--
                    $("#beeps").text(beept + beepn)
                    $("#beeps").appendTo("#left")
                }
            });
            $("#sumbeep").click(function () {
                if (beepn != 5) {
                    beepn++
                    $("#beeps").text(beept + beepn)
                    $("#beeps").appendTo("#right")
                }
            });
            $("#playbeep").click(function () {
                console.log("num bibps " + beepn);
                navigator.notification.beep(2);
            })

            $("#turnleft").click(function () {
                rotate -= 10;
                document.getElementById("brujula").style.transform = "rotate(" + rotate + "deg)"
            })
            $("#turnright").click(function () {
                rotate += 10;
                document.getElementById("brujula").style.transform = "rotate(" + rotate + "deg)"
            })

            $("#keep").click(function () {
                var watchID;
                var options = {
                    frequency: 1000
                };
                watchID = navigator.compass.watchHeading(onSuccess, onError, options);
                /*console.log(
                    navigator.compass.getCurrentHeading() + " aqui");*/

            })

            $("#game").css("width",window.screen.width)
            $("#game").css("height",window.screen.height)

            console.log(window.screen.width + " + " + window.screen.height)

            $("#start").click(function () {
                var myVar = setInterval(myTimer, 1000);
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

    if(random === 1){
        var div = $("<div class='target'></div>");
    }else if(random === 2){
        var div = $("<div class='end'></div>");
    }else if(random === 3){
        var div = $("<div class='clear'></div>");
    }

    let left = Math.floor((Math.random() * window.screen.width) + 1);
    let top = Math.floor((Math.random() * window.screen.height) + 1);

    div.css({"margin-left":left},{"margin-top":top});

    $("#game").appendChild(div)

}

function onSuccess(heading) {
    console.log(heading)
    /*console.log(
        navigator.compass.getCurrentHeading + " aqui");*/

    document.getElementById("brujula").style.transform = "rotate(" + heading.magneticHeading + "deg)";
    guardar = rotate;

    console.log(" guardar " + guardar + " heading " + heading.magneticHeading)

}

function onError(compassError) {
    alert('Compass error: ' + compassError.code);
}

app.initialize();