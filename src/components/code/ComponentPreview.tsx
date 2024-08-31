'use client'

import Code, { RawCode } from '@/components/code/Code'
import { Icons } from '@/components/icons/Icons'
import AnimatedTabs from '@/components/reusable/AnimatedTabs'
import { cn } from '@/lib/utils'
import { Code as CodeIcon, Eye } from 'lucide-react'
import * as React from 'react'
import { CopyButton } from './CopyButton'
import TailwindCSS from '../Logos/Tailwind'
import FramerLogo from '../Logos/Framer'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import CodeGroup from './CodeGroup'

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  path: string
  align?: 'center' | 'start' | 'end'
  preview?: React.ReactNode
  usingFramer?: boolean
  usingCn?: boolean
}

const formatName = (path: string) => {
  const parts = path.split('/')
  const componentName = parts[parts.length - 1]
  return componentName.replace(/([a-z])([A-Z])/g, '$1 $2')
}

/**
 * ComponentPreview renders a component preview with a preview and code tab.
 *
 * @param {string} path - The path to the component relative to `src/showcase`.
 * Example: "components/button/3DButton"
 * @param {boolean} usingFramer - Whether the component is using Framer Motion.
 * @param {boolean} usingCn - Whether the component is using the `cn` function.
 * @param {React.ReactNode} preview - optional preview to render a component directly instead of using path.
 *
 * Usage with path: `<ComponentPreview path="components/button/3DButton" />`
 *
 * Usage with preview: `<ComponentPreview path="components/button/3DButton" preview={<3DButton />} />`
 */

