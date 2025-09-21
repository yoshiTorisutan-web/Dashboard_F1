let allData = {},
  overviewChart,
  constructorPointsChart,
  constructorWinsChart,
  constructorPodiumsChart,
  abandonChart,
  poleChart;

// Couleurs et logos des équipes, y compris nouvelles teams
const teamColors = {
  "Red Bull Racing Honda": "#1E41FF",
  "Red Bull Racing RBPT": "#1E41FF",
  Ferrari: "#DC0000",
  Mercedes: "#00D2BE",
  "McLaren Mercedes": "#FF8700",
  "Alpine Renault": "#2293D1",
  "Aston Martin Aramco Mercedes": "#006F62",
  "Williams Mercedes": "#005AFF",
  "Alfa Romeo Ferrari": "#900000",
  "Haas Ferrari": "#BD0000",
  AlphaTauri: "#2B4562",
  Sauber: "#52E252",
  "AlphaTauri RB Honda": "#6692FF",
  "AlphaTauri RBPT": "#6692FF",
};

const teamLogos = {
  "Red Bull Racing Honda": "/assets/ecuries/RB.jpg",
  "Red Bull Racing RBPT": "/assets/ecuries/RB.jpg",
  Ferrari: "/assets/ecuries/Ferrari.svg",
  Mercedes: "/assets/ecuries/Mercedes.png",
  "McLaren Mercedes": "assets/ecuries/Mclaren.png",
  "Alpine Renault": "/assets/ecuries/Alpine.svg",
  "Aston Martin Aramco Mercedes": "/assets/ecuries/Aston_Martin.png",
  "Williams Mercedes": "/assets/ecuries/Williams.png",
  "Alfa Romeo Ferrari": "/assets/ecuries/Alfa_Romeo.png",
  "Haas Ferrari": "/assets/ecuries/Ferrari.svg",
  AlphaTauri: "/assets/ecuries/AlphaTauri.png",
  Sauber: "/assets/ecuries/Sauber.png",
  "AlphaTauri RB Honda": "/assets/ecuries/Visa.png",
  "AlphaTauri RBPT": "/assets/ecuries/Visa.png",
};

// Chargement des données
async function loadData() {
  const res = await fetch("data/f1data.json");
  allData = await res.json();
  renderTables();
  renderCharts();
}

const driversTable = document.getElementById("driversTable");
const constructorsTable = document.getElementById("constructorsTable");
const searchInput = document.getElementById("searchDrivers");
const searchConstructors = document.getElementById("searchConstructors");
const seasonSelect = document.getElementById("seasonSelect");

// Rendu des tableaux
function renderTables() {
  const season = seasonSelect.value;
  const data = allData[season];
  const driverQuery = searchInput.value.toLowerCase();
  const constructorQuery = searchConstructors.value.toLowerCase();

  // Pilotes
  driversTable.innerHTML = data.drivers
    .filter(
      (d) =>
        (d.givenName + d.familyName).toLowerCase().includes(driverQuery) ||
        d.team.toLowerCase().includes(driverQuery)
    )
    .map((d, i) => {
      const color = teamColors[d.team] || "#cccccc";
      return `
        <tr style="background-color:${color}11" class="hover:opacity-80">
          <td class="p-1 text-xs">${i + 1}</td>
          <td class="p-1 text-xs font-medium">${d.givenName} ${
        d.familyName
      }</td>
          <td class="p-1 text-xs flex items-center">
            <img src="${teamLogos[d.team] || ""}" class="team-logo"/>${d.team}
          </td>
          <td class="p-1 text-xs font-semibold">${d.points}</td>
          <td class="p-1 text-xs text-red-500 font-bold">${d.wins}</td>
          <td class="p-1 text-xs text-yellow-500 font-bold">${d.podiums}</td>
          <td class="p-1 text-xs text-gray-500">${d.dnf}</td>
          <td class="p-1 text-xs text-blue-500">${d.fastestLaps}</td>
          <td class="p-1 text-xs text-purple-500">${d.polePositions}</td>
        </tr>
      `;
    })
    .join("");

  // Constructeurs filtrés
  constructorsTable.innerHTML = data.constructors
    .filter((c) => c.name.toLowerCase().includes(constructorQuery))
    .map((c, i) => {
      const color = teamColors[c.name] || "#cccccc";
      return `
        <tr style="background-color:${color}11" class="hover:opacity-80">
          <td class="p-1 text-xs">${i + 1}</td>
          <td class="p-1 text-xs flex items-center font-medium">
            <img src="${teamLogos[c.name] || ""}" class="team-logo"/>${c.name}
          </td>
          <td class="p-1 text-xs font-semibold">${c.points}</td>
          <td class="p-1 text-xs text-red-500 font-bold">${c.wins}</td>
          <td class="p-1 text-xs text-yellow-500 font-bold">${c.podiums}</td>
          <td class="p-1 text-xs text-purple-500 font-bold">${
            c.polePositions
          }</td>
          <td class="p-1 text-xs text-gray-500 font-bold">${c.dnf || 0}</td>
        </tr>
      `;
    })
    .join("");
}

