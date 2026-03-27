import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Feedback as FeedbackType, Event, Marketplace } from '../types';
import { mockEvents, DEFAULT_MARKETPLACES } from '../utils/mockData';
import { DESTINATIONS, AiDestination } from '../utils/aiData';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [destinations, setDestinations] = useState<AiDestination[]>([]);
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);
  
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingDestination, setEditingDestination] = useState<AiDestination | null>(null);
  const [editingMarketplace, setEditingMarketplace] = useState<Marketplace | null>(null);
  
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isAddingDestination, setIsAddingDestination] = useState(false);
  const [isAddingMarketplace, setIsAddingMarketplace] = useState(false);

  useEffect(() => {
    // Load feedback
    const storedFeedback = JSON.parse(localStorage.getItem('jharYatraFeedback') || '[]');
    setFeedbacks(storedFeedback.sort((a: FeedbackType, b: FeedbackType) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ));

    // Load events
    const storedEvents = localStorage.getItem('jharYatraEvents');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      if (parsedEvents.length < mockEvents.length) {
        const mergedEvents = [...parsedEvents];
        mockEvents.forEach(mockEvent => {
          if (!mergedEvents.find(e => e.id === mockEvent.id)) {
            mergedEvents.push(mockEvent);
          }
        });
        setEvents(mergedEvents);
        localStorage.setItem('jharYatraEvents', JSON.stringify(mergedEvents));
      } else {
        setEvents(parsedEvents);
      }
    } else {
      setEvents(mockEvents);
      localStorage.setItem('jharYatraEvents', JSON.stringify(mockEvents));
    }

    // Load destinations
    const storedDestinations = localStorage.getItem('jharYatraDestinations');
    if (storedDestinations) {
      setDestinations(JSON.parse(storedDestinations));
    } else {
      setDestinations(DESTINATIONS);
      localStorage.setItem('jharYatraDestinations', JSON.stringify(DESTINATIONS));
    }

    // Load marketplaces
    const storedMarketplaces = localStorage.getItem('jharYatraMarketplaces');
    if (storedMarketplaces) {
      setMarketplaces(JSON.parse(storedMarketplaces));
    } else {
      setMarketplaces(DEFAULT_MARKETPLACES as unknown as Marketplace[]);
      localStorage.setItem('jharYatraMarketplaces', JSON.stringify(DEFAULT_MARKETPLACES));
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    let newEvents;
    if (isAddingEvent) {
      newEvents = [...events, { ...updatedEvent, id: Date.now().toString(), created_at: new Date().toISOString() }];
    } else {
      newEvents = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
    }
    setEvents(newEvents);
    localStorage.setItem('jharYatraEvents', JSON.stringify(newEvents));
    setEditingEvent(null);
    setIsAddingEvent(false);
  };

  const handleDeleteEvent = (id: string) => {
    const newEvents = events.filter(e => e.id !== id);
    setEvents(newEvents);
    localStorage.setItem('jharYatraEvents', JSON.stringify(newEvents));
  };

  const handleUpdateDestination = (updatedDest: AiDestination) => {
    let newDests;
    const existingIndex = destinations.findIndex(d => d.name === updatedDest.name);
    
    if (isAddingDestination || existingIndex === -1) {
      newDests = [...destinations, updatedDest];
    } else {
      newDests = destinations.map(d => d.name === updatedDest.name ? updatedDest : d);
    }
    
    setDestinations(newDests);
    localStorage.setItem('jharYatraDestinations', JSON.stringify(newDests));
    setEditingDestination(null);
    setIsAddingDestination(false);
  };

  const handleDeleteDestination = (name: string) => {
    const newDests = destinations.filter(d => d.name !== name);
    setDestinations(newDests);
    localStorage.setItem('jharYatraDestinations', JSON.stringify(newDests));
  };

  const handleUpdateMarketplace = (updatedMarket: Marketplace) => {
    let newMarkets;
    if (isAddingMarketplace) {
      newMarkets = [...marketplaces, { ...updatedMarket, id: Date.now().toString() }];
    } else {
      newMarkets = marketplaces.map(m => m.id === updatedMarket.id ? updatedMarket : m);
    }
    setMarketplaces(newMarkets);
    localStorage.setItem('jharYatraMarketplaces', JSON.stringify(newMarkets));
    setEditingMarketplace(null);
    setIsAddingMarketplace(false);
  };

  const handleDeleteMarketplace = (id: string) => {
    const newMarkets = marketplaces.filter(m => m.id !== id);
    setMarketplaces(newMarkets);
    localStorage.setItem('jharYatraMarketplaces', JSON.stringify(newMarkets));
  };

  const deleteFeedback = (id: string) => {
    const updatedFeedback = feedbacks.filter(f => f.id !== id);
    setFeedbacks(updatedFeedback);
    localStorage.setItem('jharYatraFeedback', JSON.stringify(updatedFeedback));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-offwhite dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-forest-900 dark:text-white">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Welcome back, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{user?.full_name || user?.email}</span>
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 font-bold transition-all border border-red-100 dark:border-red-800"
          >
            Sign out
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/20">
            <p className="text-xs opacity-80 mb-1 uppercase tracking-wider font-bold">Feedbacks</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black">{feedbacks.length}</p>
              <span className="text-2xl opacity-50">💬</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20">
            <p className="text-xs opacity-80 mb-1 uppercase tracking-wider font-bold">Events</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black">{events.length}</p>
              <span className="text-2xl opacity-50">📅</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg shadow-amber-500/20">
            <p className="text-xs opacity-80 mb-1 uppercase tracking-wider font-bold">Destinations</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black">{destinations.length}</p>
              <span className="text-2xl opacity-50">🏰</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-3xl p-6 text-white shadow-lg shadow-purple-500/20">
            <p className="text-xs opacity-80 mb-1 uppercase tracking-wider font-bold">Markets</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-black">{marketplaces.length}</p>
              <span className="text-2xl opacity-50">🛍️</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content - Scrollable Area */}
          <div className="lg:col-span-2 space-y-8 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
            
            {/* Destinations Section */}
            <section className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-amber-500 text-2xl">🏰</span>
                  Top Destinations
                </h2>
                <button 
                  onClick={() => {
                    setIsAddingDestination(true);
                    setEditingDestination({ name: '', emoji: '📍', tag: '', desc: '', location: '', image: '' });
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                >
                  + Add Destination
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {destinations.map(dest => (
                    <div key={dest.name} className="p-4 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 group">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="text-2xl">{dest.emoji}</div>
                          <div>
                            <h3 className="font-bold">{dest.name}</h3>
                            <p className="text-xs text-gray-500 line-clamp-1">{dest.desc}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingDestination(dest); setIsAddingDestination(false); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDeleteDestination(dest.name)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Marketplaces Section */}
            <section className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-orange-500 text-2xl">🛍️</span>
                  Marketplaces
                </h2>
                <button 
                  onClick={() => {
                    setIsAddingMarketplace(true);
                    setEditingMarketplace({ id: '', name: '', description: '', location: '', image: '', tags: [] });
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                >
                  + Add Market
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {marketplaces.map(market => (
                    <div key={market.id} className="p-4 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 group">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3">
                          <img src={market.image} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <h3 className="font-bold">{market.name}</h3>
                            <p className="text-xs text-gray-500 line-clamp-1">{market.location}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEditingMarketplace(market); setIsAddingMarketplace(false); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button onClick={() => handleDeleteMarketplace(market.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Events Section */}
            <section className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upcoming Events
                </h2>
                <button 
                  onClick={() => {
                    setIsAddingEvent(true);
                    setEditingEvent({ id: '', name: '', description: '', category: 'festival', date_start: '', date_end: '', location: '', image_url: '', created_at: '' });
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors"
                >
                  + Add Event
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="group p-4 rounded-2xl bg-offwhite dark:bg-gray-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                          {event.image_url && (
                            <img src={event.image_url} alt={event.name} className="w-16 h-16 rounded-xl object-cover" />
                          )}
                          <div>
                            <h3 className="font-bold text-lg">{event.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{event.description}</p>
                            <p className="text-xs mt-1 font-medium text-emerald-600 dark:text-emerald-400">
                              {event.date_start} • {event.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingEvent(event); setIsAddingEvent(false); }}
                            className="p-2 rounded-lg bg-offwhite dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="p-2 rounded-lg bg-offwhite dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Feedback Section */}
            <section className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  User Feedback
                </h2>
              </div>
              <div className="p-6">
                {feedbacks.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No feedback received yet.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {feedbacks.map(feedback => (
                      <div key={feedback.id} className="p-5 rounded-2xl bg-offwhite dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold">
                              {feedback.user_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-bold leading-none">{feedback.user_name}</h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{feedback.user_email}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                              feedback.category === 'bug' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                              feedback.category === 'suggestion' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                              feedback.category === 'praise' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                              'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                            }`}>
                              {feedback.category}
                            </span>
                            <button 
                              onClick={() => deleteFeedback(feedback.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm italic">"{feedback.message}"</p>
                        <div className="mt-3 text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                          {new Date(feedback.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar - Sticky */}
          <div className="space-y-8 lg:sticky lg:top-12">
            <section className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Account Details</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-offwhite dark:bg-gray-800/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                <div className="p-4 rounded-2xl bg-offwhite dark:bg-gray-800/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Account Role</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 capitalize">Administrator</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">{isAddingEvent ? 'Add Event' : 'Edit Event'}</h3>
              <button onClick={() => setEditingEvent(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateEvent(editingEvent); }} className="p-6 space-y-4">
              <input type="text" placeholder="Event Name" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800 outline-none" value={editingEvent.name} onChange={(e) => setEditingEvent({...editingEvent, name: e.target.value})} />
              <textarea placeholder="Description" required rows={3} className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800 outline-none resize-none" value={editingEvent.description} onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingEvent.date_start} onChange={(e) => setEditingEvent({...editingEvent, date_start: e.target.value})} />
                <input type="date" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingEvent.date_end} onChange={(e) => setEditingEvent({...editingEvent, date_end: e.target.value})} />
              </div>
              <input type="text" placeholder="Location" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingEvent.location} onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})} />
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Image (URL or Asset Path)</p>
                <input type="text" placeholder="e.g. /assets/events/fest1.jpg or https://..." className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingEvent.image_url} onChange={(e) => setEditingEvent({...editingEvent, image_url: e.target.value})} />
                <div className="flex flex-wrap gap-2 mt-1">
                  {['fest1.jpg', 'fest2.jpg', 'fest3.jpg', 'fest4.jpg', 'rohini.jpg', 'bandna.jpg', 'mysore_dussehra.jpg', 'pushkar_fair.jpg', 'hornbill_festival.jpg'].map(asset => (
                    <button key={asset} type="button" onClick={() => setEditingEvent({...editingEvent, image_url: `/assets/events/${asset}`})} className="text-[10px] px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                      {asset}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setEditingEvent(null)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Destination Modal */}
      {editingDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">{isAddingDestination ? 'Add Destination' : 'Edit Destination'}</h3>
              <button onClick={() => setEditingDestination(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateDestination(editingDestination); }} className="p-6 space-y-4">
              <input type="text" placeholder="Name" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800 outline-none" value={editingDestination.name} onChange={(e) => setEditingDestination({...editingDestination, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Emoji (e.g. 🏰)" className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingDestination.emoji} onChange={(e) => setEditingDestination({...editingDestination, emoji: e.target.value})} />
                <input type="text" placeholder="Tag (e.g. Heritage)" className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingDestination.tag} onChange={(e) => setEditingDestination({...editingDestination, tag: e.target.value})} />
              </div>
              <textarea placeholder="Description" required rows={3} className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800 outline-none resize-none" value={editingDestination.desc} onChange={(e) => setEditingDestination({...editingDestination, desc: e.target.value})} />
              <input type="text" placeholder="Location" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingDestination.location} onChange={(e) => setEditingDestination({...editingDestination, location: e.target.value})} />
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Image (URL or Asset Path)</p>
                <input type="text" placeholder="e.g. /assets/destinations/taj_mahal.jpg or https://..." required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingDestination.image} onChange={(e) => setEditingDestination({...editingDestination, image: e.target.value})} />
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Taj_mahal.jpg', 'varanasi_ghats.jpg', 'kerala_backwaters.jpg', 'hampi_ruins.jpg', 'leh_ladakh.jpg', 'golden_temple.jpg', 'munnar_tea_gardens.jpg', 'mysore_palace.jpg', 'amer_fort.jpg', 'konark_sun_temple.jpg', 'ranthambore.jpg', 'victoria_memorial.jpg', 'Download3.jpg', 'download2.jpg', 'download.jpg', 'download4.jpg', 'lake.jpg', 'Hill.jpg'].map(asset => (
                    <button key={asset} type="button" onClick={() => setEditingDestination({...editingDestination, image: `/assets/destinations/${asset}`})} className="text-[10px] px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                      {asset}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setEditingDestination(null)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Marketplace Modal */}
      {editingMarketplace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-offwhite dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">{isAddingMarketplace ? 'Add Market' : 'Edit Market'}</h3>
              <button onClick={() => setEditingMarketplace(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateMarketplace(editingMarketplace); }} className="p-6 space-y-4">
              <input type="text" placeholder="Market Name" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800 outline-none" value={editingMarketplace.name} onChange={(e) => setEditingMarketplace({...editingMarketplace, name: e.target.value})} />
              <textarea placeholder="Description" required rows={3} className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800 outline-none resize-none" value={editingMarketplace.description} onChange={(e) => setEditingMarketplace({...editingMarketplace, description: e.target.value})} />
              <input type="text" placeholder="Location" required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingMarketplace.location} onChange={(e) => setEditingMarketplace({...editingMarketplace, location: e.target.value})} />
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Image (URL or Asset Path)</p>
                <input type="text" placeholder="e.g. /assets/marketplaces/dilli_haat.jpg or https://..." required className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingMarketplace.image} onChange={(e) => setEditingMarketplace({...editingMarketplace, image: e.target.value})} />
                <div className="flex flex-wrap gap-2 mt-1">
                  {['dilli_haat.jpg', 'colaba_causeway.jpg', 'johari_bazaar.jpg', 'anjuna_flea_market.jpg', 'laad_bazaar.jpg', 'floating_market.jpg', 'police_bazar.jpg', 'janpath_market.jpg', 'pondy_bazaar.jpg'].map(asset => (
                    <button key={asset} type="button" onClick={() => setEditingMarketplace({...editingMarketplace, image: `/assets/marketplaces/${asset}`})} className="text-[10px] px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                      {asset}
                    </button>
                  ))}
                </div>
              </div>
              <input type="text" placeholder="Tags (comma separated)" className="w-full px-4 py-2 rounded-xl border dark:bg-gray-800" value={editingMarketplace.tags.join(', ')} onChange={(e) => setEditingMarketplace({...editingMarketplace, tags: e.target.value.split(',').map(t => t.trim())})} />
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setEditingMarketplace(null)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

