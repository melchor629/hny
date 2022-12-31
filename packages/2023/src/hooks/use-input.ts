import { useContext, useMemo } from 'react'
import { context } from '../ui/input/input-handler'
import type { Focus, InputHandlerScoped } from '../ui/input/types'

function useInput(focus: Focus): InputHandlerScoped<undefined>
function useInput(): InputHandlerScoped<Focus>

function useInput(focus?: Focus) {
  const value = useContext(context)
  if (value == null) {
    throw new Error('The hook must be used in a component under the <InputHandler /> component')
  }

  return useMemo(() => (focus ? value.forFocus(focus) : value.forGlobal()), [focus])
}

export default useInput
