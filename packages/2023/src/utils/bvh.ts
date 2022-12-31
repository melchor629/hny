import type { Box2 } from 'three'
import { Vector2 } from 'three'

type ObjectWithBoundingBox<T = {}> = T & { readonly boundingBox: Box2 }

const enum Ordering {
  less = -1,
  greater = 1,
  equal = 0,
}

const boxCompare = (a: ObjectWithBoundingBox, b: ObjectWithBoundingBox, axis: 'x' | 'y') => {
  const diff = a.boundingBox.min[axis] - b.boundingBox.min[axis]
  if (diff < 0) {
    return Ordering.less
  }

  if (diff > 0) {
    return Ordering.greater
  }

  return Ordering.equal
}

const boxXCompare = (a: ObjectWithBoundingBox, b: ObjectWithBoundingBox) => boxCompare(a, b, 'x')

const boxYCompare = (a: ObjectWithBoundingBox, b: ObjectWithBoundingBox) => boxCompare(a, b, 'y')

const intersectionTest = <T>(box: Box2, obj: ObjectWithBoundingBox<T> | BVH2<T>) => {
  if (obj instanceof BVH2) {
    return obj.intersectsBox(box)
  }

  return obj.boundingBox.intersectsBox(box) ? obj : null
}

const intersectionAllTest = <T>(box: Box2, obj: ObjectWithBoundingBox<T> | BVH2<T>) => {
  if (obj instanceof BVH2) {
    return obj.intersectsBoxAll(box)
  }

  return obj.boundingBox.intersectsBox(box) ? [obj] : []
}

const containsTest = <T>(point: Vector2, obj: ObjectWithBoundingBox<T> | BVH2<T>) => {
  if (obj instanceof BVH2) {
    return obj.containsPoint(point)
  }

  return obj.boundingBox.containsPoint(point) ? obj : null
}

const sortByDistance =
  <T>(center: Vector2) =>
  (a: ObjectWithBoundingBox<T>, b: ObjectWithBoundingBox<T>) =>
    a.boundingBox.distanceToPoint(center) - b.boundingBox.distanceToPoint(center)

export default class BVH2<T = {}> implements ObjectWithBoundingBox<BVH2<T>> {
  #aabb!: Box2
  #left!: ObjectWithBoundingBox<T> | BVH2<T>
  #right!: ObjectWithBoundingBox<T> | BVH2<T>
  #vec2!: Vector2

  constructor(objects?: ObjectWithBoundingBox<T>[]) {
    if (!objects) {
      return
    }

    const comparator = [boxXCompare, boxYCompare][Math.floor(Math.random() * 2)]

    let left, right
    if (objects.length === 1) {
      left = right = objects[0]
    } else if (objects.length === 2) {
      if (comparator(objects[0], objects[1]) === Ordering.less) {
        ;[left, right] = objects
      } else {
        ;[right, left] = objects
      }
    } else {
      const sorted = [...objects].sort(comparator)
      left = new BVH2(sorted.slice(0, sorted.length / 2))
      right = new BVH2(sorted.slice(sorted.length / 2))
    }

    this.#aabb = left.boundingBox.clone().union(right.boundingBox)
    this.#left = left
    this.#right = right
    this.#vec2 = new Vector2()
  }

  static async buildAsync<T = {}>(objects: ObjectWithBoundingBox<T>[]) {
    const bvh = new BVH2<T>()
    const comparator = [boxXCompare, boxYCompare][Math.floor(Math.random() * 2)]

    let left, right
    if (objects.length === 1) {
      left = right = objects[0]
    } else if (objects.length === 2) {
      if (comparator(objects[0], objects[1]) === Ordering.less) {
        ;[left, right] = objects
      } else {
        ;[right, left] = objects
      }
    } else {
      const sorted = [...objects].sort(comparator)
      left = await BVH2.buildAsync(sorted.slice(0, sorted.length / 2))
      right = await BVH2.buildAsync(sorted.slice(sorted.length / 2))
    }

    bvh.#aabb = left.boundingBox.clone().union(right.boundingBox)
    bvh.#left = left
    bvh.#right = right
    bvh.#vec2 = new Vector2()

    return bvh
  }

  get boundingBox() {
    return this.#aabb
  }

  containsPoint(point: Vector2): ObjectWithBoundingBox<T> | null {
    if (this.#aabb.containsPoint(point)) {
      return containsTest(point, this.#left) || containsTest(point, this.#right)
    }

    return null
  }

  intersectsBox(box: Box2): ObjectWithBoundingBox<T> | null {
    if (this.#aabb.intersectsBox(box)) {
      return intersectionTest(box, this.#left) || intersectionTest(box, this.#right)
    }

    return null
  }

  intersectsBoxAll(box: Box2): ObjectWithBoundingBox<T>[] {
    if (this.#aabb.intersectsBox(box)) {
      return intersectionAllTest(box, this.#left)
        .concat(intersectionAllTest(box, this.#right))
        .sort(sortByDistance(box.getCenter(this.#vec2)))
    }

    return []
  }
}
