import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

const META_KEY = makeStateKey<boolean>('HOME_META');
const STRUCTURED_DATA_KEY = makeStateKey<string>('HOME_STRUCTURED_DATA');

/** SEO: Primary keywords - CNC job work, ring manufacturing, auto parts, machinery parts, vehicle parts, 500mm OD, precision turned components. Secondary - CNC turning, job work Gujarat, rings manufacturer, bearing rings, bushes, spacers, flanges. */

interface Category {
  name: string;
  icon: string;
  shortDesc: string;
  examples: string[];
}

interface Capability {
  title: string;
  desc: string;
}

interface Feature {
  title: string;
  desc: string;
  icon: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

interface ShowcaseItem {
  src: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly baseUrl = environment.baseUrl;

  readonly orgName = 'Khodiyar Krupa Ring';
  private readonly whatsappNumber = '919714073207';
  private readonly phoneTel = '+919714073207';
  private readonly author = 'Khodiyar Krupa Ring';

  categories: Category[] = [
    {
      name: 'Auto Part Items',
      icon: 'car',
      shortDesc:
        'Rings, bushes, spacers and flanges for engines, gearboxes and transmission assemblies, machined to close tolerances for reliable running.',
      examples: ['Engine rings', 'Gearbox sleeves', 'Bushes & spacers', 'Flanges']
    },
    {
      name: 'Machinery Part',
      icon: 'cogs',
      shortDesc:
        'Precision turned components and rings for industrial machines, pumps and rotating equipment, produced as job work on your drawings.',
      examples: ['Bearing housings', 'Pulley collars', 'Pump rings', 'Distance pieces']
    },
    {
      name: 'Vehicle Part',
      icon: 'truck',
      shortDesc:
        'Rings and turned parts for commercial vehicles, tractors and two-wheelers, from prototype to batch production with consistent quality.',
      examples: ['Tractor parts', 'Brake components', 'Axle rings', 'Clutch parts']
    }
  ];

  capabilities: Capability[] = [
    {
      title: 'CNC Turning Job Work',
      desc: 'Rough and finish turning on CNC lathes. We work on customer drawings and samples, from single-piece prototypes to regular batch supply.'
    },
    {
      title: 'Rings Up to 500mm OD',
      desc: 'Ring manufacturing from 50mm to 500mm outer diameter. Larger rings are turned, bored and faced on heavy duty lathes with consistent roundness.'
    },
    {
      title: 'Boring & Drilling',
      desc: 'Precise bores, step bores, counterbores and drilled holes to drawing dimensions, held with the right tooling for repeat parts.'
    },
    {
      title: 'Threading & Grooving',
      desc: 'Internal and external threading, grooves and undercuts for sealing and assembly requirements on all common thread standards.'
    },
    {
      title: 'Facing & Finishing',
      desc: 'Clean faces, good surface finish and tight diameters. Finishing passes keep dimensions and surface quality stable across the batch.'
    },
    {
      title: 'Batch Production',
      desc: 'Small runs and regular repeat orders handled with fixed settings and gauging, so parts stay within tolerance from first piece to last.'
    }
  ];

  materials = ['Mild Steel', 'EN8 / EN9', 'Stainless Steel', 'Cast Iron', 'Aluminium', 'Brass & Bronze'];

  showcase: ShowcaseItem[] = [
    {
      src: 'assets/svg/cnc-lathe.svg',
      alt: 'CNC lathe turning center machining a ring component in a three-jaw chuck',
      caption: 'CNC Turning Center'
    },
    {
      src: 'assets/svg/turning-process.svg',
      alt: 'Cutting tool turning a rotating ring workpiece with chips and sparks',
      caption: 'Turning Process'
    },
    {
      src: 'assets/svg/machined-components.svg',
      alt: 'Finished precision rings, bushes and flanges up to 500mm outer diameter',
      caption: 'Machined Components'
    }
  ];

