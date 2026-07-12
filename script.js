let trains = [
  {name: "Intercity Express", from: "Surat", to: "Mumbai", time: "10:00 AM", date: "2026-04-10"},
  {name: "Gujarat Mail", from: "Surat", to: "Ahmedabad", time: "2:00 PM", date: "2026-04-11"},
  {name: "Fast Passenger", from: "Mumbai", to: "Surat", time: "6:00 PM", date: "2026-04-10"},
  {name: "Superfast Express", from: "Surat", to: "Mumbai", time: "8:00 PM", date: "2026-04-12"}
];

function showTrains() {
  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let date = document.getElementById("inqDate").value;

  localStorage.setItem("from", from);
  localStorage.setItem("to", to);

  localStorage.setItem("trainName", "Not selected");
  localStorage.setItem("trainTime", "Not available");
  localStorage.setItem("date", "Not available");

  let output = "";
  let found = false;

  for (let i = 0; i < trains.length; i++) {
    if (
      trains[i].from === from &&
      trains[i].to === to &&
      trains[i].date === date
    ) {
      output += trains[i].name + " - " + trains[i].time + " - " + trains[i].date + "\n";

      if (!found) {
        localStorage.setItem("trainName", trains[i].name);
        localStorage.setItem("trainTime", trains[i].time);
        localStorage.setItem("date", trains[i].date);
        found = true;
      }
    }
  }

  if (!found) {
    output = "No trains available on this date";
  }

  document.getElementById("result").innerText = output;
}

function bookTicket() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let gender = document.getElementById("gender").value;
let email = document.getElementById("email").value.trim();
  let seatType = document.getElementById("seatType").value;
  let travelClass = document.getElementById("class").value;
  
  if (name === "") {
    alert("Enter Name");
    return;
  }

  if (age === "" || isNaN(age) || age < 1 || age > 100) {
    alert("Enter valid Age");
    return;
  }

  if (gender === "") {
    alert("Select Gender");
    return;
  }

  let phone = document.getElementById("phone").value.trim();

if (phone.length !== 10 || isNaN(phone)) {
  alert("Enter valid 10-digit phone number");
  return;
}


  if (email === "" || !email.includes("@") || !email.includes(".")) {
    alert("Enter valid Email");
    return;
  }
if (travelClass === "") {
  alert("Select Class");
  return;
}

  if (seatType === "") {
    alert("Select Seat Type");
    return;
  }


  let from = localStorage.getItem("from");
  let to = localStorage.getItem("to");
  let trainName = localStorage.getItem("trainName");
  let trainTime = localStorage.getItem("trainTime");
  let date = localStorage.getItem("date");

  let ticketId = Math.floor(Math.random() * 1000);
  let seatNo = Math.floor(Math.random() * 50) + 1;

  localStorage.setItem("ticketId", ticketId);
  let basePrice;
  if (travelClass === "General") basePrice = 100;
  else if (travelClass === "Sleeper") basePrice = 300;
  else basePrice = 800;

  let extra = 0;
  if (seatType === "Window") extra = 50;
  else if (seatType === "Aisle") extra = 30;

  let totalPrice = basePrice + extra;

  document.getElementById("ticket").innerText =
    "Ticket ID: " + ticketId +
    "\nName: " + name +
    "\nAge: " + age +
    "\nFrom: " + from +
    "\nTo: " + to +
    "\nDate: " + date +
    "\nTrain: " + trainName +
    "\nTime: " + trainTime +
    "\nSeat No: " + seatNo +
    "\nSeat Type: " + seatType +
    "\nClass: " + travelClass +
    "\nBase Price: Rs." + basePrice +
    "\nExtra: Rs." + extra +
    "\nTotal Price: Rs." + totalPrice;
}

function makePayment() {
  let container = document.querySelector(".card");

  if (!container) {
    alert("Container not found");
    return;
  }

  if (document.getElementById("paymentBox")) return;

  let pay = document.createElement("div");
  pay.id = "paymentBox";

  pay.innerHTML =
    "<h3>Payment</h3>" +
    "<input placeholder='Card Number'><br><br>" +
    "<input placeholder='CVV'><br><br>" +
    "<button onclick='payNow()'>Pay Now</button>";

  container.appendChild(pay);
}

function payNow() {
  alert("Payment Successful! Ticket booked.")
}
  
  function showAllTrains() {
  let output = "";

  for (let i = 0; i < trains.length; i++) {
    output +=
      "Train: " + trains[i].name +
      "\nFrom: " + trains[i].from +
      "\nTo: " + trains[i].to +
      "\nTime: " + trains[i].time +
      "\nDate: " + trains[i].date +
      "\n-------------------\n";
  }

  document.getElementById("schedule").innerText = output;
}
function checkPNR() {
  let input = document.getElementById("pnrInput").value;
  let storedId = localStorage.getItem("ticketId");

  if (input == storedId) {
    let train = localStorage.getItem("trainName");
    let time = localStorage.getItem("trainTime");
    let date = localStorage.getItem("date");

    document.getElementById("pnrResult").innerText =
      "Status: Confirmed\n" +
      "Train: " + train +
      "\nTime: " + time +
      "\nDate: " + date;
  } else {
    document.getElementById("pnrResult").innerText =
      "Invalid PNR / No Booking Found";
  }
}