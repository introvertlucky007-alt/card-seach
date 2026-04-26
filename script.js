document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const searchInput = document.getElementById('playerSearch');
    const countDisplay = document.getElementById('count');
    let allPlayers = [];

    // Load Data
    fetch('players_data.json')
        .then(res => res.json())
        .then(data => {
            allPlayers = data;
            updateDisplay(allPlayers);
        })
        .catch(err => {
            container.innerHTML = `<p style="color:red">Failed to load players: ${err.message}</p>`;
        });

    // Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allPlayers.filter(p => 
            p.name.toLowerCase().includes(term) || 
            p.country.toLowerCase().includes(term) ||
            p.role.toLowerCase().includes(term)
        );
        updateDisplay(filtered);
    });

    function updateDisplay(list) {
        countDisplay.innerText = list.length;
        container.innerHTML = list.map(player => createCard(player)).join('');
    }

    function createCard(p) {
        const catClass = `card-${p.category}`;
        const img = p.image || 'https://via.placeholder.com/300x330?text=Cric+Core';
        const price = p.price ? `CC ${p.price.toLocaleString()}` : 'FREE';
        const trait = p.bat_trait || p.bowl_trait || 'N/A';

        return `
            <div class="card ${catClass}">
                <div class="ovr-circle">${p.ovr}</div>
                <div class="img-box">
                    <img src="${img}" alt="${p.name}" loading="lazy">
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
                            <span class="stat-val" style="font-size:0.8rem">${trait}</span>
                        </div>
                    </div>
                    <div class="price">${price}</div>
                </div>
            </div>
        `;
    }
});
