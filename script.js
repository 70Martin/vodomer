function calculate() {
  const reference = parseFloat(document.getElementById("reference").value) || 0;
  const stav = parseFloat(document.getElementById("stav").value) || 0;
  const vodne = parseFloat(document.getElementById("vodne").value) || 0;
  const stocne = parseFloat(document.getElementById("stocne").value) || 0;
  const dph = parseFloat(document.getElementById("dph").value) || 0;

  const spotreba = stav - reference;
  const cena = spotreba * (vodne + stocne) * (1 + dph / 100);

  document.getElementById("spotreba").innerText = spotreba > 0 ? spotreba.toFixed(2) : 0;
  document.getElementById("cena").innerText = spotreba > 0 ? cena.toFixed(2) : 0;
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", calculate);
});

document.getElementById("saveButton").addEventListener("click", () => {
  const reference = document.getElementById("reference").value;
  const stav = document.getElementById("stav").value;
  const vodne = document.getElementById("vodne").value;
  const stocne = document.getElementById("stocne").value;
  const dph = document.getElementById("dph").value;
  const datum = document.getElementById("datum").value;
  const spotreba = document.getElementById("spotreba").innerText;
  const cena = document.getElementById("cena").innerText;

  const csvContent = `Datum,Referenční číslo,Stav vodoměru,Spotřeba (m³),Cena (Kč)
${datum},${reference},${stav},${spotreba},${cena}`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "odecet_vody.csv";
  link.click();
});

document.getElementById("loadButton").addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".csv";

  input.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const lines = reader.result.split("\n").slice(1); // Ignorujeme hlavičku
      const [datum, reference, stav] = lines[0].split(",");

      document.getElementById("datum").value = datum;
      document.getElementById("reference").value = reference;
      document.getElementById("stav").value = stav;

      calculate();
    };

    reader.readAsText(file);
  });

  input.click();
});

calculate();
