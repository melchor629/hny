import yaml from 'js-yaml'
import { FileLoader, Loader } from 'three'

export default class YamlLoader extends Loader {
  load(url, onLoad, onProgress, onError) {
    // adapted from AudioLoader
    const loader = new FileLoader(this.manager)
    loader.setResponseType('text')
    loader.setPath(this.path)
    loader.setRequestHeader(this.requestHeader)
    loader.setWithCredentials(this.withCredentials)
    loader.load(
      url,
      (text) => {
        try {
          onLoad(yaml.load(text))
        } catch (e) {
          if (onError) {
            onError(e)
          }

          this.manager.itemError(url)
        }
      },
      onProgress,
      onError,
    )
  }
}
