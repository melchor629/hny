import { useFrame, useThree } from '@react-three/fiber'
import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { NearestFilter } from 'three'
import {
  cleaningUpTheMessDialog,
  endingDialog,
  endingPhotoGrabbedDialog,
  herTablePostEndingDialog,
  myTablePostEndingDialog,
  postCleanedDialog,
  tHanksDialog,
} from '../data/dialogs/ending'
import {
  dungeonTimeDialog,
  fuckTheGameDialog,
  herTableDialog,
  introDialog,
  myTableDialog,
  nextTableMessDialog,
  startAdventureDialog,
  tutorialDialog,
} from '../data/dialogs/intro'
import useAcademiaRoomState from '../hooks/use-academia-room-state'
import { useTexture } from '../hooks/use-asset'
import useDialog from '../hooks/use-dialog'
import useInput from '../hooks/use-input'
import useInventory from '../hooks/use-inventory'
import usePlayerRef from '../hooks/use-player-ref'
import useScenario from '../hooks/use-scenario'
import Map from '../objects/map'
import MapTrigger from '../objects/map-trigger'
import Photo from '../objects/props/photo'
import Shelf from '../objects/props/shelf'
import Table from '../objects/props/table'
import { ScenarioProps } from '../types/scenario'
import CameraAnimationController from '../utils/camera-animation-controller'
import wait from '../utils/wait'

function AcademiaRoomScenario({ onMapUpdate }: ScenarioProps) {
  const camera = useThree((s) => s.camera)
  const playerRef = usePlayerRef()
  const { previousScenario, isLoading, loaded } = useScenario()
  const { dungeonOpen, finalPhoto, intro, ending } = useAcademiaRoomState()
  const finalPhotoGrabbed = useInventory(
    useCallback((s) => s.book.find((p) => p.id === 'photo-21')!.discovered, []),
  )
  const fakeInput = useInput('nothing')

  const toDungeon = useCallback((dir: string) => {
    if (dir !== 'bottom') {
      return
    }
    useScenario.getState().change('dungeon')
  }, [])

  const fuckTheGame = useCallback(() => {
    useDialog.getState().reset(fuckTheGameDialog)
  }, [])

  const myTable = useCallback(() => {
    useDialog.getState().reset(!ending ? myTableDialog : myTablePostEndingDialog)
  }, [ending])

  const herTable = useCallback(() => {
    useDialog.getState().reset(!ending ? herTableDialog : herTablePostEndingDialog)
  }, [ending])

  const openDungeon = useCallback(() => {
    useAcademiaRoomState.getState().openDungeon()
  }, [])

  useEffect(() => {
    if (!ending && finalPhotoGrabbed) {
      ;(async () => {
        const animController = new CameraAnimationController(camera as any)

        fakeInput.focus()
        await wait(500)

        playerRef.current!.dir = 'down'
        await animController.to({ duration: 500, zoom: 2 })
        await useDialog.getState().reset(endingPhotoGrabbedDialog)
        fakeInput.focus()

        playerRef.current!.position.set(90, -69, 0)
        playerRef.current!.dir = 'up'
        playerRef.current!.updateMatrixWorld()
        await animController.to({ duration: 1000, x: 90, y: 69, zoom: 2.3 })
        await useDialog.getState().reset(cleaningUpTheMessDialog)
        fakeInput.focus()

        playerRef.current!.dir = 'up-left'
        await wait(500)
        playerRef.current!.dir = 'up-right'
        await wait(500)
        playerRef.current!.dir = 'up'
        await wait(1000)
        playerRef.current!.dir = 'up-right'
        await wait(500)
        playerRef.current!.dir = 'up-left'
        await wait(500)
        playerRef.current!.dir = 'up'
        useAcademiaRoomState.getState().endingDone()
        await wait(250)

        await useDialog.getState().reset(postCleanedDialog)
        fakeInput.focus()

        playerRef.current!.position.set(65, -75, 0)
        playerRef.current!.dir = 'down'
        playerRef.current!.updateMatrixWorld()
        await animController.to({ duration: 1000, x: 65, y: 75, zoom: 1.5 })
        await useDialog.getState().reset(endingDialog)
        fakeInput.focus()

        await animController.to({ duration: 1500, zoom: 1 })
        playerRef.current!.moveTo(65, 75)
        await useDialog.getState().reset(tHanksDialog)
      })()
    }
  }, [finalPhotoGrabbed, ending])

  useFrame(() => {
    if (!isLoading('academia-room')) {
      return
    }

    loaded()
    if (previousScenario === 'dungeon') {
      playerRef.current?.moveTo(128 + 94, 96)
      playerRef.current!.dir = 'down'
    } else if (!intro) {
      if (playerRef.current) {
        playerRef.current.moveTo(50, 69)
        playerRef.current.dir = 'up'
      }
      fakeInput.focus()
      ;(async () => {
        await wait(1)
        const animController = new CameraAnimationController(camera as any)

        await animController.to({
          delay: 20,
          duration: 10,
          x: 50,
          y: 68,
          zoom: 2,
        })

        fakeInput.focus()
        await wait(1000)
        fakeInput.focus()
        await wait(1000)
        await useDialog.getState().reset(introDialog)
        fakeInput.focus()

        playerRef.current!.dir = 'right'
        await animController.to({
          delay: 1000,
          duration: 750,
          x: 80,
          zoom: 3.5,
        })

        await wait(500)
        await useDialog.getState().reset(nextTableMessDialog)
        fakeInput.focus()

        playerRef.current!.dir = 'up'
        await animController.to({
          delay: 500,
          duration: 750,
          x: 50,
        })

        await wait(500)
        await useDialog.getState().reset(startAdventureDialog)
        fakeInput.focus()

        playerRef.current!.dir = 'down'
        await animController.to({
          delay: 500,
          duration: 750,
          zoom: 1.5,
          y: 100,
        })

        await wait(1000)
        playerRef.current!.dir = 'down-right'
        await wait(500)

        await useDialog.getState().reset(dungeonTimeDialog)
        fakeInput.focus()

        await animController.to({
          delay: 500,
          duration: 1000,
          x: 50,
          y: 68,
          zoom: 1,
        })
        useAcademiaRoomState.getState().introDone()
        playerRef.current!.dir = 'down'

        if (await useDialog.getState().reset(tutorialDialog)) {
          useInventory.getState().open('controls')
        }
      })()
    } else {
      playerRef.current?.moveTo(70, 90)
      playerRef.current!.dir = 'down'
    }
  })

  useEffect(() => {
    document.querySelector<HTMLDivElement>('#app')!.style.backgroundColor = 'lightsteelblue'
  }, [])

  return (
    <Map onMapUpdate={onMapUpdate}>
      <LeMap />
      <LeCollision />

      <Shelf kind="books" x={0.65} y={1.87} onInteraction={fuckTheGame} />
      <Table kind="player" x={1.66} y={2.025} onInteraction={myTable} />
      <Table
        kind={ending ? 'schoolMateFixed' : 'schoolMate'}
        x={2.76}
        y={2.025}
        onInteraction={herTable}
      />

      <Shelf kind="side" x={3.75} y={1.95} />
      <Shelf kind="side" x={3.75} y={2.25} />
      <Shelf kind="side" x={3.75} y={2.55} />
      <Shelf kind="side" x={3.75} y={2.85} />
      <Shelf kind="side" x={3.75} y={3.15} />
      {!dungeonOpen && <Shelf kind="side" x={3.75} y={3.45} onInteraction={openDungeon} />}
      {dungeonOpen && <Shelf kind="empty" x={4.06} y={3.4} />}

      <Table kind="empty2" x={1.66} y={3.575} />
      <Table kind="empty2" x={2.76} y={3.575} />

      <Shelf kind="side" x={0.25} y={2.55} flip />
      <Shelf kind="side" x={0.25} y={2.85} flip />

      {finalPhoto && <Photo alt={6} photoId="photo-21" x={2} y={3} />}

      <MapTrigger
        boundingBox={useMemo(() => ({ x1: 128 + 70, x2: 128 + 118, y1: 90, y2: 92 }), [])}
        onPlayerInside={toDungeon}
      />
    </Map>
  )
}

