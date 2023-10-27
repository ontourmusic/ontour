import React from "react";

/*
 */

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
      let r = 0,
        g = 0,
        b = 0;
      const totalPixels = img.width * img.height;

      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
      }

      r = Math.floor(r / totalPixels);
      g = Math.floor(g / totalPixels);
      b = Math.floor(b / totalPixels);

      resolve({ r, g, b });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

// // Example usage:
// const imageUrl = "https://example.com/image.jpg";
// getAverageColorFromImageUrl(imageUrl)
//   .then((averageColor) => console.log("Average color:", averageColor))
//   .catch((error) => console.error("Error:", error));

export default GetAverageColor;