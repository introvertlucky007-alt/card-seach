async function loadDatabase() {
    const res = await fetch('players_data.json');
    const data = await res.json();
    document.getElementById('count').innerText = data.length;

    // Group players by OVR
    const groups = data.reduce((acc, player) => {
        const ovr = player.ovr;
        if (!acc[ovr]) acc[ovr] = [];
        acc[ovr].push(player);
        return acc;
    }, {});

    const container = document.getElementById('container');
    const sortedOvrs = Object.keys(groups).sort((a, b) => b - a);

    sortedOvrs.forEach(ovr => {
        const section = document.createElement('div');
        section.className = 'ovr-group';
        section.innerHTML = `<h2 class="ovr-title">OVR ${ovr}</h2><div class="card-grid" id="grid-${ovr}"></div>`;
        container.appendChild(section);

        const grid = document.getElementById(`grid-${ovr}`);
        groups[ovr].forEach(player => {
            const card = document.createElement('div');
            card.className = `card card-${player.category}`;

            if (player.category === "S" || player.category === "L") {
                // Uses the 'image' path from your players.py
                card.innerHTML = `
                    <img src="${player.image}" class="full-image" onerror="this.src='https://via.placeholder.com/200x280?text=Card+Missing'">
                    <div style="position:absolute; bottom:10px; width:100%; text-align:center; font-weight:bold; background:rgba(0,0,0,0.6);">₹${player.price.toLocaleString()}</div>
                `;
            } else {
                // Normal cards: Uses player photo + template logic
                card.innerHTML = `
                    <img src="players/${player.id}.png" class="player-img" onerror="this.src='https://via.placeholder.com/150?text=Photo'">
                    <div class="card-info">
                        <div style="font-size:12px; color:#ffd700;">${player.role}</div>
                        <div style="font-weight:bold;">${player.name}</div>
                        <div class="price">₹${player.price.toLocaleString()}</div>
                    </div>
                `;
            }
            grid.appendChild(card);
        });
    });
}

loadDatabase();