  features: Feature[] = [
    {
      title: 'Precision Workmanship',
      icon: 'bullseye',
      desc: 'Diameters, bores and faces are machined to drawing tolerances. We take the same care on a single sample as on a full batch.'
    },
    {
      title: 'Custom Job Work',
      icon: 'tools',
      desc: 'Send us a drawing or sample. We machine auto parts, machinery parts and vehicle parts exactly to your size and material.'
    },
    {
      title: 'Up to 500mm OD',
      icon: 'expand-alt',
      desc: 'Our lathes handle rings and turned components from small bushes up to 500mm outer diameter without compromising on accuracy.'
    },
    {
      title: 'On-Time Delivery',
      icon: 'clock',
      desc: 'Planned shop floor and honest lead times. We keep commitments so your assembly line or project is never held up.'
    },
    {
      title: 'Fair Job Work Rates',
      icon: 'rupee-sign',
      desc: 'Competitive pricing for job work, with clarity on machining charges before we start. No hidden costs, no surprises.'
    },
    {
      title: 'Quality Checked',
      icon: 'check-circle',
      desc: 'Key dimensions are checked before dispatch. We measure, we record, and we only send parts that meet the drawing.'
    }
  ];

  processSteps: ProcessStep[] = [
    {
      step: '01',
      title: 'Share Your Requirement',
      desc: 'Send the drawing, sample or your size and material details. Tell us the quantity and finish needed.'
    },
    {
      step: '02',
      title: 'We Quote The Job',
      desc: 'We review the part, confirm the machining route and give you a clear job work rate and delivery date.'
    },
    {
      step: '03',
      title: 'Machining',
      desc: 'Your parts are turned, bored, threaded and finished on our machines with proper tooling and settings.'
    },
    {
      step: '04',
      title: 'Inspection & Dispatch',
      desc: 'Key dimensions are checked against the drawing, then the batch is packed and dispatched on time.'
    }
  ];

  stats = [
    { value: '500', suffix: 'mm', label: 'Max Outer Diameter' },
    { value: '3', suffix: '+', label: 'Part Categories' },
    { value: '6', suffix: '+', label: 'Materials Handled' },
    { value: '100', suffix: '%', label: 'Drawing Based Work' }
  ];

  // Enquiry form state
  formState = {
    name: '',
    phone: '',
    email: '',
    category: '',
    message: ''
  };

  submitted = false;
  formError = '';

  constructor(
    private meta: Meta,
    private title: Title,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.setMetaData();
    this.setStructuredData();
  }

  ngOnDestroy() {
    this.transferState.remove(META_KEY);
    this.transferState.remove(STRUCTURED_DATA_KEY);
  }

