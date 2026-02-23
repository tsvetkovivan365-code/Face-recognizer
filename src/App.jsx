import Navigation from './components/Navigation/Navigation.jsx';
import Logo from './components/Logo/Logo.jsx';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.jsx';
import Rank from './components/Rank/Rank.jsx';
import Signin from './components/Signin/Signin.jsx';
import Register from './components/Register/Register.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.jsx';
import { useMemo, useEffect, useState} from "react";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import { loadAll } from '@tsparticles/all';

export default function App() {
  const [input, setInput] = useState();
  const [imageURL, setImageURL] = useState();
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Setting input event handler
  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  // Function for extracting the face's coordinates
  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col.toFixed(3) * width,
      topRow: clarifaiFace.top_row.toFixed(3) * height,
      rightCol: clarifaiFace.right_col.toFixed(3) * width,
      bottomRow: clarifaiFace.bottom_row.toFixed(3) * height
    }
  }

  // Function for storing the face's coordinates in state
  const displayFaceBox = (box) => {
    setBox({box: box});
  }

  // Setting submit event handler
  const onSubmit = () => {
    setImageURL(input);

    const PAT = import.meta.env.VITE_PAT;
    const USER_ID = import.meta.env.VITE_USER_ID;
    const APP_ID = import.meta.env.VITE_APP_ID;
    
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = import.meta.env.VITE_MODEL_VERSION_ID;
;
    const IMAGE_URL = imageURL;

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

            displayFaceBox(calculateFaceLocation(result));

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

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }

    setRoute(route);
  }

  return (
    <section className='h-screen from-red-400 to-blue-700 via-olive-300 bg-linear-to-r'>
      <Particles
        particlesLoaded={particlesLoaded}
        options={options}
      />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn}/>
      {route === 'home' 
        ? <>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </>
        : (
          route === 'signin' 
            ? <Signin onRouteChange={onRouteChange} />
            : <Register onRouteChange={onRouteChange} />
        )
      }
    </section>
  )
}
