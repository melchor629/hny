import { MeshStandardMaterial } from 'three'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'

const loadDae = ({ scene }) =>
  new Promise((resolve, reject) =>
    new ColladaLoader().load(
      'untitled.dae',
      (collada) => {
        const [elTexto] = collada.scene.children
        elTexto.scale.set(5, 5, 5)
        elTexto.material = new MeshStandardMaterial()

        scene.add(elTexto)
        resolve()
      },
      null,
      reject,
    ),
  )

export default loadDae
