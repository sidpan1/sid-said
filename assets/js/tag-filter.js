document.addEventListener('DOMContentLoaded', function() {
  // Implementation strategy:
  // 1. First handle the tag/category pages
  // 2. Then handle the tags on individual posts 
  
  // Check if we're on a tags or categories page
  const isTagPage = window.location.pathname.includes('/tags/') || window.location.pathname.includes('/categories/');
  
  if (isTagPage) {
    // Find all tag and category links on archive pages
    const tagLinks = document.querySelectorAll('.taxonomy__index a, .tag-cloud a, .page__taxonomy-item');
    
    // Convert links to filter chips
    tagLinks.forEach(link => {
      const tag = link.textContent.trim().split('(')[0].trim().toLowerCase();
      const href = link.getAttribute('href');
      
      // Replace the link's default behavior
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle active state
        this.classList.toggle('active');
        
        // Apply filtering
        filterPostsByTag(tag);
        
        return false;
      });
    });
    
    // Add filtering UI
    const archiveHeader = document.querySelector('.page__title, .archive__title');
    if (archiveHeader) {
      // Add filter UI elements
      const filterBar = document.createElement('div');
      filterBar.className = 'filter-bar';
      filterBar.innerHTML = `
        <div class="filter-info" style="display: none;">
          <span class="filter-label">Active filters:</span>
          <span class="active-filters"></span>
          <button class="clear-filters">Clear</button>
        </div>
      `;
      
      // Insert filter bar after the header
      archiveHeader.parentNode.insertBefore(filterBar, archiveHeader.nextSibling);
      
      // Add clear button functionality
      document.querySelector('.clear-filters').addEventListener('click', clearFilters);
    }
  }
  
  // Handle individual post tags/categories
  const postTagChips = document.querySelectorAll('.page__taxonomy .page__taxonomy-item');
  
  postTagChips.forEach(chip => {
    // Get tag name and original link
    const tag = chip.textContent.trim().toLowerCase();
    const originalHref = chip.getAttribute('href');
    
    // Store original href as data attribute
    chip.setAttribute('data-href', originalHref);
    
    // Replace with a click handler
    chip.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Navigate to tag page with filter pre-applied
      const tagPage = this.getAttribute('data-href');
      sessionStorage.setItem('prefilter', tag);
      window.location.href = tagPage;
      
      return false;
    });
  });
  
  // Check for pre-filter from session storage
  const prefilter = sessionStorage.getItem('prefilter');
  if (prefilter && isTagPage) {
    // Find the matching tag and activate it
    const matchingTag = Array.from(document.querySelectorAll('.taxonomy__index a, .tag-cloud a'))
      .find(link => link.textContent.trim().toLowerCase().includes(prefilter));
      
    if (matchingTag) {
      matchingTag.classList.add('active');
      filterPostsByTag(prefilter);
    }
    
    // Clear the prefilter
    sessionStorage.removeItem('prefilter');
  }
  
  // Track active filters
  let activeFilters = [];
  
  function filterPostsByTag(tag) {
    // Toggle filter in the active filters list
    const filterIndex = activeFilters.indexOf(tag);
    if (filterIndex === -1) {
      activeFilters.push(tag);
    } else {
      activeFilters.splice(filterIndex, 1);
    }
    
    // Get all articles
    const articles = document.querySelectorAll('.archive__item');
    
    // Show filter info if there are active filters
    const filterInfo = document.querySelector('.filter-info');
    const activeFiltersElem = document.querySelector('.active-filters');
    
    if (activeFilters.length > 0) {
      // Update active filters display
      activeFiltersElem.textContent = activeFilters.join(', ');
      filterInfo.style.display = 'block';
      
      // Filter articles
      articles.forEach(article => {
        const articleTags = Array.from(article.querySelectorAll('.page__taxonomy-item'))
          .map(el => el.textContent.trim().toLowerCase());
          
        // Check if article has any active filter
        const hasActiveTag = activeFilters.some(activeTag => 
          articleTags.some(articleTag => articleTag.includes(activeTag))
        );
        
        article.style.display = hasActiveTag ? '' : 'none';
      });
    } else {
      // No active filters, show all articles
      filterInfo.style.display = 'none';
      articles.forEach(article => {
        article.style.display = '';
      });
    }
  }
  
  function clearFilters() {
    // Clear active filters
    activeFilters = [];
    
    // Remove active class from all filter chips
    document.querySelectorAll('.active').forEach(el => {
      el.classList.remove('active');
    });
    
    // Hide filter info
    document.querySelector('.filter-info').style.display = 'none';
    
    // Show all articles
    document.querySelectorAll('.archive__item').forEach(article => {
      article.style.display = '';
    });
  }
});