  private setMetaData() {
    if (this.transferState.hasKey(META_KEY)) return;

    const pageTitle = 'Khodiyar Krupa Ring | CNC Job Work & Ring Manufacturing - Auto, Machinery & Vehicle Parts up to 500mm OD';
    const pageDescription =
      'Khodiyar Krupa Ring is a precision CNC job work workshop manufacturing auto parts, machinery parts and vehicle parts. Ring manufacturing up to 500mm OD with turning, boring and finishing under one roof.';
    const pageKeywords =
      'CNC job work, ring manufacturing, auto parts manufacturer, machinery parts job work, vehicle parts supplier, 500mm OD rings, precision turned components, CNC turning Gujarat, rings manufacturer Vadodara';

    this.title.setTitle(pageTitle);

    const metaTags: MetaDefinition[] = [
      { name: 'description', content: pageDescription },
      { name: 'keywords', content: pageKeywords },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${this.baseUrl}/assets/logo/logo.jpeg` },
      { property: 'og:url', content: `${this.baseUrl}` },
      { property: 'og:site_name', content: this.orgName },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: pageDescription },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: this.author }
    ];

    metaTags.forEach((tag) => this.meta.updateTag(tag));
    this.transferState.set(META_KEY, true);
  }

  private setStructuredData() {
    if (this.transferState.hasKey(STRUCTURED_DATA_KEY)) return;

    const organizationId = `${this.baseUrl}/#organization`;
    const organization = {
      '@type': 'Organization',
      '@id': organizationId,
      name: this.orgName,
      description:
        'Precision CNC job work workshop for ring manufacturing. Auto parts, machinery parts and vehicle parts up to 500mm OD.',
      url: this.baseUrl,
      logo: `${this.baseUrl}/assets/logo/logo.jpeg`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: this.phoneTel,
        contactType: 'customer service',
        areaServed: 'IN'
      }
    };

    const localBusiness = {
      '@type': 'LocalBusiness',
      '@id': `${this.baseUrl}/#localbusiness`,
      name: this.orgName,
      image: `${this.baseUrl}/assets/logo/logo.jpeg`,
      url: this.baseUrl,
      telephone: this.phoneTel,
      priceRange: 'INR',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'GIDC Industrial Estate',
        addressLocality: 'Vadodara',
        addressRegion: 'Gujarat',
        postalCode: '390010',
        addressCountry: 'IN'
      },
      areaServed: [
        { '@type': 'City', name: 'Vadodara' },
        { '@type': 'State', name: 'Gujarat' },
        { '@type': 'Country', name: 'India' }
      ]
    };

    const webSite = {
      '@type': 'WebSite',
      '@id': `${this.baseUrl}/#website`,
      url: this.baseUrl,
      name: this.orgName,
      description: 'CNC job work and ring manufacturing for auto parts, machinery parts and vehicle parts up to 500mm OD.',
      publisher: { '@id': organizationId }
    };

    const service = {
      '@type': 'Service',
      name: 'CNC Job Work & Ring Manufacturing',
      serviceType: 'CNC turning job work',
      provider: { '@id': organizationId },
      areaServed: 'IN',
      description:
        'Ring manufacturing and precision turned components up to 500mm outer diameter for auto parts, machinery parts and vehicle parts.'
    };

    const graph = [organization, localBusiness, webSite, service];
    const structuredData = { '@context': 'https://schema.org', '@graph': graph };

    this.transferState.set(STRUCTURED_DATA_KEY, JSON.stringify(structuredData));

    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }

  // ---- Enquiry form handling ----
  // Submission is always prevented so the page never reloads.
  // On a static site this sends the enquiry to the owner's WhatsApp instead.
  onSubmit(event: Event) {
    event.preventDefault();
    this.formError = '';

    const name = this.formState.name.trim();
    const phone = this.formState.phone.trim();

    if (!name) {
      this.formError = 'Please enter your name.';
      return;
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      this.formError = 'Please enter a valid 10-digit mobile number.';
      return;
    }
    if (this.formState.message.trim().length < 5) {
      this.formError = 'Please add a short message about your requirement.';
      return;
    }

    this.openWhatsApp();
  }

  private openWhatsApp() {
    const text = [
      `New Enquiry - ${this.orgName}`,
      `Name: ${this.formState.name.trim()}`,
      `Phone: ${this.formState.phone.trim()}`,
      this.formState.email.trim() ? `Email: ${this.formState.email.trim()}` : '',
      this.formState.category ? `Category: ${this.formState.category}` : '',
      `Details: ${this.formState.message.trim()}`
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    this.submitted = true;
  }

  trackByCategory = (_: number, item: Category) => item.name;
  trackByCapability = (_: number, item: Capability) => item.title;
  trackByFeature = (_: number, item: Feature) => item.title;
  trackByStep = (_: number, item: ProcessStep) => item.step;
  trackByShowcase = (_: number, item: ShowcaseItem) => item.src;

  scrollTo(target: string, event?: Event) {
    event?.preventDefault();
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      const el = document.getElementById(target);
      if (el) {
        const header = document.querySelector('.main-header') as HTMLElement | null;
        const offset = header ? header.offsetHeight : 88;
        const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }
}
