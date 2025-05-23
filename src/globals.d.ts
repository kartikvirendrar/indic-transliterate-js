/**
 * Default CSS LESS SCSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}