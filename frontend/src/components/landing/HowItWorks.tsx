"use client";

import { Key, Terminal, Rocket } from "lucide-react";

const steps = [
  {
    name: "Get Your API Key",
    description:
      "Sign up for a free account and get your API key from the developer dashboard.",
    icon: <Key className="w-8 h-8 text-primary" />,
  },
  {
    name: "Make a Request",
    description:
      "Send a POST request to our API endpoint with the message you want to analyze.",
    icon: <Terminal className="w-8 h-8 text-primary" />,
  },
  {
    name: "Get the Result",
    description:
      "Receive a JSON response with the detected intents, emotions, and a safety score.",
    icon: <Rocket className="w-8 h-8 text-primary" />,
  },
];

export function HowItWorks() {
  return (
    <section id="api" className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-neutral-400 mt-4 max-w-3xl mx-auto">
            Integrating our API is a simple three-step process.
          </p>
        </div>
        <div className="relative">
          <div
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"
            aria-hidden="true"
          ></div>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.name} className="flex items-center w-full">
                <div className="w-1/2 pr-8 text-right">
                  {index % 2 === 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.name}
                      </h3>
                      <p className="text-neutral-400">{step.description}</p>
                    </div>
                  )}
                </div>
                <div className="w-1/2 pl-8 text-left">
                  {index % 2 !== 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.name}
                      </h3>
                      <p className="text-neutral-400">{step.description}</p>
                    </div>
                  )}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-card p-2 rounded-full border border-border">
                  {step.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
