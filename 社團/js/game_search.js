// 替換成你最新部署後的 Apps Script Web App URL
const apiBase = 'https://script.google.com/macros/s/AKfycbzt34B86tOAWs70_iFRXoG51-VEdOdu154-j9kjZSdwLtz_dbWemRkPsa0SVEyoYlZlbw/exec';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchBtn').addEventListener('click', searchGame);
});

function searchGame() {
  const input = document.getElementById('searchInput').value.trim();
  const resultDiv = document.getElementById('searchResult');

  // 清空前一次結果
  resultDiv.innerHTML = '';

  // 如果有舊的 JSONP <script>，移除
  if (window._jsonpScript) {
    document.body.removeChild(window._jsonpScript);
    window._jsonpScript = null;
  }

  if (!input) {
    resultDiv.innerHTML = "請輸入關鍵字進行搜尋。";
    return;
  }

  // 顯示 loading
  resultDiv.innerHTML = "搜尋中…";

  // 動態 callback 名稱
  const cbName = '_jsonp_cb_' + Date.now();
  window[cbName] = function(data) {
    // 渲染結果
    if (data && data.length) {
      resultDiv.innerHTML = data.map(game => `
        <div class="game-card">
          <strong>${game.name}</strong>
          <p>🕒 <b>時長：</b> ${game.duration}</p>
          <p>🎲 <b>類型：</b> ${game.type}</p>
          <p>👥 <b>人數：</b> ${game.players}</p>
          <p>👍 <b>推薦人數：</b> ${game.recommended}</p>
          <p>⭐ <b>難度：</b> ${game.difficulty}</p>
        </div>
      `).join('');
    } else {
      resultDiv.innerHTML = "找不到符合的桌遊。";
    }

    // 清理 callback 和 <script>
    delete window[cbName];
    document.body.removeChild(window._jsonpScript);
    window._jsonpScript = null;
  };

  // 插入 JSONP <script>
  const script = document.createElement('script');
  script.src = `${apiBase}?q=${encodeURIComponent(input)}&callback=${cbName}`;
  window._jsonpScript = script;
  document.body.appendChild(script);
}
