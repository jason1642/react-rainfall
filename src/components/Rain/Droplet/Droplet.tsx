import type { dropletColor } from "../rainTypes";
import type { CSSProperties } from "react";
import "./droplet.css";

interface DropletProps {
  dropletColor: dropletColor;
  style?: CSSProperties;
}

function Droplet({ dropletColor }: DropletProps) {
  return (
    <div className="rain-droplet" style={{ backgroundColor: dropletColor }} />
  );
}

export default Droplet;
