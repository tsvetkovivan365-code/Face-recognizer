export default function Navigation({onRouteChange, isSignedIn}) {
    if (isSignedIn) {
        return (
            <>
                <nav className="flex flex-row-reverse">
                    <p onClick={() => onRouteChange('signout')} className="text-purple-900 p-4 underline text-3xl sm:text-4xl cursor-pointer">Sign Out</p>
                </nav>
            </>
        )
    } else {
        return (
            <>
                <nav className="flex flex-row-reverse">
                    <p onClick={() => onRouteChange('signin')} className="text-purple-900 p-4 underline text-3xl sm:text-4xl cursor-pointer">Sign In</p>
                    <p onClick={() => onRouteChange('register')} className="text-purple-900 p-4 underline text-3xl sm:text-4xl cursor-pointer">Register</p>
                </nav>
            </>
        )
    }
}