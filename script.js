document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const countDisplay = document.getElementById('count');

    // Fetch the JSON data
    fetch('players_data.json')
        .then(response => response.json())
        .then(data => {
            countDisplay.innerText = data.length;
            renderPlayers(data);
        })
        .catch(err => console.error('Error loading player data:', err));

    function renderPlayers(players) {
        container.innerHTML = players.map(player => {
            // Determine category class and display text
            const categoryClass = `card-${player.category}`;
            const imagePath = player.image || 'https://via.placeholder.com/300x300?text=Cric+Core';
            
            return `
                <div class="player-card ${categoryClass}">
                    <div class="card-image-wrapper">
                        <img src="${imagePath}" alt="${player.name}" onerror="this.src='https://via.placeholder.com/300x300?text=Image+Missing'">
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <span class="player-name">${player.name}</span>
                            <span class="ovr-badge">${player.ovr}</span>
                        </div>
                        <div class="player-info">
                            <span>${player.country}</span>
                            <span>•</span>
                            <span>${player.role}</span>
                        </div>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">Batting</span>
                                <span class="stat-value">${player.bat_ovr}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Bowling</span>
                                <span class="stat-value">${player.bowl_ovr}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Trait</span>
                                <span class="stat-value">${player.bat_trait || player.bowl_trait || 'N/A'}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Type</span>
                                <span class="stat-value">${player.type || 'Standard'}</span>
                            </div>
                        </div>
                        <div class="price-tag">
                            CC ${player.price.toLocaleString()}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
});