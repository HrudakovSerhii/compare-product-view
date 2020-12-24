
export const get = async (url) => {
   try {
      const response = await fetch(url, {
         cache: 'force-cache', // Dev setup
         headers: {
            'Content-Type': 'application/json'
         }
      });

      return {
         data: await response?.json(),
         errors: undefined
      }
   } catch (e) {
      return {
         data: undefined,
         errors: e
      }
   }
}