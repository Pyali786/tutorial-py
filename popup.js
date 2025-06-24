
document.getElementById("scrapeBtn").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: scrapeAndSendTables
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "showTables") {
    const container = document.getElementById("result");
    container.innerHTML = request.html;
    document.getElementById("downloadBtn").style.display = 'block';
    document.getElementById("downloadBtn").onclick = () => downloadCSV(request.csv);
  }
});

function downloadCSV(csv) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "scraped_table.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function scrapeAndSendTables() {
  const tables = document.querySelectorAll("table");
  if (tables.length === 0) {
    alert("No tables found.");
    return;
  }

  let html = "", csv = "";

  tables.forEach((table, idx) => {
    html += `<h4>Table ${idx + 1}</h4><table>`;
    for (let row of table.rows) {
      html += "<tr>";
      let csvRow = [];
      for (let cell of row.cells) {
        html += `<td>${cell.innerText}</td>`;
        csvRow.push(`"${cell.innerText.replace(/"/g, '""')}"`);
      }
      html += "</tr>";
      csv += csvRow.join(",") + "\n";
    }
    html += "</table><hr/>";
  });

  chrome.runtime.sendMessage({ type: 'showTables', html: html, csv: csv });
}
