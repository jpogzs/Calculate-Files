// Author: Pogi

const output = document.getElementById("output");

// Build initial header (fastest: build string in memory)
let buffer = `As of ${new Date().toLocaleString()}\n============================\n`;

// Faster fetchCount (unchanged logic)
async function fetchCount(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data.length : 0;
  } catch (err) {
    return `ERROR (${err.message})`;
  }
}

// Sections and endpoints
const sections = [
  {
    title: "IP QUEUE",
    items: [
      {
        label: "DROP",
        url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=16&value=ReadyForDropping&type=26&value=true&type=30&value=Test&type=30&value=Pilot&type=18&value=HQ&type=30&value=Training"
      },
      {
        label: "NPAID",
        url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=16&value=ReadyForNPAVerification&type=26&value=true&type=30&value=Test&type=30&value=Pilot&type=30&value=Training"
      },
      {
        label: "IV",
        url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=16&value=ReadyForImageVerification&type=26&value=true&type=30&value=Test&type=30&value=Pilot&type=32&value=Training"
      },
      { label: "Sitemap", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=30&value=test&type=16&value=ReadyForSitemapCreation&type=30&value=training&type=26&value=true&" },
      {
        label: "BluePrint",
        url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=20&value=blueprint&type=30&value=test&type=30&value=training&type=16&value=ReadyForUserDocumentVerification&type=37&value=60426&type=37&value=60486&type=25&value=11/13/2025"
      }
    ]
  },
  {
    title: "MT TEAMLEAD",
    items: [
      { label: "Ready To Measure", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=25&value=11/20/22&type=16&value=readytomeasure&type=30&value=test&type=30&value=training&type=26&value=true&type=18&value=HQ&" },
      { label: "Walls", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=30&value=training&type=30&value=test&type=33&value=Wall&type=26&value=true&type=18&value=hq&type=16&value=Readytomeasure&type=44&value=InProcess-ProcessStarted&" },
      { label: "CommWall", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=30&value=training&type=30&value=test&type=33&value=CommercialWalls&type=26&value=true&type=18&value=hq&type=16&value=Readytomeasure&type=44&value=InProcess-ProcessStarted&" },
      { label: "WallSOM", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=26&value=true&type=16&value=readytomeasure&type=30&value=Test&type=30&value=Pilot&type=18&value=HQ&type=33&value=WallSOM&type=30&value=Training&type=21&value=assignment&" },
      { label: "Hipster", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=26&value=true&type=33&value=3DRoofHipster&type=18&value=hq&type=30&value=test&type=16&value=readytomeasure&type=30&value=training&" },
      { label: "Inform Advance", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=16&value=readytomeasure&type=30&value=test&type=25&value=12/13/22&type=26&value=true&type=30&value=training&type=20&value=Inform%20Advanced&" },
      { label: "3D Roof", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=30&value=training&type=30&value=test&type=33&value=ThreeDRoof&type=26&value=true&type=18&value=hq&type=16&value=Readytomeasure&type=21&value=Walls&type=44&value=InProcess-ProcessStarted&" },
      { label: "Assess", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=20&value=Assess%20detect&type=18&value=hq&type=26&value=true&type=34&value=465415&type=16&value=ReadyForAssessManual&type=20&value=Assess%20View&type=45&value=completed-sent&type=30&value=test&type=30&value=training&" }
    ]
  },
  {
    title: "True Design",
    items: [
      { label: "True Design RTM", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=16&value=readytomeasure&type=30&value=training&type=26&value=true&type=25&value=12/13/22&type=20&value=truedesign&type=30&value=test&" }
    ]
  },
  {
    title: "QC TEAMLEAD",
    items: [
      { label: "RQC", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=26&value=true&type=30&value=training&type=16&value=ReadyForQC&type=25&value=11/20/22&type=30&value=test&type=18&value=HQ&" },
      { label: "Walls", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=30&value=training&type=30&value=test&type=33&value=Wall&type=26&value=true&type=18&value=hq&type=16&value=Readyforqc&type=44&value=InProcess-ProcessStarted&" },
      { label: "CommWall", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=30&value=training&type=30&value=test&type=33&value=CommercialWalls&type=26&value=true&type=18&value=hq&type=16&value=Readyforqc&type=44&value=InProcess-ProcessStarted&" },
      { label: "WallSOM", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=26&value=true&type=16&value=ReadyforQC&type=30&value=Test&type=30&value=Pilot&type=18&value=HQ&type=33&value=WallSOM&type=30&value=Training&type=21&value=assignment&" },
      { label: "Hipster", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=18&value=hq&type=16&value=readyforqc&type=26&value=true&type=33&value=3DRoofHipster&type=30&value=test&type=30&value=training&" },
      { label: "Inform Advance", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=25&value=05/15/2025&type=20&value=Inform%20Advanced&type=30&value=test&type=26&value=true&type=16&value=Readyforqc&type=30&value=training&" },
      { label: "3D Roof", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=30&value=training&type=30&value=test&type=33&value=ThreeDRoof&type=26&value=true&type=18&value=hq&type=16&value=Readyforqc&type=21&value=Walls&type=44&value=InProcess-ProcessStarted&" },
      { label: "Assess", url: "https://api.cmh.platform-prod.evinternal.net/operations-center/api/TaskTrafficView/?type=20&value=Assess%20detect&type=18&value=hq&type=26&value=true&type=34&value=465415&type=16&value=ReadyForAssessQCReview&type=20&value=Assess%20View&type=45&value=completed-sent&type=30&value=test&type=30&value=training&" }
    ]
  }
];

// Render all
(async function render() {
  for (const section of sections) {
    buffer += `\n${section.title}\n============================\n`;

    // Parallel fetches
    const results = await Promise.all(
      section.items.map(i => fetchCount(i.url))
    );

    // Build section output in memory
    for (let i = 0; i < section.items.length; i++) {
      buffer += `${section.items[i].label} = ${results[i]}\n`;
    }
  }

  buffer += "\n============================\n";

  // FINAL OUTPUT WRITE (only once â†’ fastest)
  output.textContent = buffer;
})();