async function loadDatabase() {
    const res = await fetch('players_data.json');
    const data = await res.json();
    
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
        section.innerHTML = `<h2 class="ovr-title">OVR ${ovr}</h2><div class="card-grid"></div>`;
        const grid = section.querySelector('.card-grid');

        groups[ovr].forEach(player => {
            const card = document.createElement('div');
            card.className = `card card-${player.category}`;

            // Check if it's an Elite Card (S, L, or W)
            if (["S", "L", "W"].includes(player.category)) {
                card.innerHTML = `
                    <img src="${player.image}" class="full-card-img" onerror="this.src='https://via.placeholder.com/200x280?text=Check+Extension'">
                    <div class="price-overlay">₹${player.price.toLocaleString()}</div>
                `;
            } else {
                // It's a Normal Card (N)
                card.innerHTML = `
                    <div class="ovr-tag">${player.ovr}</div>
                    <img src="players/${player.id}.png" class="cutout-img" onerror="this.src='https://via.placeholder.com/150?text=No+Photo'">
                    <div class="card-details">
                        <div class="p-name">${player.name}</div>
                        <div class="p-price">₹${player.price.toLocaleString()}</div>
                    </div>
                `;
            }
            grid.appendChild(card);
        });
        container.appendChild(section);
    });
}
loadDatabase();