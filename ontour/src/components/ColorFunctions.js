function GetAverageColor(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, img.width, img.height).data;
            let r = 0, g = 0, b = 0, totalWeight = 0;
            const totalPixels = img.width * img.height;

            for (let i = 0; i < imageData.length; i += 8) {
                const pixelR = imageData[i];
                const pixelG = imageData[i + 1];
                const pixelB = imageData[i + 2];

                if (!isBrownOrBlack(pixelR, pixelG, pixelB)) {
                    const { s, l } = rgbToHsl(pixelR, pixelG, pixelB);
                    const weight = (s + l) / 2; // Calculate the weight based on saturation and lightness

                    r += pixelR * weight;
                    g += pixelG * weight;
                    b += pixelB * weight;
                    totalWeight += weight;
                }
            }
            if (totalWeight > 0) {
                r /= totalWeight;
                g /= totalWeight;
                b /= totalWeight;
            }

            resolve({ r, g, b });
        };

        img.onerror = () => {
            reject(new Error("Failed to load image"));
        };
    });
}
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}
function isBrownOrBlack(r, g, b) {
    const hsl = rgbToHsl(r, g, b);
    const { h, s, l } = hsl;
    // Adjust the conditions below to fine-tune the color filtering
    return (h >= 20 && h <= 60 && s >= 20 && l <= 50) || l <= 15;
}
function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? "0" + hex : hex
    }).join("")
}
function getRGB(c) {
    return parseInt(c, 16) || c
}
function getsRGB(c) {
    return getRGB(c) / 255 <= 0.03928
        ? getRGB(c) / 255 / 12.92
        : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
}
function getLuminance(hexColor) {
    return (
        0.2126 * getsRGB(hexColor.substr(1, 2)) +
        0.7152 * getsRGB(hexColor.substr(3, 2)) +
        0.0722 * getsRGB(hexColor.substr(-2))
    )
}
function getContrast(f, b) {
    const L1 = getLuminance(f)
    const L2 = getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}
function getTextColor(bgColor) {
    const whiteContrast = getContrast(bgColor, '#ffffff')
    const blackContrast = getContrast(bgColor, '#000000')

    return whiteContrast > blackContrast ? '#ffffff' : '#000000'
}

export { GetAverageColor, rgbToHex, getTextColor };