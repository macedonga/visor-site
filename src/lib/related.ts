// Which protocol pages sit under each VDK doc. Each page links the other way too.
import { titleOfPage, hrefOfPage } from "./protocol.mjs";

const UNDER: Record<string, string[]> = {
  connection: ["Link-setup-and-AirShield", "Identity-and-trust"],
  glasses: ["Device-state-and-build-info", "Motion-sensors"],
  "camera-and-captures": ["Capture-list", "Airship-file-transfer", "Wi-Fi-Direct", "Live-stream"],
  "neural-band": ["Neural-Band"],
  display: ["Meta-Ray-Ban-Display"],
  "briefing-cards": ["Briefing-panel"],
  "web-apps": ["Display-web-apps"],
  "voice-and-assistant": ["Assistant-protocol", "Assistant-voice-and-languages"],
  settings: ["Settings-and-RLDrive", "Settings-catalogue"],
  "porting-from-dat": ["Device-Access-Toolkit"],
};

/** The protocol pages behind a VDK doc. */
export const protocolFor = (slug: string) => (UNDER[slug] ?? []).map((name) => ({ href: hrefOfPage(name), title: titleOfPage(name) }));

/** The VDK docs a protocol page sits under, as their slugs. */
export const docsFor = (name: string) => Object.entries(UNDER).filter(([, names]) => names.includes(name)).map(([slug]) => slug);
