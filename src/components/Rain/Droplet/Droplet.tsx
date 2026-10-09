import type { CSSProperties } from "react";
import type { rainDropStyle } from "../rainTypes";
import "./droplet.css";

interface DropletProps {
  style?: CSSProperties;
  variant: rainDropStyle;
}

function Droplet({ style, variant }: DropletProps) {
  return <div className={`rain-drop rain-drop--${variant}`} style={style} />;
}

export default Droplet;
