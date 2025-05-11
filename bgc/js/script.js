function loadHTML(selector, url) {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        document.querySelector(selector).innerHTML = data;
      });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    loadHTML('#header', 'header.html');
    loadHTML('#footer', 'footer.html');
    
  });
