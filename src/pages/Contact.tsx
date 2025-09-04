import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema = yup.object({
  name: yup.string().required('Le nom est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  subject: yup.string().required('Le sujet est requis'),
  message: yup.string().required('Le message est requis').min(10, 'Le message doit contenir au moins 10 caractères')
});

export const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Formulaire soumis:', data);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: 'Envoyez-nous un Email',
      content: 'contact@syndicat-professeurs.ma',
      description: 'Envoyez-nous un email à tout moment'
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: 'Appelez-nous',
      content: '+212 5 37 XX XX XX',
      description: 'Lundi au Vendredi, 9h - 17h'
    },
    {
      icon: <MapPin className="h-6 w-6 text-red-600" />,
      title: 'Visitez-nous',
      content: 'Avenue de l\'Université\nRabat 10000, Maroc',
      description: 'Notre bureau est ouvert aux membres'
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: 'Heures d\'Ouverture',
      content: 'Lun - Ven: 9h00 - 17h00\nSam: 10h00 - 14h00',
      description: 'Fermé les dimanches et jours fériés'
    }
  ];

  const faqItems = [
    {
      question: 'Comment devenir membre du syndicat ?',
      answer: 'Vous pouvez postuler pour l\'adhésion en remplissant notre formulaire d\'inscription et en payant la cotisation annuelle. L\'adhésion est ouverte à tous les enseignants certifiés.'
    },
    {
      question: 'Quels avantages reçoivent les membres ?',
      answer: 'Les membres reçoivent une protection juridique, des opportunités de développement professionnel, l\'accès à des ressources exclusives et une représentation dans les négociations salariales.'
    },
    {
      question: 'Comment puis-je accéder aux documents réservés aux membres ?',
      answer: 'Après vous être connecté à votre compte membre, vous pouvez accéder à tous les documents privés via notre centre de documents.'
    },
    {
      question: 'Comment déposer un grief ?',
      answer: 'Téléchargez le formulaire de grief depuis notre centre de documents ou contactez directement notre bureau pour obtenir de l\'aide avec le processus.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nous Contacter</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entrez en contact avec notre équipe pour toute question ou assistance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Envoyez-nous un Message</h2>
              </div>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Message envoyé avec succès !
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom Complet
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre.email@exemple.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    {...register('subject')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="De quoi s'agit-il ?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Parlez-nous de votre demande..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Envoyer le Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informations de Contact</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{info.title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Questions Fréquemment Posées</h3>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                      {faq.question}
                    </summary>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Support d'Urgence</h3>
          <p className="text-red-100 mb-6">
            Pour les questions syndicales urgentes ou les urgences juridiques, contactez notre ligne d'assistance 24h/24
          </p>
          <div className="flex items-center justify-center gap-2 text-xl font-semibold">
            <Phone className="h-6 w-6" />
            +212 6 XX XX XX XX
          </div>
        </motion.div>
      </div>
    </div>
  );
};