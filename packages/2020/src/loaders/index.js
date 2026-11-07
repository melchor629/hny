import loadCollada from './collada'
import loadSounds from './sounds'

const load = async ({ audioObjects, listener, scene }) => {
  await Promise.all([loadCollada({ scene }), loadSounds({ audioObjects, listener })])
}

export default load
