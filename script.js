function createCard(p) {
    const catClass = `card-${p.category}`;
    const price = p.price ? `CC ${p.price.toLocaleString()}` : 'FREE';

    // ELITE CARD LOGIC (S, L, W)
    // These cards are pre-designed full images. We don't want to overlay stats on them.
    if (["S", "L", "W"].includes(p.category)) {
        const img = p.image || 'https://via.placeholder.com/300x420?text=Check+Path';
        return `
            <div class="card ${catClass} card-elite">
                <img src="${img}" alt="${p.name}" class="full-card-img" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/300x420?text=Broken+Path'">
                <div class="elite-price-tag">${price}</div>
            </div>
        `;
    }

    // NORMAL CARD LOGIC (N)
    // These use the template background and individual player photos.
    const img = `players/${p.id}.png`; // Path for cutouts
    const trait = p.bat_trait || p.bowl_trait || 'N/A';

    return `
        <div class="card ${catClass}">
            <div class="ovr-circle">${p.ovr}</div>
            <div class="img-box">
                <img src="${img}" alt="${p.name}" loading="lazy" 
                     onerror="this.src='https://via.placeholder.com/150?text=No+Photo'">
            </div>
            <div class="details">
                <span class="sub-info">${p.country} • ${p.role}</span>
                <span class="name">${p.name}</span>
                <div class="stats-row">
                    <div class="stat">
                        <span class="stat-lab">BAT</span>
                        <span class="stat-val">${p.bat_ovr}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-lab">BOWL</span>
                        <span class="stat-val">${p.bowl_ovr}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-lab">TRAIT</span>
                        <span class="stat-val" style="font-size:0.7rem">${trait}</span>
                    </div>
                </div>
                <div class="price">${price}</div>
            </div>
        </div>
    `;
}
let playersData = [];

// 1. Load Data
fetch('players_data.json')
    .then(res => res.json())
    .then(data => {
        playersData = data;
        renderPlayers(playersData);
    });

// 2. Render Function
function renderPlayers(list) {
    const container = document.getElementById('container');
    const countLabel = document.getElementById('count');
    
    container.innerHTML = list.map(p => createCard(p)).join('');
    countLabel.innerText = list.length;
}

// 3. Search & Filter Logic
document.querySelector('.search-container').addEventListener('input', () => {
    const search = document.getElementById('playerSearch').value.toLowerCase();
    const role = document.getElementById('roleFilter').value;
    const minOvr = parseInt(document.getElementById('ovrFilter').value) || 0;
    const country = document.getElementById('countryFilter').value;

    const filtered = playersData.filter(p => {
        return p.name.toLowerCase().includes(search) &&
               (role === "" || p.role === role) &&
               (p.ovr >= minOvr) &&
               (country === "" || p.country === country);
    });

    renderPlayers(filtered);
});

// Keep your existing function createCard(p) { ... } below this
