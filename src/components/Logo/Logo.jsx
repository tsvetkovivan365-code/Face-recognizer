import eye from '../assets/eye-scan-svgrepo-com.svg'
export default function Logo() {
    return (
        <div className='m-4 mt-0 p-4'>
            <img src={eye} alt="eye icon" className='w-28 from-red-400 to-blue-700 via-olive-300 bg-linear-to-r' />
        </div>
    )
}