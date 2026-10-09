import type { CSSProperties } from "react";
import "./impact.css";

interface DropImpactProps {
  style?: CSSProperties;
}

function DropImpact({ style }: DropImpactProps) {
  return <div className="rain-drop-impact" style={style} />;
}

export default DropImpact;
