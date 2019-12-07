import { Component, OnInit, NgZone, Input, HostListener, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts-port';
let STLLoader = require('three-stl-loader')(THREE);


@Component({
    selector: 'app-orientation',
    templateUrl: './orientation.component.html',
    styleUrls: ['./orientation.component.scss']
})
export class OrientationComponent implements OnInit, AfterViewInit, OnChanges {



    @ViewChild('renderCanvas', { static: false }) renderCanvas: ElementRef;

    private cube: THREE.Object3D;
    private axis: THREE.Object3D;
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;

    public constructor(private zone: NgZone) {

    }


    ngAfterViewInit(): void {
        const scene = new THREE.Scene();
        this.scene = scene;
        const camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
        this.camera = camera;
        const renderer = new THREE.WebGLRenderer();
        this.renderer = renderer;
        // renderer.setSize(this.renderCanvas.nativeElement.offsetWidth, 400);
        this.renderCanvas.nativeElement.appendChild(renderer.domElement);
        scene.add(new THREE.AmbientLight(0xffffff));
        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, -1,-1);
        scene.add(light);
        const map = new THREE.TextureLoader().load('/assets/mesh/case.stl');
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        let loader = new STLLoader();
        // loader.load('/assets/mesh/case.stl', function (geometry) {
        // 	let material = new THREE.MeshLambertMaterial({ map, side: THREE.DoubleSide });
        // 	var mesh = new THREE.Mesh(geometry, material)
        // 	// this.cube = mesh;
        // 	scene.add(mesh)
        //   })
        let _this:OrientationComponent = this;
        loader.load('/assets/mesh/case.stl', function (geometry) {

            let material = new THREE.MeshPhongMaterial({ color: 0x27cfbe, specular: 0x111111, shininess: 500 });
            let mesh = new THREE.Mesh(geometry, material);

            //mesh.rotation.set(- Math.PI / 2, 0, - Math.PI / 2);
            mesh.scale.set(0.01, 0.01, 0.01);

            mesh.castShadow = true;
            mesh.receiveShadow = true;

            scene.add(mesh);
            _this.cube = mesh;
            
        });
        // var material = new THREE.MeshBasicMaterial( { color: 0x4444aa } );

        // let cube = new THREE.Mesh(geometry, material);
        // this.cube = cube;
        const axis = new THREE.AxesHelper(1000);
        this.axis = axis;
        const helper = new THREE.GridHelper(10, 10, 0x888888, 0x888888);
        scene.add(helper);
        scene.add(axis);

        camera.position.x = -2;
        camera.position.y = 1;

        this.controls = new OrbitControls(camera, renderer.domElement);
        this.controls.maxPolarAngle = Math.PI / 2;
        // this.controls.enableZoom = true;
        // this.controls.enablePan = false;
        (this.controls as any).addEventListener('change', () => this.checkSizeAndAnimate());



        this.animate();
        // renderer.render(scene, camera);
        this.resizeCanvasToDisplaySize();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.renderer) { this.resizeCanvasToDisplaySize(); }

    }

    private checkSizeAndAnimate() {
        this.resizeCanvasToDisplaySize();
        this.animate();
    }

    animate() {

        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        // axis.rotation.x += 0.01;
        // axis.rotation.y += 0.01;
        // this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    public onResize(event) {
        const canvas = this.renderer.domElement;
        // look up the size the canvas is being displayed
        let width = this.renderCanvas.nativeElement.clientWidth;
        let height = this.renderCanvas.nativeElement.clientHeight;
        if (width === 0.0) { width = 400; }
        if (height === 0.0) { height = 400; }
        if (width > event.target.innerWidth) { width = event.target.innerWidth; }
        // adjust displayBuffer size to match
        if (canvas.width !== width || canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            // update any render target sizes here
            this.controls.update();
            this.animate();
        }
    }

    public resizeCanvasToDisplaySize() {
        const canvas = this.renderer.domElement;
        // look up the size the canvas is being displayed
        let width = this.renderCanvas.nativeElement.clientWidth;
        let height = this.renderCanvas.nativeElement.clientHeight;
        if (width === 0.0) { width = 400; }
        if (height === 0.0) { height = 400; }
        // adjust displayBuffer size to match
        if (canvas.width !== width || canvas.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            // update any render target sizes here
            this.controls.update();
            this.animate();
        }

    }

    ngOnInit() {

    }

    @Input() public set Quat(quat) {
        const quaternion: THREE.Quaternion = new THREE.Quaternion(
            quat.q1,
            quat.q3,
            quat.q2,
            quat.q0
        );
        if (this.cube) { this.cube.setRotationFromQuaternion(quaternion); }
        if (this.renderer) { this.renderer.render(this.scene, this.camera); }
    }

    DataPointUpdated(index: number): void {
        this.resizeCanvasToDisplaySize();
        let data = null;
        if (data && data.boardReference) {
            let localIndex: number = data.boardReference.rx.findIndex(p => p.x >= data.boardReference.ax[index].x);
            if (localIndex === -1) {
                localIndex = data.boardReference.rx.length;
            }
            const quaternion: THREE.Quaternion = new THREE.Quaternion(

                data.boardReference.q1[localIndex].y,
                -data.boardReference.q3[localIndex].y, // this is our world z
                data.boardReference.q2[localIndex].y,
                data.boardReference.q0[localIndex].y
            );
            this.cube.setRotationFromQuaternion(quaternion);
        }
        this.renderer.render(this.scene, this.camera);
    }

}