export function ComponentPreview({
  path,
  className,
  align = 'center',
  preview,
  usingFramer,
  usingCn,
  ...props
}: ComponentPreviewProps) {
  const name = formatName(path)

  const Preview = React.useMemo(() => {
    if (preview) return preview

    try {
      const Component = require(`../../showcase/${path}.tsx`).default
      return <Component />
    } catch (error) {
      console.error(`Failed to load component ${path}:`, error)
      return (
        <p className="text-muted-foreground text-sm">
          Component{' '}
          <RawCode className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {path}
          </RawCode>{' '}
          not found.
        </p>
      )
    }
  }, [path, preview])

  const codeString = React.useMemo(() => {
    try {
      const code = require(`!!raw-loader!../../showcase/${path}.tsx`).default
      const filteredCode = code.replace(/'use client'\n/, '')
      return filteredCode
    } catch (error) {
      console.error(`Failed to load code for component ${path}:`, error)
      return null
    }
  }, [path])

  const [selectedTab, setSelectedTab] = React.useState('preview')

  if (usingCn) {
    return (
      <ComponentPreviewUsingCn
        path={path}
        className={className}
        align={align}
        preview={preview}
        usingFramer={usingFramer}
        {...props}
      />
    )
  }
  return (
    <div
      className={cn(
        'group relative my-10 flex w-full lg:max-w-5xl xl:max-w-7xl flex-col space-y-2 ',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full items-center justify-between gap-2  md:justify-start">
          <h2 className="text-md m-0 font-medium text-gray-800 dark:text-gray-200">
            {name}
          </h2>
          <div className="flex items-center justify-center gap-x-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <TailwindCSS />
                </TooltipTrigger>
                <TooltipContent className="m-0 p-0 text-sm">
                  <p className="m-0 p-1">
                    This component requires{' '}
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href="https://tailwindcss.com/"
                      className="text-red-500 no-underline hover:text-red-500"
                    >
                      Tailwind CSS
                    </Link>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {usingFramer && (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <FramerLogo className="text-black dark:text-white" />
                  </TooltipTrigger>
                  <TooltipContent className="m-0 p-0 text-sm">
                    <p className="m-0 p-1">
                      This component requires{' '}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.framer.com/motion/"
                        className="text-red-500 no-underline hover:text-red-500"
                      >
                        Framer Motion
                      </Link>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <AnimatedTabs
          tabs={['preview', 'code']}
          selected={selectedTab}
          setSelected={setSelectedTab}
          customID={path}
          icons={[Eye, CodeIcon]}
        />
      </div>
      {selectedTab === 'preview' && (
        <div className="relative overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
          <CopyButton value={codeString} />
          <div className=' w-full '>
            <div
              className={cn(
                'preview flex min-h-[250px] w-full justify-center overflow-hidden p-10 ',
                {
                  'items-center': align === 'center',
                  'items-start': align === 'start',
                  'items-end': align === 'end',
                },
              )}
            >
              <React.Suspense
                fallback={
                  <div className="text-muted-foreground flex items-center text-sm">
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </div>
        </div>
      )}
      {selectedTab === 'code' && (
        <div className="relative w-full">
          <Code language="tsx" code={codeString} />
        </div>
      )}
    </div>
  )
}

function ComponentPreviewUsingCn({
  path,
  className,
  align = 'center',
  preview,
  usingFramer,
  ...props
}: Omit<ComponentPreviewProps, 'usingCn'>) {
  const name = formatName(path)
  const nameWithoutSpace = name.replace(/\s/g, '')

  const Preview = React.useMemo(() => {
    if (preview) return preview

    try {
      const Component = require(`../../showcase/${path}.tsx`).default
      return <Component />
    } catch (error) {
      console.error(`Failed to load component ${path}:`, error)
      return (
        <p className="text-muted-foreground text-sm">
          Component{' '}
          <RawCode className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {path}
          </RawCode>{' '}
          not found.
        </p>
      )
    }
  }, [path, preview])

  const codeString = React.useMemo(() => {
    try {
      const code = require(`!!raw-loader!../../showcase/${path}.tsx`).default
      const filteredCode = code.replace(/'use client'\n/, '')
      return filteredCode
    } catch (error) {
      console.error(`Failed to load code for component ${path}:`, error)
      return null
    }
  }, [path])
  const cnString = React.useMemo(() => {
    try {
      return require(`!!raw-loader!../../lib/utils.ts`).default
    } catch (error) {
      console.error(`Failed to load code for the cn function:`, error)
      return null
    }
  }, [])

  return (
    <div
      className={cn(
        'group relative my-10 flex w-full lg:max-w-5xl xl:max-w-7xl flex-col space-y-2',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div className="flex w-full items-center justify-between gap-2  md:justify-start">
          <h2 className="text-md m-0 font-medium text-gray-800  dark:text-gray-200">
            {name}
          </h2>
          <div className="flex items-center justify-center gap-x-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <TailwindCSS />
                </TooltipTrigger>
                <TooltipContent className="m-0 p-0 text-sm">
                  <p className="m-0 p-1">
                    This component requires{' '}
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href="https://tailwindcss.com/"
                      className="text-red-500 no-underline hover:text-red-500"
                    >
                      Tailwind CSS
                    </Link>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {usingFramer && (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <FramerLogo className="text-black dark:text-white" />
                  </TooltipTrigger>
                  <TooltipContent className="m-0 p-0 text-sm">
                    <p className="m-0 p-1">
                      This component requires{' '}
                      <Link
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.framer.com/motion/"
                        className="text-red-500 no-underline hover:text-red-500"
                      >
                        Framer Motion
                      </Link>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
      <div className="relative rounded-md border border-gray-200 dark:border-gray-700">
        <div>
          <div
            className={cn(
              'preview flex min-h-[250px] w-full justify-center overflow-hidden p-10',
              {
                'items-center': align === 'center',
                'items-start': align === 'start',
                'items-end': align === 'end',
              },
            )}
          >
            <React.Suspense
              fallback={
                <div className="text-muted-foreground flex items-center text-sm">
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <p className="text-md -mb-6">
          <span className="font-semibold">Step 1:</span> Install dependencies
        </p>
        <CodeGroup noExpand>
          <Code
            language="bash"
            code={`npm i clsx tailwind-merge${usingFramer ? ' framer-motion' : ''}`}
          />
        </CodeGroup>
        <p className="text-medium -mb-6">
          <span className="font-semibold">Step 2:</span> Add util file
        </p>
        <CodeGroup title="lib/utils.ts" noExpand>
          <RawCode className="tsx">{cnString}</RawCode>
        </CodeGroup>
        <p className="text-medium -mb-6">
          <span className="font-semibold">Step 3:</span> Copy the source code
        </p>
        <CodeGroup title={`${nameWithoutSpace}.tsx`} noExpand>
          <Code language="tsx" code={codeString} />
        </CodeGroup>
      </div>
    </div>
  )
}
