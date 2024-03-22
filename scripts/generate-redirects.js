import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname in an ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDirectory = path.join(__dirname, '..', 'app', 'routes');
const redirectsFile = path.join(__dirname, '..', 'public', '_redirects');

function listFiles(dir, prefix = '') {
    let fileList = [];

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            // Recursively handle directories
            fileList = fileList.concat(listFiles(filePath, `${prefix}/${file}`));
        } else if (!file.startsWith('.') && !file.endsWith('.test.js') && !file.endsWith('.spec.js')) {
            // Handle routes, replacing index and dynamic segments
            let route = `${prefix}/${file.replace(/\.[^/.]+$/, '')}`; // Remove file extension
            route = route.replace(/\/index$/, ''); // Normalize index routes
            route = route.replace(/\$/g, ':'); // Convert dynamic segments for redirects
            if (route !== '/') {
                fileList.push(route);
            }
        }
    });

    return fileList;
}

function generateRedirects(routes) {
    const specialFiles = ['manifest.json', 'robots.txt', 'sitemap.xml'];
    let redirects = routes.map(route => {
        // Exclude special files from general redirect rules
        if (!specialFiles.some(file => route.endsWith(file))) {
            return `${route}/ ${route} 301!`;
        }
    }).filter(Boolean); // Remove any undefined entries

    // Add specific rules for special files at the end to avoid conflict
    // specialFiles.forEach(file => {
    //     redirects.push(`/${file}/ /${file} 301!`);
    // });

    // Ensure a catch-all redirect for dynamic routes and static paths, excluding special files
    redirects.push(`/* /:splat 301!`);

    return redirects;
}

function main() {
    const routes = listFiles(routesDirectory);
    const redirects = generateRedirects(routes);

    // Overwrite the _redirects file with the new set of redirects
    fs.writeFileSync(redirectsFile, redirects.join('\n'), 'utf8');

    console.log('Redirects have been updated in the _redirects file.');
}

main();