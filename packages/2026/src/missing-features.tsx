export default function MissingFeatures() {
  const supportsAnimationTimelineView = CSS.supports('animation-timeline', 'view()')

  return (
    <>
      {!supportsAnimationTimelineView && (
        <div className="animate-notification fixed top-3 left-4 max-w-52 rounded-lg border-slate-600 bg-slate-900/80 px-3 py-2 backdrop-blur-sm">
          Tu navegador no soporta una funcionalidad opcional de esta web. Prueba con otro navegador,
          si quieres la experiencia completa...
        </div>
      )}
    </>
  )
}
