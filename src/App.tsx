import * as React from "react";
import { useState } from "react";
import type { CSSProperties } from "react";

const h = React.createElement;

const stars = Array.from({ length: 65 }, (_, i) => ({
  id: i,
  left: `${(i * 37.17 + 11) % 100}%`,
  top: `${(i * 61.73 + 7) % 100}%`,
  delay: `${(i % 9) * -0.7}s`,
  duration: `${3 + (i % 5)}s`,
  size: `${i % 4 === 0 ? 3 : 1.5}px`,
}));

const floatingHearts = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 43.7 + 4) % 100}%`,
  delay: `${(i % 9) * -1.7}s`,
  duration: `${9 + (i % 7) * 1.5}s`,
  size: `${12 + (i % 4) * 8}px`,
}));

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  width: 100%;
  min-height: 100%;
}

body {
  background: #08040b;
}

button {
  font: inherit;
}

.love-scene {
  --rose: #ff537d;
  --pink: #ffb1c8;
  position: relative;
  isolation: isolate;
  display: flex;
  min-height: 100svh;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  padding: 44px 22px 64px;
  color: #fff5f7;
  background:
    radial-gradient(ellipse at 50% 42%, #401323 0%, #210b1b 30%, transparent 66%),
    radial-gradient(ellipse at 10% 100%, #321020 0%, transparent 45%),
    radial-gradient(ellipse at 92% 0%, #20102d 0%, transparent 43%),
    #08040b;
  font-family: 'Montserrat', sans-serif;
}

.love-scene::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: .3;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.17'/%3E%3C/svg%3E");
  pointer-events: none;
}

.love-scene::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(0,0,0,.23), transparent 22%, transparent 78%, rgba(0,0,0,.23)),
    linear-gradient(0deg, rgba(0,0,0,.35), transparent 30%, transparent 75%, rgba(0,0,0,.17));
}

.aurora {
  position: absolute;
  width: min(80vw, 760px);
  aspect-ratio: 1;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(194, 36, 88, .19), rgba(120, 25, 95, .06) 42%, transparent 70%);
  filter: blur(24px);
  animation: aurora 8s ease-in-out infinite alternate;
  pointer-events: none;
}

.star {
  position: absolute;
  z-index: 0;
  display: block;
  border-radius: 50%;
  background: #ffe4ec;
  box-shadow: 0 0 9px 2px rgba(255, 169, 196, .45);
  animation: twinkle var(--duration) ease-in-out var(--delay) infinite alternate;
  pointer-events: none;
}

.floating-heart {
  position: absolute;
  bottom: -60px;
  z-index: 1;
  color: rgba(255, 100, 143, .45);
  text-shadow: 0 0 14px rgba(255, 51, 110, .35);
  animation: float-up var(--duration) linear var(--delay) infinite;
  pointer-events: none;
  user-select: none;
}

.love-content {
  position: relative;
  z-index: 2;
  width: min(100%, 760px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: scene-enter 1.6s cubic-bezier(.2,.7,.2,1) both;
}

.pre-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  color: rgba(255, 212, 225, .76);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: .38em;
  text-transform: uppercase;
  animation: fade-up 1s .25s both;
}

.pre-title::before,
.pre-title::after {
  content: "";
  width: 27px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e99ab5);
}

.pre-title::after {
  transform: rotate(180deg);
}

.heart-stage {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(180px, 35vw, 270px);
  aspect-ratio: 1;
  margin: 12px 0 -5px;
  animation: fade-up 1.2s .45s both;
}

.heart-orbit {
  position: absolute;
  width: 92%;
  height: 92%;
  border: 1px solid rgba(255, 159, 191, .2);
  border-radius: 50%;
  animation: orbit 24s linear infinite;
}

.heart-orbit::before,
.heart-orbit::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  left: 17%;
  top: 17%;
  border-radius: 50%;
  background: #ffd2e0;
  box-shadow: 0 0 12px #ff8bb0;
}

.heart-orbit::after {
  left: auto;
  top: auto;
  right: 12%;
  bottom: 26%;
  width: 4px;
  height: 4px;
}

.heart-orbit.orbit-two {
  width: 112%;
  height: 112%;
  border-style: dashed;
  border-color: rgba(255, 118, 162, .12);
  animation-direction: reverse;
  animation-duration: 38s;
}

.heart-glow {
  position: absolute;
  width: 64%;
  height: 64%;
  border-radius: 50%;
  background: rgba(255, 39, 102, .25);
  filter: blur(44px);
  animation: heart-glow 2.1s ease-in-out infinite;
}

.main-heart {
  position: relative;
  display: block;
  padding: 0;
  color: #ff668e;
  font-family: Georgia, serif;
  font-size: clamp(100px, 19vw, 150px);
  line-height: 1;
  text-shadow:
    0 0 7px rgba(255, 185, 205, .95),
    0 0 25px rgba(255, 64, 119, .9),
    0 0 65px rgba(255, 24, 94, .5);
  transform-origin: center;
  animation: heartbeat 1.65s ease-in-out infinite;
  filter: drop-shadow(0 0 23px rgba(255, 64, 117, .35));
  user-select: none;
}

.title-line {
  margin: 11px 0 0;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(55px, 11.7vw, 94px);
  line-height: .91;
  font-weight: 500;
  letter-spacing: .105em;
  text-indent: .105em;
  text-transform: uppercase;
  animation: fade-up 1.1s .75s both;
}

.title-line span {
  display: block;
}

.title-line .i-love {
  color: #fff4f7;
  text-shadow: 0 0 30px rgba(255, 210, 225, .16);
}

.title-line .you {
  margin-top: 7px;
  color: #ff9ab6;
  background: linear-gradient(110deg, #ffd4e1 5%, #ff638f 40%, #fff0f4 54%, #ff628f 72%, #ffb6cb 100%);
  background-size: 220% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 5s 1.4s linear infinite;
}

.love-message {
  max-width: 480px;
  margin: 26px 0 0;
  color: rgba(255, 224, 234, .72);
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(19px, 3vw, 24px);
  font-weight: 400;
  font-style: italic;
  line-height: 1.65;
  animation: fade-up 1.1s 1s both;
}

.love-message strong {
  color: #ffadc5;
  font-weight: 600;
}

.love-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 48px;
  margin-top: 29px;
  padding: 0 25px;
  overflow: hidden;
  border: 1px solid rgba(255, 169, 194, .39);
  border-radius: 999px;
  color: #ffe6ee;
  background: rgba(255, 95, 139, .08);
  cursor: pointer;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: .22em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
  transition: background .35s ease, border-color .35s ease, transform .35s ease, box-shadow .35s ease;
  animation: fade-up 1.1s 1.2s both;
}

.love-button:hover {
  transform: translateY(-3px);
  background: rgba(255, 95, 139, .19);
  border-color: rgba(255, 187, 207, .8);
  box-shadow: 0 0 35px rgba(255, 72, 125, .17);
}

.love-button:focus-visible {
  outline: 2px solid #ffb6cd;
  outline-offset: 5px;
}

.button-heart {
  color: #ff789d;
  font-size: 16px;
  animation: heartbeat 1.65s ease-in-out infinite;
}

.signature {
  position: absolute;
  bottom: -68px;
  color: rgba(255, 210, 225, .45);
  font-size: 8px;
  letter-spacing: .29em;
  text-transform: uppercase;
  animation: fade-up 1.1s 1.5s both;
}

.signature span {
  color: #ff7da1;
}

.bottom-note {
  position: absolute;
  bottom: 22px;
  left: 50%;
  z-index: 6;
  width: max-content;
  max-width: 90%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 208, 224, .37);
  font-size: 8px;
  letter-spacing: .24em;
  text-transform: uppercase;
}

.bottom-note::before,
.bottom-note::after {
  content: "";
  width: 24px;
  height: 1px;
  background: rgba(255, 170, 195, .3);
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  14% { transform: scale(1.09); }
  28% { transform: scale(1); }
  42% { transform: scale(1.055); }
  56% { transform: scale(1); }
}

@keyframes heart-glow {
  0%, 100% { transform: scale(.85); opacity: .65; }
  50% { transform: scale(1.18); opacity: 1; }
}

@keyframes twinkle {
  0% { opacity: .14; transform: scale(.7); }
  100% { opacity: .95; transform: scale(1.25); }
}

@keyframes orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float-up {
  0% { transform: translate3d(0, 0, 0) rotate(-12deg) scale(.75); opacity: 0; }
  12% { opacity: .7; }
  50% { transform: translate3d(24px, -55vh, 0) rotate(16deg) scale(1); }
  85% { opacity: .5; }
  100% { transform: translate3d(-18px, -115vh, 0) rotate(-18deg) scale(.8); opacity: 0; }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scene-enter {
  from { opacity: 0; filter: blur(8px); }
  to { opacity: 1; filter: blur(0); }
}

@keyframes shine {
  0% { background-position: 100% center; }
  100% { background-position: -120% center; }
}

@keyframes aurora {
  from { opacity: .6; transform: translate(-50%, -50%) scale(.88); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
}

@media (max-height: 720px) {
  .love-scene { padding-top: 28px; padding-bottom: 40px; }
  .heart-stage { width: clamp(120px, 25vh, 190px); margin-top: 0; }
  .main-heart { font-size: clamp(90px, 17vh, 125px); }
  .title-line { font-size: clamp(48px, 10vh, 72px); }
  .love-message { margin-top: 16px; font-size: 19px; }
  .love-button { margin-top: 17px; }
  .signature { bottom: -43px; }
}

@media (max-width: 430px) {
  .pre-title { font-size: 8px; letter-spacing: .25em; }
  .pre-title::before, .pre-title::after { width: 16px; }
  .love-message { max-width: 300px; }
  .love-button { font-size: 8px; padding: 0 20px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
`;

