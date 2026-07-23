export const executor = async <Req, Res>(
  callbackPath: string,
  callback: (args: Req) => Res,
  args: Req
): Promise<Res | undefined> => {
  try {
    console.debug(`Entered ${callbackPath}`)
    return await callback.call(undefined, args)
  } catch (error) {
    console.error(error)
    throw error
  }
}
