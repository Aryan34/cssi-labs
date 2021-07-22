let numTries = 3;

const getMessages = () => {
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        // console.log(data);

        const passcodeAttempt = document.querySelector("#passcode").value;
        const errorMessage = document.querySelector("#error");
        const errorText = document.querySelector("#error-text");
        const loginField = document.querySelector(".login");
        const messageContainer = document.querySelector(".container");

        let correctPasscode = false;
        for (const recordKey in data) {
            const record = data[recordKey];
            
            const storedPasscode = record.passcode;
            if (passcodeAttempt === storedPasscode) {
                const newMessage = document.createElement("div");
                newMessage.textContent = record.message;
                messageContainer.appendChild(newMessage);
                correctPasscode = true;
            }
        }        
        
        if (!correctPasscode && numTries > 1) {
            --numTries;
            errorMessage.classList.remove("is-hidden");
            errorText.textContent = `${passcodeAttempt} is not the password for any of the messages. ${numTries} tries remaining.`;
        } else if (!correctPasscode) {
            errorText.textContent = "No tries remaining. You have been locked out of the secret messaging app for 5 seconds.";
            loginField.classList.add("is-hidden");
            messageContainer.classList.add("is-hidden");

            let flag = true;
            while (flag) {
                setTimeout(function(){ flag = false; }, 5000);
            }            

            loginField.classList.remove("is-hidden");
            messageContainer.classList.remove("is-hidden");            
        } else if (!errorMessage.classList.contains("is-hidden")) {
            errorMessage.classList.add("is-hidden");
        }
    });
}

const renderMessageAsHtml = (message) => {
    const passcodeInput = document.querySelector("#passcode");
    passcodeInput.value = "";

    const messageDisplay = document.querySelector("#message");
    messageDisplay.innerHTML = message;
}