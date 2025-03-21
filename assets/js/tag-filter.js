document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a tag page
  const isTagPage = window.location.pathname.includes('/tags/') || 
                    window.location.pathname.includes('/categories/');
  
  if (isTagPage) {
    setupTagFiltering();
  } else {
    setupPostTagLinks();
  }
  
  function setupTagFiltering() {
    // Find all tag chips/links
    const tagChips = document.querySelectorAll('.taxonomy__index a, .page__taxonomy-item');
    const activeFilters = [];
    
    // Create filter UI
    const mainContent = document.querySelector('#main');
    const pageTitle = document.querySelector('.page__title, .archive__title');
    
    if (pageTitle) {
      const filterBar = document.createElement('div');
      filterBar.className = 'filter-bar';
      filterBar.innerHTML = `
        <div class="filter-status" style="display: none;">
          <button class="clear-filter">Clear</button>
        </div>
      `;
      
      // Insert after the title
      pageTitle.parentNode.insertBefore(filterBar, pageTitle.nextSibling);
      
      // Setup clear button
      document.querySelector('.clear-filter').addEventListener('click', function() {
        clearAllFilters();
      });
    }
    
    // Handle clicks on tags
    tagChips.forEach(chip => {
      chip.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the tag name (handle tags with counts)
        let tagName = this.textContent.trim().toLowerCase();
        // If it has a count, remove it
        if (tagName.includes('(')) {
          tagName = tagName.split('(')[0].trim();
        }
        
        // Toggle active class
        this.classList.toggle('active');
        
        // Update filters array
        if (this.classList.contains('active')) {
          if (!activeFilters.includes(tagName)) {
            activeFilters.push(tagName);
          }
        } else {
          const index = activeFilters.indexOf(tagName);
          if (index !== -1) {
            activeFilters.splice(index, 1);
          }
        }
        
        // Apply the filters
        applyFilters(activeFilters);
        
        return false;
      });
    });
    
    // Apply filters function
    function applyFilters(filters) {
      // Get all posts
      const posts = document.querySelectorAll('.archive__item');
      const filterStatus = document.querySelector('.filter-status');
      
      if (filters.length === 0) {
        // Show all posts if no filters active
        posts.forEach(post => {
          post.style.display = '';
        });
        
        // Hide filter status
        if (filterStatus) {
          filterStatus.style.display = 'none';
        }
        return;
      }
      
      // Show filter status
      if (filterStatus) {
        filterStatus.style.display = 'flex';
      }
      
      // Find posts that match the active filters
      posts.forEach(post => {
        // Get all of this post's tags
        const postTags = Array.from(post.querySelectorAll('.page__taxonomy-item'))
          .map(tag => {
            let text = tag.textContent.trim().toLowerCase();
            if (text.includes('(')) {
              text = text.split('(')[0].trim();
            }
            return text;
          });
          
        // Check if post has any of the active filters
        const hasActiveFilter = filters.some(filter => {
          return postTags.includes(filter) || 
                 post.innerHTML.toLowerCase().includes(filter);
        });
        
        // Show/hide post
        post.style.display = hasActiveFilter ? '' : 'none';
      });
      
      // Handle case where there might not be properly tagged posts but content sections with tag names
      // This specifically handles the tags page structure in Minimal Mistakes
      
      // First check if no posts are visible
      const visiblePosts = Array.from(posts).filter(post => post.style.display !== 'none');
      
      if (visiblePosts.length === 0) {
        // Check for section headings that match the filters
        filters.forEach(filter => {
          const headingSection = Array.from(document.querySelectorAll('h2')).find(heading => 
            heading.textContent.trim().toLowerCase() === filter);
            
          if (headingSection) {
            // Find posts in that section
            let nextElement = headingSection.nextElementSibling;
            while (nextElement && 
                  !nextElement.tagName.startsWith('H') && 
                  !nextElement.classList.contains('back-to-top')) {
              if (nextElement.classList.contains('archive__item')) {
                nextElement.style.display = '';
              }
              nextElement = nextElement.nextElementSibling;
            }
          }
        });
      }
    }
    
    function clearAllFilters() {
      // Clear active filters array
      activeFilters.length = 0;
      
      // Remove active class from all chips
      tagChips.forEach(chip => {
        chip.classList.remove('active');
      });
      
      // Show all posts
      const posts = document.querySelectorAll('.archive__item');
      posts.forEach(post => {
        post.style.display = '';
      });
      
      // Hide filter status
      const filterStatus = document.querySelector('.filter-status');
      if (filterStatus) {
        filterStatus.style.display = 'none';
      }
    }
    
    // Check if we need to pre-filter based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash) {
      const decodedHash = decodeURIComponent(hash);
      const matchingChip = Array.from(tagChips).find(chip => 
        chip.textContent.trim().toLowerCase().includes(decodedHash.toLowerCase()));
        
      if (matchingChip) {
        matchingChip.click();
      }
    }
  }
  
  function setupPostTagLinks() {
    // For individual post pages, make tags link to the tags page with a filter
    const postTags = document.querySelectorAll('.page__taxonomy-item');
    
    postTags.forEach(tag => {
      tag.addEventListener('click', function(e) {
        const tagName = this.textContent.trim().toLowerCase();
        const href = this.getAttribute('href');
        
        if (href) {
          // Add the tag as a hash to the URL
          window.location.href = `${href}#${encodeURIComponent(tagName)}`;
          e.preventDefault();
        }
      });
    });
  }
});
