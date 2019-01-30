    function init() {
        // Get canvas object from the DOM
        var canvas = document.getElementById("myCanvas");

        // Init WebGL context
        var gl = canvas.getContext("webgl");
        if (!gl) {
            console.log("Failed to get the rendering context for WebGL");
            return;
        }

        // Read shaders using AJAX
        var vsSrc = document.getElementById('shaderVs').src;
        readScriptContent(vsSrc, function (vs) {
            var fsSrc = document.getElementById('shaderFs').src;
            readScriptContent(fsSrc, function (fs) {
                // Clear canvas
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                // Init shaders		  
                if (!initShaders(gl, vs, fs)) {
                    console.log('Failed to intialize shaders.');
                    return;
                }

                // Draw
                gl.drawArrays(gl.POINTS, 0, 1);
            });
        });
    }

    function readScriptContent(scriptSrc, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", scriptSrc)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(xhr.responseText);
            }
        };
        xhr.send();
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
            return false;
        }

        // Use program
        gl.useProgram(glProgram);
        gl.program = glProgram;

        return true;
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