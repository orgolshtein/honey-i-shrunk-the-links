const asyncHandler = (fn: Function) => (...args: any[]) => 
fn(...args).catch((err: Error)=> console.log(err));

export default asyncHandler;