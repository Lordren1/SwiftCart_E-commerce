"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Contact() {
  return (
    <section className="max-padd-container py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid md:grid-cols-5">
          {/* Contact information panel */}
          <div className="relative overflow-hidden bg-slate-950 p-7 text-white sm:p-10 md:col-span-2">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                <Icon icon="solar:chat-round-dots-linear" width={16} />
                Contact Us
              </span>

              <h1 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
                Let's get in touch.
              </h1>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Have a question about a product, an order, or a delivery? Send
                us a message and we'll be happy to assist.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                    <Icon icon="solar:letter-linear" width={21} height={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-400">
                      Email us
                    </p>
                    <a
                      href="mailto:swiftcharge@gmail.com"
                      className="mt-1 block break-all text-sm font-semibold text-white transition hover:text-cyan-300"
                    >
                      swiftcharge@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                    <Icon
                      icon="solar:headphones-round-sound-linear"
                      width={21}
                      height={21}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Customer support
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Product and order enquiries
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-5">
                <p className="text-xs leading-6 text-slate-500">
                  We welcome your questions, feedback, and suggestions.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="p-6 sm:p-10 md:col-span-3">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-slate-900">
                Send us a message
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in the details below and tell us how we can help.
              </p>
            </div>

            <form action="" method="GET" className="space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-500/10">
                  <Icon
                    icon="solar:user-linear"
                    width={20}
                    height={20}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    required
                    className="h-full w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email-address"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-500/10">
                  <Icon
                    icon="solar:letter-linear"
                    width={20}
                    height={20}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="h-full w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-500/10">
                  <Icon
                    icon="solar:tag-linear"
                    width={20}
                    height={20}
                    className="shrink-0 text-slate-400"
                  />

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is your enquiry about?"
                    required
                    className="h-full w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>

                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-500/10">
                  <Icon
                    icon="solar:chat-line-linear"
                    width={20}
                    height={20}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Write your message here..."
                    required
                    className="w-full resize-y bg-transparent text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3.5 text-sm font-bold text-slate-950 shadow-sm transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/20"
              >
                Send message
                <Icon icon="solar:arrow-right-linear" width={20} height={20} />
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Please provide a valid email address so we can respond to your
                enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
