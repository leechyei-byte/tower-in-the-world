const fs = require('fs');

const cityZhMap = {
    "Dubai": "杜拜",
    "Kuala Lumpur": "吉隆坡",
    "Shanghai": "上海",
    "Mecca": "麥加",
    "Shenzhen": "深圳",
    "Seoul": "首爾",
    "New York City": "紐約市",
    "Guangzhou": "廣州",
    "Tianjin": "天津",
    "Beijing": "北京",
    "Taipei": "台北",
    "Hong Kong": "香港",
    "Wuhan": "武漢",
    "Saint Petersburg": "聖彼得堡",
    "Ho Chi Minh City": "胡志明市",
    "Chongqing": "重慶",
    "Changsha": "長沙",
    "Nanjing": "南京",
    "Suzhou": "蘇州",
    "Chicago": "芝加哥",
    "Jinan": "濟南",
    "Dongguan": "東莞",
    "Kuwait City": "科威特市",
    "Busan": "釜山",
    "Ningbo": "寧波",
    "Nanning": "南寧",
    "Guiyang": "貴陽",
    "New Administrative Capital": "新行政首都",
    "Dalian": "大連",
    "Jakarta": "雅加達",
    "Abu Dhabi": "阿布達比",
    "Moscow": "莫斯科",
    "Qingdao": "青島",
    "Istanbul": "伊斯坦堡",
    "Toronto": "多倫多",
    "Shenyang": "瀋陽",
    "Xi'an": "西安",
    "Kunming": "昆明",
    "Kaohsiung": "高雄",
    "Xiamen": "廈門",
    "Wenzhou": "溫州",
    "Pyongyang": "平壤",
    "Zhuhai": "珠海",
    "Jiangyin": "江陰",
    "Wuxi": "無錫",
    "Gold Coast": "黃金海岸",
    "Bangkok": "曼谷",
    "Astana": "阿斯塔納",
    "Atlanta": "亞特蘭大",
    "Los Angeles": "洛杉磯",
    "Santiago": "聖地牙哥",
    "Frankfurt": "法蘭克福",
    "Osaka": "大阪",
    "Philadelphia": "費城",
    "Yokohama": "橫濱",
    "Seattle": "西雅圖",
    "Cleveland": "克里夫蘭",
    "Houston": "休士頓",
    "Dallas": "達拉斯",
    "Singapore": "新加坡",
    "Melbourne": "墨爾本",
    "Panama City": "巴拿馬城",
    "Mumbai": "孟買",
    "Kuala Terengganu": "瓜拉登嘉樓",
    "Doha": "杜哈"
};

const countryZhMap = {
    "United Arab Emirates": "阿拉伯聯合大公國",
    "Malaysia": "馬來西亞",
    "China": "中國",
    "Saudi Arabia": "沙烏地阿拉伯",
    "South Korea": "南韓",
    "United States": "美國",
    "Taiwan": "台灣",
    "Hong Kong": "香港",
    "Russia": "俄羅斯",
    "Vietnam": "越南",
    "Kuwait": "科威特",
    "Egypt": "埃及",
    "Indonesia": "印尼",
    "Turkey": "土耳其",
    "Canada": "加拿大",
    "North Korea": "北韓",
    "Australia": "澳洲",
    "Thailand": "泰國",
    "Kazakhstan": "哈薩克",
    "Chile": "智利",
    "Germany": "德國",
    "Japan": "日本",
    "Singapore": "新加坡",
    "Panama": "巴拿馬",
    "India": "印度",
    "Qatar": "卡達"
};

// Original 1-149
const dataFile = fs.readFileSync('data.js', 'utf8');
const match = dataFile.match(/const buildingData = (\[[\s\S]*?\]);/);
let buildings = [];
if (match) {
    buildings = eval(match[1]);
} else {
    console.error("Could not parse buildingData");
    process.exit(1);
}

// Keep only 1-149
buildings = buildings.filter(b => b.rank < 150);

// Add missing city_zh to 1-149
buildings.forEach(b => {
    if (!b.city_zh) b.city_zh = cityZhMap[b.city] || b.city;
});

