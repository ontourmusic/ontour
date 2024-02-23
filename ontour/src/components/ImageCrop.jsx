import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import useDebounceEffect from "./useDebounceEffect";
import { CanvasPreview } from "./CanvasPreview";
import { createClient } from "@supabase/supabase-js";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCrop(props) {
  // console.log(props.originalImg,"img")
  
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(3.7 / 1);
  const supabase = createClient(
    "https://zouczoaamusrlkkuoppu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo"
  );

  const [imgSrc, setImgSrc] = useState(
    `https://digportfolio.com/cropimage/proxy.php?url=${props.originalImg}`
  );
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result ? reader.result.toString() : "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    console.log(imgRef.current.src, imgRef.current.type, "image in download");
    if (!image || !completedCrop) {
      throw new Error("Image or crop data is missing");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreenCanvas = document.createElement("canvas");
    const ctx = offscreenCanvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    offscreenCanvas.width = completedCrop.width;
    offscreenCanvas.height = completedCrop.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );
    try {
      offscreenCanvas.toBlob(async function (blob1) {
        console.log(blob1.type, "blob1");
        const fileType = blob1.type;
        const timestamp = Date.now();
        const fileName = `${props.artistID}-${timestamp}.${fileType.split("/")[1]}`;
        const res = await supabase.storage
          .from("crop-images")
          .upload(fileName, blob1);
        console.log(res, "response");
        if (res) {
          const { error } = await supabase
            .from("artists")
            .update({
              cropped_image: `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/crop-images/${fileName}`,
            })
            .eq("artist_id", props.artistID);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop &&
        completedCrop.width &&
        completedCrop.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        console.log(previewCanvasRef.current);
        CanvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );
  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="range"
            step="0.01"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="range"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </button>
        </div>
        <div>
          <button onClick={onDownloadCropClick}>Submit Cropped Image</button>
        </div>
      </div>
      

     
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          minHeight={100}
          minWidth={100}
          style={{ width: "50v", height: "50%" }}
        >
          <img
            

            // crossorigin="anonymous"
            crossOrigin="anonymous"
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)`,objectFit:'contain',height:'50%',width:'50%' }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
       
      {!!completedCrop && (
        <>
          <div style={{}}>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
            {/* <button onClick={onDownloadCropClick}>Download Crop</button> */}
            {/* <div style={{ fontSize: 12, color: '#666' }}>
              If you get a security error when downloading try opening the
              Preview in a new tab (icon near top right).
            </div> */}
          </div>
        </>
      )}
    </div>
  );
}
