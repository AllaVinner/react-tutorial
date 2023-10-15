

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

async function init() {
    if (!navigator.gpu) {
        throw Error("WebGPU not supported.");
    }
    
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        throw Error("Couldn't request WebGPU adapter.");
    }
    
    const device = await adapter.requestDevice();

    const shaders = `
    struct VertexOut {
        @builtin(position) position : vec4f,
        @location(0) color : vec4f
      }
      
      @vertex
      fn vertex_main(@location(0) position: vec4f) -> VertexOut
      {
        const pos = vec4f( 0.0,  0.0, 0.0, 0);
        var output : VertexOut;
        output.position = position;
        output.color = (position-pos)*(position-pos);
        return output;
      }
    
    @fragment
    fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
    {
        return fragData.color;
    }
    `;


    const shaderModule = device.createShaderModule({
        code: shaders,
        });
    

    const canvas = document.querySelector("#gpuCanvas");
    const context = canvas.getContext("webgpu");

    context.configure({
        device: device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "premultiplied",
    });

    const num_vert = 12
    let vertices = new Float32Array(num_vert*8)
    let angle = 0;
    for (let i = 0; i < num_vert; i++) {
        angle = i/num_vert *2*3.141592;
        vertices[8*i+0] = Math.cos(angle);
        vertices[8*i+1] = Math.sin(angle);
        vertices[8*i+2] = 0.;
        vertices[8*i+3] = 1.;
        vertices[8*i+4] = 0.3;
        vertices[8*i+5] = 0.3;
        vertices[8*i+6] = 0.3;
        vertices[8*i+7] = 0.1;
    }
    console.log(vertices)

    const vertexBuffer = device.createBuffer({
    size: vertices.byteLength, // make it big enough to store vertices in
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    
    device.queue.writeBuffer(vertexBuffer, 0, vertices, 0, vertices.length);  
        

    const vertexBuffers = [
        {
            attributes: [
            {
                shaderLocation: 0, // position
                offset: 0,
                format: "float32x4",
            }],
            arrayStride: 32,
            stepMode: "vertex",
        },
        ];

    const pipelineDescriptor = {
    vertex: {
        module: shaderModule,
        entryPoint: "vertex_main",
        buffers: vertexBuffers,
    },
    fragment: {
        module: shaderModule,
        entryPoint: "fragment_main",
        targets: [
        {
            format: navigator.gpu.getPreferredCanvasFormat(),
        },
        ],
    },
    primitive: {
        topology: "triangle-list",
    },
    layout: "auto",
    };
        
    const renderPipeline = device.createRenderPipeline(pipelineDescriptor);

    const commandEncoder = device.createCommandEncoder();
    const clearColor = { r: 0.0, g: 0.5, b: 1.0, a: 1.0 };

    const renderPassDescriptor = {
        colorAttachments: [
        {
            clearValue: clearColor,
            loadOp: "clear",
            storeOp: "store",
            view: context.getCurrentTexture().createView(),
        },
        ],
    };
    
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(renderPipeline);
    passEncoder.setVertexBuffer(0, vertexBuffer);
    passEncoder.draw(num_vert);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
}
    
export default init

