"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface PersonCardProps {
  name: string
  role: string
  bio: string
  imageSrc: string
  imagePosition?: string
  delay: number
}

function PersonCard({ name, role, bio, imageSrc, imagePosition = "center", delay }: PersonCardProps) {
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
          style={{ objectPosition: imagePosition }}
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
            name="Tu Nguyen"
            role="The Groom"
            bio="A passionate tattoo artist who turns skin into canvas. He pours his heart into every design and brings the same creativity and dedication to the ones he loves."
            imageSrc="/images/couple-groom.jpg"
            imagePosition="top"
            delay={0.2}
          />
          <PersonCard
            name="Nhan Tu"
            role="The Bride"
            bio="A dedicated healthcare professional who cares for others with warmth and compassion. She believes in nurturing both body and soul, and cherishes every moment with family."
            imageSrc="/images/couple-bride.jpg"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
