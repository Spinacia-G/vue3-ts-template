## Install Cesium

```bash
pnpm add cesium
```

1. Copy `cesium/Build/Cesium` from `node_modules` to the `public/Cesium` directory.
2. Change the version control symbol of `cesium` in the `package.json` file from
the default `^` to `~` to lock the version and prevent syntax compatibility
issues caused by automatic updates.

## Import Styles

In `main.ts`:
```ts
import 'cesium/Build/Cesium/Widgets/widgets.css'
```

## Configure Cesium Resource Path

In `main.ts`:
```ts
window.CESIUM_BASE_URL = `${import.meta.env.VITE_BASE}Cesium/`
```

It is recommended to use Vite environment variables for path concatenation to
ensure compatibility across environments.

## Install Vite Plugins for Externalizing Cesium

```bash
pnpm add vite-plugin-externals -D
pnpm add vite-plugin-html -D
```

in `vite.config.ts`:

```ts
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import VitePluginExternals from 'vite-plugin-externals'

export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      command === 'build' && VitePluginExternals({
        cesium: 'Cesium'
      }),
      command === 'build' && createHtmlPlugin({
        inject: {
          tags: [
            {
              injectTo: 'body',
              tag: 'script',
              attrs: {
                src: `${env.VITE_BASE}Cesium/Cesium.js`
              }
            }
          ]
        }
      })
    ]
  })
}
```

## Encapsulation of Cesium Map