function LeCollision() {
  const mapUpdater = useContext(Map.Context)

  useEffect(() => {
    const fns = [
      mapUpdater({
        x: 0,
        y: 64,
        prop: {
          boundingBox: { x1: 0, x2: 128, y1: 1, y2: 2 },
          size: { w: 0, h: 0 },
          type: 'a',
        },
      }),
      mapUpdater({
        x: 0,
        y: 128,
        prop: {
          boundingBox: { x1: 0, x2: 256, y1: -1, y2: 0 },
          size: { w: 0, h: 0 },
          type: 'b',
        },
      }),
      mapUpdater({
        x: 0,
        y: 64,
        prop: {
          boundingBox: { x1: 4, x2: 5, y1: 0, y2: 64 },
          size: { w: 0, h: 0 },
          type: 'c',
        },
      }),
      mapUpdater({
        x: 128,
        y: 64,
        prop: {
          boundingBox: { x1: -4, x2: -5, y1: 0, y2: 50 },
          size: { w: 0, h: 0 },
          type: 'd',
        },
      }),
      mapUpdater({
        x: 128,
        y: 64,
        prop: {
          boundingBox: { x1: -4, x2: 70, y1: 49, y2: 50 },
          size: { w: 0, h: 0 },
          type: 'e',
        },
      }),
      mapUpdater({
        x: 198,
        y: 0,
        prop: {
          boundingBox: { x1: -1, x2: 0, y1: 0, y2: 112 },
          size: { w: 0, h: 0 },
          type: 'f',
        },
      }),
      mapUpdater({
        x: 247,
        y: 0,
        prop: {
          boundingBox: { x1: -1, x2: 0, y1: 0, y2: 128 },
          size: { w: 0, h: 0 },
          type: 'g',
        },
      }),
      mapUpdater({
        x: 198,
        y: 10,
        prop: {
          boundingBox: { x1: -1, x2: 48, y1: 0, y2: 1 },
          size: { w: 0, h: 0 },
          type: 'h',
        },
      }),
    ]

    return () => fns.forEach((fn) => fn())
  }, [])

  return null
}

function LeMap() {
  const meshRef = useRef<any>(null)
  const texture = useTexture('academia-room.png')!

  useEffect(() => {
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.needsUpdate = true
  }, [texture])

  useEffect(() => {
    meshRef.current.updateMatrixWorld()
  }, [])

  return (
    <mesh ref={meshRef} position={[128, -64, 0]}>
      <planeGeometry args={[256, 128]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

export default AcademiaRoomScenario
