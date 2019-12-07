import { Component, OnInit, NgZone, Input, HostListener, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts-port';

@Component({
  selector: 'app-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements OnInit, AfterViewInit {
  
  @ViewChild('renderCanvas', {static: false}) renderCanvas:ElementRef 

	private cube:THREE.Object3D;
	private axis:THREE.Object3D;
	private renderer:THREE.WebGLRenderer;
	private scene:THREE.Scene;
	private camera:THREE.Camera;

  ngAfterViewInit(): void {
    var scene = new THREE.Scene();
	  this.scene = scene;
			var camera = new THREE.PerspectiveCamera( 75, 1.0, 0.1, 1000 );
			this.camera = camera;
			var renderer = new THREE.WebGLRenderer();
			this.renderer = renderer;
			renderer.setSize( this.renderCanvas.nativeElement.offsetWidth,400);
			this.renderCanvas.nativeElement.appendChild( renderer.domElement );
			scene.add( new THREE.AmbientLight( 0xffffff ) );
			var light = new THREE.DirectionalLight( 0xffffff );
			light.position.set( 0, 1, 0 );
			scene.add( light );
			var map = new THREE.TextureLoader().load( '/assets/img/board-top-rotated.png' );
			map.wrapS = map.wrapT = THREE.RepeatWrapping;
			map.anisotropy = 16;
			var geometry = new THREE.BoxGeometry( 1.3, 0.05, 0.5 );
			//var material = new THREE.MeshBasicMaterial( { color: 0x4444aa } );
			var material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );
			var cube = new THREE.Mesh( geometry, material );
			this.cube = cube;
			var axis = new THREE.AxisHelper( 1000 );
			this.axis = axis;
			var helper = new THREE.GridHelper( 10, 10, 0x888888, 0x888888 );
			scene.add( helper );
			scene.add( cube,axis);

			camera.position.x = -2;
			camera.position.y = 1;

			var controls = new OrbitControls( camera, renderer.domElement );
			//controls.addEventListener( 'change', animate );
			//controls.maxPolarAngle = Math.PI / 2;
			//controls.enableZoom = true;
			//controls.enablePan = false;

		

			this.animate();
			//renderer.render(scene, camera);
  }

  
  animate() {

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // axis.rotation.x += 0.01;
    // axis.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  resizeCanvasToDisplaySize() {
    const canvas = this.renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
  
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
  
      // update any render target sizes here
    }
    this.animate();
  }

  ngOnInit() {
	  
  }

  DataPointUpdated(index:number):void{
    var data = null;
    if (data && data.boardReference){
      var localIndex:number = data.boardReference.rx.findIndex(p=>p.x>=data.boardReference.ax[index].x)
      if (localIndex === -1){
        localIndex = data.boardReference.rx.length;
	  }
	  var quaternion:THREE.Quaternion = new THREE.Quaternion(
		  
			data.boardReference.q1[localIndex].y,
			-data.boardReference.q3[localIndex].y,//this is our world z
			data.boardReference.q2[localIndex].y,
		  data.boardReference.q0[localIndex].y
		);
      this.cube.setRotationFromQuaternion(quaternion);
    }
    this.renderer.render(this.scene, this.camera);
  }

}