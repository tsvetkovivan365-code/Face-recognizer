import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';

function App() {
  return (
    <section className='form h-screen'>
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </section>
  )
}

export default App
