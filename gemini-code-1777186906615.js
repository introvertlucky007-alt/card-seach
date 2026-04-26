async function loadPlayers() {
    const response = await fetch('players_data.json');
    const players = await response.json();
    
    document.getElementById('player-count').innerText = players.length;

    // Group players by OVR
    const grouped = {};
    players.forEach(p => {
        if (!grouped[p.ovr]) grouped[p.ovr] = [];
        grouped[p.ovr].push(p);
    });

    const container = document.getElementById('container');
    const sortedOvrs = Object.keys(grouped).sort((a, b) => b - a);

    sortedOvrs.forEach(ovr => {
        const section = document.createElement('section');
        section.className = 'ovr-section';
        
        section.innerHTML = `
            <div class="ovr-title">Rating: ${ovr}</div>
            <div class="grid" id="grid-${ovr}"></div>
        `;
        
        container.appendChild(section);
        const grid = document.getElementById(`grid-${ovr}`);

        grouped[ovr].forEach(player => {
            const card = document.createElement('div');
            card.className = `card card-${player.category}`;
            
            let cardContent = '';
            
            // If it's a special card (S, W, L), use the full image provided
            if (player.category !== 'N' && player.image) {
                cardContent = `
                    <img src="${player.image}" class="card-special-img" alt="${player.name}">
                    <div class="price-overlay" style="position:absolute; bottom:5px; width:100%; text-align:center; font-weight:bold; color:white; text-shadow: 2px 2px #000; z-index:10;">
                        ₹${player.price.toLocaleString()}
                    </div>
                `;
            } else {
                // If it's a normal card, build it using template + player photo
                cardContent = `
                    <div class="ovr-badge">${player.ovr}</div>
                    <div class="role-badge">${player.role}</div>
                    <div class="card-img-container">
                        <img src="players/${player.id}.png" class="player-photo" onerror="this.src='https://via.placeholder.com/150?text=Player'">
                    </div>
                    <div class="card-info">
                        <div class="name">${player.name}</div>
                        <div class="stats">BAT: ${player.bat_ovr} | BWL: ${player.bowl_ovr}</div>
                        <div class="price-tag">₹${player.price.toLocaleString()}</div>
                    </div>
                `;
            }
            
            card.innerHTML = cardContent;
            grid.appendChild(card);
        });
    });
}

loadPlayers();