export default function App() {
  const [replay, setReplay] = useState(0);

  const replayScene = () => {
    setReplay((current) => current + 1);
  };

  return h(
    React.Fragment,
    null,
    h("style", null, styles),
    h(
      "main",
      { className: "love-scene", key: replay },
      h("div", { className: "aurora", "aria-hidden": true }),

      ...stars.map((star) =>
        h("span", {
          key: `star-${star.id}`,
          className: "star",
          "aria-hidden": true,
          style: {
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            "--delay": star.delay,
            "--duration": star.duration,
          } as CSSProperties,
        })
      ),

      ...floatingHearts.map((heart) =>
        h(
          "span",
          {
            key: `floating-${heart.id}`,
            className: "floating-heart",
            "aria-hidden": true,
            style: {
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            },
          },
          "♥"
        )
      ),

      h(
        "section",
        {
          className: "love-content",
          "aria-label": "Uma declaração de amor",
        },
        h("div", { className: "pre-title" }, "Uma mensagem do coração"),

        h(
          "div",
          { className: "heart-stage", "aria-hidden": true },
          h("div", { className: "heart-orbit orbit-two" }),
          h("div", { className: "heart-orbit" }),
          h("div", { className: "heart-glow" }),
          h("span", { className: "main-heart" }, "♥")
        ),

        h(
          "h1",
          { className: "title-line" },
          h("span", { className: "i-love" }, "Eu te"),
          h("span", { className: "you" }, "amo.")
        ),

        h(
          "p",
          { className: "love-message" },
          "Entre bilhões de flores, ",
          h("strong", null, "Você é a mais bela"),
          " e Unica de Todas."
        ),

        h(
          "button",
          {
            className: "love-button",
            onClick: replayScene,
            type: "button",
            "aria-label": "Rever a declaração de amor",
          },
          h("span", { className: "button-heart", "aria-hidden": true }, "♥"),
          "Quer ver de novo?",
          h("span", { "aria-hidden": true }, "↗")
        ),

        h("div", { className: "signature" }, "Feito com ", h("span", null, "♥"), " e infinito")
      ),

      h("div", { className: "bottom-note", "aria-hidden": true }, "Que Deus nos Abençoe")
    )
  );
}
