export default (str:string|null|undefined) => str?.split(" ")
    .join("-")
    .replace(/[^a-zA-Z0-9-_]/g, '')
    .toLowerCase();