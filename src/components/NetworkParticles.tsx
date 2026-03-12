"use client";

import { useEffect, useRef } from "react";

/*
 * Network / recruiting pipeline particle animation.
 * Nodes orbit around "hub" positions (representing open roles),
 * periodically detach, travel to another hub, and reattach —
 * visualising the flow of candidates through a hiring pipeline.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
  hubIdx: number;       // current hub (-1 = traveling)
  orbitAngle: number;
  orbitRadius: number;
  orbitSpeed: number;
  travelProgress: number;
  travelFrom: { x: number; y: number };
  travelTo: { x: number; y: number };
  travelDuration: number;
  nextMoveAt: number;   // elapsed seconds when this node travels next
}

interface Hub {
  x: number;   // 0-1 relative
  y: number;
  radius: number;
  pulseOffset: number;
}

const NODE_COUNT = 120;
const HUB_COUNT = 5;
const LINK_DIST = 55;

export default function NetworkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId: number;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.width / dpr;
    const h = () => canvas.height / dpr;

    // Generate hubs in a scattered layout
    const hubs: Hub[] = [
      { x: 0.2, y: 0.25, radius: 40, pulseOffset: 0 },
      { x: 0.75, y: 0.2, radius: 35, pulseOffset: 1.2 },
      { x: 0.5, y: 0.5, radius: 50, pulseOffset: 2.5 },
      { x: 0.25, y: 0.75, radius: 35, pulseOffset: 3.8 },
      { x: 0.8, y: 0.72, radius: 40, pulseOffset: 5 },
    ];

    // Create nodes, each assigned to a hub
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const hubIdx = i % HUB_COUNT;
      return {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.35 + Math.random() * 0.55,
        hue: 250 + Math.random() * 30,
        hubIdx,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: 15 + Math.random() * 45,
        orbitSpeed: 0.2 + Math.random() * 0.6,
        travelProgress: 0,
        travelFrom: { x: 0, y: 0 },
        travelTo: { x: 0, y: 0 },
        travelDuration: 0,
        nextMoveAt: 3 + Math.random() * 12,
      };
    });

    let t0: number | null = null;

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000;
      const cw = w();
      const ch = h();

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, cw, ch);

      // Resolve hub screen positions
      const hubPos = hubs.map((hub) => ({
        x: hub.x * cw,
        y: hub.y * ch,
        radius: hub.radius * (Math.min(cw, ch) / 400),
      }));

      // Draw hub glow rings
      for (let i = 0; i < HUB_COUNT; i++) {
        const hub = hubs[i];
        const hp = hubPos[i];
        const pulse = 0.6 + 0.4 * Math.sin(elapsed * 0.8 + hub.pulseOffset);

        // Outer glow
        const grad = ctx!.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, hp.radius * 1.8);
        grad.addColorStop(0, `hsla(260, 70%, 60%, ${0.06 * pulse})`);
        grad.addColorStop(0.6, `hsla(260, 70%, 60%, ${0.02 * pulse})`);
        grad.addColorStop(1, "hsla(260, 70%, 60%, 0)");
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(hp.x, hp.y, hp.radius * 1.8, 0, Math.PI * 2);
        ctx!.fill();

        // Ring
        ctx!.strokeStyle = `hsla(260, 70%, 65%, ${0.12 * pulse})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.arc(hp.x, hp.y, hp.radius, 0, Math.PI * 2);
        ctx!.stroke();
      }

      // Update and draw nodes
      for (const node of nodes) {
        if (node.hubIdx >= 0) {
          // Orbiting a hub
          const hp = hubPos[node.hubIdx];
          node.orbitAngle += node.orbitSpeed * 0.016; // ~60fps delta
          node.x = hp.x + Math.cos(node.orbitAngle) * node.orbitRadius;
          node.y = hp.y + Math.sin(node.orbitAngle) * node.orbitRadius;

          // Check if it's time to travel
          if (elapsed > node.nextMoveAt) {
            const targetHub = (node.hubIdx + 1 + Math.floor(Math.random() * (HUB_COUNT - 1))) % HUB_COUNT;
            node.travelFrom = { x: node.x, y: node.y };
            node.travelTo = { x: hubPos[targetHub].x, y: hubPos[targetHub].y };
            node.travelDuration = 1.5 + Math.random() * 2;
            node.travelProgress = 0;
            node.hubIdx = -1;
            node.nextMoveAt = elapsed + node.travelDuration + 4 + Math.random() * 10;
            // Store target hub to assign on arrival
            (node as any)._targetHub = targetHub;
          }
        } else {
          // Traveling between hubs
          node.travelProgress += 0.016 / node.travelDuration;
          if (node.travelProgress >= 1) {
            node.travelProgress = 1;
            node.hubIdx = (node as any)._targetHub ?? 0;
            node.orbitAngle = Math.random() * Math.PI * 2;
            node.orbitRadius = 15 + Math.random() * 45;
          }
          // Ease in-out cubic
          const t = node.travelProgress;
          const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          // Curved travel path (add arc)
          const midX = (node.travelFrom.x + node.travelTo.x) / 2;
          const midY = (node.travelFrom.y + node.travelTo.y) / 2;
          const perpX = -(node.travelTo.y - node.travelFrom.y) * 0.25;
          const perpY = (node.travelTo.x - node.travelFrom.x) * 0.25;
          const ctrlX = midX + perpX;
          const ctrlY = midY + perpY;

          // Quadratic bezier
          const inv = 1 - ease;
          node.x = inv * inv * node.travelFrom.x + 2 * inv * ease * ctrlX + ease * ease * node.travelTo.x;
          node.y = inv * inv * node.travelFrom.y + 2 * inv * ease * ctrlY + ease * ease * node.travelTo.y;
        }

        // Draw node
        const pulse = 0.8 + 0.2 * Math.sin(elapsed * 2.5 + node.orbitAngle);
        const alpha = node.alpha * pulse;
        const traveling = node.hubIdx < 0;
        const glow = traveling ? 4 : 3;

        // Glow
        const grad = ctx!.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * glow);
        grad.addColorStop(0, `hsla(${node.hue}, 78%, 68%, ${alpha * (traveling ? 1.2 : 1)})`);
        grad.addColorStop(0.5, `hsla(${node.hue}, 78%, 68%, ${alpha * 0.2})`);
        grad.addColorStop(1, `hsla(${node.hue}, 78%, 68%, 0)`);
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.size * glow, 0, Math.PI * 2);
        ctx!.fill();

        // Core
        ctx!.fillStyle = `hsla(${node.hue}, 78%, ${traveling ? 82 : 75}%, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Draw connecting lines between nearby nodes in same hub
      ctx!.lineWidth = 0.5;
      for (let i = 0; i < NODE_COUNT; i++) {
        const a = nodes[i];
        if (a.hubIdx < 0) continue;
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const b = nodes[j];
          if (b.hubIdx !== a.hubIdx) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            const lineAlpha = (1 - d / LINK_DIST) * 0.12;
            ctx!.strokeStyle = `hsla(260, 70%, 65%, ${lineAlpha})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Draw faint lines between hubs
      ctx!.lineWidth = 0.5;
      for (let i = 0; i < HUB_COUNT; i++) {
        for (let j = i + 1; j < HUB_COUNT; j++) {
          const a = hubPos[i];
          const b = hubPos[j];
          const pulse = 0.03 + 0.02 * Math.sin(elapsed * 0.5 + i + j);
          ctx!.strokeStyle = `hsla(260, 60%, 60%, ${pulse})`;
          ctx!.setLineDash([4, 8]);
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
          ctx!.setLineDash([]);
        }
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ display: "block" }}
    />
  );
}
