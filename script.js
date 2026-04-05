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
    const completionEl = document.getElementById('buildingCompletion');
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
    completionEl.textContent = `${building.completion_year || '---'}`;

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
        16: 'assets/lakhta_center.png',
        17: 'assets/landmark_81.png',
        18: 'assets/international_land_sea_center.png',
        19: 'assets/the_exchange_106.png',
        20: 'assets/changsha_ifs_tower_t1.png',
        21: 'assets/petronas_tower_1.png',
        22: 'assets/petronas_tower_2.png',
        23: 'assets/suzhou_ifs.png',
        24: 'assets/zifeng_tower.png',
        25: 'assets/wuhan_center.png',
        26: 'assets/willis_tower.png',
        27: 'assets/kk100.png',
        28: 'assets/guangzhou_international_finance_center.png',
        29: 'assets/111_west_57th_street.png',
        30: 'assets/shandong_international_financial_center.png',
        31: 'assets/one_vanderbilt.png',
        32: 'assets/432_park_avenue.png',
        33: 'assets/marina_101.png',
        34: 'assets/trump_international_hotel_and_tower.png',
        35: 'assets/270_park_avenue.png',
        36: 'assets/minying_international_trade_center_t2.png',
        37: 'assets/jin_mao_tower.png',
        38: 'assets/nanjing_financial_city_tower_1.png',
        39: 'assets/princess_tower.png',
        40: 'assets/al_hamra_tower.png',
        41: 'assets/international_finance_centre.png',
        42: 'assets/haeundae_lct_landmark_tower.png',
        43: 'assets/ningbo_central_plaza.png',
        44: 'assets/guangxi_china_resources_tower.png',
        45: 'assets/guiyang_international_financial_center_t1.png',
        46: 'assets/iconic_tower.png',
        47: 'assets/china_merchants_bank_headquarters.png',
        48: 'assets/china_resources_tower.png',
        49: 'assets/23_marina.png',
        50: 'assets/citic_plaza.png',
        51: 'assets/citymark_centre.png',
        52: 'assets/shum_yip_upperhills_tower_1.png',
        53: 'assets/30_hudson_yards.png',
        54: 'assets/capital_market_authority.png',
        55: 'assets/pif_tower.png',
        56: 'assets/shun_hing_square.png',
        57: 'assets/eton_place_dalian_tower_1.png',
        58: 'assets/autograph_tower.png',
        59: 'assets/logan_century_center_1.png',
        60: 'assets/burj_mohammed_bin_rashid.png',
        61: 'assets/empire_state_building.png',
        62: 'assets/elite_residence.png',
        63: 'assets/riverview_plaza.png',
        64: 'assets/dabaihui_plaza.png',
        65: 'assets/guangdong_business_center.png',
        66: 'assets/central_plaza.png',
        67: 'assets/federation_tower_east.png',
        68: 'assets/hengfeng_guiyang_center_tower_1.png',
        69: 'assets/dalian_international_trade_center.png',
        70: 'assets/shanghai_international_trade_center.png',
        71: 'assets/haitian_center_tower_2.png',
        72: 'assets/golden_eagle_tiandi_tower_a.png',
        73: 'assets/bank_of_china_tower.png',
        74: 'assets/bank_of_america_tower.png',
        75: 'assets/ciel_dubai_marina.png',
        76: 'assets/st_regis_chicago.png',
        77: 'assets/almas_tower.png',
        78: 'assets/huiyun_center.png',
        79: 'assets/hanking_center.png',
        80: 'assets/greenland_group_suzhou_center.png',
        81: 'assets/gevora_hotel.png',
        82: 'assets/galaxy_world_tower_1.png',
        83: 'assets/jw_marriott_marquis_dubai_1.png',
        84: 'assets/emirates_office_tower.png',
        85: 'assets/raffles_city_chongqing_t3n.png',
        86: 'assets/oko_south_tower.png',
        87: 'assets/cbrt_tower.png',
        88: 'assets/skytower_pinnacle_one_yonge.png',
        89: 'assets/forum_66_tower_1.png',
        90: 'assets/the_pinnacle.png',
        91: 'assets/xian_glory_international_financial_center.png',
        92: 'assets/spring_city_66.png',
        93: 'assets/85_sky_tower.png',
        94: 'assets/aon_center.png',
        95: 'assets/the_center.png',
        96: 'assets/neva_towers_2.png',
        97: 'assets/xiamen_cross_strait_financial_centre.png',
        98: 'assets/john_hancock_center.png',
        99: 'assets/adnoc_headquarters.png',
        100: 'assets/ahmed_abdul_rahim_al_attar_tower.png',
        101: 'assets/tianjin_world_financial_center.png',
        102: 'assets/damac_heights.png',
        103: 'assets/shimao_international_plaza.png',
        104: 'assets/rose_tower.png',
        105: 'assets/wenzhou_world_trade_center.png',
        106: 'assets/minsheng_bank_building.png',
        107: 'assets/china_world_trade_center_tower_iii.png',
        108: 'assets/ryugyong_hotel.png',
        109: 'assets/yuexiu_fortune_center_tower_1.png',
        110: 'assets/zhuhai_tower.png',
        111: 'assets/hon_kwok_city_center.png',
        112: 'assets/al_yaqoub_tower_dubai.png',
        113: 'assets/longxi_international_hotel.png',
        114: 'assets/the_wharf_times_square_wuxi.png',
        115: 'assets/wuxi_suning_plaza_tower_1.png',
        116: 'assets/baoneng_center_shenzhen.png',
        117: 'assets/the_address_boulevard_dubai.png',
        118: 'assets/index_tower_dubai.png',
        119: 'assets/the_landmark_abu_dhabi.png',
        120: 'assets/q1_tower_gold_coast.png',
        121: 'assets/burj_al_arab_dubai.png',
        122: 'assets/guangxi_finance_plaza.png',
        123: 'assets/nina_tower_hong_kong.png',
        124: 'assets/farglory_financial_center.png',
        125: 'assets/sinar_mas_center_1.png',
        126: 'assets/chrysler_building.png',
        127: 'assets/new_york_times_building.png',
        128: 'assets/hhhr_tower_dubai.png',
        129: 'assets/chongqing_ifs_t1.png',
        130: 'assets/nanjing_youth_cultural_centre_t1.png',
        131: 'assets/mahanakhon_bangkok.png',
        132: 'assets/bank_of_america_plaza_atlanta.png',
        133: 'assets/abu_dhabi_plaza_astana.png',
        134: 'assets/us_bank_tower_la.png',
        135: 'assets/menara_telekom_kl.png',
        136: 'assets/ocean_heights_dubai.png',
        137: 'assets/fortune_center_guangzhou.png',
        138: 'assets/pearl_river_tower_guangzhou.png',
        139: 'assets/jumeirah_emirates_towers_hotel_dubai.png',
        140: 'assets/one_island_east_hong_kong.png',
        141: 'assets/burj_rafal_riyadh.png',
        142: 'assets/franklin_center_chicago.png',
        143: 'assets/east_pacific_center_tower_a_shenzhen.png',
        144: 'assets/the_address_beach_resort_dubai.png',
        145: 'assets/abeno_harukas.png',
        146: 'assets/arraysa_tower_2_kuwait.png',
        147: 'assets/commerzbank_tower_frankfurt.png',
        148: 'assets/doosan_haeundae_zenith_a_busan.png',
        149: 'assets/gran_torre_santiago.png',
        150: 'assets/shimao_yangtze_river_tower_1_nanjing.png',
        151: 'assets/the_hub_t1_nanjing.png',
        152: 'assets/first_canadian_place.png',
        153: 'assets/honglong_century_plaza.png',
        154: 'assets/shanghai_wheelock_square.png',
        155: 'assets/four_world_trade_center.png',
        156: 'assets/eureka_tower.png',
        157: 'assets/comcast_center.png',
        158: 'assets/emirates_crown.png',
        159: 'assets/yokohama_landmark_tower.png',
        160: 'assets/311_south_wacker_drive.png',
        161: 'assets/seg_plaza.png',
        162: 'assets/global_trade_plaza.png',
        163: 'assets/key_tower.png',
        164: 'assets/one_liberty_place.png',
        165: 'assets/plaza_66_tower_1.png',
        166: 'assets/sulafa_tower.png',
        167: 'assets/millennium_tower.png',
        168: 'assets/tomorrow_square.png',
        169: 'assets/columbia_center.png',
        170: 'assets/chongqing_world_trade_center.png',
        171: 'assets/cheung_kong_center.png',
        172: 'assets/trump_building.png',
        173: 'assets/one_manhattan_square_new_york.png',
        174: 'assets/bank_of_america_plaza.png',
        175: 'assets/oub_centre.png',
        176: 'assets/republic_plaza.png',
        177: 'assets/uob_plaza_one.png',
        178: 'assets/citigroup_center.png',
        179: 'assets/jumeirah_lake_towers.png',
        180: 'assets/diwang_international_commerce_center.png',
        181: 'assets/scotia_plaza.png',
        182: 'assets/williams_tower.png',
        183: 'assets/bjwto_tower.png',
        184: 'assets/wuhan_world_trade_tower.png',
        185: 'assets/aura.png',
        186: 'assets/the_cullinan_north_tower.png',
        187: 'assets/the_cullinan_south_tower.png',
        188: 'assets/oue_downtown_1.png',
        189: 'assets/al_kazim_towers.png',
        190: 'assets/grand_gateway_shanghai_i.png',
        191: 'assets/grand_gateway_shanghai_ii.png',
        192: 'assets/nathani_heights.png',
        193: 'assets/boc_tower.png',
        194: 'assets/banyan_tree_residences.png',
        195: 'assets/isis.png',
        196: 'assets/lct_residential_tower.png',
        197: 'assets/pbcom_tower.png',
        198: 'assets/kempinski_hotel_doha.png',
        199: 'assets/the_imperial_i.png',
        200: 'assets/the_imperial_ii.png',
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
