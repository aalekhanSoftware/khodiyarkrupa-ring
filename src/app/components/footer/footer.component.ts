import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

interface FooterNavLink {
  name: string;
  target: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  readonly baseUrl = environment.baseUrl;
  private readonly schemaScriptAttr = 'data-footer-schema';
  private injectedScripts: HTMLScriptElement[] = [];

  currentYear = new Date().getFullYear();

  readonly organizationName = 'Khodiyar Krupa Ring';
  readonly organizationDescription =
    'Precision CNC job work workshop for ring manufacturing. We machine auto parts, machinery parts and vehicle parts up to 500mm OD with turning, boring, threading and finishing under one roof.';
  readonly logoUrl = `${this.baseUrl}/assets/logo/logo.jpeg`;
  readonly organizationUrl = this.baseUrl;
  readonly contactPhone = '+919725995010';
  readonly whatsappNumber = '919725995010';
  readonly contactEmail = 'info@khodiyarkruparing.com';

  quickLinks: FooterNavLink[] = [
    { name: 'Home', target: 'home' },
    { name: 'Categories', target: 'categories' },
    { name: 'About Us', target: 'about' },
    { name: 'Capabilities', target: 'capabilities' },
    { name: 'Why Us', target: 'why-us' },
    { name: 'Process', target: 'process' },
    { name: 'Contact', target: 'contact' }
  ];

  servicesList: string[] = [
    'CNC turning job work',
    'Ring manufacturing up to 500mm OD',
    'Auto part machining',
    'Machinery part fabrication',
    'Vehicle part manufacturing',
    'Boring, threading & finishing'
  ];

  socialLinks = [
    { icon: 'fab fa-whatsapp', url: `https://wa.me/${this.whatsappNumber}`, label: 'WhatsApp' },
    { icon: 'fab fa-facebook', url: 'https://facebook.com/', label: 'Facebook' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/', label: 'Instagram' },
    { icon: 'fab fa-linkedin', url: 'https://linkedin.com/', label: 'LinkedIn' }
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  ngOnInit(): void {
    this.injectStructuredData();
  }

  ngOnDestroy(): void {
    this.injectedScripts.forEach((script) => script.remove());
    this.injectedScripts = [];
  }

  scrollToSection(target: string, event?: Event): void {
    event?.preventDefault();
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

  private injectStructuredData(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.setOrganizationSchema();
    this.setWebSiteSchema();
    this.setLocalBusinessSchema();
  }

  private appendScript(json: object): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(this.schemaScriptAttr, 'true');
    script.text = JSON.stringify(json);
    this.document.head.appendChild(script);
    this.injectedScripts.push(script);
  }

  private setOrganizationSchema(): void {
    this.appendScript({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${this.baseUrl}/#organization`,
      name: this.organizationName,
      url: this.baseUrl,
      logo: this.logoUrl,
      description: this.organizationDescription,
      email: 'info@khodiyarkruparing.com',
      telephone: this.contactPhone,
      address: this.businessAddress()
    });
  }

  private setLocalBusinessSchema(): void {
    this.appendScript({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${this.baseUrl}/#localbusiness`,
      name: this.organizationName,
      image: this.logoUrl,
      url: this.baseUrl,
      telephone: this.contactPhone,
      email: 'info@khodiyarkruparing.com',
      priceRange: 'INR',
      description: this.organizationDescription,
      address: this.businessAddress(),
      areaServed: [
        { '@type': 'City', name: 'Rajkot' },
        { '@type': 'State', name: 'Gujarat' },
        { '@type': 'Country', name: 'India' }
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00'
      }
    });
  }

  private setWebSiteSchema(): void {
    this.appendScript({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.baseUrl}/#website`,
      url: this.baseUrl,
      name: this.organizationName,
      description: this.organizationDescription,
      publisher: { '@id': `${this.baseUrl}/#organization` },
      inLanguage: 'en-IN'
    });
  }

  private businessAddress(): object {
    return {
      '@type': 'PostalAddress',
      streetAddress: 'SURVEY NO:-166, HARI OM IND.AREA, PLOT NO:-66, Kothariya Ring Road, SANDHIYA PUL',
      addressLocality: 'Rajkot',
      addressRegion: 'Gujarat',
      postalCode: '360022',
      addressCountry: 'IN'
    };
  }
}
