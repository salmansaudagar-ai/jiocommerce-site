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
    <section className="py-20 lg:py-32 bg-gradient-to-r from-jio-purple/10 to-jio-blue/10">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <div className="inline-block mb-6 p-3 rounded-full bg-jio-purple/20">
            <div className="text-4xl">📬</div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-jio-navy">
            Stay Ahead with Exclusive Insights
          </h2>

          {/* Subheading */}
          <p className="text-lg text-gray-600 mb-10">
            Get weekly updates on commerce trends, platform features, and industry best practices delivered to your inbox.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitted}
                className="flex-1 px-6 py-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-jio-purple transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed font-medium"
              />
              <motion.button
                type="submit"
                disabled={isLoading || isSubmitted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-jio-purple text-white rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                className="text-green-600 text-sm font-medium"
              >
                ✓ Thanks for subscribing! Check your inbox for a welcome email.
              </motion.div>
            )}

            {/* Privacy Notice */}
            <p className="text-xs text-gray-600 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
