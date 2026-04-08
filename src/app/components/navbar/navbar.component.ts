import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';

declare let bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  private listeners: Array<() => void> = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Initialize dropdowns after view is ready
    // Increased timeout to ensure DOM is fully rendered
    setTimeout(() => {
      console.log('Initializing dropdowns...');
      this.initializeDropdowns();
    }, 200);
  }

  ngOnDestroy(): void {
    // Clean up event listeners
    this.listeners.forEach(unsubscribe => unsubscribe());
  }

  private initializeDropdowns(): void {
    const isDesktop = () => window.innerWidth >= 992;

    // Handle main dropdown
    const mainDropdown = document.querySelector('.nav-item.dropdown');
    if (!mainDropdown) {
      console.error('Main dropdown not found!');
      return;
    }

    console.log('Main dropdown found:', mainDropdown);

    const dropdownToggle = mainDropdown.querySelector('.nav-link.dropdown-toggle') as HTMLElement;
    const mainMenu = mainDropdown.querySelector('.dropdown-menu') as HTMLElement;
    
    if (!dropdownToggle || !mainMenu) {
      console.error('Dropdown toggle or menu not found!', { dropdownToggle, mainMenu });
      return;
    }

    console.log('Dropdown elements found. Setting up event listeners...');

    // Click behavior for main dropdown toggle
    const toggleMainDropdown = (e: Event) => {
      console.log('Dropdown clicked!', 'isDesktop:', isDesktop());
      e.preventDefault();
      e.stopPropagation();
      
      // Only handle clicks on mobile
      if (!isDesktop()) {
        const isOpen = mainMenu.classList.contains('show');
        console.log('Mobile click - Currently open:', isOpen);
        
        if (!isOpen) {
          mainMenu.classList.add('show');
          dropdownToggle.setAttribute('aria-expanded', 'true');
          console.log('Opened dropdown');
        } else {
          mainMenu.classList.remove('show');
          dropdownToggle.setAttribute('aria-expanded', 'false');
          this.hideAllSubmenus();
          console.log('Closed dropdown');
        }
      } else {
        console.log('Desktop mode - CSS handles hover');
      }
      // On desktop, CSS :hover handles the visibility
    };

    const clickListener = this.renderer.listen(dropdownToggle, 'click', toggleMainDropdown);
    this.listeners.push(clickListener);
    console.log('Main dropdown click listener attached');

    // Handle nested submenus
    const submenuItems = document.querySelectorAll('.dropdown-submenu');
    console.log('Found', submenuItems.length, 'submenu items');
    
    submenuItems.forEach((submenu, index) => {
      const submenuLink = submenu.querySelector('.dropdown-item.dropdown-toggle');
      const submenuDropdown = submenu.querySelector('.dropdown-menu') as HTMLElement;

      if (submenuLink && submenuDropdown) {
        console.log(`Setting up submenu ${index + 1}:`, submenu);
        
        // Mobile click behavior only
        const clickHandler = (e: Event) => {
          console.log(`Submenu ${index + 1} clicked, isDesktop:`, isDesktop());
          e.preventDefault();
          e.stopPropagation();

          // Only handle on mobile
          if (!isDesktop()) {
            const isCurrentlyOpen = submenuDropdown.classList.contains('show');
            console.log(`Submenu ${index + 1} currently open:`, isCurrentlyOpen);
            
            // Hide all other submenus first
            document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach((menu) => {
              if (menu !== submenuDropdown) {
                menu.classList.remove('show');
                (menu as HTMLElement).style.display = 'none';
              }
            });

            // Toggle current submenu
            if (!isCurrentlyOpen) {
              submenuDropdown.classList.add('show');
              submenuDropdown.style.display = 'block';
              console.log(`Opened submenu ${index + 1}`);
            } else {
              submenuDropdown.classList.remove('show');
              submenuDropdown.style.display = 'none';
              console.log(`Closed submenu ${index + 1}`);
            }
          }
          // On desktop, CSS :hover handles submenu visibility
        };

        const clickListener = this.renderer.listen(submenuLink, 'click', clickHandler);
        this.listeners.push(clickListener);
      }
    });

    // Handle window resize
    const resizeHandler = () => {
      if (isDesktop()) {
        // Reset mobile styles
        document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach((menu) => {
          menu.classList.remove('show');
          (menu as HTMLElement).style.display = '';
        });
      }
    };

    const resizeListener = this.renderer.listen('window', 'resize', resizeHandler);
    this.listeners.push(resizeListener);
    
    console.log('Dropdown initialization complete. Total listeners:', this.listeners.length);
  }

  private hideAllSubmenus(): void {
    document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach((menu) => {
      menu.classList.remove('show');
      (menu as HTMLElement).style.display = '';
    });
  }
}