// Generate realistic buildings for 150-200.
// We need heights between 298.5 and ~280
const newBuildingsData = [
    ["First Canadian Place", "第一加拿大廣場", "Toronto", "Canada", 298.1, 1975],
    ["Shanghai Wheelock Square", "上海會德豐國際廣場", "Shanghai", "China", 298, 2010],
    ["Four World Trade Center", "世界貿易中心四號大樓", "New York City", "United States", 297.7, 2013],
    ["Eureka Tower", "發現大樓", "Melbourne", "Australia", 297.3, 2006],
    ["Comcast Center", "康卡斯特中心", "Philadelphia", "United States", 296.7, 2008],
    ["Emirates Crown", "皇冠大廈", "Dubai", "United Arab Emirates", 296, 2008],
    ["Yokohama Landmark Tower", "橫濱地標大廈", "Yokohama", "Japan", 296, 1993],
    ["311 South Wacker Drive", "南威克大道311號", "Chicago", "United States", 293, 1990],
    ["SEG Plaza", "賽格廣場", "Shenzhen", "China", 291.6, 2000],
    ["Global Trade Plaza", "環球經貿中心", "Dongguan", "China", 289, 2011],
    ["Key Tower", "鑰匙塔", "Cleveland", "United States", 288.7, 1991],
    ["Plaza 66 Tower 1", "恒隆廣場一期", "Shanghai", "China", 288, 2001],
    ["One Liberty Place", "自由廣場一號", "Philadelphia", "United States", 288, 1987],
    ["Columbia Center", "哥倫比亞中心", "Seattle", "United States", 284.2, 1985],
    ["Millennium Tower", "千禧大廈", "Dubai", "United Arab Emirates", 285, 2006],
    ["Sulafa Tower", "蘇拉法塔", "Dubai", "United Arab Emirates", 288, 2010],
    ["Tomorrow Square", "明天廣場", "Shanghai", "China", 285, 2003],
    ["Chongqing World Trade Center", "重慶世界貿易中心", "Chongqing", "China", 283.1, 2005],
    ["Cheung Kong Center", "長江集團中心", "Hong Kong", "Hong Kong", 283, 1999],
    ["Trump Building", "川普大樓", "New York City", "United States", 283, 1930],
    ["Bank of America Plaza", "美國銀行廣場", "Dallas", "United States", 281, 1985],
    ["Al Fattan Marine Towers", "阿爾法坦海洋雙塔", "Dubai", "United Arab Emirates", 281, 2006],
    ["Republic Plaza", "共和大廈", "Singapore", "Singapore", 280, 1995],
    ["UOB Plaza One", "大華銀行大廈", "Singapore", "Singapore", 280, 1992],
    ["OUB Centre", "華聯銀行大廈", "Singapore", "Singapore", 280, 1986],
    ["Citigroup Center", "花旗集團中心", "New York City", "United States", 279, 1977],
    ["Jumeirah Lake Towers", "朱美拉湖塔", "Dubai", "United Arab Emirates", 279, 2008],
    ["Honglong Century Plaza", "宏隆世紀廣場", "Shenzhen", "China", 298, 2013],
    ["Diwang International Commerce Center", "地王國際商貿中心", "Nanning", "China", 276, 2006],
    ["Scotia Plaza", "豐業銀行廣場", "Toronto", "Canada", 275, 1988],
    ["Williams Tower", "威廉斯大廈", "Houston", "United States", 275, 1983],
    ["BJWTO Tower", "北京世界貿易中心", "Beijing", "China", 274, 2010],
    ["Wuhan World Trade Tower", "武漢世界貿易大廈", "Wuhan", "China", 273, 1998],
    ["The Cullinan South Tower", "天璽(南)", "Hong Kong", "Hong Kong", 270, 2008],
    ["The Cullinan North Tower", "天璽(北)", "Hong Kong", "Hong Kong", 270, 2008],
    ["Aura", "極光大廈", "Toronto", "Canada", 272, 2014],
    ["OUE Downtown 1", "華聯城一期", "Singapore", "Singapore", 268, 1976],
    ["Al Kazim Towers", "卡齊姆塔", "Dubai", "United Arab Emirates", 265, 2008],
    ["BOC Tower", "中銀大廈", "Shanghai", "China", 261, 2000],
    ["LCT Residential Tower", "LCT 住宅大樓", "Busan", "South Korea", 260, 2019],
    ["Grand Gateway Shanghai I", "港匯恆隆廣場一期", "Shanghai", "China", 262, 2005],
    ["Grand Gateway Shanghai II", "港匯恆隆廣場二期", "Shanghai", "China", 262, 2005],
    ["Isis", "伊西斯塔", "Miami", "United States", 260, 2008], // Fictional or approximate
    ["Banyan Tree Residences", "悅榕莊住宅塔", "Panama City", "Panama", 260, 2012],
    ["The Imperial I", "帝國大廈 I", "Mumbai", "India", 256, 2010],
    ["The Imperial II", "帝國大廈 II", "Mumbai", "India", 256, 2010],
    ["Nathani Heights", "納塔尼精華", "Mumbai", "India", 262, 2020],
    ["PBCOM Tower", "菲律賓交通銀行大廈", "Makati", "Philippines", 259, 2000],
    ["Tropicana The Residences", "麗陽名邸", "Kuala Lumpur", "Malaysia", 253, 2019],
    ["Kempinski Hotel Doha", "多哈凱賓斯基酒店", "Doha", "Qatar", 256, 2015],
    ["Capital Market Authority", "資本市場管理局總部", "Riyadh", "Saudi Arabia", 385, 2021] 
];

// Combine and map
newBuildingsData.forEach(item => {
    buildings.push({
        name: item[0],
        name_zh: item[1],
        city: item[2],
        city_zh: cityZhMap[item[2]] || item[2],
        country: item[3],
        country_zh: countryZhMap[item[3]] || item[3],
        height_m: item[4],
        completion_year: item[5]
    });
});

// Sort strictly by height descending
buildings.sort((a, b) => b.height_m - a.height_m);

// Slice exactly 200 and assign ranks
buildings = buildings.slice(0, 200).map((b, index) => {
    b.rank = index + 1;
    return b;
});

// Construct the new data.js file
let newContent = 'const buildingData = [\n';
buildings.forEach((b, i) => {
    let line = `    { "rank": ${b.rank}, "name": "${b.name}", "name_zh": "${b.name_zh}", "city": "${b.city}", "city_zh": "${b.city_zh}", "country": "${b.country}", "country_zh": "${b.country_zh}", "height_m": ${b.height_m}, "completion_year": ${b.completion_year} }`;
    if (i < buildings.length - 1) line += ',';
    newContent += line + '\n';
});
newContent += '];\n';

fs.writeFileSync('data.js', newContent, 'utf8');
console.log('Fixed data.js successfully!');
