import  { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Macedonia = ({ scene }) => {
  useEffect(() => {

    const loader = new GLTFLoader();
    loader.load('macedoniawithregions.glb', (gltf) => {
      
      const model = gltf.scene;
      model.position.set(0, 0, 0);
      scene.add(model);

    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });
  }, [scene]);

  return null; 
};

export default Macedonia;
