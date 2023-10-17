

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

async function init(vertices) {
    //let zx = -1.0
    //let zy = 0.2
    console.log('rerunning webgpu')
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


      fn square(z: vec2<f32>) -> f32 {
        return z.x*z.x+z.y*z.y;
      }
     
      fn c_mul(a:vec2<f32>, b:vec2<f32>) -> vec2<f32>{
        return vec2<f32>(a.x*b.x-a.y*b.y, a.x*b.y + a.y*b.x);
      }
      
      fn c_conj(z:vec2<f32>) -> vec2<f32>{
        return vec2<f32>(z.x, -z.y);
      }

      fn c_abs(z:vec2<f32>) -> f32 {
        return z.x*z.x+z.y*z.y;
    }

      fn julia(z_init: vec4<f32>) -> f32 {
        var counter: f32 = 0;
        var z = vec2<f32>(z_init.x, z_init.y);
        var c = vec2<f32>(z_init.z, z_init.w);
        const max_iter = 100;
        while c_abs(z) < 4 && counter < max_iter {    
            // Increment the counter
            counter = counter + 1;
            z = c_mul(z, z) + c;
        };
        return counter / max_iter;
      }

      
      @vertex
      fn vertex_main(@location(0) position: vec4f) -> VertexOut
      {
        var pos = vec4f( 0.0,  0.0, 0.0, 0);
        var output : VertexOut;
        var val: f32 = julia(position);
        output.position = vec4<f32>(position.x, position.y, 0, 1);
        output.color = vec4<f32>(val, 0, 0, 1);
        var a = pos.z;
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
            arrayStride: 4*4,
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
        topology: "point-list",
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
    passEncoder.draw(vertices.length/4);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
}
    
export default init

