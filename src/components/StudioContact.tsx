"use client";
import { useState } from "react";
import { toast } from "sonner";
import { STUDIO } from "@/lib/studio";

// No backend needed: the form composes an email to the studio in the visitor's mail app.
export function StudioContact() {
  const [pkg, setPkg] = useState(STUDIO.packages[1].name);
  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const subject = `Website enquiry: ${pkg}`;
        const body = [
          `Name: ${f.get("name")}`,
          `Studio / brand: ${f.get("studio") || "-"}`,
          `Discipline: ${f.get("discipline") || "-"}`,
          `Package: ${pkg}`,
          `Timeline: ${f.get("timeline")}`,
          "",
          `${f.get("message") || ""}`,
        ].join("\n");
        window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        toast("Opening your email app", { description: `If nothing opens, write to ${STUDIO.email}` });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field"><label htmlFor="s-name">Your name</label><input id="s-name" name="name" required autoComplete="name" /></div>
        <div className="field"><label htmlFor="s-studio">Studio or brand</label><input id="s-studio" name="studio" autoComplete="organization" /></div>
        <div className="field"><label htmlFor="s-disc">What you design</label><input id="s-disc" name="discipline" placeholder="Interiors, jewellery, footwear…" /></div>
        <div className="field">
          <label htmlFor="s-time">When do you need it?</label>
          <select id="s-time" name="timeline" defaultValue="This quarter">
            <option>As soon as possible</option>
            <option>This quarter</option>
            <option>Just exploring</option>
          </select>
        </div>
      </div>
      <fieldset className="grid gap-2">
        <legend className="label mb-2">Package</legend>
        <div className="flex flex-wrap gap-2">
          {STUDIO.packages.map((p) => (
            <button key={p.name} type="button" className="chip" aria-pressed={pkg === p.name} onClick={() => setPkg(p.name)}>{p.name}</button>
          ))}
        </div>
      </fieldset>
      <div className="field"><label htmlFor="s-msg">Tell me about your work</label><textarea id="s-msg" name="message" placeholder="Links to your Instagram or current site help a lot." /></div>
      <button type="submit" className="btn btn-primary w-fit">Write to {STUDIO.short}</button>
    </form>
  );
}
