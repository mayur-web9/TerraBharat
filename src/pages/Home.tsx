import { useState, useEffect } from 'react';
import { ArrowRight, Star, MapPin, Calendar, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockDestinations, mockEvents, mockReviews } from '../utils/mockData';

const Home = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState(mockDestinations.filter(d => d.is_featured).slice(0, 3));
  const [upcomingEvents, setUpcomingEvents] = useState(mockEvents.slice(0, 3));

  useEffect(() => {
    // Load persisted destinations
    const storedDests = localStorage.getItem('jharYatraDestinations');
    if (storedDests) {
      try {
        const parsedDests = JSON.parse(storedDests);
        if (Array.isArray(parsedDests) && parsedDests.length > 0) {
          // Map AiDestination format to Home page format if needed
          const formattedDests = parsedDests.map((d: any, index: number) => ({
            id: d.id || `persisted-dest-${index}`,
            name: d.name,
            category: d.tag,
            short_description: d.desc,
            district: d.location.split(',')[0],
            images: [d.image],
            is_featured: true
          }));
          setFeaturedDestinations(formattedDests.slice(0, 3));
        }
      } catch (e) {
        console.error("Error parsing destinations from localStorage:", e);
      }
    }

    // Load persisted events
    const storedEvents = localStorage.getItem('jharYatraEvents');
    if (storedEvents) {
      try {
        const parsedEvents = JSON.parse(storedEvents);
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          setUpcomingEvents(parsedEvents.slice(0, 3));
        }
      } catch (e) {
        console.error("Error parsing events from localStorage:", e);
      }
    }
  }, []);

  const stats = [
    { label: 'Destinations', value: '150+', icon: MapPin, color: 'from-forest-500 to-forest-600' },
    { label: 'Happy Travelers', value: '10K+', icon: Users, color: 'from-saffron-500 to-saffron-600' },
    { label: 'Cultural Events', value: '50+', icon: Calendar, color: 'from-forest-500 to-forest-600' },
    { label: 'Growth Rate', value: '95%', icon: TrendingUp, color: 'from-saffron-500 to-saffron-600' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/assets/hero/hero_bg.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-saffron-500/20 backdrop-blur-sm rounded-full text-saffron-300 text-sm font-medium mb-6 border border-saffron-500/30">
              <Calendar className="h-4 w-4 mr-2" />
              Discover the Heart of Unseen India
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Explore the
              <span className="block bg-gradient-to-r from-saffron-400 to-saffron-300 bg-clip-text text-transparent">
                Untamed Beauty
              </span>
              of India
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Experience majestic waterfalls, rich tribal heritage, wildlife sanctuaries, and ancient temples.
              Let AI plan your perfect journey through the land of forests.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/itinerary"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white font-semibold rounded-lg hover:from-saffron-600 hover:to-saffron-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Plan with AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                to="/itinerary#destinations"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-offwhite dark:from-gray-900"></div>
      </section>

      <section className="py-16 bg-offwhite dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-offwhite dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Destinations
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover the most breathtaking places India has to offer
              </p>
            </div>
            <Link
              to="/itinerary#destinations"
              className="hidden md:inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300 font-semibold group"
            >
              View all
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group bg-offwhite dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.images[0]}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-forest-700 dark:text-forest-400">
                    {destination.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {destination.short_description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.district}
                    </div>
                    <Link
                      to={`/itinerary#destinations`}
                      className="text-forest-600 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300 font-semibold text-sm group/link"
                    >
                      Explore
                      <ArrowRight className="inline-block ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-forest-900 to-forest-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Upcoming Cultural Events</h2>
            <p className="text-lg text-gray-300">
              Immerse yourself in the vibrant festivals and traditions of India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-saffron-500/20 text-saffron-300 text-xs font-semibold rounded-full mb-3">
                      {event.category}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                  </div>
                  <Calendar className="h-6 w-6 text-saffron-400" />
                </div>
                <p className="text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{event.location}</span>
                  <span className="text-saffron-400 font-semibold">
                    {new Date(event.date_start).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-flex items-center px-8 py-3 bg-saffron-500 text-white font-semibold rounded-lg hover:bg-saffron-600 transition-colors"
            >
              View Event Calendar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-offwhite dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Travelers Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Real experiences from explorers who discovered India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="bg-offwhite dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-saffron-500 text-saffron-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-forest-500 to-saffron-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                    {review.user_name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-gray-900 dark:text-white">{review.user_name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{review.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-forest-700 to-saffron-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let our AI create a personalized itinerary based on your preferences, budget, and travel dates
          </p>
          <Link
            to="/itinerary"
            className="inline-flex items-center px-10 py-4 bg-offwhite text-forest-700 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-xl transform hover:scale-105"
          >
            Create Your Itinerary
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
