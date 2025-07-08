import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="hero-gradient py-20 text-center">
      <div className="max-w-3xl mx-auto space-y-6 px-4">
        <Image
          src="/matt.hat.jpg"
          alt="Matt Bernier"
          width={128}
          height={128}
          className="rounded-full mx-auto border-4 border-white shadow-md"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-graphite-800">
          Fractional Product Management &{' '}
          <span className="text-gradient">Technical Consulting</span>
        </h1>
        <p className="text-xl text-graphite-600">
          Product Management Leader, Developer, writer, and creator. I help companies build better products through strategic product management and technical expertise.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/services">Explore Services</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 