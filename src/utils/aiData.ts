export interface AiDestination {
  name: string;
  emoji: string;
  tag: string;
  desc: string;
  location: string;
  image: string;
}

export const DESTINATIONS: AiDestination[] = [
  { 
    name: "Taj Mahal", 
    emoji: "🏰", 
    tag: "Historical", 
    desc: "Agra's iconic white marble mausoleum, a symbol of eternal love and a UNESCO World Heritage site.",
    location: "Agra, Uttar Pradesh",
    image: "/assets/destinations/Taj_mahal.jpg"
  },
  { 
    name: "Varanasi Ghats", 
    emoji: "🛕", 
    tag: "Spiritual", 
    desc: "Experience the spiritual soul of India at the ancient riverfront steps leading to the holy Ganges.",
    location: "Varanasi, Uttar Pradesh",
    image: "/assets/destinations/varanasi_ghats.jpg"
  },
  { 
    name: "Kerala Backwaters", 
    emoji: "🚣", 
    tag: "Nature", 
    desc: "A serene network of interconnected canals, rivers, and lakes, best explored on a traditional houseboat.",
    location: "Alleppey, Kerala",
    image: "/assets/destinations/kerala_backwaters.jpg"
  },
  { 
    name: "Hampi Ruins", 
    emoji: "🏛️", 
    tag: "Heritage", 
    desc: "The boulder-strewn landscape of Hampi is home to the majestic ruins of the Vijayanagara Empire.",
    location: "Hampi, Karnataka",
    image: "/assets/destinations/hampi_ruins.jpg"
  },
  { 
    name: "Leh Ladakh", 
    emoji: "⛰️", 
    tag: "Adventure", 
    desc: "A high-altitude desert known for its breathtaking mountain passes, crystal-clear lakes, and ancient monasteries.",
    location: "Leh, Ladakh",
    image: "/assets/destinations/leh_ladakh.jpg"
  },
  { 
    name: "Golden Temple", 
    emoji: "✨", 
    tag: "Spiritual", 
    desc: "The holiest shrine of Sikhism, famous for its stunning golden architecture and welcoming atmosphere.",
    location: "Amritsar, Punjab",
    image: "/assets/destinations/golden_temple.jpg"
  },
  { 
    name: "Munnar Tea Gardens", 
    emoji: "🌿", 
    tag: "Nature", 
    desc: "Lush green rolling hills covered with tea plantations, offering breathtaking views and a cool, refreshing climate.",
    location: "Munnar, Kerala",
    image: "/assets/destinations/munnar_tea_gardens.jpg"
  },
  { 
    name: "Mysore Palace", 
    emoji: "🏰", 
    tag: "Heritage", 
    desc: "A stunning example of Indo-Saracenic architecture, especially mesmerizing when illuminated at night.",
    location: "Mysore, Karnataka",
    image: "/assets/destinations/mysore_palace.jpg"
  },
  { 
    name: "Amer Fort", 
    emoji: "🦁", 
    tag: "Historical", 
    desc: "A majestic hilltop fort known for its artistic Hindu style elements and breathtaking views of Maota Lake.",
    location: "Jaipur, Rajasthan",
    image: "/assets/destinations/amer_fort.jpg"
  },
  { 
    name: "Konark Sun Temple", 
    emoji: "☀️", 
    tag: "Heritage", 
    desc: "A 13th-century temple shaped like a giant chariot, famous for its intricate stone carvings and architectural genius.",
    location: "Konark, Odisha",
    image: "/assets/destinations/konark_sun_temple.jpg"
  },
  { 
    name: "Ranthambore", 
    emoji: "🐅", 
    tag: "Wildlife", 
    desc: "One of the best places in India to see the majestic Bengal tiger in its natural habitat, set against ancient ruins.",
    location: "Sawai Madhopur, Rajasthan",
    image: "/assets/destinations/ranthambore.jpg"
  },
  { 
    name: "Victoria Memorial", 
    emoji: "🏛️", 
    tag: "Historical", 
    desc: "A magnificent white marble building from the British era, now serving as a museum and iconic symbol of Kolkata.",
    location: "Kolkata, West Bengal",
    image: "/assets/destinations/victoria_memorial.jpg"
  },
  {
    name: 'Hundru Falls',
    emoji: "🌊",
    tag: 'Waterfall',
    desc: 'A spectacular 98m waterfall on the Subarnarekha River, surrounded by dense forests.',
    location: 'Ranchi, Jharkhand',
    image: '/assets/destinations/Download3.jpg',
  },
  {
    name: 'Betla National Park',
    emoji: "🐘",
    tag: 'Wildlife',
    desc: 'One of Indias first tiger reserves, home to diverse flora and fauna including elephants and leopards.',
    location: 'Latehar, Jharkhand',
    image: '/assets/destinations/download2.jpg',
  },
  {
    name: 'Baidyanath Temple',
    emoji: "🛕",
    tag: 'Spiritual',
    desc: 'One of the twelve Jyotirlingas, this ancient temple is a major pilgrimage site and architectural marvel.',
    location: 'Deoghar, Jharkhand',
    image: '/assets/destinations/download.jpg',
  },
  {
    name: 'Jonha Falls',
    emoji: "💧",
    tag: 'Waterfall',
    desc: 'Also known as Gautamdhara, this beautiful 43m waterfall is perfect for trekking and picnics.',
    location: 'Ranchi, Jharkhand',
    image: '/assets/destinations/Jonha falls.jpg',
  },
  {
    name: 'Ranchi Lake',
    emoji: "🛶",
    tag: 'Nature',
    desc: 'An artificial lake built in 1842, surrounded by lush green hills and perfect for boating.',
    location: 'Ranchi, Jharkhand',
    image: '/assets/destinations/lake.jpg',
  },
  {
    name: 'Tagore Hill',
    emoji: "⛰️",
    tag: 'Historical',
    desc: 'A historical site where Rabindranath Tagore stayed, offering panoramic views of Ranchi city.',
    location: 'Ranchi, Jharkhand',
    image: '/assets/destinations/Hill.jpg',
  }
];

