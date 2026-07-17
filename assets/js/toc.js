(function() {
  'use strict';

  // Find all TOC containers
  const tocContainers = document.querySelectorAll('.article-toc-content');
  if (tocContainers.length === 0) return;

  const allLinks = [];
  tocContainers.forEach(container => {
    const links = container.querySelectorAll('a');
    links.forEach(link => allLinks.push(link));
  });

  if (allLinks.length === 0) return;

  // Header height for offset
  const headerHeight = 100;

  // Unique sections based on TOC links (using the first container's links as reference)
  const linksInFirst = tocContainers[0].querySelectorAll('a');
  const sections = [];
  linksInFirst.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const element = document.getElementById(id);
    if (element) {
      sections.push({ id, element });
    }
  });

  function updateActiveLink() {
    const scrollPos = window.scrollY + headerHeight;

    let activeId = null;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].element.offsetTop <= scrollPos) {
        activeId = sections[i].id;
      } else {
        break;
      }
    }

    // Update all links in all TOCs
    allLinks.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      if (activeId && href === activeId) {
        link.classList.add('is-active');
        // Optional: ensure visible in scrolling sidebar
        if (link.closest('.hidden.lg:block')) {
           // could scroll link into view if TOC is long
        }
      } else {
        link.classList.remove('is-active');
      }
    });
  }

  // Initial call
  updateActiveLink();

  // Scroll listener
  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();
