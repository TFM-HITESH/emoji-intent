"use client";
import { ShieldCheck, Smile, Zap, Globe, Cpu, Scaling } from "lucide-react";
import React from "react";
import { PointerHighlight } from "../ui/pointer-highlight";

const features = [
  {
    name: "Advanced Harrassment Detection",
    description:
      "Our AI model is trained to detect subtle forms of harrassment and abuse in text, ensuring a safer online environment.",
    highlight: "subtle forms",
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    rectangleColorClass:
      "bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600",
    pointerColorClass: "text-yellow-500",
  },
  {
    name: "Emoji Intent Analysis",
    description:
      "We don't just read text. Our API understands the intent behind emojis, preventing users from hiding abuse behind playful icons.",
    highlight: "intent behind emojis",
    icon: <Smile className="w-12 h-12 text-primary" />,
    rectangleColorClass:
      "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700",
    pointerColorClass: "text-blue-500",
  },
  {
    name: "Real-Time Processing",
    description:
      "Get instant feedback on messages with our low-latency API, allowing for real-time content moderation.",
    highlight: "instant feedback on messages",
    icon: <Zap className="w-12 h-12 text-primary" />,
    rectangleColorClass:
      "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700",
    pointerColorClass: "text-green-500",
  },
  {
    name: "Multi-lingual Support",
    description:
      "Our models are trained on a diverse dataset to detect intent across multiple languages.",
    highlight: "detect intent across multiple languages",
    icon: <Globe className="w-12 h-12 text-primary" />,
    rectangleColorClass:
      "bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-700",
    pointerColorClass: "text-purple-500",
  },
  {
    name: "Easy Integration",
    description:
      "Integrate our stateless API into your application in minutes with our simple and well-documented SDKs.",
    highlight: "stateless API into your application in minutes",
    icon: <Cpu className="w-12 h-12 text-primary" />,
    rectangleColorClass:
      "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700",
    pointerColorClass: "text-red-500",
  },
  {
    name: "Scalable and Reliable",
    description:
      "Built on a robust infrastructure, our API is designed to handle millions of requests without compromising on performance.",
    highlight: "handle millions of requests",
    icon: <Scaling className="w-12 h-12 text-primary" />,
    rectangleColorClass:
      "bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700",
    pointerColorClass: "text-indigo-500",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Powerful Features to Keep Your Platform Safe
          </h2>
          <p className="text-lg text-neutral-400 mt-4 max-w-3xl mx-auto">
            Our API provides a comprehensive suite of tools to help you maintain
            a healthy and safe online community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-card p-6 rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.name}
              </h3>
              <div className="text-neutral-400">
                {feature.description
                  .split(feature.highlight)
                  .map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index <
                        feature.description.split(feature.highlight).length -
                          1 && (
                        <PointerHighlight
                          rectangleClassName={`${feature.rectangleColorClass} leading-loose`}
                          pointerClassName={`${feature.pointerColorClass} h-3 w-3`}
                          containerClassName="inline-block mx-1"
                        >
                          <span className="relative z-10">
                            {feature.highlight}
                          </span>
                        </PointerHighlight>
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
