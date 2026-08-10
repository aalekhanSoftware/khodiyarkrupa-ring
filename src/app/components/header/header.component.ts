import { Component, OnInit, OnDestroy, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  target: string;
  active: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  mobileMenuTop: number | null = null;
  isScrolled = false;
  private navSub?: Subscription;

  navItems: NavItem[] = [
    { label: 'Home', target: 'home', active: true },
    { label: 'Categories', target: 'categories', active: false },
    { label: 'About Us', target: 'about', active: false },
    { label: 'Capabilities', target: 'capabilities', active: false },
    { label: 'Why Us', target: 'why-us', active: false },
    { label: 'Process', target: 'process', active: false },
    { label: 'Contact', target: 'contact', active: false }
  ];

  constructor(
    private router: Router,
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.navSub = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(() => this.closeMenu());
  }

  ngOnDestroy() {
    this.navSub?.unsubscribe();
    this.unlockBodyScroll();
  }

  toggleMenu(event?: Event) {
    event?.preventDefault();
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.updateMobileMenuLayout();
    }
    this.setBodyScrollState();
  }

  closeMenu(event?: Event) {
    event?.preventDefault();
    this.isMenuOpen = false;
    this.mobileMenuTop = null;
    this.setBodyScrollState();
  }

  navigateToSection(target: string, event?: Event) {
    event?.preventDefault();
    this.closeMenu();

    if (this.document?.getElementById) {
      const el = this.document.getElementById(target);
      if (el) {
        const header = this.document.querySelector('.main-header') as HTMLElement | null;
        const offset = header ? header.offsetHeight : 88;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isMenuOpen) {
      return;
    }

    const clickedInside = this.elRef.nativeElement.contains(event.target as Node);
    if (!clickedInside) {
      this.closeMenu();
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    if (!this.isMenuOpen) {
      return;
    }

    const touchedInside = this.elRef.nativeElement.contains(event.target as Node);
    if (!touchedInside) {
      this.closeMenu(event);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeMenu();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = (window.pageYOffset || this.document.documentElement.scrollTop) > 10;
    if (this.isMenuOpen && window.innerWidth < 992) {
      this.updateMobileMenuLayout();
    }
    this.updateActiveSection();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 992 && this.isMenuOpen) {
      this.closeMenu();
      return;
    }
    if (this.isMenuOpen) {
      this.updateMobileMenuLayout();
    }
  }

  @HostListener('window:orientationchange')
  onOrientationChange(): void {
    if (!this.isMenuOpen) {
      return;
    }
    setTimeout(() => this.updateMobileMenuLayout(), 150);
  }

  private setBodyScrollState(): void {
    if (!this.document?.body) {
      return;
    }
    if (this.isMenuOpen) {
      this.renderer.addClass(this.document.body, 'mobile-menu-open');
      return;
    }
    this.unlockBodyScroll();
  }

  private unlockBodyScroll(): void {
    if (this.document?.body) {
      this.renderer.removeClass(this.document.body, 'mobile-menu-open');
    }
  }

  private updateMobileMenuLayout(): void {
    if (window.innerWidth >= 992) {
      this.mobileMenuTop = null;
      return;
    }

    const navElement = this.elRef.nativeElement.querySelector('.navbar') as HTMLElement | null;
    if (!navElement) {
      this.mobileMenuTop = 88;
      return;
    }

    const navRect = navElement.getBoundingClientRect();
    this.mobileMenuTop = Math.round(Math.max(navRect.bottom + 8, 60));
  }

  private updateActiveSection(): void {
    if (typeof this.document === 'undefined') {
      return;
    }
    let currentId = 'home';
    for (const item of this.navItems) {
      const el = this.document.getElementById(item.target);
      if (el && el.getBoundingClientRect().top <= 140) {
        currentId = item.target;
      }
    }
    for (const item of this.navItems) {
      item.active = item.target === currentId;
    }
  }
}