// Rendu des graphiques
function renderCharts() {
  const season = seasonSelect.value;
  const data = allData[season];
  const constructorLabels = data.constructors.map((c) => c.name);
  const constructorColorsArr = data.constructors.map(
    (c) => teamColors[c.name] || "#ccc"
  );

  // 1️⃣ Pilotes Points / Victoires / Podiums
  if (overviewChart) overviewChart.destroy();
  overviewChart = new Chart(
    document.getElementById("overviewChart").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: data.drivers.map((d) => d.givenName + " " + d.familyName),
        datasets: [
          {
            label: "Points",
            data: data.drivers.map((d) => d.points),
            backgroundColor: "#374151aa",
          },
          {
            label: "Victoires",
            data: data.drivers.map((d) => d.wins),
            backgroundColor: "#ef4444aa",
          },
          {
            label: "Podiums",
            data: data.drivers.map((d) => d.podiums),
            backgroundColor: "#facc15aa",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: { color: "#1f2937", font: { size: 12 } },
          },
          tooltip: { enabled: true },
        },
        scales: { y: { beginAtZero: true } },
      },
    }
  );

  // 2️⃣ Points par écurie
  if (constructorPointsChart) constructorPointsChart.destroy();
  constructorPointsChart = new Chart(
    document.getElementById("constructorPointsChart").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: constructorLabels,
        datasets: [
          {
            label: "Points",
            data: data.constructors.map((c) => c.points),
            backgroundColor: constructorColorsArr,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: { color: "#1f2937", font: { size: 12 } },
          },
          tooltip: {
            callbacks: { label: (ctx) => ctx.dataset.label + ": " + ctx.raw },
          },
        },
        scales: { y: { beginAtZero: true } },
      },
    }
  );

  // 3️⃣ Victoires par écurie
  if (constructorWinsChart) constructorWinsChart.destroy();
  constructorWinsChart = new Chart(
    document.getElementById("constructorWinsChart").getContext("2d"),
    {
      type: "pie",
      data: {
        labels: constructorLabels,
        datasets: [
          {
            label: "Victoires",
            data: data.constructors.map((c) => c.wins),
            backgroundColor: constructorColorsArr,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#1f2937", font: { size: 12 } },
          },
        },
      },
    }
  );

  // 4️⃣ Podiums par écurie
  if (constructorPodiumsChart) constructorPodiumsChart.destroy();
  constructorPodiumsChart = new Chart(
    document.getElementById("constructorPodiumsChart").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: constructorLabels,
        datasets: [
          {
            label: "Podiums",
            data: data.constructors.map((c) => c.podiums),
            backgroundColor: constructorColorsArr,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        plugins: {
          legend: {
            display: true,
            labels: { color: "#1f2937", font: { size: 12 } },
          },
        },
        scales: { x: { beginAtZero: true } },
      },
    }
  );

  // 5️⃣ Abandons par écurie
  if (abandonChart) abandonChart.destroy();
  abandonChart = new Chart(
    document.getElementById("abandonChart").getContext("2d"),
    {
      type: "bar",
      data: {
        labels: constructorLabels,
        datasets: [
          {
            label: "Abandons",
            data: data.constructors.map((c) => c.dnf || 0),
            backgroundColor: constructorColorsArr,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        plugins: {
          legend: {
            display: true,
            labels: { color: "#1f2937", font: { size: 12 } },
          },
        },
        scales: { x: { beginAtZero: true } },
      },
    }
  );

  // 6️⃣ Pole positions par écurie
  if (poleChart) poleChart.destroy();
  poleChart = new Chart(document.getElementById("poleChart").getContext("2d"), {
    type: "pie",
    data: {
      labels: constructorLabels,
      datasets: [
        {
          label: "Pole Positions",
          data: data.constructors.map((c) => c.polePositions || 0),
          backgroundColor: constructorColorsArr,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
          labels: { color: "#1f2937", font: { size: 12 } },
        },
      },
    },
  });
}

// Événements
searchDrivers.addEventListener("input", renderTables);
searchConstructors.addEventListener("input", renderTables);
seasonSelect.addEventListener("change", () => {
  renderTables();
  renderCharts();
});

loadData();
