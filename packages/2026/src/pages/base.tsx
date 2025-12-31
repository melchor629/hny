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
      className={`relative h-lvh p-8 flex flex-col justify-start items-center select-none text-center ${className || ''}`}
      ref={ref}
    >
      {children}
    </div>
  )
}
