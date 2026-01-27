import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef } from "react";

interface QrCodeGeneratorProps {
    data: any;
    label?: string;
    size?: number;
}

export default function QrCodeGenerator({ data, label, size = 128 }: QrCodeGeneratorProps) {
    const encodedData = JSON.stringify(data);
    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQr = () => {
        const svg = qrRef.current?.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = size + 40; // Add padding
            canvas.height = size + 60; // Add padding + label space
            if (!ctx) return;

            // Draw white background
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR code
            ctx.drawImage(img, 20, 20);

            // Draw Label
            if (label) {
                ctx.font = "bold 12px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText(label, canvas.width / 2, canvas.height - 15);
            }

            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = `QR-${label || "code"}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <div className="flex flex-col items-center gap-3 p-4 border rounded-xl bg-white shadow-sm inline-block">
            <div ref={qrRef} className="bg-white p-2">
                <QRCodeSVG value={encodedData} size={size} level="H" includeMargin={true} />
            </div>
            {label && <p className="text-xs font-bold text-gray-700">{label}</p>}
            <Button
                size="sm"
                variant="outline"
                onClick={downloadQr}
                className="w-full text-xs h-8 flex items-center gap-1"
            >
                <Download className="w-3 h-3" /> Save PNG
            </Button>
        </div>
    );
}
