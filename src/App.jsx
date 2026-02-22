import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import { useMemo, useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import { loadAll } from '@tsparticles/all';

export default function App() {
  const [input, setInput] = useState();
  const [url, setURL] = useState();

  // Setting input event handler
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Setting submit event handler
  const onSubmit = () => {
    setURL(input);

    const PAT = import.meta.env.VITE_PAT;
    const USER_ID = import.meta.env.VITE_USER_ID;
    const APP_ID = import.meta.env.VITE_APP_ID;
    
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = import.meta.env.VITE_MODEL_VERSION_ID;
;
    const IMAGE_URL = url;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                        // "base64": IMAGE_BYTES_STRING
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // Switch to the scoped URL format
    fetch("/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status.code !== 10000) {
                console.error("Clarifai API Error:", result.status.description);
                console.log("Full Result:", result);
                return;
            }

            const regions = result.outputs[0].data.regions;

            regions.forEach(region => {
                // Accessing and rounding the bounding box values
                const boundingBox = region.region_info.bounding_box;
                const topRow = boundingBox.top_row.toFixed(3);
                const leftCol = boundingBox.left_col.toFixed(3);
                const bottomRow = boundingBox.bottom_row.toFixed(3);
                const rightCol = boundingBox.right_col.toFixed(3);

                region.data.concepts.forEach(concept => {
                    // Accessing and rounding the concept value
                    const name = concept.name;
                    const value = concept.value.toFixed(4);

                    console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                    
                });
            });

        })
        .catch(error => console.log('error', error));

  }

  // Run effect only once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine);
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
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition url={url}/>
    </section>
  )
}
