"use client";

import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Developer",
    price: "$0",
    frequency: "/month",
    description: "For personal projects and testing.",
    features: ["1,000 requests/month", "Community support", "Basic analytics"],
    cta: "Get Started",
    href: "/register",
  },
  {
    name: "Enterprise",
    price: "Custom",
    frequency: "",
    description: "For large-scale applications and businesses.",
    features: [
      "Unlimited requests",
      "Dedicated support",
      "Advanced analytics",
      "Custom models",
      "On-premise deployment",
    ],
    cta: "Contact Us",
    href: "mailto:sales@intentapi.com",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-neutral-400 mt-4 max-w-3xl mx-auto">
            Choose the plan that's right for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="bg-card p-8 rounded-lg shadow-lg flex flex-col"
            >
              <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
              <p className="mt-4 text-neutral-400">{tier.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">
                  {tier.price}
                </span>
                <span className="text-lg font-medium text-neutral-400">
                  {tier.frequency}
                </span>
              </div>
              <ul className="mt-8 space-y-4 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href={tier.href}>
                  <p className="block w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-semibold">
                    {tier.cta}
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}