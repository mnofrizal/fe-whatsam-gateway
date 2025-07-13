"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Shield,
  Zap,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  Globe,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const features = [
  {
    icon: MessageSquare,
    title: "WhatsApp API Integration",
    description:
      "Seamlessly integrate with WhatsApp Business API for automated messaging and customer engagement.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security with end-to-end encryption and compliance with international standards.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Lightning-fast message delivery with 99.9% uptime and real-time monitoring.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Comprehensive insights and reporting to track your messaging performance and ROI.",
  },
  {
    icon: Users,
    title: "Multi-User Management",
    description:
      "Team collaboration with role-based access control and user management.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connect with customers worldwide with multi-language support and global infrastructure.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO, TechCorp",
    content:
      "WhatsApp Gateway PaaS transformed our customer communication. The API is robust and the dashboard is incredibly intuitive.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager, StartupXYZ",
    content:
      "The real-time monitoring and analytics helped us optimize our messaging strategy and improve customer engagement by 40%.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director, E-commerce Plus",
    content:
      "Easy to integrate, reliable, and excellent support. Our conversion rates increased significantly after implementing this solution.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                WhatsApp Gateway
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="overflow-hidden"
      >
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <motion.div variants={itemVariants}>
                <Badge
                  variant="outline"
                  className="mb-6 border-slate-300 text-slate-700"
                >
                  🚀 Now supporting WhatsApp Business API v2.0
                </Badge>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6"
              >
                Scale Your Business with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                  WhatsApp API Gateway
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto"
              >
                The most reliable WhatsApp Business API platform for
                enterprises. Send messages, manage conversations, and analyze
                performance at scale.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-300 text-slate-700 px-8 py-3"
                  >
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Powerful features designed to help businesses of all sizes
                leverage WhatsApp for growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full border border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Trusted by thousands of businesses
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Active Users" },
                { number: "50M+", label: "Messages Sent" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                What our customers say
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full border border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 mb-4">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using WhatsApp Gateway PaaS
                to grow their customer relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-white hover:bg-slate-800 px-8 py-3"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  WhatsApp Gateway
                </span>
              </div>
              <p className="text-slate-600">
                The most reliable WhatsApp Business API platform for
                enterprises.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/features" className="hover:text-slate-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-slate-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-slate-900">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-slate-900">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/about" className="hover:text-slate-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-slate-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-slate-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-slate-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link href="/help" className="hover:text-slate-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-slate-900">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-slate-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-slate-900">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 mt-12 pt-8 text-center text-slate-600">
            <p>&copy; 2025 WhatsApp Gateway PaaS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
