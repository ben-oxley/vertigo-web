import { Component, OnInit, NgZone, Input, HostListener, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts';

@Component({
  templateUrl: 'threed.component.html'
})

export class ThreeDComponent implements OnInit {
@ViewChild('renderCanvas') renderCanvas; 


  ngOnInit() {
      var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, 1.0, 0.1, 1000 );
			
			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( this.renderCanvas.nativeElement.offsetWidth,800);
			this.renderCanvas.nativeElement.appendChild( renderer.domElement );
			scene.add( new THREE.AmbientLight( 0xffffff ) );
			var light = new THREE.DirectionalLight( 0xffffff );
			light.position.set( 0, 1, 0 );
			scene.add( light );
			var map = new THREE.TextureLoader().load( '/assets/img/board-top.png' );
			map.wrapS = map.wrapT = THREE.RepeatWrapping;
			map.anisotropy = 16;
			var geometry = new THREE.BoxGeometry( 0.5, 1.3, 0.05 );
			//var material = new THREE.MeshBasicMaterial( { color: 0x4444aa } );
			var material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );
			var cube = new THREE.Mesh( geometry, material );
			var axis = new THREE.AxisHelper( 1 );
			var helper = new THREE.GridHelper( 10, 2, 0xffffff, 0xffffff );
			scene.add( helper );
			scene.add( cube,axis);

			camera.position.z = 2;

			var controls = new OrbitControls( camera, renderer.domElement );
			controls.addEventListener( 'change', animate );
			//controls.maxPolarAngle = Math.PI / 2;
			controls.enableZoom = false;
			controls.enablePan = false;

			var animate = function () {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				axis.rotation.x += 0.01;
				axis.rotation.y += 0.01;

				renderer.render(scene, camera);
			};

			animate();
  }

}
