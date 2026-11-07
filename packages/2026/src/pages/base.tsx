import type { ComponentPropsWithRef, PropsWithChildren } from 'react'

export default function BasePage({
  children,
  className,
  ref,
  ...props
}: PropsWithChildren<ComponentPropsWithRef<'div'>>) {
  return (
    <div
      {...props}
      className={`relative flex h-lvh flex-col items-center justify-start p-8 text-center select-none ${className || ''}`}
      ref={ref}
    >
      {children}
    </div>
  )
}
