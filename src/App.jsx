import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import { useMemo, useEffect} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import { loadAll } from '@tsparticles/all';

function App() {


  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadAll(engine);
      //await loadBasic(engine);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "",
        },
      },
      fpsLimit: 220,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 15,
          },
          repulse: {
            distance: 2,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 15,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "triangle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  

  return (
    <section className='h-screen from-red-400 to-blue-700 via-olive-300 bg-linear-to-r'>
      <Particles
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    </section>
  )
}

export default App
