import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Canvas, Fill, Shader, Skia, vec } from "@shopify/react-native-skia";
import {
  useSharedValue,
  useFrameCallback,
  useDerivedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const MAX_BALLS = 100;
const METABALLS_ARRAY_SIZE = 300;
const TOUCH_SCALE_THRESHOLD = 0.01;
const METABALL_THRESHOLD = 1.3;
const METABALL_THRESHOLD_SMOOTHNESS = 0.1;

const SPRING_CONFIG: WithSpringConfig = {
  damping: 15,
  stiffness: 150,
};

export type AnimationMode = "standard" | "glow" | "cooked";

interface Props {
  color?: string;
  speed?: number;
  enableTouchInteraction?: boolean;
  touchSmoothness?: number;
  animationSize?: number;
  ballCount?: number;
  clumpFactor?: number;
  touchBallSize?: number;
  touchBallColor?: string;
  minParticleRadius?: number;
  maxParticleRadius?: number;
  mode?: AnimationMode;
  width?: number;
  height?: number;
}

function parseHexColor(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function hash31(p: number): number[] {
  let r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);
  const r_yzx = [r[1], r[2], r[0]];
  const dotVal =
    r[0] * (r_yzx[0] + 33.33) +
    r[1] * (r_yzx[1] + 33.33) +
    r[2] * (r_yzx[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    r[i] = fract(r[i] + dotVal);
  }
  return r;
}

function hash33(v: number[]): number[] {
  let p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);
  const p_yxz = [p[1], p[0], p[2]];
  const dotVal =
    p[0] * (p_yxz[0] + 33.33) +
    p[1] * (p_yxz[1] + 33.33) +
    p[2] * (p_yxz[2] + 33.33);
  for (let i = 0; i < 3; i++) {
    p[i] = fract(p[i] + dotVal);
  }
  const p_xxy = [p[0], p[0], p[1]];
  const p_yxx = [p[1], p[0], p[0]];
  const p_zyx = [p[2], p[1], p[0]];
  const result: number[] = [];
  for (let i = 0; i < 3; i++) {
    result[i] = fract((p_xxy[i] + p_yxx[i]) * p_zyx[i]);
  }
  return result;
}

const generateMetaBallCalculations = (maxBalls: number): string => {
  const lines: string[] = [];
  for (let i = 0; i < maxBalls; i++) {
    const baseIdx = i * 3;
    lines.push(
      `    if (ballCount > ${i}) m1 += getMetaBallValue(vec2(iMetaBalls[${baseIdx}], iMetaBalls[${baseIdx + 1}]), iMetaBalls[${baseIdx + 2}], coord);`
    );
  }
  return lines.join('\n');
};

const createShader = () => {
  const metaBallCalculations = generateMetaBallCalculations(MAX_BALLS);
  
  const source = Skia.RuntimeEffect.Make(`
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iTouchPos;
uniform float iTouchActive;
uniform vec3 iColor;
uniform vec3 iTouchColor;
uniform float iAnimationSize;
uniform float iTouchBallSize;
uniform float iBallCount;
uniform float iClumpFactor;
uniform float iMode;
uniform float iHueShift;
uniform float iThreshold;
uniform float iMetaBalls[${METABALLS_ARRAY_SIZE}];

float getMetaBallValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / max(dist2, 0.0001);
}

half4 main(vec2 fragCoord) {
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fragCoord - iResolution * 0.5) * scale;
    vec2 touchW = (iTouchPos - iResolution * 0.5) * scale;
    
    float m1 = 0.0;
    int ballCount = int(iBallCount);
    
${metaBallCalculations}
    
    float m2 = 0.0;
    if (iTouchActive > ${TOUCH_SCALE_THRESHOLD}) {
        float scaledSize = iTouchBallSize * iTouchActive;
        m2 = getMetaBallValue(touchW, scaledSize, coord);
    }
    
    float total = m1 + m2;
    float f;
    
    if (iMode < 0.5) {
        f = smoothstep(iThreshold - ${METABALL_THRESHOLD_SMOOTHNESS}, iThreshold + ${METABALL_THRESHOLD_SMOOTHNESS}, total);
    } else if (iMode < 1.5) {
        float innerF = smoothstep(iThreshold - 0.2, iThreshold + 0.2, total);
        float outerGlow = smoothstep(iThreshold * 0.5, iThreshold, total);
        f = max(innerF, outerGlow * 0.4);
    } else {
        f = smoothstep(iThreshold - ${METABALL_THRESHOLD_SMOOTHNESS}, iThreshold + ${METABALL_THRESHOLD_SMOOTHNESS}, total);
    }
    
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        vec3 baseColor = iColor * alpha1 + iTouchColor * alpha2;
        
        if (iMode > 1.5) {
            float r = baseColor.r * (1.0 + iHueShift * 0.5);
            float g = baseColor.g * (1.0 + sin(iHueShift + 2.094) * 0.5);
            float b = baseColor.b * (1.0 + sin(iHueShift + 4.189) * 0.5);
            float edgeDarkness = pow(f, 5);
            cFinal = vec3(r, g, b) * (0.3 + edgeDarkness * 0.7);
        } else {
            cFinal = baseColor;
        }
    }
    
    return half4(cFinal * f, f);
}
`);
  
  if (!source) {
    throw new Error("Failed to create shader");
  }
  
  return source;
};

function StickyParticles({
  color = "#ffffff",
  speed = 0.3,
  enableTouchInteraction = true,
  touchSmoothness = 0.05,
  animationSize = 30,
  ballCount = 15,
  clumpFactor = 1,
  touchBallSize = 3,
  touchBallColor = "#ffffff",
  minParticleRadius = 0.5,
  maxParticleRadius = 2.0,
  mode = "standard",
  width = 400,
  height = 400,
}: Props) {
  const time = useSharedValue(0);
  const touchX = useSharedValue(width * 0.5);
  const touchY = useSharedValue(height * 0.5);
  const smoothTouchX = useSharedValue(width * 0.5);
  const smoothTouchY = useSharedValue(height * 0.5);
  const touchScale = useSharedValue(0);

  const shader = useMemo(() => createShader(), []);
  
  const [r1, g1, b1] = useMemo(() => parseHexColor(color), [color]);
  const [r2, g2, b2] = useMemo(
    () => parseHexColor(touchBallColor),
    [touchBallColor]
  );

  const ballParamsData = useMemo(() => {
    const params: number[][] = [];
    for (let i = 0; i < MAX_BALLS; i++) {
      const idx = i + 1;
      const h1 = hash31(idx);
      const st = h1[0] * (2 * Math.PI);
      const dtFactor = 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI);
      const baseScale = 5.0 + h1[1] * (10.0 - 5.0);
      const h2 = hash33(h1);
      const toggle = Math.floor(h2[0] * 2.0);
      const radiusVal = minParticleRadius + h2[2] * (maxParticleRadius - minParticleRadius);
      params.push([st, dtFactor, baseScale, toggle, radiusVal]);
    }
    return params;
  }, [minParticleRadius, maxParticleRadius]);

  const metaBallsData = useSharedValue<number[]>(new Array(METABALLS_ARRAY_SIZE).fill(0));

  useFrameCallback((frameInfo) => {
    "worklet";
    const elapsed = frameInfo.timestamp / 1000;
    time.value = elapsed;

    const effectiveCount = Math.min(ballCount, ballParamsData.length);
    const newMetaBalls: number[] = [];
    
    for (let i = 0; i < effectiveCount; i++) {
      const p = ballParamsData[i];
      const st = p[0];
      const dtFactor = p[1];
      const baseScale = p[2];
      const toggle = p[3];
      const radius = p[4];
      
      const dt = elapsed * speed * dtFactor;
      const th = st + dt;
      const x = Math.cos(th);
      const y = Math.sin(th + dt * toggle);
      const posX = x * baseScale * clumpFactor;
      const posY = y * baseScale * clumpFactor;
      newMetaBalls.push(posX, posY, radius);
    }
    
    while (newMetaBalls.length < METABALLS_ARRAY_SIZE) {
      newMetaBalls.push(0);
    }
    
    metaBallsData.value = newMetaBalls;

    if (touchScale.value > TOUCH_SCALE_THRESHOLD) {
      smoothTouchX.value += (touchX.value - smoothTouchX.value) * touchSmoothness;
      smoothTouchY.value += (touchY.value - smoothTouchY.value) * touchSmoothness;
    }
  }, true);

  const handleTouchStart = (x: number, y: number) => {
    "worklet";
    touchX.value = x;
    touchY.value = y;
    smoothTouchX.value = x;
    smoothTouchY.value = y;
    touchScale.value = withSpring(1, SPRING_CONFIG);
  };

  const handleTouchEnd = () => {
    "worklet";
    touchScale.value = withSpring(0, SPRING_CONFIG);
  };

  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      if (!enableTouchInteraction) return;
      handleTouchStart(e.x, e.y);
    })
    .onUpdate((e) => {
      if (!enableTouchInteraction) return;
      touchX.value = e.x;
      touchY.value = e.y;
    })
    .onEnd(() => {
      if (!enableTouchInteraction) return;
      handleTouchEnd();
    })
    .onFinalize(() => {
      if (!enableTouchInteraction) return;
      handleTouchEnd();
    });

  const tapGesture = Gesture.Tap()
    .onBegin((e) => {
      if (!enableTouchInteraction) return;
      handleTouchStart(e.x, e.y);
    })
    .onEnd(() => {
      if (!enableTouchInteraction) return;
      handleTouchEnd();
    });

  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const modeValue = useMemo(() => {
    switch (mode) {
      case "glow":
        return 1;
      case "cooked":
        return 2;
      default:
        return 0;
    }
  }, [mode]);

  const uniforms = useDerivedValue(() => {
    const hueShift = modeValue === 2 ? Math.sin(time.value * 0.5) : 0;
    const baseThreshold = METABALL_THRESHOLD;
    const threshold = modeValue === 2 
      ? baseThreshold * (1.0 + Math.sin(time.value * 2.5) * 0.08)
      : baseThreshold;
    
    return {
      iResolution: vec(width, height),
      iTime: time.value,
      iTouchPos: vec(smoothTouchX.value, smoothTouchY.value),
      iTouchActive: touchScale.value,
      iColor: [r1, g1, b1],
      iTouchColor: [r2, g2, b2],
      iAnimationSize: animationSize,
      iTouchBallSize: touchBallSize,
      iBallCount: ballCount,
      iClumpFactor: clumpFactor,
      iMode: modeValue,
      iHueShift: hueShift,
      iThreshold: threshold,
      iMetaBalls: metaBallsData.value,
    };
  }, [
    width,
    height,
    r1,
    g1,
    b1,
    r2,
    g2,
    b2,
    animationSize,
    touchBallSize,
    ballCount,
    clumpFactor,
    modeValue,
  ]);

  return (
    <GestureDetector gesture={composedGesture}>
      <Canvas style={[styles.container, { width, height }]}>
        <Fill>
          <Shader source={shader} uniforms={uniforms} />
        </Fill>
      </Canvas>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StickyParticles;

