import type { CSSProperties } from "react";
import "./droplet.css";

interface DropletProps {
  style?: CSSProperties;
}

function Droplet({ style }: DropletProps) {
  return <div className="rain-drop" style={style} />;
}

export default Droplet;
