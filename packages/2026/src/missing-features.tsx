export default function MissingFeatures() {
  const supportsAnimationTimelineView = CSS.supports('animation-timeline', 'view()')

  return (
    <>
      {!supportsAnimationTimelineView && (
        <div className="fixed top-3 left-4 px-3 py-2 rounded-lg bg-slate-900/80 border-slate-600 backdrop-blur-sm max-w-52 animate-notification">
          Tu navegador no soporta una funcionalidad opcional de esta web. Prueba con otro navegador,
          si quieres la experiencia completa...
        </div>
      )}
    </>
  )
}
