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
import { Spinner } from "react-bootstrap";
import { Box, Icon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { heightRatio, widthRatio } from "../constants/constants";
import { base64ImgToBlob } from "../common_functions/common_functions";

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
function centerAspectCrop1(mediaWidth, mediaHeight, aspect) {
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
  const [browseImg, setBrowseImg] = useState(false);
  const previewCanvasRef = useRef(null);
  const previewCanvasRef1 = useRef(null);
  const imgRef = useRef(null);
  const imgRef1 = useRef(null);
  const [crop, setCrop] = useState();
  const [crop1, setCrop1] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [completedCrop1, setCompletedCrop1] = useState();
  const [scale, setScale] = useState(1);
  const [scale1, setScale1] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [rotate1, setRotate1] = useState(0);
  const [aspect, setAspect] = useState(widthRatio / heightRatio);
  const [aspect1, setAspect1] = useState(widthRatio / heightRatio);
  const [status, setStatus] = useState(false);
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
      reader.addEventListener("load", () => {
        setImgSrc(reader.result ? reader.result.toString() : "");
        setBrowseImg(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  async function storeBrowseImg() {
    try {
      setStatus(true);
      console.log(imgSrc, "imgSrc");
      console.log(base64ImgToBlob(imgSrc), "blob");
      const blobImg = base64ImgToBlob(imgSrc);
      const fileType = blobImg.type;
      console.log(fileType, "fileType");
      const fileName = `${props.artistID}-banner-original.${
        fileType.split("/")[1]
      }`;
      console.log(fileName, "fileName");
      const res = await supabase.storage
        .from("new-banner-image")
        .upload(fileName, blobImg,{upsert:true});
      console.log(res, "response");
      if (res) {
        const { error } = await supabase
          .from("artists")
          .update({
            banner_image: `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/new-banner-image/${fileName}`,
          })
          .eq("artist_id", props.artistID);
        if (!error) {
         console.log("new banner image added")
         return `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/new-banner-image/${fileName}`;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function onDownloadCropClick() {
    const image = imgRef.current;
    console.log(image, completedCrop);
    let newOrgImg = "";
    if(browseImg){
      newOrgImg = await storeBrowseImg();
    } 
    // return;
    // console.log(imgRef.current.src, imgRef.current.type, "image in download");
    if (!image || !completedCrop) {
      throw new Error("Image or crop data is missing");
    }
    // if (!image || !completedCrop1) {
    //   throw new Error("Image or crop data is missing");
    // }
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
        const fileName = `${props.artistID}-banner-crop.${
          fileType.split("/")[1]
        }`;
        setStatus(true);
        const res = await supabase.storage
          .from("crop-images")
          .upload(fileName, blob1,{upsert:true});
        console.log(res, "response");
        if (res) {
          const { error } = await supabase
            .from("artists")
            .update({
              cropped_image: `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/crop-images/${fileName}`,
            })
            .eq("artist_id", props.artistID);
          if (!error) {
            props.changeBannerImage(
              `https://zouczoaamusrlkkuoppu.supabase.co/storage/v1/object/public/crop-images/${fileName}`,newOrgImg
            );
            setStatus(false);
            props.setOpenCropModal(false);
            alert("Banner Image Updated Successfully");
          }
        }
      });
    } catch (error) {
      setStatus(false);
      props.setOpenCropModal(false);
      alert("Could not update banner Image");
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
  
  

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100vw",
          height: "100vh",
          // backgroundColor: "yellow",
          backgroundColor: "white",
          padding: "10px",
        }}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        // position={"relative"}
        // justifyContent={"space-between"}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "10px",
            // backgroundColor : "red"
          }}
        >
          {/* <div> */}
          <input type="file" accept="image/*" onChange={onSelectFile} />
          {/* <label htmlFor="rotate-input">Rotate: </label> */}
          {/* <input
                  id="rotate-input"
                  type="range"
                  value={rotate}
                  disabled={!imgSrc}
                  onChange={(e) =>
                    setRotate(
                      Math.min(180, Math.max(-180, Number(e.target.value)))
                    )
                  }
                />
          <label htmlFor="scale-input">Scale: </label>
                <input
                  id="scale-input"
                  type="range"
                  step="0.01"
                  value={scale}
                  disabled={!imgSrc}
                  onChange={(e) => setScale(Number(e.target.value))}
                /> */}
          {!!status ? (
            <Spinner animation="border" variant="secondary" size="xl" />
          ) : (
            <button className="btn btn-dark" onClick={onDownloadCropClick}>
              Submit Cropped Image
            </button>
          )}
          {/* </div> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "black",
              paddingLeft: "10px",
              paddingRight: "10px",
              marginLeft: "10px",
            }}
          >
            <FontAwesomeIcon
              cursor={"pointer"}
              size="lg"
              icon={faXmark}
              color="white"
              onClick={() => {
                props.setOpenCropModal(false);
                setBrowseImg(false);
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            // height: "50vh",
            // width: "100vw",
            // backgroundColor: "blue",
          }}
        >
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              locked={true}
              keepSelection={true}
              maxHeight={1000}
              minWidth={1920}
              minHeight={1000}
              maxWidth={1920}
              // style={{ backgroundColor: "green" }}
            >
              <img
                crossOrigin="anonymous"
                ref={imgRef}
                src={imgSrc}
                style={{
                  height: "90vh",
                  width: "100vw",
                  objectFit: "contain",
                  transform: `scale(${scale}) rotate(${rotate}deg)`,
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "blue",
              height: "50vh",
              width: "50vw",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* {!!completedCrop && (
              <div
                style={{
                  // width: "50vw",
                  // height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
            )} */}
          </div>
        </div>
      </Box>
    </>
  );
}
