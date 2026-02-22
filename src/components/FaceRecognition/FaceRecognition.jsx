export default function FaceRecognition({url}) {
  return (
    <section>
        {url &&
            <div className="flex justify-center w-full h-76 mt-5">
                <img src={url} alt="image with faces" />
            </div>
        }
    </section>
  )
}
