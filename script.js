let currentIndex = 0;
let filteredData = [...buildingData];
let currentRangeStart = 1;
let currentRangeEnd = 50;

function updateBuildingDisplay() {
    const building = filteredData[currentIndex];
    if (!building) return;

    const nameEl = document.getElementById('buildingName');
    const locationEl = document.getElementById('buildingLocation');
    const heightEl = document.getElementById('buildingHeight');
    const imageEl = document.getElementById('buildingImage');
    const loadingOverlay = document.getElementById('loadingOverlay');

    loadingOverlay.classList.add('active');

    // Update text
    const rankStr = `NO.${building.rank}-`;
    const nameZH = building.name_zh || building.name;
    const nameEN = building.name;
    nameEl.textContent = `${rankStr}${nameZH} (${nameEN})`;

    const countryZH = building.country_zh || building.country;
    const countryEN = building.country;
    locationEl.textContent = `${countryZH} (${countryEN})`;
    heightEl.textContent = `${building.height_m.toFixed(1)} m`;

    // Update image
    const rankImageMap = {
        1: 'assets/burj_khalifa.webp',
        2: 'assets/merdeka_118.webp',
        3: 'assets/shanghai_tower.png',
        4: 'assets/abraj_al_bait.png',
        5: 'assets/ping_an_finance_center.png',
        6: 'assets/lotte_world_tower.png',
        7: 'assets/one_world_trade_center.png',
        8: 'assets/guangzhou_ctf_finance_centre.png',
        9: 'assets/tianjin_ctf_finance_centre.png',
        10: 'assets/china_zun.png',
        11: 'assets/taipei_101.png',
        12: 'assets/shanghai_world_financial_center.png',
        13: 'assets/international_commerce_centre.png',
        14: 'assets/wuhan_greenland_center.png',
        15: 'assets/central_park_tower.png',
        16: 'assets/lakhta_center.png'
    };

    const imgUrl = rankImageMap[building.rank] || 
                   `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80`;

    imageEl.src = imgUrl;

    imageEl.onload = () => {
        loadingOverlay.classList.remove('active');
    };
}

function updateNavigation() {
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === filteredData.length - 1;
    
    // Update active state in dropdowns
    const activeItem = document.querySelector('.dropdown-item.active');
    if (activeItem) activeItem.classList.remove('active');
    
    const rank = filteredData[currentIndex].rank;
    const item = document.querySelector(`.dropdown-item[data-rank="${rank}"]`);
    if (item) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
    }
}

function handleRangeClick(btn, start, end) {
    currentRangeStart = start;
    currentRangeEnd = end;

    const dropdown = btn.nextElementSibling;
    const isShowing = dropdown.classList.contains('show');

    // Close all other dropdowns
    closeAllDropdowns();

    if (!isShowing) {
        populateDropdown(dropdown, start, end);
        dropdown.classList.add('show');
    }

    // Still navigate to the first building in range if not already there
    const currentBuilding = filteredData[currentIndex];
    if (currentBuilding.rank < start || currentBuilding.rank > end) {
        const index = filteredData.findIndex(b => b.rank >= start && b.rank <= end);
        if (index !== -1) {
            currentIndex = index;
            updateBuildingDisplay();
            updateNavigation();
            highlightActiveRange(start, end);
        }
    }
}

function populateDropdown(dropdown, start, end) {
    const buildings = filteredData.filter(b => b.rank >= start && b.rank <= end);
    dropdown.innerHTML = buildings.map(b => `
        <div class="dropdown-item ${b.rank === filteredData[currentIndex].rank ? 'active' : ''}" data-rank="${b.rank}">
            <span class="item-rank">${b.rank}</span>
            <span class="item-name">${b.name_zh || b.name}</span>
            <span class="item-height">${b.height_m.toFixed(1)} m</span>
        </div>
    `).join('');

    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const rank = parseInt(item.dataset.rank);
            const index = filteredData.findIndex(b => b.rank === rank);
            if (index !== -1) {
                currentIndex = index;
                updateBuildingDisplay();
                updateNavigation();
                closeAllDropdowns();
            }
        });
    });

    // Scroll active item into view
    const activeItem = dropdown.querySelector('.dropdown-item.active');
    if (activeItem) {
        setTimeout(() => {
            activeItem.scrollIntoView({ block: 'nearest' });
        }, 100);
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.ranking-dropdown').forEach(d => d.classList.remove('show'));
}

function highlightActiveRange(start, end) {
    const btns = document.querySelectorAll('.range-btn');
    btns.forEach(btn => {
        if (parseInt(btn.dataset.start) === start && parseInt(btn.dataset.end) === end) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateBuildingDisplay();
        updateNavigation();
        updateCurrentRange();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex < filteredData.length - 1) {
        currentIndex++;
        updateBuildingDisplay();
        updateNavigation();
        updateCurrentRange();
    }
});

function updateCurrentRange() {
    const rank = filteredData[currentIndex].rank;
    const start = Math.floor((rank - 1) / 50) * 50 + 1;
    const end = start + 49;
    highlightActiveRange(start, end);
}

document.querySelectorAll('.range-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleRangeClick(btn, parseInt(btn.dataset.start), parseInt(btn.dataset.end));
    });
});

// Close dropdowns on click outside
document.addEventListener('click', () => {
    closeAllDropdowns();
});

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    updateBuildingDisplay();
    updateNavigation();
});

// Mock Action Buttons
document.getElementById('exportPdfBtn').addEventListener('click', () => {
    alert('正在將 1-250 排名資料匯出成 PDF...');
});

// Search Modal Logic
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const closeSearchBtn = document.getElementById('closeSearchBtn');
const searchBtn = document.getElementById('searchBtn');

function openSearch() {
    searchModal.classList.add('show');
    searchInput.value = '';
    searchInput.focus();
    renderSearchResults('');
}

function closeSearch() {
    searchModal.classList.remove('show');
}

function renderSearchResults(query) {
    const results = buildingData.filter(b => {
        const q = query.toLowerCase();
        return b.name.toLowerCase().includes(q) || 
               (b.name_zh && b.name_zh.includes(query)) ||
               b.country.toLowerCase().includes(q) ||
               (b.country_zh && b.country_zh.includes(query)) ||
               b.city.toLowerCase().includes(q);
    }).slice(0, 50); // Limit to top 50 matches

    if (results.length === 0) {
        searchResults.innerHTML = '<div style="padding: 20px; color: #888; text-align: center;">找不到符合的建築物</div>';
        return;
    }

    searchResults.innerHTML = results.map(b => `
        <div class="result-item" data-rank="${b.rank}">
            <span class="result-rank">No.${b.rank} -</span>
            <span class="result-name">${b.name_zh || b.name} (${b.name})</span>
        </div>
    `).join('');

    searchResults.querySelectorAll('.result-item').forEach(item => {
        item.addEventListener('click', () => {
            const rank = parseInt(item.dataset.rank);
            const index = buildingData.findIndex(b => b.rank === rank);
            if (index !== -1) {
                currentIndex = index;
                updateBuildingDisplay();
                updateNavigation();
                updateCurrentRange();
                closeSearch();
            }
        });
    });
}

searchBtn.addEventListener('click', openSearch);
closeSearchBtn.addEventListener('click', closeSearch);

searchInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
});

// Close modal on click outside
searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
        closeSearch();
    }
});

// ESC key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('show')) {
        closeSearch();
    }
});

document.getElementById('sortBtn').addEventListener('click', () => {
    alert('目前已按高度從高到低排序。');
});
