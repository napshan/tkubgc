// 替换成你最新部署后的 Apps Script Web App URL
const apiBase = 'https://script.google.com/macros/s/AKfycbzt34B86tOAWs70_iFRXoG51-VEdOdu154-j9kjZSdwLtz_dbWemRkPsa0SVEyoYlZlbw/exec';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchBtn').addEventListener('click', searchGame);

  // 頁面載入若有 keyword 參數，就自動搜尋
  const params = new URLSearchParams(window.location.search);
  const kw = params.get('keyword');
  if (kw) {
    document.getElementById('searchInput').value = kw;
    searchGame();
  }
});

function searchGame() {
  const q = document.getElementById('searchInput').value.trim();
  const resultDiv = document.getElementById('searchResult');
  resultDiv.innerHTML = '';

  if (!q) {
    resultDiv.innerHTML = "請輸入關鍵字進行搜尋。";
    return;
  }
  resultDiv.innerHTML = "搜尋中…";

  // 為這次搜尋動態生成 callback 名稱
  const cbName = '_jsonp_cb_' + Date.now();
  
  // 创建对应的 <script>，并保存在局部变量里
  const script = document.createElement('script');
  script.src = `${apiBase}?q=${encodeURIComponent(q)}&callback=${cbName}`;

  // 在 window 上临时挂载 callback
  window[cbName] = function(data) {
    // 渲染
    if (data && data.length) {
      resultDiv.innerHTML = data.map(game => `
        <div class="game-card">
          <div class="game-info">
            <strong>${game.name}</strong>
            <p>🕒 <b>時長：</b> ${game.duration}</p>
            <p>🎲 <b>類型：</b> ${game.type}</p>
            <p>👥 <b>人數：</b> ${game.players}</p>
            <p>👍 <b>推薦：</b> ${game.recommended}</p>
            <p>⭐ <b>難度：</b> ${game.difficulty}</p>
          </div>
          ${game.imageUrl ? `<img src="${game.imageUrl}" alt="${game.name}" class="game-img">` : ''}
        </div>
      `).join('');
    } else {
      resultDiv.innerHTML = "找不到符合的桌遊。";
    }

    // 清理：移除自己、刪掉 callback
    document.body.removeChild(script);
    delete window[cbName];
  };

  // 把 <script> 插入 DOM，觸發 JSONP
  document.body.appendChild(script);
}

// 當頁面載入時，自動讀取網址中的 keyword 並搜尋
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get('keyword');

  if (keyword) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = keyword;

    // 直接呼叫現有的 searchGame 函式（模擬按下搜尋按鈕）
    searchGame();
  }
});

