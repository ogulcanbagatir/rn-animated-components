import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from "react"
import { Dimensions, InteractionManager, View } from "react-native"
import {
  Canvas,
  ImageShader,
  Skia,
  Shader,
  useImage,
  Fill,
  makeImageFromView
} from "@shopify/react-native-skia"
import { useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"

const { width, height } = Dimensions.get("screen")

const pageCurlShader = `
  uniform shader fromImg;
  uniform shader toImg;
  uniform float2 resolution;
  uniform float progress;
  uniform float topFlag;   // 1.0: top, 0.0: bottom

  const float MIN_AMOUNT = -0.26;
  const float MAX_AMOUNT = 1.15;
  const float PI = 3.141592653589793;
  const float scale = 512.0;
  const float sharpness = 3.0;

  // ayna yardımcıları
  float2 mapUV(float2 uv){ return (topFlag < 0.5) ? float2(uv.x, 1.0 - uv.y) : uv; }
  float2 geomUV(float2 uv){ return (topFlag < 0.5) ? float2(uv.x, 1.0 - uv.y) : uv; }

  float4 getFromColor(float2 p){ return fromImg.eval(mapUV(p) * resolution); }
  float4 getToColor  (float2 p){ return toImg.eval  (mapUV(p) * resolution); }

  float3 hitPoint(float hitAngle, float yc, float3 point, float3x3 rrotation){
    float hit = hitAngle / (2.0 * PI);
    point.y = hit;
    return float3(rrotation * point);
  }

  float4 antiAlias(float4 c1, float4 c2, float distanc){
    distanc *= scale;
    if (distanc < 0.0) return c2;
    if (distanc > 2.0) return c1;
    float dd = pow(1.0 - distanc / 2.0, sharpness);
    return ((c2 - c1) * dd) + c1;
  }

  float distanceToEdge(float3 point){
    float dx = abs(point.x > 0.5 ? 1.0 - point.x : point.x);
    float dy = abs(point.y > 0.5 ? 1.0 - point.y : point.y);
    if (point.x < 0.0) dx = -point.x;
    if (point.x > 1.0) dx = point.x - 1.0;
    if (point.y < 0.0) dy = -point.y;
    if (point.y > 1.0) dy = point.y - 1.0;
    if ((point.x < 0.0 || point.x > 1.0) && (point.y < 0.0 || point.y > 1.0)) return sqrt(dx*dx+dy*dy);
    return min(dx, dy);
  }

  float4 seeThrough(float yc, float2 p, float3x3 rotation, float3x3 rrotation, float cylinderAngle, float cylinderRadius){
    float hitAngle = PI - (acos(yc / cylinderRadius) - cylinderAngle);
    float3 point = hitPoint(hitAngle, yc, rotation * float3(p,1.0), rrotation);
    if (yc <= 0.0 && (point.x<0.0||point.y<0.0||point.x>1.0||point.y>1.0)) return getToColor(p);
    if (yc > 0.0) return getFromColor(p);
    float4 color = getFromColor(point.xy);
    return antiAlias(color, float4(0.0), distanceToEdge(point));
  }

  float4 seeThroughWithShadow(float yc, float2 p, float3 point, float3x3 rotation, float3x3 rrotation, float cylinderAngle, float cylinderRadius, float amount){
    float shadow = (1.0 - distanceToEdge(point) * 30.0) / 3.0;
    if (shadow < 0.0) shadow = 0.0; else shadow *= amount;
    float4 sc = seeThrough(yc, p, rotation, rrotation, cylinderAngle, cylinderRadius);
    sc.rgb -= shadow;
    return sc;
  }

  float4 backside(float yc, float3 point){
    float4 color = getFromColor(point.xy);
    float gray = (color.r + color.g + color.b) / 15.0;
    gray += 0.8 * (pow(1.0 - abs(yc / (1.0/PI/2.0)), 0.2) * 0.5 + 0.5);
    color.rgb = float3(gray);
    return color;
  }

  float4 behindSurface(float2 p, float yc, float3 point, float3x3 rrotation, float cylinderAngle, float cylinderRadius, float amount){
    float shado = (1.0 - ((-cylinderRadius - yc) / amount * 7.0)) / 6.0;
    shado *= 1.0 - abs(point.x - 0.5);
    yc = (-cylinderRadius - cylinderRadius - yc);
    float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
    point = hitPoint(hitAngle, yc, point, rrotation);
    if (yc < 0.0 && point.x>=0.0 && point.y>=0.0 && point.x<=1.0 && point.y<=1.0 && (hitAngle < PI || amount > 0.5)){
      shado = 1.0 - (sqrt((point.x-0.5)*(point.x-0.5) + (point.y-0.5)*(point.y-0.5)) / 0.71);
      shado *= pow(-yc / cylinderRadius, 3.0) * 0.5;
    } else {
      shado = 0.0;
    }
    float3 base = getToColor(p).rgb;
    return float4(base - shado, 1.0);
  }

  float4 main(float2 xy){
    float2 uv = xy / resolution;
    float2 p = geomUV(uv);

    float amount = progress * (MAX_AMOUNT - MIN_AMOUNT) + MIN_AMOUNT;
    float cylinderCenter = amount;
    float cylinderAngle = 2.0 * PI * amount;
    float cylinderRadius = 1.0 / PI / 2.0;

    float angle = 100.0 * PI / 180.0;
    float c = cos(-angle), s = sin(-angle);
    float3x3 rotation = float3x3( c, s, 0.0, -s, c, 0.0, -0.801, 0.8900, 1.0 );
    c = cos(angle); s = sin(angle);
    float3x3 rrotation = float3x3( c, s, 0.0, -s, c, 0.0, 0.98500, 0.985, 1.0 );

    float3 point = rotation * float3(p, 1.0);
    float yc = point.y - cylinderCenter;

    if (yc < -cylinderRadius) return behindSurface(p, yc, point, rrotation, cylinderAngle, cylinderRadius, amount);
    if (yc >  cylinderRadius)  return getFromColor(p);

    float hitAngle = (acos(yc / cylinderRadius) + cylinderAngle) - PI;
    float hitAngleMod = mod(hitAngle, 2.0 * PI);
    if ((hitAngleMod > PI && amount < 0.5) || (hitAngleMod > PI/2.0 && amount < 0.0)) {
      return seeThrough(yc, p, rotation, rrotation, cylinderAngle, cylinderRadius);
    }

    point = hitPoint(hitAngle, yc, point, rrotation);
    if (point.x<0.0||point.y<0.0||point.x>1.0||point.y>1.0) {
      return seeThroughWithShadow(yc, p, point, rotation, rrotation, cylinderAngle, cylinderRadius, amount);
    }

    float4 color = backside(yc, point);
    float4 otherColor = (yc < 0.0)
      ? float4(0.0, 0.0, 0.0, (1.0 - (sqrt((point.x-0.5)*(point.x-0.5)+(point.y-0.5)*(point.y-0.5)) / 0.71)) * pow(-yc / cylinderRadius,3.0) * 0.5 )
      : getFromColor(p);

    color = antiAlias(color, otherColor, cylinderRadius - abs(yc));
    float4 cl = seeThroughWithShadow(yc, p, point, rotation, rrotation, cylinderAngle, cylinderRadius, amount);
    float dist = distanceToEdge(point);
    return antiAlias(color, cl, dist);
  }
`

type ItemProps = {
  children: React.ReactNode
  setImages: (img: any) => void
}

type RenderPageProps = {
  item: any
  index: number
}

type Props = {
  images?: any[]
  data?: any[]
  renderPage?: (props: RenderPageProps) => React.ReactNode
  gestureEnabled?: boolean
}

export type PageCurlHandle = {
  next: () => void
  prev: () => void
}

function Item({ children, setImages }: ItemProps) {
  const ref = useRef<View>(null)
  const taken = useRef(false)
  
  const getSnapshot = async () => {
    if (taken.current) return
    taken.current = true
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
    await InteractionManager.runAfterInteractions()
    const image = await makeImageFromView(ref as any)
    setImages(image)
  }

  return (
    <View onLayout={getSnapshot} collapsable={false} ref={ref} style={{ width, height }}>
      {children}
    </View>
  )
}

const PageCurl = forwardRef<PageCurlHandle, Props>(
  function PageCurl({ images, data, renderPage, gestureEnabled = false }, ref) {
    const dataLength = images?.length ?? data?.length ?? 0

    const imgs = images?.map((item: any) => useImage(item))

    const img1Index = useSharedValue(0)
    const topFlag = useSharedValue(0)
    const currentAnim = useSharedValue("next")
    const currentIndex = useSharedValue(0)
    const startX = useSharedValue(0)

    const effect = useMemo(() => Skia.RuntimeEffect.Make(pageCurlShader)!, [])
    const [viewImages, setViewImages] = useState([])

    const progress = useSharedValue(0)

    const uniforms = useDerivedValue(() => ({
      resolution: [width, height] as [number, number],
      progress: progress.value,
      topFlag: topFlag.value
    }), [])

    const img1 = useDerivedValue(() => {
      return imgs?.[img1Index.value] || viewImages[img1Index.value]
    }, [imgs, viewImages])

    const img2 = useDerivedValue(() => {
      return imgs?.[img1Index.value + 1] || viewImages[img1Index.value + 1]
    }, [imgs, viewImages])

    const gesture = Gesture.Pan()
      .manualActivation(true)
      .onTouchesDown((e) => {
        startX.value = e.allTouches[0].x
      })
      .onTouchesMove((e, gesture) => {
        const x = e.allTouches[0].x
        if ((x - startX.value > 0 && currentIndex.value === 0) || (x - startX.value < 0 && currentIndex.value === dataLength - 1)) {
          gesture.fail()
          return
        }

        gesture.activate()
      })
      .onStart((e) => {
        if (e.translationX > 0) {
          currentAnim.value = "prev"
          if (img1Index.value !== 0 && currentIndex.value !== (dataLength - 1)) {
            img1Index.value--
          }
        } else {
          currentAnim.value = "next"
        }
        topFlag.value = e.y < height / 2 ? 0 : 1
      })
      .onChange((e) => {
        progress.value = Math.abs(currentAnim.value === "prev" ? 1 - (e.translationX / width) : e.translationX / width)
      })
      .onEnd((e) => {
        if (Math.abs(e.translationX) > width / 2) {
          progress.value = withSpring(currentAnim.value === "next" ? 1 : 0, {}, (finished) => {
            if (finished) {
              currentIndex.value = currentIndex.value + (currentAnim.value === "next" ? 1 : -1)
            }
            if (finished && img1Index.value + 1 !== dataLength - 1 && currentAnim.value === "next") {
              img1Index.value++
              progress.value = 0
            }
          })
        } else {
          progress.value = withTiming(currentAnim.value === "prev" ? 1 : 0)
        }
      }).enabled(gestureEnabled)

    const setImages = (img: any, index: number) => {
      setViewImages(prev => {
        if (prev[index]) return prev
        const next = prev.slice()
        next[index] = img as never
        return next
      })
    }

    const next = () => {
      if (currentIndex.value === dataLength - 1) {
        return
      }

      progress.value = withTiming(1, { duration: 800 }, (finished) => {
        if (finished) {
          currentIndex.value++
        }

        if (finished && img1Index.value + 1 !== dataLength - 1) {
          img1Index.value++
          progress.value = 0
        }
      })
    }

    const prev = () => {
      if (currentIndex.value === 0) {
        return
      }

      if (img1Index.value !== 0 && currentIndex.value !== (dataLength - 1)) {
        progress.value = 1
        img1Index.value--
      }

      progress.value = withTiming(0, { duration: 800 }, () => {
        if (currentIndex.value !== 0) {
          currentIndex.value--
        }
      })
    }

    useImperativeHandle(ref, () => ({ next, prev }), [next, prev])

    return (
      <GestureDetector gesture={gesture}>
        <View style={{ width, height }}>
          {
            (!images || images.length === 0) && viewImages.length !== data?.length ?
              data?.map((item, index) => {
                return (
                  <Item
                    setImages={(img) => setImages(img, index)}
                    key={index}
                  >
                    {renderPage?.({ item, index })}
                  </Item>
                )
              })
              :
              <Canvas style={{ width, height }}>
                <Fill>
                  <Shader source={effect} uniforms={uniforms}>
                    <ImageShader image={img1} fit="cover" width={width} height={height} />
                    <ImageShader image={img2} fit="cover" width={width} height={height} />
                  </Shader>
                </Fill>
              </Canvas>
          }
        </View>
      </GestureDetector>
    )
  }
)

export default PageCurl

