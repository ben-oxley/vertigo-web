import { Component, OnInit, NgZone, Input, HostListener, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData, DataPointListener } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ControlsComponent } from "app/shared/controls.component";
import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  templateUrl: 'threed.component.html'
})

export class ThreeDComponent implements OnInit , DataPointListener  {
@ViewChild('renderCanvas') renderCanvas; 

	private cube:THREE.Object3D;
	private axis:THREE.Object3D;
	private renderer:THREE.WebGLRenderer;
	private scene:THREE.Scene;
	private camera:THREE.Camera;

  ngOnInit() {
	  ControlsComponent.Instance.registerDataPointListener(this);
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
			controls.addEventListener( 'change', animate );
			//controls.maxPolarAngle = Math.PI / 2;
			controls.enableZoom = true;
			controls.enablePan = false;

			var animate = function () {
				requestAnimationFrame( animate );

				// cube.rotation.x += 0.01;
				// cube.rotation.y += 0.01;
				// axis.rotation.x += 0.01;
				// axis.rotation.y += 0.01;

				renderer.render(scene, camera);
			};

			animate();
			//renderer.render(scene, camera);
  }

  DataPointUpdated(index:number):void{
    var data = ControlsComponent.Instance.getData();
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
