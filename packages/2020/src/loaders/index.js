import loadSounds from './sounds'
import loadCollada from './collada'

const load = async ({ audioObjects, listener, scene }) => {
  await Promise.all([loadCollada({ scene }), loadSounds({ audioObjects, listener })])
}

export default load
