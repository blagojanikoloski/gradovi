import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Macedonia from '../components/Macedonia';
import Tooltip from '../components/Tooltip';

const LandingPage = () => {
  const [scene, setScene] = useState(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    setScene(scene);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.background = new THREE.Color( "rgb(245, 244, 230)" );

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const adjustCamera = () => {
      const scaleFactor = Math.min(window.innerWidth / 800, window.innerHeight / 800);
      camera.position.z = 100 / scaleFactor;
      controls.update();
    };

    adjustCamera();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      adjustCamera();
    };
    renderer.domElement.addEventListener('resize', handleResize);

    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    renderer.domElement.addEventListener('mousemove', handleMouseMove);


    const tooltip = document.createElement('div');
    document.body.appendChild(tooltip);

    const handleClick = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        
        if (clickedObject.userData.name) {
          const cityName = clickedObject.userData.nameCyrillic;
          const content = "Влези во " + cityName + "?";
          setTooltipContent(content);
          setTooltipVisible(true);
        }
      } else {
        setTooltipVisible(false);
      }
    };
    // Attach the click event listener to the renderer's DOM element
    renderer.domElement.addEventListener('click', handleClick);
    

    // Model size (already determined)
    const modelSize = { x: 120, y: 94.18, z: 6.82 };
    // Real-world coordinates for the center of Macedonia (approximate)
    const centerLat = 41.55;
    const centerLon = 21.5853;
    // Latitude and longitude range for Macedonia
    const latRange = 1.53;  // Approximate latitude range of Macedonia
    const lonRange = 2.6;  // Approximate longitude range of Macedonia
    // Coordinates for the cities
    const cities= {
      Skopje: { lat: 41.9981, lon: 21.4254, nameCyrillic: "Скопје" },
      Bitola: { lat: 41.0297, lon: 21.3292 , nameCyrillic: "Битола" },
      Ohrid: { lat: 41.1231, lon: 20.8016 , nameCyrillic: "Охрид" },
      Veles: { lat: 41.7797, lon: 21.7376 , nameCyrillic: "Велес" },
      Kumanovo: { lat: 42.1322, lon: 21.7144 , nameCyrillic: "Куманово" },
      Prilep: { lat: 41.3441, lon: 21.5528 , nameCyrillic: "Прилеп" },
      Strumica: { lat: 41.4378, lon: 22.6427 , nameCyrillic: "Струмица" },
      Tetovo: { lat: 42.0069, lon: 20.9715 , nameCyrillic: "Тетово" },
      Gostivar: { lat: 41.8026, lon: 20.9089 , nameCyrillic: "Гостивар" },
      Kocani: { lat: 41.9168, lon: 22.4083 , nameCyrillic: "Кочани" },
      Struga: { lat: 41.1778, lon: 20.6783 , nameCyrillic: "Струга" },
      Gevgelija: { lat: 41.1452, lon: 22.4997 , nameCyrillic: "Гевгелија" },
      Debar: { lat: 41.5198, lon: 20.5289 , nameCyrillic: "Дебар" },
      Berovo: { lat: 41.7061, lon: 22.8552 , nameCyrillic: "Берово" },
      Vinica: { lat: 41.8833, lon: 22.5081 , nameCyrillic: "Виница" },
      Valandovo: { lat: 41.3170, lon: 22.5618 , nameCyrillic: "Валандово" },
      Shtip: { lat: 41.7464, lon: 22.1997 , nameCyrillic: "Штип" },
      SvetiNikole: { lat: 41.8656, lon: 21.9373 , nameCyrillic: "Свети Николе" },
      Resen: { lat: 41.0903, lon: 21.0133 , nameCyrillic: "Ресен" },
      Radovish: { lat: 41.6395, lon: 22.4679 , nameCyrillic: "Радовиш" },
      Probishtip: { lat: 41.9948, lon: 22.1877 , nameCyrillic: "Пробиштип" },
      Pehchevo: { lat: 41.7621, lon: 22.8865 , nameCyrillic: "Пехчево" },
      Negotino: { lat: 41.4829, lon: 22.0923 , nameCyrillic: "Неготино" },
      MakedonskaKamenica: { lat: 42.0214, lon: 22.5871 , nameCyrillic: "Македонска Каменица" },
      MakedonskiBrod: { lat: 41.5133, lon: 21.2174 , nameCyrillic: "Македонски Брод" },
      Krushevo: { lat: 41.3706, lon: 21.2502 , nameCyrillic: "Крушево" },
      KrivaPalanka: { lat: 42.2058, lon: 22.3308 , nameCyrillic: "Крива Паланка" },
      Kratovo: { lat: 42.0800, lon: 22.1803 , nameCyrillic: "Кратово" },
      Kichevo: { lat: 41.5129, lon: 20.9525 , nameCyrillic: "Кичево" },
      DemirHisar: { lat: 41.2214, lon: 21.2025 , nameCyrillic: "Демир Хисар" },
      DemirKapija: { lat: 41.4088, lon: 22.2436 , nameCyrillic: "Демир Капија" },
      Delchevo: { lat: 41.9709, lon: 22.7740 , nameCyrillic: "Делчево" },
      Bogdanci: { lat: 41.2031, lon: 22.5754 , nameCyrillic: "Богданци" },
      Kavadarci: { lat: 41.4329, lon: 22.0089 , nameCyrillic: "Кавадарци" },
      Dojran: { lat: 41.1811, lon: 22.7227 , nameCyrillic: "Дојран" }
    };


    // Conversion function: map lat/lon to 3D coordinates
    const latLonTo3DCoords = (lat, lon, modelSize, centerLat, centerLon, latRange, lonRange) => {
      // Calculate offsets from the center
      const latOffset = (lat - centerLat) / latRange * modelSize.y;
      const lonOffset = (lon - centerLon) / lonRange * modelSize.x;
      // Adjust offsets to fit the model
      const x = lonOffset-6.8;
      const y = latOffset-3.3;

      return { x, y, z: 3.5 };
    };

    Object.entries(cities).forEach(([cityName, { lat, lon, nameCyrillic }]) => {
      const coords = latLonTo3DCoords(lat, lon, modelSize, centerLat, centerLon, latRange, lonRange);

      const geometry = new THREE.BoxGeometry(3, 3, 3);
      const material = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.set(coords.x, coords.y, coords.z);
      cube.userData.name = cityName;
      cube.userData.nameCyrillic = nameCyrillic; 
      scene.add(cube);
    });

    return () => {
      renderer.domElement.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
      document.body.removeChild(tooltip);
    };
  }, []);

  const handleCloseTooltip = () => {
    setTooltipVisible(false);
  };

  const handleAcceptTooltip = () => {
    alert("WOO");
  };

  return (
    <div>
      <div className="choose-city">Одбери град</div>
      {scene && <Macedonia scene={scene} />}
      <Tooltip 
      content={tooltipContent} 
      visible={tooltipVisible}
      onClose={handleCloseTooltip}
      onAccept={handleAcceptTooltip} />
    </div>
  );
};

export default LandingPage;
