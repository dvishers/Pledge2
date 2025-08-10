document.addEventListener("DOMContentLoaded", loadPromises);

document.getElementById("pledge-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const commitment = document.getElementById("commitment").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const person = document.getElementById("person").value.trim();
    const sendSMS = document.getElementById("sendSMS").checked;

    if (!commitment  !amount  !person) {
        alert("Please fill in all fields.");
        return;
    }

    const promises = JSON.parse(localStorage.getItem("promises") || "[]");
    const newPromise = {
        commitment,
        amount,
        person,
        sendSMS,
        date: new Date().toLocaleString()
    };

    promises.push(newPromise);
    localStorage.setItem("promises", JSON.stringify(promises));

    document.getElementById("pledge-form").reset();

    loadPromises();

    if (sendSMS) {
        alert(`(Simulated) SMS sent to ${person}: You made a promise - "${commitment}" with a penalty of ₹${amount}.`);
    }
});

function loadPromises() {
    const pledgeList = document.getElementById("pledge-list");
    pledgeList.innerHTML = "";

    const promises = JSON.parse(localStorage.getItem("promises") || "[]");

    promises.forEach((p, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${p.commitment}</strong> — ₹${p.amount}
                <br><small>To: ${p.person}</small>
                <br><small>Date: ${p.date}</small>
            </div>
            <button onclick="deletePromise(${index})">❌</button>
        `;
        pledgeList.appendChild(li);
    });
}

function deletePromise(index) {
    const promises = JSON.parse(localStorage.getItem("promises") || "[]");
    promises.splice(index, 1);
    localStorage.setItem("promises", JSON.stringify(promises));
    loadPromises();
}