export const FEATURES = [
  { icon: "💬", title: "Multilingual Chat", desc: "Get travel advice in 10+ Indian languages including Hindi, Marathi, and Tamil." },
  { icon: "🗺️", title: "Smart Planner", desc: "Generate custom day-by-day itineraries based on your interests and budget." },
  { icon: "🏛️", title: "AR Exploration", desc: "Preview historical sites in 3D before you even pack your bags." },
  { icon: "🛡️", title: "Safety Guide", desc: "Real-time updates on weather, safety protocols, and local emergency contacts." },
  { icon: "🌿", title: "Eco-Tourism", desc: "Discover sustainable travel options that support local communities and nature." },
  { icon: "🍽️", title: "Food Finder", desc: "Find the most authentic local eateries and hidden culinary gems in any city." },
  { icon: "🎟️", title: "Easy Booking", desc: "One-tap access to monument tickets, guide services, and cultural event permits." },
  { icon: "📊", title: "Live Insights", desc: "Real-time data for tourism boards to improve visitor experiences and safety." },
];

export const QUICK_PROMPTS = [
  "Plan a 3-day India eco-tour",
  "Best beaches in South India",
  "Historical sites in North India",
  "Adventure trips in the Himalayas",
  "Discover unseen gems in India",
];

export const SYSTEM_PROMPT = `You are WanderAI, an expert AI travel guide for India. You specialize in destinations across all states: hill stations, wildlife sanctuaries, beaches, historical sites, spiritual places, adventure sports, cultural experiences, and rare/less-visited hidden gems. Respond warmly, helpfully, and concisely. When planning itineraries, format them clearly with Day-by-Day breakdown. Add relevant emojis. Keep responses under 300 words unless a detailed itinerary is requested. Always celebrate India's diverse identity and promote responsible, sustainable tourism.`;
