"use client";
import { useState } from "react";
import { toast } from "sonner";
import { MorphButton, type MorphState } from "./MorphButton";

export function BriefForm({ designerName, prompts, workTitle }: { designerName: string; prompts: string[]; workTitle?: string }) {
  const first = designerName.split(" ")[0];
  const [msg, setMsg] = useState("");
  const [state, setState] = useState<MorphState>("idle");

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        setState("busy");
        setTimeout(() => {
          setState("done");
          toast.success(`Brief ready for ${designerName}`, {
            description: "Demo mode: messaging switches on once a backend is connected, so nothing was sent.",
          });
          setTimeout(() => setState("idle"), 2200);
        }, 700);
      }}
    >
      <p className="label">Brief {first}</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button key={p} type="button" className="chip" aria-pressed={msg === p} onClick={() => setMsg(p)}>
            {p}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="field"><label htmlFor="b-name">Name</label><input id="b-name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="b-email">Email</label><input id="b-email" type="email" required autoComplete="email" /></div>
        <div className="field">
          <label htmlFor="b-budget">Budget</label>
          <select id="b-budget" defaultValue="mid">
            <option value="low">Under ₹50,000</option>
            <option value="mid">₹50,000 – ₹2,00,000</option>
            <option value="high">₹2,00,000 – ₹10,00,000</option>
            <option value="top">Above ₹10,00,000</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="b-when">Start</label>
          <select id="b-when" defaultValue="soon">
            <option value="now">This month</option>
            <option value="soon">In 1–3 months</option>
            <option value="flex">Flexible</option>
          </select>
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="b-msg">What do you want made?</label>
          <textarea id="b-msg" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={workTitle ? `Something like ${workTitle}, for…` : "Tell them about the project"} />
        </div>
      </div>
      <div className="flex justify-end">
        <MorphButton state={state} idle="Send brief" busy="Sending" done="Brief ready" />
      </div>
    </form>
  );
}
