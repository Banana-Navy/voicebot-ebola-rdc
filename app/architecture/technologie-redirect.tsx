"use client";

import { useEffect } from "react";

export function TechnologieRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return <div><p className="kicker accent">Nouvelle adresse</p><h1>La page s’appelle désormais Technologie.</h1><p><a className="button button-primary" href={href}>Ouvrir la page Technologie</a></p></div>;
}
