document.addEventListener('DOMContentLoaded', function() {
  // Find all tag and category chips
  const tagChips = document.querySelectorAll('.page__taxonomy-item, .archive__item .taxonomy__count');
  
  // Get all article elements that can be filtered
  const allArticles = document.querySelectorAll('.archive__item, .list__item');
  
  // Store original state to restore when clearing filters
  const originalDisplay = {};
  allArticles.forEach(article => {
    originalDisplay[article.id] = true;
  });
  
  // Track active filters
  let activeFilters = [];
  
  // Create filter indicator
  const filterIndicator = document.createElement('div');
  filterIndicator.className = 'filter-indicator';
  filterIndicator.style.display = 'none';
  
  // Create clear filter button
  const clearButton = document.createElement('button');
  clearButton.innerText = 'Clear Filters';
  clearButton.className = 'btn btn--primary btn--small clear-filter-btn';
  clearButton.style.display = 'none';
  clearButton.addEventListener('click', clearFilters);
  
  // Find a good place to insert our filter UI
  const archiveTitle = document.querySelector('.archive__subtitle, .page__title');
  if (archiveTitle) {
    archiveTitle.parentNode.insertBefore(filterIndicator, archiveTitle.nextSibling);
    archiveTitle.parentNode.insertBefore(clearButton, archiveTitle.nextSibling);
  }
  
  // Add click event listeners to all tags and categories
  tagChips.forEach(chip => {
    chip.addEventListener('click', function(e) {
      e.preventDefault();
      const tag = this.innerText.trim().toLowerCase();
      
      // Toggle active state
      this.classList.toggle('active');
      
      if (this.classList.contains('active')) {
        // Add to active filters
        if (!activeFilters.includes(tag)) {
          activeFilters.push(tag);
        }
      } else {
        // Remove from active filters
        activeFilters = activeFilters.filter(t => t !== tag);
      }
      
      applyFilters();
    });
  });
  
  function applyFilters() {
    // If no active filters, show everything
    if (activeFilters.length === 0) {
      allArticles.forEach(article => {
        article.style.display = '';
      });
      filterIndicator.style.display = 'none';
      clearButton.style.display = 'none';
      return;
    }
    
    // Show filter indicator and clear button
    filterIndicator.innerHTML = `Filtering by: <span class="filter-tags">${activeFilters.join(', ')}</span>`;
    filterIndicator.style.display = 'block';
    clearButton.style.display = 'inline-block';
    
    // Filter articles
    allArticles.forEach(article => {
      const articleTags = Array.from(article.querySelectorAll('.page__taxonomy-item'))
        .map(tag => tag.innerText.trim().toLowerCase());
      
      const articleCategories = Array.from(article.querySelectorAll('.page__meta .page__taxonomy-item'))
        .map(cat => cat.innerText.trim().toLowerCase());
      
      const allArticleTags = [...articleTags, ...articleCategories];
      
      // Check if article has any of the active filters
      const hasActiveTag = activeFilters.some(tag => allArticleTags.includes(tag));
      
      article.style.display = hasActiveTag ? '' : 'none';
    });
  }
  
  function clearFilters() {
    // Reset active states
    tagChips.forEach(chip => {
      chip.classList.remove('active');
    });
    
    // Clear active filters array
    activeFilters = [];
    
    // Show all articles
    allArticles.forEach(article => {
      article.style.display = '';
    });
    
    // Hide filter UI
    filterIndicator.style.display = 'none';
    clearButton.style.display = 'none';
  }
});
