import { ImageResponse } from "next/og";

export const alt = "Priscila, criadora de conteúdo UGC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#f8f3ed", color: "#292320", padding: "78px", position: "relative" }}><div style={{ position: "absolute", width: 480, height: 480, borderRadius: 999, background: "#e5c5bb", right: -80, top: -150, opacity: .65 }} /><div style={{ display: "flex", flexDirection: "column", maxWidth: 850 }}><span style={{ fontSize: 23, letterSpacing: 6, color: "#a35f50", textTransform: "uppercase" }}>Blog da Priscila</span><span style={{ fontFamily: "serif", fontSize: 82, lineHeight: 1.03, marginTop: 34 }}>Conteúdo autêntico que conecta marcas e pessoas</span><span style={{ fontSize: 26, color: "#746a65", marginTop: 34 }}>Criadora de conteúdo UGC</span></div></div>, size);
}
