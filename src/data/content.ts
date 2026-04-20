// Real Bo Voyages catalog. Prices preserved exactly from bovoyages.com.

import hero from '@/assets/hero-atlas.jpg';
import marrakech from '@/assets/marrakech.jpg';
import sahara from '@/assets/sahara.jpg';
import chefchaouen from '@/assets/chefchaouen.jpg';
import essaouira from '@/assets/essaouira.jpg';
import minibus from '@/assets/minibus.jpg';
import coach from '@/assets/coach.jpg';
import paradiseValley from '@/assets/paradise-valley.jpg';
import kasbah from '@/assets/kasbah.jpg';
import tafraout from '@/assets/tafraout.jpg';
import crocoparc from '@/assets/crocoparc.jpg';
import hammam from '@/assets/hammam.jpg';
import immouzer from '@/assets/immouzer.jpg';
import massa from '@/assets/massa.jpg';
import taroudant from '@/assets/taroudant.jpg';
import caleche from '@/assets/caleche.jpg';

export const IMAGES = {
  hero, marrakech, sahara, chefchaouen, essaouira, minibus, coach,
  paradiseValley, kasbah, tafraout, crocoparc, hammam, immouzer, massa, taroudant, caleche,
};

export const CURRENCY = '$';

export type Tour = {
  slug: string;
  name: string;
  city: string;
  days: number;
  price: number;
  image: string;
  highlights: string[];
  blurb: string;
};

export const TOURS: Tour[] = [
  {
    slug: 'grand-tour',
    name: 'Grand Tour of Morocco',
    city: 'Casablanca',
    days: 12,
    price: 875.34,
    image: hero,
    highlights: ['Imperial cities', 'Atlas mountains', 'Sahara dunes', 'Atlantic coast'],
    blurb: 'A 12-day signature loop through the four imperial cities, the High Atlas, the dunes of Merzouga and the Atlantic.',
  },
  {
    slug: 'imperial-cities',
    name: 'The Imperial Cities',
    city: 'Casablanca',
    days: 7,
    price: 628.60,
    image: marrakech,
    highlights: ['Rabat', 'Meknes', 'Fes', 'Marrakech'],
    blurb: 'Seven unhurried days across the four imperial capitals, with private guide in each medina.',
  },
  {
    slug: 'pearl-of-the-south',
    name: 'Pearl of the South',
    city: 'Marrakech',
    days: 8,
    price: 699.10,
    image: sahara,
    highlights: ['Aït Ben Haddou', 'Dades valley', 'Merzouga dunes', 'Todra gorges'],
    blurb: 'Eight days from Marrakech into the high desert, ending with a night under the stars in the dunes.',
  },
  {
    slug: 'jewel-of-the-north',
    name: 'Jewel of the North',
    city: 'Casablanca',
    days: 8,
    price: 722.60,
    image: chefchaouen,
    highlights: ['Chefchaouen', 'Tangier', 'Volubilis', 'Fes'],
    blurb: 'A northern circuit through the blue city, the Roman ruins of Volubilis, and the medieval medina of Fes.',
  },
  {
    slug: 'south-essentials',
    name: 'Essentials of the South',
    city: 'Marrakech',
    days: 5,
    price: 499.00,
    image: kasbah,
    highlights: ['Ouarzazate', 'Aït Ben Haddou', 'Zagora dunes'],
    blurb: 'Five focused days into the kasbahs of the south and the doorstep of the Sahara.',
  },
  {
    slug: 'atlantic-escape',
    name: 'Atlantic Escape',
    city: 'Agadir',
    days: 4,
    price: 389.00,
    image: essaouira,
    highlights: ['Essaouira', 'Sidi Kaouki', 'Argan country'],
    blurb: 'A short, slow journey along the Atlantic — fishing ports, argan groves, and quiet beaches.',
  },
];

export type Excursion = {
  slug: string;
  name: string;
  duration: 'half_day' | 'full_day';
  price: number;
  image: string;
  blurb: string;
};

export const EXCURSIONS: Excursion[] = [
  { slug: 'immouzer', name: 'Immouzer Waterfalls', duration: 'full_day', price: 35.25, image: immouzer, blurb: 'A scenic drive into the Atlas to the cascades of Immouzer-des-Ida-Outanane.' },
  { slug: 'massa-4x4', name: 'Massa 4×4 Adventure', duration: 'full_day', price: 76.37, image: massa, blurb: 'Off-road in the Souss-Massa national park, between dunes, estuary and Atlantic.' },
  { slug: 'tafraout-tiznit', name: 'Tafraout & Tiznit', duration: 'full_day', price: 49.35, image: tafraout, blurb: 'The painted blue rocks of Tafraout and the silversmith souks of Tiznit.' },
  { slug: 'tiout-taroudant', name: 'Tiout & Taroudant', duration: 'full_day', price: 52.87, image: taroudant, blurb: 'The palm grove of Tiout and the rose-walled medina of Taroudant.' },
  { slug: 'paradise-valley', name: 'Paradise Valley', duration: 'half_day', price: 32.31, image: paradiseValley, blurb: 'Turquoise pools and palm-lined canyons hidden in the Atlas.' },
  { slug: 'medina-caleche', name: 'Medina & Calèche', duration: 'half_day', price: 32.31, image: caleche, blurb: 'A horse-drawn ride through the old medina, ending with a mint tea on a rooftop.' },
  { slug: 'crocoparc', name: 'Crocoparc', duration: 'half_day', price: 21.15, image: crocoparc, blurb: 'A botanical garden in Drarga, home to crocodiles and tropical species.' },
  { slug: 'berber-massage', name: 'Berber Hammam & Massage', duration: 'half_day', price: 41.12, image: hammam, blurb: 'A traditional black-soap hammam followed by an argan-oil massage.' },
];

export type Vehicle = {
  slug: 'minibus7' | 'minibus10' | 'coach25' | 'coach48';
  capacity: number;
  luggage: string;
  price: number;
  image: string;
  features: ('ac' | 'wifi' | 'water' | 'luggage' | 'english')[];
};

export const VEHICLES: Vehicle[] = [
  { slug: 'minibus7', capacity: 7, luggage: '7 bags', price: 49.35, image: minibus, features: ['ac', 'water', 'english'] },
  { slug: 'minibus10', capacity: 10, luggage: '10 bags', price: 84.60, image: minibus, features: ['ac', 'water', 'english', 'luggage'] },
  { slug: 'coach25', capacity: 25, luggage: '25 bags', price: 155.09, image: coach, features: ['ac', 'wifi', 'water', 'english', 'luggage'] },
  { slug: 'coach48', capacity: 48, luggage: '48 bags', price: 211.49, image: coach, features: ['ac', 'wifi', 'water', 'english', 'luggage'] },
];

export const CITIES = [
  'Agadir', 'Marrakech', 'Casablanca', 'Essaouira', 'Fes', 'Rabat',
  'Tangier', 'Chefchaouen', 'Ouarzazate', 'Merzouga', 'Taroudant', 'Tiznit',
];

export const WHATSAPP_NUMBER = '212600000000'; // placeholder; real number can be wired by client
export const PHONE_DISPLAY = '+212 528 84 00 00';
export const EMAIL = 'contact@bovoyages.com';
