import AnimatedBadge from '@/components/AnimatedBadge'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import AnimationCards from '@/showcase/ui-group/AnimationCards'
import BlockCards from '@/showcase/ui-group/BlockCards'
import ComponentCards from '@/showcase/ui-group/ComponentCards'
import EffectCards from '@/showcase/ui-group/EffectCards'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-between text-center">
        <Header />
        <div className="my-[8rem] flex h-full flex-col items-center justify-center gap-4 px-3">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <AnimatedBadge />
            <Image
              src="/images/syntaxUI.svg"
              alt="SyntaxUI"
              className="mb-4 h-16 w-16 rounded-lg"
              width={100}
              height={100}
            />
            <h1 className="max-w-lg text-3xl font-bold tracking-tight md:max-w-2xl md:text-5xl">
              Stop coding from scratch. Build faster. Launch sooner.
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Free-to-use UI elements designed for rapid development.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/components">
              <Button className="bg-red-500 hover:bg-red-500/90 dark:bg-red-500 dark:text-white dark:hover:bg-red-500/90">
                Get Started
              </Button>
            </Link>
            <Link
              href="https://pro.syntaxui.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant={'outline'} className="gap-1">
                Get SyntaxUI Pro
              </Button>
            </Link>
          </div>
        </div>
        {/* UI Elements */}
        <div className="mb-12 flex w-full max-w-7xl flex-col gap-8 px-3">
          <div>
            <div className="mb-4 text-left text-lg font-semibold tracking-tight">
              Components
            </div>
            <ComponentCards />
          </div>
          <div>
            <div className="mb-4 text-left text-lg font-semibold tracking-tight">
              Blocks
            </div>
            <BlockCards />
          </div>
          <div>
            <div className="mb-4 text-left text-lg font-semibold tracking-tight">
              Animations
            </div>
            <AnimationCards />
          </div>
          <div>
            <div className="mb-4 w-full text-left text-lg font-semibold">
              Effects
            </div>
            <EffectCards />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
