export type Channel = "R" | "G" | "B" | "A";
export type RecordChannelsMapOptional = {
    R?: Channel;
    G?: Channel;
    B?: Channel;
    A?: Channel;
};
export const normalDefaultRGB: [number, number, number];
export const channelIndexes: Record<Channel, number>;
/**
 * Copy channel data to other channels.
 * @param data Image data.
 * @param options Swizzle options to swap channels.
 * @returns The image data is written to directly.
 *
 * @example
 * // Swaps the Red and Blue channel
 * swizzle(imageData, { R: "B", B: "R" });
 */
export function swizzle(data: Canvas.ImageData, options: RecordChannelsMapOptional): void;
/**
 * Function that actually swizzles a frame of the image data (copy channel data to other channels).
 *
 * This function is just for optimization when you are running your own passes on the image data and applying your own processing on top of this effect.
 * @param data Image data.
 * @param options Swizzle options to swap channels.
 * @param i Index of data to start swizzling at. Applies at i, i+1, i+2, and i+3.
 * @returns The image data is written to directly.
 *
 * @example
 * // Swaps the Red and Blue channel starting at index 12 (will go to index 15)
 * swizzleFrame(imageData, { R: "B", B: "R" }, 12);
 *
 * @example
 * // Goes through the whole image data swapping the Red and Blue channel. This is how it should be used.
 * // The swizzle function does this for you.
 * for (let i = 0; i < imageData.data.length; i += 4) {
 * 	swizzleFrame(imageData, { R: "B", B: "R" }, i);
 * }
 */
export function swizzleFrame(data: Canvas.ImageData, options: RecordChannelsMapOptional, i: number): void;
/**
 * Bakes a scale value into a normal map image.
 * @param data Image data.
 * @param scale float value to lerp between default normal value RGB(128, 128, 255) and the current RGB value. Default value of 1.0 for no transformation.
 * @returns The image data is written to directly.
 *
 * @example
 * // Scales a normal map by 2
 * bumpScale(imageData, 2);
 */
export function bumpScale(data: Canvas.ImageData, scale: number): void;
/**
 * Function that actually scales the normal map image.
 *
 * This function is just for optimization when you are running your own passes on the image data and applying your own processing on top of this effect.
 * @param data Image data.
 * @param scale float value to lerp between default normal value RGB(128, 128, 255) and the current RGB value. Default value of 1.0 for no transformation.
 * @param i Index of data to start scaling at. Applies at i and i+1.
 * @returns The image data is written to directly.
 *
 * @example
 * // Scales a normal map by 2 starting at index 12 (will go to index 15)
 * bumpScaleFrame(imageData, 2, 12);
 *
 * @example
 * // Goes through the whole image data scaling the normal map by 2. This is how it should be used.
 * // The bumpScale function does this for you.
 * for (let i = 0; i < imageData.data.length; i += 4) {
 * 	bumpScaleFrame(imageData, 2, i);
 * }
 */
export function bumpScaleFrame(data: Canvas.ImageData, scale: number, i: number): void;
/**
 * Takes an RGB value and multiplies the base image by that RGB value.
 *
 * RGB provided should be in the range of 0-255. Internally, the RGB's channel values are converted into the range of 0-1 where 255 equals 1
 * and then the image's channels are directly multiplied by that channel's respective multiplier float.
 * @param data Image data.
 * @param r int 0-255 to multiply the R channel by.
 * @param g int 0-255 to multiply the G channel by.
 * @param b int 0-255 to multiply the B channel by.
 * @param int float intensity. Default value should be 1 for no HDR transformation.
 * @returns The image data is written to directly.
 *
 * @example
 * // Tints the image by half
 * tint(imageData, 128, 128, 128);
 */
export function tint(data: Canvas.ImageData, r: number, g: number, b: number, int?: number): void;
/**
 * Function that actually tints the image
 *
 * This function is just for optimization when you are running your own passes on the image data and applying your own processing on top of this effect.
 * @param data Image data.
 * @param r int 0-255 to multiply the R channel by.
 * @param g int 0-255 to multiply the G channel by.
 * @param b int 0-255 to multiply the B channel by.
 * @param int float intensity. Default value should be 1 for no HDR transformation.
 * @param i Index of data to start applying the tinting at. Applies at i, i+1, and i+2. Doesn't touch Alpha (i+3).
 * @returns The image data is written to directly.
 *
 * @example
 * // Tints the image by half starting at index 12 (will go to index 15)
 * tintFrame(imageData, 128, 128, 128, 1, 12);
 *
 * @example
 * // Goes through the whole image data tinting the image by half. This is how it should be used.
 * // The tint function does this for you.
 * for (let i = 0; i < imageData.data.length; i += 4) {
 * 	tintFrame(imageData, 128, 128, 1, i);
 * }
 */
