"use client";

import { useEffect } from "react";

export function FlambeesRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return <div><p className="kicker accent">Nouvelle adresse</p><h1>La page s’appelle désormais Flambées.</h1><p><a className="button button-primary" href={href}>Ouvrir les flambées documentées</a></p></div>;
}
