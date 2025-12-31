import { lazy } from 'react'
import BasePage from './base'

const Page5Full = lazy(() => import('./page5-full'))

export default function Page5({ show }: { show: boolean }) {
  return <BasePage className="justify-center!">{show && <Page5Full />}</BasePage>
}
