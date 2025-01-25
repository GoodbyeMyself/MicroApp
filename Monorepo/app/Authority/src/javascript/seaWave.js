/**
 * @description: 海浪效果
 * @author: M.yunlong
 * @date: 2023-04-25 10:16:19
*/

export const seaWave = function() {

    var SEPARATION = 100;
    var AMOUNTX = 50;
    var AMOUNTY = 50;
    var container;
    var camera;
    var	scene;
    var	renderer;
    var particles;
    var	particle;
    var	count = 0;
    var mouseX = 0;
    var	mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    // 动画初始化
    window.animationFrame = 0;

    // init
    init();

    // 动画执行
    animate();

    function init () {
        
        container = document.createElement('div');

        document.getElementById('seaScreen').appendChild(container);

        // 摄像头
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

        camera.position.z = 1000;
        scene = new THREE.Scene();
        particles = [];
        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial({
            color: '#bbb',
            program: function (context) {
                context.beginPath();
                context.arc(0, 0, 1, 0, PI2, true);
                context.fill();
            }
        });
        var i = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
                particle = particles[i++] = new THREE.Particle(material);
                particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                scene.add(particle);
            }
        }
        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        window.addEventListener('resize', onWindowResize, false);

        // 初始化 一个位置
        initMouseMove();
    }

    function onWindowResize () {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function initMouseMove() {
        mouseX = 80 - windowHalfX;
        if ((200 - windowHalfY) > -150) {
            mouseY = -150;
        } else {
            mouseY = 200 - windowHalfY;
        }
    }

    function onDocumentMouseMove (event) {
        mouseX = event.clientX - windowHalfX;
        if ((event.clientY - windowHalfY) > -150) {
            mouseY = -150;
        } else {
            mouseY = event.clientY - windowHalfY;
        }
    }

    function onDocumentTouchStart (event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove (event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }
    
    function animate () {
        // 执行 子应用 动画卸载 [ 防止重复执行 ]
        window.cancelAnimationFrame(window.animationFrame);

        // 挂载 window , 子应用卸载时 执行停止操作
        window.animationFrame = requestAnimationFrame(animate);
        
        // xxx
        render();
    }

    function render () {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        var i = 0;
        for (var ix = 0; ix < AMOUNTX; ix++) {
            for (var iy = 0; iy < AMOUNTY; iy++) {
                particle = particles[i++];
                particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
                particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
            }
        }
        renderer.render(scene, camera);
        count += 0.1;
    }
};


