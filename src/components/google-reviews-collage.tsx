'use client';

import React, { useEffect, useRef, useState } from 'react';

type Review = {
  rating: number;
  relativePublishTimeDescription?: string;
  text?: { text: string };
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
  };
};

const CACHE_KEY = 'google_reviews_cache_v2';
const CACHE_TTL = 1000 * 60 * 30; // 30 menit

export default function GoogleReviewsCollage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.time < CACHE_TTL) {
        setReviews(parsed.reviews);
        setRating(parsed.rating);
        setCount(parsed.count);
        return;
      }
    }

    fetch('/api/googlereviews')
      .then((res) => res.json())
      .then((data) => {
        const payload = {
          reviews: data.reviews || [],
          rating: data.rating || null,
          count: data.userRatingCount || null,
          time: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        setReviews(payload.reviews);
        setRating(payload.rating);
        setCount(payload.count);
      })
      .catch(() => {});
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: dir === 'left' ? -width : width,
      behavior: 'smooth',
    });
  };

  if (!reviews.length) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-10">
          <h3 className="text-4xl font-black mb-2 text-[#1E293B]">
            Google Reviews
          </h3>
          {rating && count && (
            <p className="text-base text-gray-600">
              ⭐ {rating} / 5 from {count}+ reviews
            </p>
          )}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow border items-center justify-center hover:scale-110 transition"
        >
          ‹
        </button>
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow border items-center justify-center hover:scale-110 transition"
        >
          ›
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide px-1"
        >
          {reviews.slice(0, 10).map((review, idx) => (
            <div
              key={idx}
              className="min-w-[85%] sm:min-w-[48%] md:min-w-[32%] lg:min-w-[23%]
                         bg-gray-50 border border-gray-200 rounded-xl p-5
                         hover:shadow-md transition-shadow"
            >
              {/* Author */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={
                    review.authorAttribution?.photoUri ||
                    'https://via.placeholder.com/48'
                  }
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold text-sm text-[#1E293B] leading-tight">
                    {review.authorAttribution?.displayName || 'Google User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {review.relativePublishTimeDescription}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-2 text-yellow-500 text-sm">
                {'★'.repeat(review.rating)}
                <span className="text-gray-300">
                  {'★'.repeat(5 - review.rating)}
                </span>
              </div>

              {/* Text */}
              <p className="text-sm text-gray-700 leading-snug line-clamp-4">
                {review.text?.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/UGs1UGyehNz32Et67"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 text-lg font-semibold rounded-full text-white shadow-lg hover:scale-105 transition-transform"
            style={{ backgroundColor: '#4B0082' }}
          >
            ⭐ Review Us on Google
          </a>
        </div>
      </div>
    </section>
  );
}
