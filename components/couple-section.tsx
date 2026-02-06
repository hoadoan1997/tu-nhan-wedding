"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PersonCardProps {
  name: string
  role: string
  bio: string
  imageSrc: string
  delay: number
}

function PersonCard({ name, role, bio, imageSrc, delay }: PersonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center text-center max-w-md mx-auto"
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mb-6 border-4 border-silver shadow-xl">
        <Image
          src={imageSrc}
          alt={`${name} portrait`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 256px, 320px"
        />
      </div>
      <h3 className="font-script text-4xl md:text-5xl text-dusty-blue mb-2">
        {name}
      </h3>
      <p className="text-sm md:text-base text-slate-gray uppercase tracking-widest mb-4">
        {role}
      </p>
      <p className="font-body text-base md:text-lg text-dark-slate leading-relaxed">
        {bio}
      </p>
    </motion.div>
  )
}

export function CoupleSection() {
  return (
    <section id="couple" className="py-20 md:py-32 bg-cool-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-dusty-blue mb-4">
            The Couple
          </h2>
          <div className="w-24 h-1 bg-muted-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <PersonCard
            name="Nhan Tu"
            role="The Bride"
            bio="A creative soul who loves art, travel, and cherishing simple moments with family. She believes in true love and the value of walking through life together."
            imageSrc="/images/wedding-02.jpg"
            delay={0.2}
          />
          <PersonCard
            name="Tu Nguyen"
            role="The Groom"
            bio="A tech-savvy guy who loves sports and discovering new things. He treasures every moment and is always ready to go the extra mile for the one he loves."
            imageSrc="/images/wedding-03.jpg"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
