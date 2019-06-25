import * as THREE from 'three';
import * as FBXLoader from 'three-fbx-loader';

export default scene => {
    const fbxLoader = new FBXLoader();
    const group = new THREE.Group();
    const assetsPath = '/wp-content/plugins/planet4-gutenberg-experiments/public/';

    var textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    textureLoader.load(assetsPath + 'models/Sunrise.jpg', function (texture) {
        fbxLoader.load(assetsPath + 'models/Sunrise.fbx', function ( object ) {
            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // apply texture
                    child.material.map = texture
                    child.material.needsUpdate = true;
                }
            } );
            group.add( object );
        } );
    });

    group.scale.x = 4;
    group.scale.y = 4;
    group.scale.z = 4;

    scene.add(group);

    const speed = 0.5;

    function update(time) {
        const angle = time * speed;
        group.rotation.y = angle;
    }

    return {
        update
    }
}