# CanvasShaderExt
This code was apart of another project, but I needed it in more than just that project so here it is by itself on github to install.

This provides some functions people in the shader scene might know of and need when doing something that would be similar.
It also provides some other functions unrelated to shaders, but are nice to have.

Some functions include:
- multiplicative tinting of image (framable)
- swizzle (swapping color channels) (framable)
- scaling a bump/normal map (framable)
- image tiling (repeat)
- image offsetting (Move image in pos/neg x and or y directions and bring the parts that would spill over to the other side)
- image resizing while retaining image data (Yeah. Canvas clears the data by default.)
- image flipping horizontally/vertically
- duplicate a Canvas context to prevent original image modification from in place operations
- quick Canvas Image instance to CanvasRenderingContext2D helper
- image masking
- image channel packing
- image channel unpacking
- lerp (linear interpolation)
- clamp
- HDR color grading that looks close enough to Unity HDR colors with default values, but allows for some control

For where possible, there are also helper functions where you're able to apply specific effects to a frame in your image data yourself so that you can batch what operations you need within a single loop over the image data
