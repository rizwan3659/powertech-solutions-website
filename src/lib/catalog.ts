// ---------------------------------------------------------------------------
// Power Tech Solutions — Structured Product Catalog
// ---------------------------------------------------------------------------
// Source of truth for all public product/category pages.
//
// Data extracted and organised from the company profile at
// https://www.indiamart.com/power-techsolutions/about-us.html
// (Power Tech Solutions, New Delhi — est. 2009, ISO 9001:2008).
//
// The company deals in Batteries, Voltage Stabilizers, UPS Systems and
// Power Backup Solutions. NOTE: products are intentionally NOT categorised as
// "Inverters" — only the products actually listed by the company are modelled
// here. Edit this file to add/update products; all pages read from it.
// ---------------------------------------------------------------------------

export type FAQ = { question: string; answer: string };

export type Product = {
  slug: string;
  name: string;
  /** Short one-line tagline used on cards. */
  tagline: string;
  categorySlug: string;
  subcategorySlug?: string;
  brand: string;
  /** Local, web-optimised image served from /public/products. */
  image: string | null;
  /** Optional additional images for the product gallery. */
  images?: string[];
  /** SEO-friendly alt text describing the image contents. */
  imageAlt: string;
  /** Marketing overview paragraph(s). */
  overview: string;
  features: string[];
  /** Ordered key/value technical specifications. */
  specs: { label: string; value: string }[];
  applications: string[];
  benefits: string[];
  faqs: FAQ[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export type Subcategory = {
  slug: string;
  name: string;
  description: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Representative image (re-uses a product image). */
  image: string | null;
  subcategories: Subcategory[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

// ---------------------------------------------------------------------------
// Company facts (used for schema markup + content)
// ---------------------------------------------------------------------------

export const COMPANY = {
  name: "Power Tech Solutions",
  legalName: "Power Tech Solutions",
  established: "2009",
  certification: "ISO 9001:2008",
  city: "New Delhi",
  region: "Delhi",
  country: "IN",
  phone: "+91-11-29945496",
  mobile: "+91-9810517255",
  email: "data_powertech@yahoo.com",
  address: "F-109, IIIrd Floor, (R), Shaheen Bagh, Abul Fazal Enclave-II, Jamia Nagar, New Delhi-110025",
  nature: "Manufacturer, Trader, Supplier & Service Provider",
  brands: ["Amaron", "Quanta", "Microtek", "Emerson", "Vertiv", "APC", "Servo"],
  url: "https://powertechsolutions.com",
} as const;

const IMG = (file: string) => `/products/${file}`;

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const categories: Category[] = [
  {
    slug: "batteries",
    name: "Batteries",
    tagline: "Reliable energy storage for every backup need",
    description:
      "A complete range of maintenance-free and deep-cycle batteries — including Amaron Quanta SMF (VRLA) batteries — engineered for UPS, inverter and industrial power backup. Long service life, deep cycling and consistent performance.",
    image: IMG("amaron-quanta-smf-battery.jpg"),
    subcategories: [
      { slug: "tubular-batteries", name: "Tubular Batteries", description: "Deep-cycle tubular plate batteries for long backup and frequent power cuts." },
      { slug: "smf-batteries", name: "SMF Batteries", description: "Sealed Maintenance-Free (VRLA) batteries — spill-proof and zero-maintenance." },
      { slug: "automotive-batteries", name: "Automotive Batteries", description: "Amaron automotive batteries for cars, commercial vehicles and gensets." },
      { slug: "industrial-batteries", name: "Industrial Batteries", description: "High-capacity battery banks for data centres, telecom and industrial UPS." },
    ],
    seo: {
      title: "Batteries — Tubular, SMF, Automotive & Industrial | Power Tech Solutions",
      description:
        "Buy Amaron Quanta SMF batteries, tubular, automotive and industrial batteries in Delhi NCR. Maintenance-free VRLA batteries for UPS and power backup.",
      keywords: ["batteries", "SMF battery", "Amaron Quanta", "tubular battery", "VRLA battery", "industrial battery Delhi"],
    },
  },
  {
    slug: "voltage-stabilizers",
    name: "Voltage Stabilizers",
    tagline: "Protect equipment from unstable mains voltage",
    description:
      "Servo-controlled and automatic voltage stabilizers that deliver clean, regulated output and protect sensitive equipment from voltage fluctuations, spikes and brownouts — for homes, offices and industrial loads.",
    image: IMG("manual-voltage-stabilizer.jpg"),
    subcategories: [
      { slug: "servo-stabilizers", name: "Servo Stabilizers", description: "Servo-motor controlled stabilizers with high correction accuracy (±1%)." },
      { slug: "automatic-voltage-stabilizers", name: "Automatic Voltage Stabilizers", description: "Relay/auto-correcting stabilizers for appliances, ACs and electronics." },
    ],
    seo: {
      title: "Voltage Stabilizers — Servo & Automatic | Power Tech Solutions",
      description:
        "Servo voltage stabilizers and automatic voltage stabilizers for homes, offices and industry. Single & three phase, high accuracy voltage regulation in Delhi NCR.",
      keywords: ["voltage stabilizer", "servo stabilizer", "automatic voltage stabilizer", "three phase stabilizer", "stabilizer Delhi"],
    },
  },
  {
    slug: "ups-systems",
    name: "UPS Systems",
    tagline: "Zero-downtime power for mission-critical loads",
    description:
      "Powertech, Emerson, Vertiv and APC online double-conversion UPS systems from 1 KVA to 100 KVA — single and three phase — delivering pure sine wave output with zero transfer time for servers, medical and industrial equipment.",
    image: IMG("powertech-online-ups.jpg"),
    subcategories: [
      { slug: "online-ups", name: "Online UPS", description: "Double-conversion online UPS with pure sine wave output and zero transfer time." },
      { slug: "three-phase-ups", name: "Three Phase UPS", description: "3-phase online UPS for heavy commercial and industrial three-phase loads." },
      { slug: "industrial-ups", name: "Industrial UPS", description: "Floor-standing industrial UPS from Emerson & Vertiv for plants and data centres." },
    ],
    seo: {
      title: "Online UPS Systems 1KVA–100KVA — Powertech, Emerson, Vertiv | Power Tech Solutions",
      description:
        "Online double-conversion UPS systems from 1 KVA to 100 KVA. Single & three phase, sine wave, industrial UPS from Powertech, Emerson, Vertiv and APC in Delhi NCR.",
      keywords: ["online UPS", "UPS system", "three phase UPS", "industrial UPS", "Emerson UPS", "Vertiv UPS", "1kva ups", "100kva ups"],
    },
  },
  {
    slug: "power-backup-solutions",
    name: "Power Backup Solutions",
    tagline: "End-to-end backup, solar, rental & maintenance",
    description:
      "Complete power backup solutions — solar power systems, UPS rentals, AMC (Annual Maintenance Contracts) and UPS repairing services — backed by ISO 9001:2008 certified engineers and 24/7 support.",
    image: IMG("online-ups-manufacturers.jpg"),
    subcategories: [],
    seo: {
      title: "Power Backup Solutions — Solar, UPS Rental, AMC & Repair | Power Tech Solutions",
      description:
        "Solar power systems, UPS on rent, UPS AMC and UPS repairing services in Delhi NCR. Complete power backup solutions from ISO 9001:2008 certified experts.",
      keywords: ["power backup", "solar power system", "UPS rental", "UPS AMC", "UPS repair", "annual maintenance contract"],
    },
  },
];

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: Product[] = [
  // ----------------------------- BATTERIES -------------------------------
  {
    slug: "amaron-quanta-smf-battery",
    name: "Amaron Quanta SMF Battery",
    tagline: "Sealed maintenance-free VRLA battery with 3-year warranty",
    categorySlug: "batteries",
    subcategorySlug: "smf-batteries",
    brand: "Amaron Quanta",
    image: IMG("amaron-quanta-smf-battery.jpg"),
    images: [IMG("amaron-quanta-smf-battery.jpg"), IMG("smf-battery.jpg")],
    imageAlt: "Amaron Quanta SMF VRLA batteries in multiple Ah ratings with 3-year warranty marking",
    overview:
      "The Amaron Quanta SMF (Sealed Maintenance-Free) battery is a Valve Regulated Lead Acid (VRLA) battery built for standby and cyclic UPS applications. Its spill-proof, leak-proof construction lets it be mounted in any orientation with zero topping-up or maintenance, making it the preferred choice for online UPS systems, data centres and telecom sites.",
    features: [
      "Sealed Maintenance-Free (SMF/VRLA) — no water topping required",
      "Absorbent Glass Mat (AGM) technology for high recombination efficiency",
      "Spill-proof and leak-proof; can be installed in any position",
      "Low self-discharge and long shelf life",
      "Wide operating temperature range with stable performance",
      "Factory-charged and ready to install",
    ],
    specs: [
      { label: "Battery Type", value: "Sealed Maintenance-Free (SMF) VRLA" },
      { label: "Technology", value: "AGM (Absorbent Glass Mat)" },
      { label: "Nominal Voltage", value: "12 V" },
      { label: "Capacity Range", value: "7 Ah – 200 Ah" },
      { label: "Warranty", value: "3 Years" },
      { label: "Design Life", value: "Up to 5 years (standby)" },
      { label: "Brand", value: "Amaron Quanta" },
    ],
    applications: [
      "Online & offline UPS systems",
      "Data centres and server rooms",
      "Telecom towers and BTS sites",
      "Security, fire alarm and surveillance systems",
      "Solar power storage",
    ],
    benefits: [
      "Zero maintenance lowers total cost of ownership",
      "Reliable backup with consistent voltage under load",
      "Safe indoor installation with no acid fumes",
      "Trusted Amaron Quanta quality with 3-year warranty",
    ],
    faqs: [
      { question: "What does SMF battery mean?", answer: "SMF stands for Sealed Maintenance-Free. It is a VRLA battery that never needs water topping-up and can be installed in any orientation without spillage." },
      { question: "What capacities are available?", answer: "Amaron Quanta SMF batteries are available from 7 Ah up to 200 Ah at 12 V to suit small UPS units through to large battery banks." },
      { question: "What is the warranty?", answer: "These batteries carry a 3-year warranty as marked on the product." },
    ],
    seo: {
      title: "Amaron Quanta SMF Battery (VRLA, 12V, 7–200Ah) | Power Tech Solutions",
      description:
        "Buy Amaron Quanta SMF VRLA batteries — sealed maintenance-free, 12V, 7Ah to 200Ah, 3-year warranty. Ideal for UPS, telecom and solar backup in Delhi NCR.",
      keywords: ["Amaron Quanta SMF battery", "SMF battery", "VRLA battery", "maintenance free battery", "12V UPS battery"],
    },
  },
  {
    slug: "smf-vrla-battery",
    name: "SMF Battery (12V VRLA)",
    tagline: "Compact sealed battery for UPS and backup systems",
    categorySlug: "batteries",
    subcategorySlug: "smf-batteries",
    brand: "Quanta / Amaron",
    image: IMG("smf-battery.jpg"),
    imageAlt: "Compact 12V sealed maintenance-free VRLA battery with red and black terminals",
    overview:
      "A compact 12 V Sealed Maintenance-Free (VRLA) battery designed for small UPS units, inverters' DC storage, emergency lighting and electronic backup. Its sealed AGM construction guarantees clean, maintenance-free operation in homes and offices.",
    features: [
      "12 V sealed VRLA / AGM construction",
      "Maintenance-free — no electrolyte top-up",
      "Compact footprint for tower and rack UPS",
      "Robust ABS container resistant to shock and vibration",
      "Long shelf life with low self-discharge",
    ],
    specs: [
      { label: "Battery Type", value: "Sealed Maintenance-Free (SMF) VRLA" },
      { label: "Nominal Voltage", value: "12 V" },
      { label: "Common Ratings", value: "7 Ah / 9 Ah / 12 Ah / 26 Ah / 42 Ah" },
      { label: "Terminal", value: "F1 / F2 / bolt depending on rating" },
      { label: "Warranty", value: "1–2 Years" },
    ],
    applications: [
      "Home and office UPS",
      "Emergency lighting",
      "Security and alarm systems",
      "Medical and lab instruments",
    ],
    benefits: [
      "Plug-and-play replacement for standard UPS",
      "No maintenance and safe indoor use",
      "Stable performance across charge cycles",
    ],
    faqs: [
      { question: "Can this replace my existing UPS battery?", answer: "Yes — match the voltage (12V) and Ah rating of your existing battery and the terminal type for a direct replacement." },
      { question: "Is it maintenance-free?", answer: "Yes, it is a sealed VRLA battery that never requires water topping-up." },
    ],
    seo: {
      title: "12V SMF VRLA Battery for UPS & Backup | Power Tech Solutions",
      description:
        "Compact 12V sealed maintenance-free VRLA batteries (7Ah–42Ah) for UPS, emergency lighting and backup. Direct replacements available in Delhi NCR.",
      keywords: ["SMF battery", "12V VRLA battery", "UPS battery", "7Ah battery", "sealed battery"],
    },
  },
  {
    slug: "tubular-battery",
    name: "Tubular Battery",
    tagline: "Deep-cycle tubular battery for long backup",
    categorySlug: "batteries",
    subcategorySlug: "tubular-batteries",
    brand: "Quanta / Amaron",
    image: IMG("smf-battery.jpg"),
    imageAlt: "Tall tubular plate battery for inverter and long-duration power backup",
    overview:
      "Tubular batteries use thick tubular positive plates and high-density active material to withstand deep, frequent discharge cycles — ideal for areas with long or frequent power cuts. They deliver dependable long-duration backup with a longer service life than flat-plate batteries.",
    features: [
      "Thick tubular positive plates for deep cycling",
      "High charge acceptance and low water loss",
      "Withstands frequent and prolonged power cuts",
      "Longer cycle life than flat-plate batteries",
      "Robust container for high heat tolerance",
    ],
    specs: [
      { label: "Battery Type", value: "Tubular Lead Acid" },
      { label: "Nominal Voltage", value: "12 V" },
      { label: "Capacity Range", value: "100 Ah – 220 Ah" },
      { label: "Application", value: "Home / inverter / long backup" },
      { label: "Warranty", value: "Up to 36 months" },
    ],
    applications: [
      "Home and shop power backup",
      "Areas with long/frequent power cuts",
      "Inverter and solar storage",
    ],
    benefits: [
      "Long backup duration on a single charge",
      "Extended service life lowers replacement cost",
      "Reliable performance in high-temperature conditions",
    ],
    faqs: [
      { question: "Why choose a tubular battery?", answer: "Tubular batteries handle deep, frequent discharges and last longer than flat-plate batteries, making them ideal where power cuts are long or frequent." },
      { question: "Does it need maintenance?", answer: "Standard tubular batteries need periodic water topping-up; sealed tubular variants are also available on request." },
    ],
    seo: {
      title: "Tubular Battery (12V, 100–220Ah) for Long Backup | Power Tech Solutions",
      description:
        "Deep-cycle tubular batteries (100Ah–220Ah) for long-duration home and inverter backup. Long life, high heat tolerance. Available in Delhi NCR.",
      keywords: ["tubular battery", "inverter battery", "150Ah battery", "deep cycle battery", "home backup battery"],
    },
  },
  {
    slug: "amaron-automotive-battery",
    name: "Amaron Automotive Battery",
    tagline: "Maintenance-free cranking power for vehicles",
    categorySlug: "batteries",
    subcategorySlug: "automotive-batteries",
    brand: "Amaron",
    image: IMG("amaron-quanta-smf-battery.jpg"),
    imageAlt: "Amaron maintenance-free automotive battery for cars and commercial vehicles",
    overview:
      "Amaron automotive batteries deliver high cranking power and a long, maintenance-free life for cars, commercial vehicles, tractors and gensets. Built with advanced alloy technology, they offer strong cold-start performance and excellent durability.",
    features: [
      "Maintenance-free sealed design",
      "High Cold Cranking Amps (CCA) for reliable starts",
      "Advanced alloy plates resist corrosion",
      "Low self-discharge for long stand time",
      "Factory-charged and ready to fit",
    ],
    specs: [
      { label: "Battery Type", value: "Maintenance-Free Automotive" },
      { label: "Nominal Voltage", value: "12 V" },
      { label: "Capacity Range", value: "35 Ah – 150 Ah" },
      { label: "Application", value: "Cars, CVs, tractors, gensets" },
      { label: "Warranty", value: "Up to 48 / 60 months (model dependent)" },
      { label: "Brand", value: "Amaron" },
    ],
    applications: [
      "Passenger cars and SUVs",
      "Commercial vehicles and tractors",
      "Diesel generator sets",
    ],
    benefits: [
      "Reliable starting even in cold conditions",
      "Zero maintenance over battery life",
      "Long warranty from a trusted brand",
    ],
    faqs: [
      { question: "Which vehicles are supported?", answer: "Amaron automotive batteries cover most cars, SUVs, commercial vehicles, tractors and generator sets. Share your vehicle model for the exact fitment." },
      { question: "Is it maintenance-free?", answer: "Yes, these are sealed maintenance-free batteries that do not require water topping-up." },
    ],
    seo: {
      title: "Amaron Automotive Battery (Car, CV, Genset) | Power Tech Solutions",
      description:
        "Maintenance-free Amaron automotive batteries (35Ah–150Ah) with high cranking power for cars, commercial vehicles, tractors and gensets in Delhi NCR.",
      keywords: ["Amaron battery", "car battery", "automotive battery", "genset battery", "maintenance free car battery"],
    },
  },
  {
    slug: "industrial-battery",
    name: "Industrial Battery Bank",
    tagline: "High-capacity battery banks for critical power",
    categorySlug: "batteries",
    subcategorySlug: "industrial-batteries",
    brand: "Amaron Quanta",
    image: IMG("amaron-quanta-smf-battery.jpg"),
    imageAlt: "Industrial VRLA battery bank for UPS, telecom and data centre backup",
    overview:
      "Industrial battery banks built from Amaron Quanta VRLA cells provide high-capacity, reliable energy storage for large online UPS systems, data centres, telecom and process industries. Supplied as engineered banks with racks and inter-cell connectors for plug-and-play deployment.",
    features: [
      "High-capacity VRLA cells for sustained backup",
      "Engineered banks with racks and connectors",
      "Float and cyclic duty capability",
      "Long design life for critical infrastructure",
      "Low maintenance with sealed construction",
    ],
    specs: [
      { label: "Battery Type", value: "VRLA / SMF (banked)" },
      { label: "Cell Voltage", value: "2 V / 12 V" },
      { label: "Bank Voltage", value: "Configurable (e.g. 96V, 120V, 240V, 384V)" },
      { label: "Capacity Range", value: "26 Ah – 200 Ah per string" },
      { label: "Application", value: "Industrial / data centre UPS" },
    ],
    applications: [
      "Large online UPS battery banks",
      "Data centres and server farms",
      "Telecom exchanges",
      "Process and manufacturing industries",
    ],
    benefits: [
      "Designed to match your UPS backup time",
      "Reliable, long-life critical power storage",
      "Professional installation and commissioning",
    ],
    faqs: [
      { question: "How is the bank sized?", answer: "We calculate the number of cells and Ah rating from your UPS DC bus voltage, load and required backup time. Share these details for a tailored configuration." },
      { question: "Do you install the bank?", answer: "Yes, our ISO 9001:2008 certified engineers supply, install and commission the complete battery bank with racks." },
    ],
    seo: {
      title: "Industrial Battery Bank (VRLA) for UPS & Data Centre | Power Tech Solutions",
      description:
        "High-capacity industrial VRLA battery banks for large UPS, data centres and telecom. Engineered, installed and commissioned in Delhi NCR.",
      keywords: ["industrial battery", "battery bank", "data centre battery", "UPS battery bank", "VRLA bank"],
    },
  },

  // ------------------------ VOLTAGE STABILIZERS --------------------------
  {
    slug: "servo-voltage-stabilizer",
    name: "Servo Voltage Stabilizer",
    tagline: "High-accuracy servo-controlled voltage regulation",
    categorySlug: "voltage-stabilizers",
    subcategorySlug: "servo-stabilizers",
    brand: "Servo",
    image: IMG("manual-voltage-stabilizer.jpg"),
    imageAlt: "Servo voltage stabilizer with analog voltmeter for industrial voltage regulation",
    overview:
      "Servo voltage stabilizers use a servo motor and buck/boost transformer to continuously correct mains voltage to a precise ±1% output. Available in single and three phase, they protect industrial machinery, medical and electronic equipment from wide voltage fluctuations and brownouts.",
    features: [
      "Servo-motor controlled, ±1% output accuracy",
      "Wide input voltage correction window",
      "Single and three phase models",
      "Microcontroller-based protection (over/under-voltage, overload)",
      "Analog/digital metering and bypass option",
      "High efficiency with low maintenance",
    ],
    specs: [
      { label: "Type", value: "Servo Controlled Voltage Stabilizer" },
      { label: "Phase", value: "Single Phase / Three Phase" },
      { label: "Capacity Range", value: "1 KVA – 500 KVA" },
      { label: "Output Accuracy", value: "± 1 %" },
      { label: "Input Range", value: "Up to 150V–270V (single) / 280V–480V (three)" },
      { label: "Cooling", value: "Air / Oil cooled (rating dependent)" },
    ],
    applications: [
      "Industrial machinery and CNC",
      "Medical and diagnostic equipment",
      "Lifts, HVAC and air conditioning",
      "Commercial buildings and offices",
    ],
    benefits: [
      "Protects expensive equipment from voltage swings",
      "High correction accuracy improves equipment life",
      "Reduces breakdowns and downtime",
    ],
    faqs: [
      { question: "What accuracy does a servo stabilizer provide?", answer: "Servo stabilizers regulate the output to approximately ±1%, far tighter than relay-type automatic stabilizers." },
      { question: "Single or three phase — which do I need?", answer: "Use single phase for homes/offices and three phase for heavy industrial loads. We size the KVA based on your connected load." },
    ],
    seo: {
      title: "Servo Voltage Stabilizer (1–500 KVA, ±1%) | Power Tech Solutions",
      description:
        "Single & three phase servo voltage stabilizers from 1 KVA to 500 KVA with ±1% accuracy. Protect industrial and medical equipment in Delhi NCR.",
      keywords: ["servo voltage stabilizer", "three phase stabilizer", "industrial stabilizer", "servo stabilizer Delhi", "voltage regulator"],
    },
  },
  {
    slug: "automatic-voltage-stabilizer",
    name: "Automatic Voltage Stabilizer",
    tagline: "Auto voltage correction for appliances & electronics",
    categorySlug: "voltage-stabilizers",
    subcategorySlug: "automatic-voltage-stabilizers",
    brand: "Microtek",
    image: IMG("manual-voltage-stabilizer.jpg"),
    imageAlt: "Automatic voltage stabilizer for air conditioners, refrigerators and home appliances",
    overview:
      "Automatic voltage stabilizers automatically sense and correct fluctuating mains voltage to keep appliances running safely. Ideal for air conditioners, refrigerators, televisions, computers and other home and office electronics.",
    features: [
      "Fully automatic voltage correction",
      "Time-delay protection on restart",
      "Over-voltage and low-voltage cut-off",
      "Wall-mountable, compact design",
      "LED/digital display options",
    ],
    specs: [
      { label: "Type", value: "Automatic (relay) Voltage Stabilizer" },
      { label: "Phase", value: "Single Phase" },
      { label: "Capacity Range", value: "0.5 KVA – 10 KVA" },
      { label: "Output", value: "Regulated 220–240 V" },
      { label: "Application Voltage", value: "Wide input working range" },
    ],
    applications: [
      "Air conditioners (1–2 ton)",
      "Refrigerators and washing machines",
      "Televisions and home theatre",
      "Computers and home offices",
    ],
    benefits: [
      "Prevents appliance damage from voltage swings",
      "Affordable, plug-and-play protection",
      "Improves appliance life and performance",
    ],
    faqs: [
      { question: "Which stabilizer do I need for an AC?", answer: "A 4 KVA automatic stabilizer typically suits a 1.5-ton AC. We recommend the exact rating based on your appliance wattage and input voltage range." },
      { question: "How is it different from a servo stabilizer?", answer: "Automatic (relay) stabilizers correct voltage in steps and suit appliances; servo stabilizers offer tighter ±1% accuracy for sensitive/industrial loads." },
    ],
    seo: {
      title: "Automatic Voltage Stabilizer for AC, Fridge & TV | Power Tech Solutions",
      description:
        "Single phase automatic voltage stabilizers (0.5–10 KVA) for ACs, refrigerators, TVs and computers. Auto voltage correction and cut-off protection in Delhi NCR.",
      keywords: ["automatic voltage stabilizer", "AC stabilizer", "home stabilizer", "voltage stabilizer for refrigerator", "Microtek stabilizer"],
    },
  },
  {
    slug: "manual-voltage-stabilizer",
    name: "Manual Voltage Stabilizer",
    tagline: "Manually adjustable stabilizer with voltmeter",
    categorySlug: "voltage-stabilizers",
    subcategorySlug: "automatic-voltage-stabilizers",
    brand: "Power Tech",
    image: IMG("manual-voltage-stabilizer.jpg"),
    imageAlt: "Grey metal manual voltage stabilizer with analog voltmeter and selector knob",
    overview:
      "A robust manual voltage stabilizer with an analog voltmeter and selector that lets the user set the correct output tap. Built in a rugged metal enclosure, it is a cost-effective choice for workshops and locations where a manually-set, dependable correction is preferred.",
    features: [
      "Manual tap selection with analog voltmeter",
      "Rugged powder-coated metal enclosure",
      "Heavy-duty copper-wound transformer",
      "Simple, durable and easy to service",
      "Overload protection",
    ],
    specs: [
      { label: "Type", value: "Manual Voltage Stabilizer" },
      { label: "Phase", value: "Single Phase" },
      { label: "Capacity Range", value: "1 KVA – 10 KVA" },
      { label: "Metering", value: "Analog voltmeter" },
      { label: "Enclosure", value: "Powder-coated steel" },
    ],
    applications: [
      "Workshops and small industry",
      "Pump and motor loads",
      "General-purpose voltage correction",
    ],
    benefits: [
      "Cost-effective and rugged",
      "Easy to operate and maintain",
      "Long service life",
    ],
    faqs: [
      { question: "How does a manual stabilizer work?", answer: "The user reads the analog voltmeter and selects the correct tap to bring the output into the safe range — simple and reliable." },
      { question: "Where is it best used?", answer: "It suits workshops, pumps and applications where a fixed, manually-set output is acceptable and budget is a priority." },
    ],
    seo: {
      title: "Manual Voltage Stabilizer (1–10 KVA) | Power Tech Solutions",
      description:
        "Rugged manual voltage stabilizers (1–10 KVA) with analog voltmeter for workshops, pumps and general loads. Affordable and durable. Delhi NCR.",
      keywords: ["manual voltage stabilizer", "voltage stabilizer", "single phase stabilizer", "workshop stabilizer"],
    },
  },

  // ----------------------------- UPS SYSTEMS -----------------------------
  {
    slug: "powertech-online-ups",
    name: "Powertech 1KVA–100KVA Online UPS System",
    tagline: "Double-conversion online UPS with pure sine wave",
    categorySlug: "ups-systems",
    subcategorySlug: "online-ups",
    brand: "Powertech",
    image: IMG("powertech-online-ups.jpg"),
    images: [IMG("powertech-online-ups.jpg"), IMG("online-ups-manufacturers.jpg")],
    imageAlt: "Powertech online UPS tower units with LCD display, 1KVA to 100KVA range",
    overview:
      "The Powertech online UPS range delivers true double-conversion power protection from 1 KVA to 100 KVA. With zero transfer time and pure sine wave output, it isolates connected equipment from all mains disturbances — sags, surges, spikes and outages — making it ideal for servers, medical equipment and sensitive electronics.",
    features: [
      "True online double-conversion topology",
      "Pure sine wave output, zero transfer time",
      "Wide input voltage and frequency window",
      "LCD display with full status and metering",
      "Generator-compatible with high input PF",
      "Configurable backup via external battery banks",
      "Smart battery management extends battery life",
    ],
    specs: [
      { label: "Topology", value: "Online Double Conversion" },
      { label: "Capacity Range", value: "1 KVA – 100 KVA" },
      { label: "Phase", value: "1:1, 3:1, 3:3 (model dependent)" },
      { label: "Output Waveform", value: "Pure Sine Wave" },
      { label: "Transfer Time", value: "Zero (0 ms)" },
      { label: "Output Voltage", value: "220 / 230 / 240 V AC" },
      { label: "Display", value: "LCD status panel" },
      { label: "Communication", value: "RS232 / USB / SNMP (optional)" },
      { label: "Brand", value: "Powertech" },
    ],
    applications: [
      "Servers, networks and data centres",
      "Medical and diagnostic equipment",
      "Banking, ATM and security systems",
      "CNC and industrial control systems",
    ],
    benefits: [
      "Complete protection from all power problems",
      "Zero downtime for mission-critical loads",
      "Scalable backup to match your requirement",
      "Local service and AMC support",
    ],
    faqs: [
      { question: "What capacity UPS do I need?", answer: "Add up the wattage of all connected equipment and add ~20–30% headroom. We help you size the right KVA and backup time for your load." },
      { question: "Why choose online over offline UPS?", answer: "Online UPS regenerates clean power continuously with zero transfer time — essential for servers and sensitive equipment, unlike offline/line-interactive units." },
      { question: "How much backup time can I get?", answer: "Backup time depends on the connected battery bank. We can configure external batteries for anything from a few minutes to several hours." },
    ],
    seo: {
      title: "Powertech Online UPS 1KVA–100KVA (Sine Wave) | Power Tech Solutions",
      description:
        "Powertech online double-conversion UPS from 1 KVA to 100 KVA — pure sine wave, zero transfer time. For servers, medical and industrial use in Delhi NCR.",
      keywords: ["online UPS", "Powertech UPS", "1kva online ups", "100kva ups", "sine wave UPS", "double conversion UPS"],
    },
  },
  {
    slug: "three-phase-online-ups",
    name: "Three Phase Online UPS",
    tagline: "3-phase power protection for heavy loads",
    categorySlug: "ups-systems",
    subcategorySlug: "three-phase-ups",
    brand: "Powertech / APC",
    image: IMG("online-ups-manufacturers.jpg"),
    imageAlt: "Three phase online UPS tower units with LCD displays for heavy commercial loads",
    overview:
      "Three phase online UPS systems provide robust, scalable power protection for large commercial and industrial three-phase loads. With double-conversion design and high overload capability, they keep entire facilities, server rooms and production lines running through any mains disturbance.",
    features: [
      "Three phase double-conversion topology",
      "High overload and short-circuit capability",
      "Parallel redundancy (N+1) capable",
      "Pure sine wave output, zero transfer time",
      "Advanced LCD/touch monitoring",
      "High input power factor, generator friendly",
    ],
    specs: [
      { label: "Topology", value: "Online Double Conversion" },
      { label: "Phase", value: "Three Phase (3:3 / 3:1)" },
      { label: "Capacity Range", value: "10 KVA – 100 KVA" },
      { label: "Output Waveform", value: "Pure Sine Wave" },
      { label: "Transfer Time", value: "Zero (0 ms)" },
      { label: "Redundancy", value: "Parallel N+1 (optional)" },
    ],
    applications: [
      "Server rooms and data centres",
      "Manufacturing and production lines",
      "Hospitals and large complexes",
      "Commercial buildings and IT parks",
    ],
    benefits: [
      "Protects whole-facility three-phase loads",
      "Scalable and redundant for high availability",
      "Reduces downtime and equipment damage",
    ],
    faqs: [
      { question: "When do I need a three-phase UPS?", answer: "Choose three phase when your facility has a three-phase supply or large loads (typically above 10 KVA) such as data centres and production lines." },
      { question: "Can it be made redundant?", answer: "Yes, models support parallel N+1 redundancy so the system keeps running even if one unit needs service." },
    ],
    seo: {
      title: "Three Phase Online UPS (10–100 KVA) | Power Tech Solutions",
      description:
        "Three phase online UPS systems (10–100 KVA) with double conversion, zero transfer time and N+1 redundancy for data centres and industry in Delhi NCR.",
      keywords: ["three phase UPS", "3 phase online ups", "data centre UPS", "industrial UPS", "50kva ups", "100kva ups"],
    },
  },
  {
    slug: "emerson-online-industrial-ups",
    name: "Emerson Online Industrial UPS",
    tagline: "Floor-standing industrial UPS for critical sites",
    categorySlug: "ups-systems",
    subcategorySlug: "industrial-ups",
    brand: "Emerson",
    image: IMG("emerson-online-industrial-ups.jpeg"),
    imageAlt: "Emerson floor-standing industrial online UPS cabinet with touchscreen installed in a plant room",
    overview:
      "Emerson (Vertiv) online industrial UPS systems are floor-standing, high-capacity units engineered for the most demanding environments. With advanced touchscreen control, high efficiency and rugged industrial build, they protect data centres, plants and process industries with maximum availability.",
    features: [
      "Floor-standing industrial-grade construction",
      "Online double-conversion with high efficiency",
      "Colour touchscreen monitoring and diagnostics",
      "Hot-swappable modules (model dependent)",
      "Parallel redundancy and scalability",
      "Wide environmental tolerance",
    ],
    specs: [
      { label: "Brand", value: "Emerson / Vertiv" },
      { label: "Topology", value: "Online Double Conversion" },
      { label: "Form Factor", value: "Floor-standing cabinet" },
      { label: "Capacity Range", value: "20 KVA – 100+ KVA" },
      { label: "Phase", value: "Three Phase" },
      { label: "Monitoring", value: "Colour touchscreen + SNMP" },
    ],
    applications: [
      "Data centres and IT infrastructure",
      "Manufacturing plants and process industries",
      "Hospitals and critical facilities",
      "Telecom and utilities",
    ],
    benefits: [
      "Industrial reliability for 24/7 operations",
      "High efficiency lowers running cost",
      "Backed by AMC and certified service",
    ],
    faqs: [
      { question: "Is Emerson the same as Vertiv?", answer: "Emerson Network Power's UPS business is now Vertiv. We supply and service both Emerson- and Vertiv-branded industrial UPS systems." },
      { question: "Do you provide AMC for industrial UPS?", answer: "Yes, we offer comprehensive and non-comprehensive AMC with scheduled preventive maintenance for industrial UPS." },
    ],
    seo: {
      title: "Emerson / Vertiv Online Industrial UPS | Power Tech Solutions",
      description:
        "Emerson (Vertiv) floor-standing online industrial UPS (20–100+ KVA) for data centres, plants and critical facilities. Supply, install & AMC in Delhi NCR.",
      keywords: ["Emerson UPS", "Vertiv UPS", "industrial UPS", "online UPS", "data centre UPS", "floor standing UPS"],
    },
  },
  {
    slug: "vertiv-online-ups",
    name: "Vertiv Online UPS",
    tagline: "High-efficiency online UPS for IT & industry",
    categorySlug: "ups-systems",
    subcategorySlug: "industrial-ups",
    brand: "Vertiv",
    image: IMG("emerson-online-industrial-ups.jpeg"),
    imageAlt: "Vertiv online UPS system for data centre and industrial power protection",
    overview:
      "Vertiv online UPS systems combine high efficiency with proven reliability for IT, data centre and industrial applications. Their double-conversion design and intelligent monitoring deliver clean, continuous power and easy serviceability for always-on operations.",
    features: [
      "Online double-conversion topology",
      "High operating efficiency (eco-mode capable)",
      "Intelligent monitoring and alerts",
      "Compact, serviceable design",
      "Battery management for longer life",
    ],
    specs: [
      { label: "Brand", value: "Vertiv" },
      { label: "Topology", value: "Online Double Conversion" },
      { label: "Capacity Range", value: "6 KVA – 100+ KVA" },
      { label: "Phase", value: "Single / Three Phase" },
      { label: "Output Waveform", value: "Pure Sine Wave" },
      { label: "Monitoring", value: "LCD / SNMP" },
    ],
    applications: [
      "Data centres and server rooms",
      "Networking and telecom",
      "Industrial automation",
      "Commercial IT loads",
    ],
    benefits: [
      "High efficiency reduces energy cost",
      "Trusted global brand with local service",
      "Reliable protection for IT loads",
    ],
    faqs: [
      { question: "Does Vertiv UPS support eco-mode?", answer: "Many Vertiv models support a high-efficiency eco-mode that reduces energy losses while retaining fast transfer to double-conversion when needed." },
      { question: "Can you supply and install?", answer: "Yes — we supply, install, commission and service Vertiv UPS across Delhi NCR with AMC options." },
    ],
    seo: {
      title: "Vertiv Online UPS (6–100+ KVA) | Power Tech Solutions",
      description:
        "Vertiv online double-conversion UPS (6–100+ KVA) with high efficiency and eco-mode for IT, data centre and industrial loads. Supply & service in Delhi NCR.",
      keywords: ["Vertiv UPS", "online UPS", "data centre UPS", "high efficiency UPS", "eco mode UPS"],
    },
  },
  {
    slug: "sine-wave-ups",
    name: "Sine Wave UPS",
    tagline: "Clean sine wave backup for sensitive electronics",
    categorySlug: "ups-systems",
    subcategorySlug: "online-ups",
    brand: "Microtek / Powertech",
    image: IMG("online-ups-manufacturers.jpg"),
    imageAlt: "Sine wave UPS units with LCD display for computers and sensitive electronics",
    overview:
      "Sine wave UPS systems deliver pure sine wave output that exactly mimics utility power, ensuring safe, quiet and efficient operation of computers, routers, LED TVs and other sensitive electronics. A reliable, value choice for homes and small offices.",
    features: [
      "Pure sine wave output",
      "Fast switchover with stable backup",
      "Protects sensitive electronics from harmonics",
      "Quiet and energy-efficient operation",
      "Overload and short-circuit protection",
    ],
    specs: [
      { label: "Output Waveform", value: "Pure Sine Wave" },
      { label: "Capacity Range", value: "600 VA – 5 KVA" },
      { label: "Phase", value: "Single Phase" },
      { label: "Application", value: "Home / SOHO / small office" },
      { label: "Battery", value: "External / internal (model dependent)" },
    ],
    applications: [
      "Desktop computers and workstations",
      "Networking and Wi-Fi equipment",
      "LED TVs and entertainment systems",
      "Small office electronics",
    ],
    benefits: [
      "Safe, clean power for electronics",
      "Quiet operation with no humming in loads",
      "Affordable, reliable backup",
    ],
    faqs: [
      { question: "Why is sine wave output better?", answer: "Pure sine wave matches grid power, so motors and electronics run cooler, quieter and without the buzzing or stress caused by square/modified-wave output." },
      { question: "What backup time will I get?", answer: "Backup depends on the battery capacity and connected load. We help you choose the right VA and battery for your needs." },
    ],
    seo: {
      title: "Sine Wave UPS (600VA–5KVA) for Electronics | Power Tech Solutions",
      description:
        "Pure sine wave UPS (600VA–5KVA) for computers, networking and sensitive electronics. Clean, quiet, efficient backup for home and office in Delhi NCR.",
      keywords: ["sine wave UPS", "pure sine wave UPS", "computer UPS", "home UPS", "Microtek UPS"],
    },
  },

  // ----------------------- POWER BACKUP SOLUTIONS ------------------------
  {
    slug: "solar-power-system",
    name: "Solar Power System",
    tagline: "Clean solar energy with reliable backup",
    categorySlug: "power-backup-solutions",
    brand: "Power Tech",
    image: IMG("online-ups-manufacturers.jpg"),
    imageAlt: "Solar power system with panels and battery storage for grid-tied and off-grid backup",
    overview:
      "Complete solar power systems that combine solar panels, charge management and battery storage to cut electricity bills and provide clean backup power. Suitable for homes, offices and commercial rooftops as on-grid, off-grid or hybrid installations.",
    features: [
      "On-grid, off-grid and hybrid configurations",
      "High-efficiency solar panels",
      "Battery storage for backup",
      "Reduces electricity bills",
      "Designed and installed to site requirements",
    ],
    specs: [
      { label: "System Types", value: "On-grid / Off-grid / Hybrid" },
      { label: "Capacity", value: "1 KW and above (custom)" },
      { label: "Storage", value: "Tubular / SMF battery bank" },
      { label: "Application", value: "Home, office, commercial rooftop" },
    ],
    applications: [
      "Residential rooftops",
      "Offices and commercial buildings",
      "Areas with high power costs or frequent cuts",
    ],
    benefits: [
      "Lowers electricity bills significantly",
      "Clean, renewable energy with backup",
      "Custom-designed and professionally installed",
    ],
    faqs: [
      { question: "Which solar system suits me?", answer: "On-grid saves the most on bills, off-grid gives full backup independence, and hybrid combines both. We assess your roof, load and budget to recommend the best fit." },
      { question: "Do you handle installation?", answer: "Yes — we design, supply and install the complete solar system including panels, wiring and battery storage." },
    ],
    seo: {
      title: "Solar Power System (On-grid, Off-grid, Hybrid) | Power Tech Solutions",
      description:
        "Solar power systems for home and commercial rooftops — on-grid, off-grid and hybrid with battery storage. Cut bills with clean backup power in Delhi NCR.",
      keywords: ["solar power system", "rooftop solar", "off grid solar", "hybrid solar", "solar with battery backup"],
    },
  },
  {
    slug: "ups-amc-service",
    name: "UPS AMC Service",
    tagline: "Annual maintenance for guaranteed uptime",
    categorySlug: "power-backup-solutions",
    brand: "Power Tech Solutions",
    image: IMG("emerson-online-industrial-ups.jpeg"),
    imageAlt: "Engineer servicing an industrial UPS under annual maintenance contract",
    overview:
      "Comprehensive and non-comprehensive Annual Maintenance Contracts (AMC) for all makes of UPS systems. Our ISO 9001:2008 certified engineers perform scheduled preventive maintenance, battery health checks and priority breakdown support to keep your power protection always ready.",
    features: [
      "Comprehensive & non-comprehensive AMC options",
      "Scheduled preventive maintenance visits",
      "Battery health monitoring and reporting",
      "Priority breakdown response",
      "Covers all major UPS brands",
    ],
    specs: [
      { label: "Service Type", value: "AMC — Comprehensive / Non-Comprehensive" },
      { label: "Visit Frequency", value: "Monthly / Quarterly (as contracted)" },
      { label: "Coverage", value: "All makes & capacities of UPS" },
      { label: "Response", value: "Priority on-site support" },
    ],
    applications: [
      "Corporate and IT offices",
      "Hospitals and labs",
      "Industries and data centres",
      "Banks and institutions",
    ],
    benefits: [
      "Maximises UPS uptime and battery life",
      "Predictable maintenance cost",
      "Faster breakdown resolution",
    ],
    faqs: [
      { question: "What is the difference between comprehensive and non-comprehensive AMC?", answer: "Comprehensive AMC includes spares/parts, while non-comprehensive covers labour and visits with parts billed separately." },
      { question: "Do you service other brands?", answer: "Yes, we provide AMC for all major UPS brands regardless of where they were purchased." },
    ],
    seo: {
      title: "UPS AMC Service (All Brands) | Power Tech Solutions",
      description:
        "UPS Annual Maintenance Contracts — comprehensive & non-comprehensive — for all brands. Preventive maintenance and priority support in Delhi NCR.",
      keywords: ["UPS AMC", "annual maintenance contract", "UPS maintenance", "UPS service Delhi", "preventive maintenance"],
    },
  },
  {
    slug: "ups-rental-service",
    name: "UPS Rental Service",
    tagline: "UPS systems on rent for events & projects",
    categorySlug: "power-backup-solutions",
    brand: "Power Tech Solutions",
    image: IMG("powertech-online-ups.jpg"),
    imageAlt: "Online UPS units available on rent for events, projects and temporary sites",
    overview:
      "Rent online UPS systems for events, exhibitions, temporary offices, project sites and seasonal load requirements. Flexible short- and long-term rental of single and three phase UPS with delivery, installation and support included.",
    features: [
      "Short and long-term rental plans",
      "Single and three phase UPS available",
      "Delivery, installation and pickup included",
      "Standby support during the rental period",
      "Range of capacities to match the load",
    ],
    specs: [
      { label: "Service Type", value: "UPS on Rent" },
      { label: "Duration", value: "Daily / Weekly / Monthly" },
      { label: "Capacity", value: "1 KVA – 100 KVA" },
      { label: "Includes", value: "Delivery, install, support" },
    ],
    applications: [
      "Events and exhibitions",
      "Temporary offices and project sites",
      "Seasonal/peak load coverage",
      "Backup during equipment servicing",
    ],
    benefits: [
      "No capital expense for temporary needs",
      "Fast deployment with full support",
      "Flexible capacity and duration",
    ],
    faqs: [
      { question: "What is the minimum rental period?", answer: "We offer flexible daily, weekly and monthly rentals depending on your requirement." },
      { question: "Is installation included?", answer: "Yes, rental includes delivery, installation, support and pickup at the end of the term." },
    ],
    seo: {
      title: "UPS Rental Service (1–100 KVA) | Power Tech Solutions",
      description:
        "Rent online UPS systems (1–100 KVA) for events, projects and temporary sites in Delhi NCR. Flexible plans with delivery, installation and support.",
      keywords: ["UPS rental", "UPS on rent", "UPS hire", "event UPS", "temporary UPS Delhi"],
    },
  },
  {
    slug: "ups-repairing-service",
    name: "UPS Repairing Service",
    tagline: "Expert repair for all UPS makes & models",
    categorySlug: "power-backup-solutions",
    brand: "Power Tech Solutions",
    image: IMG("online-ups-manufacturers.jpg"),
    imageAlt: "Technician repairing a UPS system on a workbench with diagnostic tools",
    overview:
      "Fast, reliable repair services for all makes and models of online and offline UPS systems. Our experienced engineers diagnose faults, replace faulty components and restore your UPS to full performance — at your site or our workshop.",
    features: [
      "Repair for all UPS brands and capacities",
      "Component-level diagnosis and repair",
      "Genuine spares and quality components",
      "On-site and workshop repair options",
      "Quick turnaround to minimise downtime",
    ],
    specs: [
      { label: "Service Type", value: "UPS Repair & Servicing" },
      { label: "Coverage", value: "Online & offline UPS, all brands" },
      { label: "Location", value: "On-site / workshop" },
      { label: "Spares", value: "Genuine / OEM-grade" },
    ],
    applications: [
      "Breakdown repair for offices and industry",
      "Out-of-warranty UPS restoration",
      "Battery and card replacement",
      "Preventive servicing",
    ],
    benefits: [
      "Restores UPS to reliable operation",
      "Cost-effective vs. replacement",
      "Experienced, certified engineers",
    ],
    faqs: [
      { question: "Do you repair all UPS brands?", answer: "Yes, our engineers repair all major online and offline UPS brands and capacities." },
      { question: "Is on-site repair available?", answer: "Yes — we offer both on-site repair and workshop repair depending on the fault and capacity." },
    ],
    seo: {
      title: "UPS Repairing Service (All Brands) | Power Tech Solutions",
      description:
        "Expert UPS repair for all online and offline UPS brands. Component-level diagnosis, genuine spares, on-site and workshop service in Delhi NCR.",
      keywords: ["UPS repair", "UPS repairing service", "online UPS repair", "UPS service centre Delhi", "UPS card repair"],
    },
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsBySubcategory(subcategorySlug: string): Product[] {
  return products.filter((p) => p.subcategorySlug === subcategorySlug);
}

/** Related products: same category, excluding the current product. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, limit);
}

export function categoryName(slug: string): string {
  return getCategory(slug)?.name ?? slug;
}
