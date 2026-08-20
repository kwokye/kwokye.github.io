// ====================================================================
// Theme Switcher Logic (Dark / Light Mode)
// ====================================================================
(function () {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  function updateIcons(isDark) {
    if (!sunIcon || !moonIcon) return;
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  // Initialize icon state
  updateIcons(document.documentElement.classList.contains('dark'));

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateIcons(isDark);
    });
  }
})();
