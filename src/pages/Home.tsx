import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Shield, 
  Award, 
  Calendar, 
  FileText, 
  ArrowRight,
  TrendingUp,
  Clock,
  Download
} from 'lucide-react';

export const Home = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Communauté Académique Unie",
      description: "Rejoignez des milliers de professeurs universitaires qui travaillent ensemble pour un enseignement supérieur d'excellence"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Protection Professionnelle",
      description: "Soutien juridique et défense des droits des professeurs et des conditions de travail universitaires"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "Ressources Pédagogiques",
      description: "Accès aux matériels de développement professionnel et aux ressources pédagogiques spécialisées"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Programmes de Reconnaissance",
      description: "Célébration de l'excellence dans l'enseignement universitaire et des réalisations académiques remarquables"
    }
  ];

  const stats = [
    { number: "8,500+", label: "Membres Actifs" },
    { number: "85+", label: "Universités et Institutions" },
    { number: "30+", label: "Années de Service" },
    { number: "95%", label: "Satisfaction des Membres" }
  ];

  const recentNews = [
    {
      id: 1,
      title: "Lancement d'un nouveau programme de développement professionnel pour les professeurs universitaires",
      excerpt: "Opportunités de formation complètes maintenant disponibles pour tous les membres du syndicat dans diverses spécialisations académiques",
      date: "2025-01-15",
      image: "https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "Résultats positifs des négociations salariales et des avantages universitaires",
      excerpt: "Le syndicat obtient une augmentation de 12% des salaires et une amélioration des avantages pour tous les professeurs universitaires",
      date: "2025-01-12",
      image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "Ouverture des inscriptions à la conférence annuelle de l'enseignement universitaire",
      excerpt: "Rejoignez-nous pour trois jours d'apprentissage et d'opportunités de réseautage académique et professionnel",
      date: "2025-01-10",
      image: "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Assemblée Mensuelle du Syndicat",
      date: "2025-02-01",
      time: "18:00",
      location: "Siège du Syndicat - Rabat"
    },
    {
      id: 2,
      title: "Atelier de Développement Professionnel",
      date: "2025-02-05",
      time: "14:00",
      location: "Centre de Formation - Université Mohammed V"
    },
    {
      id: 3,
      title: "Cérémonie de Reconnaissance des Membres Distingués",
      date: "2025-02-14",
      time: "19:00",
      location: "Centre Culturel - Casablanca"
    }
  ];

  const recentDocuments = [
    {
      id: 1,
      title: "Accord de Négociation Collective 2025",
      type: "PDF",
      size: "2.4 MB",
      date: "2025-01-15"
    },
    {
      id: 2,
      title: "Guide des Avantages des Membres",
      type: "PDF",
      size: "1.8 MB",
      date: "2025-01-12"
    },
    {
      id: 3,
      title: "Guide des Normes Professionnelles Universitaires",
      type: "PDF",
      size: "3.2 MB",
      date: "2025-01-10"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
          <img 
            src="https://images.pexels.com/photos/8926551/pexels-photo-8926551.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            alt="Professeurs et étudiants" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Syndicat des Professeurs Universitaires Marocains
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Pour un enseignement supérieur d'excellence et des droits garantis aux professeurs universitaires au Maroc
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                Rejoindre Notre Syndicat
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg inline-flex items-center justify-center"
              >
                En Savoir Plus
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats for Mobile */}
      <section className="lg:hidden py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white lg:pt-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi Choisir Notre Syndicat ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous offrons un soutien complet et des ressources pour aider les éducateurs à s'épanouir dans leur carrière.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Latest News */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Dernières Actualités</h2>
                <Link
                  to="/news"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  Voir Tout
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="space-y-6">
                {recentNews.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full sm:w-48 h-48 sm:h-32 object-cover"
                      />
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Clock size={16} />
                          {new Date(article.date).toLocaleDateString('fr-FR')}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                        <Link
                          to={`/news/${article.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                        >
                          Lire la Suite
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Upcoming Events */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Événements à Venir</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Documents */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents Récents</h3>
                <div className="space-y-3">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded">
                          <FileText size={20} className="text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{doc.title}</h4>
                          <div className="text-xs text-gray-500 mt-1">
                            {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 p-1">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Prêt à Faire la Différence ?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté d'éducateurs dévoués et aidez à façonner l'avenir de l'éducation.
            </p>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:scale-105 inline-flex items-center gap-2"
            >
              Rejoindre Notre Syndicat
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};