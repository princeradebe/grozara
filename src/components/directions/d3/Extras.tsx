import { Icon } from "@/components/mocks/Icon";
import { EXTRAS } from "@/content/site";

import styles from "./d3.module.css";
import { Kicker, Polaroid, withSquiggle } from "./scrap";

const PHOTOS = ["#DDF0C8", "#FFE7A3", "#FFD6DE", "#D9DDFF"];
const TILTS = [-4, 3, -2, 5];

function Peg() {
  return (
    <span aria-hidden className="absolute -top-4 left-1/2 z-10 h-9 w-3.5 -translate-x-1/2 rounded-[3px] bg-gradient-to-r from-[#C99A62] via-[#E2BD8A] to-[#B8864E] shadow-[0_3px_4px_rgba(0,0,0,0.25)]">
      <span className="absolute inset-x-0 top-4 h-1 bg-[#8C8C8C]" />
    </span>
  );
}

/** The smaller features as polaroids pegged to a washing line, swaying out of step. */
export function Extras() {
  return (
    <section className="relative overflow-x-clip py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="dir-reveal max-w-2xl">
          <Kicker tone="blush" mark="✿">
            And there&rsquo;s more
          </Kicker>
          <h2 className="mt-6 font-display text-4xl leading-[1.02] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {withSquiggle("The small stuff, pegged up.", "pegged", "text-blush")}
          </h2>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <svg aria-hidden viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute top-0 -left-[4%] hidden h-12 w-[108%] text-forest/45 lg:block">
            <path d="M0 6 Q 500 58, 1000 6" fill="none" stroke="currentColor" strokeWidth={2} vectorEffect="non-scaling-stroke" />
          </svg>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
            {EXTRAS.map((extra, i) => (
              <li key={extra.title} className={`dir-reveal ${i === 1 || i === 2 ? "lg:mt-8" : "lg:mt-2"}`}>
                <div className={styles.swing} style={{ animationDelay: `${-i * 1.3}s` }}>
                  <div className="relative mx-auto max-w-[250px]">
                    <Peg />
                    <Polaroid
                      tilt={TILTS[i]}
                      caption={<h3 className="font-hand text-2xl leading-tight text-forest sm:text-[28px]">{extra.title}</h3>}
                      photoStyle={{ background: PHOTOS[i] }}
                    >
                      <span aria-hidden className="absolute inset-0 grid place-items-center">
                        <span className="grid size-[46%] place-items-center rounded-full bg-white/70 shadow-[0_10px_18px_-10px_rgba(24,54,49,0.45)]">
                          <Icon name={extra.icon} className="size-1/2 text-forest" />
                        </span>
                      </span>
                    </Polaroid>
                  </div>
                </div>
                <p className="mx-auto mt-5 max-w-[250px] text-[15px] leading-relaxed text-forest/75">{extra.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
