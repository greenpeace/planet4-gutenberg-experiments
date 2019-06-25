import * as THREE from 'three'

export default scene => {    
    const lightIn = new THREE.PointLight("#f0f0f0", 2);
    const lightOut = new THREE.PointLight("#002299", 1);
    const ambient = new THREE.AmbientLight( 0x404040 )

    lightIn.position.set(-30, 20, -10);
    lightOut.position.set(30, 20, -10);

    lightIn.castShadow = true;
    lightOut.castShadow = true;

    scene.add(ambient);
    scene.add(lightIn);
    scene.add(lightOut);

    const rad = 80;

    function update(time) {
        const x = rad * Math.sin(time*0.2)
        // lightOut.position.x = x;
    }

    return {
        update
    }
}