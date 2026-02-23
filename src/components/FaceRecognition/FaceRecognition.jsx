export default function FaceRecognition({imageURL, box}) {
  return (
    <section>
        {imageURL &&
            <div className="flex justify-center w-full h-76 mt-5">
                <img id="inputImage" src={imageURL} alt="image with faces" />
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        }
    </section>
  )
}
