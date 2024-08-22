// src/components/Macedonia.js

import React, { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

const Macedonia = ({ scene }) => {
  useEffect(() => {

    const loader = new GLTFLoader();
    //ImageToStl.com_macedoniawithcities.gltf
    loader.load('macedoniawithregions.gltf', (gltf) => {
      const model = gltf.scene;
      model.position.set(0, 0, 0); // Center the model
      scene.add(model);

      const boundingBox = new THREE.Box3().setFromObject(model);
      const size = boundingBox.getSize(new THREE.Vector3());

    }, undefined, (error) => {
      console.error('An error occurred while loading the model:', error);
    });
  }, [scene]);

  return null; 
};

export default Macedonia;
