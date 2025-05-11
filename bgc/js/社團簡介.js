document.querySelector('.inherit-link').addEventListener('click', function() {
    const pwd = prompt("請輸入密碼");
    if (pwd === "0000") {
      window.location.href = "傳承.html";
    } else if (pwd !== null) {
      alert("密碼錯誤！");
    }
  });