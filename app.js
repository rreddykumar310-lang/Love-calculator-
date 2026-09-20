const form = document.getElementById("loveForm");
const result = document.getElementById("result");
const scoreEl = document.getElementById("score");
const resultText = document.getElementById("resultText");
const statusEl = document.getElementById("status");
const again = document.getElementById("again");

function makeScore() {
  // Always returns an integer from 80 through 100.
  return Math.floor(Math.random() * 21) + 80;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "Calculating...";

  const data = {
    yourName: document.getElementById("yourName").value.trim(),
    yourGender: document.getElementById("yourGender").value,
    crushName: document.getElementById("crushName").value.trim(),
    crushGender: document.getElementById("crushGender").value
  };

  const score = makeScore();

  scoreEl.textContent = `${score}%`;
  resultText.textContent = `${data.yourName} & ${data.crushName} have a ${score}% love compatibility.`;
  result.classList.remove("hidden");

  try {
    const response = await fetch("/api/send-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, score })
    });

    const payload = await response.json();

    if (response.ok && payload.success) {
      statusEl.textContent = "Result calculated. Details were sent successfully.";
    } else {
      statusEl.textContent = "Result calculated. Email could not be sent yet.";
    }
  } catch (error) {
    statusEl.textContent = "Result calculated. Email service is not connected yet.";
  }

  result.scrollIntoView({ behavior: "smooth", block: "center" });
});

again.addEventListener("click", () => {
  result.classList.add("hidden");
  statusEl.textContent = "";
  document.getElementById("yourName").focus();
});
