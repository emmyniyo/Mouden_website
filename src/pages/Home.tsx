import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Users, 
  Shield, 
  Award, 
  Calendar, 
  FileText, 
  ArrowRight,
  Clock,
  Download
} from 'lucide-react';

export const Home = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: t('home.features.feature1.title'),
      description: t('home.features.feature1.description')
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: t('home.features.feature2.title'),
      description: t('home.features.feature2.description')
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: t('home.features.feature4.title'),
      description: t('home.features.feature4.description')
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: t('home.features.feature3.title'),
      description: t('home.features.feature3.description')
    }
  ];

  const stats = [
    { number: "8,500+", label: t('home.stats.activeMembers') },
    { number: "85+", label: t('home.stats.universities') },
    { number: "30+", label: t('home.stats.yearsOfService') },
    { number: "95%", label: t('home.stats.memberSatisfaction') }
  ];

  const recentNews = [
    {
      id: 1,
      title: t('home.news.articles.professionalDevelopment.title'),
      excerpt: t('home.news.articles.professionalDevelopment.excerpt'),
      date: "2025-01-15",
      image: "https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: t('home.news.articles.salaryNegotiations.title'),
      excerpt: t('home.news.articles.salaryNegotiations.excerpt'),
      date: "2025-01-12",
      image: "https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: t('home.news.articles.conferenceRegistration.title'),
      excerpt: t('home.news.articles.conferenceRegistration.excerpt'),
      date: "2025-01-10",
      image: "https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: t('home.events.list.monthlyAssembly.title'),
      date: "2025-02-01",
      time: "18:00",
      location: t('home.events.list.monthlyAssembly.location')
    },
    {
      id: 2,
      title: t('home.events.list.workshop.title'),
      date: "2025-02-05",
      time: "14:00",
      location: t('home.events.list.workshop.location')
    },
    {
      id: 3,
      title: t('home.events.list.recognition.title'),
      date: "2025-02-14",
      time: "19:00",
      location: t('home.events.list.recognition.location')
    }
  ];

  const recentDocuments = [
    {
      id: 1,
      title: t('home.documents.list.collectiveAgreement.title'),
      type: t('home.documents.list.collectiveAgreement.type'),
      size: t('home.documents.list.collectiveAgreement.size'),
      date: "2025-01-15"
    },
    {
      id: 2,
      title: t('home.documents.list.memberBenefits.title'),
      type: t('home.documents.list.memberBenefits.type'),
      size: t('home.documents.list.memberBenefits.size'),
      date: "2025-01-12"
    },
    {
      id: 3,
      title: t('home.documents.list.professionalStandards.title'),
      type: t('home.documents.list.professionalStandards.type'),
      size: t('home.documents.list.professionalStandards.size'),
      date: "2025-01-10"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
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
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                {t('home.hero.cta')}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg inline-flex items-center justify-center"
              >
                {t('home.hero.learnMore')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Cards */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 hidden lg:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + (index * 0.1)
                  }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 text-center border border-gray-100 transition-all duration-300"
                >
                  {/* Icon Circle */}
                  <div className="w-24 h-24 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <div className="text-2xl font-bold text-white">
                      {stat.number}
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-600 font-semibold text-sm leading-tight group-hover:text-gray-800 transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Decorative Line */}
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.8 + (index * 0.1)
                }}
                whileHover={{ 
                  y: -3, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 text-center border border-gray-100 transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <div className="text-lg font-bold text-white">
                    {stat.number}
                  </div>
                </div>
                
                {/* Number */}
                <div className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.number}
                </div>
                
                {/* Label */}
                <div className="text-gray-600 font-semibold text-xs leading-tight group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </div>
                
                {/* Decorative Line */}
                <div className="mt-3 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('home.features.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.features.subtitle')}
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
                <h2 className="text-3xl font-bold text-gray-900">{t('home.news.title')}</h2>
                <Link
                  to="/news"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                >
                  {t('home.news.viewAll')}
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
                          {t('home.news.readMore')}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('home.events.title')}</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(event.date).toLocaleDateString('fr-FR')} {t('home.events.at')} {event.time}
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('home.documents.title')}</h3>
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
            <h2 className="text-4xl font-bold mb-6">{t('home.cta.title')}</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:scale-105 inline-flex items-center gap-2"
            >
              {t('home.cta.button')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};