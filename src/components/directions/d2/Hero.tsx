import { LiveToast, PEOPLE } from "@/components/mocks/parts";
import { PhoneFrame } from "@/components/mocks/PhoneFrame";
import { BoardScreen, ListScreen, WalletScreen } from "@/components/mocks/screens";
import { StoreBadges } from "@/components/site/StoreBadges";
import { HIGHLIGHTS } from "@/content/site";

import { Nav, Proof } from "../shared";
import styles from "./d2.module.css";
import { Fireflies, Zoom } from "./ui";

/** Three stage lights on the rig, angled in towards the phones. */
const BEAMS = [
  { className: "left-[18%] -rotate-[22deg] hidden md:block", delay: "0s" },
  { className: "left-1/2", delay: "-3.5s" },
  { className: "left-[82%] rotate-[22deg] hidden md:block", delay: "-7s" },
];

/** The forest at night, three phones lit like products on a stage. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,#24524a_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {BEAMS.map((beam) => (
          <div key={beam.className} className={`absolute -top-[4%] h-[110%] w-[560px] -translate-x-1/2 origin-top blur-2xl ${beam.className}`}>
            <div
              className={`${styles.sway} size-full bg-[linear-gradient(to_bottom,rgba(214,255,170,0.13),transparent_85%)] [clip-path:polygon(45%_0,55%_0,100%_100%,0_100%)]`}
              style={{ animationDelay: beam.delay }}
            />
          </div>
        ))}
      </div>
      <div className="dir-glow pointer-events-none absolute top-[52%] left-1/2 size-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,195,64,0.22),transparent_60%)]" />
      <Fireflies count={30} />
      <Nav tone="dark" />

      <div className="relative mx-auto max-w-4xl px-6 pt-14 text-center lg:pt-16">
        <p className="dir-rise font-hand text-3xl text-lime-bright">Shopping, sorted.</p>
        <h1 className="dir-rise dir-delay-1 mt-3 font-display text-5xl leading-[0.98] tracking-tight text-label sm:text-6xl lg:text-7xl">
          Everything for the shop.
          <br />
          <span className="text-lime-bright [text-shadow:0_0_50px_rgba(165,224,99,0.35)]">In one app.</span>
        </h1>
        <p className="dir-rise dir-delay-2 mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mist/75">
          Lists you share with the whole household, ticked off live. Boyfriend Mode when someone else is shopping. And
          every loyalty card, bright and ready at the till.
        </p>
        <div className="dir-rise dir-delay-3 mt-9 flex flex-col items-center gap-7">
          <StoreBadges apple="white" height={52} center className="text-mist" />
          <Proof tone="dark" items={HIGHLIGHTS} />
        </div>
      </div>

      <div aria-hidden className="relative mx-auto mt-14 h-[540px] max-w-6xl sm:h-[620px] lg:mt-16 lg:h-[680px]">
        {/* the lit stage floor */}
        <div className="absolute bottom-[40px] left-1/2 h-[170px] w-[min(1100px,180%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(165,224,99,0.3),rgba(36,82,74,0.25)_60%,transparent)]" />
        <div className="absolute bottom-[124px] left-1/2 h-px w-[min(860px,90%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-lime-bright/40 to-transparent" />

        <div className={`${styles.rise} absolute top-20 -left-[118px] sm:top-16 sm:left-[2%] lg:left-[9%]`} style={{ animationDelay: "0.5s" }}>
          <div className="-rotate-[9deg]">
            <Zoom z={0.8}>
              <PhoneFrame scale={0.58}>
                <ListScreen />
              </PhoneFrame>
            </Zoom>
            <p className="mt-5 hidden text-center text-sm font-semibold text-mist/70 sm:block">Lists</p>
          </div>
        </div>

        <div className={`${styles.rise} relative z-10 mx-auto w-fit`} style={{ animationDelay: "0.36s" }}>
          <div className="dir-float">
            <Zoom z={0.85}>
              <PhoneFrame scale={0.66}>
                <BoardScreen />
              </PhoneFrame>
            </Zoom>
          </div>
          <p className="mt-5 text-center text-sm font-semibold text-lime-bright">Boyfriend Mode</p>
        </div>

        <div className={`${styles.rise} absolute top-20 -right-[118px] sm:top-16 sm:right-[2%] lg:right-[9%]`} style={{ animationDelay: "0.7s" }}>
          <div className="rotate-[9deg]">
            <Zoom z={0.8}>
              <PhoneFrame scale={0.58}>
                <WalletScreen />
              </PhoneFrame>
            </Zoom>
            <p className="mt-5 hidden text-center text-sm font-semibold text-mist/70 sm:block">Loyalty cards</p>
          </div>
        </div>

        {/* a shared list ticking over, live */}
        <div className="absolute top-[40%] left-[1%] z-20 hidden lg:block xl:left-[3%]">
          <div className="dir-float-side">
            <LiveToast person={PEOPLE.sipho} action="ticked off" item="Milk" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-deep to-transparent" />
    </section>
  );
}
