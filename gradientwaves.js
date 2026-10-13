/**
 * GradientWaves – Pure vanilla WebGL (no external dependencies)
 * Port of React Bits <GradientWaves /> — works with file:// protocol.
 */

(function () {
  const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

  const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaveScale;
uniform float uWaveRatio;
uniform float uSwell;
uniform float uTurbulence;
uniform float uTilt;
uniform float uZoom;
uniform float uHeight;
uniform float uFogDepth;
uniform float uSteps;
uniform float uBrightness;
uniform float uOpacity;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec2 uMouse;
uniform float uParallax;
uniform bool uEnableMouse;
uniform vec3 uHorizonColor;
uniform vec3 uWaveColor;
uniform vec3 uCrestColor;
out vec4 fragColor;

const float MAX_DIST = 20000.0;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float plasma(vec3 r, vec2 freq, vec4 tc) {
  float mx = r.x + tc.x;
  mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);
  float my = r.y - tc.z;
  my += uTurbulence * cos(r.x / 23.0 + tc.w);
  return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);
}

float raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {
  float dist = 0.0;
  for (int i = 0; i < 128; i++) {
    if (float(i) >= uSteps) break;
    float dscene = plasma(pos + dist * dir, freq, tc);
    if (abs(dscene) < 0.1) break;
    dist += 0.9 * dscene;
    if (!(abs(dist) < MAX_DIST)) return MAX_DIST;
  }
  return dist;
}

