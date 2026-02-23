export default function Signin({onRouteChange}) {
  return (
    <article className="rounded-sm border border-black/10 text-gray-700 my-8 w-full md:w-1/2 lg:w-1/4 max-w-xs mx-auto">
        <main className="p-8 text-black/80">
            <div className="max-w-md mx-auto">
                <fieldset id="sign_up" className="border-transparent p-0 m-0">
                    <legend className="text-xl font-semibold p-0 m-0">Sign In</legend>
                    <div className="mt-4">
                        <label className="block font-semibold leading-relaxed text-sm" htmlFor="email-address">Email</label>
                        <input className="p-2 bg-transparent border border-black w-full hover:bg-black hover:text-white transition-colors outline-none" type="email" name="email-address" id="email-address" />
                    </div>
                    <div className="my-4">
                        <label className="block font-semibold leading-relaxed text-sm" htmlFor="password">Password</label>
                        <input className="font-bold p-2 bg-transparent border border-black w-full hover:bg-black hover:text-white transition-colors outline-none" type="password" name="password" id="password" />
                    </div>
                </fieldset>
                <div className="mt-4">
                    <input className="font-bold px-4 py-2 border border-black bg-transparent hover:scale-105 transition-transform cursor-pointer text-sm inline-block"
                           onClick={() => onRouteChange('home')}
                           type="submit" 
                           value="Sign in" />
                </div>
                <div className="leading-relaxed mt-4">
                    <p  onClick={() => onRouteChange('register')} className="text-sm no-underline opacity-100 hover:opacity-80 text-black block cursor-pointer">Register</p>
                </div>
            </div>
        </main>
    </article>
  )
}
