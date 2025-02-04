exports.urlparse=(url)=>{
    const mainPath=url.split('?')
    const urlPath=mainPath[0]
    const path=urlPath.split('/')
    return path[4]+'/'+path[5]
   
}