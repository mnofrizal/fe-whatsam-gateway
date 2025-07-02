"use client";

import { motion } from "framer-motion";
import { Edit, Crown, Check, X, Users, DollarSign, Calendar, Settings } from "lucide-react";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function ManageSubscriptions() {
  // Fixed subscription plans
  const subscriptionPlans = [
    {
      id: 1,
      name: "Basic",
      price: 19,
      duration: "month",
      description: "Perfect for individuals and small teams",
      features: [
        "Up to 5 WhatsApp instances",
        "Basic analytics",
        "Standard support",
        "API access",
        "Basic webhook support"
      ],
      limitations: [
        "No advanced automation",
        "Limited storage (1GB)",
        "Basic reporting only"
      ],
      activeSubscribers: 23,
      totalRevenue: 437,
      color: "blue",
      popular: false
    },
    {
      id: 2,
      name: "Pro",
      price: 49,
      duration: "month",
      description: "Best for growing businesses and teams",
      features: [
        "Up to 25 WhatsApp instances",
        "Advanced analytics & reporting",
        "Priority support",
        "Full API access",
        "Advanced webhook support",
        "Automation features",
        "Custom integrations"
      ],
      limitations: [
        "Limited storage (10GB)",
        "Standard backup frequency"
      ],
      activeSubscribers: 18,
      totalRevenue: 882,
      color: "purple",
      popular: true
    },
    {
      id: 3,
      name: "Max",
      price: 99,
      duration: "month",
      description: "Enterprise-grade solution for large organizations",
      features: [
        "Unlimited WhatsApp instances",
        "Enterprise analytics & insights",
        "24/7 dedicated support",
        "Full API access with higher limits",
        "Advanced webhook & automation",
        "Custom integrations & workflows",
        "White-label options",
        "Advanced security features",
        "Custom SLA"
      ],
      limitations: [],
      activeSubscribers: 6,
      totalRevenue: 594,
      color: "yellow",
      popular: false
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700",
        icon: "text-blue-600"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200", 
        text: "text-purple-800",
        button: "bg-purple-600 hover:bg-purple-700",
        icon: "text-purple-600"
      },
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-800", 
        button: "bg-yellow-600 hover:bg-yellow-700",
        icon: "text-yellow-600"
      }
    };
    return colorMap[color];
  };

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Subscriptions</h1>
            <p className="text-slate-600 mt-2">
              Configure subscription plans and pricing
            </p>
          </div>
        </motion.div>

        {/* Subscription Plans Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan) => {
            const colors = getColorClasses(plan.color);
            return (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`relative bg-white rounded-xl border-2 ${plan.popular ? 'border-purple-300 shadow-lg' : 'border-slate-200'} overflow-hidden`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} mb-4`}>
                      <Crown className={`h-6 w-6 ${colors.icon}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                      <span className="text-slate-500">/{plan.duration}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{plan.description}</p>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-xs">Subscribers</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">{plan.activeSubscribers}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-xs">Revenue</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">${plan.totalRevenue}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Features Included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-900 mb-3">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-600">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Edit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 ${colors.button} text-white rounded-lg transition-colors font-medium`}
                  >
                    <Edit className="h-4 w-4" />
                    Edit Plan Details
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Subscription Analytics */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <div className="p-6 border-b border-slate-200/80">
            <h3 className="text-lg font-semibold text-slate-900">Subscription Analytics</h3>
            <p className="text-sm text-slate-600 mt-1">Overview of subscription performance</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {subscriptionPlans.reduce((sum, plan) => sum + plan.activeSubscribers, 0)}
                </div>
                <div className="text-sm text-slate-600">Total Active Subscriptions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  ${subscriptionPlans.reduce((sum, plan) => sum + plan.totalRevenue, 0)}
                </div>
                <div className="text-sm text-slate-600">Monthly Recurring Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  ${Math.round(subscriptionPlans.reduce((sum, plan) => sum + plan.totalRevenue, 0) / subscriptionPlans.reduce((sum, plan) => sum + plan.activeSubscribers, 0))}
                </div>
                <div className="text-sm text-slate-600">Average Revenue Per User</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {subscriptionPlans.find(p => p.popular)?.name || "Pro"}
                </div>
                <div className="text-sm text-slate-600">Most Popular Plan</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Plan Comparison Table */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200/80">
            <h3 className="text-lg font-semibold text-slate-900">Plan Comparison</h3>
            <p className="text-sm text-slate-600 mt-1">Side-by-side feature comparison</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200/80">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Feature
                  </th>
                  {subscriptionPlans.map(plan => (
                    <th key={plan.id} className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200/80">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">Price</td>
                  {subscriptionPlans.map(plan => (
                    <td key={plan.id} className="px-6 py-4 text-center text-sm text-slate-900">
                      ${plan.price}/{plan.duration}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">WhatsApp Instances</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-900">Up to 5</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-900">Up to 25</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-900">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">Support Level</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-900">Standard</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-900">Priority</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-900">24/7 Dedicated</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">Active Subscribers</td>
                  {subscriptionPlans.map(plan => (
                    <td key={plan.id} className="px-6 py-4 text-center text-sm text-slate-900">
                      {plan.activeSubscribers}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}