import { Destination, Event, Review, Marketplace } from '../types';

export const DEFAULT_MARKETPLACES: Marketplace[] = [
  {
    id: "1",
    name: "Dilli Haat, Delhi",
    description: "An open-air food plaza and craft bazaar that offers a taste of India's cultural diversity. Artisans from across the country sell traditional handicrafts and handlooms.",
    location: "INA, New Delhi",
    image: "/assets/marketplaces/dilli_haat.jpg",
    tags: ["Crafts", "Food", "Culture"]
  },
  {
    id: "2",
    name: "Colaba Causeway, Mumbai",
    description: "The shopping soul of Mumbai. From trendy accessories and clothing to antique clocks and vintage collectibles, this market has it all.",
    location: "Colaba, Mumbai",
    image: "/assets/marketplaces/colaba_causeway.jpg",
    tags: ["Antiques", "Fashion", "Street Food"]
  },
  {
    id: "3",
    name: "Johari Bazaar, Jaipur",
    description: "Famous for its stunning collection of precious and semi-precious gemstones, traditional jewelry, and authentic Rajasthani textiles.",
    location: "Pink City, Jaipur",
    image: "/assets/marketplaces/johari_bazaar.jpg",
    tags: ["Jewelry", "Textiles", "Heritage"]
  },
  {
    id: "4",
    name: "Anjuna Flea Market, Goa",
    description: "A vibrant Wednesday market that captures Goa's bohemian spirit. You can find everything from beachwear and hammocks to local spices and handmade jewelry.",
    location: "Anjuna, Goa",
    image: "/assets/marketplaces/anjuna_flea_market.jpg",
    tags: ["Bohemian", "Music", "Spices"]
  },
  {
    id: "5",
    name: "Laad Bazaar, Hyderabad",
    description: "Located near the Charminar, this historic market is world-famous for its exquisite lacquer bangles encrusted with stones.",
    location: "Charminar, Hyderabad",
    image: "/assets/marketplaces/laad_bazaar.jpg",
    tags: ["Bangles", "Lacquer", "Historic"]
  },
  {
    id: "6",
    name: "Floating Vegetable Market, Srinagar",
    description: "A unique early morning experience where vendors sell fresh produce from their traditional wooden boats (shikaras) on the serene Dal Lake.",
    location: "Dal Lake, Srinagar",
    image: "/assets/marketplaces/floating_market.jpg",
    tags: ["Nature", "Local", "Unique"]
  },
  {
    id: "7",
    name: "Police Bazar, Shillong",
    description: "The commercial hub of Shillong. A perfect mix of traditional and modern, where you can find exquisite Meghalayan handlooms, bamboo crafts, and amazing local street food.",
    location: "Khyndailad, Shillong",
    image: "/assets/marketplaces/police_bazar.jpg",
    tags: ["Handlooms", "Bamboo", "Street Food"]
  },
  {
    id: "8",
    name: "Janpath Market, Delhi",
    description: "A popular boutique market known for its long line of small kiosks selling ethnic clothing, silver jewelry, and handicrafts from across India and Tibet.",
    location: "Connaught Place, New Delhi",
    image: "/assets/marketplaces/janpath_market.jpg",
    tags: ["Jewelry", "Handicrafts", "Bargain"]
  },
  {
    id: "9",
    name: "Pondy Bazaar, Chennai",
    description: "One of the busiest shopping areas in Chennai, offering everything from silk sarees and traditional footwear to modern electronics and local accessories.",
    location: "T. Nagar, Chennai",
    image: "/assets/marketplaces/pondy_bazaar.jpg",
    tags: ["Sarees", "Footwear", "Busy"]
  }
];

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Hundru Falls',
    district: 'Ranchi',
    category: 'waterfall',
    description: 'A spectacular waterfall formed by Subarnarekha River, cascading from a height of 98 meters. Surrounded by dense forests, it offers a mesmerizing view especially during monsoon.',
    short_description: 'Spectacular 98m waterfall on the Subarnarekha River',
    latitude: 23.4415,
    longitude: 85.5936,
    images: [
      '/assets/destinations/Download3.jpg',
    ],
    best_time: 'July to October',
    entry_fee: 30,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Betla National Park',
    district: 'Latehar',
    category: 'wildlife',
    description: 'One of the first national parks in India to become a tiger reserve. Home to tigers, elephants, leopards, and various species of flora and fauna.',
    short_description: 'Premier tiger reserve with rich biodiversity',
    latitude: 23.8667,
    longitude: 84.1833,
    images: [
       '/assets/destinations/download2.jpg',
    ],
    best_time: 'November to June',
    entry_fee: 200,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Baidyanath Temple',
    district: 'Deoghar',
    category: 'temple',
    description: 'One of the twelve Jyotirlingas, this ancient temple is a major pilgrimage site. The temple complex is known for its spiritual significance and architectural beauty.',
    short_description: 'Sacred Jyotirlinga shrine and pilgrimage center',
    latitude: 24.4844,
    longitude: 86.6993,
    images: [
      '/assets/destinations/download.jpg',
    ],
    best_time: 'October to March',
    entry_fee: 0,
    is_featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Jonha Falls',
    district: 'Ranchi',
    category: 'waterfall',
    description: 'Also known as Gautamdhara, this beautiful waterfall drops from a height of 43 meters. The surrounding area is perfect for trekking and picnics.',
    short_description: 'Serene waterfall ideal for trekking and picnics',
    latitude: 23.3058,
    longitude: 85.4425,
    images: [
      '/assets/destinations/download4.jpg',
    ],
    best_time: 'June to December',
    entry_fee: 20,
    is_featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Ranchi Lake',
    district: 'Ranchi',
    category: 'park',
    description: 'An artificial lake built in 1842, surrounded by lush green hills. Popular spot for boating and evening walks.',
    short_description: 'Historic artificial lake perfect for boating',
    latitude: 23.3643,
    longitude: 85.3365,
    images: [
      '/assets/destinations/lake.jpg',
    ],
    best_time: 'Year-round',
    entry_fee: 10,
    is_featured: false,
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Tagore Hill',
    district: 'Ranchi',
    category: 'historical',
    description: 'A historical site where Rabindranath Tagore stayed and wrote several literary works. Offers panoramic views of Ranchi city.',
    short_description: 'Historic hill associated with Rabindranath Tagore',
    latitude: 23.3975,
    longitude: 85.3234,
    images: [
      '/assets/destinations/Hill.jpg',
    ],
    best_time: 'October to March',
    entry_fee: 0,
    is_featured: false,
    created_at: new Date().toISOString()
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Sarhul Festival',
    description: 'A spring festival celebrated by the tribal communities of India, marking the worship of nature and the blossoming of Sal trees.',
    category: 'festival',
    date_start: '2026-03-25',
    date_end: '2026-03-27',
    location: 'Across India',
    image_url: '/assets/events/fest1.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Karma Festival',
    description: 'A harvest festival celebrated with traditional dance, music, and rituals to worship the Karma deity for good harvest and prosperity.',
    category: 'cultural',
    date_start: '2026-09-15',
    date_end: '2026-09-16',
    location: 'Tribal Villages',
    image_url: '/assets/events/fest2.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Tusu Parab',
    description: 'A festival dedicated to Goddess Tusu, celebrated during Makar Sankranti with colorful processions and folk songs.',
    category: 'festival',
    date_start: '2026-01-14',
    date_end: '2026-01-15',
    location: 'Purulia, Dhanbad',
    image_url: '/assets/events/fest3.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Chhath Puja',
    description: 'An ancient Hindu festival dedicated to the Sun God, celebrated with devotion and rituals on the banks of rivers and ponds.',
    category: 'festival',
    date_start: '2026-11-10',
    date_end: '2026-11-13',
    location: 'Riverbanks across India',
    image_url: '/assets/events/fest4.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Rohini Festival',
    description: 'The first festival of Jharkhand, Rohini marks the commencement of sowing seeds in the fields. It is a symbolic celebration of the beginning of the agricultural cycle.',
    category: 'cultural',
    date_start: '2026-06-05',
    date_end: '2026-06-06',
    location: 'Rural Jharkhand',
    image_url: '/assets/events/rohini.jpg',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Bandna Festival',
    description: 'A vibrant festival celebrated during the black moon of Kartik month. It is dedicated to the well-being of animals, particularly cows and bulls, which are crucial for farming.',
    category: 'festival',
    date_start: '2026-11-15',
    date_end: '2026-11-17',
    location: 'Santhal Pargana',
    image_url: '/assets/events/bandna.jpg',
    created_at: new Date().toISOString()
  },
  {    id: '7',
    name: 'Mysore Dussehra',
    description: 'The state festival of Karnataka, celebrated with a grand procession of decorated elephants and the magnificent illumination of Mysore Palace.',
    category: 'cultural',
    date_start: '2026-10-13',
    date_end: '2026-10-22',
    location: 'Mysore, Karnataka',
    image_url: '/assets/events/mysore_dussehra.jpg',
    created_at: new Date().toISOString()
  },
  {    id: '8',
    name: 'Pushkar Camel Fair',
    description: "One of the world's largest camel fairs, where thousands of camels, horses, and cattle are traded amidst vibrant cultural performances and competitions.",
    category: 'fair',
    date_start: '2026-11-18',
    date_end: '2026-11-26',
    location: 'Pushkar, Rajasthan',
    image_url: '/assets/events/pushkar_fair.jpg',
    created_at: new Date().toISOString()
  },
  {    id: '9',
    name: 'Hornbill Festival',
    description: 'Known as the Festival of Festivals, it showcases the rich traditional heritage and 16 tribes of Nagaland through music, dance, and food.',
    category: 'cultural',
    date_start: '2026-12-01',
    date_end: '2026-12-10',
    location: 'Kisama, Nagaland',
    image_url: '/assets/events/hornbill_festival.jpg',
    created_at: new Date().toISOString()
  }
];

