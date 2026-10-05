'use client';

import { useEffect, useState } from 'react';

/**
 * Efeitos "de mesa" (rolagem suave, cursor, parallax ligado à rolagem) só
 * com mouse/trackpad e sem tela de toque. iPad com Magic Keyboard também
 * fica de fora: no Safari a rolagem roda fora da thread principal e qualquer
 * transform ligado ao scroll chega um quadro atrasado (efeito "tremido").
 */
export function isDesktopFx() {
  return navigator.maxTouchPoints === 0
    && window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
}

export function useDesktopFx() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(isDesktopFx()), []);
  return enabled;
}
