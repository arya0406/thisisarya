'use client';

import FluidCursor from '@/components/FluidCursor';
import { GithubButton } from '@/components/ui/github-button';
import { ThemeToggle } from '@/components/theme-toggle';
import WelcomeModal from '@/components/welcome-modal';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* ---------- component ---------- */
export default function Home() {
  /* hero animations */
  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8 },
    },
  };
  
  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'ease', duration: 0.8, delay: 0.2 },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      {/* big blurred footer word */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] leading-none font-black text-transparent select-none sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Arya Shah
        </div>
      </div>

      {/* GitHub button and Theme Toggle */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-3">
        <ThemeToggle />
        <GithubButton
          //targetStars={68}
          animationDuration={1.5}
          label="Star"
          size={'sm'}
          repoUrl="https://github.com/toukoum/portfolio"
        />
      </div>

      {/* header */}
      <motion.div
        className="z-1 mt-24 mb-2 flex flex-col items-center text-center md:mt-4 md:mb-4"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="z-100">
          <WelcomeModal />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Namaste , I'm Arya🙏🏼
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
         Making it happen.        </h1>
      </motion.div>

      {/* centre memoji */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-52 w-48 overflow-hidden sm:h-72 sm:w-72 mb-8"
      >
        <Image
          src="/landing-memojis2.png"
          alt="Hero memoji"
          width={2000}
          height={2000}
          priority
          className="translate-y-14 scale-[2] object-cover"
        />
      </motion.div>

      <FluidCursor />
    </div>
  );
}
