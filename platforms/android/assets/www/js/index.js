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
                navigator.notification.beep(beepn);
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
                /*var watchID;
                var options = {
                    frequency: 1000
                };
                watchID = navigator.compass.watchHeading(onSuccess, onError, options);*/
                console.log(
                    navigator.compass.getCurrentHeading + " aqui");

            })

            $("#game").css("width",window.screen.width)
            $("#game").css("height",window.screen.height)

            console.log(window.screen.width + " + " + window.screen.height)
        },


        // Update DOM on a Received Event
        receivedEvent: function (id) {
            var parentElement = document.getElementById(id);

            console.log('Received Event: ' + id);
        }
    };


function onSuccess(heading) {
    /*console.log('Heading: ' + heading.magneticHeading);
    document.getElementById("nort").innerHTML = heading.magneticHeading
    document.getElementById("brujula").style.transition = "transform 5s";*/

    console.log(
        navigator.compass.getCurrentHeading + " aqui");

    document.getElementById("brujula").style.transform = "rotate(" + heading.magneticHeading + "deg)";
    guardar = rotate

    console.log("llego guardarFinal " + guardarFinal + " guardar " + guardar + " heading " + heading.magneticHeading)

};

function onError(compassError) {
    alert('Compass error: ' + compassError.code);
};

app.initialize();