void main() {
  float T = iTime * uSpeed;
  vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);
  vec4 tc = vec4(T / 0.130, T / 0.810, T / 0.200, T / 0.710);
  float c, s;
  float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);
  vec3 cam = vec3(0.0, 0.0, 30.0);
  vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;
  uv.x *= iResolution.x / iResolution.y;
  uv.y *= -1.0;

  vec3 dir = vec3(0.0, 0.0, -1.0);
  float ulen = length(uv);
  float xrot = vfov * ulen;
  c = cos(xrot); s = sin(xrot);
  dir = mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c) * dir;
  vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);
  c = nuv.x; s = nuv.y;
  dir = mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0) * dir;
  c = cos(uTilt); s = sin(uTilt);
  dir = mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c) * dir;

  if (uEnableMouse) {
    float yaw   = (uMouse.x - 0.5) * uParallax * 0.4;
    float pitch = (uMouse.y - 0.5) * uParallax * 0.4;
    c = cos(yaw); s = sin(yaw);
    dir = mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c) * dir;
    c = cos(pitch); s = sin(pitch);
    dir = mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c) * dir;
  }

  float dist = raymarch(cam, dir, freq, tc);
  vec3 pos = cam + dist * dir;

  float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);
  vec3 body = mix(uWaveColor, uCrestColor, clamp(pos.z * 0.08 + 0.5, 0.0, 1.0));
  vec3 col  = mix(uHorizonColor, body, t);
  col *= uBrightness;
  col  = clamp(col, 0.0, 1.0);

  float alpha = clamp(t, 0.0, 1.0) * uOpacity;
  if (uGrain > 0.5) {
    float g = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);
    alpha += (g - 0.5) * uGrainIntensity;
  }
  alpha = clamp(alpha, 0.0, 1.0);
  fragColor = vec4(col * alpha, alpha);
}`;

  function hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? [parseInt(r[1],16)/255, parseInt(r[2],16)/255, parseInt(r[3],16)/255] : [1,1,1];
  }

  function compileShader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[GradientWaves] Shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function createProgram(gl, vsrc, fsrc) {
    const vs = compileShader(gl, gl.VERTEX_SHADER, vsrc);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsrc);
    if (!vs || !fs) return null;
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.warn('[GradientWaves] Link error:', gl.getProgramInfoLog(p));
      return null;
    }
    return p;
  }

  /**
   * Mount GradientWaves into a DOM container element.
   * @param {HTMLElement} container
   * @param {Object} opts
   */
  window.mountGradientWaves = function(container, opts = {}) {
    const {
      horizonColor     = '#050d1a',
      waveColor        = '#1e3a8a',
      crestColor       = '#3b82f6',
      speed            = 0.35,
      amplitude        = 2.2,
      waveScale        = 0.55,
      waveRatio        = 0.9,
      swell            = 30,
      turbulence       = 18,
      tilt             = 1.11,
      zoom             = 1.0,
      height           = 5.5,
      fogDepth         = 14,
      detail           = 'medium',
      brightness       = 1.0,
      opacity          = 1.0,
      mouseInteraction = true,
      parallaxStrength = 0.4,
      grain            = true,
      grainIntensity   = 0.04,
    } = opts;

    const steps = detail === 'low' ? 40 : detail === 'high' ? 110 : 70;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;pointer-events:none;';
    container.appendChild(canvas);

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) { console.warn('[GradientWaves] WebGL2 not supported'); return () => {}; }

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const prog = createProgram(gl, vertex, fragment);
    if (!prog) return () => {};

    // Full-screen triangle
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    // Uniform locations
    const u = {};
    ['iTime','iResolution','uSpeed','uAmplitude','uWaveScale','uWaveRatio',
     'uSwell','uTurbulence','uTilt','uZoom','uHeight','uFogDepth','uSteps',
     'uBrightness','uOpacity','uGrain','uGrainIntensity','uMouse','uParallax',
     'uEnableMouse','uHorizonColor','uWaveColor','uCrestColor'].forEach(name => {
      u[name] = gl.getUniformLocation(prog, name);
    });

    gl.useProgram(prog);

    const hRgb = hexToRgb(horizonColor);
    const wRgb = hexToRgb(waveColor);
    const cRgb = hexToRgb(crestColor);

    gl.uniform1f(u.uSpeed, speed);
    gl.uniform1f(u.uAmplitude, amplitude);
    gl.uniform1f(u.uWaveScale, waveScale);
    gl.uniform1f(u.uWaveRatio, waveRatio);
    gl.uniform1f(u.uSwell, swell);
    gl.uniform1f(u.uTurbulence, turbulence);
    gl.uniform1f(u.uTilt, tilt);
    gl.uniform1f(u.uZoom, zoom);
    gl.uniform1f(u.uHeight, height);
    gl.uniform1f(u.uFogDepth, fogDepth);
    gl.uniform1f(u.uSteps, steps);
    gl.uniform1f(u.uBrightness, brightness);
    gl.uniform1f(u.uOpacity, opacity);
    gl.uniform1f(u.uGrain, grain ? 1.0 : 0.0);
    gl.uniform1f(u.uGrainIntensity, grainIntensity);
    gl.uniform1f(u.uParallax, parallaxStrength);
    gl.uniform1i(u.uEnableMouse, mouseInteraction ? 1 : 0);
    gl.uniform3fv(u.uHorizonColor, hRgb);
    gl.uniform3fv(u.uWaveColor, wRgb);
    gl.uniform3fv(u.uCrestColor, cRgb);
    gl.uniform2f(u.uMouse, 0.5, 0.5);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = Math.max(1, Math.floor(container.clientWidth));
      const h = Math.max(1, Math.floor(container.clientHeight));
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);
      gl.uniform2f(u.iResolution, canvas.width, canvas.height);
    };
    resize();
    // Also force resize after first paint in case container wasn't laid out yet
    requestAnimationFrame(() => { resize(); start(); });
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const mouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];

    const onMove = e => {
      const rect = container.getBoundingClientRect();
      targetMouse[0] =  (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1 - (e.clientY - rect.top)  / rect.height;
    };
    const onLeave = () => { targetMouse[0] = 0.5; targetMouse[1] = 0.5; };
    if (mouseInteraction) {
      container.addEventListener('pointermove', onMove);
      container.addEventListener('pointerleave', onLeave);
    }

    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = now => {
      gl.useProgram(prog);
      gl.uniform1f(u.iTime, (now - t0) * 0.001);

      mouse[0] += 0.05 * (targetMouse[0] - mouse[0]);
      mouse[1] += 0.05 * (targetMouse[1] - mouse[1]);
      gl.uniform2f(u.uMouse, mouse[0], mouse[1]);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.bindVertexArray(null);

      raf = requestAnimationFrame(loop);
    };

    const start = () => { if (visible && pageVisible && raf === 0) raf = requestAnimationFrame(loop); };
    const stop  = () => { if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; } };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); }, { threshold: 0 });
    io.observe(container);

    const onVis = () => { pageVisible = !document.hidden; pageVisible ? start() : stop(); };
    document.addEventListener('visibilitychange', onVis);

    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      try { container.removeChild(canvas); } catch(_) {}
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  };
})();
