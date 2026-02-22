export default function ImageLinkForm({ onInputChange, onSubmit }) {
  return (
    <section className="flex flex-col items-center justify-center mt-15 mx-5">
        <p className="text-2xl p-3 text-purple-700 dark:text-purple-800 sm:text-4xl">
            This special eye can detect faces in your pictures
        </p>
        <div className="flex flex-col justify-center items-center gap-1.5">
            <input onChange={onInputChange} type="text" className="sm:text-3xl rounded-2xl px-2 py-3 w-90 hover:border-blue-300 sm:w-130 border-blue-400 border-2 focus:border-3 transition duration-200 ease focus:border-blue-400" placeholder="Type here..."/>
            <button onClick={onSubmit} className="w-48 text-white py-3 px-8 rounded-3xl bg-purple-700 dark:bg-purple-800 hover:scale-104 transition duration-150 ease-linear">Detect</button>
        </div>
    </section>
  )
}