1. In `/components/map/CesiumMap.vue`:
```vue
<script setup lang="ts">
import * as Cesium from 'cesium'

const props = defineProps({
  mapDom: {
    type: String,
    default: 'cesiumContainer',
  },
})

const emits = defineEmits(['updateViewer'])

let viewer: Cesium.Viewer | undefined

onMounted(() => {
  viewer = new Cesium.Viewer(props.mapDom!, {
    terrainProvider: new Cesium.EllipsoidTerrainProvider(),
    baseLayer: new Cesium.ImageryLayer(
      new Cesium.UrlTemplateImageryProvider({
        url:
          Cesium.buildModuleUrl(`${import.meta.env.VITE_SUB_DOMAIN}Cesium/Assets/Textures/NaturalEarthII`) +
          '/{z}/{x}/{reverseY}.jpg',
        tilingScheme: new Cesium.GeographicTilingScheme(),
        maximumLevel: 2
      })
    ),
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    contextOptions: {
      webgl: {
        alpha: true,
        depth: true,
        stencil: true,
        antialias: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: true
      }
    }
  })

  /* 加载地形 */
  Cesium.CesiumTerrainProvider.fromUrl(`${import.meta.env.VITE_ASSETS_API}/path-to-terrain`)
    .then(terrainProvider => {
      viewer.terrainProvider = terrainProvider
    })
    .catch(() => {
      ElMessage.error('地形资源加载失败！')
    })

  /* 加载影像底图 */
  const tdtToken = 'your-token'
  const tdtUrl = 'https://t{s}.tianditu.gov.cn/'
  const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
  const imgMap = new Cesium.UrlTemplateImageryProvider({
    url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + tdtToken,
    subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(imgMap)
  const annoMap = new Cesium.UrlTemplateImageryProvider({
    url: tdtUrl + 'DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + tdtToken,
    subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18
  })
  viewer.imageryLayers.addImageryProvider(annoMap)

  /* 隐藏logo */
  ;(viewer.cesiumWidget.creditContainer as HTMLElement).style.display = 'none'

  /* 开启地形深度检测 */
  viewer.scene.globe.depthTestAgainstTerrain = true

  /* 分辨率优化 */
  // @ts-ignore
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio
  }

  /* 抗锯齿优化 */
  // viewer.scene.postProcessStages.fxaa.enabled = true

  /* 监听地图加载状态 */
  const loadFunc = async () => {
    if (viewer.scene.globe.tilesLoaded) {
      viewer.scene.globe.tileLoadProgressEvent.removeEventListener(loadFunc)
      /* 返回 viewer 对象 */
      emits('updateViewer', viewer)
    }
  }
  viewer.scene.globe.tileLoadProgressEvent.addEventListener(loadFunc)

  /* 监听鼠标位置 */
  initMouseEvent()

  /* 监听相机变化 */
  cameraEvent()
  viewer.scene.postRender.addEventListener(cameraEvent)

  /* 广角 */
  // ;(viewer.camera.frustum as Cesium.PerspectiveFrustum).fov = Cesium.Math.toRadians(80)

  /* 移除默认双击事件 */
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

  /* 时间初始化 */
  // viewer.clock.currentTime = Cesium.JulianDate.fromDate(new Date('2024-06-01 09:00'), new Cesium.JulianDate())
})

onUnmounted(() => {
  if (handler) {
    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    handler.destroy()
    handler = undefined
  }
  if (viewer) {
    viewer.scene.postRender.removeEventListener(cameraEvent)
    viewer.destroy()
    viewer = undefined
    emits('updateViewer')
  }
})

let handler: Cesium.ScreenSpaceEventHandler | undefined
const longitude = ref<number>() // 鼠标位置经度
const latitude = ref<number>() // 鼠标位置纬度
const altitude = ref<number>() // 鼠标位置地形高度
const initMouseEvent = () => {
  handler = new Cesium.ScreenSpaceEventHandler(viewer!.scene.canvas)
  handler.setInputAction((evt: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
    const pos = viewer!.scene.pickPosition(evt.endPosition)
    if (pos) {
      const cartographic = Cesium.Cartographic.fromCartesian(pos)
      longitude.value = Cesium.Math.toDegrees(cartographic.longitude)
      latitude.value = Cesium.Math.toDegrees(cartographic.latitude)
      altitude.value = cartographic.height
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

const heading = ref<number>() // 相机heading
const pitch = ref<number>() // 相机pitch
const roll = ref<number>() // 相机roll
const cameraLon = ref<number>() // 相机经度
const cameraLat = ref<number>() // 相机纬度
const cameraHeight = ref<number>() // 相机大地高
const cameraTerrainHeight = ref<number>() // 相机地形高度
const cameraEvent = () => {
  heading.value = Cesium.Math.toDegrees(viewer.camera.heading)
  pitch.value = Cesium.Math.toDegrees(viewer.camera.pitch)
  roll.value = Cesium.Math.toDegrees(viewer.camera.roll)
  const cart = Cesium.Cartographic.fromCartesian(viewer.camera.positionWC)
  cameraHeight.value = cart.height
  cameraLon.value = Cesium.Math.toDegrees(cart.longitude)
  cameraLat.value = Cesium.Math.toDegrees(cart.latitude)
  cameraTerrainHeight.value = cart.height - (viewer.scene.globe.getHeight(cart) || 0)
}
</script>

<template>
  <div class="relative size-full">
    <div class="size-full" :id="mapDom" />
    <div
      class="absolute right-0 bottom-0 flex flex-row items-center text-indigo-100 text-xs font-mono pointer-events-none *:whitespace-nowrap"
    >
      <div>
        Cursor:
        {{
        `${longitude?.toFixed(7) || '-'}°, ${latitude?.toFixed(7) || '-'}°, ${altitude?.toFixed(2) || '-'}m`
        }}
      </div>
      <div>
        Camera:
        {{
        `${cameraLat?.toFixed(7) || '-'}°, ${cameraLon?.toFixed(7) || '-'}°, ${cameraHeight?.toFixed(2) || '-'}m/${cameraTerrainHeight?.toFixed(2) || '-'}m`
        }}
      </div>
      <div>
        HPR:
        {{
        `${heading?.toFixed(2) || '-'}°, ${pitch?.toFixed(2) || '-'}°, ${roll?.toFixed(2) || '-'}°`
        }}
      </div>
    </div>
  </div>
</template>
```

2. Usage in template:

```vue
<template>
  <div>
    <!-- Other Components -->

    <!-- Map | Must in the last -->
    <cesium-map @update-viewer="updateViewer" />
  </div>
</template>
<script setup lang="ts">
  import * as Cesium from 'cesium'
  const updateViewer = (viewer: Cesium.Viewer | undefined) => {}
</script>
```
