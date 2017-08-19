import { Component, OnInit, NgZone, Input, HostListener, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {ElementRef,Renderer2} from '@angular/core';
import { Data,CalculatedData } from '../shared/data';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as THREE from 'three'
@Component({
  templateUrl: 'threed.component.html'
})

export class ThreeDComponent implements OnInit {
@ViewChild('renderCanvas') renderCanvas; 

  ngOnInit() {
      var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, 1.0, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( 400,400 );
			this.renderCanvas.nativeElement.appendChild( renderer.domElement );

			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			var animate = function () {
				requestAnimationFrame( animate );

				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;

				renderer.render(scene, camera);
			};

			animate();
  }

}
