
    function init() {
        // Get canvas object from the DOM
        var canvas = document.getElementById("myCanvas");

        // Init WebGL context
        var gl = canvas.getContext("webgl");
        if (!gl) {
            console.log("Failed to get the rendering context for WebGL");
            return;
        }

        // Clear canvas
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Init shaders
        var vs = document.getElementById('shaderVs').innerHTML;
        var fs = document.getElementById('shaderFs').innerHTML;
        initShaders(gl, vs, fs);

        // Draw a point
        gl.drawArrays(gl.POINTS, 0, 1);
    }


    function initShaders(gl, vs_source, fs_source) {
        // Compile shaders
        var vertexShader = makeShader(gl, vs_source, gl.VERTEX_SHADER);
        var fragmentShader = makeShader(gl, fs_source, gl.FRAGMENT_SHADER);

        // Create program
        var glProgram = gl.createProgram();

        // Attach and link shaders to the program
        gl.attachShader(glProgram, vertexShader);
        gl.attachShader(glProgram, fragmentShader);
        gl.linkProgram(glProgram);
        if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program");
            return;
        }

        // Use program
        gl.useProgram(glProgram);
    }

    function makeShader(gl, src, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert("Error compiling shader: " + gl.getShaderInfoLog(shader));
            return;
        }
        return shader;
    }
