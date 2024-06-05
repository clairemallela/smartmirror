(function() {

    var width = 320;    // Width of the video element
    var height = 0;     // Height will be calculated based on the video stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;
    var continuebutton = null;
    var countdownTimer = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        continuebutton = document.getElementById('continuebutton');
        countdownTimer = document.getElementById('countdownTimer');

        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev) {
            startCountdown();
            ev.preventDefault();
        }, false);

        continuebutton.addEventListener('click', function() {
            continueToResults();
        });

        clearphoto();
    }

    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function startCountdown() {
        var countdown = 5;
        countdownTimer.style.display = 'block';
        countdownTimer.textContent = countdown;
        var interval = setInterval(function() {
            countdown--;
            countdownTimer.textContent = countdown;
            if (countdown === 0) {
                clearInterval(interval);
                countdownTimer.style.display = 'none';
                takepicture();
            }
        }, 1000);
    }

    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        } else {
            clearphoto();
        }
    }

    function continueToResults() {
        var dataUrl = canvas.toDataURL('image/png');
        sessionStorage.setItem('capturedPhoto', dataUrl);
        window.location.href = 'results.html';
    }

    window.addEventListener('load', startup, false);
})();



// (function() {

//     var width = 320;    // Width of the video element
//     var height = 0;     // Height will be calculated based on the video stream

//     var streaming = false;

//     var video = null;
//     var canvas = null;
//     var photo = null;
//     var startbutton = null;
//     var continuebutton = null;

//     function startup() {
//         video = document.getElementById('video');
//         canvas = document.getElementById('canvas');
//         photo = document.getElementById('photo');
//         startbutton = document.getElementById('startbutton');
//         continuebutton = document.getElementById('continuebutton');

//         navigator.mediaDevices.getUserMedia({
//                 video: true,
//                 audio: false
//             })
//             .then(function(stream) {
//                 video.srcObject = stream;
//                 video.play();
//             })
//             .catch(function(err) {
//                 console.log("An error occurred: " + err);
//             });

//         video.addEventListener('canplay', function(ev) {
//             if (!streaming) {
//                 height = video.videoHeight / (video.videoWidth / width);

//                 if (isNaN(height)) {
//                     height = width / (4 / 3);
//                 }

//                 video.setAttribute('width', width);
//                 video.setAttribute('height', height);
//                 canvas.setAttribute('width', width);
//                 canvas.setAttribute('height', height);
//                 streaming = true;
//             }
//         }, false);

//         startbutton.addEventListener('click', function(ev) {
//             takepicture();
//             ev.preventDefault();
//         }, false);

//         continuebutton.addEventListener('click', function() {
//             continueToResults();
//         });

//         clearphoto();
//     }

//     function clearphoto() {
//         var context = canvas.getContext('2d');
//         context.fillStyle = "#AAA";
//         context.fillRect(0, 0, canvas.width, canvas.height);

//         var data = canvas.toDataURL('image/png');
//         photo.setAttribute('src', data);
//     }

//     function takepicture() {
//         var context = canvas.getContext('2d');
//         if (width && height) {
//             canvas.width = width;
//             canvas.height = height;
//             context.drawImage(video, 0, 0, width, height);

//             var data = canvas.toDataURL('image/png');
//             photo.setAttribute('src', data);
//         } else {
//             clearphoto();
//         }
//     }

//     function continueToResults() {
//         var dataUrl = canvas.toDataURL('image/png');
//         sessionStorage.setItem('capturedPhoto', dataUrl);
//         window.location.href = 'results.html';
//     }

//     window.addEventListener('load', startup, false);
// })();
