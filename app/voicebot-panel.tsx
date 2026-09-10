"use client";

import { useRef, useState } from "react";
import { EBOLA_AGENT_ID } from "./voicebot-config";

type State = "idle" | "connecting" | "connected" | "error";

export function useVoicebotPanel() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>("idle");
  const conversation = useRef<{ endSession: () => Promise<void> } | null>(null);

  async function start() {
    setOpen(true);
    if (!EBOLA_AGENT_ID) { setState("error"); return; }
    setState("connecting");
    try {
      const { Conversation } = await import("@elevenlabs/client");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      conversation.current = await Conversation.startSession({
        agentId: EBOLA_AGENT_ID,
        onConnect: () => setState("connected"),
        onDisconnect: () => setState("idle"),
        onError: () => setState("error"),
      });
    } catch { setState("error"); }
  }

  async function close() {
    await conversation.current?.endSession();
    conversation.current = null;
    setState("idle");
    setOpen(false);
  }

  const panel = open ? <div className="call-panel" role="dialog" aria-modal="true" aria-label="Conversation avec le voicebot Ebola">
    <button className="panel-backdrop" type="button" onClick={close} aria-label="Fermer" />
    <div className="panel-card">
      <button className="panel-close" type="button" onClick={close}>Fermer</button>
      <div className={`voice-orb state-${state}`} aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <p className="kicker accent">VOICEBOT EBOLA · RDC</p>
      <h2>{state === "connecting" ? "Connexion…" : state === "connected" ? "Je vous écoute" : state === "error" ? "Connexion indisponible" : "Prêt"}</h2>
      <p>{state === "error" ? "Vérifiez l’autorisation du microphone ou réessayez dans quelques instants." : "Parlez naturellement. Vous pouvez interrompre le voicebot à tout moment."}</p>
      {state === "error" ? <button className="button button-primary" type="button" onClick={start}>Réessayer</button> : <button className="button button-secondary" type="button" onClick={close}>Terminer</button>}
      <small>Ce prototype ne contacte pas les équipes sanitaires. Pour une suspicion d’Ebola : appelez le 151.</small>
    </div>
  </div> : null;

  return { start, panel };
}
