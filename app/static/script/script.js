document.addEventListener("DOMContentLoaded", function () {
    const tapToBeginScreen = document.getElementById("tapToBegin");
    const termsPage = document.getElementById("termsPage");
    const liveCamScreen = document.getElementById("liveCam");
    const resultsPage = document.getElementById("resultsPage");
    const userInfoForm = document.getElementById("userInfoForm");
    const endSessionButton = document.getElementById("endSessionButton");
    const restartButton = document.getElementById("restartButton");
    const thankYouPage = document.getElementById("thankYouPage");
    const ethnicityForm = document.getElementById("ethnicityForm");
    const submitButton = document.getElementById("submitButton");
    const backButton2 = document.getElementById("backButton2");

    // Tap to Begin screen
    if (tapToBeginScreen) {
        tapToBeginScreen.addEventListener("click", function () {
            window.location.href = "terms.html"; // Redirect to Terms and Conditions page
        });
    }

    // Terms and Conditions page
    if (termsPage) {
        const acceptButton = document.getElementById("acceptButton");
        const declineButton = document.getElementById("declineButton");

        if (acceptButton) {
            acceptButton.addEventListener("click", function () {
                window.location.href = "photo.html";
            });
        }

        if (declineButton) {
            declineButton.addEventListener("click", function () {
                window.location.href = "thankyou.html";
            });
        }
    }

    // Live Cam screen
    if (liveCamScreen) {
        const video = document.getElementById("videoFeed");
        const canvas = document.getElementById("frameOverlay");
        const captureButton = document.getElementById("captureButton");
        const capturedImage = document.getElementById("capturedImage");

        let stream;

        // Get user media
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (mediaStream) {
                stream = mediaStream;
                video.srcObject = mediaStream;
                video.onloadedmetadata = function () {
                    video.play();
                };
            })
            .catch(function (err) {
                console.log("An error occurred: " + err);
            });

        // Capture photo
        if (captureButton) {
            captureButton.addEventListener("click", function () {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
                capturedImage.src = canvas.toDataURL("image/png");

                // Show the captured image and hide the live cam
                window.location.href = "results.html";

        
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
            });
        }
    }

    // Results page
    if (resultsPage && userInfoForm) {
        userInfoForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            // Get user input values
            const userAge = document.getElementById("userAge").value;
            const userRace = Array.from(document.getElementById("userRace").selectedOptions).map(option => option.value);
            const userGender = document.getElementById("userGender").value;

            // Here you can handle the submission of user information, e.g., sending it to the backend
            // For simplicity, I'm not implementing this part

            // After handling the user information, proceed to the Results page
            document.getElementById("aiResults").innerHTML = `<p>Age: ${userAge}</p><p>Race: ${userRace.join(', ')}</p><p>Gender: ${userGender}</p>`;
        });
    }

    // End Session button
    if (endSessionButton) {
        endSessionButton.addEventListener("click", function () {
            window.location.href = "thankyou.html";
        });
    }

    // Restart button
    if (restartButton) {
        restartButton.addEventListener("click", function () {
            window.location.href = "index.html"; 
        });
    }

    // Yes button
    const yesButton = document.getElementById("yesButton");
    if (yesButton) {
        yesButton.addEventListener("click", function () {
            window.location.href = "thankyou.html";
        });
    }

    // No button
    const noButton = document.getElementById("noButton");
    if (noButton) {
        noButton.addEventListener("click", function () {
            window.location.href = "gender.html";
        });
    }

    // Automatically restart session after 15 seconds on thank you page
    if (thankYouPage) {
        setTimeout(function () {
            window.location.href = "index.html";
        }, 15000); // 15000 milliseconds = 15 seconds
    }

    // Function to toggle visibility of subcategories and their text inputs
    function toggleSubcategories(checkbox, subcategoryId, textInputId) {
        const subcategories = document.getElementById(subcategoryId);
        const textInput = document.getElementById(textInputId);
        if (checkbox.checked) {
            if (subcategories) subcategories.style.display = "block";
            if (textInput) textInput.style.display = "block";
        } else {
            if (subcategories) subcategories.style.display = "none";
            if (textInput) textInput.style.display = "none";
        }
    }

    // Add event listeners to main category checkboxes
    const mainCategories = document.querySelectorAll(".main-category input[type='checkbox']");
    mainCategories.forEach(checkbox => {
        checkbox.addEventListener("change", (event) => {
            switch (event.target.id) {
                case 'black':
                    toggleSubcategories(event.target, 'blackSubcategories', 'africanAmericanInput');
                    break;
                case 'asian':
                    toggleSubcategories(event.target, 'asianSubcategories', 'asianInput');
                    break;
                case 'native-american':
                    toggleSubcategories(event.target, 'nativeSubcategories', 'nativeAmericanInput');
                    break;
                case 'native-hawaiian':
                    toggleSubcategories(event.target, 'hawaiianSubcategories', 'nativeHawaiianInput');
                    break;
                case 'white':
                    toggleSubcategories(event.target, 'whiteSubcategories', 'whiteInput');
                    break;
                case 'native-american':
                    toggleSubcategories(event.target, 'nativeSubcategories', 'nativeAmericanInput');
                    break;
                case 'other':
                    toggleSubcategories(event.target, '', 'otherInput');
                    break;
                // Add more cases as needed for other categories
                default:
                    break;
            }
        });
    });

    // Initialize visibility based on current checked state
    mainCategories.forEach(checkbox => {
        switch (checkbox.id) {
            case 'black':
                toggleSubcategories(checkbox, 'blackSubcategories', 'africanAmericanInput');
                break;
            case 'asian':
                toggleSubcategories(checkbox, 'asianSubcategories', 'asianInput');
                break;
            case 'native-american':
                toggleSubcategories(checkbox, 'nativeSubcategories', 'nativeAmericanInput');
                break;
            case 'native-hawaiian':
                toggleSubcategories(checkbox, 'hawaiianSubcategories', 'nativeHawaiianInput');
                break;
            case 'other':
                toggleSubcategories(checkbox, '', 'otherInput');
                break;
            case 'white':
                toggleSubcategories(checkbox, 'whiteSubcategories', 'whiteInput');
                break;
            case 'native-american':
                toggleSubcategories(checkbox, 'nativeSubcategories', 'nativeAmericanInput');
                break;
            // Add more cases as needed for other categories
            default:
                break;
        }
    });

    // Add event listener for ethnicity form submission to navigate to the thank you page
    if (ethnicityForm) {
        ethnicityForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission
            window.location.href = "thankyou.html"; // Redirect to the Thank You page
        });
    }

    // Add event listener for the submit button
    if (submitButton) {
        submitButton.addEventListener("click", function () {
            // Redirect to the Thank You page
            window.location.href = "thankyou.html";
        });
    }
    // Add event listener for the submit button
    if (conButton) {
        conButton.addEventListener("click", function () {
            // Redirect to the Thank You page
            window.location.href = "race.html";
        });
    }
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = "results.html";
        });
    }
    if (backButton2) {
        backButton2.addEventListener("click", function () {
            window.location.href = "gender.html";
        });
    }
});
