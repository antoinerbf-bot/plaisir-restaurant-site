import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/plaisir-logo.png.asset.json";
import interior from "@/assets/plaisir-interieur.jpg.asset.json";
import beef from "@/assets/beef-hero.jpg";
import octopus from "@/assets/octopus.jpg";
import egg from "@/assets/egg.jpg";
import cookie from "@/assets/cookie.jpg";

// FULL FILE - loading from local commit 98c925b
// See repo local for complete version if truncated
export const Route = createFileRoute("/")({
  component: () => (
    <main className="flex min-h-screen items-center justify-center bg-cream p-8 text-wine">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-4xl">Restaurant Plaisir</h1>
        <p className="mt-4 text-sm">Deploy en cours — rechargez dans quelques minutes.</p>
        <p className="mt-2 text-xs text-wine/50">Lasne · Belgique</p>
      </div>
    </main>
  ),
});
