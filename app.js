document.addEventListener("DOMContentLoaded", loadPromises);

const sendSMSCheckbox = document.getElementById("sendSMS");
const phoneNumberInput = document.getElementById("phoneNumber");

sendSMSCheckbox.addEventListener("change", () => {
    phoneNumberInput.disabled = !sendSMSCheckbox.checked;
});

function addPromise() {
    const promiseText = document.getElementById("promiseText").value.trim();
    const penaltyAmount = document.getElementById("penaltyAmount").value.trim();
    const sendSMS = document.getElementById("sendSMS").checked;
    const phoneNumber = document.getElementById("phoneNumber").value.trim();

    if (!promiseText || !penaltyAmount) {
        alert("Please enter a promise and penalty amount.");
        return;
    }

    const promise = {
        text: promiseText,
        amount: penaltyAmount,
        date: new Date().toLocaleString(),
        sendSMS: sendSMS,
        phone: sendSMS ? phoneNumber : ""
    };

    let promises = JSON.parse(localStorage.getItem("promises")) || [];
    promises.push(promise);
    localStorage.setItem("promises", JSON.stringify(promises));

    document.getElementById("promiseText").value = "";
    document.getElementById("penaltyAmount").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("sendSMS").checked = false;
    phoneNumberInput.disabled = true;

    loadPromises();
}

function loadPromises() {
    const promiseList = document.getElementById("promiseList");
    promiseList.innerHTML = "";

    let promises = JSON.parse(localStorage.getItem("promises")) || [];

    promises.forEach((promise, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${promise.text}</strong> <br>
            Penalty: ₹${promise.amount} <br>
            Date: ${promise.date} <br>
            ${promise.sendSMS ? 📩 SMS to: ${promise.phone} : ""}
            <button class="delete-btn" onclick="deletePromise(${index})">Delete</button>
        `;
        promiseList.appendChild(li);
    });
}

function deletePromise(index) {
    let promises = JSON.parse(localStorage.getItem("promises")) || [];
    promises.splice(index, 1);
    localStorage.setItem("promises", JSON.stringify(promises));
    loadPromises();
}
