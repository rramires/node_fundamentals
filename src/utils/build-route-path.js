export function buildRoutePath(path) {
    // Getting the path parameters
    const routeParameters = /:([a-zA-Z]+)/g; 

    // Create the path with parameters and regex pattern
    // Parameters are replaced in <$1>
    const pathWithParams = path.replaceAll(routeParameters, '(?<$1>[a-z0-9\-_]+)');
    //console.log("pathWithParams:", pathWithParams);

    // Create the final regex pattern
    const pathRegex = new RegExp(`^${pathWithParams}$`);
    //console.log('pathRegex', pathRegex);

    return pathRegex;
}
// For test use: /users/:userId/groups/:groupId
