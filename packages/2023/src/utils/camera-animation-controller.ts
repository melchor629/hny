import { Controller, easings } from '@react-spring/web'
import type { OrthographicCamera } from 'three'

interface CameraAnimationProps {
  delay: number
  duration: number
  x: number
  y: number
  zoom: number
}

interface CameraUpdatableProps {
  x: number
  y: number
  top: number
  right: number
}

export default class CameraAnimationController {
  #controller
  #initialValues

  constructor(camera: OrthographicCamera) {
    this.#initialValues = {
      x: camera.position.x + camera.right / 2,
      y: -camera.position.y - camera.top / 2,
      right: camera.right,
      top: camera.top,
    }
    this.#controller = new Controller<CameraUpdatableProps>({
      ...this.#initialValues,

      config: {
        precision: 0.001,
        easing: easings.easeInOutCubic,
        duration: 500,
      },

      onChange({ value: { x, y, top, right } }) {
        camera.position.x = x - right / 2
        camera.position.y = -y - top / 2
        if (camera.top !== top || camera.right !== right) {
          camera.top = top
          camera.right = right
          camera.updateProjectionMatrix()
        }
      },
    })
  }

  async to({ delay, duration, ...props }: Partial<CameraAnimationProps>) {
    const updatableProps: Partial<CameraUpdatableProps> = {}
    if (props.x != null) {
      updatableProps.x = props.x
    }
    if (props.y != null) {
      updatableProps.y = props.y
    }
    if (props.zoom != null) {
      updatableProps.right = Math.round(this.#initialValues.right / props.zoom)
      updatableProps.top = Math.round(this.#initialValues.top / props.zoom)
    }

    await this.#controller.start({ delay, config: { duration }, ...updatableProps })
  }

  async reset(duration: number, delay?: number) {
    await this.#controller.start({ delay, config: { duration }, ...this.#initialValues })
  }
}
