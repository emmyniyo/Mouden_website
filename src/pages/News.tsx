import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight,
  Search,
  Filter,
  BookOpen
} from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: 'news' | 'announcement' | 'event';
  image: string;
  featured: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'meeting' | 'workshop' | 'conference' | 'social';
  registrationRequired: boolean;
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Nouveau Programme de Développement Professionnel Lancé',
    excerpt: 'Opportunités de formation complètes maintenant disponibles pour tous les membres du syndicat avec un focus sur les méthodologies d\'enseignement modernes.',
    content: 'Contenu complet ici...',
    author: 'Sarah Johnson',
    publishDate: '2025-01-15',
    category: 'announcement',
    image: 'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: '2',
    title: 'Résultats Positifs des Négociations Salariales',
    excerpt: 'Le syndicat obtient une augmentation de salaire de 8% et un package d\'avantages amélioré pour tous les membres avec effet immédiat.',
    content: 'Contenu complet ici...',
    author: 'Michael Chen',
    publishDate: '2025-01-12',
    category: 'news',
    image: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: '3',
    title: 'Inscription Ouverte pour la Conférence Annuelle de l\'Éducation',
    excerpt: 'Rejoignez-nous pour trois jours d\'apprentissage et d\'opportunités de réseautage avec des experts en éducation de premier plan.',
    content: 'Contenu complet ici...',
    author: 'Lisa Rodriguez',
    publishDate: '2025-01-10',
    category: 'event',
    image: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: '4',
    title: 'Nouvelle Bibliothèque de Ressources Pédagogiques Disponible',
    excerpt: 'Accédez à des milliers de matériels éducatifs et de plans de cours dans notre nouvelle bibliothèque numérique.',
    content: 'Contenu complet ici...',
    author: 'David Kim',
    publishDate: '2025-01-08',
    category: 'announcement',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  },
  {
    id: '5',
    title: 'Initiative de Soutien à la Santé Mentale',
    excerpt: 'Nouveaux services de conseil et ateliers de gestion du stress maintenant disponibles pour tous les membres.',
    content: 'Contenu complet ici...',
    author: 'Emma Wilson',
    publishDate: '2025-01-05',
    category: 'announcement',
    image: 'https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false
  }
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Assemblée Mensuelle du Syndicat',
    description: 'Assemblée mensuelle régulière pour discuter des affaires du syndicat et des préoccupations des membres.',
    date: '2025-02-01',
    time: '18:00',
    location: 'Siège du Syndicat, 123 Rue de l\'Éducation',
    type: 'meeting',
    registrationRequired: false
  },
  {
    id: '2',
    title: 'Atelier de Développement Professionnel : Technologie dans l\'Éducation',
    description: 'Apprenez les derniers outils de technologie éducative et comment les intégrer efficacement.',
    date: '2025-02-05',
    time: '14:00',
    location: 'Centre de Formation, Salle A',
    type: 'workshop',
    registrationRequired: true
  },
  {
    id: '3',
    title: 'Événement d\'Appréciation des Membres',
    description: 'Rejoignez-nous pour une soirée de nourriture, de divertissement et de célébration de notre communauté.',
    date: '2025-02-14',
    time: '19:00',
    location: 'Salle de Bal du Centre Communautaire',
    type: 'social',
    registrationRequired: true
  },
  {
    id: '4',
    title: 'Conférence Annuelle de l\'Éducation',
    description: 'Conférence de trois jours avec des ateliers, des conférenciers et des opportunités de réseautage.',
    date: '2025-03-15',
    time: '09:00',
    location: 'Centre de Congrès',
    type: 'conference',
    registrationRequired: true
  }
];

export const News = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'news' | 'events'>('news');

  const categories = [
    { value: 'all', label: t('news.filters.all') },
    { value: 'news', label: t('news.filters.news') },
    { value: 'announcement', label: t('news.filters.announcements') },
    { value: 'event', label: t('news.filters.events') }
  ];
  const eventTypes = ['all', 'meeting', 'workshop', 'conference', 'social'];

  const filteredNews = mockNews.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedCategory === 'all' || event.type === selectedCategory;
    return matchesSearch && matchesType;
  });

  const featuredArticles = filteredNews.filter(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured);

  const getEventTypeColor = (type: string) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      conference: 'bg-purple-100 text-purple-800',
      social: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      all: t('news.filters.all'),
      news: t('news.filters.news'),
      announcement: t('news.filters.announcements'),
      event: t('news.filters.events'),
      meeting: t('news.events.types.meeting'),
      workshop: t('news.events.types.workshop'),
      conference: t('news.events.types.conference'),
      social: t('news.events.types.social')
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('news.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'news'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('news.filters.news')} et {t('news.filters.announcements')}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'events'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('news.events.upcoming')}
            </button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={t('news.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              >
                {(activeTab === 'news' ? categories : eventTypes.map(type => ({ value: type, label: getCategoryLabel(type) }))).map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {activeTab === 'news' ? (
          <>
            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Actualités en Vedette</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
                    >
                      <div className="relative h-64">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                            article.category === 'news' ? 'bg-blue-100 text-blue-800' :
                            article.category === 'announcement' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {getCategoryLabel(article.category)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(article.publishDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                        <Link
                          to={`/news/${article.id}`}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {t('news.article.readMore')}
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Regular Articles */}
            {regularArticles.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dernières Actualités</h2>
                <div className="space-y-6">
                  {regularArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full md:w-64 h-48 md:h-auto object-cover"
                        />
                        <div className="p-6 flex-1">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                              article.category === 'news' ? 'bg-blue-100 text-blue-800' :
                              article.category === 'announcement' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {getCategoryLabel(article.category)}
                            </span>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {article.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {new Date(article.publishDate).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</p>
                          <Link
                            to={`/news/${article.id}`}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {t('news.article.readMore')}
                            <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>
            )}

            {filteredNews.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune actualité trouvée</h3>
                <p className="text-gray-600">Essayez d'ajuster vos critères de recherche.</p>
              </motion.div>
            )}
          </>
        ) : (
          /* Events Section */
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getEventTypeColor(event.type)}`}>
                      {getCategoryLabel(event.type)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  {event.registrationRequired && (
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      {t('news.events.register')}
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun événement trouvé</h3>
                <p className="text-gray-600">Revenez bientôt pour les événements à venir.</p>
              </motion.div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
};