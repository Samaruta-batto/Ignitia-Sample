
'use client';
import React from 'react';

export default function AnimatedGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      <div className="absolute inset-0 grid-perspective" />
      <div className="absolute inset-0 grid-stars" />
      <div className="absolute inset-0 grid-vignette" />
    </div>
  );
}
