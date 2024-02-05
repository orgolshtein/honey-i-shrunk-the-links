const asyncHandler = (fn: Function): any => (...args: any[]): any => 
fn(...args).catch((err: Error):void => console.log(err));

export default asyncHandler;