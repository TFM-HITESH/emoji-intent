"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export function Hero() {
  return (
    <div className="text-center relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundRippleEffect rows={20} />
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-5"
        style={{
          background:
            'radial-gradient(ellipse at center 30%, transparent 50%, rgba(0,0,0,0.8) 100%)',
        }}
      ></div>
      <h1 className="text-4xl md:text-6xl font-bold text-white z-10">
        The Modern API for <br />
        <span className="text-primary">Intent Detection</span>
      </h1>
      <p className="max-w-2xl mx-auto my-8 text-lg text-neutral-300 z-10">
        Understand user intent, even with emojis. Our API provides real-time
        analysis of messages to detect harassment, abuse, and more, ensuring
        safe online interactions.
      </p>
      <a
        href="/register"
        className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-semibold z-10"
      >
        Get API Key
      </a>
    </div>
  );
}
