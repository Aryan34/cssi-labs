const submitMessage = () => {
    console.log("Submitting message...");
    const passcodeVal = document.querySelector("#passcode").value;
    const messageVal = document.querySelector("#message").value;

    // Send to firebase
    firebase.database().ref().push({
        message: messageVal,
        passcode: passcodeVal
    });

    document.querySelector("#passcode").value = "";
    document.querySelector("#message").value = "";
}
