import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EXPR = { CURIOUS: 0, HAPPY: 1, SURPRISED: 2, SLEEPY: 3 };

export default function ThreeDRobot({ mode }) {
  const containerRef = useRef(null);

  const getAccentColor = () => (mode === 'tester' ? '#10b981' : '#f43f5e');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = 5.0;
    let visH = 2 * Math.tan((45 * Math.PI) / 360) * 5.0;
    let visW = visH * (W / H);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ── Lights ── */``
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 5, 4);
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-5, 3, -2);
    scene.add(fillLight);

    const glowCol = new THREE.Color(getAccentColor());
    const glowLight = new THREE.PointLight(glowCol, 3.5, 10);
    glowLight.position.set(0, 0.2, 1);
    scene.add(glowLight);

    /* ── Materials ── */
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x1f293d, roughness: 0.15, metalness: 0.85 });
    const bodyMat  = new THREE.MeshStandardMaterial({ color: 0xecf0f3, roughness: 0.2,  metalness: 0.1  });
    const glowMat  = new THREE.MeshBasicMaterial({ color: glowCol, transparent: true, opacity: 0.95 });

    /* ── Groups ── */
    const robotGroup = new THREE.Group();
    scene.add(robotGroup);

    const headGroup = new THREE.Group();
    headGroup.position.y = 0.35;
    robotGroup.add(headGroup);

    const bodyGroup = new THREE.Group();
    bodyGroup.position.y = -0.32;
    robotGroup.add(bodyGroup);

    /* ── Head meshes ── */
    const headGeo = new THREE.SphereGeometry(0.5, 32, 32);
    headGeo.scale(1.15, 0.9, 1.0);
    headGroup.add(new THREE.Mesh(headGeo, bodyMat));

    const visorGeo = new THREE.SphereGeometry(0.505, 32, 16, 0, Math.PI * 2, 0.7, 0.6);
    visorGeo.scale(1.15, 0.5, 1.0);
    const visorMat = new THREE.MeshStandardMaterial({ color: 0x07090e, roughness: 0.05, metalness: 0.9 });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.05, 0.02);
    headGroup.add(visorMesh);

    /* Eyes */
    const eyeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    eyeGeo.scale(1.3, 1.0, 0.3);
    const leftEye  = new THREE.Mesh(eyeGeo, glowMat);
    const rightEye = new THREE.Mesh(eyeGeo, glowMat);
    leftEye.position.set(-0.16, 0.05, 0.44);
    rightEye.position.set( 0.16, 0.05, 0.44);
    headGroup.add(leftEye, rightEye);

    /* Eyebrows */
    const browGeo = new THREE.BoxGeometry(0.14, 0.028, 0.028);
    const browMat = new THREE.MeshBasicMaterial({ color: glowCol, transparent: true, opacity: 0.9 });
    const leftBrow  = new THREE.Mesh(browGeo, browMat);
    const rightBrow = new THREE.Mesh(browGeo, browMat);
    leftBrow.position.set( -0.16, 0.17, 0.44);
    rightBrow.position.set( 0.16, 0.17, 0.44);
    headGroup.add(leftBrow, rightBrow);

    /* Mouth – smile arc (torus half-ring) */
    const smileGeo = new THREE.TorusGeometry(0.10, 0.018, 8, 28, Math.PI);
    const smileMat = new THREE.MeshBasicMaterial({ color: glowCol, transparent: true, opacity: 0.85 });
    const mouthMesh = new THREE.Mesh(smileGeo, smileMat);
    mouthMesh.position.set(0, -0.10, 0.47);
    mouthMesh.rotation.z = Math.PI; // arc opens upward = smile
    headGroup.add(mouthMesh);

    /* Mouth – surprised O */
    const oGeo  = new THREE.TorusGeometry(0.065, 0.018, 8, 24);
    const oMat  = new THREE.MeshBasicMaterial({ color: glowCol, transparent: true, opacity: 0 });
    const oMesh = new THREE.Mesh(oGeo, oMat);
    oMesh.position.set(0, -0.10, 0.47);
    oMesh.scale.setScalar(0);
    headGroup.add(oMesh);

    /* Blush cheeks */
    const blushGeo = new THREE.CircleGeometry(0.05, 12);
    const blushMatL = new THREE.MeshBasicMaterial({ color: 0xff6b9d, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const blushMatR = new THREE.MeshBasicMaterial({ color: 0xff6b9d, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const leftBlush  = new THREE.Mesh(blushGeo, blushMatL);
    const rightBlush = new THREE.Mesh(blushGeo, blushMatR);
    leftBlush.position.set( -0.33, -0.04, 0.42);
    rightBlush.position.set( 0.33, -0.04, 0.42);
    headGroup.add(leftBlush, rightBlush);

    /* Ears, antennas */
    const earGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16);
    const earL = new THREE.Mesh(earGeo, metalMat);
    earL.rotation.z = Math.PI / 2; earL.position.set(-0.58, 0.05, 0);
    const earR = new THREE.Mesh(earGeo, metalMat);
    earR.rotation.z = -Math.PI / 2; earR.position.set(0.58, 0.05, 0);
    headGroup.add(earL, earR);

    const antGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.22, 8);
    const antL = new THREE.Mesh(antGeo, metalMat);
    antL.rotation.z = -Math.PI / 8; antL.position.set(-0.52, 0.22, 0);
    const antR = new THREE.Mesh(antGeo, metalMat);
    antR.rotation.z = Math.PI / 8; antR.position.set(0.52, 0.22, 0);
    headGroup.add(antL, antR);

    const tipGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const tipL = new THREE.Mesh(tipGeo, glowMat); tipL.position.set(-0.56, 0.32, 0);
    const tipR = new THREE.Mesh(tipGeo, glowMat); tipR.position.set( 0.56, 0.32, 0);
    headGroup.add(tipL, tipR);

    /* ── Body meshes ── */
    const neckGeo  = new THREE.CylinderGeometry(0.08, 0.08, 0.2, 16);
    const neckMesh = new THREE.Mesh(neckGeo, metalMat);
    neckMesh.position.y = 0.52;
    bodyGroup.add(neckMesh);

    const torsoGeo  = new THREE.SphereGeometry(0.32, 32, 32);
    torsoGeo.scale(1.0, 1.25, 0.9);
    const torsoMesh = new THREE.Mesh(torsoGeo, bodyMat);
    torsoMesh.position.y = 0.15;
    bodyGroup.add(torsoMesh);

    const chestGeo  = new THREE.SphereGeometry(0.28, 16, 16, 0, Math.PI, 0.2, 1.2);
    chestGeo.scale(0.9, 1.0, 1.0);
    const chestMesh = new THREE.Mesh(chestGeo, metalMat);
    chestMesh.position.set(0, 0.16, 0.08); chestMesh.rotation.y = Math.PI / 2;
    bodyGroup.add(chestMesh);

    const thrGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.22, 16);
    const engL = new THREE.Mesh(thrGeo, metalMat);
    engL.rotation.z = Math.PI / 10; engL.position.set(-0.36, 0.05, 0);
    const engR = new THREE.Mesh(thrGeo, metalMat);
    engR.rotation.z = -Math.PI / 10; engR.position.set(0.36, 0.05, 0);
    bodyGroup.add(engL, engR);

    const exhGeo  = new THREE.RingGeometry(0.04, 0.07, 16);
    const exhL = new THREE.Mesh(exhGeo, glowMat);
    exhL.rotation.x = Math.PI / 2; exhL.position.set(-0.38, -0.07, 0);
    const exhR = new THREE.Mesh(exhGeo, glowMat);
    exhR.rotation.x = Math.PI / 2; exhR.position.set(0.38, -0.07, 0);
    bodyGroup.add(exhL, exhR);

    /* ── Thruster particles ── */
    const PC = 60;
    const pGeo   = new THREE.BufferGeometry();
    const pPos   = new Float32Array(PC * 3);
    const pLife  = new Float32Array(PC);
    const pOrigin = [];
    for (let i = 0; i < PC; i++) {
      const isL = i < PC / 2;
      const sx = isL ? -0.38 : 0.38;
      const sy = -0.32 - 0.07;
      pOrigin.push({ x: sx, y: sy, z: 0 });
      pPos[i*3]=sx; pPos[i*3+1]=sy - Math.random()*0.8; pPos[i*3+2]=0;
      pLife[i]=Math.random();
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: glowCol, size: 0.05, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(pGeo, pMat);
    robotGroup.add(particles);

    /* ── Expression state ── */
    // Current interpolated values
    const cv = {
      eyeY: 1.0,    // eye scale Y
      lBrowY: 0.17, rBrowY: 0.17,
      lBrowRZ: 0.0, rBrowRZ: 0.0,
      mouthRZ: Math.PI, mouthSX: 1.0, mouthSY: 0.85, mouthOp: 0.75,
      oScale: 0.0, oOp: 0.0,
      blush: 0.0,
    };
    // Target values per expression
    const TARGETS = {
      [EXPR.CURIOUS]:   { eyeY:1.0,  lBrowY:0.17, rBrowY:0.21, lBrowRZ:-0.12, rBrowRZ:0.0,  mouthRZ:Math.PI, mouthSX:1.0, mouthSY:0.85, mouthOp:0.75, oScale:0, oOp:0, blush:0    },
      [EXPR.HAPPY]:     { eyeY:0.45, lBrowY:0.22, rBrowY:0.22, lBrowRZ: 0.20, rBrowRZ:-0.20,mouthRZ:Math.PI, mouthSX:1.4, mouthSY:1.3,  mouthOp:0.95, oScale:0, oOp:0, blush:0.6  },
      [EXPR.SURPRISED]: { eyeY:1.6,  lBrowY:0.26, rBrowY:0.26, lBrowRZ:-0.25, rBrowRZ:0.25, mouthRZ:Math.PI, mouthSX:0.0, mouthSY:0.0,  mouthOp:0.0,  oScale:1, oOp:0.95,blush:0  },
      [EXPR.SLEEPY]:    { eyeY:0.18, lBrowY:0.12, rBrowY:0.12, lBrowRZ:-0.18, rBrowRZ:0.18, mouthRZ:0,       mouthSX:0.7, mouthSY:0.65, mouthOp:0.55, oScale:0, oOp:0, blush:0    },
    };

    let curExpr = EXPR.CURIOUS;
    let exprTimer   = 0;
    let idleTimer   = 0;
    let blinkTimer  = 0;
    let isBlinking  = false;
    let blinkElapsed = 0;
    const BLINK_DUR = 0.15;

    /* mouse / scroll state */
    let tMouseX = 0, tMouseY = 0;
    let prevMX = 0, prevMY = 0;
    let smoothSpeed = 0;
    let scrollOff = 0;

    /* ── Event listeners ── */
    const onMouseMove = (e) => {
      tMouseX = (e.clientX / window.innerWidth)  * 2 - 1;
      tMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const diff = window.scrollY - lastScrollY;
      scrollOff = Math.max(-1.5, Math.min(1.5, diff * 0.015));
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── Animation ── */
    let raf;
    let lastTs = performance.now();

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = (ts) => {
      raf = requestAnimationFrame(animate);

      // ── Proper delta using performance.now() ──
      const delta = Math.min((ts - lastTs) / 1000, 0.05); // cap at 50ms
      lastTs = ts;
      const time = ts / 1000;

      /* color update */
      const tc = new THREE.Color(getAccentColor());
      glowCol.lerp(tc, 0.08);
      glowMat.color.copy(glowCol);
      glowLight.color.copy(glowCol);
      pMat.color.copy(glowCol);
      browMat.color.copy(glowCol);
      smileMat.color.copy(glowCol);
      oMat.color.copy(glowCol);

      /* ── mouse speed (normalized to [0-1] range) ── */
      const dMX = tMouseX - prevMX;
      const dMY = tMouseY - prevMY;
      const rawSpeed = Math.sqrt(dMX*dMX + dMY*dMY) / delta; // units/sec
      smoothSpeed = lerp(smoothSpeed, rawSpeed, Math.min(1, delta * 8));
      prevMX = tMouseX; prevMY = tMouseY;

      const absScroll = Math.abs(scrollOff);

      /* ── Expression logic ── */
      exprTimer += delta;

      if (smoothSpeed > 1.2 && curExpr !== EXPR.HAPPY) {
        curExpr = EXPR.HAPPY; exprTimer = 0; idleTimer = 0;
      } else if (absScroll > 0.55 && curExpr !== EXPR.SURPRISED) {
        curExpr = EXPR.SURPRISED; exprTimer = 0; idleTimer = 0;
      } else if (smoothSpeed < 0.05 && absScroll < 0.04) {
        idleTimer += delta;
        if (idleTimer > 4.0 && curExpr !== EXPR.SLEEPY) {
          curExpr = EXPR.SLEEPY; exprTimer = 0;
        }
      } else {
        idleTimer = 0;
        if ((curExpr === EXPR.HAPPY || curExpr === EXPR.SURPRISED) && exprTimer > 1.6) {
          curExpr = EXPR.CURIOUS; exprTimer = 0;
        }
        if (curExpr === EXPR.SLEEPY) {
          curExpr = EXPR.CURIOUS; exprTimer = 0;
        }
      }

      /* ── Lerp expression values ── */
      const tgt = TARGETS[curExpr];
      const sp = Math.min(1, delta * 5); // lerp speed
      cv.eyeY    = lerp(cv.eyeY,    tgt.eyeY,    sp);
      cv.lBrowY  = lerp(cv.lBrowY,  tgt.lBrowY,  sp);
      cv.rBrowY  = lerp(cv.rBrowY,  tgt.rBrowY,  sp);
      cv.lBrowRZ = lerp(cv.lBrowRZ, tgt.lBrowRZ, sp);
      cv.rBrowRZ = lerp(cv.rBrowRZ, tgt.rBrowRZ, sp);
      cv.mouthRZ = lerp(cv.mouthRZ, tgt.mouthRZ, sp);
      cv.mouthSX = lerp(cv.mouthSX, tgt.mouthSX, sp);
      cv.mouthSY = lerp(cv.mouthSY, tgt.mouthSY, sp);
      cv.mouthOp = lerp(cv.mouthOp, tgt.mouthOp, sp);
      cv.oScale  = lerp(cv.oScale,  tgt.oScale,  sp);
      cv.oOp     = lerp(cv.oOp,     tgt.oOp,     sp);
      cv.blush   = lerp(cv.blush,   tgt.blush,   sp);

      /* apply brows */
      leftBrow.position.y  = cv.lBrowY;  leftBrow.rotation.z  = cv.lBrowRZ;
      rightBrow.position.y = cv.rBrowY;  rightBrow.rotation.z = cv.rBrowRZ;

      /* apply mouth */
      mouthMesh.rotation.z = cv.mouthRZ;
      mouthMesh.scale.set(cv.mouthSX, cv.mouthSY, 1);
      smileMat.opacity = cv.mouthOp;
      oMesh.scale.setScalar(cv.oScale);
      oMat.opacity = cv.oOp;

      /* blush */
      blushMatL.opacity = cv.blush;
      blushMatR.opacity = cv.blush;

      /* ── Blinking (skip in sleepy – handled separately) ── */
      if (curExpr !== EXPR.SLEEPY) {
        blinkTimer += delta;
        if (!isBlinking && blinkTimer > 3.0 + Math.random() * 1.5) {
          isBlinking = true; blinkElapsed = 0; blinkTimer = 0;
        }
        if (isBlinking) {
          blinkElapsed += delta;
          const p = blinkElapsed / BLINK_DUR;
          let eyeY = cv.eyeY;
          if (p < 0.5) eyeY = lerp(cv.eyeY, 0.05, p * 2);
          else if (p < 1.0) eyeY = lerp(0.05, cv.eyeY, (p - 0.5) * 2);
          else { isBlinking = false; }
          leftEye.scale.y = eyeY;
          rightEye.scale.y = eyeY;
        } else {
          leftEye.scale.y = cv.eyeY;
          rightEye.scale.y = cv.eyeY;
        }
      } else {
        // Slow droopy oscillation for sleepy
        const s = 0.18 + Math.abs(Math.sin(time * 0.6)) * 0.12;
        leftEye.scale.y = s; rightEye.scale.y = s;
      }

      /* ── Float + flight ── */
      const hoverY = Math.sin(time * 1.8) * 0.12;
      scrollOff += (0 - scrollOff) * 0.06;

      const minX = Math.min(visW * 0.18, visW / 2 - 1.2);
      const maxX = visW / 2 - 0.7;
      const marginY = visH / 2 - 0.7;

      const tX = (tMouseX + 1) / 2;
      const wmX = minX + tX * (maxX - minX);
      const wmY = tMouseY * (visH / 2);
      const cX  = Math.max(minX, Math.min(maxX, wmX));
      const cY  = Math.max(-marginY, Math.min(marginY, wmY));

      const flyE = 0.035;
      const oldX = robotGroup.position.x;
      const oldY = robotGroup.position.y;
      robotGroup.position.x += (cX - robotGroup.position.x) * flyE;
      robotGroup.position.y += (cY + hoverY + scrollOff - robotGroup.position.y) * flyE;

      const velX = robotGroup.position.x - oldX;
      const velY = robotGroup.position.y - oldY;
      const moveSpd = Math.sqrt(velX*velX + velY*velY) / Math.max(delta, 0.001);

      robotGroup.position.z += (Math.max(-0.6, -moveSpd * 0.05) - robotGroup.position.z) * 0.05;

      /* body banking */
      bodyGroup.rotation.y += (-Math.max(-0.4, Math.min(0.4, velX * 1.5)) - bodyGroup.rotation.y) * 0.08;
      bodyGroup.rotation.z += (-Math.max(-0.4, Math.min(0.4, velX * 1.8)) - bodyGroup.rotation.z) * 0.08;
      bodyGroup.rotation.x += ((Math.max(-0.3, Math.min(0.3, velY * 1.2)) - scrollOff * 0.5) - bodyGroup.rotation.x) * 0.08;

      /* head look */
      headGroup.rotation.y += (Math.max(-0.8, Math.min(0.8, (tMouseX*(visW/2) - robotGroup.position.x)*0.25)) - headGroup.rotation.y) * 0.1;
      headGroup.rotation.x += (Math.max(-0.6, Math.min(0.6, -(tMouseY*(visH/2) - robotGroup.position.y)*0.2)) - headGroup.rotation.x) * 0.1;

      /* particles */
      const totSpd = Math.max(Math.abs(scrollOff), moveSpd * 0.08);
      pMat.size    = 0.045 + Math.min(0.08, totSpd * 0.06);
      pMat.opacity = Math.min(0.95, 0.7 + totSpd * 0.4);
      const pa = pGeo.attributes.position;
      for (let i = 0; i < PC; i++) {
        pLife[i] += delta * (1.6 + totSpd * 2.0);
        if (pLife[i] > 1.0) pLife[i] = 0;
        const o = pOrigin[i], t2 = pLife[i];
        pa.setX(i, o.x + (-velX*1.5)*t2 + (Math.random()-0.5)*0.1*t2);
        pa.setY(i, o.y + hoverY - t2*(0.8 + totSpd*1.5));
        pa.setZ(i, o.z + (-velY*1.5)*t2 + (Math.random()-0.5)*0.1*t2);
      }
      pa.needsUpdate = true;

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(animate);

    /* resize */
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      visH = 2 * Math.tan((45 * Math.PI) / 360) * 5.0;
      visW = visH * camera.aspect;
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mode]);

  return (
    <div className="three-robot-canvas-container">
      <div className="three-robot-canvas" ref={containerRef} />
    </div>
  );
}