export const mockReviews: (Review & { user_name: string; location: string })[] = [
  {
    id: '1',
    user_id: 'user1',
    user_name: 'Amit Sharma',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    comment: 'The Hundru Falls in Jharkhand are absolutely breathtaking during the monsoon! The power of the water is something you have to see to believe.',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: 'user2',
    user_name: 'Priya Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    comment: 'The Taj Mahal in Agra is a spiritual and architectural haven. Seeing it at sunrise was a life-changing experience!',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '3',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    user_id: 'user3',
    user_name: 'Rahul Verma',
    location: 'New Delhi',
    rating: 5,
    comment: 'Leh Ladakh is like another planet. The high-altitude passes and the crystal clear lakes of Pangong are purely magical. Must visit!',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '2',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    user_id: 'user4',
    user_name: 'Anjali Gupta',
    location: 'Kolkata, West Bengal',
    rating: 5,
    comment: 'Kerala Backwaters on a houseboat was the most peaceful experience. The greenery and the local food were just incredible.',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '6',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    user_id: 'user5',
    user_name: 'Suresh Iyer',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    comment: 'The ruins of Hampi in Karnataka are a testament to our rich heritage. The stone chariot and the Virupaksha temple left me in awe.',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '4',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    user_id: 'user6',
    user_name: 'Meera Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    comment: 'The Golden Temple in Amritsar is so serene. The community kitchen (Langar) and the spiritual vibe are something everyone should experience.',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '5',
    created_at: new Date().toISOString()
  },
  {
    id: '7',
    user_id: 'user7',
    user_name: 'Vikram Singh',
    location: 'Jaipur, Rajasthan',
    rating: 5,
    comment: 'The Amer Fort in Jaipur is a majestic masterpiece. The Sheesh Mahal is absolutely stunning, and the history here is so well preserved.',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '7',
    created_at: new Date().toISOString()
  },
  {
    id: '8',
    user_id: 'user8',
    user_name: 'Kavita Nair',
    location: 'Kochi, Kerala',
    rating: 5,
    comment: 'Munnar Tea Gardens in Kerala are a paradise for nature lovers. The rolling hills and the fresh air were so rejuvenating for our family.',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '8',
    created_at: new Date().toISOString()
  },
  {
    id: '9',
    user_id: 'user9',
    user_name: 'Arjun Reddy',
    location: 'Hyderabad, Telangana',
    rating: 5,
    comment: 'The Konark Sun Temple in Odisha is an architectural marvel. The stone carvings and the scientific design are mind-blowing!',
    sentiment: 'positive',
    target_type: 'destination',
    target_id: '9',
    created_at: new Date().toISOString()
  }
];
