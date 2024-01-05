import GitIcon from '../assets/github.svg'

export default function Footer() {
  return (
    <div className='flex justify-center my-5'>
      <a className='w-fit hover:underline hover:opacity-80 flex items-center gap-2 text-text' href='https://github.com/sahil053' rel='noreferrer' target='_blank'>
        <img src={GitIcon} alt='Github' />
        <p className='text-sm'>Sahil Singh</p>
      </a>
    </div>
  )
}