export function tintFrame(data: Canvas.ImageData, r: number, g: number, b: number, int: number, i: number): void;
/**
 * Repeat an image a certain number of times in the x and y directions. Can be done independently of each other. Allows setting a target final image size.
 * @param ctx The context containing the image data that will be tiled.
 * @param tileX How many times the image is repeated in the x direction.
 * @param tileY How many times the image is repeated in the y direction.
 * @param size The target size of the image in the x direction. Also applies to the y direction if one isn't supplied.
 * @param sizeY The target size of the image in the y direction.
 * @returns The ctx param is resized to the new size and the tiles are written directly to it.
 *
 * @example
 * // Makes an image repeat twice in the x direction, but leave the y alone. Make the image now twice the width.
 * tile(context, 2, 1, context.canvas.width * 2, context.canvas.height);
 */
export function tile(ctx: Canvas.CanvasRenderingContext2D, tileX: number, tileY: number, size: number, sizeY?: number): void;
/**
 * Move the whole image in any direction where any parts that would spill over are moved to the other side of the image.
 * @param ctx The context containing the image data that will be offset.
 * @param offsetX The amount of pixels to shift the image right. Can be negative to shift left.
 * @param offsetY The amount of pixels to shift the image down. Can be negative to shift up.
 * @returns The ctx param has the data written directly to it.
 *
 * @example
 * // Move an image to the right 50 pixels and up 50 pixels.
 * offset(context, 50, -50);
 */
export function offset(ctx: Canvas.CanvasRenderingContext2D, offsetX: number, offsetY: number): void;
/**
 * Resizes an image without losing the image data.
 * @param ctx The context containing the image data that will be resized.
 * @param newX The new width in pixels the image will be resized to.
 * @param newY The new height in pixels the image will be resized to. Can be ommited to do automatic resizing based on aspect ratio.
 * @returns The ctx param data is copied, resized and then directly written back to it.
 *
 * @example
 * // Resizes an image to 1024 pixels in both directions.
 * resize(context, 1024, 1024);
 */
export function resize(ctx: Canvas.CanvasRenderingContext2D, newX: number, newY?: number): void;
/**
 * Flips the image in either the horizontal or vertical planes.
 * @param ctx The context containing the image data that will be flipped.
 * @param direction What plane the image will be flipped over.
 * @returns The ctx param has the data written directly to it.
 *
 * @example
 * // Flips an image horizontally.
 * flip(context, "horizontal");
 */
export function flip(ctx: Canvas.CanvasRenderingContext2D, direction: "horizontal" | "vertical"): void;
/**
 * Duplicates a context such that modify in place operations will not affect images on the user's end if it may be desireable.
 * @param ctx The context containing the image data that will be duplicated.
 * @returns A duplicate of the ctx param
 *
 * @example
 * // Simply duplicates an image.
 * const dupe = duplicate(context);
 * // Do stuff with your dupe like resizing without affecting the original image.
 */
export function duplicate(ctx: Canvas.CanvasRenderingContext2D): Canvas.CanvasRenderingContext2D;
/**
 * Uses a masking image's channel to set the Alpha of a base image.
 * @param base The context containing the image data that will get masked.
 * @param imageMask The context containing the image data that will act as the mask.
 * @param channel The R, G, B or A channel that will be used from the imageMask parameter to mask the base image.
 * @returns The base param has the data written directly to it.
 *
 * @example
 * // Masks an image with another from the B channel of the mask.
 * mask(context, maskContext, "B");
 */
