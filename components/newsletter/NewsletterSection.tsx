'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setEmail('');
      setIsLoading(false);

      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 800);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-r from-jio-purple via-jio-blue to-jio-teal relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-block mb-8 p-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <div className="text-5xl">📬</div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Stay Ahead with Exclusive Insights
          </h2>

          {/* Subheading */}
          <p className="text-lg text-white/90 mb-12 leading-relaxed">
            Get weekly updates on commerce trends, platform features, and industry best practices delivered straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitted}
                className="flex-1 px-6 py-4 rounded-xl border-2 border-white/30 focus:outline-none focus:border-white transition-all disabled:bg-gray-100 disabled:cursor-not-allowed font-medium bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
              />
              <motion.button
                type="submit"
                disabled={isLoading || isSubmitted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-jio-purple rounded-xl font-bold hover:bg-opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading && (
                  <span className="inline-block w-4 h-4 border-2 border-jio-purple border-t-transparent rounded-full animate-spin" />
                )}
                {isSubmitted ? (
                  <>
                    <FiCheck className="w-5 h-5" />
                    Subscribed!
                  </>
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </div>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-sm font-bold"
              >
                ✓ Thanks for subscribing! Check your inbox for a welcome email.
              </motion.div>
            )}

            {/* Privacy Notice */}
            <p className="text-xs text-white/70 mt-6 font-medium">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
