import React, { useState } from 'react';

/** Official logo aspect ratio (273×24 px from sas3.com) */
const LOGO_RATIO = 273 / 24;

interface Sas3LogoProps {
  className?: string;
  /** Display height in pixels */
  height?: number;
}

/**
 * SAS3 Trading wordmark from https://www.sas3.com/images/logo_name.png
 * Uses enhanced SVG for sharp scaling; falls back to bundled PNG.
 */
export default function Sas3Logo({ className = '', height = 40 }: Sas3LogoProps) {
  const [imgSrc, setImgSrc] = useState<'/sas3-logo.svg' | '/sas3-logo.png'>('/sas3-logo.png');
  const width = Math.round(height * LOGO_RATIO);

  return (
    <img
      src={imgSrc}
      alt="SAS3 Trading"
      width={width}
      height={height}
      className={`sas3-logo-img ${imgSrc.endsWith('.svg') ? 'sas3-logo-img--vector' : ''} ${className}`.trim()}
      decoding="async"
      onError={() => setImgSrc(prev => (prev.endsWith('.png') ? '/sas3-logo.svg' : '/sas3-logo.png'))}
    />
  );
}

export { LOGO_RATIO };