export function mask(base: Canvas.CanvasRenderingContext2D, imageMask: Canvas.CanvasRenderingContext2D, channel: Channel): void;
/**
 * Takes data from multiple images and packs them into 1 image, allowing you to define what channels from each image go into the R, G, B and A channels of the packed image.
 * @param images An Array of images and which of their channels (object values) will go into the packed image's channels (object keys).
 * @param sizeX The width of the new packed image.
 * @param sizeY The height of the new packed image.
 * @returns The packed image data as a context.
 *
 * @example
 * // Packs 3 images together where the first image puts its B channel into the packed R channel
 * // the second image puts its R and G channel into the packed B and A channels respectively
 * // and the third image puts its A channel into the packed G channel.
 * // also defines the packed image to be 1024 by 1024
 * const packed = pack([
 * 	{ data: image1Context, channels: { R: "B" } },
 * 	{ data: image2Context, channels: { B: "R", A: "G" } },
 * 	{ data: image3Context, channels: { G: "A" } }
 * ], 1024, 1024);
 */
export function pack(images: Array<{
    data: Canvas.CanvasRenderingContext2D;
    channels: RecordChannelsMapOptional;
}>, sizeX: number, sizeY?: number): Canvas.CanvasRenderingContext2D;
/**
 * Separates an image by its RGBA channels into 4 different contexts, setting the A value of each one to 255.
 *
 * NOTE:
 * For the A channel's separate context, its RGB channels are written with the A value and its A is a full 255. The result will be an image ranging from black to white.
 * If you wish to write this context back as an Alpha value to another image, use the mask function and you can use either the R, G, or B channels as they'll be the same value.
 * @param ctx The context containing the image data that will get unpacked into separate channels.
 * @returns The R, G, B and A channels respectively separated into their own contexts.
 *
 * @example
 * // Gets the R, G, B and A channels as their own contexts from an image
 * const [R, G, B, A] = unpack(context);
 */
export function unpack(ctx: Canvas.CanvasRenderingContext2D): [Canvas.CanvasRenderingContext2D, Canvas.CanvasRenderingContext2D, Canvas.CanvasRenderingContext2D, Canvas.CanvasRenderingContext2D];
/**
 * Helper function that converts a Canvas Image to a context for quick editing.
 * @param img The image loaded by Canvas.
 *
 * @example
 * const ctx = await Canvas.loadImage(pathToImage).then(image2Context);
 */
export function image2Context(img: Canvas.Image): Canvas.CanvasRenderingContext2D;
/**
 * Linearly interpolate (lerp for short) between two values over another value.
 * @param a Min value.
 * @param b Max value.
 * @param t float typically in the range of 0-1. Can be higher or lower to over shoot the min or max.
 *
 * @example
 * // The result of this call would return 31.25 which is 25% of the way between 0 and 125.
 * lerp(0, 125, 0.25);
 */
export function lerp(a: number, b: number, t: number): number;
/**
 * Keep a value within a range of numbers.
 * @param min Min value.
 * @param max Max value.
 * @param val Current value.
 *
 * @example
 * // The result of this call would return 255.
 * clamp(0, 255, 1000);
 */
export function clamp(min: number, max: number, val: number): number;
/**
 * Converts an HDR R, G, or B component to standard RGB color space.
 * @param x Either the R, G, or B component.
 */
export function linearToSRGB(x: number): number;
/**
 * Converts a standard R, G, or B component into HDR linear space.
 * @param x Either the R, G, or B component
 */
export function sRGBToLinear(x: number): number;
/**
 * Converts an sRGB Color + an intensity value to HDR, applies the intensity,
 * runs that Color through an ACES-inspired tone mapper, and then returns back the Color in sRGB space.
 * @param r sRGB R component.
 * @param g sRGB G component.
 * @param b sRGB B component.
 * @param intensity HDR intensity.
 * @param exposure How much exposure to apply. Default of 1.0
 * @param contrast How much contrast to apply. Default of 1.0
 * @param saturation How much saturation to apply. Default of 1.0
 * @param highlightCompression Multiplier of how much highlights affect the image. float typically in the range of 0-1. Default of 1.0
 * @param shadowLifting Additive amount of color to apply to the image. float typically in the range of 0-1. Default of 0.0
 * @returns The RGB color.
 */
export function hdrToSdr(r: number, g: number, b: number, intensity: number, exposure?: number, contrast?: number, saturation?: number, highlightCompression?: number, shadowLifting?: number): [number, number, number];
import Canvas = require("canvas");
