import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Award, 
  Shield, 
  BookOpen, 
  Heart,
  MapPin,
  Calendar,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Défense des Droits",
      description: "Nous défendons fermement les droits des professeurs universitaires et garantissons des conditions de travail équitables"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Développement Professionnel",
      description: "Nous offrons des programmes de développement professionnel continu pour renforcer les capacités académiques de nos membres"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Solidarité Académique",
      description: "Nous construisons des ponts de coopération et de solidarité entre les professeurs de toutes les universités marocaines"
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: "Excellence Académique",
      description: "Nous visons à atteindre les plus hauts standards d'excellence dans l'enseignement universitaire et la recherche scientifique"
    }
  ];

  const achievements = [
    { number: "30+", label: "Années de Service" },
    { number: "8,500+", label: "Membres Actifs" },
    { number: "85+", label: "Universités et Institutions" },
    { number: "95%", label: "Satisfaction des Membres" }
  ];

  const timeline = [
    {
      year: "1995",
      title: "Fondation du Syndicat",
      description: "Fondation du Syndicat des Professeurs Universitaires Marocains pour protéger les droits des professeurs"
    },
    {
      year: "2005",
      title: "Expansion Nationale",
      description: "Extension du syndicat pour inclure toutes les universités marocaines"
    },
    {
      year: "2015",
      title: "Transformation Numérique",
      description: "Lancement de la plateforme numérique pour mieux servir les membres"
    },
    {
      year: "2025",
      title: "Nouvelle Plateforme",
      description: "Lancement de la plateforme avancée avec des fonctionnalités modernes"
    }
  ];

  const leadership = [
    {
      name: "Dr. Mohammed Al-Hassani",
      position: "Secrétaire Général",
      university: "Université Mohammed V - Rabat",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Dr. Fatima Zahra",
      position: "Secrétaire Général Adjoint",
      university: "Université Hassan II - Casablanca",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Dr. Abderrahman Tazi",
      position: "Trésorier",
      university: "Université Sidi Mohamed Ben Abdellah - Fès",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            alt="Université Marocaine" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              À Propos de Notre Syndicat
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Syndicat des Professeurs Universitaires Marocains - Une voix unie pour l'excellence de l'enseignement supérieur
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Notre Mission et Vision
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center gap-2">
                    <Target className="h-6 w-6" />
                    Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous œuvrons pour défendre les droits et intérêts des professeurs universitaires au Maroc, améliorer la qualité de l'enseignement supérieur, et construire une communauté académique solidaire qui contribue au développement global du pays.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Être le syndicat leader au Maroc et dans la région pour représenter les professeurs universitaires et développer l'enseignement supérieur, tout en préservant les plus hautes valeurs académiques et professionnelles.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Campus Universitaire Marocain"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les valeurs qui guident notre travail et définissent notre identité en tant que syndicat académique professionnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Réalisations en Chiffres
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Histoire et Parcours
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className="flex-1 px-8">
                    <div className={`bg-white rounded-xl p-6 shadow-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Direction du Syndicat
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe dirigeante distinguée de professeurs universitaires expérimentés et compétents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{leader.position}</p>
                <p className="text-sm text-gray-600">{leader.university}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Rejoignez Notre Communauté Académique
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Faites partie du syndicat leader des professeurs universitaires au Maroc
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg hover:scale-105">
                Adhérer Maintenant
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                Nous Contacter
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};